import {
  screen,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  Rectangle,
  Tray,
  Menu,
  app,
} from "electron";
import Store from "electron-store";
import { UserProvider } from "../../renderer/session/UserSession";
import { useContext } from "react";

export const createWindow = (
  windowName: string,
  options: BrowserWindowConstructorOptions
): BrowserWindow => {
  const key = "window-state";
  const name = `window-state-${windowName}`;
  const store = new Store<Rectangle>({ name });
  const defaultSize = {
    width: options.width,
    height: options.height,
  };
  let state = {};

  const restore = () => store.get(key, defaultSize);
  let tray = null;

  const createTray = () => {
    const trayMenu = Menu.buildFromTemplate([
      {
        label: "Dashboard",
        type: "normal",
        click: () => {
          win.show();
          win.focus();
        },
      },
      { label: "Settings", type: "normal", click: () => {} },
      { label: "About LinKasa", type: "normal", click: () => {} },
      { label: "Logout", type: "normal", click: () => {} },
      { type: "separator" },
      {
        label: "Quit",
        click: () => {
          app.quit();
        },
      },
    ]);

    tray = new Tray(
      "C:/Users/darre/Documents/VPProjects/LinKasa/app/LinKasa-img.png"
    ); // Replace with your icon path
    tray.setToolTip("LinKasa");
    tray.setContextMenu(trayMenu);
  };

  const getCurrentPosition = () => {
    const position = win.getPosition();
    const size = win.getSize();
    return {
      x: position[0],
      y: position[1],
      width: size[0],
      height: size[1],
    };
  };

  const windowWithinBounds = (windowState, bounds) => {
    return (
      windowState.x >= bounds.x &&
      windowState.y >= bounds.y &&
      windowState.x + windowState.width <= bounds.x + bounds.width &&
      windowState.y + windowState.height <= bounds.y + bounds.height
    );
  };

  const resetToDefaults = () => {
    const bounds = screen.getPrimaryDisplay().bounds;
    return Object.assign({}, defaultSize, {
      x: (bounds.width - defaultSize.width) / 2,
      y: (bounds.height - defaultSize.height) / 2,
    });
  };

  const ensureVisibleOnSomeDisplay = (windowState) => {
    const visible = screen.getAllDisplays().some((display) => {
      return windowWithinBounds(windowState, display.bounds);
    });
    if (!visible) {
      // Window is partially or fully not visible now.
      // Reset it to safe defaults.
      return resetToDefaults();
    }
    return windowState;
  };

  const saveState = () => {
    if (!win.isMinimized() && !win.isMaximized()) {
      Object.assign(state, getCurrentPosition());
    }
    store.set(key, state);
  };

  state = ensureVisibleOnSomeDisplay(restore());

  const win = new BrowserWindow({
    ...state,
    ...options,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      ...options.webPreferences,
    },
  });
  app
    .whenReady()
    .then(createTray)
    .catch((e) => console.log(e));
  win.on("close", saveState);

  return win;
};
