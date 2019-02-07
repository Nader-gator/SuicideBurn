import Ship from './ship'
import Surface from './surface'

document.addEventListener("DOMContentLoaded",() => {
  const canvasEl = document.getElementsByTagName('canvas')[0]
  // const width = 3500
  // const height = 550
  const width = 3000
  const height = 700

  canvasEl.width = width
  canvasEl.height = height
  // canvasEl.width = window.innerWidth
  
  //-----CANVAS
  const ctx = canvasEl.getContext("2d")
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = 'black';
  //-----CANVAS
  
  const surface = new Surface({width, height, gravity:9.8, ctx})

  //----Draw Stars
    surface.grid.forEach((row,y)=>{
      row.forEach((el,x)=>{
        if (el.star === true){
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, 2 * Math.PI);
          ctx.fillStyle = "white";
          ctx.fill();
        }
      })
    })
  //----Draw Stars


  //--Draw the lines
    surface.generateRandom()

  //--Draw the lines
})
