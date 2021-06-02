function init() {
  const maze = document.querySelector('.maze')
  const startButton = document.querySelector('button')
  const threeLives = document.querySelector('.three-lifes')
  const twoLives = document.querySelector('.two-lifes')
  const oneLives = document.querySelector('.one-lifes')

  const width = 20
  const cellCount = width * width
  const cells = []

  const aMazeing = [
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 2,
    2, 3, 2, 2, 2, 3, 2, 2, 2, 2, 3, 2, 2, 2, 3, 2, 2, 2, 3, 2,
    2, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 2,
    2, 3, 2, 2, 2, 3, 2, 2, 2, 3, 3, 2, 2, 2, 3, 2, 3, 2, 3, 2,
    2, 3, 2, 0, 2, 3, 2, 0, 2, 3, 3, 2, 0, 2, 3, 2, 3, 2, 3, 2,
    2, 3, 2, 2, 2, 3, 2, 2, 2, 2, 3, 2, 2, 2, 3, 2, 2, 2, 3, 2,
    2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 2,
    2, 2, 2, 3, 2, 2, 2, 3, 2, 2, 0, 2, 2, 3, 2, 2, 2, 3, 3, 2,
    2, 3, 2, 3, 2, 3, 3, 3, 2, 6, 7, 8, 2, 3, 3, 3, 3, 3, 2, 2,
    2, 3, 3, 3, 3, 3, 2, 3, 2, 2, 0, 2, 2, 3, 2, 2, 3, 3, 3, 2,
    2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 2,
    2, 3, 2, 3, 3, 3, 2, 3, 2, 3, 2, 2, 3, 2, 3, 2, 3, 3, 3, 2,
    2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 3, 2, 3, 2, 2, 2, 2, 2, 3, 2,
    2, 3, 3, 3, 2, 3, 3, 3, 2, 3, 2, 3, 3, 3, 3, 3, 3, 2, 3, 2,
    2, 3, 2, 3, 3, 3, 2, 3, 2, 2, 3, 3, 3, 2, 2, 2, 3, 2, 3, 2,
    2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 3, 2, 0, 2, 3, 3, 3, 2,
    2, 3, 2, 2, 2, 2, 2, 3, 2, 3, 3, 2, 3, 2, 2, 2, 2, 3, 2, 2,
    2, 4, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 4, 2,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
  ]

  const babushkaScore = document.querySelector('.counter')
  let countBabushkaPoints = 0

  const livesLeft = document.querySelector('.livesLeft')
  let countLives = 3
  
  let currentMatrushkaPosition = 369
  const matrushkaClass = 'matrushka'

  const startingEnemyPosition = 150
  let currentEnemyPosition = 150
  const enemyClass = 'enemy'

  let startButtonValue = false

  // ! START GAME

  let timer

  function startGame() {
    startButton.disabled = true
    startButtonValue = true
    clearInterval(timer)
    timer = setInterval(() => {
      enemyMovement()
    }, 200)
    
  }

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {               
      const cell = document.createElement('div')                                       
      maze.appendChild(cell)                            
      cells.push(cell)    
      addObstacle(i)
      addLittleBabushka(i)
      addBigBabushka(i)
      addPresidentEnimies(i)
    }
    
    addEnemy(currentEnemyPosition)
    addMatrushka(currentMatrushkaPosition)
  }

  // ! ENEMY

  class PresidentEnemy {
    constructor (namePresident, startingPosition, speed) {
      this.namePresident = namePresident
      this.startingPosition = startingPosition
      this.speed = speed
    }
  }

  const usPresident01 = new PresidentEnemy('nixon', 150, 200)
  const usPresident02 = new PresidentEnemy('bushSr', 189, 200)
  const usPresident03 = new PresidentEnemy('truman', 190, 200)
  const usPresident04 = new PresidentEnemy('trump', 191, 200)

  // const enemyPresidents = [usPresident01, usPresident02, usPresident03, usPresident04]
  // console.log(enemyPresidents)
  // console.log(usPresiden01.namePresident)

  function addPresidentEnimies (index) {
    if (aMazeing[index] === 5) {
      // cells[index].classList.add('nixon')
      cells[index].classList.add(usPresident01.namePresident)
    }
    if (aMazeing[index] === 6) {
      // cells[index].classList.add('bushSr')
      cells[index].classList.add(usPresident02.namePresident)
    }
    if (aMazeing[index] === 7) {
      // cells[index].classList.add('truman')
      cells[index].classList.add(usPresident03.namePresident)
    }
    if (aMazeing[index] === 8) {
      // cells[index].classList.add('trump')
      cells[index].classList.add(usPresident04.namePresident)
    }
  }

  // ? Original function addEnemy just for one enemy
  function addEnemy(position) {
    cells[position].classList.add(enemyClass)
  }

  
  function removeEnemy(position) {
    cells[position].classList.remove(enemyClass)
  }

  // ! LIVES

  function addLives() {
    threeLives.classList.add('three-lifes')
    twoLives.classList.add('two-lifes')
    oneLives.classList.add('one-life')
  }

  // addLives()

  function reduceLives() {
    countLives--
    livesLeft.innerText = parseFloat(countLives)
  }

  let random

  function enemyMovement() {
    const direction = [1, -1, -width, width]      // right, left, up, down
    random = Math.floor(Math.random() * direction.length)
    const finallyStartMoving = direction[random]

    removeEnemy(currentEnemyPosition)

    if (cells[currentEnemyPosition] === cells[currentMatrushkaPosition]) {
      reduceLives()
      if (countLives !== 0) {
        gameOverCheck()
      } else {
        endGame()
      }
    }

    if (cells[currentEnemyPosition + finallyStartMoving].classList.contains('obstacle')) {
      currentEnemyPosition += 0
      addEnemy(currentEnemyPosition)
    } else {
      currentEnemyPosition += finallyStartMoving
      addEnemy(currentEnemyPosition)
    }
  }

  // ! MATRUSHKA

  function addMatrushka(position) {
    cells[position].classList.add(matrushkaClass)
  }

  function removeMatrushka(position) {
    cells[position].classList.remove(matrushkaClass)
  }

