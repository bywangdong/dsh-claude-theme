# Claude → DSH 设计资料

研究及归档日期：2026-11-14。DSH 主题版本：0.1.2。

这是初始设计归档的版本说明；当前插件为 `0.8.0`，实现规格见 [DSH 设计规范](dsh-theme/design-spec.md)。历史截图、归档清单和验证报告保留各自的版本语境。

从 [设计资料首页](index.html) 开始浏览，或直接打开 [Claude 交互设计稿](claude-reference/index.html)。两者均为本地 HTML，可双击离线查看；设计稿保留明暗外观、字体和密度切换。

## 文件索引

| 内容 | 入口 |
| --- | --- |
| Claude 配色卡、字体样张、字号、间距与布局示意 | [交互设计稿](claude-reference/index.html) |
| 完整研究说明、两套配色、字体层级、尺寸与风格 | [Claude 研究说明](claude-reference/research.md) |
| 整理后的 Claude 设计数据，含来源与测量精度 | [Claude tokens.json](claude-reference/tokens.json) |
| DSH 的具体适配、取舍与组件规格 | [DSH 设计规范](dsh-theme/design-spec.md) |
| 当前插件导出的全部明暗主题 token | [DSH tokens.json](dsh-theme/tokens.json) |
| Claude 原始首页、外观设置截图 | [首页](claude-reference/evidence/01-home-verified.png) · [设置](claude-reference/evidence/02-settings-verified.png) |
| DSH 最终实机效果 | [浅色](../verification/final-light.png) · [深色](../verification/final-dark.png) · [合览](../verification/claude-theme-preview.png) |
| Claude / DSH 同尺度对比 | [全景](../verification/comparison-final.png) · [标题与输入框](../verification/comparison-details.png) · [侧栏](../verification/comparison-sidebar.png) |
| 原生交互与视觉验证记录 | [design-qa.md](../design-qa.md) · [安装校验](../verification/installation-verification.json) |
| 原始资料来源、大小与 SHA-256 | [归档清单](archive-manifest.json) |
| 本次归档完整性与本地链接检查 | [归档校验结果](archive-verification.json) |

DSH 截图直接引用项目已有的 `verification/` 文件，避免维护两份。迭代过程、窄窗口、焦点、侧栏收放、设置页也保留在该目录。包含真实聊天内容的截图已移到仓库外的工作目录 `local/verification-private/`，不提交到 Git，也不加入资料首页。

## 版本和证据的区别

- **实机观察：Claude 5.1231.2。** 原生首页与设置截图来自当时正在运行的版本。
- **源码研究：Claude 5.11492.5。** CSS 与字体来自当时已交付到本机、尚未启动的官方更新包。此处“最新”指本机收到的更新，不代表所有账号和平台同时上线的版本。
- **实现：DSH 0.2.2-rc.3 / 主题 0.1.2。** 颜色与尺度以 Claude 为依据，功能文字对比度、默认聊天宽度、标题替代字体等属于 DSH 的适配决定。
- 精确 CSS 值、浏览器计算值、截图估算分别标注。没有把旧暖色主题或被后续规则覆盖的基础值当成最终值。

## 原始证据布局

`claude-reference/claude-desktop-design.html` 是前面交付的设计卡原件，字节保持不变。`claude-reference/index.html` 加上标准网页外壳与本地导航，方便直接打开。

`claude-reference/evidence/` 保留原研究目录结构：

- 根目录 `app-*.css`、`ion-dist-*.css` 与 `cds-rules.json`：运行版本 5.1231.2 的提取材料。
- `latest/`：5.11492.5 更新包 CSS、原始文件清单、摘要及选中规则。
- `verified-design-tokens.json`、`source-excerpts.css`：筛选后的规则，保留原选择器和级联顺序。
- `computed-verification.json`、`token-probe.html`：原计算样式验证记录与本地探针。
- `prepare_reference.py`：原研究脚本，包含当时更新包的绝对路径；作为历史证据保留，重跑前应明确目标版本与输入路径。
- `preview.html`：原可视化预览包装。日常查看使用上面的独立 `index.html`。

原始证据里的绝对路径用于记录来源，查看归档不依赖原目录。两张 Stage Manager 透视缩略图没有作为有效设计资料收录，排除原因记在归档清单中。

## 维护

Claude 参考资料是固定的研究快照。DSH 的实现以 [src/tokens.mjs](../src/tokens.mjs) 和 [src/theme.css](../src/theme.css) 为准；修改后运行以下命令更新 JSON 快照：

```sh
node scripts/export-design-tokens.mjs
```

新增视觉证据时继续更新 [design-qa.md](../design-qa.md)。归档清单只校验从原研究目录复制的原件，不包含后来编写的文档、独立页面和 DSH 派生数据。

本地研究页保留原先嵌入的 Anthropic 字体样张；DSH 实际主题使用系统与本机字体。`package.json` 的发布文件清单不包含 `design/`、`verification/` 或 `research/`，这些资料不会进入主题安装包。

本次已校验 71 份原件的逐字节一致性、更新包清单中的 29 个文件哈希、JSON、页面脚本语法和本地链接。内置浏览器因协议策略拒绝 `file:` 地址，未在本轮重新做页面视觉检查；交互设计稿本体保持原件，独立页面只增加网页外壳和导航。
