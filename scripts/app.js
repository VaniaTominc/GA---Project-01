function init() {
  const maze = document.querySelector('.maze')
  const startButton = document.querySelector('button')

  const width = 20
  const cellCount = width * width
  const cells = []

  const aMazeing = [
    4, 3, 3, 3, 3, 2, 2, 2, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4,
    3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 2, 2, 2, 2, 2, 3,
    3, 2, 3, 3, 3, 2, 2, 2, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 2, 3,
    3, 2, 2, 2, 3, 2, 5, 2, 3, 3, 2, 5, 2, 3, 2, 3, 2, 3, 3, 3,
    3, 2, 5, 2, 3, 2, 2, 2, 2, 3, 2, 2, 2, 3, 2, 3, 2, 3, 3, 2,
    3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 3, 2,
    3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 2,
    3, 2, 3, 2, 2, 2, 2, 3, 3, 3, 1, 3, 3, 3, 2, 2, 2, 2, 3, 2,
    2, 2, 3, 3, 3, 3, 2, 3, 2, 2, 6, 2, 2, 3, 2, 3, 3, 3, 3, 2,
    2, 3, 3, 3, 2, 3, 2, 3, 2, 6, 6, 6, 2, 3, 3, 3, 2, 2, 3, 2,
    2, 3, 2, 3, 2, 3, 3, 3, 2, 2, 2, 2, 2, 3, 2, 3, 3, 3, 3, 2,
    3, 3, 2, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 3, 2,
    3, 2, 2, 2, 2, 2, 2, 3, 2, 3, 3, 2, 2, 3, 2, 3, 2, 3, 3, 2, 
    3, 3, 3, 3, 2, 3, 3, 3, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2,
    2, 3, 2, 3, 3, 3, 2, 3, 2, 2, 3, 3, 3, 2, 2, 2, 3, 2, 2, 2,
    3, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 2, 3, 2, 5, 2, 3, 3, 3, 2,
    2, 3, 2, 2, 2, 2, 2, 3, 2, 3, 3, 2, 3, 2, 2, 2, 2, 3, 2, 2,
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 3,
    4, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4
  ]

  // console.log(aMazeing.length)

  const babushkaScore = document.querySelector('.counter')
  // console.log(score)
  let countBabushkaPoints = 0
  // console.log(typeof(countBabushkaPoints))

  const livesLeft = document.querySelector('.livesLeft')
  // console.log('livesLeft >', livesLeft)
  let countLives = 3
  


  const matrushkaStartingPosition = 389
  let currentMatrushkaPosition = 389
  const matrushkaClass = 'matrushka'

  const enemyStartingPosition = 150
  let currentEnemyPosition = 150
  // console.log(currentEnemyPosition)
  const enemyClass = 'enemy'

  // ! START GAME

  let timer

  function startGame() {
    startButton.disabled = true
    clearInterval(timer)
    enemyMovement()
    timer = setInterval(() => {
      handleKeyUp()
      // gameOverCheck
    }, 1000)
    
  }

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {               // It is going to repeat 200 times (because of 20 * 20)
      const cell = document.createElement('div')        // Creating a div. 
      cell.innerText = i                                // Making sure we see a number inside of a div
      // console.log('cell >', cell)
      maze.appendChild(cell)                            // Appending a cell as a child to the main div with the class of 'grid'
      cells.push(cell)    
     
      addObstacle(i)
      addLittleBabushka(i)
      addBigBabushka(i)
    }
    
    // addMatrushka(currentMatrushkaPosition)
    addEnemy(currentEnemyPosition)
    
    // console.log('cells >', cells)
    // currentEnemyPosition = Math.floor(Math.random() * cells.length)
    // console.log('Current number >', currentEnemyPosition)
    // enemyMovement()
    // handleKeyUp(event)

    // addMatrushka(matrushkaStartingPosition)
    // enemyMovement()
  }

  // ! ENEMY

  function addEnemy(position) {
    cells[position].classList.add(enemyClass)
  }

  // addEnemy(currentEnemyPosition)

  function removeEnemy(position) {
    cells[position].classList.remove(enemyClass)
  }

  // ! LIVES

  // ? Let check lives. We are going to check them inside enemyMovement
  // ? If babushka is taken by an enemy, you lose your life
  // ? The counter needs to be accordingly updated
  // ? At the same time I need to check if I have enough lives to continue otherwise game over

  function reduceLives() {
    countLives--
    livesLeft.innerText = parseFloat(countLives)
  }

  let movement

  function enemyMovement() {
    movement = setInterval(() => {
      const direction = [1, -1, -width, width]      // right, left, up, down
      // getting random option from direction array
      const random = Math.floor(Math.random() * direction.length)
      const finallyStartMoving = direction[random]
      console.log('finally', finallyStartMoving)
      // console.log('Random >>', random)
      // ! random direction movement

      removeEnemy(currentEnemyPosition)
    // ! CHECKING FOR IF ENEMY CAPTURES BABUSHKA

      if (cells[currentEnemyPosition] === cells[currentMatrushkaPosition]) {
        reduceLives()
        //    console.log('You lost a life!!!!')
        if (countLives !== 0) {
          restartGame()
        } else {
          gameOverCheck()
        }
      }

    // ! LETS TRY ONCE AGAIN - little bas*ard is finally moving, but not, he was moving all this time, even with my other solutions, but just behind the scene, aka walls
    // ! I think, I might have found some sort of solution, or at least I hope soo. 

    // ? If the way in front of us contains the obstacle, don't go there.
      if (cells[currentEnemyPosition + finallyStartMoving].classList.contains('obstacle')) {
        // console.log('Sorry buddy, but you cannot go there')
        // Need to make sure, he does not moves from this position, otherwise he will ghost me through walls once again :(
        currentEnemyPosition += 0
        addEnemy(currentEnemyPosition)
        console.log('I am stuck at the same position, please help me', currentEnemyPosition)
      }
      // ? If he can go there, then update the current direction with the direction you've got from finallyStartMoving
      else {
        // console.log('Whahey, we can go!')
        // Now I need to make sure the way is updated with the direction we've got. 
        currentEnemyPosition += finallyStartMoving
        addEnemy(currentEnemyPosition)
        // console.log('Am I moving with new position?', currentEnemyPosition)
      }
    }, 200)
  }
  

  
  // const movement = setInterval(() => {
  //   enemyMovement()
  // }, 200)
  // clearTimeout(movement)



  // ! MATRUSHKA

  function addMatrushka(position) {
    cells[position].classList.add(matrushkaClass)
  }

  function removeMatrushka(position) {
    cells[position].classList.remove(matrushkaClass)
  }


  function handleKeyUp(event) {
    // console.log('position before key', currentMatrushkaPosition)
    const key = event.keyCode
    removeMatrushka(currentMatrushkaPosition)

    if (key === 39) {                 // ! We are going RIGHT
      console.log('RIGHT')
      // We know that currentMatrushka doesn't have 'obstacle', but what about the next place, therefore we need to look into the future + 1
      // But if the future doesn't have na obstacle, than we continue with our journey. 
      if (cells[currentMatrushkaPosition + 1].classList.contains('obstacle')) {
        currentMatrushkaPosition += 0
      } else if (currentMatrushkaPosition % width !== width - 1) {          // ? <= was trying with but it started to go through the border => (currentMAtrushkaPosition + 1)
        currentMatrushkaPosition++
        // console.log('WAHEY!')
        // countBabushkaPoints += 1
        // console.log('typeof', typeof(countBabushkaPoints))
        // babushkaScore.innerText = parseFloat(countBabushkaPoints)
        // console.log(babushkaScore.innerText)
        gettingSmallBabushka()
        gettingBigBabushka()
      }
      removeLittleBabushka()
      removeBigBabushka()
    } else if (key === 37) {          // ! We are going LEFT
      // As in previous case, on the left (- 1 position) we don't know what future holds. It it holdes an .obstacle, than we cannot move
      // If there is nothing to hold us, we can continue with our journey.
      console.log('LEFT')
      if (cells[currentMatrushkaPosition - 1].classList.contains('obstacle')) {
        currentMatrushkaPosition -= 0
      } else if (currentMatrushkaPosition % width !== 0) {         // ? <= was trying with but it started to go through the border => (currentMatrushkaPosition - 1)
        currentMatrushkaPosition--
        // countBabushkaPoints += 1
        // babushkaScore.innerText = parseFloat(countBabushkaPoints)
        // if (cells[currentMatrushkaPosition].classList.contains('points')) {          // ! After checking it works in all cases, I decided just to create a function with the code inside and then called - to prevent the repetition of the code
        //   countBabushkaPoints += 1
        //   babushkaScore.innerText = parseFloat(countBabushkaPoints)
        //}
        gettingSmallBabushka()
        gettingBigBabushka()
      }
      removeLittleBabushka()
      removeBigBabushka()
    } else if (key === 38) {       // ! We are going UP
      // We don't know if there is something above us. If there is Hell, we cannot continue, if there are Heavens we can continue.
      console.log('UP')
      if (cells[currentMatrushkaPosition - width].classList.contains('obstacle')) {
        currentMatrushkaPosition
      } else if (currentMatrushkaPosition > width) {    // ? <= was trying with but it started to go through the border => (currentMatrushkaPosition - width)
        currentMatrushkaPosition -= width
        gettingSmallBabushka()
        gettingBigBabushka()
      }
      removeLittleBabushka()
      removeBigBabushka()
    } else if (key === 40) {      // ! We are going DOWN
      // We don't know if there is something under us. If there is Hell, we cannot continue, otherwise we can continue.
      console.log('DOWN')
      if (cells[currentMatrushkaPosition + width].classList.contains('obstacle')) {
        currentMatrushkaPosition
      }
      else if (currentMatrushkaPosition + width <= width * width - 1) {      // ? <= was trying with but it started to go through the border => (currentMatrushkaPosition + width)
        currentMatrushkaPosition += width
        gettingSmallBabushka()
        gettingBigBabushka()
      }
      console.log('DOWN')
      removeLittleBabushka()
      removeBigBabushka()
    } 

    addMatrushka(currentMatrushkaPosition)
  }

  // ! ADDING AND REMOVING ELEMENTS TO GRID

  // I somehow need to find a way how to connect array aMazing with CSS and HTML. Maybe with for loop? And then compare if value is inside
  // Checking if one value appears inside
  // for (let i = 0; i < cells.length; i++) {
  //   if (i === 2) {
       //console.log('2 = true')
  //   } else if (i === 3) {
       // console.log('3 = true')
  //   } else if (i === 4) {
       // console.log('4 = true')
  //   } else if (i === 5) {
       // console.log('5 = true')
  //   } else if (i === 6) {
       // console.log('6 = true')
  //   }
  // }



  // ? Checking for all cases of number 2
  // const obstacles = []
  // const element = 2
  // let idx = aMazeing.indexOf(element)
  // while (idx !== -1) {
  //   obstacles.push(idx)
  //   idx = aMazeing.indexOf(element, idx + 1)
  // }
  // console.log(obstacles)


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
      console.log('I am STILL here')
    }
    // } else {
    //   console.log('There is definitelly NO little babushka here!')
    // }
  }


  // ! Adding big Babushka, not yet properly styled
  function addBigBabushka(index) {
    if (aMazeing[index] === 4) {
      cells[index].classList.add('bigPoints')
    }
  }

  // ! Removing big Babushka, not zet properly styled

  function removeBigBabushka(index) {
    if (cells[currentMatrushkaPosition].classList.contains('bigPoints')) {
      cells[currentMatrushkaPosition].classList.remove('bigPoints')
      // console.log('I am STILL here')
    } else {
      console.log('There is definitely no big Babushka here!')
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


  // ! Restarting game after loosing life // I still need to find a way how to put enemy and babushka back at the starting position

  function restartGame() {
    clearTimeout(movement)
    currentMatrushkaPosition = 389
    currentEnemyPosition = 150
    countBabushkaPoints
    countLives
    // enemyMovement()
    console.log('RESTARTING')
  }


  // ! Checking for game over

  function gameOverCheck() {
    if (countLives === 0) {            
      setTimeout(endGame, 10)
      clearTimeout(movement)
      // window.location.reload()
      startGame()
    }
  }

  // ! End game

  function endGame() {
    if (confirm('GAME OVER'))
    window.location.reload
  }



  // ! Event listener for keyboard keys.
  let handleControlers = document.addEventListener('keyup', handleKeyUp)
  startButton.addEventListener('click', startGame)

  // createGrid(matrushkaStartingPosition)
  // createGrid(enemyStartingPosition)
  createGrid()

}

window.addEventListener('DOMContentLoaded', init)