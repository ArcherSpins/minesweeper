class Square {
  open = false
  flag = false
  bomb = false
  value = 0

  constructor (col, row) {
    this.col = col
    this.row = row
  }

  toString () {
    if (this.flag) return '\x1b[45m‼\x1b[0m'
    if (this.open) {
      if (this.bomb) return `\x1b[41m${this.bomb}\x1b[0m`
      if (this.value) return `\x1b[1;3${this.value}m${this.value}\x1b[0m`
      return ' '
    }
    return '█'
  }
}

module.exports = Square
