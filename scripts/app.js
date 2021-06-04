function init() {
  const maze = document.querySelector('.maze')
  const startButton = document.querySelector('button')
  const threeLives = document.querySelector('.three-lifes')
  const twoLives = document.querySelector('.two-lifes')
  const oneLives = document.querySelector('.one-life')
  const audio = document.querySelector('audio')

  const width = 20
  const cellCount = width * width
  const cells = []

  const babushkaScore = document.querySelector('.counter')
  let countBabushkaPoints = 0

  let countLives = 3
  let timer
  
  const startingMatrushkaPosition = 369
  let currentMatrushkaPosition = 369
  const matrushkaClass = 'matrushka'

  // const startingEnemyPosition = 150
  // const enemyClass = 'enemy'

  const kalinka = new Audio('sounds/kalinka.mp3')
  const coins = new Audio('sounds/coin-drop-4.mp3')
  const lostLife = new Audio('sounds/trololohahaha.mp3')

  let startButtonValue = false        // ! To prevent player to use moving buttons before starting a game.

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

  // ! START GAME
  function pressStartGame() {
    startButton.disabled = true
    startButtonValue = true
    kalinka.play()
    kalinka.volume = 0.2
    timer = setInterval(() => {
      enemyMovement()
    }, 200)
    
  }

  // ! Creating our grid
  function createGrid() {
    for (let i = 0; i < cellCount; i++) {               
      const cell = document.createElement('div')                                       
      maze.appendChild(cell)                            
      cells.push(cell)    
      addObstacle(i)
      addLittleBabushka(i)
      addBigBabushka(i)
    }
    addEnemyPresident()
    // addEnemy(currentEnemyPosition)
    addMatrushka(currentMatrushkaPosition)
  }

  // ! Creating ENEMY constructor class with 2 arguments, one of them is then assigned to the 'currentEnemyPosition'
  class PresidentEnemy {
    constructor (namePresident, startingPosition) {
      this.namePresident = namePresident
      this.startingPosition = startingPosition
      this.currentEnemyPosition = startingPosition
    }
  }

  // ? Adding values for each enemy in a separate variable
  const usPresident01 = new PresidentEnemy('nixon', 150)
  const usPresident02 = new PresidentEnemy('bushSr', 189)
  const usPresident03 = new PresidentEnemy('carter', 190)
  const usPresident04 = new PresidentEnemy('trump', 191)

  // ? Storing variables in an array.
  const enemyPresidents = [usPresident01, usPresident02, usPresident03, usPresident04]

  // ! Adding our enemy presidents to the grid, using .foreach method.
  function addEnemyPresident() {
    enemyPresidents.forEach(item => {
      cells[item.currentEnemyPosition].classList.add(item.namePresident)
    })
  }

  // ! Removing our enemy presidents from our grid, using .foreach method.
  function removeEnemyPresident() {
    enemyPresidents.forEach(item => {
      cells[item.currentEnemyPosition].classList.remove(item.namePresident)
    })
  }

  // ? For future add-ons, aka enemy logic. For now just some idea that I still need to develope.
  // function findEnemyCoordinates() {
  //   enemyPresidents.forEach(item => {
  //     let xEnemy = cells[item.currentEnemyPosition % width] 
  //     console.log('xEnemy >>', xEnemy)
  //     let yEnemy = Math.floor(cells[item.currentEnemyPosition / width])
  //     console.log('yEnemy >>', yEnemy)
  //   })
  // }

  // ! Enemy movement - using foreach method.
  function enemyMovement() {
    enemyPresidents.forEach(item => {

      removeEnemyPresident(item.currentEnemyPosition)
      if (cells[item.currentEnemyPosition] === cells[currentMatrushkaPosition]) {
        reduceLives()
        lostLife.play()
        kalinka.pause()

        if (countLives !== 0) {
          restartGame()
        } else {
          endGame()
        }
      }

      // Possible directions of movement 
      const direction = [1, -1, -width, width]

      // We want our enemy to move randomly
      const random = Math.floor(Math.random() * direction.length)
      const finallyStartMoving = direction[random]  
      // console.log('last position >>', item.currentEnemyPosition)
      
      // Making sure our enemy doesn't go the cell that contains an obstacle.
      if (cells[item.currentEnemyPosition + finallyStartMoving].classList.contains('obstacle')) {
        item.currentEnemyPosition += 0
        addEnemyPresident()
        // findEnemyCoordinates()
      } else {
        item.currentEnemyPosition += finallyStartMoving
        addEnemyPresident()
        // findEnemyCoordinates()
      }
    })
  }

  // ! Creating our Hero
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

  // ! LIVES

  threeLives.classList.add('three-lifes')
  twoLives.classList.add('two-lifes')
  oneLives.classList.add('one-life')

  function reduceLives() {
    countLives--
    if (countLives === 2) {
      oneLives.classList.remove('one-life')
    } else if (countLives === 1) {
      twoLives.classList.remove('two-lifes')
    }
  }


  // ! ADDING AND REMOVING ELEMENTS TO GRID
  // ! Adding obstacles
  function addObstacle(index) {
    if (aMazeing[index] === 2) {
      cells[index].classList.add('obstacle')
    }
  } 

  // ! Adding little Babushka
  function addLittleBabushka(index) {
    if (aMazeing[index] === 3) {
      cells[index].classList.add('points')
    }
  }

  // ! Removing little Babushka
  function removeLittleBabushka() {
    if (cells[currentMatrushkaPosition].classList.contains('points')) {
      cells[currentMatrushkaPosition].classList.remove('points')
    }
  }

  // ! Adding big Babushka
  function addBigBabushka(index) {
    if (aMazeing[index] === 4) {
      cells[index].classList.add('bigPoints')
    }
  }

  // ! Removing big Babushka
  function removeBigBabushka() {
    if (cells[currentMatrushkaPosition].classList.contains('bigPoints')) {
      cells[currentMatrushkaPosition].classList.remove('bigPoints')
    } 
  }

  // ! Getting small points function to prevent the repetition of code
  function gettingSmallBabushka() {
    if (cells[currentMatrushkaPosition].classList.contains('points')) {
      countBabushkaPoints += 10
      coins.play()
      babushkaScore.innerText = parseFloat(countBabushkaPoints)
    }
  }

  function gettingBigBabushka() {
    if (cells[currentMatrushkaPosition].classList.contains('bigPoints')) {
      countBabushkaPoints += 10
      coins.play()
      babushkaScore.innerText = parseFloat(countBabushkaPoints)
    }
  }


  // ! Checking for game over 
  function restartGame() {
    // console.log('RESTARTING')
    clearInterval(timer)
    startButtonValue = false
    startButton.disabled = false
    // Deleting the last enemy position
    enemyPresidents.forEach(item => {
      cells[item.currentEnemyPosition].classList.remove('nixon', 'trump', 'bushSr', 'carter')
    })
    removeMatrushka(currentMatrushkaPosition)
    currentMatrushkaPosition = 369
    addMatrushka(startingMatrushkaPosition)
    // Somehow I have to reset enemy position to the original one!
    enemyPresidents.forEach(item => {
      item.currentEnemyPosition = item.startingPosition
      cells[item.currentEnemyPosition].classList.add(item.namePresident)
    })
    countBabushkaPoints = 0
    babushkaScore.innerText = parseFloat(countBabushkaPoints)
    countLives
  }

  // ! End game
  function endGame() {
    if (confirm(`GAME OVER. Your score was ${countBabushkaPoints}`)) {
      window.location.reload()
    }
  }

  // ! Event listener for keys.
  document.addEventListener('keyup', handleKeyUp)
  startButton.addEventListener('click', pressStartGame)

  // ! Calling a grid function.
  
  createGrid()

}

window.addEventListener('DOMContentLoaded', init)