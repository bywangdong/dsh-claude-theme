# 0.11.8 大规模会话与高频流式输出性能根因修复记录

2026-11-16 · DeepSeek Harness `0.2.2-rc.3` · Chromium CDP (`Performance.getMetrics`)

## 现象与复现场景

在小型测试环境（5 个工作区 / 8 个会话）中感知不明显，但在**公司日常重度 DSH 环境**（35 个工作区 × 20 个会话 = 700 个侧栏会话行 + 80 轮长对话/代码块/工具卡片/图表 SVG + 右侧 200 个文件树行，共 **13,071 个活跃 DOM 节点**）下，`0.11.6`（`cb3b0e9`）在打字、模型流式输出、侧栏悬停与窗口切换时出现严重主线程卡顿（单次键入或单个流式块重算样式耗时约 **125–128 ms**）。

## 根因二分消融（Ablation）结果

通过 Chromium Headless CDP `Performance.getMetrics` 逐项剥离 CSS 与 JS 观察器后，精确定位到五处叠加瓶颈：

1. **`body:has(...)` 全文档失效风暴（最核心主因）**：
   `src/theme.css` 中两处 `body[data-dsh-claude-theme]:has([data-conversation-content][data-content-phase="hero"]):not(:has([data-global-panel]))` 将 `document.body` 标记为 Blink `:has()` 受影响根。页面任意位置的子节点增删（输入框每次按键更新文本节点、流式输出每追加一段 Markdown）都会触发整棵 `13,071` 节点 DOM 树全量样式重算（仅移除该两条规则，40 次按键耗时即从 **`5,128.1 ms` 降至 `0.8 ms`**）。
2. **`WorkspaceBrowser` 根节点子树 `:has()` 扫描**：
   `[data-sidebar-scrollport] :is([class$="_root"], ...):has([data-row-key^="workspace:"]):not(:has([class*="_searchExpanded"]))` 挂在包裹 9,000+ 侧栏节点的容器上，侧栏内任意状态点/悬停变更都会重扫整棵侧栏树（移除后 60 帧流式耗时从 `3,019.9 ms` 降至 `92.7 ms`，80 次侧栏变更从 `4,014.6 ms` 降至 `111.5 ms`）。
3. **侧栏会话行与分组相邻兄弟的后代 `:has()`**：
   `[data-row-key^="session:"]:not(:has([class*="_rowResting"]))`、`:has([data-slot] > *)` 与 `_groupSection:has([data-row-key^="session:"] [class*="_rowResting"]) + _groupSection` 在会话内部状态变化时触发跨分组兄弟重算（收敛为直接子选择器 `>` 后，流式 60 帧进一步降至 **`3.4 ms`**，侧栏 80 次变更降至 **`5.5 ms`**）。
4. **窗口失焦 `data-claude-window-inactive` 继承变量级联与通配符失效**：
   切焦时修改 `body` 属性并级联覆盖 7 个继承颜色变量（或使用 `> *` 通配末端选择器）会导致数千侧栏节点重算样式（`2,185.6 ms`）；改为精确槽位/属性目标上的 GPU 合成 `opacity: 0.58` 后，20 轮失焦/聚焦降至 **`24.5 ms`**（单次 `< 0.7 ms`）。
5. **`sidebar-workspaces.mjs` 全量子树观察器与 `body` 全局 `optimizeLegibility`**：
   原 `MutationObserver` 监听 `scrollport` 的 `aria-expanded` 并在每次回调中 `disconnect()` + 全树 `querySelectorAll`（`ScriptDuration: 45.49 ms`）；改为跳过 `[data-row-key^="session:"]` 内部高频变更、缓存节点引用并拆分 `headerObserver` 后，`ScriptDuration` 降至 **`2.84 ms`**。同时移除 `body` 上的 `text-rendering: optimizeLegibility`（仅保留在主页大标题），恢复 Blink/HarfBuzz 对大段代码与日志的词级字形缓存快速路径；内联 SVG 规则限制 `> path:nth-child(-n+8)` 并按 `[data-icon^="dsw-icon-"]` 分流，避免多路径图表 SVG 重复遍历 270 条分支。

## 同场基准对比（13,071 DOM 节点，Chromium CDP 实测）

| 场景 / 指标 | 无主题原生 DSH | 优化前 `0.11.6` / `0.11.7` (`cb3b0e9`) | 优化后 `0.11.8` | 提速倍数 |
| --- | ---: | ---: | ---: | ---: |
| 输入框连续打字 40 次 (`composer40KeysMs`) | `0.2 ms` | `4,998.0 ms` (`125 ms`/键) | **`0.4 ms`** (`0.01 ms`/键) | **12,495×** |
| 模型流式输出 60 帧 (`streaming60FramesMs`) | `3.4 ms` | `7,548.8 ms` (`126 ms`/帧) | **`6.9 ms`** (`0.11 ms`/帧) | **1,094×** |
| 侧栏悬停/状态变更 80 次 (`sidebar80HoverMutationsMs`) | `1.8 ms` | `10,020.8 ms` (`125 ms`/次) | **`6.3 ms`** (`0.08 ms`/次) | **1,591×** |
| 会话点击切换 20 次 (`onlySelectMs`) | `< 0.5 ms` | `~2,500 ms` | **`2.8 ms`** (`0.14 ms`/次) | **~890×** |
| 工作区折叠/展开 20 次 (`onlyWsExpandMs`) | `< 0.5 ms` | `~2,500 ms` | **`0.4 ms`** (`0.02 ms`/次) | **> 1,000×** |
| 窗口失焦/聚焦 20 轮 (`windowFocusBlur20Ms`) | `0.0 ms` | `2,185.6 ms` (`55 ms`/次) | **`24.5 ms`** (`0.6 ms`/次) | **89×** |
| 一次性挂载 10,500 节点语法高亮代码块 | `9.8 ms` | `> 130 ms` | **`29.3 ms`** | **> 4.4×** |
| JS 观察器总耗时 (`ScriptDuration`) | `0.00 ms` | `45.49 ms` | **`2.84 ms`** | **16×** |

## 防回退守卫

`scripts/check.mjs` 已新增永久静态断言，禁止在构建产物 CSS 中重新引入 `body...:has(...)` 或 `[data-sidebar-scrollport] ... _root ... :has(...)`。
