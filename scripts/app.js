function init() {
  const maze = document.querySelector('.maze')

  const width = 20
  const cellCount = width * width
  const cells = []

  const matrushkaStartingPosition = 0
  let currentMatrushkaPosition = 0
  const matrushkaClass = 'matrushka'

  const enemyStartingPosition = 0
  let currentEnemyPosition = Math.floor(Math.random) * cells.length
  const enemyClass = 'enemy'

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {               
      const cell = document.createElement('div')         
      cell.innerText = i                                // Keeping numbers for easier positioning of obstacles later
      maze.appendChild(cell)                            
      cells.push(cell)                           
    }

    // addMatrushka(matrushkaStartingPosition)
    addEnemy(enemyStartingPosition)
  }

  // ! ENEMY

  function addEnemy(position) {
    cells[position].classList.add(enemyClass)
  }

  function removeEnemy(position) {
    cells[position].classList.remove(enemyClass)
  }

  function enemyMovement() {
    addEnemy(enemyStartingPosition)
  }

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

    addEnemy(currentEnemyPosition)
  }

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
  document.addEventListener('keyup', handleKeyUp)

  // createGrid(matrushkaStartingPosition)
  createGrid(enemyStartingPosition)
  // createGrid()

}

window.addEventListener('DOMContentLoaded', init)