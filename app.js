const width = 9
const grid = document.querySelector('.grid')
const squares = document.querySelector('cells')
const cells = []
let deadAliens = []
let score = 0
let player = 76
let direction = 1
const screen = document.querySelector('h3')
const alienArray = [
  0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 23, 24, 25
]



for (let i = 0; i < width ** 2; i++) {
  const div = document.createElement('div')
  div.classList.add('cell')
  grid.appendChild(div)
  cells.push(div)
  div.innerHTML = i
}
cells[player].classList.add('player')

alienArray.forEach((alien) => { cells[alien].classList.add('alien') })

const interval = setInterval(() => {
  const leftOfGrid = (alienArray[0] % width === 0)
  const rightOfGrid = (alienArray[alienArray.length - 1] % width === width - 1)
  if ((leftOfGrid && direction === -1) || (rightOfGrid && direction === 1)) {
    direction === width
  } else if (direction === width) {
    if (leftOfGrid) {
      direction = 1
    } else {
      direction = -1
    }
  }
  for (let i = 0; i <= alienArray.length - 1; i++) {
    if (!deadAliens.includes(i)) {
      cells[alienArray[i]].classList.remove('alien')
      alienArray[i] += direction
      cells[alienArray[i]].classList.add('alien')
    }
  }
  
  // if the alien and player are in the same box - GAME OVER
  if (cells[player].classList.contains('alien', 'player')) {
    screen.innerHTML = 'Game Over'
    cells[player].classList.add('dead')
    clearInterval(interval)
  }
  for (let i = 0; i <= alienArray.length - 1; i++) {
    if (alienArray[i] > cells.length - (width - 1))
      clearInterval(interval)
    screen.innerHTML = 'Game Over'
  }
}, 500)

document.addEventListener('keypress', (event) => {
//if keys are pressed, player moves, unless they have hit the side.
  const key = event.key
  if (key === "a" && player % width !== 0) {
    console.log('working')
    cells[player].classList.remove('player')
    player -= 1
    cells[player].classList.add('player')
  } else if (key === "d" && player % width < width - 1) {
    console.log('working')
    cells[player].classList.remove('player')
    player += 1
    cells[player].classList.add('player')
  } else if (key === 's') {
    shoot()
  }
})

function shoot() {
//bullet has to start from place player is
  let bullet = player
  const shootInterval = setInterval(() => {

    if (bullet < width) {
      clearInterval(shootInterval)
      cells[bullet].classList.remove('bullet')

    }
    //move bullet forward if it hasnt reached the last line
    if (bullet > 0) {
      cells[bullet].classList.remove('bullet')
      bullet -= width
      cells[bullet].classList.add('bullet')

    }
    //if the bullet collides with and alien, remove the alien class
    if (cells[bullet].classList.contains('alien')) {
      cells[bullet].classList.remove('alien')
      cells[bullet].classList.remove('bullet')
      cells[bullet].classList.add('bulletHole')
      //put the index of the shot alien in the array of Dead Aliens
      const remove = alienInvaders.indexOf(bullet)
      score++
      deadAliens.push('remove')
      screen.innerHTML = score
      clearInterval(shootInterval)
    }

  }, 200)
}
// Player wins if they shoot all the aliens
if (deadAliens.length === alienArray.length) {
  screen.innerHTML === 'You WIN!!'
}