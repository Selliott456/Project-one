const width = 9
const grid = document.querySelector('.grid')
let spaceShip = 3
let alien = 4
const cells = []
let player = 76




for (let i = 0; i < width ** 2; i++) {

  const div = document.createElement('div')
  div.classList.add('cell')
  grid.appendChild(div)
  cells.push(div)
  div.innerHTML = i
}

cells[player].classList.add('player')
// ************************************

function printAliensRight() {

  for (let rows = 1; rows < 4; rows++)
    for (let i = 0; i < rows * width; i++) {
      if (!cells[i].classList.contains('bulletHole')) {
       if (i === width - width || i === 2 * width - width || i === 3 * width - width) {
          cells[i].classList.remove('alien')
        } else {
          cells[i].classList.add('alien')
        }
      }

    }
}
function printAliensLeftStart() {
  for (let rows = 1; rows < 4; rows++)
    for (let i = 0; i < rows * width; i++) {
      if (i === width - 1 || i === 2 * width - 1 || i === 3 * width - 1) {
        cells[i].classList.remove('alien')
      } else {
        cells[i].classList.add('alien')
      }
    }

}


function printAliensLeft() {
  for (let rows = 1; rows < 4; rows++)
    for (let i = 0; i < rows * width; i++) {
      if (!cells[i].classlist.contains('bulletHole')){
        if (i === width - 1 || i === 2 * width - 1 || i === 3 * width - 1) {
          cells[i].classList.remove('alien')
        } else {
          cells[i].classList.add('alien')
        }
      }

    }
}


// 
// function printAliensDownLeft() {
// 
// for (let rows = 1; rows < 4; rows++)
// for (let i = 0; i < (rows) * width; i++) {
// if (i === width - 1 || i === 2 * width - 1 || i === 3 * width - 1) {
// cells[i + 9].classList.remove('alien')
// } else {
// cells[i + 9].classList.add('alien')
// }
// }
// }
// 

// function printAliensDownRight() {
// 
// for (let rows = 1; rows < 4; rows++)
// for (let i = 0; i < rows * width; i++) {
// let counter = 1
// if ((i === width - width || i === 2 * width - width || i === 3 * width - width) && i < width * counter) {
// cells[i + 9].classList.remove('alien')
// } else {
// cells[i + 9].classList.add('alien')
// 
// }
// }
// }



const moveAliens = setInterval(() => {
  printAliensLeftStart()
  setTimeout(() => {
    printAliensRight()
  }, 1000)

}, 2000)

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






