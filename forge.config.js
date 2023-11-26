module.exports = {
  packagerConfig: {
    // 基础配置
    name: "studentrandomizer", // 应用程序的名称
    productName: "studentrandomizer", // 产品名称
    icon: "./icons/icon.png", // 应用程序的图标路径
    overwrite: true, // 是否覆盖已存在的打包文件
    asar: true, // 是否使用asar打包格式
    version: "1.0.0", // 应用程序版本号
    copyright: "Copyright © Wit-Wang 2023", // 版权信息
    ignore: [ // 不需要打包的文件和文件夹的路径列表
      ".git",
      ".vscode",
      "node_modules/.cache"
    ],
    // 配置其他构建器
    win: { // Windows平台的配置
      target: "nsis", // 打包的目标格式为NSIS安装程序
      icon: "./icons/icon.icon.ico", // Windows平台的图标路径
      publisherName: "Wit Wang", // 发布者名称
      /* TODO
      fileAssociations: [ // 关联文件类型的配置
        {
          ext: "myext", // 文件扩展名
          name: "My Extension", // 文件类型名称
          description: "Open My Extension files", // 文件类型描述
          role: "Editor" // 文件类型的角色
        }
      ],
      certificateFile: "path/to/certificate.pfx", // 数字证书文件的路径
      certificatePassword: "password" // 数字证书的密码
      */
    },
    mac: { // macOS平台的配置
      target: "dmg", // 打包的目标格式为DMG镜像
      icon: "./icons/icon.icns", // macOS平台的图标路径
      category: "public.app-category.utilities", // 应用程序的分类
      extendInfo: { // 扩展应用程序包的配置
        NSAppTransportSecurity: {
          NSAllowsArbitraryLoads: true // 允许应用程序加载任意的网络资源
        }
      }
    },
    linux: { // Linux平台的配置
      target: "deb", // 打包的目标格式为DEB包
      icon: "./icons/icon.png", // Linux平台的图标路径
      category: "Utility", // 应用程序的分类
      description: "A software tool designed to randomly select students in the classroom.", // 应用程序的描述
      desktop: { // 创建桌面快捷方式的配置
        Name: "studentrandomizer", // 快捷方式的名称
        Comment: "A software tool designed to randomly select students in the classroom.", // 快捷方式的注释
        Exec: "./studentrandomizer", // 快捷方式的执行命令
        Terminal: false // 是否在终端中打开应用程序
      }
    },
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        authors: 'Wit Wang',
        description: 'A software tool designed to randomly select students in the classroom.'
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
};
