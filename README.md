# Claude for DSH

把 Claude Desktop（Code 模式 `@ant/cds` `fizzy-lake` + `.dframe-sidebar` + `.epitaxy-markdown`）的中英文排版设定、深/浅色表面层级、窗口失焦侧栏降噪、全量 Claude 线性矢量图标体系、右侧 `Start` 工具台与原生分层质感设置弹窗 1:1 带入 DeepSeek Harness（`0.9.0`）。

- **1:1 对齐 Claude Desktop 中文字体、字号、字重与颜色（`@ant/cds` + `.epitaxy-markdown`）**：全界面与回复正文统一优先指定 `"PingFang SC"`（解决 `<html lang="en">` 下中文回退不一致及此前默认 `Songti SC` 宋体混排割裂问题）；正文、列表、表格、用户气泡与左侧栏会话行统一对齐 Claude 原生 `14px / 20px`，工作区分组标题对齐 `13px / 16px`（行高与胶囊圆角对齐 `--df-row-h: 32px`、`--df-radius-pill: 8px`），聊天标题收敛为 `.epitaxy-markdown` 紧凑字阶（`h1: 16px`、`h2: 15px`、`h3: 14px`）；深色模式中文加粗自动采用 `PingFangSC-Medium`（`500`）配柔和正文墨色 `#DFDFDF` / 气泡墨色 `#CECECE`，消除笔画糊粗与刺眼反差。
- **校准深/浅色物理表面层级与窗口失焦侧栏降噪（`fizzy-lake`）**：深色模式精确对齐 `#1F1F1F` 侧栏、`#191919` 主画布与 `#3F3F3F` 选中胶囊（浅色 `#FAFAFA` 侧栏、`#FFFFFF` 画布、`#E4E4E4` 胶囊），并同步实现 Claude 原生窗口失焦时侧栏与顶栏文字自动柔和降噪（`--cds-alpha-5`：`#FFFFFF80` / `#00000080`）。
- **全量替换 Claude 线性矢量图标体系（102 组 `dsw-icon-*` + 64 处内联/`FileTypeIcon` SVG + 实验性插件图标）**：基于纯前端可逆 CSS 矢量遮罩，将 DSH 全部 102 个图标族、64 处内联与文件类型 SVG 及 `@deepseek-ai/*` 实验性插件图标统一重绘为 `1.35px` 圆角细线 Claude 风格单色图标。
- **1:1 复刻 Claude Desktop 设置页分层质感与控件体系**：设置弹窗采用贯穿全宽的 `48px` 无衬线顶栏（`Settings` + 内嵌动作胶囊 + `×`）与 `1px` 通栏底分割线；弹窗内部校准为 **左导航下沉面（深色 `#191919` / 浅色 `#F6F6F6`）+ 右侧悬浮主面板（深色 `#1F1F1F` / 浅色 `#FFFFFF`）**，`15px` 无衬线分组标题（含 `Account` / `账户` 卡片页节奏对齐）、`34px` 哑光内凹填充输入框/下拉器（`#2B2B2B` / `#F1F1F0`）、分段选择器（`#282828` 槽 + `#404040` 滑块）与 `@ant/cds` 原生蓝胶囊开关（`#2A78D6` / `#3987E5`），同时精细适配 `Account`、`Models`、`Agent presets` 与 `Shortcutter` 设置页；关闭或卸载插件零残留恢复原生界面。

安装包路径：`dist/dsh-theme-claude-0.9.0.tgz`（在 **Plugins → Add plugin → Install a third-party plugin** 中选择更新或安装）。

## 开发与打包

需要 Node.js 20 或更新版本。本项目没有额外的 npm 依赖。

```sh
git clone https://github.com/iobee/dsh-claude-theme.git
cd dsh-claude-theme
npm run build
npm run check
npm run pack:local
```

仓库及目录名为 `dsh-claude-theme`；插件包名保持 `dsh-theme-claude`，与现有安装及偏好设置兼容。`lib/` 保留构建结果，`dist/` 是本地打包输出，不提交到 Git。

## 项目资料

| 路径 | 内容 |
| --- | --- |
| `src/` | 主题样式、配色、图标与客户端逻辑 |
| `scripts/` | 构建、检查与设计 token 导出 |
| `lib/`、`cordis.patch.yml` | 可安装的插件入口及声明 |
| [DEVELOPMENT.md](DEVELOPMENT.md) | 开发说明与实现边界 |
| [design/](design/README.md) | 设计规范、交互设计稿与参考研究资料 |
| [design-qa.md](design-qa.md)、`verification/` | 历史视觉验收记录与截图 |

设计研究与截图是有版本标注的历史快照；当前实现以 `src/`、`package.json` 和 [设计规范](design/dsh-theme/design-spec.md) 为准。设计资料不会进入插件安装包。
