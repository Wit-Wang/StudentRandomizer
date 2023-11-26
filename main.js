// main.js

// 控制应用程序生命周期和创建本地浏览器窗口的模块
const { app, BrowserWindow, ipcMain } = require('electron')
if (require('electron-squirrel-startup')) app.quit();
const Store = require('electron-store');
const store = new Store();

const path = require('node:path')

const defaultList = ["StudentA","StudentB","StudentC","StudentD","StudentE","StudentF","StudentG"]
// 读取变量
// 检查是否已保存过变量
if (!store.has('studentsList') && store.get('studentsList') !== '') {
  // 如果未保存过或其为空，则以初始值进行保存
  store.set('studentsList', defaultList);
}
// 读取变量
let studentsList = store.get('studentsList');

const createMainWindow = () => {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    enableSandbox: true,
    show: false,
    width: 666,
    height: 666,
    titleBarStyle: 'hidden', // 隐藏系统标题栏
    resizable: false, // 设置窗口不可调整大小
    webPreferences: {
      //是否启用context bridge
			contextIsolation: true,
      // 禁用开发者工具
      devTools: false,
      preload: path.join(__dirname, '/js/preload.js')
    }
  })
  mainWindow.setWindowButtonVisibility(false)
  mainWindow.setMenu(null)

  // 共享公共变量
  ipcMain.handle('getList', () => {return studentsList}); // 将共享变量的值发送给渲染进程

  ipcMain.on('closethis', () => {mainWindow.destroy()}); // 关闭窗口
  ipcMain.on('minimizethis', () => {mainWindow.hide()}); // 最小化窗口

  ipcMain.on("openSettings", () => {
    console.log("open Settings windows");
    createSettingsWindow();
  });
  
  ipcMain.on("updateSettings", (_event, newList) => {
    if (newList===''){
      studentsList=defaultList;
    }
    else {
      
      studentsList = newList.split(/,|，|\s+/);
    }
    store.set('studentsList', studentsList);
    mainWindow.webContents.send('updateList', studentsList); // 发送通知给所有渲染进程
  });

  ipcMain.on('changeStatus', (_event, value) => {
    console.log(`changed student list to: ${value}`) // will print value to Node console
  })

  // 加载 index.html
  mainWindow.loadFile('index.html')
  // 打开开发工具
  // mainWindow.webContents.openDevTools()

  mainWindow.on('ready-to-show', function () {
    // 初始化后再显示
    mainWindow.show()
  })
}

const createSettingsWindow = () =>{
    // 创建浏览器窗口
    const settingWindow = new BrowserWindow({
      enableSandbox: true,
      show: false,
      width: 512,
      height: 512,
      titleBarStyle: 'hidden',
      resizable: false, // 设置窗口不可调整大小
      webPreferences: {
        //是否启用context bridge
        contextIsolation: true,
        // 禁用开发者工具
        devTools: false, 
        preload: path.join(__dirname, '/js/settingsPreload.js')
      }
    })
    settingWindow.setWindowButtonVisibility(false)
    settingWindow.setMenu(null)

    //收到更新或取消，关闭窗口
    const closeSettingsListener = () => {
      console.log("close Settings windows");
      ipcMain.removeListener("closeSettings", closeSettingsListener);
      settingWindow.removeAllListeners();
      settingWindow.destroy();
    };
    ipcMain.on("updateSettings", closeSettingsListener);
    ipcMain.on("closeSettings", closeSettingsListener);
  
    // 加载 index.html
    settingWindow.loadFile('settings.html')
  
    // 打开开发工具
    // settingWindow.webContents.openDevTools()

    settingWindow.on('ready-to-show', function () {
      // 初始化后再显示
      settingWindow.show()
    })
}

app.enableSandbox()
// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createMainWindow()
  app.on('activate', () => {
    // 在 macOS 系统内, 如果没有已开启的应用窗口
    // 点击托盘图标时通常会重新创建一个新窗口
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }else{
      winlist = BrowserWindow.getAllWindows()
      winlist.forEach(element => {
        element.show()
      });
    }
  })
})


app.on('window-all-closed', () => {
  // 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
  // 对应用程序和它们的菜单栏来说应该时刻保持激活状态, 
  // 直到用户使用 Cmd + Q 明确退出
  // TODO
  // if (process.platform !== 'darwin') app.quit()
  app.quit();
})
