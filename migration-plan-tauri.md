# 摸鱼阅读迁移到 Tauri 计划（更新版）

## 任务进度

1. **分析现有项目中所有依赖 uTools API 的地方** ✅
   - 已完成搜索 `window.utools` 和 `window.services` 调用位置。
   - 分类功能：文件选择、数据存储、多窗口、事件绑定、其他 API。
   - 已输出替换方案对照表（见 migration-notes/utools-to-tauri-map.md）。

2. **初始化 Tauri 项目骨架，并配置前端构建输出到 Tauri dist 目录** ✅
   - 已使用手动配置方式集成 Tauri。
   - 保留 React + Webpack 构建流程，输出到 `dist/` 并供 Tauri 使用。

3. **替换文件选择功能** ✅
   - 已将 `window.utools.showOpenDialog` 替换为 Tauri `dialog.open` API。
   - 测试通过 txt/epub/mobi 文件选择。

4. **替换数据存储功能** ✅
   - 已将 `window.utools.db` 替换为 Tauri `@tauri-apps/plugin-store` 插件。
   - 数据持久化验证通过（书架列表、用户配置、封面等）。

5. **替换多窗口功能** ✅
   - 已将 `window.utools.createBrowserWindow` 替换为 Tauri 多窗口 API。
   - 阅读器窗口创建、显示、隐藏、关闭功能正常。

6. **移除 uTools 特有事件绑定** ✅
   - 已删除 `onPluginEnter`、`onPluginReady`、`onPluginOut` 等事件绑定。
   - 改为 React 生命周期初始化逻辑。

7. **构建最小可运行版本并测试基本功能** ✅
   - 文件选择 → 添加到书架 → 打开阅读器流程正常。
   - UI 渲染与交互正常。

8. **逐步恢复高级功能** ⏳
   - 章节跳转、搜索跳转、封面设置、快捷键等功能正在迁移中。

9. **测试所有功能在 Tauri 环境下的稳定性** ⏳
   - 计划进行 Windows、macOS、Linux 跨平台测试。
   - 检查性能、内存占用、文件读写稳定性。

10. **打包 Tauri 应用并生成安装包** ⏳
    - 将使用 `npm run tauri build` 生成 `.exe` / `.app` / `.deb`。
    - 安装包测试待完成。

---

## 备注
- 迁移过程中保留了原有 UI 与交互逻辑，确保用户体验一致。
- 迁移记录与 API 替换详情见 `migration-notes/utools-to-tauri-map.md`。