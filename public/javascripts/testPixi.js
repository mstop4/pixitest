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

let sprBunny
let sprKitty
var gravity = 0.2

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

  sprKitty.x = 200
  sprKitty.y = 200
  sprKitty.width = 200
  sprKitty.height = 200
  sprKitty.anchor.x = 0.5
  sprKitty.anchor.y = 0.5

  stage.addChild(sprBunny)
  stage.addChild(sprKitty)

  console.dir(renderer)

  sprBunny.vx = -5
  sprBunny.vy = 0

  sprKitty.vx = 5
  sprKitty.vy = 0

  gameLoop()
}

let frameSkip = 0
let fsIndex = 0

function gameLoop() {

  requestAnimationFrame(gameLoop);

  moveSprite(sprBunny)
  moveSprite(sprKitty)

  //Tell the `renderer` to `render` the `stage`
  if (fsIndex === frameSkip) {
    renderer.render(stage)
    fsIndex = 0
  } else {
    fsIndex++
  }
}

function moveSprite(spr) {

  spr.vy += gravity

  spr.x += spr.vx
  spr.y += spr.vy

  spr.x = clamp(spr.x, spr.width / 2, renderer.view.width - spr.width / 2)
  spr.y = clamp(spr.y, spr.height / 2, renderer.view.height - spr.height / 2)

  if (spr.x === spr.width / 2 || spr.x === renderer.view.width - spr.width / 2) {
    spr.vx *= -0.9
    spr.vy *= 0.9
  }

  if (spr.y === spr.height / 2 || spr.y === renderer.view.height - spr.height / 2) {
    spr.vy *= -0.9
    spr.vx *= 0.9
  }
}

function clamp (num, min, max) {
  return Math.max(min, Math.min(max, num))
}