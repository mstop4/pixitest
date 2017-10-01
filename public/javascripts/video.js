let renderer = undefined
let stage = undefined
let videos = []
let textureURIs = ["../videos/escalator.mp4"]

let frameSkip = 0
let fsIndex = 0

initApp()
//loadTextures(textureURIs, setup)
setup()

function setup() {
    console.log("Setting up video...")

    let texture = PIXI.Texture.fromVideo(textureURIs[0]);
    
    // create a new Sprite using the video texture (yes it's that easy)
    let videoSprite = new PIXI.Sprite(texture);

    // Stetch the fullscreen
    videoSprite.width = renderer.width;
    videoSprite.height = renderer.height;

    stage.addChild(videoSprite); 

    gameLoop()
  }
  
  function gameLoop() {
  
    requestAnimationFrame(gameLoop);

    //Tell the `renderer` to `render` the `stage`
    if (fsIndex === frameSkip) {
      renderer.render(stage)
      fsIndex = 0
    } else {
      fsIndex++
    }
  }