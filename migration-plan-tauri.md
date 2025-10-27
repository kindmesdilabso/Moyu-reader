# 摸鱼阅读迁移到 Tauri 计划

## 任务列表

1. **分析现有项目中所有依赖 uTools API 的地方，列出需要替换的功能点**
   - 搜索 `window.utools` 和 `window.services` 的调用位置。
   - 分类功能：文件选择、数据存储、多窗口、事件绑定、其他 API。
   - 输出替换方案对照表。

2. **初始化 Tauri 项目骨架，并配置前端构建输出到 Tauri dist 目录**
   - 使用 `npm create tauri-app` 或手动添加 Tauri 配置。
   - 保留现有 React + Webpack 构建流程，输出到 Tauri `dist`。

3. **替换文件选择功能**
   - 将 `window.utools.showOpenDialog` 替换为 Tauri 的 `dialog.open` API。
   - 测试文件选择对 txt/epub/mobi 的支持。

4. **替换数据存储功能**
   - 将 `window.utools.db` 替换为 Tauri 的 `store` 插件或 `fs` API。
   - 确保书架列表、用户配置、封面等数据可持久化。

5. **替换多窗口功能**
   - 将 `window.utools.createBrowserWindow` 替换为 Tauri 多窗口 API。
   - 测试阅读器窗口的创建、显示、隐藏、关闭。

6. **移除 uTools 特有事件绑定**
   - 删除 `onPluginEnter`、`onPluginReady`、`onPluginOut` 等事件绑定。
   - 改为普通 React 生命周期初始化逻辑。

7. **构建最小可运行版本并测试基本功能**
   - 文件选择 → 添加到书架 → 打开阅读器。
   - 确保 UI 正常渲染，基本交互可用。

8. **逐步恢复高级功能**
   - 章节跳转、搜索跳转、封面设置、快捷键等。
   - 按功能逐一替换并测试。

9. **测试所有功能在 Tauri 环境下的稳定性**
   - 跨平台测试（Windows、macOS、Linux）。
   - 检查性能、内存占用、文件读写稳定性。

10. **打包 Tauri 应用并生成安装包**
    - 使用 `npm run tauri build` 生成 `.exe` / `.app` / `.deb`。
    - 测试安装包运行效果。
