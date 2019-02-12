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
  })

  while (!checkGameOver(surface, mockShip)) {
    // debugger
    mockShip.step()
  }
  
  renderHistory(mockShip, ctx)
}



export const checkGameOver=(surface,ship)=>{
  if (
    surface.collisionHappened(ship.boardX + 15, ship.boardY + 15)
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
  let initialX = ship.boardX
  let initialY = ship.boardY
  
  ctx.beginPath();
  // debugger
  ship.history.forEach((touple,i) => {
    
      let x = touple[0] + 15
      let y = touple[1] + 15

      ctx.lineTo(x, y);

  });
  
  ctx.stroke();
}