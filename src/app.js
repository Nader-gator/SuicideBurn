import Ship from './ship'
import Surface from './surface'
import Game from './game_handler'
import {generateHighScoreForm} from './high_scores_utl'
export const width = 3000
export const height = window.innerHeight -75

// generateHighScoreForm(850)
export const newGame = (e,fresh = true)=>{

  const canvasEl = document.getElementById('layer1')
  const ctx = canvasEl.getContext("2d")

  const shipcanvasEl = document.getElementById('layer2')
  const shipCtx = shipcanvasEl.getContext("2d")
  
  
  const statsEl = document.getElementById('layer3')
  const statsCtx = statsEl.getContext("2d")
  
  const textEl = document.getElementById('layer4')
  const textCtx = textEl.getContext("2d")


    canvasEl.height = height
    canvasEl.width = window.innerWidth
    shipcanvasEl.height = height
    shipcanvasEl.width = window.innerWidth
    statsEl.height = height
    statsEl.width = window.innerWidth

    textEl.height = height
    textEl.width = window.innerWidth
    textEl.style.height = height
    textEl.style.width = window.innerWidth

  const surface = new Surface(
    {width,
     height,
     gravity:0.0035,
     ctx}
      )

  const ship = new Ship(
    {hSpeed: 2,
    vSpeed: 0.5,
    coords:[50,50],
    ctx: shipCtx,
    gravity: surface.gravity,
    statsCtx,
    textCtx,
    fuel: 5000,
      })
  const game = new Game(surface,ship)

    if (fresh === true) {
      game.preGame()
      document.body.onkeyup = function (e) {
        if (e.keyCode == 32) {
          game.start()
          document.body.onkeyup = null
        }
      }
    }else{
      game.start()
      document.body.onkeyup = null
    }

}

document.addEventListener("DOMContentLoaded", newGame)

