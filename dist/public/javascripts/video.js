"use strict";

var textureURIs = ["../videos/waves.mp4"];
var videoContainer = undefined;
var videoScale = 1;
var numRows = 36;
var numColumns = 64;
var xOffset = 100;
var yOffset = 100;

initApp();
loadTextures(textureURIs, setup);

function setup() {
    console.log("Setting up video...");

    videoContainer = new PIXI.Container();
    videoContainer.exploded = false;
    videoContainer.interactive = true;
    videoContainer.buttonMode = true;

    videoContainer.on('pointerdown', function () {
        handleClick(videoContainer);
    });

    pixiApp.stage.addChild(videoContainer);

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
            newSprite.vx = 0;
            newSprite.vy = 0;
            newSprite.width = cellWidth / numColumns * videoScale;
            newSprite.height = cellHeight / numRows * videoScale;
            newSprite.anchor.set(0.5, 0.5);
            newSprite.physicsOn = false;
            sprites.push(newSprite);

            videoContainer.addChild(newSprite);
        }
    }

    gameLoop(processTiles);
}