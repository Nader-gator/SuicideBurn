import {width,height} from './app'

"hSpeed = pixes/ms"
export default class Ship {
  constructor(options){
    this.hSpeed = options.hSpeed
    this.vSpeed = options.vSpeed
    this.x = options.coords[0]
    this.y = options.coords[1]
    this.ctx = options.ctx

    this.ctx.height = height
    this.ctx.width = width
    this.offset = 90
    this.keyAction=this.keyAction.bind(this)
    this.keyAction({},90)
    this.angle = 90
    this.fire = false
    this.step = this.step.bind(this)
  }

  radians(deg){
    return (deg * (Math.PI / 180))
  }
  step(){

    const x = this.calculateX()
    const y = this.calculateY()

    this.x = x
    this.y = y
  }

  fireEngine(e){
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
      this.fire = true
    }
    this.ctx.translate(-1*(offsetX), -1*(offsetY));
  }
  
  render(){
    window.onkeydown = this.keyAction
    window.onkeyup = (e)=> {if(e.code==="Space"){this.fire=false}}
    this.ctx.clearRect(this.x-10, this.y-10, height, width);


    if(this.fire){
      const shipFiring = document.getElementById("ship-firing")
      this.ctx.drawImage(shipFiring, this.x + 10, this.y + 25, 10, 10);
    }
    const ship = document.getElementById("ship")

    this.ctx.drawImage(ship,this.x,this.y,30,30);
    
    
  }
}