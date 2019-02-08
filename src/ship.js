import {width,height} from './app'

"hSpeed = pixes/ms"
export default class Ship {
  constructor(options){
    this.hSpeed = options.hSpeed
    this.vSpeed = options.vSpeed
    this.x = options.coords[0]
    this.y = options.coords[1]
    this.ctx = options.ctx
    this.offset = 90
    this.rotate=this.rotate.bind(this)
    this.rotate({},90)
    this.angle = 90
  }

  step(){
    const x = this.calculateX()
    const y = this.calculateY()

    this.x = x
    this.y = y
  }

  calculateX(){
  }


  calculatey(){

  }

  rotate(e,deg){
    const offsetX=(this.x)+(30/2)
    const offsetY=(this.y)+(30/2)
    this.ctx.clearRect(0, 0, width, height);
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
    this.ctx.translate(-1*(offsetX), -1*(offsetY));
  }
  
  render(){
    window.onkeydown = this.rotate
    const ship = document.getElementById("ship")

    
    this.ctx.drawImage(ship, this.x, this.y,30,30);
  }
}