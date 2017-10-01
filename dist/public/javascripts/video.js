"use strict";

var renderer = undefined;
var stage = undefined;
var sprites = [];
var textureURIs = ["../videos/escalator.mp4"];
var videoContainer = undefined;

var videoScale = 0.5;
var numRows = 18;
var numColumns = 32;
var xOffset = 100;
var yOffset = 100;
var gravity = 0.1;
var bounceDamping = 0.8;

var frameSkip = 0;
var fsIndex = 0;

initApp();
loadTextures(textureURIs, setup);

function setup() {
    console.log("Setting up video...");

    videoContainer = new PIXI.Container();
    videoContainer.interactive = true;
    videoContainer.buttonMode = true;

    videoContainer.on('pointerdown', explodeTiles);

    stage.addChild(videoContainer);

    var cellWidth = 1920 / numColumns;
    var cellHeight = 1080 / numRows;

    for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < numColumns; j++) {

            var rect = new PIXI.Rectangle(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
            var texture = PIXI.Texture.fromVideo(PIXI.loader.resources[textureURIs[0]].data);
            texture.frame = rect;
            texture.baseTexture.source.loop = true;
            var newSprite = new PIXI.Sprite(texture);

            newSprite.x = xOffset + (j + 0.5) * (cellWidth * videoScale);
            newSprite.y = yOffset + (i + 0.5) * (cellHeight * videoScale);
            newSprite.vx = 0;
            newSprite.vy = 0;
            newSprite.width = cellWidth / numColumns * videoScale;
            newSprite.height = cellHeight / numRows * videoScale;
            newSprite.anchor.set(0.5, 0.5);
            newSprite.physicsOn = false;
            sprites.push(newSprite);

            console.log(j * cellWidth, i * cellHeight, cellWidth, cellHeight, newSprite.x, newSprite.y, newSprite.width, newSprite.height);

            videoContainer.addChild(newSprite);
        }
    }

    gameLoop();
}

function gameLoop() {

    requestAnimationFrame(gameLoop);

    collapseTiles();

    //Tell the `renderer` to `render` the `stage`
    if (fsIndex === frameSkip) {
        renderer.render(stage);
        fsIndex = 0;
    } else {
        fsIndex++;
    }
}

function collapseTiles() {

    sprites.forEach(function (spr) {
        if (spr.physicsOn) {

            spr.vy += gravity;

            spr.x += spr.vx;
            spr.y += spr.vy;

            spr.x = clamp(spr.x, spr.width / 2, renderer.view.width - spr.width / 2);
            spr.y = clamp(spr.y, spr.height / 2, renderer.view.height - spr.height / 2);

            if (spr.x === spr.width / 2 || spr.x === renderer.view.width - spr.width / 2) {
                spr.vx *= -bounceDamping;
                spr.vy *= bounceDamping;
            }

            if (spr.y === spr.height / 2 || spr.y === renderer.view.height - spr.height / 2) {
                spr.vy *= -bounceDamping;
                spr.vx *= bounceDamping;
            }
        }
    });
}

function explodeTiles() {

    sprites.forEach(function (spr) {
        spr.physicsOn = true;
        var direction = Math.random() * 360;
        var speed = Math.random() * 5;

        spr.vx = speed * Math.cos(direction * 180 / Math.PI);
        spr.vy = speed * Math.sin(direction * 180 / Math.PI);
    });
}

function clamp(num, min, max) {
    return Math.max(min, Math.min(max, num));
}