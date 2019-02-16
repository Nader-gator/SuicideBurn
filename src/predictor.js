import {height} from './app'
import Ship from './ship'
import {ENGINE_THRUST} from './ship'
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
  renderHistory(mockShip,ship,surface)
}


const checkGameOver=(surface,ship)=>{
  if (
     ship.boardX < 0 || ship.boardY < 0 || surface.collisionHappened(ship.boardX + 15, ship.boardY + 15)
  ) {
    return true
  }
  return false
}

const renderHistory=(ship,realShip,surface)=>{

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
      var xc = (ship.history[i][0] + ship.history[i+1][0]) / 2;
      var yc = (ship.history[i][1] + ship.history[i+1][1]) / 2;
      ctx.quadraticCurveTo(ship.history[i][0], ship.history[i][1], xc, yc);
      if (i < ship.history.length - 5) {

        if (tooLateHere(ship.sHistory[i+5],ship.history.length - i+5,ship,surface,[ship.history[i+5][0],ship.history[i+5][1]],realShip.angle)){
          break
        }

      }
      // ctx.moveTo(xc, yc)
    }
    // let color = tooLate(realShip, ship.history.length - i)
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

const tooLateHere = (speed, stepsRemaining,mockShip,surface,coords,angle)=>{

  const hChangePerSecondfromThrust = ENGINE_THRUST
  const vChangePerSecondfromThrust = ENGINE_THRUST

  const stepsForHStop = speed[0] / hChangePerSecondfromThrust
  
  const stepsforVstop = speed[1] / vChangePerSecondfromThrust

  if (stepsForHStop > stepsRemaining || stepsforVstop > stepsRemaining){

    const verticlCollisionStopped = verticalSecondarySimulation(speed[0],speed[1],coords[0],coords[1], angle, surface)
    const horizontalCollisionStopped = horizontalSecondarySimulation(speed[0], speed[1], coords[0], coords[1], angle, surface)
    if (!verticlCollisionStopped){
      return true
    } else if (!horizontalCollisionStopped) {
      return true
    }else
    {
      return false
    }
  } else {
    return false
  }
}

const verticalSecondarySimulation = (hSpeed, vSpeed, x, y, angle, surface) => {
  const canvasEl = document.getElementById('layer5')
  const ctx = canvasEl.getContext("2d")
  canvasEl.height = height
  canvasEl.width = window.innerWidth
   const mockShip = new Ship({
     hSpeed: 0,
     vSpeed,
     ctx,
     coords: [x, y],
     gravity: surface.gravity,
     fuel: 9001
   },angle)

   let inverted = false
   while (!checkGameOver(surface, mockShip)) {
    if (checkIfInvertedSpeed(vSpeed, mockShip.vSpeed)) {
      inverted = true
      break
    }
     mockShip.step()
     mockShip.gravityChange()
     mockShip.fireEngine()
    
   }
   return inverted
}
const horizontalSecondarySimulation = (hSpeed, vSpeed, x, y, angle, surface) => {
  const canvasEl = document.getElementById('layer5')
  const ctx = canvasEl.getContext("2d")
  canvasEl.height = height
  canvasEl.width = window.innerWidth
   const mockShip = new Ship({
     hSpeed,
     vSpeed,
     ctx,
     coords: [x, y],
     gravity: 0,
     fuel: 9001
   },angle)

   let inverted = false
   while (!checkGameOver(surface, mockShip)) {
    if (checkIfInvertedSpeed(hSpeed, mockShip.hSpeed)) {
      inverted = true
      break
    }
     mockShip.gravityChange()
     mockShip.step()
     mockShip.fireEngine()
     mockShip.angle = 90
     mockShip.fireEngine()
     mockShip.angle = angle
   }
   return inverted
}


const checkIfInvertedSpeed = (initial,last)=>{
  if (initial > 0){
    if (last > 0){
      return false
    } else if(last <= 0) {
      return true
    }
  } else if (initial < 0){
    if (last > 0){
      return true
    } else if (last <= 0 ){
      return false
    }
  }
  return true
}