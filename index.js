const readlinePromises = require('readline/promises')
const Game = require('./game')

const app = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
})

let game

app.on('line', (line) => {
  const [command, ...args] = line.split(/\s+/).filter(Boolean)

  switch(command) {
    case 'n':
    case 'new':
      if ((args.length === 3) || (args.length === 4) && args.every((arg) => !isNaN(Number(arg)))) {
        const [width, height, minesNumber, lives] = args
        game = new Game(width, height, minesNumber, lives)
        console.log(`\n${game}\n`)
      }
      break

    case 'o':
    case 'open':
      if (args.length === 2 && args.every((arg) => !isNaN(Number(arg)))) {
        const [row, col] = args
        game.openSquare(col, row)
        console.log(`\n${game}\n`)
      }
      break

    case 'f':
    case 'flag':
      if (args.length === 2 && args.every((arg) => !isNaN(Number(arg)))) {
        const [row, col] = args
        game.flagSquare(col, row)
        console.log(`\n${game}\n`)
      }
      break

    case 't':
    case 'theme':
      if (args.length) {
        const [theme] = args
        game.setTheme(theme)
        console.log(`\n${game}\n`)
      }
      break

    default:
      break
  }

  app.prompt()
});

app.prompt()
// Reset = "\x1b[0m"
// Bright = "\x1b[1m"
// Dim = "\x1b[2m"
// Underscore = "\x1b[4m"
// Blink = "\x1b[5m"
// Reverse = "\x1b[7m"
// Hidden = "\x1b[8m"

// FgBlack = "\x1b[30m"
// FgRed = "\x1b[31m"
// FgGreen = "\x1b[32m"
// FgYellow = "\x1b[33m"
// FgBlue = "\x1b[34m"
// FgMagenta = "\x1b[35m"
// FgCyan = "\x1b[36m"
// FgWhite = "\x1b[37m"

// BgBlack = "\x1b[40m"
// BgRed = "\x1b[41m"
// BgGreen = "\x1b[42m"
// BgYellow = "\x1b[43m"
// BgBlue = "\x1b[44m"
// BgMagenta = "\x1b[45m"
// BgCyan = "\x1b[46m"
// BgWhite = "\x1b[47m"
