const THEMES = {
  black: {
    square: '\x1b[30m█\x1b[0m',
    value: '\x1b[1;30m',
    flag: '\x1b[40m‼\x1b[0m'
  },
  red: {
    square: '\x1b[31m█\x1b[0m',
    value: '\x1b[1;31m',
    flag: '\x1b[41m‼\x1b[0m'
  },
  green: {
    square: '\x1b[32m█\x1b[0m',
    value: '\x1b[1;32m',
    flag: '\x1b[42m‼\x1b[0m'
  },
  yellow: {
    square: '\x1b[33m█\x1b[0m',
    value: '\x1b[1;33m',
    flag: '\x1b[43m‼\x1b[0m'
  },
  blue: {
    square: '\x1b[34m█\x1b[0m',
    value: '\x1b[1;34m',
    flag: '\x1b[44m‼\x1b[0m'
  },
  cyan: {
    square: '\x1b[36m█\x1b[0m',
    value: '\x1b[1;36m',
    flag: '\x1b[46m‼\x1b[0m'
  },
  default: {
    square: '\x1b[44m█\x1b[0m',
    flag: '\x1b[45m‼\x1b[0m'
  }
}

class Square {
  open = false
  flag = false
  bomb = false
  value = 0
  theme = THEMES.default

  constructor (col, row) {
    this.col = col
    this.row = row
  }


  setTheme (theme) {
    if (THEMES[theme]) {
      this.theme = THEMES[theme]
    }
  }

  toString () {
    if (this.flag) return this.theme.flag
    if (this.open) {
      if (this.bomb) return `\x1b[41m${this.bomb}\x1b[0m`
      if (this.value) {
        if (this.theme.value) {
          return `${this.theme.value}${this.value}\x1b[0m`
        }
        return `\x1b[1;3${this.value}m${this.value}\x1b[0m`
      }

      return ' '
    }
    return this.theme.square
  }
}

module.exports = Square
