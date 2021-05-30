function init() {
  const maze = document.querySelector('.maze')
  const startButton = document.querySelector('button')
  // console.log(startButton)

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


  const matrushkaStartingPosition = 389
  let currentMatrushkaPosition = 389
  const matrushkaClass = 'matrushka'

  const enemyStartingPosition = 150
  let currentEnemyPosition = 150
  // console.log(currentEnemyPosition)
  const enemyClass = 'enemy'

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
    enemyMovement()
    handleKeyUp(event)

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

  function enemyMovement() {
    const direction = [1, -1, -width, width]      // right, left, up, down
    // getting random option from direction array
    let random = Math.floor(Math.random() * direction.length)
    let finallyStartMoving = direction[random]
    console.log('finally', finallyStartMoving)
    // console.log('Random >>', random)
    // ! random direction movement

    removeEnemy(currentEnemyPosition)

    // ! LETS TRY ONCE AGAIN - little bas*ard is finally moving, but not, he was moving all this time, even with my other solutions, but just behind the scene, aka walls


    // In finallyStartMoving we get a direction. First we need to check if we can move there or is there something that prevents it, aka some sort of obstacles
    // ? Let suppose there is something in the way, therefore we have to call finallyStartMoving for new direction, otherwise we are stuck
    // ? Remember that each time the currentEnemyPosition value is updated!
    // if (currentEnemyPosition + finallyStartMoving === cells[currentEnemyPosition].classList.contains('obstacles')) {
      // ! Trying to solve out why is he still travelling through walls in his big ghost fashion
      // ! Somehow I have to refactor this problem, some condition is clearly missing. LET ME THINK, STEP BY STEP!!!
      // ? If ghost has an obstacle in front on him, we have to prevent him from travelling and instead give him a new direction
      // ? If there is something, he needs to get new orders, aka new random direction. 
      // currentEnemyPosition += 0
      // finallyStartMoving currentEnemyPosition += 0 // += finallyStartMoving
      // currentEnemyPosition += finallyStartMoving
      // addEnemy(currentEnemyPosition)                    // We have to add our enemy to the new position
    //} // ? If there is nothing, he can continue with his jounery. 
    //else {
      // currentEnemyPosition += finallyStartMoving
      // addEnemy(currentEnemyPosition)
    // }

    //  if (currentEnemyPosition + )

    // ! What if I turn the order of conditioins? Aka first checking if the road is clear

    // if (finallyStartMoving === 1) {
    //   if (cells[currentEnemyPosition + 1].classList.contains('obstacle')) {
    //     currentEnemyPosition += 0
    //   } else if (currentEnemyPosition % width !== width - 1) {          
    //     currentEnemyPosition++
    //     addEnemy(currentEnemyPosition)
    //   } 
    // } else if (finallyStartMoving === -1) {
    //   if (cells[currentEnemyPosition - 1].classList.contains('obstacle')) {
    //     currentEnemyPosition -= 0
    //   } else if (currentEnemyPosition % width !== 0) {
    //     currentEnemyPosition--
    //     addEnemy(currentEnemyPosition)
    //   }
    // } else if (finallyStartMoving === -width) {
    //   if (cells[currentEnemyPosition - width].classList.contains('obstacle')) {
    //     currentEnemyPosition
    //   } else if (currentEnemyPosition >= width) {
    //     currentEnemyPosition -= width
    //     addEnemy(currentEnemyPosition)
    //   }
    // } else if (finallyStartMoving === width) {
    //   if (cells[currentEnemyPosition + width].classList.contains('obstacle')) {
    //     currentEnemyPosition
    //   } else if (currentEnemyPosition + width <= width * width - 1) {
    //     currentEnemyPosition += width
    //     addEnemy(currentEnemyPosition)
    //   }
    // }
    

    // if (finallyStartMoving === 1 && !cells[currentEnemyPosition + 1].classList.contains('obstacles')) {
    //   currentEnemyPosition++
    //   addEnemy(currentEnemyPosition)
    // }
    // // ? We get -1, so we want to move to the left
    // else if (finallyStartMoving === -1 && !cells[currentEnemyPosition - 1].classList.contains('obstacles')) {
    //   currentEnemyPosition--
    //   addEnemy(currentEnemyPosition)
    // }
    // // ? We get -20, so we want to move up
    // else if (finallyStartMoving === -width && !cells[currentEnemyPosition - 20].classList.contains('obstacles')) {
    //   currentEnemyPosition -= width       // aka 20 paces back, because our cell has a value of 20
    //   addEnemy(currentEnemyPosition)
    // }
    // // ? We get +20, so we want to move down
    // else if (finallyStartMoving === width && !cells[currentEnemyPosition + 20].classList.contains('obstacles')) {
    //   currentEnemyPosition += width
    //   addEnemy(currentEnemyPosition)
    // } else {
    //   currentEnemyPosition += 0
    //   addEnemy(currentEnemyPosition)
    // }

    // if (currentEnemyPosition + finallyStartMoving === cells[currentEnemyPosition].classList.contains('obstacles')) {
    //   currentEnemyPosition += 0 // += finallyStartMoving
    //   addEnemy(currentEnemyPosition)                    // We have to add our enemy to the new position
    // } else {
    //   currentEnemyPosition += finallyStartMoving
    //   addEnemy(currentEnemyPosition)
    // }

    // ! Find out why he is not obeying me and still travelling through walls 


  }
  

  
  const movement = setInterval(() => {
    enemyMovement()
  }, 100)
  clearTimeout(movement)



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



  // ! Event listener for keyboard keys.
  document.addEventListener('keyup', handleKeyUp)

  // createGrid(matrushkaStartingPosition)
  // createGrid(enemyStartingPosition)
  createGrid()

}

window.addEventListener('DOMContentLoaded', init)