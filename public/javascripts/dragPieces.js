let textureURIs = ["../videos/escalator.mp4"]
let videoScale = 1
let numRows = 4
let numColumns = 8
let xOffset = 100
let yOffset = 100

initApp()
loadTextures(textureURIs, setup)

function setup() {
    console.log("Setting up video...")

    let outline = new PIXI.filters.OutlineFilter(2, 0x99ff99)
    let bw = new PIXI.filters.ColorMatrixFilter()

    let guideTexture = PIXI.Texture.fromVideo(PIXI.loader.resources[textureURIs[0]].data)
    guideTexture.baseTexture.source.loop = true
    let guideSprite = new PIXI.Sprite(guideTexture)
    guideSprite.x = xOffset
    guideSprite.y = yOffset
    guideSprite.filters = [bw]
    bw.desaturate()

    pixiApp.stage.addChild(guideSprite)

    let cellWidth = guideTexture.width / numColumns
    let cellHeight = guideTexture.height / numRows

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numColumns; j++) {

            let rect = new PIXI.Rectangle(j*cellWidth, i*cellHeight, cellWidth, cellHeight)
            let texture = PIXI.Texture.fromVideo(PIXI.loader.resources[textureURIs[0]].data)
            texture.frame = rect
            let newSprite = new PIXI.Sprite(texture)

            newSprite.x = xOffset + (j+0.5)*(cellWidth * videoScale)
            newSprite.y = yOffset + (i+0.5)*(cellHeight * videoScale)
            newSprite.xStart = newSprite.x
            newSprite.yStart = newSprite.y
            newSprite.width = cellWidth / numColumns * videoScale
            newSprite.height = cellHeight / numRows * videoScale
            newSprite.angle = Math.floor(Math.random() * 4) * 90 * Math.PI / 180
            newSprite.angleDelta = 10 * Math.PI / 180
            newSprite.rotation = 0
            newSprite.anchor.set(0.5, 0.5)
            newSprite.filters = [outline]

            newSprite.dragging = false

            newSprite.interactive = true
            newSprite.buttonMode = true

            newSprite.on('pointerdown', onDragStart)
            newSprite.on('pointerup', onDragEnd)
            newSprite.on('pointerupoutside', onDragEnd)
            newSprite.on('pointermove', onDragMove)

            sprites.push(newSprite)
            pixiApp.stage.addChild(newSprite)
        }
    }

    window.addEventListener("keydown", onSpacePress, false)
    gameLoop(processPieces)
}

function onDragStart(event) {
    console.log("Drag Start")
    this.data = event.data
    this.alpha = 0.5
    this.dragging = true
}

function onDragEnd() {
    console.log("Drag End")
    this.data = null
    this.alpha = 1
    this.dragging = false

    if (Math.abs(this.x - this.xStart) < 16 && Math.abs(this.y - this.yStart) < 16 && this.rotation === this.angle) {
        this.x = this.xStart
        this.y = this.yStart
    }
}

function onDragMove() {
    if (this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent)
        this.x = newPosition.x
        this.y = newPosition.y
    }
}

function onSpacePress() {
    console.log("Space")
    sprites.forEach(function(spr) {
        if (spr.dragging) {
            spr.angle += 90 * Math.PI / 180
        }
    })
}

function processPieces() {
    sprites.forEach(function(spr) {

        if (spr.angle > spr.rotation) {
            if (Math.abs(spr.angle - spr.rotation) < spr.angleDelta) {
                spr.rotation = spr.angle
            } else {
                spr.rotation += spr.angleDelta
            }
        } else if (spr.angle < spr.rotation) {
            if (Math.abs(spr.angle - spr.rotation) < spr.angleDelta) {
                spr.rotation = spr.angle
            } else {
                spr.rotation -= spr.angleDelta
            }
        }

    })
}