# Claude 桌面端设计研究

2026-11-14 · macOS · 新版中性主题。

这套界面的主要质感来自中性表面的细微分层、系统字体与衬线标题的分工，以及宽松外部空间和紧凑控件的配合。陶土色只做少量强调；内容和输入框是视觉中心。

## 来源与适用范围

| 证据 | 版本 / 条件 | 本地文件 |
| --- | --- | --- |
| 原生首页和外观设置 | 运行中的 Claude 5.1231.2，macOS，2× Retina | [首页](evidence/01-home-verified.png)、[设置](evidence/02-settings-verified.png) |
| 最新已交付更新包 | Claude 5.11492.5，未在研究时启动该更新 | [原始文件清单](evidence/latest/manifest.json)、[主样式表](evidence/latest/ion-dist-c6a992d55-k2XF_vDB.css) |
| 抽取的样式规则 | 保留选择器、原始值及出现顺序 | [JSON](evidence/verified-design-tokens.json)、[CSS 摘录](evidence/source-excerpts.css) |
| 浏览器计算样式 | 16px 根字号，`cds-rem-scale = 1` | [计算结果](evidence/computed-verification.json)、[探针](evidence/token-probe.html) |

本轮未宣称查明全球最新版本，也没有把运行版本的截图说成更新包的实机截图。颜色部分对应 `data-cds-fizzy-lake~="color"`，字重部分对应 `~="type"` 的新版规则。旧暖色主题仍在包内共存，但不作为本主题的主配色。

现场设置为 Theme：System，Interface font：Default · System，Response font：Match interface，Transcript text size：Medium。以下数值是这次研究范围内的组件规范，具体页面仍可覆盖。

## 设计配色卡

8 位 HEX 最后两位是 alpha；半透明颜色应叠在对应背景上观察。`#0009` 与 `#00000099` 相同。下表使用展开形式。

| 用途 | 浅色 | 深色 | 证据 / 备注 |
| --- | --- | --- | --- |
| 主内容面 | `#FFFFFF` | `#191919` | `--cds-surface-1` |
| 侧栏 | `#FAFAFA` | `#1F1F1F` | `--cds-fizzy-lake-color-sidebar` |
| 卡片 / 面板 | `#FFFFFF` | `#1F1F1F` | `--cds-surface-2` |
| 弹出层 | `#FFFFFF` | `#303030` | `--cds-surface-popover` |
| 主文字 | `#000000E6` | `#FFFFFFED` | `--cds-text-primary` |
| 次要文字 | `#00000099` | `#FFFFFF91` | `--cds-text-secondary` |
| 弱文字 | `#00000077` | `#FFFFFF66` | `--cds-text-muted` |
| 细边框 | `#00000014` | `#FFFFFF0A` | `--cds-border` |
| 分隔线 | `#0000001F` | `#FFFFFF1F` | `--cds-border-line` |
| 透明按钮 hover | `#0000000D` | `#FFFFFF13` | `--cds-fill-ghost-hover` |
| 透明按钮选中 | `#0000001A` | `#FFFFFF26` | `--cds-fill-ghost-selected` |
| 主按钮 | `#191919` | `#EFEFEF` | `--cds-fill-primary` |
| 主按钮 hover | `#3C3C3C` | `#D7D7D7` | `--cds-fill-primary-hover` |
| 次按钮 | `#0000000D` | `#FFFFFF26` | `--cds-fill-secondary` |
| 次按钮 hover | `#00000013` | `#FFFFFF37` | `--cds-fill-secondary-hover` |
| 输入框描边 | `#0000001F` | `#FFFFFF14` | `--cds-fizzy-lake-color-composer-ring` |
| 装饰陶土色 | `#D97757` | `#D97757` | `--cds-clay` |
| 强调陶土色 | `#C6613F` | `#C6613F` | `--cds-clay-emphasized` |

其他功能色：蓝 `#257DE0`，蓝 hover `#2171CA`，成功 `#10A122`，警告 `#FBB315`，危险浅色 `#C83839` / 深色 `#DC3C3D`，Pro 紫 `#785EE8`。这些属于独立语义，不应都替换成陶土色。

可在 [交互设计稿](index.html) 中切换明暗配色。可复用的数据见 [tokens.json](tokens.json)，完整原始规则见上方证据文件。

## 字体、字重与层级

| 场景 | 字体 | 字号 / 行高 | 字重 |
| --- | --- | --- | --- |
| 首页欢迎语 | Anthropic Serif | 38 / 45.6px | 浅色 330；深色 CSS 300，变量轴实际 `wght: 290`；`opsz: 48` |
| 页面衬线标题 | Anthropic Serif | 28 / 36.4px | 浅色 500，深色变量轴 460 |
| 衬线分节标题 | Anthropic Serif | 24 / 31.2px | 浅色 500，深色变量轴 460 |
| 菜单、导航、控件 | System 或 Anthropic Sans | 随密度，见下表 | 正文 400、控件 435、标题 520、徽标 500 |
| 回复正文 | 随 Response font 设置 | 舒适英文 15 / 21px，中文 15 / 24px | 常规正文 |
| 代码 | Anthropic Mono / 系统等宽字体 | 舒适 13 / 19px | 常规等宽 |

