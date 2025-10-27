# 项目说明（QWEN.md）

## 项目概述

**项目名称**：摸鱼阅读（secret-reader）

**类型**：基于 React + Material-UI + Webpack 的 uTools 插件

**主要功能**：
- 在 uTools 中嵌入一个小说阅读器，支持 txt、epub、mobi 格式。
- 可添加本地电子书到书架，支持封面设置、章节跳转、搜索跳转。
- 提供多种阅读器设置（字体、颜色、透明度、翻页方式、快捷键等）。
- 支持暗黑/明亮主题随系统切换。
- 提供老板键、自动翻页、快速隐藏等功能，方便在工作环境中隐蔽阅读。

**技术栈**：
- 前端框架：React 17
- UI 库：Material-UI v4
- 构建工具：Webpack 5 + Babel
- 样式处理：Less + CSS Loader + Style Loader
- 其他：uTools API、iconv-lite、jschardet、epub、js-mobi

**架构**：
- `src/index.js`：入口文件，渲染 `App` 组件。
- `src/App.js`：主应用组件，包含书架 UI、阅读器逻辑、设置面板、搜索/章节跳转等功能。
- `public/`：静态资源（HTML 模板、预加载脚本、图片等）。
- `webpack.config.js`：构建配置，定义入口、输出、loader、插件等。

## 构建与运行

**安装依赖**：
```bash
npm install
```

**开发模式**（监听文件变化并自动构建）：
```bash
npm run dev
```
对应命令：`webpack -w`（watch 模式，默认 development 配置）

**生产构建**：
```bash
npm run build
```
对应命令：`webpack --mode production`（输出到 `dist/` 目录，并复制 `public/` 内容）

**运行方式**：
- 构建完成后，将 `dist` 目录作为 uTools 插件的打包目录。
- 在 uTools 中加载该插件，即可使用阅读器功能。

## 开发约定

- **代码风格**：使用 ES6+ 语法，React 类组件，Material-UI 组件风格。
- **样式**：Less 编写，使用 CSS Modules 或全局类名，配合 Material-UI 样式系统。
- **数据存储**：通过 `window.utools.db` 存储书籍列表、用户配置、封面等。
- **文件读取**：通过 `window.services` 调用 uTools 插件 API 读取本地文件内容。
- **快捷键**：需在 uTools 全局快捷键中配置对应 code（如 `close-fish-book`、`toggle-show-fish-book`、`toggle-auto-page`）。
- **主题切换**：监听 `prefers-color-scheme` 媒体查询自动切换。

## 目录结构

```
Moyu-reader/
├── public/               # 静态资源（HTML、JS、图片等）
├── src/                  # 源码目录
│   ├── index.js          # 入口文件
│   ├── App.js            # 主应用组件
├── webpack.config.js     # Webpack 构建配置
├── package.json          # 项目依赖与脚本
├── README.md             # 项目说明
├── migration-plan-tauri.md # 迁移到 Tauri 的详细计划
└── QWEN.md               # 本文件（项目分析说明）
```

## TODO
- 添加单元测试或集成测试，确保主要功能稳定。
- 优化 mobi 格式解析支持。
- 增加更多字体支持及字体文件管理。
- 考虑使用函数组件 + Hooks 重构部分逻辑以简化状态管理。

---

## 摸鱼阅读迁移到 Tauri 计划

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
