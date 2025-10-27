# uTools API → Tauri API 替换对照表

## 文件选择
- **uTools**：`window.utools.showOpenDialog({ filters, properties })`
- **Tauri**：`import { open } from '@tauri-apps/api/dialog'`
  ```js
  const selected = await open({ filters: [{ name: 'Txt', extensions: ['txt','epub','mobi'] }] });
  ```

## 数据存储
- **uTools**：`window.utools.db.get(key)` / `put(doc)` / `postAttachment(id, data, mime)` / `getAttachment(id)` / `remove(id)`
- **Tauri**：可选方案：
  1. 使用 `@tauri-apps/plugin-store` 持久化 JSON 数据。
  2. 使用 `@tauri-apps/api/fs` 读写文件。
  3. 使用 SQLite（通过插件或 Rust 后端）。

## 多窗口
- **uTools**：`window.utools.createBrowserWindow(url, options, callback)`
- **Tauri**：`import { WebviewWindow } from '@tauri-apps/api/window'`
  ```js
  const win = new WebviewWindow('book', { url: 'book.html', width: 800, height: 600 });
  ```

## 事件绑定
- **uTools**：`window.utools.onPluginEnter(cb)` / `onPluginReady(cb)` / `onPluginOut(cb)`
- **Tauri**：无直接等价，需要改为 React 生命周期或自定义事件。
  - 应用启动 → React `useEffect` 初始化。
  - 窗口事件 → `@tauri-apps/api/event` 监听。

## 平台检测
- **uTools**：`window.utools.isMacOs()` / `isWindows()` / `isLinux()`
- **Tauri**：`import { platform } from '@tauri-apps/api/os'`
  ```js
  const os = await platform(); // 'darwin' | 'win32' | 'linux'
  ```

## 其他 API
- `window.utools.getNativeId()` → Tauri 无直接等价，可用 `uuid` 或自定义设备 ID。
- `window.utools.hideMainWindow()` → Tauri 可用 `appWindow.hide()`。
- `window.utools.screenColorPick(cb)` → Tauri 无内置取色器，需要前端实现或调用系统 API。
