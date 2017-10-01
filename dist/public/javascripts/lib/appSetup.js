"use strict";

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
}

// Load sprites to cache
function loadTextures(texArray, setup) {

    PIXI.loader.add(texArray).on("progress", loadProgressHandler).load(setup);

    // Sprite Loader setup
    function loadProgressHandler(loader, resource) {
        console.log("Loading \"" + resource.url + "\" ... " + loader.progress + "%");
    }
}