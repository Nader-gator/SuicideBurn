import {newGame} from './app'
import {generateHighScoreForm,clearForm} from './high_scores_utl'
import {predictPath} from './predictor'

export default class GameHandler{
  constructor(surface, ship, drawText) {
    this.ship = ship
    this.surface = surface
    this.drawText = drawText
  }

  isOver(){
    if 
      (this.surface.collisionHappened(this.ship.boardX+30,this.ship.boardY+30) ||
      this.surface.collisionHappened(this.ship.boardX+30,this.ship.boardY) ||
      this.surface.collisionHappened(this.ship.boardX,this.ship.boardY+30) ||
      this.surface.collisionHappened(this.ship.boardX,this.ship.boardY)
    ){
      return true
    }
    return false
  }


  checkLanding(){
        let fX ;let fY;let lX;let lY
    for (let i = 0; i < this.surface.points.length; i++) {
      if (this.surface.points[i][0] > this.ship.boardX+30){
        lX = this.surface.points[i][0]
        lY = this.surface.points[i][1]
        fX = this.surface.points[i - 1][0]
        fY = this.surface.points[i - 1][1]
        break
      }
    }

    if (Math.abs(fY - lY) <= 10
    && Math.abs(fX -lX) > 15
    && (this.ship.vSpeed < 0.35)
    && (Math.abs(this.ship.hSpeed) < 0.2)
    && (this.ship.angle === 0 || this.ship.angle === -10 || this.ship.angle === 10)
    ){
      return true
    }else{
      return false
    }
  }

  preGame(){
    this.drawText.preGame()
  }
  start(){
    this.drawText.clearCanvas()
    this.interval = setInterval(() => {
      if (!this.ship.paused){
        document.body.onkeyup = (e)=> {
            if (e.keyCode == 80) {
              this.ship.paused = true
              console.log(this.ship.paused)
              document.body.onkeyup = (e)=> {
                  if (e.keyCode == 80) {
                    this.ship.paused = false
                  }
            }}}
        this.ship.step()
        this.ship.render()
        this.drawText.drawStats()
        if (this.ship.assist){
          this.predict()
        }

      }
      if (this.isOver()){

        this.ship.firing = false
        this.ship.render()
        this.handleGameOver()
        const canvasEl = document.getElementById('layer6')
        const ctx = canvasEl.getContext("2d")
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      }
    }, 20);
  }

  predict(){
    predictPath(this.ship,this.surface)
  }

  handleGameOver(){
    clearInterval(this.interval)
    if (this.checkLanding()) {
      this.drawText.result('good')
      this.generateEndGameResult('good')
    } else {
      this.ship.animateExplosion()
      this.generateEndGameResult('bad')
    }
  }

  generateEndGameResult(result){
    const oldship = this.ship
    if (result === 'good'){
      let ranked
      if (this.ship.assist) {
        ranked = generateHighScoreForm(0)
      } else {
        ranked = generateHighScoreForm(this.ship.fuel)
      }
      this.drawText.drawLastCommand(ranked)
      setTimeout(() => {
        document.body.onkeyup = function (e) {
          if ((ranked ? e.keyCode == 13 : e.keyCode == 32)) {
            clearForm()
            newGame(null, false, oldship)
          }
        }
      }, 600);

    }else if (result === 'bad'){
      setTimeout(() => {
        this.drawText.result('bad')
        // generateHighScoreForm(this.ship.fuel)
        document.body.onkeyup = (e) => {
          if (e.keyCode == 32) {
            newGame(null, false, oldship)
          }
        }
      }, 600);
    }
  }
}