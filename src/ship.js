import {width,height} from './app'

"hSpeed = pixes/ms"
export default class Ship {
  constructor(options){
    this.hSpeed = options.hSpeed
    this.vSpeed = options.vSpeed
    this.x = options.coords[0]
    this.y = options.coords[1]
    this.boardX = options.coords[0]
    this.boardY = options.coords[1]
    this.ctx = options.ctx
    this.gravity= options.gravity
    this.statsCtx = options.statsCtx
    this.textCtx = options.textCtx
    this.fuel = 6000

    this.ctx.height = height
    this.ctx.width = width
    this.offset = 90
    this.keyAction=this.keyAction.bind(this)
    this.keyAction({},90)
    this.angle = 90
    this.fire = false
    this.firing = false
    this.step = this.step.bind(this)
  }

  radians(deg){
    return (deg * (Math.PI / 180))
  }
  step(){

    const x = this.calculateX()
    const y = this.calculateY()

    this.boardX= this.boardX + this.hSpeed
    this.boardY= this.boardY + this.vSpeed
    this.x = x
    this.y = y

  }

  fireEngine(){
    this.updateVSpeed(0.009)
    this.updateHSpeed(0.009)
  }

  updateVSpeed(force){
    this.vSpeed -= force * Math.cos(this.radians(this.angle))
  }
  updateHSpeed(force){
    this.hSpeed -= force * Math.sin(this.radians(this.angle))
  }

  gravityChange(){
    this.vSpeed += this.gravity
  }

  calculateX(){
    //for x axis
    const offset = Math.cos(this.radians(this.angle)) 
    let result = (offset * this.hSpeed)
    //for y axis
    const offsetY = Math.sin(this.radians(this.angle)) * -1
    return (this.x + (offsetY * this.vSpeed)) + result
  }


  calculateY(){
    //for x axis
    const offset = Math.sin(this.radians(this.angle)) 
    let result = (offset * this.hSpeed)
    //for y axis
    const offsetY = Math.cos(this.radians(this.angle))
    return (this.y + (offsetY * this.vSpeed)) + result
  }

  keyAction(e,deg){

    const offsetX=(this.x)+(30/2)
    const offsetY=(this.y)+(30/2)
    
    this.ctx.translate(offsetX , offsetY);
    
    if (e.code === "ArrowRight" && this.angle < 90){
      this.ctx.rotate(-10*Math.PI/180);
      this.angle += 10
    }
    if(e.code === "ArrowLeft" && this.angle > -90){
      this.ctx.rotate(10*Math.PI/180);
      this.angle -= 10
    }
    if(deg){
       this.ctx.rotate(-deg*Math.PI/180);
    }
    if (e.code === "Space") {
      this.firing=true
      this.fire = true
    }
    this.ctx.translate(-1*(offsetX), -1*(offsetY))

  }
  
  render(){
    window.onkeydown = this.keyAction
    window.onkeyup = (e)=> {if(e.code==="Space"){
      this.fire=false;this.firing=false}}
    this.gravityChange()
    this.ctx.clearRect(this.x-10, this.y-10, height, width);

      this.drawStats()

    if (this.fuel < 2) {
      this.firing = false
      this.fire = false
    }
    if(this.fire){
      const shipFiring = document.getElementById("ship-firing")
      this.ctx.drawImage(shipFiring, this.x + 10, this.y + 25, 10, 10);
      this.fuel -= 10
    }
    if (this.firing){
      this.fireEngine()
    }
    const ship = document.getElementById("ship")
    
    this.ctx.drawImage(ship,this.x,this.y,30,30);
    
    
  }

  drawStats(){
    const ctx = this.statsCtx
    const text = this.textCtx
    
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.strokeStyle = "white";
    ctx.fillStyle="black"
    ctx.rect(window.innerWidth * 0.865, 30, 160, 90);
    ctx.fill()
    ctx.stroke();


    text.clearRect(window.innerWidth * 0.865, 30, 160, 90)
    text.beginPath();
    text.font = "normal 13px Arial ";
    text.fillStyle = "grey";
    text.lineWidth = "1"
    text.textAlign = "right";
    text.fillText(`Horizontal Speed: ${Math.ceil(this.hSpeed * 100)}`, window.innerWidth * 0.965, 60)

    text.fillText(`Vertical Speed: ${Math.ceil(this.vSpeed * 100)}`, window.innerWidth * 0.965, 80)
    text.fillText(`Fuel: ${Math.ceil(this.fuel)}`, window.innerWidth * 0.965, 100)
  }

  preGame(){
    const ctx = this.statsCtx
    const text = this.textCtx

    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.strokeStyle = "white";
    ctx.fillStyle = "#252626"
    ctx.rect(
      window.innerWidth * 0.175,
      window.innerHeight / 5,
      window.innerWidth*0.65,
      window.innerHeight /4);
    ctx.fill()
    ctx.stroke();

    text.beginPath();
    text.font = "normal 18px Arial ";
    text.fillStyle = "white";
    text.lineWidth = "1"
    text.textAlign = "center";
    text.fillText(`Welcome to SuicideBurn, the Objective of the game is to land the ship preserving as much fuel as possible.`, window.innerWidth * 0.5 , window.innerHeight / 3.9)
    
    text.fillText(`fire your engine by pressing space, and rotate the ship by left and right arrow keys`, window.innerWidth * 0.5, window.innerHeight / 3.2)
    text.fillText(`press SPACE to START`, window.innerWidth * 0.5, window.innerHeight / 2.5)
  }

  clearCanvas(){
    const ctx = this.statsCtx
    const text = this.textCtx

    ctx.clearRect(0, 0, width, height);
    text.clearRect(0, 0, width, height);
  }

  result(status){
    const ctx = this.statsCtx
    const text = this.textCtx

    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.strokeStyle = "white";
    ctx.fillStyle = "#252626"


    text.beginPath();
    text.font = "normal 25px Arial ";
    text.fillStyle = "white";
    text.lineWidth = "1"
    text.textAlign = "center";
    if (status === 'good'){
      ctx.rect(window.innerWidth * 0.3, window.innerHeight / 7,
      window.innerWidth * 0.4, window.innerHeight / 1.8);
      text.fillText(`The Eagle Has Landed!`, window.innerWidth * 0.5, window.innerHeight / 4)
    } else if(status === 'bad') {
      ctx.rect(
        window.innerWidth * 0.325,
         window.innerHeight / 6,
         
        window.innerWidth * 0.35, 
        window.innerHeight / 4.5);

      text.fillText(`You left a 2 mile crater on the Moon!`, window.innerWidth * 0.5, window.innerHeight / 4)
      text.fillText(`Press space to start a new game`, window.innerWidth * 0.5, window.innerHeight / 3)

    }

    ctx.fill()
    ctx.stroke();
  }
}