const h1 = document.querySelector('h1')
const totalPoints = document.querySelector('.totalPoints')
const audio = document.querySelector('audio')
const levelButton = document.querySelector('a')
const button = document.querySelector('button')
const body = document.querySelector('body')
const width = 9
let lives = 3
const grid = document.querySelector('.grid')
const squares = document.querySelector('cells')
const cells = []
let points = 0
let deadAliens = []
let player = 76
let winner = false
let direction = 1
const screen = document.querySelector('h3')
let displayLives = document.querySelector('span.displayLives')

displayLives.innerHTML = lives

const alienArray = [
  25, 24, 23, 22, 21, 20, 19, 18, 16, 15, 14, 13, 12, 11, 10, 9, 7, 6, 5, 4, 3, 2, 1, 0
]

for (let i = 0; i < width ** 2; i++) {
  const div = document.createElement('div')
  div.classList.add('cell')
  grid.appendChild(div)
  cells.push(div)
}


cells[player].classList.add('player')
alienArray.forEach((alien) => { cells[alien].classList.add('alien') })


button.addEventListener('click', (event) => {
  audio.src = "ifICouldTurnBackTime.mp3"
  audio.play()
  body.appendChild(audio)
})



function dropBomb() {

  let randomNum = Math.ceil(Math.random() * alienArray.length - 1)
  let bomb = alienArray[randomNum]

  const bombInterval = setInterval(() => {
    
    if (bomb > 80) {

      clearInterval(bombInterval)
    }
    if (bomb < 81) {
      cells[bomb].classList.remove('bomb')
      bomb += width
      cells[bomb].classList.add('bomb')
    }

    if (cells[bomb].classList.contains('player')) {
      lives -= 1
      cells[bomb].classList.remove('player')
      cells[bomb].classList.remove('bomb')
      cells[bomb].classList.add('player')
      displayLives.innerHTML = lives

    }
    if (cells[player].classList.contains('alien') && cells[player].classList.contains('player') ){
      screen.innerHTML = "You died"
      clearInterval(bombInterval)
      clearInterval(interval)
      grid.classList.add('disappointedCher')
      cells[bomb].classList.remove('bomb')
      cells[player].classList.remove('player')
      button.innerHTML = "Oh no!"
    }
    if (lives < 1) {
      screen.innerHTML = "You died"
      clearInterval(bombInterval)
      clearInterval(interval)
      grid.classList.add('disappointedCher')
      cells[bomb].classList.remove('bomb')
      cells[player].classList.remove('player')
      button.innerHTML = "Oh no!"
    }
  }, 200)

}


function startBombs() {
  const dropBombInterval = setInterval(() => {
    if (lives > 0) {
      dropBomb()
    } else if (cells[player].classList.contains('alien') && cells[player].classList.contains('player') ){
      screen.innerHTML = "You died"
      clearInterval(dropBombInterval)
      clearInterval(interval)
      grid.classList.add('disappointedCher')
      cells[bomb].classList.remove('bomb')
      cells[player].classList.remove('player')
      button.innerHTML = "Refresh to play again!"
    }
    else{
      grid.classList.add('disappointedCher')
      removeAliens()
      clearInterval(interval)
      clearInterval(bombInterval)
      clearInterval(dropBombInterval)
      button.innerHTML = "Refresh to play again!"
    }
  }, 2500)

}

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
      if (alienArray[i] > cells.length - (width - 1) || (cells[player].classList.contains('alien') && cells[player].classList.contains('player'))) {
        audio.src = "collision.wav"
        audio.play()
        body.appendChild(audio)
        grid.classList.add('disappointedCher')
        removeAliens()
        clearInterval(interval)
        screen.innerHTML = 'Game Over'
        cells[player].classList.remove('player')
        levelButton.innerHTML = 'Play Again!'
      levelButton.classList.add('levelTwo')
      button.innerHTML = "Oh no!"
        
      }
    } if (lives< 1) {
      cells[player].classList.remove('player')
      levelButton.innerHTML = 'Play Again!'
      levelButton.classList.add('levelTwo')
      removeAliens()
      clearInterval(interval)
    }
  }, 1600)

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
      const gone = alienArray.indexOf(bullet)
      alienArray.splice(gone, 1)
      points++
      totalPoints.innerHTML = points
      clearInterval(shootInterval)
    }

    if (points === 24) {
      audio.src = "applause.wav"
  audio.play()
  body.appendChild(audio)
      cells[player].classList.remove('player')
      button.innerHTML = "WOO HOO"
      screen.innerHTML = 'You WIN!!'
      levelButton.innerHTML = 'Play Again!'
      levelButton.classList.add('levelTwo')
      grid.classList.add('dancingCher')

    }


    if (cells['player'].classList.contains('alien') && cells[i].classList.contains('player')) {
      cells[player].classList.remove('player')
      screen.innerHTML = 'Game Over'
      grid.classList.add('disappointedCher')
      clearInterval(bombInterval)
    }
  }, 100)

}

button.addEventListener('click', () => {
  startBombs()
  moveAliens()
})

