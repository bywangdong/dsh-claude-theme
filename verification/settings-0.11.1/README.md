# 0.11.1 侧栏设置按钮验证

原因：旧齿轮来自账户菜单容器的 `::after`，且 `pointer-events: none`；点击实际落在账户菜单触发器上。

修复：通过宿主 `sidebar.footer.action` 提供独立按钮，调用当前设置所有者的共享 `actions.open()`。移除装饰齿轮，给账户区域预留按钮空间；没有替换原账户菜单或拦截页面点击。

已在 DSH 0.2.2-rc.3 隔离 profile 的真实运行时验证：

- 点击 Settings 齿轮：直接出现一个设置对话框，没有账户菜单。
- 点击账户入口：仍出现 Settings、Feedback、Sign in 菜单，没有误开设置。
- 空格键激活齿轮：同样直接打开设置；关闭后焦点回到齿轮。
- 折叠侧栏：附加按钮为零；展开后恢复且只有一个。
- 浏览器控制台 error 为空。
- `npm run check` 验证按钮调用设置所有者、所有者替换后使用最新动作、所有者不可用时安全隐藏，以及关闭主题/DSH 外观/折叠状态和订阅清理。

实图：`footer-button.jpg` 为侧栏按钮，`settings-opened.jpg` 为一次点击后的设置。界面截图来自真实运行时，未绘制或替换控件。

桌面验证：安装 0.11.1 后，原生窗口同时出现独立的 Settings 和 Account menu 按钮。实际点击 Settings 后直接出现含 Account / General / Models 等页面的设置面板；验证后关闭，恢复原会话。六个打包文件与安装内容逐字节匹配，其他插件依赖未改变，详见 `../installation-verification.json`。
