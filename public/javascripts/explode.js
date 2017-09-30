let renderer = undefined
let stage = undefined
let sprites = []
let textureURIs = ["../images/bunny.jpg"]

let numColumns = 10
let numRows = 10
let xOffset = 100
let yOffset = 100

let frameSkip = 0
let fsIndex = 0

initApp()
loadTextures(textureURIs, setup)

function setup() {
    console.log("Setting up sprites...")

    let cellWidth = 400 / numColumns
    let cellHeight = 400 / numRows

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numColumns; j++) {

            let rect = new PIXI.Rectangle(j*cellWidth, i*cellHeight, cellWidth, cellHeight)
            let texture = new PIXI.Texture(PIXI.loader.resources[textureURIs[0]].texture.baseTexture, rect)
            let newSprite = new PIXI.Sprite(texture)

            newSprite.x = xOffset + j*(cellWidth)
            newSprite.y = yOffset + i*(cellHeight)
            newSprite.anchor.set(0.5, 0.5)
            sprites.push(newSprite)

            stage.addChild(newSprite)
        }
    }

    gameLoop()
  }
  
  function gameLoop() {
  
    requestAnimationFrame(gameLoop);

    sprites.forEach( function (spr) {
      spr.rotation += 0.01
    })
  
    //Tell the `renderer` to `render` the `stage`
    if (fsIndex === frameSkip) {
      renderer.render(stage)
      fsIndex = 0
    } else {
      fsIndex++
    }
  }