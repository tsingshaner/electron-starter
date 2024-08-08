import type { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  var electron: ElectronAPI
  var api: unknown
}
