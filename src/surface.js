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
    let endingXcoord = endPoint
    let range = endingXcoord - startingXcoord
    let midPoint = Math.floor((startingXcoord + endingXcoord) / 2)
    let startingYcoord = startPoint[1]
    let yAxis
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
          yAxis = startingYcoord
        }
      } else {
        startingYcoord++
        if (startingYcoord < peak) {
          this.pointOn(startingXcoord, startingYcoord).ground = true
          yAxis = startingYcoord
        } else {
          startingYcoord--
          this.pointOn(startingXcoord, startingYcoord).ground = true
          yAxis = startingYcoord
        }
      }
      startingXcoord++
    }

    return yAxis
  }

  generateValley(startPoint, endPoint) {
    //startpoint is coordinate, endpoint is only x axis
    let startingXcoord = startPoint[0]
    let endingXcoord = endPoint
    let range = endingXcoord - startingXcoord
    let midPoint = Math.floor((startingXcoord + endingXcoord) / 2)
    let startingYcoord = startPoint[1]
    let yAxis
    while (startingXcoord !== midPoint) {
      let dxdr = ((startingXcoord - midPoint) / range)
      let modifier = (0.9 + dxdr) * 100 // more modifiers here

      const flatnessModifier = 100 //this can be changed for steepness
      //up or down
      if (Math.floor(Math.random() * flatnessModifier) < modifier) {
        //up
        startingYcoord++
        if (startingYcoord > 1) {
          this.pointOn(startingXcoord, startingYcoord).ground = true
        } else { //hit the depth here
          startingYcoord--
          this.pointOn(startingXcoord, startingYcoord).ground = true
        }
      } else {
        //down
        startingYcoord--
        if (startingYcoord > 1) {
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
        startingYcoord--
        if (startingYcoord > 1) {
          this.pointOn(startingXcoord, startingYcoord).ground = true
          yAxis = startingYcoord
        }
      } else {
        startingYcoord++
        if (startingYcoord > 1) {
          this.pointOn(startingXcoord, startingYcoord).ground = true
          yAxis = startingYcoord
        } else {
          startingYcoord--
          this.pointOn(startingXcoord, startingYcoord).ground = true
          yAxis = startingYcoord
        }
      }
      startingXcoord++
    }
    return yAxis
  }

  generateFlat(startPoint, endPoint) {
    let startingXcoord = startPoint[0]
    let endingXcoord = endPoint
    let startingYcoord = startPoint[1]
    let yAxis
    while (startingXcoord !== endingXcoord){
      this.pointOn(startingXcoord, startingYcoord).ground = true
      this.pointOn(startingXcoord, startingYcoord).bonus = true
      yAxis = startingYcoord
      startingXcoord++
    }

    return yAxis
  }

  generateBonusFlat(startPoint, endPoint) {
    let bonus = Math.floor(Math.random() * 6)
    let startingXcoord = startPoint[0]
    let endingXcoord = endPoint
    let startingYcoord = startPoint[1]
    let yAxis
    while (startingXcoord !== endingXcoord) {
      this.pointOn(startingXcoord, startingYcoord).ground = true
      this.pointOn(startingXcoord, startingYcoord).bonus = bonus
      yAxis = startingYcoord
      startingXcoord++
    }
    return yAxis
  }

  pointOn(x,y){
    return this.grid[y][x]
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  generateRandomSurface(){
    this.generateGrid()
    let fields = []
    let totalPoints = 0
    
    for (let i = 0; i < 5; i++) {
      let rand = Math.floor(Math.random() * 3) + 1
      fields.push({func: this.generateFlat,num: rand})
      totalPoints += rand
    }
    for (let i = 0; i < 5; i++) {
      let rand = Math.floor(Math.random() * 3) + 1
      fields.push({func: this.generateBonusFlat,num: rand})
      totalPoints += rand
    }

    for (let i = 0; i < 10; i++) {
      let rand = Math.floor(Math.random() * 30) + 1
      fields.push({func: this.generateHill,num: rand})
      totalPoints += rand
    }

    for (let i = 0; i < 10; i++) {
      let rand = Math.floor(Math.random() * 30) + 1
      fields.push({func: this.generateValley,num: rand})
      totalPoints += rand
    }
    fields = this.shuffle(fields)
    let multiplier = this.width / totalPoints
    fields.forEach(touple => {
      touple.num = Math.ceil(touple.num * multiplier)
    });

    let xAxis = 0
    let yAxis = Math.floor(this.height / 2)
    let that = this
    window.fields = fields
    fields.forEach(touple => {
        if (xAxis + touple.num > this.width){return}
        yAxis = touple.func.call(that, [xAxis, yAxis], (xAxis + touple.num),(0.8 *this.height))
        xAxis = xAxis+touple.num
    });
  }

}

const options = {width: 1440,height: 900, gravity: 9.8}
let surface = new Surface(options)
surface.generateRandomSurface()
// surface.generateGrid()
// surface.generateValley([0,50],20)
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

