import {height} from './app'
import Ship from './ship'
export const predictPath = (ship,surface) => {
 
  const canvasEl = document.getElementById('layer5')
  const ctx = canvasEl.getContext("2d")
  canvasEl.height = height
  canvasEl.width = window.innerWidth

  let x = ship.boardX;
  let y = ship.boardY;
  let hSpeed = ship.hSpeed
  let vSpeed = ship.vSpeed

  const mockShip = new Ship({
    hSpeed,
    vSpeed,
    ctx,
    coords: [x, y],
    gravity: surface.gravity,
    fuel: 9001
  })

  while (!checkGameOver(surface, mockShip)) {
    mockShip.gravityChange()
    mockShip.step()
    const mockShip2 = new Ship({
      hSpeed: mockShip.hSpeed,
      vSpeed: mockShip.vSpeed,
      ctx: mockShip.ctx,
      coords: [mockShip.boardX, mockShip.boardY],
      gravity: surface.gravity,
      fuel: 9001
    })
    if (checkSafe(mockShip2,surface)){
      mockShip.history.push('MARK')
    }
  }
  renderHistory(mockShip, ctx)
}

  const checkSafe = (ship,surface)=>{
    let outOfBounds = false
     while (!checkGameOver(surface,ship)) {
       ship.gravityChange()
       ship.fireEngine()
       ship.step()
      //  debugger
       if (ship.boardX < 0 || ship.boardY < 0){
         outOfBounds = true
       }
      }

    return outOfBounds
}



export const checkGameOver=(surface,ship)=>{
  if (
     ship.boardX < 0 || ship.boardY < 0 || surface.collisionHappened(ship.boardX + 15, ship.boardY + 15)
  ) {
    return true
  }
  return false
}

export const renderHistory=(ship)=>{

  const canvasEl = document.getElementById('layer6')
  const ctx = canvasEl.getContext("2d")
  canvasEl.height = height
  canvasEl.width = window.innerWidth
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
  ctx.strokeStyle = "white"
  ctx.lineWidth = 0.5
  // let initialX = ship.boardX
  // let initialY = ship.boardY
  
  ctx.beginPath();
  let markIdx = ship.history.indexOf("MARK")
    if (markIdx > 0){
      // debugger
      let x = ship.history[0][0] + 15
      let y = ship.history[0][1] + 15
      let xe = ship.history[markIdx][0] + 15
      let ye = ship.history[markIdx][1] + 15

      let xc = (x + xe) / 2
      let yc = ((y + ye) - 80) / 2

      ctx.moveTo(x, y)
      ctx.quadraticCurveTo(xc, yc, xe, ye)
      ctx.strokeStyle ='red'
      ctx.stroke();
      x = ship.history[markIdx][0] + 15
      y = ship.history[markIdx][1] + 15
      xe = ship.history[ship.history.length - 1][0] + 15
      ye = ship.history[ship.history.length - 1][1] + 15

      xc = (x + xe) / 2
      yc = ((y + ye) - 80) / 2

      ctx.moveTo(x, y)
      ctx.quadraticCurveTo(xc, yc, xe, ye)
      ctx.strokeStyle ='white'
      ctx.stroke();
    }else{
      let x = ship.history[0][0] + 15
      let y = ship.history[0][1] + 15
      let xe = ship.history[ship.history.length - 1][0] + 15
      let ye = ship.history[ship.history.length - 1][1] + 15

      let xc = (x + xe) / 2
      let yc = ((y + ye) - 80) / 2

      ctx.moveTo(x, y)
      ctx.quadraticCurveTo(xc, yc, xe, ye)
      ctx.strokeStyle = "white"
      ctx.stroke();
    }
      
      // ctx.lineTo(x, y);
      // ctx.lineTo(xe, ye);
  
  // ctx.stroke();
}