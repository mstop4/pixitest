let gravity = 0.1
let bounceDamping = 0.8

let frameSkip = 0
let fsIndex = 0

function processTiles() {
    sprites.forEach( function (spr) {

        // tiles falling
        if (spr.physicsOn) {
            spr.vy += gravity
            
            spr.x += spr.vx
            spr.y += spr.vy
            
            spr.x = clamp(spr.x, spr.width / 2, pixiApp.renderer.view.width - spr.width / 2)
            spr.y = clamp(spr.y, spr.height / 2, pixiApp.renderer.view.height - spr.height / 2)
            
            if (spr.x === spr.width / 2 || spr.x === pixiApp.renderer.view.width - spr.width / 2) {
                spr.vx *= -bounceDamping
                spr.vy *= bounceDamping
            }
            
            if (spr.y === spr.height / 2 || spr.y === pixiApp.renderer.view.height - spr.height / 2) {
                spr.vy *= -bounceDamping
                spr.vx *= bounceDamping
            }
        } else {
            // tiles repairing
            spr.x += spr.vx
            spr.y += spr.vy
            
            spr.x = clamp(spr.x, spr.width / 2, pixiApp.renderer.view.width - spr.width / 2)
            spr.y = clamp(spr.y, spr.height / 2, pixiApp.renderer.view.height - spr.height / 2)

            if (Math.abs(spr.x - spr.xStart) <= Math.abs(spr.vx)) {
                spr.vx = 0
                spr.x = spr.xStart
                //console.log("X")
            }

            if (Math.abs(spr.y - spr.yStart) <= Math.abs(spr.vy)) {
                spr.vy = 0
                spr.y = spr.yStart
                //console.log("Y")
            }
        }
    })
}

function handleClick(container) {

    if (container.exploded) {
        fixTiles()
        container.exploded = false
    } else {
        explodeTiles()
        container.exploded = true
    }
}

function explodeTiles() {
    sprites.forEach( function(spr) {
        spr.physicsOn = true;
        let direction = Math.random() * 360
        let speed = Math.random() * 5

        spr.vx = speed * Math.cos(direction * Math.PI / 180)
        spr.vy = speed * -Math.sin(direction * Math.PI / 180)
    })
}

function fixTiles() {
    sprites.forEach( function(spr) {
        spr.physicsOn = false;
        let dy = spr.y - spr.yStart
        let dx = spr.x - spr.xStart
        let direction = Math.atan2( -dy, dx ) * 180 / Math.PI + 180
        let speed = 4

        spr.vx = speed * Math.cos(direction * Math.PI / 180)
        spr.vy = speed * -Math.sin(direction * Math.PI / 180)
    })
}

function spinTiles() {
    sprites.forEach( function (spr) {
        spr.rotation += 0.01
    })
}