let textureURIs = ["../videos/bunny.mp4"]

let videoScale = 1
let numRows = 18
let numColumns = 32
let xOffset = 0
let yOffset = 0
let gravity = 0.1
let bounceDamping = 0.8

let frameSkip = 0
let fsIndex = 0

initApp()
loadTextures(textureURIs, setup)

function setup() {
    console.log("Setting up video...")

    videoContainer = new PIXI.Container()
    videoContainer.interactive = true
    videoContainer.buttonMode = true

    videoContainer.on('pointerdown', explodeTiles)

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

            newSprite.x = xOffset + (j+0.5)*(cellWidth * videoScale)
            newSprite.y = yOffset + (i+0.5)*(cellHeight * videoScale)
            newSprite.vx = 0
            newSprite.vy = 0
            newSprite.width = cellWidth / numColumns * videoScale
            newSprite.height = cellHeight / numRows * videoScale
            newSprite.anchor.set(0.5, 0.5)
            newSprite.physicsOn = false
            sprites.push(newSprite)

            videoContainer.addChild(newSprite)
        }
    }

    gameLoop()
}

function gameLoop() {

    requestAnimationFrame(gameLoop)

    let now = window.performance.now()
    let deltaTime = now - then
    then = now

    fpsHistory.push(1000 / deltaTime)
    if (fpsHistory.length > 20) {
        fpsHistory = fpsHistory.slice(1, 21)
    }

    let sum = fpsHistory.reduce( function (a, b) { return a+b })
    fpsText.setText(sum / fpsHistory.length)

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

    sprites.forEach( function(spr) {
        spr.physicsOn = true;
        let direction = Math.random() * 360
        let speed = Math.random() * 5

        spr.vx = speed * Math.cos(direction * 180 / Math.PI)
        spr.vy = speed * Math.sin(direction * 180 / Math.PI)
    })
}

function clamp (num, min, max) {
    return Math.max(min, Math.min(max, num))
}