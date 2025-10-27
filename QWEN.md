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
└── QWEN.md               # 本文件（项目分析说明）
```

## TODO
- 添加单元测试或集成测试，确保主要功能稳定。
- 优化 mobi 格式解析支持。
- 增加更多字体支持及字体文件管理。
- 考虑使用函数组件 + Hooks 重构部分逻辑以简化状态管理。
