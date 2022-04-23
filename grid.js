class Grid {
  constructor (game) {
    this.game = game
  }

  get firstLine () {
    return `     ${this.widthArray()
      .map((_, idx) => `${this.padIdx(idx)}`)
      .join(' ')}
    ┌${this.widthArray('───').join('┬')}┐`
  }

  get dividerLine () {
    return `    ├${this.widthArray('───').join('┼')}┤`
  }

  get lastLine () {
    return `    └${this.widthArray('───').join('┴')}┘`
  }

  widthArray (fill = null) {
    return new Array(this.game.width).fill(fill)
  }

  padIdx (idx) {
    return String(idx).padStart(2, ' ').padEnd(3, ' ')
  }

  render () {
    return `${this.firstLine}
${this.game.field
  .map((row, idx) => ` ${this.padIdx(idx)}│ ${row.join(' │ ')} │`)
  .join(`\n${this.dividerLine}\n`)}
${this.lastLine}${this.game.over ? `\n        ${this.game.over}` : ''}`
  }
}

module.exports = Grid
