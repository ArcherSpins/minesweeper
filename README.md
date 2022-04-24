# Minesweeper

- Our goal will be to implement a version of the Minesweeper game that can be played in a REPL shell


## Project dependencies

- The project uses pure javascript without using third-party packages. The built-in modules readline and crypto were used

- Before working, you need to make sure that you have Node 18 version, if this is not the case, then please do it.
- You can do this on the website https://nodejs.org/en/


## Commands

- The project provides several commands


### Project launch

- Enter the following command in the project folder console `node index.js`


### The beginning of the game

- Enter the following command in the project folder console `(new or n) c r m l`

c - number of columns
r - number of rows
m - number of mines
l - (optional) number of lives

Example 1 - `new 10 10 30`
Example 2 - `n 10 10 30`


### Set theme color

- Enter the following command in the project folder console `(theme or t) color`

color - theme color (default | black | red | green | yellow | blue | cyan)

Example 1 - `theme red`
Example 2 - `t green`

### Open a square

- Enter the following command in the project folder console `(open or o) c r`

c - Column number
r - Column row

Example 1 - `open 2 3`
Example 2 - `o 2 3`


### Set flag

- Enter the following command in the project folder console `(flag or f) c r`

c - Column number
r - Column row

Example 1 - `flag 2 3`
Example 2 - `f 2 3`