# 0.11.6 搜索面板视觉复核

日期：2026-11-15。范围：Claude 主题对 Shortcutter 0.1.40 搜索面板的视觉覆盖。

## 参考与比较方法

- 原版：当日正在运行的 Claude Desktop，原生窗口截图 3796×2178 px（2×）。搜索面板裁切后为 1344×1004 px；不缩放。
- 修改前：用户附件 `codex-clipboard-00e0a077-b3b0-474e-a46e-d68f3d839554.png`。其中面板约 1204px 宽、结果行 64px 高（2×）。
- 实现：实际 `dsh-shortcutter/lib/client.js` 与本仓库 `lib/client.js`，加载真实 React，运行在 Shortcutter 的浏览器宿主夹具内。桌面视口 1280×820 CSS px、DPR 2；窄视口 360×600、DPR 2。截图测得面板 1344×1004 px、结果行 72px。
- 当前原版资源：`Claude.app/Contents/Resources/ion-dist.asar`。搜索图标从其中的 Anthropicons 字体导出；原版结果行的 `px-3 py-2`、20px 图标和 8px 图文间距也与截屏测量相符。
- 直接比较：把原版与新实现的顶栏及前四行按原始倍率上下排列；同时检查深色全图、浅色、空结果、窄窗口和暖色变体。没有拉伸图片或重新绘制界面。

原图和包含会话名称的对照图保存在仓库外 `../local/verification-private/f-search-0.11.6/`，不随插件打包：`claude-native-crop.png`、`before-comparison.png`、`after-comparison.png`、`dark-full.png`、`light.png`、`narrow.png`、`empty.png`、`warm.png`。同目录 `run.mjs` 是本次验证入口。

## 发现与修正

| 发现 | 修正 | 复核 |
| --- | --- | --- |
| P1：面板和行高压缩，整体留白少于原版 | 672px 宽，60px 顶栏加 1px 分隔线，36px 行高，10px 列表内边距，440px 滚动区域 | 同倍率面板尺寸与原版一致 |
| P2：代码/回车为近似轮廓，搜索/关闭图标偏小 | 原始字形轮廓，20px 搜索/代码/关闭、16px 回车 | 对照原图检查轮廓和位置；来源见 assets provenance |
| P2：普通标题偏亮、时间偏暗、边框偏厚 | 标题与时间 #A6A6A6，时间 12px；独立分隔线颜色；0.5px 内描边 | 对照底色、文字及边线；选中底保持 #4F4F4F |
| P2：键盘选择淡入淡出，与原版即时反馈不同 | 结果行取消颜色和背景过渡 | 方向键移动、搜索变化后截图稳定，无残留高亮 |

## 验证与限制

`npm run check` 通过。浏览器验证通过：标题过滤、项目过滤、空结果、Tab 焦点循环、方向键滚动、Escape 恢复导航、浅色/暖色与保留 DSH 模式的可逆性；页面错误为零。完整几何记录在 `report.json`。

这次原版对照针对深色搜索面板。浅色和暖色完成布局与功能回归；未声称与 Claude 浅色原版逐像素相同。浏览器夹具验证不等同于在已安装 DSH 内完成原生键盘验收。字体和 SVG 的栅格化仍可能与 Claude 字体图标存在细小像素差异，未声称整体逐像素一致。

final result: passed（本次深色视觉校准与浏览器回归范围内，无遗留 P0/P1/P2）
