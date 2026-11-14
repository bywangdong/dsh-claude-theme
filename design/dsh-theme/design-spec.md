# Claude for DSH 设计规范

2026-11-14 · 主题 `0.8.0` · DeepSeek Harness `0.2.2-rc.3`。

对照 Claude Desktop（`@ant/cds` `fizzy-lake` + `.dframe-sidebar` + `.epitaxy-markdown`）源码与 macOS 真实 DOM 树逐像素校准：1:1 对齐 `PingFang SC` 中文字体栈、`14px / 20px` 正文与侧栏字阶、紧凑标题比例、深色 `500`（Medium）中文粗体字重、`#1F1F1F` 侧栏 / `#191919` 画布深色层级、窗口失焦侧栏降噪、全量 Claude 线性矢量图标体系（102 组 `dsw-icon-*` + 64 处内联/`FileTypeIcon` SVG + 实验性插件图标）、右侧 `Start` 工具台与双栏建筑感 `Settings` 设置页，同时 100% 保留 DSH 原生能力与即时可逆性。

## 双色温表面与墨阶映射（自适应 Token）

默认启用 **现代浅灰（`neutral`，对齐 Claude Desktop `fizzy-lake`，`palette.v2`）**，并在插件设置中保留 **经典暖纸（`warm`）** 实时切换：

| 用途 | 现代浅灰（浅 / 深） | 经典暖纸（浅 / 深） | 设计意图 |
| --- | --- | --- | --- |
| 侧栏与设置左栏 | `#FAFAFA` / `#1F1F1F` | `#F3F1E9` / `#222120` | 对齐 `--cds-fizzy-lake-color-sidebar` |
| 主画布与设置主区 | `#FFFFFF` / `#191919` | `#FAF9F5` / `#1C1C1A` | 对齐 `--cds-surface-1`（深色下画布沉于侧栏之后） |
| 侧栏选中胶囊 / 悬停 | `#E4E4E4` / `#3F3F3F` | `#E3E0D5` / `#3E3D39` | 对齐 `--cds-fill-ghost-selected`（`8px` 圆角，`32px` 行高） |
| 用户消息气泡 / 输入卡 | `#F4F4F4` / `#212121` · `#FFFFFF` / `#222222` | `#EFECE2` / `#242321` · `#FFFFFF` / `#252422` | `12px` 气泡圆角配 `1px` 微弱内边（`#FFFFFF12`）与 `#CECECE` 柔和墨色 |
| 侧栏会话 / 失焦侧栏墨色 | `#242424` / `#CCCCCC` · 失焦 `#00000080` / `#FFFFFF80` | `#242321` / `#CECCC3` · 失焦 `#14141380` / `#FAF9F580` | 还原 `.dframe-sidebar` 常驻墨阶与 `:root[data-window-active=false]` 柔和降噪 |
| 回复正文 / 加粗与标题墨色 | `#1A1A1A` / `#DFDFDF` · `#111111` / `#F0F0F0` | `#191918` / `#E1DFD6` · `#111110` / `#F2F0E8` | 深色中文加粗采用 `weight: 500`（`PingFangSC-Medium`），笔画利落不糊 |
| 胶囊开关与品牌陶土色 | `#C6613F` / `#D97757` | `#C6613F` / `#D97757` | 新会话星芒、胶囊开关开启轨道与光标点缀 |

完整 token 快照见 [tokens.json](tokens.json)。

## 排版、图标与界面规范（`0.8.0`）

| 元素 | 实现规格 | 说明 |
| --- | --- | --- |
| 中英文排版与表格 | `PingFang SC` 优先无衬线栈；正文/列表/表格/用户气泡统一 `14px / 20px`；`h1: 16px`、`h2: 15px`、`h3: 14px`；行内代码 `display: inline; white-space: pre-wrap; font-size: .88em` | 1:1 复刻 `.epitaxy-markdown` 与 `.cds-inline-code`，彻底消除段落与表格字体分裂及长代码撑破问题 |
| 左侧栏与窗口焦点 | `.dframe-sidebar` 规格：`32px` 行高、`8px` 胶囊圆角、导航与会话 `14px / 20px`、工作区标题 `13px / 16px`、底栏账户 `13.5px` | 同步 `window` `focus`/`blur` 切换 `data-claude-window-inactive="true"`，失焦自动降噪侧栏与顶栏 |
| 全量矢量图标包 | `src/icons.mjs`：102 组 `svg[data-icon^="dsw-icon-"]` + 64 处内联/`FileTypeIcon` SVG + 实验性插件图标，`1.35px` 圆角细线遮罩 | 零 DOM 篡改覆盖全界面与文件树，可逆切换 |
| 右侧工具台与设置页 | `[data-sidebar-right-guide]` `17×17px` 单色启动卡；`[data-shortcut-modal="settings"]` `208px` 左栏 + `32px` 细边控件 + 陶土开关 | 深浅双模式自适应，关闭或卸载插件零残留恢复原生界面 |
