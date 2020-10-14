const body = document.querySelector('body')
const width = 9
let lives = 3
const grid = document.querySelector('.grid')
const squares = document.querySelector('cells')
const cells = []
const points = document.querySelector('.score')
let deadAliens = []
let score = 0
let player = 76
let direction = 1
const screen = document.querySelector('h3')
const alienArray = [
  25, 24, 23, 22, 21, 20, 19, 18, 16, 15, 14, 13, 12, 11, 10, 9, 7, 6, 5, 4, 3, 2, 1, 0
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


let randomNum = Math.ceil(Math.random() * alienArray.length)
console.log(randomNum)
let bomb = randomNum


function dropBomb() {
  
  let randomNum = Math.ceil(Math.random() * alienArray.length - 1)
  console.log(randomNum)
  let bomb = randomNum

  const bombInterval = setInterval(() => {

    if (bomb > (width*width)-width) {
      cells[bomb].classList.remove('bomb')
      clearInterval(bombInterval)
    }
    if (bomb < 80) {
      cells[bomb].classList.remove('bomb')
      bomb += width
      cells[bomb].classList.add('bomb') 
    }

    if (cells[bomb].classList.contains('player')) {
      
      lives -= 1
      cells[bomb].classList.remove('bomb')
      setTimeout(() => { cells[bomb].classList.add('bulletHole') }, 500)
      cells[bomb].classList.remove('bullethole')
      cells[bomb].classList.add('player')
    }
    if (lives < 1) {
      cells[player].classList.add('dead')
      clearInterval(bombInterval)
    }
    
  }, 200)
}


const dropBombInterval = setInterval(() => { 
  if (lives>0 && screen.innerHTML !== "Game Over" ){
  dropBomb() 
}else{
clearInterval(dropBombInterval)
}
}, 2500)



function addAliens() {
  for (let i = 0; i < alienArray.length; i++) {
    cells[alienArray[i]].classList.add('alien')
  }
}
function removeAliens() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove('alien')
  }
}

function moveAliens() {
  const interval = setInterval(() => {
    if (direction === 1) {

      if (alienArray.some((alien) => alien % width === width - 1)) {
        addAliens()
        for (let i = 0; i < alienArray.length; i++) {
          alienArray[i] += width
        }
        removeAliens()
        addAliens()
        direction = -1
      } else {
        removeAliens()

        for (let i = 0; i < alienArray.length; i++) {
          alienArray[i] += 1
        }

        for (let i = 0; i < alienArray.length; i++) {
          addAliens()
        }
      }
    } else if (direction === -1) {
      if (alienArray.some(alien => alien % width === 0)) {
        addAliens()
        for (let i = 0; i < alienArray.length; i++) {
          alienArray[i] += width
        }
        removeAliens()
        addAliens()

        direction = 1
      } else {
        removeAliens()

        for (let i = 0; i < alienArray.length; i++) {
          alienArray[i] -= 1
        }
        for (let i = 0; i < alienArray.length; i++) {
          addAliens()
        }
      }
    }

    for (let i = 0; i <= alienArray.length - 1; i++) {
      if (alienArray[i] > cells.length - (width - 1)) {
        clearInterval(interval)
        screen.innerHTML = 'Game Over'
      }
    }
    if (cells[player].classList.contains('alien') && cells[player].classList.contains('player')) {
      clearInterval(interval)
      removeAliens()
    }
  }, 1000)
}





document.addEventListener('keypress', (event) => {

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

  let bullet = player
  const shootInterval = setInterval(() => {

    if (bullet < width) {
      clearInterval(shootInterval)
      cells[bullet].classList.remove('bullet')
      clearInterval(shootInterval)
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
      const gone = alienArray.indexOf(bullet)
      alienArray.splice(1, gone)
      score++
      points.innerHTML = score
      clearInterval(shootInterval)
    }
    if (cells[player].classList.contains('alien') && cells[player].classList.contains('player')) {
      screen.innerHTML = 'Game Over'
      cells[player].classList.add('dead')
      clearInterval(shootInterval)
      alienArray.querySelector.remove('alien')

        .classList.add('.dead')
    }
  }, 200)

  if (score = alienArray.length) {
    screen.innerHTML === 'You WIN!!'
  }
}
moveAliens()