// ! HANDLING PLAYER KEYS

  function handleKeyUp(event) {
    if (startButtonValue === true) {
      const key = event.keyCode
      removeMatrushka(currentMatrushkaPosition)

      if (key === 39) {                 // ! We are going RIGHT
        if (cells[currentMatrushkaPosition + 1].classList.contains('obstacle')) {
          currentMatrushkaPosition += 0
        } else if (currentMatrushkaPosition - 1) {        
          currentMatrushkaPosition++
          gettingSmallBabushka()
          gettingBigBabushka()
        }
        removeLittleBabushka()
        removeBigBabushka()
      } else if (key === 37) {          // ! We are going LEFT
        if (cells[currentMatrushkaPosition - 1].classList.contains('obstacle')) {
          currentMatrushkaPosition -= 0
        } else if (currentMatrushkaPosition + 1) {         
          currentMatrushkaPosition--
          gettingSmallBabushka()
          gettingBigBabushka()
        }
        removeLittleBabushka()
        removeBigBabushka()
      } else if (key === 38) {       // ! We are going UP
        if (cells[currentMatrushkaPosition - width].classList.contains('obstacle')) {
          currentMatrushkaPosition
        } else if (currentMatrushkaPosition - width) {    
          currentMatrushkaPosition -= width
          gettingSmallBabushka()
          gettingBigBabushka()
        }
        removeLittleBabushka()
        removeBigBabushka()
      } else if (key === 40) {      // ! We are going DOWN
        if (cells[currentMatrushkaPosition + width].classList.contains('obstacle')) {
          currentMatrushkaPosition
        } else if (currentMatrushkaPosition + width) {     
          currentMatrushkaPosition += width
          gettingSmallBabushka()
          gettingBigBabushka()
        }
        removeLittleBabushka()
        removeBigBabushka()
      } 

      addMatrushka(currentMatrushkaPosition)
    }
  }

  // ! ADDING AND REMOVING ELEMENTS TO GRID

  // ! Adding obstacles
  function addObstacle(index) {
    if (aMazeing[index] === 2) {
      cells[index].classList.add('obstacle')
    }
  } 

  // ! Adding little Babushka, for now just some random color
  function addLittleBabushka(index) {
    if (aMazeing[index] === 3) {
      cells[index].classList.add('points')
    }
  }

  // ! Removing little Babushka, not yet properly styled
  function removeLittleBabushka() {
    if (cells[currentMatrushkaPosition].classList.contains('points')) {
      cells[currentMatrushkaPosition].classList.remove('points')
    }
  }


  // ! Adding big Babushka, not yet properly styled
  function addBigBabushka(index) {
    if (aMazeing[index] === 4) {
      cells[index].classList.add('bigPoints')
    }
  }

  // ! Removing big Babushka, not zet properly styled
  function removeBigBabushka() {
    if (cells[currentMatrushkaPosition].classList.contains('bigPoints')) {
      cells[currentMatrushkaPosition].classList.remove('bigPoints')
    } 
  }

  // ! Getting small points function to prevent the repetition of code

  function gettingSmallBabushka() {
    if (cells[currentMatrushkaPosition].classList.contains('points')) {
      countBabushkaPoints += 10
      babushkaScore.innerText = parseFloat(countBabushkaPoints)
    }
  }

  function gettingBigBabushka() {
    if (cells[currentMatrushkaPosition].classList.contains('bigPoints')) {
      countBabushkaPoints += 100
      babushkaScore.innerText = parseFloat(countBabushkaPoints)
    }
  }


  // ! Checking for game over 
  function gameOverCheck() {
    console.log('RESTARTING')
    clearInterval(movement)
    startButton.disabled = false
    removeMatrushka(currentMatrushkaPosition)
    removeEnemy(currentEnemyPosition)
    currentMatrushkaPosition = 369
    currentEnemyPosition = 150
    addMatrushka(currentMatrushkaPosition)
    addEnemy(startingEnemyPosition)
    console.log('addEnemy 03', currentEnemyPosition)
    countBabushkaPoints = 0
    // babushkaScore.innerText = parseFloat(countBabushkaPoints)
    countLives
    // enemyMovement(
  }

  // ! End game

  function endGame() {
    clearTimeout(movement)
    removeMatrushka(currentMatrushkaPosition)
    removeEnemy(currentEnemyPosition)
    currentMatrushkaPosition = 369
    currentEnemyPosition = 150
    addMatrushka(currentMatrushkaPosition)
    addEnemy(currentEnemyPosition)
    startGame()
    window.location.reload()
  }



  // ! Event listener for keyboard keys.
  document.addEventListener('keyup', handleKeyUp)
  startButton.addEventListener('click', startGame)

  createGrid()

}

window.addEventListener('DOMContentLoaded', init)