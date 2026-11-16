# 0.11.4 逐项目悬停分组排序条与顶部按需搜索验收记录

2026-11-15 · DeepSeek Harness `0.2.2-rc.3` · `dsh-theme-claude@0.11.4`

## 设计策略（对齐 Claude Code Desktop）

1. **零冗余静息侧栏**：按工作区分组（`按工作区` / `按工作区树`）且未展开搜索时，折叠 `[data-sidebar-workspace-header]`（`height: 0px`），消除冗余的 `Workspaces` 独立工具栏行。
2. **逐项目悬停操作簇（`[ 项目名 ⌄      ↑↓  + ]`）**：每个 `[data-row-key^="workspace:"]` 项目行保持 `32px` 高、`8px` 圆角胶囊；悬停时隐藏行内 `•••`，展示 `↑↓`（分组与排序菜单）与 `+`（新建会话）两枚 `24×24px` 按钮（`16×16px` 线性矢量遮罩、`4px` 间距、`4px` 右/上下内边距）。
3. **直连 `WorkspaceViewStore` 的 `↑↓` 菜单与防卡死回退**：`↑↓` 弹出菜单直连宿主 `sidebar.workspaces` 槽位共享 store，提供分组方式、排序方式、归档筛选、`管理此工作区…`（转发宿主右键菜单以支持重命名/删除）与 `添加工作区…`（转发宿主 `wsPlusRef` 目录选择流）。当切换为 `单列表`（`flat`）或当前无工作区行时，`[data-sidebar-workspace-header]`（`会话`）自动恢复 `32px` 可见态，确保用户随时可切回分组模式。
4. **顶部按需会话搜索**：在顶部导航 `+ 新会话` 下方挂载同轴对齐的 `搜索` 入口行（`height: 32px`，图标中心 `x = 24px`、文案起点 `x = 36px`）；点击按需展开 `28px` 高、`8px` 圆角 Claude 内联搜索框（`_searchExpanded`），清除或按 `Escape` 收起。

## 实测几何与交互记录（`1280×820`）

| 检查项 | 实测值 | 结果 |
| --- | --- | --- |
| 顶部 `搜索` 导航行 | `{ x: 8, y: 78, width: 264, height: 32 }`，图标中心 `x = 24`、文案起点 `x = 36`（与 `+ 新会话` 同轴） | PASS |
| 分组静息态 `[data-sidebar-workspace-header]` | `height: 0px`、`opacity: 0` | PASS |
| 项目悬停胶囊（`dsh-switcher`） | `{ x: 8, width: 264, height: 32 }`，`border-radius: 8px` | PASS |
| `↑↓` 与 `+` 按钮尺寸与间距 | `↑↓`: `216..240`（`24×24px`），`+`: `244..268`（`24×24px`），按钮间距 `4.0px`，右/上下内边距 `4.0px`，图标遮罩 `16×16px` | PASS |
| 展开态内联会话搜索框 | `{ x: 8, width: 264, height: 28 }`，`border-radius: 8px`，`Escape` / `×` 收起 | PASS |
| `单列表`（`flat`）回退态 | `[data-sidebar-workspace-header]` 自动展开为 `32px` 高 `会话` 行，可切回 `按工作区` | PASS |
| 折叠窄栏与 `保留 DSH` 可逆性 | 窄栏无重复搜索按钮（`36×36px` / `18×18px`）；切换 `保留 DSH` 完整卸载自建节点并恢复原生顶栏与 `•••` | PASS |

## 实图文件

- `dark-project-hover-verified.png`：深色模式展开侧栏，`dsh-switcher ⌄` 悬停胶囊与右侧 `↑↓  +` 按钮簇实拍。
- `light-resting-verified.png`：浅色模式静息侧栏，顶部 `搜索` 导航行与无工具条干扰的工作区项目列表实拍。
