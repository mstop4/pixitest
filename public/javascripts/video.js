let renderer = undefined
let stage = undefined
let sprites = []
let textureURIs = ["../videos/bunny.mp4"]
let videoContainer = undefined

let videoScale = 1
let numRows = 2
let numColumns = 2
let xOffset = 0
let yOffset = 0

let frameSkip = 0
let fsIndex = 0

initApp()
loadTextures(textureURIs, setup)

function setup() {
    console.log("Setting up video...")

    videoContainer = new PIXI.Container()
    stage.addChild(videoContainer)

    let cellWidth = 1280 / numColumns
    let cellHeight = 720 / numRows

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numColumns; j++) {

            let rect = new PIXI.Rectangle(j*cellWidth, i*cellHeight, cellWidth, cellHeight)
            let texture = PIXI.Texture.fromVideo(PIXI.loader.resources[textureURIs[0]].data)
            texture.frame = rect
            texture.baseTexture.source.loop = true;
            let newSprite = new PIXI.Sprite(texture)

            newSprite.x = xOffset + j*(cellWidth)
            newSprite.y = yOffset + i*(cellHeight)
            newSprite.vx = 0
            newSprite.vy = 0
            newSprite.width = cellWidth
            newSprite.height = cellHeight
            //newSprite.anchor.set(0.5, 0.5)
            newSprite.physicsOn = false
            sprites.push(newSprite)

            console.log(j*cellWidth, i*cellHeight, cellWidth, cellHeight, newSprite.x, newSprite.y, newSprite.width, newSprite.height)

            videoContainer.addChild(newSprite)
        }
    }

    // Stetch the fullscreen
    // video.scale.x = videoScale
    // video.scale.y = videoScale
    // video.texture.baseTexture.source.loop = true;

    gameLoop()
  }
  
  function gameLoop() {
  
    requestAnimationFrame(gameLoop);

    //Tell the `renderer` to `render` the `stage`
    if (fsIndex === frameSkip) {
      renderer.render(stage)
      fsIndex = 0
    } else {
      fsIndex++
    }
  }