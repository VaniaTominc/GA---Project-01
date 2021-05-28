function init() {
  const maze = document.querySelector('.maze')
  const startButton = document.querySelector('button')
  console.log(startButton)

  const width = 20
  const cellCount = width * width
  const cells = []

  const matrushkaStartingPosition = 0
  let currentMatrushkaPosition = 0
  const matrushkaClass = 'matrushka'

  const enemyStartingPosition = 0
  let currentEnemyPosition = 0
  // console.log(currentEnemyPosition)
  const enemyClass = 'enemy'

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {               // It is going to repeat 200 times (because of 20 * 20)
      const cell = document.createElement('div')        // Creating a div. 
      cell.innerText = i                                // Making sure we see a number inside of a div
      // console.log('cell >', cell)
      maze.appendChild(cell)                            // Appending a cell as a child to the main div with the class of 'grid'
      cells.push(cell)                           
    }
    console.log('cells >', cells)
    currentEnemyPosition = Math.floor(Math.random() * cells.length)
    console.log('Current number >', currentEnemyPosition)
    addEnemy(currentEnemyPosition)

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
    currentEnemyPosition += random 
    // if (currentEnemyPosition % width !== width - 1) {
    //   currentEnemyPosition++
    //   console.log('right')
    //   console.log('currentEnemyPosition >', currentEnemyPosition)
    // } 
    // if (currentEnemyPosition % width !== 0) {
    //   currentEnemyPosition--
    //   console.log('left')
    //   console.log('currentEnemyPosition >', currentEnemyPosition)
    // } 
    if (currentEnemyPosition >= width - 1) {         
      currentEnemyPosition -= width
      console.log('up')
      console.log('currentEnemyPosition >', currentEnemyPosition)
    } 
    // if (currentEnemyPosition + width <= width * width - 1) {
    //   currentEnemyPosition += width
    //   console.log('down')
    //   console.log('currentEnemyPosition >', currentEnemyPosition)
    // }
    addEnemy(currentEnemyPosition)
  }
  
  const movement = setInterval(() => {
    enemyMovement()
  }, 1000)
  clearTimeout(movement)

  // function handleKeyUp(event) {
  //   console.log('position before key', currentEnemyPosition)
  //   removeEnemy(currentEnemyPosition)

    // const key = event.keyCode
    // if (key === 39 && currentEnemyPosition % width !== width - 1) {
    //   console.log('RIGHT')
    //   currentEnemyPosition++
    // } else if (key === 37 && currentEnemyPosition % width !== 0) {
    //   console.log('LEFT')
    //   currentEnemyPosition--
    // } else if (key === 38 && currentEnemyPosition >= width) {
    //   console.log('UP')
    //   currentEnemyPosition -= width
    // } else if (key === 40 && currentEnemyPosition + width <= width * width - 1) {
    //   console.log('DOWN')
    //   currentEnemyPosition += width
    // } else {
    //   console.log('INVALID KEY')
    // }

    // addEnemy(currentEnemyPosition)
  // }

  // ! MATRUSHKA

  // function addMatrushka(position) {
  //   cells[position].classList.add(matrushkaClass)
  // }

  // function removeMatrushka(position) {
  //   cells[position].classList.remove(matrushkaClass)
  // }


  // function handleKeyUp(event) {
  //   console.log('position before key', currentMatrushkaPosition)
  //   const key = event.keyCode
  //   removeMatrushka(currentMatrushkaPosition)

  //   if (key === 39 && currentMatrushkaPosition % width !== width - 1) {
  //     console.log('RIGHT')
  //     currentMatrushkaPosition++
  //   } else if (key === 37 && currentMatrushkaPosition % width !== 0) {
  //     console.log('LEFT')
  //     currentMatrushkaPosition--
  //   } else if (key === 38 && currentMatrushkaPosition >= width) {
  //     console.log('UP')
  //     currentMatrushkaPosition -= width
  //   } else if (key === 40 && currentMatrushkaPosition + width <= width * width - 1) {
  //     console.log('DOWN')
  //     currentMatrushkaPosition += width
  //   } else {
  //     console.log('INVALID KEY')
  //   }

  //   addMatrushka(currentMatrushkaPosition)
  // }

  // ! Event listener for keyboard keys.
  // document.addEventListener('keyup', handleKeyUp)

  // createGrid(matrushkaStartingPosition)
  // createGrid(enemyStartingPosition)
  createGrid()

}

window.addEventListener('DOMContentLoaded', init)