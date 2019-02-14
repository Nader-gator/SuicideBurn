[Link to Live Game](http://nader-a.com/SuicideBurn/)

### Suicide Burn
A remake of the classic Atari game 'Lunar Lander', named Suicide Burn, which is the act of firing off the rocket at the last possible second for a safe landing and maximum fuel efficiency.

### Background

**Lunar Lander** is a classic arcade space flight simulation game where the player has the control of a spaceships thrusters and orientation. The player must maneuver the ship and land it safely on a flat surface on the moon. The surface of the moon is Randomly generated, and resembles mountains and hills.

This game was created using only JavaScript and HTML5+CSS. My goal here was to create a fun game with zero outside library help. Note jQuery was used in two function to fetch high score data from google Firebase. Finally, WebPack and babel were used to compile ES6 JavaScript code compatible with all browsers.

### About Assistance

The game has two modes, assistance on or off. with assistance off. Your high score will only be recorded with assistance off. Assistance great for getting a feeling for how a ship behaves in zero gravity.

Assistance is one of the core features of this game, and also the most difficult to implement. Simply put, the assistance line indicates the path of your ship. generally at a certain point in the line, the color changes to red. this indicates that this point in the trajectory is the final point you are able to fire your engine and land safely without any dangerous amount of horizontal or vertical velocity. If you fail to fire your engine beyond this point, you are guaranteed to crash.

![assistanceLine](https://github.com/Nader-gator/SuicideBurn/blob/master/assets/assitanceline.png)

**Implementation**

The assistance line is initially drawn by creating a new Ship Object at the coordinates of the ship,named mockShip, and immediately looping the ship through the actions it goes through for each frame until it crashes. the Ship Object holds a history variable, which is used to draw the line for the path of the simulated ship.

```js

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

```

This draws the line, but the red area of the line has not yet been calculated. This point is determined as the assistance line is drawn. the function ```tooLateHere``` is called at each single point to determine if this point is the point to start drawing the red line. a modifier of 30 is added to the point because after play testing it was determined most people trying to fire the engine at the last possible second tend to fire too late to safely land, due to slow reflexes.

```js
ctx.strokeStyle = "white"
 let i
    for (i = 1; i < ship.history.length - 2; i++) {
      var xc = (ship.history[i][0] + ship.history[i+1][0]) / 2;
      var yc = (ship.history[i][1] + ship.history[i+1][1]) / 2;
      ctx.quadraticCurveTo(ship.history[i][0], ship.history[i][1], xc, yc);
      if (i < ship.history.length - 30) {

        if (tooLateHere(ship.sHistory[i+30],ship.history.length - i+30,ship,surface,[ship.history[i+30][0],ship.history[i+30][1]],realShip.angle)){
          break
        }

      }

//....

for (i; i < ship.history.length - 2; i++) {
      var xc = (ship.history[i][0] + ship.history[i + 1][0]) / 2;
      var yc = (ship.history[i][1] + ship.history[i + 1][1]) / 2;
      ctx.quadraticCurveTo(ship.history[i][0], ship.history[i][1], xc, yc);
      // ctx.moveTo(xc, yc)
    }
    ctx.strokeStyle = 'red'
    ctx.stroke();
```


The  ```tooLateHere``` function initially used a simple formula to derive wether the ship has enough steps left to safely land. Each step is a frame where effect of engine thrust and gravity are applied to ships velocity.

```js
  const hChangePerSecondfromThrust = ENGINE_THRUST
  const vChangePerSecondfromThrust = ENGINE_THRUST

  const stepsForHStop = speed[0] / hChangePerSecondThrust
  
  const stepsforVstop = speed[1] / vChangePerSecondThrust

  if (stepsForHStop > stepsRemaining || stepsforVstop > stepsRemaining){  
    /// draw red line
  }

```

This method proved to not be accurate, mainly due to the fact that it assumes the ships time to impact remains constant even though that is not what is happening is reality.As the ship slows down, ```stepsRemaining``` increases, to infinity. 

however this method proved very useful later on, as it is a great tool to determine the approximate location to start drawing the red line. More on this later.


To solve this issue, and create an accurate red line point, two new simulations were used with two new mockShips one for horizontal velocity and one for vertical velocity. here is a snippet of the simulation for vertical velocity.

```js
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
```

The new mockShip starts with zero horizontal velocity, and is simulated with engines running. if the ship manages to invert its vertical velocity(go from positive to negative and vice versa) then the ship is determined to be safe, otherwise the ship is not safe and the current coordinates are used to begin drawing the red line.


While this method was pixel accurate, there was an issue of time complexity. at every single frame, two simulations are running inside another simulation. This problem did slow the game down significantly. To solve this problem, the initial method of estimating the approximate location of the red line was used to quickly determine if a secondary simulation is needed to pinpoint red line starting point.

```js
  const hChangePerSecondfromThrust = ENGINE_THRUST
  const vChangePerSecondfromThrust = ENGINE_THRUST

  const stepsForHStop = speed[0] / hChangePerSecondfromThrust
  
  const stepsforVstop = speed[1] / vChangePerSecondfromThrust
  if (stepsForHStop > stepsRemaining || stepsforVstop > stepsRemaining){

  const verticlCollisionStopped = verticalSecondarySimulation(speed[0],speed[1],coords[0],coords[1], angle, surface)
  const horizontalCollisionStopped = horizontalSecondarySimulation(speed[0], speed[1], coords[0], coords[1], angle, surface)
```

this way, the secondary set of simulations are only run when the point of simulation approximated to be nearby. This gave the game great performance while providing pixel accurate assistance lines.



### Collision Detection

Another challenging aspect of this project was hit detection. The main challenge in hit detection was the fact that the surface is drawn using randomly generated points, and the surface line is drawn between those two points. Essentially, the game knows where each point is located, but does not know about the line drawn between those two points. to solve this, basic trigonometry was used.

![triangle](https://github.com/Nader-gator/SuicideBurn/blob/master/assets/tiangle.png)

in the image above, `AB/AC == AD/AE`. To create an accurate hit detection system, the two surface points are set as the B and C point on this triangle, and ships coordinates, are D and E. therefore, the game will know if a collision has happened if `AD/AE < AB/AC`

this is implemented in the code below

```js
  collisionHappened(sX,sY){
    ///find the two point ship is hovering between
    let fX ;let fY;let lX;let lY
    for (let i = 0; i < this.points.length; i++) {
      if (this.points[i][0] > sX){
        lX = this.points[i][0] //lX => last x coordinates
        lY = this.points[i][1] //lY => last Y coordinates
        fX = this.points[i - 1][0] // fX => first x coordinates
        fY = this.points[i - 1][1] // fY => first y coordinates
        break
      }
    }
  //sX => ship x coordinates
  //sY => ship Y coordinates

    let dx = lX -fX
    let dY = lY - fY

    let sxP = (sX - fX) / dx
    let syP= (fY - sY) / dY
    if (syP === 0 && sxP === 0){
      return true
    }
    if (Math.abs(syP) > sxP){
      if (dY > 0){
        return true
      }
      return false
    }
    if (dY > 0) {
      return false
    }
```


This allowed for pixel perfect collision detection. this function was then used to check for collision on all four corners of the ship.

``` js
    if // size of the ships is 30x30
      (this.surface.collisionHappened(this.ship.boardX+30,this.ship.boardY+30) ||
      this.surface.collisionHappened(this.ship.boardX+30,this.ship.boardY) ||
      this.surface.collisionHappened(this.ship.boardX,this.ship.boardY+30) ||
      this.surface.collisionHappened(this.ship.boardX,this.ship.boardY)
    ){
      return true
```
