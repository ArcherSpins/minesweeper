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

    default:
      break
  }

  app.prompt()
});

app.prompt()
