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
    let startingYcoord = startPoint[1]
    let endingYcoord = endPoint[1]

    while (startingXcoord !== midPoint){
      let dxdr = ((startingXcoord - midPoint) / range)
      let modifier = (0.9 + dxdr) * 100 // more modifiers here
      
      const flatnessModifier = 100 //this can be changed for steepness
      //up or down
      if (Math.floor(Math.random() * flatnessModifier) < modifier) {
        //up
        startingYcoord++
        if (startingYcoord < peak) {
          this.pointOn(startingXcoord,startingYcoord).ground = true
        } else { //hit the peak here
          startingYcoord--
          this.pointOn(startingXcoord,startingYcoord).ground = true
        }
      } 
      
      else {
        //down
        startingYcoord--
        if (startingYcoord < peak) {
          this.pointOn(startingXcoord,startingYcoord).ground = true
        }
      }
      startingXcoord++
    }

    while(startingXcoord !== endingXcoord){
      let dxdr = ((startingXcoord - endingXcoord) / range)
      let modifier = (1 + dxdr) * 100

      const flatnessModifier = 120 //this can be changed for steepness
      if (Math.floor(Math.random() * flatnessModifier) < modifier) {
        startingYcoord--
        if (startingYcoord < peak) {
          this.pointOn(startingXcoord, startingYcoord).ground = true
        }
      } else {
        startingYcoord++
        if (startingYcoord < peak) {
          this.pointOn(startingXcoord, startingYcoord).ground = true
        } else {
          startingYcoord--
          this.pointOn(startingXcoord, startingYcoord).ground = true
        }
      }
      startingXcoord++
    }
  }

  generateValley(startPoint, endPoint, depth) {
    let startingXcoord = startPoint[0]
    let endingXcoord = endPoint[0]
    let range = endingXcoord - startingXcoord
    let midPoint = Math.floor((startingXcoord + endingXcoord) / 2)
    let startingYcoord = startPoint[1]
    let endingYcoord = endPoint[1]

    while (startingXcoord !== midPoint) {
      let dxdr = ((startingXcoord - midPoint) / range)
      let modifier = (0.9 + dxdr) * 100 // more modifiers here

      const flatnessModifier = 100 //this can be changed for steepness
      //up or down
      if (Math.floor(Math.random() * flatnessModifier) < modifier) {
        //up
        startingYcoord--
        if (startingYcoord < depth) {
          this.pointOn(startingXcoord, startingYcoord).ground = true
        } else { //hit the depth here
          startingYcoord++
          this.pointOn(startingXcoord, startingYcoord).ground = true
        }
      } else {
        //down
        startingYcoord++
        if (startingYcoord < depth) {
          this.pointOn(startingXcoord, startingYcoord).ground = true
        }
      }
      startingXcoord++
    }

    while (startingXcoord !== endingXcoord) {
      let dxdr = ((startingXcoord - endingXcoord) / range)
      let modifier = (1 + dxdr) * 100

      const flatnessModifier = 120 //this can be changed for steepness
      if (Math.floor(Math.random() * flatnessModifier) < modifier) {
        startingYcoord++
        if (startingYcoord < depth) {
          this.pointOn(startingXcoord, startingYcoord).ground = true
        }
      } else {
        startingYcoord--
        if (startingYcoord < depth) {
          this.pointOn(startingXcoord, startingYcoord).ground = true
        } else {
          startingYcoord++
          this.pointOn(startingXcoord, startingYcoord).ground = true
        }
      }
      startingXcoord++
    }
  }

  generateFlat(startPoint, endPoint) {
    let startingXcoord = startPoint[0]
    let endingXcoord = endPoint[0]
    let startingYcoord = startPoint[1]

    while (startingXcoord !== endingXcoord){
      this.pointOn(startingXcoord, startingYcoord).ground = true
      this.pointOn(startingXcoord, startingYcoord).bonus = true
      startingXcoord++
    }
  }

  generateBonusFlat(startPoint, endPoint) {
    let bonus = Math.floor(Math.random() * 6)
    let startingXcoord = startPoint[0]
    let endingXcoord = endPoint[0]
    let startingYcoord = startPoint[1]

    while (startingXcoord !== endingXcoord) {
      this.pointOn(startingXcoord, startingYcoord).ground = true
      this.pointOn(startingXcoord, startingYcoord).bonus = bonus
      startingXcoord++
    }
  }

  pointOn(x,y){
    // y = this.height - y
    return this.grid[y][x]
  }

}

const options = {width: 50,height: 50, gravity: 9.8}
let surface = new Surface(options)
surface.generateGrid()
surface.generateFlat([1, 30], [10, 30], 45)
let test = surface.grid.map(row => {
  return row.map(el => {
    if (el.ground === true){
      return "Poi"
    }

    return el
  })
})
test = test.reverse()
debugger

