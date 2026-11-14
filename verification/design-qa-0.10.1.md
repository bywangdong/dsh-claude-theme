> 历史记录：下面的通过结论已被 0.11.0 实图复核纠正，当前验收见仓库根目录 design-qa.md。

# Claude for DSH — 设置页视觉验收

**final result: passed**

2026-11-15 · 主题 0.10.1 · DSH 0.2.2-rc.3 · macOS。

## 视觉依据与比较范围

- 视觉目标：`verification/settings-0.10.1/claude-reference.png`，用户提供的 Claude 浅色 General 设置页，2372×1684 px、2× 密度。
- 参考弹窗裁切 `(136,46)-(2184,1646)`，2048×1600 px，折算为 1024×800 CSS px。
- 最终实现：`verification/settings-0.10.1/general-light.jpg`，真实 DSH 运行时的独立本地 profile，1186×848 px、1×；弹窗 `(81,24)-(1105,824)` 为 1024×800 CSS px。
- `computed-metrics.json` 确认运行版本为 0.10.1；本机 desktop 安装文件 SHA-256 与相同构建全部一致，见 `verification/installation-verification.json`。
- 全景比较：`comparison-full.png`；字体、导航、行距细节：`comparison-detail.png`。两者均将参考与实现放进同一张图，以同一 CSS 尺度比较。
- 对比状态均为浅色 General；业务内容不同，比较对象是字体、弹窗、导航、行与控件。DSH 保留自己的设置项、配置文件入口和页签；不增加 Claude 专有业务或无功能的搜索框。
- 桌面账户页由用户提供的实际截图及原生可访问性树确认。桌面临时切换 Light 后恢复原始 System 偏好；最终停留在 General。全窗口截图可能包含私人会话，只存仓库外 `local/verification-private/`；台前调度缩略图不作为像素验收证据。

## 比较历史与已修复发现

1. **原 0.9.0 — blocked**
   - [P1] 左栏灰底、厚卡片和填充下拉器较参考更重，内容侧边距 36px 也令主区显得内缩。
   - [P2] 弹窗 920×740、48px 顶栏、204px 导航栏，与参考的比例不同；标题字重、说明字号不一致。
   - 修复：1024×800 border-box、44px 顶栏、212px 导航、16px 内边距，统一底色；账户改为分隔行，透明下拉器、紧凑外观选择器；标题 500/15/20、正文与说明 400/14/20。
2. **首次浏览器比较 — blocked**
   - [P2] 设置行上下 16px，带说明的行约 77px，比参考约 69px 更高。弹窗未使用 border-box，外框多出 2px。
   - 证据：`iteration-1.jpg`。
   - 修复：行上下 12px；无说明的常规行约 53px，带说明约 69px；弹窗改为 border-box。后续 `general-light.jpg` 与计算尺寸确认修复。
3. **控件与窄屏验证 — blocked**
   - [P2] 680px 窄窗口沿用了宿主移动端顶栏内边距，关闭按钮跨过顶栏分隔线。
   - 证据：`narrow-before.jpg`；修复证据：`narrow-final.jpg`。显式设置 44px 顶栏及内边距，去掉导航重复留白；无水平溢出。
   - [P2] 字体输入组件的包裹层与 input 同时画边框。
   - 证据：`fields-before.jpg`；修复证据：`fields-final.jpg`。边框统一交给包裹层，input border 为 0，focus-within 保留蓝色焦点环。
4. **0.10.1 — passed**
   - 最终全景与细节比较无剩余 P0/P1/P2。设置阴影使用专用 token，未改变其他弹窗的阴影。
   - 最终包采用独立版本号，避免 pnpm 重用首次 0.10.0 本地安装包缓存。五个安装文件与最终构建逐项一致。

## 五项视觉检查

| 检查面 | 结果 |
| --- | --- |
| 字体与层级 | macOS 系统 sans 对应参考的 Default · System，中文回退 PingFang SC；正文、说明 14/20，标题 15/20、500。设置文字不跟随会话字号变化。中英文截图与实际计算样式均已核对。 |
| 留白与布局 | 弹窗 1024×800、顶栏 44、导航 212、两侧 16px 内边距；导航 32px 高、8px 圆角；普通设置行使用细分隔线。模型与预设保留宿主用于表单/网格的内容宽度。窄浏览器沿用横向导航。 |
| 颜色与控件 | 浅色两栏 #FFFFFF、正文 #1A1A1A、弱分隔线；深色两栏 #1F1F1F、正文 #DFDFDF。输入框单层边框；普通下拉器透明底并有 hover；外观选择器 80×28，按键与选中语义保留。 |
| 图形与资产 | 使用现有主题矢量图标与真实宿主头像，没有新增位图或复制专有字体。外观图标按钮保留可访问名称，顺序保持宿主 Light/Dark/System，以免视觉顺序与键盘顺序不同。 |
| 文案与内容 | 保留 DSH 的真实设置与行为。新增 General/通用视觉分组标题；账户原有姓名、余额、入口均保留。未加入仅作装饰的搜索或 Claude 专属功能。 |

## 验证记录

- `npm run build`、`npm run check`、`git diff --check` 通过。现有检查涵盖构建语法、双主题 token 完整性、离线资源、启用/禁用和卸载清理。
- 本地真实运行时验证 General、Models、Built-in plugins、Agent presets、Shortcutter 导航。截图分别见 `general-light.jpg`、`general-dark.jpg`、`general-chinese.jpg`、`models.jpg`、`plugins.jpg`、`presets.jpg`、`shortcutter.jpg`。
- 验证浅色/深色按钮、语言菜单切中文与 English、字号增加后恢复 14、展开字体控件、输入焦点环。没有修改 API 密钥、权限、日志上传偏好或调用模型。
- 680×760 窄窗口无水平溢出，关闭按钮可达。最终桌面尺寸为 1186×848；浏览器临时 viewport 已重置。
- 最终浏览器控制台 error 查询为空。
- 原生 desktop 账户、General 和明暗按钮可访问；恢复 System。Shortcutter、Switcher 的依赖版本与安装前一致。
- 安装前代码已提交并 push：`3141125`。最终改动留在本地工作区，便于继续审阅。

## 边界与后续维护

- 未测试 Windows、触屏、VoiceOver 全流程、其他六种语言；CSS 视觉标题当前覆盖中文和英文。暖色 token 保持完整，本轮未单独做暖色截图验收。
- Claude 的搜索栏、分类标题和专有设置项与 DSH 信息结构不同，属保留宿主功能的明确差异。
- 原生客户端最终截图受台前调度影响，完整像素比较使用相同 DSH 运行时和构建的独立浏览器 profile；不把缩略图当作通过依据。
- 旧 0.1.2 验收记录移至 `verification/design-qa-0.1.2.md`。

**实施检查清单：** 设计参数已校准；P2 问题已复核；控件操作通过；安装文件与构建一致；其他插件及原外观偏好保留。
