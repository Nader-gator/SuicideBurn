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

  ctx.beginPath();

    ctx.moveTo(ship.history[0][0], ship.history[0][1]);

  let i
    for (i = 1; i < ship.history.length - 2; i++) {
      var xc = (ship.history[i][0] + ship.history[i + 1][0]) / 2;
      var yc = (ship.history[i][1] + ship.history[i + 1][1]) / 2;
      ctx.quadraticCurveTo(ship.history[i][0], ship.history[i][1], xc, yc);
    }
    // curve through the last two ship.history
    ctx.quadraticCurveTo(ship.history[i][0], ship.history[i][1], ship.history[i + 1][0], ship.history[i + 1][1]);
  
  ctx.stroke();
}