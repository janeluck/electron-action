const {app, BrowserWindow} = require('electron')

const path = require('path')
const url = require('url')
require('./ipcMainEvent')
let window = null
const configStr = require('../electronicRemote/scaleconfig.json')
global.sharedObj = {
    configurations: configStr.configurations[0],
    name: 'janeluck'
}
// Wait until the app is ready
app.once('ready', () => {
    // Create a new window
    window = new BrowserWindow({
        // Set the initial width to 800px
        width: 800,
        // Set the initial height to 600px
        height: 600,
        // Don't show the window until it ready, this prevents any white flickering
        show: false,
        webPreferences: {
            // Disable node integration in remote page
            nodeIntegration: true
        }
    })

    // URL is argument to npm start
    //const url = process.argv[2]
    //window.loadURL(url)
     window.loadURL('http://10.6.211.248:3003/billing/touch')
/*    window.loadURL(url.format({
        protocol: 'file',
        slashes: true,
        pathname: path.join(__dirname, 'index_0515.html')
    }))*/
    // Show window when page is ready
    window.once('ready-to-show', () => {
        window.maximize()
        window.show()
    })


    // Open the DevTools.
    window.webContents.openDevTools()


    window.webContents.on('did-finish-load', () => {
        window.webContents.send('electronicBalance-change', '7.89')
    })


    // Emitted when the window is closed.
    window.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        window = null
    })


})