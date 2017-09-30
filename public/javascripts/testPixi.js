let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}

PIXI.utils.sayHello(type)

// Sprite Loader setup
function loadProgressHandler(loader, resource) {
  console.log(`Loading "${resource.url}" ... ${loader.progress}%`)
}

function setup() {
  console.log("Setting up sprites...")

  var sprBunny = new PIXI.Sprite(
    PIXI.loader.resources["../images/bunny.jpg"].texture
  )
  var sprKitty = new PIXI.Sprite(
    PIXI.loader.resources.kitty.texture
  )

  sprBunny.x = 450
  sprBunny.y = 50

  sprKitty.y = 50

  stage.addChild(sprBunny)
  stage.addChild(sprKitty)

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
  .add({
    name: "kitty",
    url: "../images/kitty.jpg",
    crossOrigin: false,
    onComplete: function () {console.log("Meow")}
  })
  .on("progress", loadProgressHandler)
  .load(setup)