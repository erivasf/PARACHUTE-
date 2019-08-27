const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const audio1 = document.querySelector('#music1')
const boom = document.querySelector('#boom')

class GameScreen {
  constructor() {
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src = '/images/BackGround.png'
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

document.getElementById('.btn-start').onclick = function() {
  startGame()
  audio1.play()
  boom.play()
}
function startGame() {
  interval = setInterval(updateCanvas, 20)
}