macOS 的 Default · System 使用系统 San Francisco 系列，中文回退苹方；衬线中文栈含 Songti SC。Anthropic Sans 是可选项，包含 Micro Text / Micro Display，不是这台机器观察到的默认界面字体。回复字体也可独立选择，不能把所有聊天文本一概认定为衬线体。

### 原字体资源记录

来自 5.11492.5 的 `ion-dist.asar`，用于核对字体家族及本地样张：

| 家族 | 包内路径 | 字节 |
| --- | --- | --- |
| Anthropic Sans Micro Text | `/assets/v1/cb48c413e-yAna2Le1.woff2` | 267068 |
| Anthropic Sans Micro Display | `/assets/v1/c6064a516-Mpj_akWA.woff2` | 240736 |
| Anthropic Serif | `/assets/v1/c66fc489e-2VcCjn5t.woff2` | 165536 |
| Anthropic Mono | `/assets/v1/c5dbe0935-CQcSkHaI.woff2` | 65620 |

原设计稿嵌入 Text、Serif、Mono 三种字体，可离线查看；没有把这些字体放进 DSH 插件。

## 密度、间距与留白

单位均为 CSS px，根字号 16px、缩放 100%。下表的长文与控件高度使用最终计算值。

| 项目 | Comfortable | Compact |
| --- | --- | --- |
| 界面正文 / 行高 | 14 / 20 | 13 / 19 |
| Caption / 行高 | 12 / 17 | 11 / 17 |
| Footnote / 行高 | 13 / 17 | 12 / 15 |
| 面板小标题 / 行高 | 15 / 20 | 14 / 18 |
| 界面标题 / 行高 | 22 / 28 | 20 / 25 |
| 代码 / 行高 | 13 / 19 | 12 / 17 |
| 英文长文 / 行高 | **15 / 21** | 14 / 20 |
| 中文长文 / 行高 | **15 / 24** | 14 / 20 |
| 通用控件高 | **28** | 24 |
| 内嵌控件高 | 22 | 18 |
| 基础图标 | 20 | 16 |
| 普通控件圆角 | 8 | 6 |
| 通用输入组件圆角 | 14 | 12 |
| Padding，XS → XL | 6、8、12、16、24 | 4、6、8、12、20 |
| Gap，XS → XL | 8、12、16、28、40 | 6、8、12、20、32 |

重要的级联细节：Comfortable 基础规则中能读到长文 16 / 24px、控件 32px，但后面的覆盖会改变它们。英文长文最终是 15 / 21px，中文行高再覆盖为 24px，通用控件最终高 28px。列表行高 32px 是另一项固定规则，不能与通用按钮高度混用。

### 整体几何

| 项目 | 值 | 证据精度 |
| --- | --- | --- |
| 侧栏宽度 | 288px，可拖动 | 原生无障碍树测量，非固定下限 |
| 列表行高 | 32px | `.h-list-row` 源码值 |
| 侧栏外侧留白 | 约 8px | 截图估算 |
| 首页输入卡宽 | 约 672px | 2× 截图换算 |
| 首页输入卡外圆角 | 约 20–24px | 截图估算，区别于通用输入组件 14px |
| 欢迎标题 → 输入卡 | 约 40–48px | 截图估算 |

侧栏内部使用紧凑的行高、较轻的选中层；主内容区限制行宽，剩余空间由两侧吸收。留白主要发生在大区块之间，按钮和工具栏本身较紧凑。衬线欢迎标题形成少量阅读气质，功能区域继续使用系统字体。

## 边界、阴影、图标与动效

- 表面主要通过明度和轻描边区分，不依赖大面积彩色背景。
- 浮层阴影源码：`0 8px 24px #0000001f, 0 2px 6px #00000014`。
- 时长 token：60 / 120 / 200 / 300 / 450ms。
- Ease out：`cubic-bezier(.165, .84, .44, 1)`；Snap：`cubic-bezier(.32, .72, 0, 1)`；Overshoot：`cubic-bezier(.34, 1.3, .64, 1)`。
- 图标以单色线性图形为主，尺寸随密度和组件变化。包内含专用图标资源；DSH 实现保留宿主图标。

## 官方背景链接

以下是前面研究时查阅的官方入口，用于产品背景，不作为上述像素规格的来源：

- [Claude 下载页](https://claude.com/download)
- [Cowork is now Claude](https://claude.com/resources/articles/cowork-is-now-claude)
- [Claude Code Desktop 文档](https://code.claude.com/docs/en/desktop)

本地 CSS、计算样式与原生截图是这次设计参数的直接证据。设计稿中的布局图是比例示意；最终产品外观以实机截图为准。
