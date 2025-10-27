# 项目说明（QWEN.md）

## 项目概述

**项目名称**：摸鱼阅读（secret-reader）

**类型**：基于 React + Material-UI + Webpack 的 uTools 插件，已支持迁移到 Tauri 桌面应用。

**主要功能**：
- 在 uTools 或 Tauri 中嵌入一个小说阅读器，支持 txt、epub、mobi 格式。
- 可添加本地电子书到书架，支持封面设置、章节跳转、搜索跳转。
- 提供多种阅读器设置（字体、颜色、透明度、翻页方式、快捷键等）。
- 支持暗黑/明亮主题随系统切换。
- 提供老板键、自动翻页、快速隐藏等功能，方便在工作环境中隐蔽阅读。

**技术栈**：
- 前端框架：React 17
- UI 库：Material-UI v4
- 构建工具：Webpack 5 + Babel
- 样式处理：Less + CSS Loader + Style Loader
- 后端（Tauri）：Rust + Tauri API
- 其他：iconv-lite、jschardet、epub、js-mobi

**架构**：
- `src/index.js`：入口文件，渲染 `App` 组件。
- `src/App.js`：主应用组件，包含书架 UI、阅读器逻辑、设置面板、搜索/章节跳转等功能。
- `public/`：静态资源（HTML 模板、预加载脚本、图片等）。
- `webpack.config.js`：构建配置，定义入口、输出、loader、插件等。
- `src-tauri/`：Tauri 配置与 Rust 源码目录。

## 构建与运行

**安装依赖**：
```bash
npm install
```

**uTools 开发模式**：
```bash
npm run dev   # webpack watch
```

**uTools 生产构建**：
```bash
npm run build # 输出到 dist/
```
构建完成后，将 `dist` 目录作为 uTools 插件打包目录加载。

**Tauri 开发模式**：
```bash
npm run build       # 构建前端
npm run tauri dev   # 启动 Tauri 应用
```

**Tauri 打包**：
```bash
npm run tauri build # 生成安装包
```

## 开发约定
- **代码风格**：ES6+ 语法，React 类组件，Material-UI 风格。
- **样式**：Less 编写，CSS Modules 或全局类名，配合 Material-UI 样式系统。
- **数据存储**：
  - uTools 模式：`window.utools.db`
  - Tauri 模式：`@tauri-apps/plugin-store` 或 `fs` API
- **文件读取**：
  - uTools 模式：`window.services`
  - Tauri 模式：`dialog.open` + `fs.readFile`
- **快捷键**：在 uTools 全局快捷键中配置对应 code；Tauri 模式可使用 `globalShortcut` API。
- **主题切换**：监听 `prefers-color-scheme` 媒体查询自动切换。

## 目录结构
```
Moyu-reader/
├── public/               # 静态资源
├── src/                  # 前端源码
├── src-tauri/             # Tauri 配置与 Rust 源码
├── webpack.config.js     # Webpack 构建配置
├── package.json          # 项目依赖与脚本
├── README.md             # 项目说明
├── migration-plan-tauri.md # 迁移到 Tauri 的详细计划
└── QWEN.md               # 本文件
```

## TODO
- 添加单元测试或集成测试，确保主要功能稳定。
- 优化 mobi 格式解析支持。
- 增加更多字体支持及字体文件管理。
- 考虑使用函数组件 + Hooks 重构部分逻辑以简化状态管理。

---

## 摸鱼阅读迁移到 Tauri 计划（进度）
- [x] 分析并替换 uTools API（文件选择、数据存储、多窗口）
- [x] 初始化 Tauri 项目骨架
- [x] 替换文件选择功能为 `dialog.open`
- [x] 替换数据存储为 Tauri Store / fs API
- [x] 替换多窗口功能为 Tauri 多窗口 API
- [x] 移除 uTools 特有事件绑定
- [x] 构建最小可运行版本并测试基本功能
- [ ] 恢复高级功能（章节跳转、搜索跳转、封面设置、快捷键等）
- [ ] 跨平台测试（Windows、macOS、Linux）
- [ ] 打包 Tauri 应用并生成安装包