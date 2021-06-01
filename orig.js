//     |
//     |
//     |
//     |
//     Y
//     |
//     |
//     |
//     |_____________X_____________


// ! horizontalPosition (aka X)

let xMatrushka = currentMatrushkaPosition % width
let xEnemy = currentEnemyPosition % width


// ! verticalPosition (aka Y)

let yMatrushka = Math.floor(currentMatrushkaPosition / width)
let yEnemy = Math.floor(currentEnemyPosition / width)


// ! Coordinate positions

let coordinatesMatrushka = [xMatrushka, yMatrushka]
let coordinatesEnemy = [xEnemy, yEnemy]


// ! Trying to target

// New Matrushka's position should become enemey's wish position. 
// ? Target Matrushka position
let targetMatrushka = {
  x: xMatrushka,
  y: yMatrushka
}

// ? Enemy position
let enemyPosition = {
  x: xEnemy,
  y: yEnemy
}

// ? Subtract (= difference vector)
let distanceX = targetMatrushka.x - enemyPosition.x
let distanceY = targetMatrushka.y - enemyPosition.y

// ? Normalize (= direction vector)
// ? (a distance vector has a length of 1)
let targetLength = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

// ? Move
// ? delta is the elapsed time in seconds
// ? SPEED is the speed in units per second (UPS)
enemyPosition.x += distanceX * delta * SPEED
enemyPosition.y += distanceY * delta * SPEED