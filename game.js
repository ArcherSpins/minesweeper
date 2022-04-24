const { randomInt } = require('crypto')

const Grid = require('./grid')
const Square = require('./square')

class Game {
  over = false
  firstTurn = true

  constructor (width, height, mines, lives = 3) {
    this.width = Number(width)
    this.height = Number(height)
    this.mines = Number(mines)

    if (lives) {
      this.lives = lives;
    }

    this.field = new Array(this.height).fill(new Array(this.width).fill(0))
      .map(
        (col, colIdx) => col.map(
          (_, rowIdx) => new Square(colIdx, rowIdx)
        )
      )
  }

  get squares () {
    return this.field.flat()
  }

  mine (exceptSquare) {
    const minedSquares = this.squares
      .sort((a, b) => {
        if (a === exceptSquare) return 1
        if (b === exceptSquare) return -1
        return randomInt(2) || -1
      })
      .slice(0, this.mines)

    minedSquares.forEach((square) => {
      square.bomb = '¤'
    })

    for (let i = 0; i < minedSquares.length; i += 1) {
      this.neighbours(minedSquares[i]).forEach((square) => {
        if (square.bomb) return
        square.value += 1
      })
    }
  }

  neighbours (square) {
    const { col, row } = square
    const prevCol = col - 1
    const nextCol = col + 1
    const prevRow = row - 1
    const nextRow = row + 1

    return [
      this.field[prevCol]?.[row],
      this.field[nextCol]?.[row],
      this.field[prevCol]?.[prevRow],
      this.field[prevCol]?.[nextRow],
      this.field[nextCol]?.[prevRow],
      this.field[nextCol]?.[nextRow],
      this.field[col]?.[prevRow],
      this.field[col]?.[nextRow],
    ].filter(Boolean)
  }

  openSquare (col, row) {
    const square = this.field[col]?.[row]

    if (!square) return
    if (square.open) return
    if (square.flag) return

    if (this.firstTurn) {
      this.mine(square)
      this.firstTurn = false
    }

    square.open = true

    if (square.bomb) {
      this.lives--;
      this.over = `You fell for a mine, you have left ${this.lives} lives`;

      if (this.lives <= 0) {
        square.bomb = '\x1b[5mØ\x1b[0m'
        this.openAll()
        this.over = 'You loose!'
      }

      return
    }

    if (this.squares.filter(({ bomb }) => !bomb).every(({ open }) => open)) {
      this.openAll()
      this.over = 'You win!'
      return
    }

    const neighbours = this.neighbours(square)
    if (neighbours.every(({ bomb }) => !bomb)) {
      neighbours
        .filter(({ open, flag }) => !flag && !open)
        .forEach(({ col, row }) => this.openSquare(col, row))
    }
  }

  flagSquare (col, row) {
    const square = this.field[col]?.[row]

    if (!square) return
    if (square.open) return

    square.flag = !square.flag
  }

  openAll () {
    this.squares
      .filter(({ open }) => !open)
      .forEach((sq) => sq.open = true)
  }

  toString () {
    return new Grid(this).render()
  }
}

module.exports = Game
