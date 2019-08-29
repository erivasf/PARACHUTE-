const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const mySoldiers = []
const myBullets = []
const myBombs = []
const myChoppers = []
const muJets = []
const myTimer = []
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
    this.img.src = '/Assets/images/css_Sprites.png'
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
    // 18 grados cada case
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
  }
  draw() {
    this.x += this.speedX
    this.y += this.speedY

    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  impact (){
    if 
  }
}

class Chopper {
  constructor() {
    this.width = 50
    this.height = 40
    this.x = canvas.width
    this.y = 100
    this.img = new Image()
    this.img.src = 'Assets/images/chopper.png'
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
}

class Jet {
  constructor() {
    this.width = 60
    this.height = 30
    this.x = canvas.width
    this.y = 100
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
    this.width = 10
    this.height = 20
    this.x = canvas.width / 2 - 5
    this.y = 0
    this.speed = 2
    this.img = new Image()
    this.img.src = 'Assets/images/Bullet.png'
  }
  draw() {
    if (frames === 100) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
      this.y -= this.speed
    }
  }
}
class Timer {
  constructor(x) {
    this.life = 100
    this.width = 15
    this.height = 15
    this.x = x
    this.y = 0
    this.img = new Image()
    this.img.src = 'Assets/images/time.png'
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
}

//Instancias
const gameScreen = new GameScreen()
const cannon = new Cannon()
const soldier = new Soldier()
const jet = new Jet()
const bomb = new Bomb()
const chopper = new Chopper()
const timer = new Timer()

//Funciones
function startGame() {
  document.getElementById('button').style.display = 'none'
  document.getElementById('music1').play()
  document.getElementById('boom').play()
  interval = setInterval(updateCanvas, 1000 / 60)
}

//Draws
function drawSoldiers() {
  mySoldiers.forEach(soldier => {
    soldier.draw()
  })
}

function drawBullets() {
  myBullets.forEach(bullet => {
    bullet.draw()
  })
}

// function drawJet() {}

// function drawBomb(){

// }

//Updates
function updateSoldier() {
  if (frames % 110 === 0) {
    let x = Math.floor(Math.random() * (canvas.width - 60) + 5)
    mySoldiers.push(new Soldier(x))
  }

  if (frames % 800 === 0) mySoldiers.shift()
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

  if (cannon.isShooting) {
    myBullets.push(new Bullet(sX, sY))
  }
}

//Game Loop
function updateCanvas() {
  frames++
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  gameScreen.draw()
  cannon.draw()
  bomb.draw()
  updateSoldier()
  drawSoldiers()
  updateBullets()
  drawBullets()
}
//Funcionalidad de los botones
document.getElementById('button').onclick = startGame

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
