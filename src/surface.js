import Point from './point'

export default class Surface {
  constructor(options){
    this.width = options.width
    this.height = options.height
    this.gravity = options.gravity
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
        if (Math.floor(Math.random() * 20) === 1){
          point.star = true
        }
      })
    })
  }

  generateHill(startPoint,endPoint, peak){
    let startingXcoord = startPoint[0]
    let endingXcoord = endPoint[0]
    let range = endingXcoord - startingXcoord
    let midPoint = Math.floor((startingXcoord + endingXcoord) / 2)
    while (startingXcoord !== endingXcoord){
      let dxdr = (midPoint - startingXcoord) / range
      
      
      startingXcoord++
    }
  }

  generateValley(startPoint, endPoint, depth) {

  }

  generateFlat(startPoint, endPoint) {

  }

  generateBonusFlat(startPoint, endPoint) {

  }

}

const options = {width: 10,height: 5, gravity: 9.8}
let surface = new Surface(options)
debugger