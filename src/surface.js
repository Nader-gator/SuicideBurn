import Point from './point'

export default class Surface {
  constructor(options){
    this.width = options.width
    this.height = options.height
    this.gravity = options.gravity
    this.generateGrid()
    this.ctx = options.ctx
    this.ceiling = this.height * 0.3
    this.floor = this.height * 0.9
  }

  generateGrid(){
    let grid = []
    for (let i = 0; i < this.height; i++) {
      grid.push([])
        for (let j = 0; j < this.width; j++) {
          grid[i].push(new Point([j,i]))
        }
    }
    this.grid = grid
    this.insertStars()
  }

  insertStars(){
    this.grid.forEach(row => {
      row.forEach(point => {
        if (Math.floor(Math.random() * 7000) === 1){
          point.star = true
        }
      })
    })
  }

  draw(){

    let oldX = 0
    let oldY = this.floor
    let newX = 1
    let newY = oldY-1

    while(newX < this.width){
      // debugger
      this.drawToCoords([oldX, oldY], [newX, newY])
      oldX = newX ; oldY = newY
      newY = newY + this.randomNum(40)
      while (newY > this.floor || newY < this.ceiling){
        newY = newY + this.randomNum(10)
      }
      newX= newX + 5
    }


    // this.drawToCoords([0,this.floor], [500,this.ceiling])
  }
  randomNum(max){
    let num = Math.floor(Math.random() * max) + 1
    num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1
    return num
  }
  pointOn(x,y){
    return this.grid[y][x]
  }

  drawToCoords(from,to){
    // debugger
    const ctx = this.ctx
    const fromX = from[0]
    const fromY = from[1]
    const toX= to[0]
    const toY= to[1]

    ctx.beginPath();
    ctx.strokeStyle = "white"
    ctx.lineWidth = 0.5
    ctx.moveTo(fromX, fromY)
    ctx.lineTo(toX, toY);
    ctx.stroke();
  }

}
