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
    shipcanvasEl.height = height
    shipcanvasEl.width = window.innerWidth


  const surface = new Surface(
    {width,
     height,
     gravity:0.0035,
    // gravity: 0,
     ctx}
      )

  const ship = new Ship(
    {hSpeed: 2,
    vSpeed: 0.5,
    coords:[50,50],
    ctx: shipCtx,
    gravity: surface.gravity
      }
      )
  const game = new Game(surface,ship)

  game.start()
})
