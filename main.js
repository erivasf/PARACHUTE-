const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const main = document.getElementById('main')
const mySoldiers = []
const myBullets = []
const myBombs = []
const myJets = []
const myTimer = []
let lives = 3
let score = 0
let frames = 0

//Clases
class GameScreen {
  constructor() {
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src = 'Assets/images/BackGround.png'
    this.img.onload = () => {
      this.draw()
    }
  }
  draw() {
    this.x--
    if (this.x < -canvas.width) {
      this.x = 0
    }
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height)
  }
}
class Cannon {
  constructor() {
    this.life = 100
    this.x = canvas.width / 2 - 112.5
    this.y = canvas.height - 150
    this.frameWidth = 83.39
    this.frameHeight = 85
    this.width = 225
    this.height = 150
    this.frame = 11
    this.isShooting = false
    this.img = new Image()
    this.img.src = 'Assets/images/css_Sprites.png'
    this.img.onload = () => {
      this.draw()
    }
  }

  draw() {
    ctx.drawImage(
      this.img,
      this.frameWidth * this.frame,
      0,
      this.frameWidth,
      this.frameHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  aimLeft() {
    if (this.frame > 0) this.frame--
    else this.frame = 0
  }
  aimRight() {
    if (this.frame < 22) this.frame++
    else this.frame = 22
  }
  shoot() {
    this.isShooting = true
  }
}

class Soldier {
  constructor(x) {
    this.width = 80
    this.height = 100
    this.x = x
    this.y = 0
    this.speed = 2
    this.img = new Image()
    this.img.src = 'Assets/images/soldier.png'
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    if (frames > 500) this.y += this.speed
    else this.y++
    if (frames > 1000) this.y += this.speed
    else this.y++
    if (frames > 1500) this.y += this.speed
    else this.y++
  }
}

class Bullet {
  constructor(speedX, speedY) {
    this.width = 20
    this.height = 10
    this.x = canvas.width / 2 - 10
    this.y = canvas.height - 50
    this.speedX = speedX
    this.speedY = speedY
    this.img = new Image()
    this.img.src = 'Assets/images/Bullet.png'
    this.hasImpact = false
  }
  draw() {
    this.x += this.speedX
    this.y += this.speedY

    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }

  left() {
    return this.x + this.y
  }

  right() {
    return this.x + this.width + this.height
  }

  impact(object) {
    return (
      this.x < object.x + object.width &&
      this.x + this.width > object.x &&
      this.y < object.y + object.height &&
      this.y + this.height > object.y
    )
  }
}

class Jet {
  constructor() {
    this.width = 175
    this.height = 150
    this.x = -this.width
    this.y = 5
    this.img = new Image()
    this.img.src = 'Assets/images/Plane.png'
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
}

class Bomb {
  constructor() {
    this.life = 100
    this.width = 40
    this.height = 60
    this.x = canvas.width / 2 - 20
    this.y = 50
    this.img = new Image()
    this.img.src = 'Assets/images/bomb.png'
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
}
class Timer {
  constructor(x) {
    this.life = 100
    this.width = 40
    this.height = 40
    this.x = x
    this.y = 0
    this.img = new Image()
    this.img.src = 'Assets/images/time.png'
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  bottom() {
    return this.y + this.height
  }

  left() {
    return this.x
  }

  right() {
    return this.x + this.width
  }
}

//Instancias
const gameScreen = new GameScreen()
const cannon = new Cannon()
const soldier = new Soldier()
const bullet = new Bullet()
const jet = new Jet()
const bomb = new Bomb()
const timer = new Timer()

//Functions
function startGame() {
  main.style.display = 'none'
  document.querySelector('button').style.display = 'none'
  document.getElementById('#instructions')
  document.getElementById('music1').play()
  document.getElementById('boom').play()
  gameScreen.draw()
  canvas.style.display = 'block'
  interval = setInterval(updateCanvas, 1000 / 60)
}

function endGame() {
  clearInterval(interval)
  ctx.font = '200px Impact'
  ctx.fillStyle = 'black'
  ctx.fillText('GAME OVER', 150, 500, 500)
  ctx.font = '100px Impact'
  ctx.fillStyle = 'red'
  ctx.fillText('FINAL SCORE: ' + score, 150, 700, 500)
  document.getElementById('gameover').play()
  document.getElementById('music1').pause()
}

//Draws
function drawSoldiers() {
  mySoldiers.forEach((soldier, i) => {
    soldier.draw()

    if (soldier.y >= canvas.height - soldier.height) {
      lives--
      mySoldiers.shift()
    }

    myBullets.forEach((bullet, j) => {
      if (bullet.impact(soldier)) {
        myBullets.splice(j, 1)
        mySoldiers.splice(i, 1)
        score++
      }
    })
  })
}

function drawBullets() {
  myBullets.forEach(bullet => {
    bullet.draw()
  })
}

function drawJets() {
  myJets.forEach(jet => {
    jet.draw()
    jet.x += 3

    if (jet.x >= canvas.width) myJets.shift()
    document.getElementById('jet').play()
  })
}

function drawBombs() {
  myBombs.forEach((bomb, i) => {
    bomb.draw()
    bomb.y += 3

    myBullets.forEach((bullet, j) => {
      if (bullet.impact(bomb)) {
        bomb.life -= 50
        myBullets.splice(j, 1)
      }
    })

    if (bomb.life <= 0) {
      score += 15
      myBombs.splice(i, 1)
    }

    if (bomb.y + bomb.height >= canvas.height) {
      document.getElementById('boom').play()
      endGame()
      lives = 0
      updateCanvas()
    }
  })
}

// function drawTimer() {
//   myTimer.forEach((timer, i) => {
//     timer.draw()
//     timer.y += 4

//     if (timer.y > canvas.height) myTimer.shift()

//     myBullets.forEach((bullet, j) => {
//       if (bullet.impact(timer)) {
//         myBullets.splice(j, 1)
//         myTimer.splice(i, 1)

//         interval = (updateCanvas, 2000 / 60)
//       }
//     })
//   })
// }

function drawScore() {
  ctx.font = '50px Impact'
  ctx.fillStyle = 'black'
  ctx.fillText('Score: ' + score, canvas.width - 250, 50, 150)
}

function drawLives() {
  ctx.font = '50px Impact'
  ctx.fillStyle = 'red'
  ctx.fillText('Lives: ' + lives, 50, 50, 150)
  if (lives === 0) {
    lives--
    endGame()
  }
}
//Updates
function updateSoldier() {
  if (frames % 110 === 0) {
    let x = Math.floor(Math.random() * (canvas.width - 60) + 5)
    mySoldiers.push(new Soldier(x))
  }
}

function updateBullets() {
  let sX = 0
  let sY = 0
  const c = 0.667

  switch (cannon.frame) {
    case 0:
      sX = -4
      sy = 0
      break
    case 1:
      sX = -4
      sY = -c
      break
    case 2:
      sX = -4
      sY = -2 * c
      break
    case 3:
      sX = -4
      sY = -3 * c
      break
    case 4:
      sX = -4
      sY = -4 * c
      break
    case 5:
      sX = -4
      sY = -5 * c
      break
    case 6:
      sX = -4
      sY = -6 * c
      break
    case 7:
      sX = -5 * c
      sY = -4
      break
    case 8:
      sX = -4 * c
      sY = -4
      break
    case 9:
      sX = -3 * c
      sY = -4
      break
    case 10:
      sX = -2 * c
      sY = -4
      break
    case 11:
      sX = 0
      sY = -4
      break
    case 12:
      sX = 2 * c
      sY = -4
      break
    case 13:
      sX = 3 * c
      sY = -4
      break
    case 14:
      sX = 4 * c
      sY = -4
      break
    case 15:
      sX = 5 * c
      sY = -4
      break
    case 16:
      sX = 6 * c
      sY = -4
      break
    case 17:
      sX = 4
      sY = -5 * c
      break
    case 18:
      sX = 4
      sY = -4 * c
      break
    case 19:
      sX = 4
      sY = -3 * c
      break
    case 20:
      sX = 4
      sY = -2 * c
      break
    case 21:
      sX = 4
      sY = -c
      break
    case 22:
      sX = 4
      sY = 0
      break
      defalut: break
  }

  if (cannon.isShooting && frames % 15 === 0) {
    myBullets.push(new Bullet(sX, sY))
  }
}

function updateJets() {
  if (frames % 750 === 0) {
    myJets.push(new Jet())
  }
}

function updateBombs() {
  myJets.forEach(jet => {
    if (jet.x >= canvas.width / 2 - 25 && jet.x <= canvas.width / 2 - 23) {
      myBombs.push(new Bomb())
    }
  })
}

// function updateTimer() {
//   if (frames % 1500 === 0) {
//     let x = Math.floor(Math.random() * (canvas.width - 40) + 5)
//     myTimer.push(new Timer(x))
//   }
// }

//Game Loop
function updateCanvas() {
  frames++
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  gameScreen.draw()
  cannon.draw()
  drawScore()
  drawLives()
  updateSoldier()
  drawSoldiers()
  updateBullets()
  drawBullets()
  updateJets()
  drawJets()
  updateBombs()
  drawBombs()
  // updateTimer()
  // drawTimer()
}
//Funcionalidad de los botones
document.querySelector('button').onclick = startGame

document.onkeydown = e => {
  e.preventDefault()
  switch (e.keyCode) {
    case 37:
      cannon.aimLeft()
      break
    case 39:
      cannon.aimRight()
      break
    case 32:
      cannon.shoot()
      break
    default:
      break
  }
}

document.onkeyup = e => {
  if (e.keyCode === 32) cannon.isShooting = false
}
