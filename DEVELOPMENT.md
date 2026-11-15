# Claude for DSH

面向 DeepSeek Harness `0.2.2-rc.3` 的 Claude Desktop（Code 模式）质感主题插件（`0.11.1`）。

围绕 Claude Desktop（`@ant/cds` `fizzy-lake` + `.dframe-sidebar` + `.epitaxy-markdown`）核心视觉体验打磨九个维度：**1:1 原生 `PingFang SC` 中英文排版与字阶、深色 `#1F1F1F` 侧栏 / `#191919` 画布表面校准、窗口失焦侧栏柔和降噪、全量 102 组 `dsw-icon-*` + 64 处内联/`FileTypeIcon` SVG + 实验性插件图标体系、右侧 `Start` 工具启动台与 `Files` 单色文件树、1:1 原生通栏顶栏 + 分层表面设置页（`Settings`）与 `@ant/cds` 蓝胶囊开关、槽位安全（Slot-Safe）精确选择器、贴底输入卡与中心星芒新会话主页、以及双色温自适应 Token 与 100% 纯前端可逆架构**。

## 0.11.1 侧栏设置按钮

底部齿轮由账户菜单上的 CSS 装饰改为 `sidebar.footer.action` 中的独立按钮。点击时读取当前 `sidebar.settings` 槽位的共享 store，直接执行 `actions.open()`；沿用宿主设置文案、焦点管理和账户菜单。按钮在主题关闭、保留 DSH 外观、侧栏折叠或设置不可用时隐藏，卸载时清理订阅。验证记录见 `verification/settings-0.11.1/README.md`。

## 0.11.0 设置导航修正

上一轮 0.10.1 的验收低估了深色墨阶、图标轮廓和分组层次的差异；本轮以用户新增的深色侧栏截图为依据，实际截图比较记录见 `design-qa.md`。

- 设置面板/导航深色底 `#191919`，顶栏 `#1F1F1F`，文字 `#EFEFEF`，选中文字 `#F1F1F1`、选中底 `#3B3B3B`。
- 20px 原始参考图标 master 与 1.25px 线条；保留出处。DSH 独有账户/快捷键入口使用 Lucide 0.468.0，统一视觉线宽。
- `settings.action` 槽位贡献负责设置打开期间的搜索与分组增强；保留宿主原始按钮、DOM 顺序、点击与焦点处理。
- `src/settings-navigation.mjs` 仅监听当前导航的内容和页面语言变化。卸载或关闭主题时断开 observer、移除全部自建节点与监听器、恢复原属性；不修改宿主文件。
- 搜索按标题、页面 ID 和常用中英文关键词筛选设置页面；无结果状态与清除按钮可用，Enter 打开第一项，ArrowDown 聚焦第一项。窄浏览器保留横向导航。

## 构建与本地打包

```sh
node scripts/export-design-tokens.mjs
npm run build
npm run check
npm run pack:local
```

以上命令均在 `dsh-claude-theme/` 仓库根目录执行。构建产物写入 `lib/`，本地安装包写入被 Git 忽略的 `dist/`。仓库目录名与插件包名 `dsh-theme-claude` 不同，插件标识及已有设置保持原样。

桌面版 `0.2.2-rc.3` 由运行中的应用管理 `/Users/nick/.dsh/profiles/desktop`。请通过桌面内置 CLI（`/Applications/DeepSeek Harness.app/Contents/Resources/runtime/cli/bin/dsh plugin --profile desktop`）或在应用 **Plugins → Add plugin → Install a third-party plugin** 中安装 `dist/dsh-theme-claude-0.11.1.tgz`。

插件详情页内置实时开关与分段控件：
- **启用开关**：采用 Claude `@ant/cds` 原生蓝 `role="switch"` 胶囊（`#2A78D6` / `#3987E5`），即时挂载/卸载 `ctx.theme.overrideTokens()`、`conversation.hero.brand.mark` 插槽、窗口焦点监听、全量图标遮罩层与样式层
- **明暗外观**：跟随系统 / 浅色 / 深色
- **纸张色温**：现代浅灰（默认 `#FAFAFA` 侧栏 / `#FFFFFF` 画布；深色 `#1F1F1F` 侧栏 / `#191919` 画布，`dsh-theme-claude.palette.v2`） / 经典暖纸（`#FAF9F5` / `#F3F1E9`）
- **回复正文字体**：无衬线 `Sans`（默认，对齐 Claude Desktop `PingFang SC` `14px / 20px`，`dsh-theme-claude.prose.v2`） / 书卷衬线 `Serif`
- **宿主工作区与品牌元素**：纯粹克制（默认 Claude Code Desktop 侧栏、右侧工具台、全套 Claude 图标与贴底主页） / 保留 DSH（恢复原生图标、鲸鱼水印、居中主页与文件夹树）

## 核心质感设计（`0.10.1`）

### 1. 原生 Claude Desktop 中文字体、字阶与深色字重校准（`src/theme.css`、`src/tokens.mjs`）

