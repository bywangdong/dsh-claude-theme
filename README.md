# Claude for DSH

把 Claude Desktop（Code 模式 `@ant/cds` `fizzy-lake` + `.dframe-sidebar` + `.epitaxy-markdown`）的中英文排版设定、深/浅色表面层级、窗口失焦侧栏降噪、全量 Claude 线性矢量图标体系、右侧 `Start` 工具台与设置弹窗风格带入 DeepSeek Harness（`0.11.9`）。

- **参考 Claude Desktop 中文字体、字号、字重与颜色（`@ant/cds` + `.epitaxy-markdown`）**：全界面与回复正文统一优先指定 `"PingFang SC"`（解决 `<html lang="en">` 下中文回退不一致及此前默认 `Songti SC` 宋体混排割裂问题）；正文、列表、表格、用户气泡与左侧栏会话行统一对齐 Claude 原生 `14px / 20px`，工作区分组标题对齐 `13px / 16px`（行高与胶囊圆角对齐 `--df-row-h: 32px`、`--df-radius-pill: 8px`），聊天标题收敛为 `.epitaxy-markdown` 紧凑字阶（`h1: 16px`、`h2: 15px`、`h3: 14px`）；深色模式中文加粗自动采用 `PingFangSC-Medium`（`500`）配柔和正文墨色 `#DFDFDF` / 气泡墨色 `#CECECE`，消除笔画糊粗与刺眼反差。
- **校准深/浅色物理表面层级与窗口失焦侧栏降噪（`fizzy-lake`）**：深色模式精确对齐 `#1F1F1F` 侧栏、`#191919` 主画布与 `#3F3F3F` 选中胶囊（浅色 `#FAFAFA` 侧栏、`#FFFFFF` 画布、`#E4E4E4` 胶囊），并同步实现 Claude 原生窗口失焦时侧栏与顶栏文字自动柔和降噪（`--cds-alpha-5`：`#FFFFFF80` / `#00000080`）。
- **全量替换 Claude 线性矢量图标体系（102 组 `dsw-icon-*` + 64 处内联/`FileTypeIcon` SVG + 实验性插件图标）**：基于纯前端可逆 CSS 矢量遮罩，将 DSH 全部 102 个图标族、64 处内联与文件类型 SVG 及 `@deepseek-ai/*` 实验性插件图标统一重绘为 `1.35px` 圆角细线 Claude 风格单色图标。
- **按 Claude 设置页截图校准排版和留白**：最大 `1024×800px` 弹窗、`44px` 通栏标题栏、`212px` 导航栏与 `16px` 内容边距；使用 macOS 系统无衬线字体（中文回退苹方），正文和说明 `14px / 20px`、标题 `15px / 20px / 500`。设置深色面板和导航采用 `#191919`、常规文字 `#EFEFEF`、选中行 `#3B3B3B` / `#F1F1F1`；账户页采用平面分隔行，下拉器显示为文字与箭头，明暗外观采用紧凑图标分段按钮；适配中文、深色与窄窗口，并保留全部原有操作。

- **逐项目悬停分组排序条与顶部按需搜索（对齐 Claude Code Desktop）**：静息态隐藏冗余 `Workspaces` 工具条，在顶部 `+ 新会话` 下方挂载同轴对齐的 `搜索` 导航行（点击按需展开 `28px` Claude 内联会话搜索框，清除或按 `Esc` 收起）；将配置入口下沉至每个工作区项目行悬停胶囊右侧 `[ 项目名 ⌄        ↑↓   + ]`（`32px` 行高、`8px` 圆角、两枚 `24×24px` 按钮、`4px` 间距与内边距），`↑↓` 弹出菜单直连宿主 `WorkspaceViewStore`（分组方式 / 排序方式 / 归档筛选 / 管理此工作区 / 添加工作区），切换为 `单列表` 或无工作区时自动保留 `会话` 顶栏入口防止卡死。
- **`f` 搜索面板按 Claude 原版截图校准**：`672px` 面板、`60px` 顶栏加分隔线、`36px` 结果行、`10px` 列表内边距与半像素外框。搜索、关闭、代码和回车采用当前安装版 Claude 的原始图标轮廓；修正深色标题和时间灰阶，键盘选中态直接切换。保留相对时间、按项目名检索与窄窗口滚动。对照方法与验证范围见 [0.11.6 验收记录](verification/f-search-0.11.6/README.md)。
- **设置导航搜索与分组**：搜索会按页面名称与常用中英文关键词筛选现有设置入口，支持清除、无结果提示和 Enter 打开。偏好设置与自定义分组使用 `12/18px` 标题、组间留白；导航行高 `32px`、行间距 `1px`，图标使用 `20px` 光学尺寸。保持宿主按钮顺序和原有功能；关闭主题会移除搜索、分组和附加属性。
- **设置图标来源**：采用安装版 Claude Desktop 的原始设置图标轮廓，以及用于 DSH 特有入口的 Lucide 图标。来源记录见 `src/assets/` 和 [第三方声明](THIRD_PARTY_NOTICES.md)。设置图标与旧版全局近似图标分开维护。

安装包路径：`dist/dsh-theme-claude-0.11.9.tgz`（在 **Plugins → Add plugin → Install a third-party plugin** 中选择更新或安装）。底部齿轮现在是独立的设置按钮，点击直接打开设置；左侧账户入口仍打开账户菜单。

## 开发与打包

需要 Node.js 20 或更新版本。本项目没有额外的 npm 依赖。

```sh
git clone https://github.com/bywangdong/dsh-claude-theme.git
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
