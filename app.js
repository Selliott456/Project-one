const width = 9
const grid = document.querySelector('.grid')
let spaceShip = 3
let alien = 4
const cells = []
let player = 76
console.log(player)



for (let i = 0; i < width ** 2; i++) {

  const div = document.createElement('div')
  div.classList.add('cell')
  grid.appendChild(div)
  cells.push(div)
  div.innerHTML = i
}

cells[player].classList.add('player')
// ************************************

function printAliens() {
  for (let rows = 1; rows < 4; rows++)
    for (let i = 0; i < rows * width; i++) {
      if (i === width - 1 || i === 2 * width - 1 || i === 3 * width - 1) {
        cells[i].classList.remove('alien')
      } else {
        cells[i].classList.add('alien')
      }
    }
}

printAliens()



document.addEventListener('keypress', (event) => {
  const key = event.key

  if (key === "a") {
    console.log('working')
    cells[player].classList.remove('player')
    player -= 1
    cells[player].classList.add('player')
  } else if (key === "d") {
    console.log('working')
    cells[player].classList.remove('player')
    player += 1
    cells[player].classList.add('player')
  } else if (key === 's') {
    for (let i = 0; i < width; i++) {
      let bullet = player
      const interval = setInterval(() => {
        cells[bullet].classList.remove('bullet')
        bullet -= width
        cells[bullet].classList.add('bullet')
      }, 100)
    }

  }
})
