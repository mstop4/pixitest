"use strict";

var renderer = undefined;
var stage = undefined;
var sprites = [];

var fpsText = undefined;
var fpsHistory = [];
var then = window.performance.now();

function initApp() {

    var type = "WebGL";
    if (!PIXI.utils.isWebGLSupported()) {
        type = "canvas";
    }

    PIXI.utils.sayHello(type);

    //Create the renderer
    renderer = PIXI.autoDetectRenderer(256, 256);
    renderer.backgroundColor = 0x808080;

    // Full window canvas
    renderer.view.style.position = "absolute";
    renderer.view.style.display = "block";
    renderer.autoResize = true;
    renderer.resize(window.innerWidth, window.innerHeight);

    //Add the canvas to the HTML document
    document.body.appendChild(renderer.view);

    //Create a container object called the `stage`
    stage = new PIXI.Container();

    fpsText = new PIXI.Text("0");
    fpsText.x = 300;
    fpsText.y = 0;

    stage.addChild(fpsText);
}

// Load sprites to cache
function loadTextures(texArray, setup) {

    PIXI.loader.add(texArray).on("progress", loadProgressHandler).load(setup);

    // Sprite Loader setup
    function loadProgressHandler(loader, resource) {
        console.log("Loading \"" + resource.url + "\" ... " + loader.progress + "%");
    }
}

function gameLoop() {
    requestAnimationFrame(gameLoop);

    var now = window.performance.now();
    var deltaTime = now - then;
    then = now;

    fpsHistory.push(1000 / deltaTime);
    if (fpsHistory.length > 20) {
        fpsHistory = fpsHistory.slice(1, 21);
    }

    var sum = fpsHistory.reduce(function (a, b) {
        return a + b;
    });
    fpsText.setText("FPS: " + (sum / fpsHistory.length).toFixed(2));

    processTiles();

    //Tell the `renderer` to `render` the `stage`
    if (fsIndex === frameSkip) {
        renderer.render(stage);
        fsIndex = 0;
    } else {
        fsIndex++;
    }
}