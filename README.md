# 摸鱼阅读（secret-reader）

## 项目简介

摸鱼阅读是一款方便你在工作环境中隐蔽阅读小说的工具，最初作为 **uTools 插件** 开发，现已支持迁移到 **Tauri 桌面应用**。灵感来自 thief-book，设计原型参考了本站插件“偷摸读”。

支持将本地 **txt / epub / mobi** 格式电子书添加到书架，提供丰富的阅读器设置（字体、背景颜色、透明度、翻页方式、快捷键等），并可将阅读界面嵌入到工作界面中，避免被发现。

---

## 格式支持
- **txt**：支持常见编码（GBK、UTF-8、UTF-16、GB2312、GB18030 等）
- **epub**：支持 UTF-8 编码
- **mobi**：基础支持（解析优化中）

---

## 核心功能
1. 点击加号选择本地电子书文件添加到书架（支持拖拽或快捷添加）
2. 书籍卡片右键菜单：搜索内容、章节跳转
3. 点击封面立即开始阅读
4. 阅读器设置面板：字体、颜色、透明度、翻页方式、快捷键等
5. 帮助面板：老板键、字体设置等详细说明
6. 暗黑/明亮主题随系统切换

---

## 注意事项
- 老板键执行时在 uTools 模式下会闪现主界面（uTools 限制）
- 快捷键翻页需阅读窗口处于焦点状态

---

## 构建与运行

### uTools 插件模式
```bash
npm install
npm run dev   # 开发模式（webpack watch）
npm run build # 生产构建（输出到 dist/）
```
构建完成后，将 `dist` 目录作为 uTools 插件打包目录加载。

### Tauri 桌面应用模式
```bash
npm install
npm run build           # 构建前端（输出到 dist/）
npm run tauri dev       # 启动 Tauri 开发模式
npm run tauri build     # 打包 Tauri 应用
```
Tauri 模式下，uTools API 已替换为 Tauri API（文件选择、数据存储、多窗口等）。

---

## 技术栈
- **前端**：React 17 + Material-UI v4 + Less
- **构建**：Webpack 5 + Babel
- **后端（Tauri）**：Rust + Tauri API
- **其他**：iconv-lite、jschardet、epub、js-mobi

---

## 迁移说明
- 已完成 uTools → Tauri API 替换（文件选择、数据存储、多窗口）
- 移除 uTools 特有事件绑定，改为 React 生命周期初始化
- 保留原有 UI 与交互逻辑
- 详见 [migration-plan-tauri.md](migration-plan-tauri.md)

---

## 致谢
感谢 thief-book 与《偷摸读》插件的作者提供灵感与设计参考。