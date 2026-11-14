# Claude for DSH — design QA

**final result: passed**

2026-11-14 · 插件 0.1.2 · macOS · DeepSeek Harness 0.2.2-rc.3。

此文是 `0.1.2` 的历史验收记录，以下结论对应当时的版本。当前 `0.8.0` 的实现说明见 [DEVELOPMENT.md](DEVELOPMENT.md) 和 [设计规范](design/dsh-theme/design-spec.md)。

本次目标是把 Claude 的材质、排版和空间节奏带进现有 DSH，不是替换产品的信息结构。DSH 品牌、权限入口、工作区、工具、会话内容和原有图标保留。

## 视觉依据与尺寸

- 源图：[Claude 首页实机截图](design/claude-reference/evidence/01-home-verified.png)，运行版本 5.1231.2。
- 配色与排版来源：[原始 token](design/claude-reference/evidence/verified-design-tokens.json)、[CSS 摘录](design/claude-reference/evidence/source-excerpts.css)、[计算样式验证](design/claude-reference/evidence/computed-verification.json)；来自已交付到本机的 Claude 5.11492.5 更新包。全部资料已归档到 [design/](design/README.md)，查看不再依赖外部可视化目录。
- 实现截图：`verification/final-light.png`、`verification/final-dark.png`。均为真实 DSH 桌面窗口，不是模拟页面。
- 源图 3796×2176 px，去除系统截图外边距，裁切 `(112,76)-(3684,2028)` 得 3572×1952 px；实现截图本身为 3572×1952 px。两者以 2× Retina 密度统一为 1786×976 CSS px 后比较。
- 窄窗口：960×1050 CSS px，2× 密度。DSH 自动收起侧栏；输入框、工作区菜单、模型和发送按钮保持可达。
- 全景比较：`verification/comparison-final.png`；标题 / 输入框细节：`verification/comparison-details.png`；侧栏控件细节：`verification/comparison-sidebar.png`。
- 状态：新会话、浅色 / 深色、空输入、中文多行输入、键盘焦点、侧栏收放、通用设置和插件设置。真实长聊天、表格及链接截图现保留在仓库外工作目录的 `local/verification-private/`，不提交到 Git，也不进入安装包。

## 比较历史与修复

1. **0.1.0 / iteration 1 — blocked**
   - [P2] 新会话按钮仍是 38px 居中、带边框的按钮，视觉重量大于参考。证据：`verification/iteration-1-light.png`。
   - [P2] 禁用发送按钮仍是较重的灰色实心块。改为浅灰交互层背景、次要图标色，保留明确的禁用语义。
2. **0.1.1 / iteration 2 — blocked**
   - 发送按钮修复生效；侧栏规则使用 `[data-sidebar-collapsed="false"]`，但宿主在展开时省略属性，因此没有命中。
   - 证据：`verification/iteration-2-light.png`、`verification/iteration-2-dark.png`。发现来自截图比较，而非仅检查构建结果。
   - 修复：以侧栏列和属性存在性限定展开状态，同时调整按钮内部内容容器。字号与 Markdown heading token 也保持一致。
3. **0.1.2 / final — passed**
   - 新会话按钮现在左对齐，32px 高、8px 圆角，低对比填充。最终局部截图已确认，未依赖错误的 false 属性。
   - 装饰陶土色仍为 `#D97757`；浅色小号功能文字使用 `#A64F34`，与 `#FAFAFA` 背景的对比度约 5.31:1。
   - 插件详情文案缩短，开关及外观选择更容易找到；详细开发说明移到 `DEVELOPMENT.md`。
   - 最新全景与局部比较未发现剩余 P0 / P1 / P2 问题。

## 五项视觉检查

| 检查面 | 结论 |
| --- | --- |
| 字体与层级 | 系统字体用于导航、控件、聊天，中文由苹方等宿主字体栈呈现。欢迎标题使用本机 Charter 等衬线体，38px / 1.2；正文默认 15px / 24px，代码块默认 13px / 19px，相对用户字号变化。Charter 是 Anthropic Serif 的明确近似替代，属于接受的字体差异。 |
| 间距与布局 | 新会话输入框最大宽度 672px，与参考尺度相符；默认聊天宽度 720px，并尊重用户已有的拖动宽度。输入框 20px 圆角，普通控件以 8px 为主。外层留白宽松，内部保持紧凑。保留 DSH 的额外工作区 / 模式 / 权限入口，不改变产品信息顺序。 |
| 颜色与材质 | 真实截图采样确认浅色主画布 `#FFFFFF`、侧栏 `#FAFAFA`；深色主画布 `#191919`、侧栏 `#1F1F1F`。移除侧栏冷色渐变和菜单模糊，使用轻边界和克制阴影。主按钮中性黑白，状态、链接保留独立语义。 |
| 资产与图标 | 保留 DSH 原有矢量图形与图标，欢迎图形只改变颜色。没有自绘 Claude 商标、替代插画、生成位图或重分发 Anthropic 字体。截图清晰，未接受 Stage Manager 的透视缩略图作为验证证据。 |
| 文案与内容 | DSH 的标题、提示、工作区及聊天内容保持原样；新增主题配置文案独立完整。主题设置提供启用开关、跟随系统、浅色和深色选项。 |

## 验证记录

- `npm run build`、`npm run check` 通过。检查包含实际构建产物语法、两套 token 完整性、离线资源、启用 / 禁用初始化，以及卸载后样式和覆盖层清理。
- 通过桌面应用的插件管理器安装并启用。已比较已安装的 `lib/client.js`、`lib/index.js`、补丁及 README 与最终构建，逐文件 SHA-256 一致。
- 原有 Shortcutter 与 Switcher 的版本和依赖保持不变。安装前 profile 备份位于 `/Users/nick/.dsh/profiles/desktop/.claude-theme-backups/20261114-132025`。
- 原生界面中验证了主题开关、明暗切换、设置页、工作区选择、左右侧栏收放、窗口缩窄后恢复、中文两行输入及 Tab 焦点。输入内容已清空，没有发送模型请求。
- 主文字 / 次要文字 / 小号元信息在侧栏背景上的对比度，浅色分别约 16.93 / 5.67 / 4.54，深色约 14.36 / 6.18 / 5.79。
- 最终停留在 Agent 工作区的新会话页面，浅色主题启用，窗口恢复原尺寸。保留可通过通用设置或主题插件详情切换的深色外观。

## 验证边界与后续维护

- 未做 Windows、移动端、VoiceOver 全流程或应用完全退出后的重启验证；没有读取渲染器控制台。现场未出现加载错误提示，主题控件和样式已实际运行。
- 深色长聊天在 0.1.0 检查；窄窗口、中文输入及浅色长聊天在 0.1.1 复核。0.1.2 仅改侧栏选择器、功能强调文字对比度与插件说明，随后复核明暗首页和侧栏收放。
- DSH 的语义 `data-*` 钩子是主要适配面；少量 CSS Module 后缀仍需在宿主结构更新后复核。
- 跟随系统选项沿用宿主 ThemeRuntime；本轮手动验证明暗切换，没有修改 macOS 系统外观。

**实施检查清单：** 最终构建与安装一致；明暗主题生效；所有 P2 修复已经截图复核；原有依赖保留；测试输入清空；浅色及窗口尺寸已恢复。
