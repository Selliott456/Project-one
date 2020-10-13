const width = 9
const grid = document.querySelector('.grid')
const squares = document.querySelector('cells')
const cells= []
let currentInvaderIndex = 0
let alienInvadersTakeDown = []
let result = 0 
let player = 76
let direction = 1
let invaderID
const screen = document.querySelector('h3')
const alienInvaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 
  9, 10, 11, 12, 13, 14, 15, 16,
   18, 19, 20, 21, 22, 23, 23, 24, 25
   ]

   for (let i = 0; i < width ** 2; i++) {
  const div = document.createElement('div')
  div.classList.add('cell')
  grid.appendChild(div)
  cells.push(div)
  div.innerHTML = i
}

alienInvaders.forEach(invader => cells[invader].classList.add('alien'))
cells[player].classList.add('player')
function moveAliens {
const leftOfGrid = alienInvaders[0] % width === 0
const rightOfGrid = alienInvaders[alienInvaders.length -1]% width === width -1
if ((leftOfGrid && direction === -1) || (rightOfGrid && direction === 1)){
  direction === width
} else if (direction === width){
  if(leftOfGrid){
    direction = 1
  } else { 
    direction = -1}
  }
for (let i = 0; i<=alienInvaders.length-1; i++){
cells[alienInvaders[i]].classList.remove('alien')
alienInvaders[i] += direction
cells[alienInvaders[i]].classList.add('alien')
}
}






document.addEventListener('keypress', (event) => {

  const key = event.key
  if (key === "a" && player%width !==0) {
    console.log('working')
    cells[player].classList.remove('player')
    player -= 1
    cells[player].classList.add('player')
  } else if (key === "d" && player % width <width -1) {
    console.log('working')
    cells[player].classList.remove('player')
    player += 1
    cells[player].classList.add('player')
  } else if (key === 's') {
    shoot()
  }
})

function shoot() {

  let bullet = player
  const interval = setInterval(() => {

    if (bullet < width) {
      clearInterval(interval)
      cells[bullet].classList.remove('bullet')

    }

    if (bullet > 0) {
      cells[bullet].classList.remove('bullet')
      bullet -= width
      cells[bullet].classList.add('bullet')

    }

    if (cells[bullet].classList.contains('alien')) {
      cells[bullet].classList.remove('alien')
      cells[bullet].classList.remove('bullet')
      cells[bullet].classList.add('bulletHole')
      clearInterval(interval)
    }

  }, 200)
}

if(cells[player].classList.contains('alien', 'player')){
  resultScreen.innerHTML = 'Game Over'
  cells[player].classList.add('dead')
}