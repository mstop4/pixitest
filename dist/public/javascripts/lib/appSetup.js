"use strict";

var pixiApp = undefined;
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

    pixiApp = new PIXI.Application(window.innerWidth, window.innerHeight, {
        backgroundColor: 0x808080
    });

    // Full window canvas
    pixiApp.renderer.view.style.position = "absolute";
    pixiApp.renderer.view.style.display = "block";
    pixiApp.renderer.autoResize = true;

    //Add the canvas to the HTML document
    document.body.appendChild(pixiApp.view);

    window.addEventListener("resize", function () {
        pixiApp.renderer.resize(window.innerWidth, window.innerHeight);
    });

    fpsText = new PIXI.Text("0");
    fpsText.x = 300;
    fpsText.y = 0;

    pixiApp.stage.addChild(fpsText);
}

// Load sprites to cache
function loadTextures(texArray, setup) {

    PIXI.loader.add(texArray).on("progress", loadProgressHandler).load(setup);

    // Sprite Loader setup
    function loadProgressHandler(loader, resource) {
        console.log("Loading \"" + resource.url + "\" ... " + loader.progress + "%");
    }
}

function gameLoop(updateFunc) {
    requestAnimationFrame(function () {
        gameLoop(updateFunc);
    });

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

    updateFunc();

    //Tell the `renderer` to `render` the `stage`
    if (fsIndex === frameSkip) {
        pixiApp.renderer.render(pixiApp.stage);
        fsIndex = 0;
    } else {
        fsIndex++;
    }
}