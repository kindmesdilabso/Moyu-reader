import { open } from '@tauri-apps/api/dialog'

/**
 * 打开文件选择对话框，支持 txt/epub/mobi 格式
 * @returns {Promise<string | string[] | null>} 选中的文件路径或路径数组
 */
export async function tauriShowOpenDialog() {
  return await open({
    multiple: false,
    filters: [
      {
        name: '电子书',
        extensions: ['txt', 'epub', 'mobi']
      }
    ]
  })
}