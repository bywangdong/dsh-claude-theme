# Claude for DSH

面向 DeepSeek Harness `0.2.2-rc.3` 的 Claude Desktop（Code 模式）质感主题插件（`0.8.0`）。

围绕 Claude Desktop（`@ant/cds` `fizzy-lake` + `.dframe-sidebar` + `.epitaxy-markdown`）核心视觉体验打磨九个维度：**1:1 原生 `PingFang SC` 中英文排版与字阶、深色 `#1F1F1F` 侧栏 / `#191919` 画布表面校准、窗口失焦侧栏柔和降噪、全量 102 组 `dsw-icon-*` + 64 处内联/`FileTypeIcon` SVG + 实验性插件图标体系、右侧 `Start` 工具启动台与 `Files` 单色文件树、建筑感浅/深双模式设置页（`Settings`）与陶土胶囊开关、槽位安全（Slot-Safe）精确选择器、贴底输入卡与中心星芒新会话主页、以及双色温自适应 Token 与 100% 纯前端可逆架构**。

## 构建与本地打包

```sh
node scripts/export-design-tokens.mjs
npm run build
npm run check
npm run pack:local
```

以上命令均在 `dsh-claude-theme/` 仓库根目录执行。构建产物写入 `lib/`，本地安装包写入被 Git 忽略的 `dist/`。仓库目录名与插件包名 `dsh-theme-claude` 不同，插件标识及已有设置保持原样。

桌面版 `0.2.2-rc.3` 由运行中的应用管理 `/Users/nick/.dsh/profiles/desktop`。请通过桌面内置 CLI（`/Applications/DeepSeek Harness.app/Contents/Resources/runtime/cli/bin/dsh plugin --profile desktop`）或在应用 **Plugins → Add plugin → Install a third-party plugin** 中安装 `dist/dsh-theme-claude-0.8.0.tgz`。

插件详情页内置实时开关与分段控件：
- **启用开关**：采用 Claude 陶土赤褐 `role="switch"` 胶囊，即时挂载/卸载 `ctx.theme.overrideTokens()`、`conversation.hero.brand.mark` 插槽、窗口焦点监听、全量图标遮罩层与样式层
- **明暗外观**：跟随系统 / 浅色 / 深色
- **纸张色温**：现代浅灰（默认 `#FAFAFA` 侧栏 / `#FFFFFF` 画布；深色 `#1F1F1F` 侧栏 / `#191919` 画布，`dsh-theme-claude.palette.v2`） / 经典暖纸（`#FAF9F5` / `#F3F1E9`）
- **回复正文字体**：无衬线 `Sans`（默认，对齐 Claude Desktop `PingFang SC` `14px / 20px`，`dsh-theme-claude.prose.v2`） / 书卷衬线 `Serif`
- **宿主工作区与品牌元素**：纯粹克制（默认 Claude Code Desktop 侧栏、右侧工具台、全套 Claude 图标与贴底主页） / 保留 DSH（恢复原生图标、鲸鱼水印、居中主页与文件夹树）

## 核心质感设计（`0.8.0`）

### 1. 原生 Claude Desktop 中文字体、字阶与深色字重校准（`src/theme.css`、`src/tokens.mjs`）

- **统一 `PingFang SC` 无衬线家族**：在 `--claude-ui-sans` 与 `--dsw-font-family` 中显式前置 `"PingFang SC"`（对齐 Claude `--font-cjk-sans-sc`），并将回复正文、列表、表格（`--dsw-font-markdown-table` / `--dsw-font-markdown-table-head`）、用户气泡与输入卡全面统一，彻底消除段落与表格字体割裂。
- **对齐 `.dframe-sidebar` 与 `.epitaxy-markdown` 精确字号行高**：侧栏导航与会话行统一为 `14px / 20px`（`32px` 行高、`8px` 胶囊圆角），工作区分组标题为 `13px / 16px`；聊天正文、列表、表格与用户气泡统一为 `14px / 20px`，标题采用紧凑字阶（`h1: 16px/21px`、`h2: 15px/20px`、`h3: 14px/20px`），行内代码改为 `display: inline; white-space: pre-wrap` 以精确对齐中文基线并支持长串自然折行。
- **深色模式中文 Medium 字重与柔和墨阶**：深色模式下 `--claude-prose-strong-weight` 自动切换为 `500`（调用 `PingFangSC-Medium` 取代笔画粘连的 `Semibold`），正文墨色定为 `#DFDFDF`、强调文字 `#F0F0F0`、用户气泡 `#CECECE`（配 `#212121` 底色与 `1px #FFFFFF12` 内描边）。
- **窗口失焦侧栏降噪**：监听 `window` `focus` / `blur` 同步 `data-claude-window-inactive`，失焦时将侧栏与顶栏文字降为 `--cds-alpha-5`（`#FFFFFF80` / `#00000080`），插件停用或卸载时完整移除监听与属性。

### 2. 双色温表面映射（配对自适应 Token，默认现代浅灰 `neutral`）

| 层级 | 现代浅灰（浅 / 深） | 经典暖纸（浅 / 深） | 说明 |
| --- | --- | --- | --- |
| 左右侧栏与设置导航栏 | `#FAFAFA` / `#1F1F1F` | `#F3F1E9` / `#222120` | 对齐 Claude `fizzy-lake` `--cds-fizzy-lake-color-sidebar` |
| 主画布与设置内容区 | `#FFFFFF` / `#191919` | `#FAF9F5` / `#1C1C1A` | 对齐 Claude `--cds-surface-1`（深色画布比侧栏更深沉） |
| 侧栏选中胶囊 | `#E4E4E4` / `#3F3F3F` | `#E3E0D5` / `#3E3D39` | 对齐 `--cds-fill-ghost-selected`（`8px` 圆角） |
| 侧栏与画布分割线 | `#EAEAEA` / `#2B2B2B` | `#E4E1D6` / `#2E2D2A` | `1px` 清晰物理接缝 |
| 正文墨色 / 强调墨色 | `#1A1A1A` / `#DFDFDF` · `#111111` / `#F0F0F0` | `#191918` / `#E1DFD6` · `#111110` / `#F2F0E8` | 柔和耐读正文对比与清晰标题/加粗层级 |

### 3. 全量 Claude 线性矢量图标与建筑感设置页（`src/icons.mjs`）

- 覆盖 DSH 全部 **102 个 `dsw-icon-*` 图标族**（204 个 symbol）、**64 处内联与 `FileTypeIcon` `<svg>`** 及 `@deepseek-ai/*` 实验性插件图标，统一为 `1.35px` 圆角细线单色图标。
- 重构 `[data-shortcut-modal="settings"]` 双栏建筑感设置弹窗、紧凑型 `Appearance` 预览卡、`32px` 细描边控件与 `34×20px` 陶土赤褐胶囊开关。

## 边界

不分发 Anthropic 专有字体文件（中文直接使用 macOS 原生 `PingFang SC`），不篡改 DSH 的 DOM 节点、快捷键、权限、工作区和工具能力；无任何网络请求；关闭或卸载插件后所有样式、属性、监听、图标遮罩、插槽与 token 覆盖层均完整清除。
