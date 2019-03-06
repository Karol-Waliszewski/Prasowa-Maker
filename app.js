// Requirements
const {
  app,
  BrowserWindow,
  Menu,
} = require('electron');
const path = require('path');

// Options
const BrowserOptions = {
  width: 600,
  heigth: 400,
  show: false,
  backgroundColor: '#ecf0f1',
  transparent: true,
  icon: path.join(__dirname, '/app/assets/icon.ico')
};

app.on('ready', () => {

  // Creating new window
  let win = new BrowserWindow(BrowserOptions);

  // Dev Tools
  //win.webContents.openDevTools();

  // Loading index.html view
  win.loadURL(`file://${__dirname}/app/index.html`);

  // Get rid off menu
  Menu.setApplicationMenu(null);

  // Creating show event
  win.once('ready-to-show', () => {
    win.show()
  })

  // Creating close event
  win.on('closed', () => {
    win = null;
    app.quit();
  });

});
