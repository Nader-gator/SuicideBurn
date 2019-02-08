export default class GameHandler{
  constructor(surface, ship){
    this.ship = ship
    this.surface = surface
  }

  isOver(){
    return false
  }

  start(){
    setInterval(() => {
      this.ship.step()
      this.ship.render()
    }, 20);


  }
}