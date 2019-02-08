export default class GameHandler{
  constructor(surface, ship){
    this.ship = ship
    this.surface = surface
  }

  isOver(){
    if (this.surface.collisionHappened(this.ship.boardX+30,this.ship.boardY+30)){
      return true
    }
    return false
  }

  start(){
    this.interval = setInterval(() => {
      this.ship.step()
      this.ship.render()
      if (this.isOver()){
        this.ship.fire = false
        this.ship.render()
        clearInterval(this.interval)
      }
    }, 20);


  }
}