let renderer = undefined
let stage = undefined
let bunnyContainer = undefined
let kittyContainer = undefined
let sprites = []
let textureURIs = ["../images/bunny.jpg", "../images/kitty.jpg"]

let numColumns = 50
let numRows = 50
let xOffset = 100
let yOffset = 100
let gravity = 0.1
let bounceDamping = 0.8

let frameSkip = 0
let fsIndex = 0

initApp()
loadTextures(textureURIs, setup)

function setup() {
    console.log("Setting up sprites...")

    bunnyContainer = new PIXI.Container()
    bunnyContainer.interactive = true
    bunnyContainer.buttonMode = true

    bunnyContainer.on('pointerdown', explodeTiles)

    stage.addChild(bunnyContainer)

    let cellWidth = 400 / numColumns
    let cellHeight = 400 / numRows

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numColumns; j++) {

            // bunny
            let rect = new PIXI.Rectangle(j*cellWidth, i*cellHeight, cellWidth, cellHeight)
            let texture = new PIXI.Texture(PIXI.loader.resources[textureURIs[0]].texture.baseTexture, rect)
            let newSprite = new PIXI.Sprite(texture)

            newSprite.x = xOffset + j*(cellWidth)
            newSprite.y = yOffset + i*(cellHeight)
            newSprite.vx = 0
            newSprite.vy = 0
            newSprite.anchor.set(0.5, 0.5)
            newSprite.physicsOn = false
            sprites.push(newSprite)

            bunnyContainer.addChild(newSprite)

            // kitty
            // rect = new PIXI.Rectangle(j*cellWidth, i*cellHeight, cellWidth, cellHeight)
            // texture = new PIXI.Texture(PIXI.loader.resources[textureURIs[1]].texture.baseTexture, rect)
            // newSprite = new PIXI.Sprite(texture)

            // newSprite.x = xOffset*2 + j*(cellWidth)
            // newSprite.y = yOffset*2 + i*(cellHeight)
            // newSprite.vx = 0
            // newSprite.vy = 0
            // newSprite.anchor.set(0.5, 0.5)
            // newSprite.physicsOn = false
            // sprites.push(newSprite)

            // container.addChild(newSprite)
        }
    }

    gameLoop()
  }
  
  function gameLoop() {
  
    requestAnimationFrame(gameLoop);
  
    collapseTiles()

    //Tell the `renderer` to `render` the `stage`
    if (fsIndex === frameSkip) {
      renderer.render(stage)
      fsIndex = 0
    } else {
      fsIndex++
    }
  }

  function collapseTiles() {

    sprites.forEach( function (spr) {
      if (spr.physicsOn) {

        // if (spr.vx < gravity && spr.vy < gravity) {
        //   spr.physicsOn = false
        //   console.log("OFF")
        // }

        spr.vy += gravity
        
        spr.x += spr.vx
        spr.y += spr.vy
      
        spr.x = clamp(spr.x, spr.width / 2, renderer.view.width - spr.width / 2)
        spr.y = clamp(spr.y, spr.height / 2, renderer.view.height - spr.height / 2)
      
        if (spr.x === spr.width / 2 || spr.x === renderer.view.width - spr.width / 2) {
          spr.vx *= -bounceDamping
          spr.vy *= bounceDamping
        }
      
        if (spr.y === spr.height / 2 || spr.y === renderer.view.height - spr.height / 2) {
          spr.vy *= -bounceDamping
          spr.vx *= bounceDamping
        }
      }
    })
  }

  function explodeTiles() {

    console.dir(renderer.plugins)

    sprites.forEach( function(spr) {
      spr.physicsOn = true;
      let direction = Math.random() * 360
      let speed = Math.random() * 5

      spr.vx = speed * Math.cos(direction * 180 / Math.PI)
      spr.vy = speed * Math.sin(direction * 180 / Math.PI)
    })
  }

  function spinTiles() {
    sprites.forEach( function (spr) {
      spr.rotation += 0.01
    })
  }

  function clamp (num, min, max) {
    return Math.max(min, Math.min(max, num))
  }