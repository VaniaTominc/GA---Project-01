function init() {
  const maze = document.querySelector('.maze')
  const startButton = document.querySelector('button')
  console.log(startButton)

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
      // addLittleBabushka(i)
      addBigBabushka(i)
    }
    
    // addMatrushka(currentMatrushkaPosition)
    addEnemy(currentEnemyPosition)
    
    console.log('cells >', cells)
    // currentEnemyPosition = Math.floor(Math.random() * cells.length)
    // console.log('Current number >', currentEnemyPosition)
    // enemyMovement()
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
    const direction = [-1, 1, width, -width]      // right, left, up, down
    // getting random option from direction array
    let random = Math.floor(Math.random() * direction.length)
    // console.log('Random >>', random)
    // ! random direction movement
    // updating currentEnemyPosition with a random I've got
    currentEnemyPosition = enemyStartingPosition
    currentEnemyPosition += random 
    if (currentEnemyPosition % width !== width - 1) {                 // ! RIGHT MOVE
      currentEnemyPosition++
      console.log('right')
      console.log('currentEnemyPosition >', currentEnemyPosition)   
    }
    if (currentEnemyPosition % width !== 0) {                       // ! LEFT MOVE
      currentEnemyPosition--
      console.log('left')
      console.log('currentEnemyPosition >', currentEnemyPosition)
    }
    if (currentEnemyPosition - width >= 0) {                   // ! UP MOVE
      currentEnemyPosition -= width
      console.log('up')
      console.log('currentEnemyPosition >', currentEnemyPosition)
    } 
    if (currentEnemyPosition + width <= width * width - 1) {   // ! DOWN
      currentEnemyPosition += width
      console.log('down')
      console.log('currentEnemyPosition >', currentEnemyPosition)
    }
    addEnemy(currentEnemyPosition)
  }
  

  
  const movement = setInterval(() => {
    enemyMovement()
  }, 1000)
  clearTimeout(movement)



  // ! MATRUSHKA

  function addMatrushka(position) {
    cells[position].classList.add(matrushkaClass)
  }

  function removeMatrushka(position) {
    cells[position].classList.remove(matrushkaClass)
  }


  function handleKeyUp(event) {
    console.log('position before key', currentMatrushkaPosition)
    const key = event.keyCode
    removeMatrushka(currentMatrushkaPosition)

    if (key === 39) {                 // ! We are going right
      console.log('RIGHT')
      // We know that currentMatrushka doesn't have 'obstacle', but what about the next place, therefore we need to look into the future + 1
      // But if the future doesn't have na obstacle, than we continue with our journey. 
      if (cells[currentMatrushkaPosition + 1].classList.contains('obstacle')) {
        currentMatrushkaPosition += 0
      } else if (currentMatrushkaPosition % width !== width - 1) {
        currentMatrushkaPosition++
      }
      // removeLittleBabushka()
    } else if (key === 37 && currentMatrushkaPosition % width !== 0) {
      console.log('LEFT')
      currentMatrushkaPosition--
      // removeLittleBabushka()
    } else if (key === 38 && currentMatrushkaPosition >= width) {
      console.log('UP')
      currentMatrushkaPosition -= width
      // removeLittleBabushka()
    } else if (key === 40 && currentMatrushkaPosition + width <= width * width - 1) {
      console.log('DOWN')
      currentMatrushkaPosition += width
      // removeLittleBabushka()
    } else {
      console.log('INVALID KEY')
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

  // ! Adding little Babushka, for now just some random coind
  function addLittleBabushka(index) {
    if (aMazeing[index] === 3) {
      cells[index].classList.add('points')
    }
  }



  // // ! Remove little Babushka

  function removeLittleBabushka(index) {
    if (aMazeing[index] === 3 && currentMatrushkaPosition) {
      cells[index].classList.remove('points')
    }
  }

  console.log('vanja', cells)
  // function removeCat(position) {
  //   cells[position].classList.remove(catClass)
  // }

  // ! Adding big Babushka, not yet properly styled
  function addBigBabushka(index) {
    if (aMazeing[index] === 4) {
      cells[index].classList.add('bigPoints')
    }
  }






  // ! Event listener for keyboard keys.
  document.addEventListener('keyup', handleKeyUp)

  // createGrid(matrushkaStartingPosition)
  // createGrid(enemyStartingPosition)
  createGrid()

}

window.addEventListener('DOMContentLoaded', init)