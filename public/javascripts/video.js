let renderer = undefined
let stage = undefined
let videos = []
let textureURIs = ["../videos/escalator.mp4"]

let frameSkip = 0
let fsIndex = 0

initApp()
loadTextures(textureURIs, setup)

function setup() {
    console.log("Setting up video...")

    let texture = PIXI.Texture.fromVideo(PIXI.loader.resources[textureURIs[0]].data);
    
    // create a new Sprite using the video texture (yes it's that easy)
    let video = new PIXI.Sprite(texture);

    // Stetch the fullscreen
    video.width = 640;
    video.height = 360;
    video.texture.baseTexture.source.loop = true;
    console.dir(video.texture.baseTexture.source.loop )

    stage.addChild(video); 

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