- **统一 `PingFang SC` 无衬线家族**：在 `--claude-ui-sans` 与 `--dsw-font-family` 中显式前置 `"PingFang SC"`（对齐 Claude `--font-cjk-sans-sc`），并将回复正文、列表、表格（`--dsw-font-markdown-table` / `--dsw-font-markdown-table-head`）、用户气泡与输入卡全面统一，彻底消除段落与表格字体割裂。
- **对齐 `.dframe-sidebar` 与 `.epitaxy-markdown` 精确字号行高**：侧栏导航与会话行统一为 `14px / 20px`（`32px` 行高、`8px` 胶囊圆角），工作区分组标题为 `13px / 16px`；聊天正文、列表、表格与用户气泡统一为 `14px / 20px`，标题采用紧凑字阶（`h1: 16px/21px`、`h2: 15px/20px`、`h3: 14px/20px`），行内代码改为 `display: inline; white-space: pre-wrap` 以精确对齐中文基线并支持长串自然折行。
- **深色模式中文 Medium 字重与柔和墨阶**：深色模式下 `--claude-prose-strong-weight` 自动切换为 `500`（调用 `PingFangSC-Medium` 取代笔画粘连的 `Semibold`），正文墨色定为 `#DFDFDF`、强调文字 `#F0F0F0`、用户气泡 `#CECECE`（配 `#212121` 底色与 `1px #FFFFFF12` 内描边）。
- **窗口失焦侧栏降噪**：监听 `window` `focus` / `blur` 同步 `data-claude-window-inactive`，失焦时将侧栏与顶栏文字降为 `--cds-alpha-5`（`#FFFFFF80` / `#00000080`），插件停用或卸载时完整移除监听与属性。

### 2. 双色温表面映射（配对自适应 Token，默认现代浅灰 `neutral`）

| 层级 | 现代浅灰（浅 / 深） | 经典暖纸（浅 / 深） | 说明 |
| --- | --- | --- | --- |
| 主窗口左右侧栏 | `#FAFAFA` / `#1F1F1F` | `#F3F1E9` / `#222120` | 对齐 Claude `fizzy-lake` `--cds-fizzy-lake-color-sidebar` |
| 主窗口对话画布 | `#FFFFFF` / `#191919` | `#FAF9F5` / `#1C1C1A` | 对齐 Claude `--cds-surface-1`（深色画布沉于侧栏之后） |
| 设置弹窗悬浮主面板与通栏顶栏 | `#FFFFFF` / `#1F1F1F` | `#FAF9F5` / `#21201E` | 对齐 Claude Settings 悬浮面板面（`--cds-surface-2`） |
| 设置弹窗同底色左导航栏 | `#FFFFFF` / `#1F1F1F` | `#FAF9F5` / `#21201E` | 弹窗内左右两栏使用同一表面，由 1px 分隔线界定，配 `#393939` 选中胶囊 |
| 设置输入框 / 分段控件 | `#FFFFFF` / `#242424` · `#F3F3F3` / `#282828` | `#ECE9DF` / `#2B2A27` · `#E9E6DB` / `#292825` | 输入框单层描边；下拉器透明底；外观控件 80×28px |
| 正文墨色 / 强调墨色 | `#1A1A1A` / `#DFDFDF` · `#111111` / `#F0F0F0` | `#191918` / `#E1DFD6` · `#111110` / `#F2F0E8` | 柔和耐读正文对比与清晰标题/加粗层级 |

### 3. 全量 Claude 线性矢量图标与 1:1 设置页架构（`src/icons.mjs`、`src/theme.css`）

- 覆盖 DSH 全部 **102 个 `dsw-icon-*` 图标族**（204 个 symbol）、**64 处内联与 `FileTypeIcon` `<svg>`** 及 `@deepseek-ai/*` 实验性插件图标，统一为 `1.35px` 圆角细线单色图标。
- 设置弹窗为最大 `1024×800px`，`44px` 通栏顶栏、`212px` 导航栏、`16px` 内边距；标题 `15/20px`、500，正文与说明 `14/20px`、400。导航、内容使用同一底色；账户使用平面分隔行，普通下拉器显示值与箭头，外观使用 `80×28px` 图标分段按钮。输入框统一单层边框，并保留清晰焦点环。

## 边界

不分发 Anthropic 专有字体文件（中文直接使用 macOS 原生 `PingFang SC`），不篡改 DSH 的 DOM 节点、快捷键、权限、工作区和工具能力；无任何网络请求；关闭或卸载插件后所有样式、属性、监听、图标遮罩、插槽与 token 覆盖层均完整清除。

## 0.10.1 设置页校准

本轮以用户提供的 Claude 浅色 General 截图为视觉依据（见 `verification/settings-0.10.1/claude-reference.png`），覆盖此前 0.9.0 的灰色左栏和内凹控件方案。截图按 2× 密度折算：弹窗 1024×800、顶栏 44、导航栏 212、内容与导航内边距 16；SF 系统字体 14/20，中文回退 PingFang SC，标题 15/20、500。

账户页去掉两层大卡片，使用分隔行；保留真实账户信息、余额和外链。通用设置下拉器使用透明底色，外观按钮保持原始 Light/Dark/System 顺序、点击回调和可访问名称，改为 80px 宽的图标分段控件。设置样式限定在设置弹窗内；新增墨色 token 不影响会话正文。窄浏览器窗口保持宿主横向导航，44px 顶栏显式重设内边距，避免宿主移动端样式令按钮跨过分隔线。

DSH 的设置内容与 Claude 不同，因此保留 DSH 的页签、权限、模型、插件及配置文件入口；没有加入无功能的 Claude 搜索框或复制其业务选项。深色与暖色由现有双主题 token 适配。新视觉证据与边界见根目录 `design-qa.md`。
