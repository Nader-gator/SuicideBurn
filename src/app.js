import Ship from './ship'
import Surface from './surface'
import Game from './game_handler'
  export const width = 3000
  export const height = 700

document.addEventListener("DOMContentLoaded",() => {
  const canvasEl = document.getElementById('layer1')
  const shipcanvasEl = document.getElementById('layer2')
  const ctx = canvasEl.getContext("2d")
  const shipCtx = shipcanvasEl.getContext("2d")


    canvasEl.height = height
    canvasEl.width = window.innerWidth


  const surface = new Surface(
    {width,
     height, 
     gravity:9.8, 
     ctx}
      )

  const ship = new Ship(
    {hSpeed: 0,
    vSpeed:0,
    coords:[50,50],
    ctx: shipCtx}
      )
  const game = new Game(surface,ship)

  game.start()
})
