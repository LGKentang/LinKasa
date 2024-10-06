// press 'C' for Chat toggle shortcut

// const ShortcutInterface = () => {

// }

const { app, globalShortcut } = require('electron')

app.whenReady().then(() => {

  const ret = globalShortcut.register('CommandOrControl+X', () => {
    console.log('Shortcut activated')
  })

  if (!ret) {
    console.log('Shortcut registration failed')
  }

 
  console.log(globalShortcut.isRegistered('CommandOrControl+X'))
})

app.on('will-quit', () => {
 
  globalShortcut.unregister('CommandOrControl+X')

  globalShortcut.unregisterAll()
})
