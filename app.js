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


// ************************************
// added if statment to ensure cells that had been blown up do not re-paste and alien
//had to create bullethole class to distinguish between bulletholes and gaps at the sides.
// function printAliensRight() {
// 
  // for (let rows = 1; rows < 4; rows++)
    // for (let i = 0; i < rows * width; i++) {
      // if (!cells[i].classList.contains('bulletHole')) {
        // cells[i].classList.remove('bullethole')
        // cells[i].classList.add('alien')
        // cells[i + 1].classList.add('bullethole')
        // if (i === width - width || i === 2 * width - width || i === 3 * width - width) {
          // cells[i].classList.remove('alien')
        // } else {
          // cells[i].classList.add('alien')
        // }
      // }
// 
    // }
// }
// This prints the aliens before the interval kicks in
// function printAliensLeftStart() {
  // for (let rows = 1; rows < 4; rows++)
    // for (let i = 0; i < rows * width; i++) {
      // if (i === width - 1 || i === 2 * width - 1 || i === 3 * width - 1) {
        // cells[i].classList.remove('alien')
      // } else {
        // cells[i].classList.add('alien')
      // }
    // }
// 
// }


// function printAliensLeft() {
// 
  // for (let rows = 1; rows < 4; rows++)
    // for (let i = 0; i < rows * width; i++) {
      // if (!cells[i].classlist.contains('bulletHole')) {
        // cells[i].classList.remove('bullethole')
        // cells[i].classList.add('alien')
        // cells[i - 1].classList.add('bullethole')
        // if (i === width - 1 || i === 2 * width - 1 || i === 3 * width - 1) {
          // cells[i].classList.remove('alien')
        // } else {
          // cells[i].classList.add('alien')
        // }
      // }
// 
    // }
// }


// 
// function printAliensDownLeft() {
// 
  // let counter = 0
  // for (let rows = 1; rows < 4; rows++)
    // for (let i = 0; i < (rows) * width; i++) {
// 
      // if (i === width - 1 || i === 2 * width - 1 || i === 3 * width - 1 || i < width * counter) {
        // cells[i + width].classList.remove('alien')
      // } else {
        // cells[i + width].classList.add('alien')
      // }
    // }
// }
// 
// 
// function printAliensDownRight() {
  // let counter = 0
  // for (let rows = 1; rows < 4; rows++)
    // for (let i = 0; i < (rows) * width; i++) {
// 
      // if (i === width - width || i === 2 * width - width || i === 3 * width - width || i < width * counter) {
        // cells[i + width].classList.remove('alien')
      // } else {
        // cells[i + width].classList.add('alien')
      // }
    // }
  // counter++
// }
// 





// const moveAliens = setInterval(() => {
  // printAliensLeftStart()
  // setTimeout(() => {
    // printAliensRight()
  // }, 1000)
  // setTimeout(() => {
    // printAliensDownRight()
  // }, 1000)
  // setTimeout(() => {
    // printAliensDownLeft()
  // }, 1000)
// 
// }, 4000)
// 
// ******************************************

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