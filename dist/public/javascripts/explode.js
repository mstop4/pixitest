"use strict";

var bunnyContainer = undefined;
var kittyContainer = undefined;
var textureURIs = ["../images/bunny.jpg"];

var numColumns = 50;
var numRows = 50;
var xOffset = 100;
var yOffset = 100;

initApp();
loadTextures(textureURIs, setup);

function setup() {
    console.log("Setting up sprites...");

    bunnyContainer = new PIXI.Container();
    bunnyContainer.exploded = false;
    bunnyContainer.interactive = true;
    bunnyContainer.buttonMode = true;

    bunnyContainer.on('pointerdown', function () {
        handleClick(bunnyContainer);
    });

    pixiApp.stage.addChild(bunnyContainer);

    var cellWidth = 400 / numColumns;
    var cellHeight = 400 / numRows;

    for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < numColumns; j++) {

            // bunny
            var rect = new PIXI.Rectangle(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
            var texture = new PIXI.Texture(PIXI.loader.resources[textureURIs[0]].texture.baseTexture, rect);
            var newSprite = new PIXI.Sprite(texture);

            newSprite.x = xOffset + j * cellWidth;
            newSprite.y = yOffset + i * cellHeight;
            newSprite.xStart = newSprite.x;
            newSprite.yStart = newSprite.y;
            newSprite.vx = 0;
            newSprite.vy = 0;
            newSprite.anchor.set(0.5, 0.5);
            newSprite.physicsOn = false;
            sprites.push(newSprite);

            bunnyContainer.addChild(newSprite);

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

    gameLoop(processTiles);
}