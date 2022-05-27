const { platform } = require('os')
const { exec } = require('child_process')

const WINDOWS_PLATFORM = 'win32'
const MAC_PLATFORM = 'darwin'
const osPlatform = platform()

module.exports = class Browser {
  static openWith (url) {
    if (osPlatform === WINDOWS_PLATFORM) {
      exec(`start ${url}`)
    } else if (osPlatform === MAC_PLATFORM) {
      exec(`open ${url}`)
    } else {
      console.log('Unsupported platform: ' + osPlatform)
    }
  }
}
