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

function printAliensLeft() {
  for (let rows = 1; rows < 4; rows++)
    for (let i = 0; i < rows * width; i++) {
      if (i === width - 1 || i === 2 * width - 1 || i === 3 * width - 1) {
        cells[i].classList.remove('alien')
      } else {
        cells[i].classList.add('alien')
      }
    }
}

printAliensLeft()

// ******************************************

document.addEventListener('keypress', (event) => {

  const key = event.key
  if (key === "a" && player > 72) {
    console.log('working')
    cells[player].classList.remove('player')
    player -= 1
    cells[player].classList.add('player')
  } else if (key === "d" && player < 80) {
    console.log('working')
    cells[player].classList.remove('player')
    player += 1
    cells[player].classList.add('player')
  } else if (key === 's') {
    shoot()
  }
})

function shoot() {

  for (let i = 0; i < 8; i++) {
    let bullet = player
    const interval = setInterval(() => {
      if (cells[bullet].classList.contains('alien')) {
        cells[bullet].classList.remove('alien')
        return
      } else if (bullet > 0) {
        cells[bullet].classList.remove('bullet')
        bullet -= width
        cells[bullet].classList.add('bullet')
      } else {
        clearInterval(interval)
      }}, 200)
  }
}



