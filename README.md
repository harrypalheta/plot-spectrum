# Plot Spectrum


This is an application for plotting through a serial port.

Developed in Electron/Node.js, Chart.js and SerialPort.

A basic Electron application needs just these files:

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `index.html` - A web page to render. This is the app's **renderer process**.

You can learn more about each of these components within the [Quick Start Guide](http://electron.atom.io/docs/tutorial/quick-start).

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/electron/plot-spectrum
# Go into the repository
cd plot-spectrum
# Install dependencies
npm install
# Run the app
npm start
```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.


## How does it work?

Install the package with --save-dev:
```bash
npm install --save-dev electron-rebuild
```
Then, whenever you install a new npm package, rerun electron-rebuild:
```bash
$(npm bin)/electron-rebuild
```

Or if you're on Windows:

```cmd
.\node_modules\.bin\electron-rebuild.cmd
```
If you have a good node-gyp config but you see an error about a missing element on Windows like Could not load the Visual C++ component "VCBuild.exe", try to launch electron-rebuild in an npm script:
```json
"scripts": {
  "rebuild": "electron-rebuild -f -w yourmodule"
}
```

and then
```bash
npm run rebuild
```
## Resources for Learning Electron

- [electron.atom.io/docs](http://electron.atom.io/docs) - all of Electron's documentation
- [electron.atom.io/community/#boilerplates](http://electron.atom.io/community/#boilerplates) - sample starter apps created by the community
- [electron/electron-quick-start](https://github.com/electron/electron-quick-start) - a very basic starter Electron app
- [electron/simple-samples](https://github.com/electron/simple-samples) - small applications with ideas for taking them further
- [electron/electron-api-demos](https://github.com/electron/electron-api-demos) - an Electron app that teaches you how to use Electron
- [hokein/electron-sample-apps](https://github.com/hokein/electron-sample-apps) - small demo apps for the various Electron APIs

## License

[CC0 1.0 (Public Domain)](LICENSE.md)
