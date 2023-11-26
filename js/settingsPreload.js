// ./js/settingsPreload.js

const { contextBridge, ipcRenderer } = require('electron');

// 所有的 Node.js API接口 都可以在 preload 进程中被调用.
// 它拥有与Chrome扩展一样的沙盒。

contextBridge.exposeInMainWorld('aboutStudentsList', {
    getList: () => ipcRenderer.invoke('getList'),
})

contextBridge.exposeInMainWorld('settings', {
    confirm: (newList) => ipcRenderer.send('updateSettings', newList),
    cancel: () => ipcRenderer.send('closeSettings'),
  })
  