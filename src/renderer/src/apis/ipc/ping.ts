export function ipcPing() {
  window.electron.ipcRenderer.send('ping')
}
