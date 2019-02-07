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

  generateRandom(){
    // debugger
    "4 bonus, 3 flat, 3hills, 2 mountain"
    const draws = {
      flat: 'flat',
      bonus: 'flatBonus',
      hill:['hill','valley'],
      mountain: ['mountain','fall']
    }
    
    let randAr = [];
    

    [1,2].forEach(i=>{
      randAr.push(draws.bonus)
    });
    [1,2].forEach(i=>{
      randAr.push(draws.flat)
    });
    [1,2].forEach(i=>{
      randAr.push(draws.hill)
    });
    [1,2,3].forEach(i=>{
      randAr.push(draws.mountain)
    })
    
    randAr= randAr.concat(randAr)
    
    randAr = this.shuffle(randAr)
    randAr.unshift(draws.hill)
    randAr = randAr.flat()

    this.ctx.beginPath();
    this.ctx.strokeStyle = "white"
    this.ctx.lineWidth = 0.5
    
    let startCoords = [0,this.floor]
    randAr.forEach(action=>{
      startCoords = this.draw(startCoords,action)
    })
    
    this.ctx.stroke();
    
  }

  shuffle(a){
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  draw(begin,type){

    let xStart = begin[0]
    let yStart = begin[1]
    let newX = xStart + 1
    let newY = yStart

    //----modifiable random generator parameters
    let yRand
    let yPeak
    let length
    let xEnd
    let xTravel
    let yFloor
    //----modifiable random generator parameters

    
    switch (type) {
      case 'flat':
        yRand = {max: 2, type: 0}
        yPeak = {max: 40,type:1}
        yFloor = {max: 20,type: -1}
        length = (0.03 * this.width)
        xEnd = xStart + length
        xTravel = length * 0.3
        break

        case 'flatBonus':
        yRand = {max: 2, type: 0}
        yPeak = {max: 40,type:-1}
        yFloor = {max: 20,type: -1}
        length = Math.round(0.01 * this.width)
        xEnd = xStart + length
        xTravel = Math.round(length * 0.3)

        break

        case 'valley':
        yRand = {max: 20, type: 1}
        yPeak = {max: 5,type:1}
        yFloor = {max: 20,type: -1}
        length = Math.round(0.04 * this.width)
        xEnd = xStart + length
        xTravel = Math.round(length * 0.15)
        break
        
        case 'hill':
        yRand = {max: 20, type: -1}
        yPeak = {max: 5,type:1}
        yFloor = {max: 20,type: -1}
        length = Math.round(0.02 * this.width)
        xEnd = xStart + length
        xTravel = Math.round(length * 0.08)
        break

      case 'mountain':
        yRand = {max: 150, type: -1}
        yPeak = {max: 20,type:1}
        yFloor = {max: 20,type: -1}
        length = Math.round(0.08 * this.width)
        xEnd = xStart + length
        xTravel = Math.round(length * 0.15)
        break
      case 'fall':
        yRand = {max: 150, type: 1}
        yPeak = {max: 20,type:1}
        yFloor = {max: 20,type: -1}
        length = Math.round(0.04 * this.width)
        xEnd = xStart + length
        xTravel = Math.round(length * 0.15)
        break
    }




    while (true) {
      this.drawToCoords([xStart, yStart], [newX, newY])

      if (newX >= xEnd){
        return [newX, newY]
      }

      xStart = newX;
      yStart = newY
      newY = newY + this.randomNum(yRand)
      while ( newY < this.ceiling) {
        newY = newY + this.randomNum(yPeak)
      }
      while (newY > this.floor){
        newY = newY + this.randomNum(yFloor)
      }
      newX = newX + xTravel
    }





  }


  randomNum(options){
    let num = Math.floor(Math.random() * options.max) + 1
    if (options.type === 0){
      num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1
    } else if (options.type === -1){
      num *= -1
    }
    return num
  }

  pointOn(x,y){
    return this.grid[y][x]
  }

  drawToCoords(from,to){
    const ctx = this.ctx
    const fromX = from[0]
    const fromY = from[1]
    const toX= to[0]
    const toY= to[1]

    // ctx.beginPath();

    ctx.moveTo(fromX, fromY)
    ctx.lineTo(toX, toY);
    
  }

}


// let oldX = 0
// let oldY = this.floor
// let newX = 1
// let newY = oldY - 1
// let distanceMod
// let heightMod
// let peakMod
// while (newX < this.width) {
//   this.drawToCoords([oldX, oldY], [newX, newY])
//   oldX = newX;
//   oldY = newY
//   newY = newY + this.randomNum(heightMod)
//   while (newY > this.floor || newY < this.ceiling) {
//     newY = newY + this.randomNum(peakMod)
//   }
//   newX = newX + distanceMod
// }
