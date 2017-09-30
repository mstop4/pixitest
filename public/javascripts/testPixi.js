let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}

PIXI.utils.sayHello(type)

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

// Sprite Loader setup
function loadProgressHandler(loader, resource) {
  console.log(`Loading "${resource.url}" ... ${loader.progress}%`)
}

var sprBunny
var sprKitty

function setup() {
  console.log("Setting up sprites...")

  sprBunny = new PIXI.Sprite(
    PIXI.loader.resources["../images/bunny.jpg"].texture
  )
  sprKitty = new PIXI.Sprite(
    PIXI.loader.resources.kitty.texture
  )

  sprBunny.position.set(450,200)
  sprBunny.scale.set(0.5,0.5)
  sprBunny.anchor.set(0.5,0.5)
  //sprBunny.pivot.set(100,100)

  sprKitty.x = 100
  sprKitty.y = 200
  sprKitty.width = 200
  sprKitty.height = 200
  sprKitty.anchor.x = 0.5
  sprKitty.anchor.y = 0.5

  stage.addChild(sprBunny)
  stage.addChild(sprKitty)

  gameLoop()
}

function gameLoop() {

  requestAnimationFrame(gameLoop);

  sprBunny.rotation += 0.01
  sprKitty.rotation -= 0.01

  //Tell the `renderer` to `render` the `stage`
  renderer.render(stage)
}