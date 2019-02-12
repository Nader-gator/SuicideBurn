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

  }
  renderHistory(mockShip,ship)
}


export const checkGameOver=(surface,ship)=>{
  if (
     ship.boardX < 0 || ship.boardY < 0 || surface.collisionHappened(ship.boardX + 15, ship.boardY + 15)
  ) {
    return true
  }
  return false
}

export const renderHistory=(ship,realShip)=>{

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
      if (tooLate(realShip,ship.history.length - i)){
        break
      }
      // ctx.moveTo(xc, yc)
    }
    let color = tooLate(realShip, ship.history.length - i)
    ctx.stroke();
    ctx.quadraticCurveTo(ship.history[i][0], ship.history[i][1], ship.history[i + 1][0], ship.history[i + 1][1]);
    ctx.beginPath();
    for (i; i < ship.history.length - 2; i++) {
      var xc = (ship.history[i][0] + ship.history[i + 1][0]) / 2;
      var yc = (ship.history[i][1] + ship.history[i + 1][1]) / 2;
      ctx.quadraticCurveTo(ship.history[i][0], ship.history[i][1], xc, yc);
      // ctx.moveTo(xc, yc)
    }
    ctx.strokeStyle = 'red'
    ctx.stroke();
    ctx.quadraticCurveTo(ship.history[i][0], ship.history[i][1], ship.history[i + 1][0], ship.history[i + 1][1]);
    
}

const tooLate = (ship, stepsRemaining)=>{

  const hChangePerSecondThrust = 0.009
  const vChangePerSecondThrust = 0.009 + ship.gravity
  const stepsForHStop = ship.hSpeed / hChangePerSecondThrust
  const stepsforVstop = ship.vSpeed / vChangePerSecondThrust

  if (stepsForHStop > stepsRemaining){
    return 'red'
  } else if (stepsforVstop > stepsRemaining){
    return 'blue'
  }else
  {
    return false
  }
}
