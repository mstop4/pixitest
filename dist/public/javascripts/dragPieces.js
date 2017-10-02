"use strict";

var textureURIs = ["../videos/waves.mp4"];
var puzzleContainer = undefined;
var videoScale = 1;
var numRows = 4;
var numColumns = 8;
var xOffset = 100;
var yOffset = 100;

initApp();
loadTextures(textureURIs, setup);

function setup() {
    console.log("Setting up video...");

    //puzzleContainer = new PIXI.Container()
    //puzzleContainer.interactive = true
    //puzzleContainer.interactiveChildren = true

    //pixiApp.stage.addChild(puzzleContainer)

    var outline = new PIXI.filters.OutlineFilter(2, 0x99ff99);

    var cellWidth = 960 / numColumns;
    var cellHeight = 540 / numRows;

    for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < numColumns; j++) {

            var rect = new PIXI.Rectangle(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
            var texture = PIXI.Texture.fromVideo(PIXI.loader.resources[textureURIs[0]].data);
            texture.frame = rect;
            texture.baseTexture.source.loop = true;
            var newSprite = new PIXI.Sprite(texture);

            newSprite.x = xOffset + (j + 0.5) * (cellWidth * videoScale);
            newSprite.y = yOffset + (i + 0.5) * (cellHeight * videoScale);
            newSprite.xStart = newSprite.x;
            newSprite.yStart = newSprite.y;
            newSprite.width = cellWidth / numColumns * videoScale;
            newSprite.height = cellHeight / numRows * videoScale;
            newSprite.anchor.set(0.5, 0.5);
            newSprite.filters = [outline];

            newSprite.dragging = false;

            newSprite.interactive = true;
            newSprite.buttonMode = true;

            newSprite.on('pointerdown', onDragStart);
            newSprite.on('pointerup', onDragEnd);
            newSprite.on('pointerupoutside', onDragEnd);
            newSprite.on('pointermove', onDragMove);

            sprites.push(newSprite);
            pixiApp.stage.addChild(newSprite);
        }
    }

    gameLoop(function () {});
}

function onDragStart(event) {
    console.log("Drag Start");
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd() {
    console.log("Drag End");
    this.data = null;
    this.alpha = 1;
    this.dragging = false;
}

function onDragMove() {
    console.log("Drag Move");
    if (this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;
    }
}