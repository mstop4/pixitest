let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}

PIXI.utils.sayHello(type)

// Sprite Loader setup
function setup() {
  var sprBunny = new PIXI.Sprite(
    PIXI.loader.resources["../images/bunny.jpg"].texture
  )

  stage.addChild(sprBunny)
  
  //Tell the `renderer` to `render` the `stage`
  renderer.render(stage)
}

//Create the renderer
let renderer = PIXI.autoDetectRenderer(256, 256)
renderer.view.style.border = "1px dashed black"
renderer.backgroundColor = 0x808080

// Full window canvas
renderer.view.style.position = "absolute"
renderer.view.style.display = "block"
renderer.autoResize = true
renderer.resize(window.innerWidth, window.innerHeight)

//Add the canvas to the HTML document
document.body.appendChild(renderer.view)

//Create a container object called the `stage`
let stage = new PIXI.Container()

// Load sprites to cache
PIXI.loader
  .add("../images/bunny.jpg")
  .load(setup)