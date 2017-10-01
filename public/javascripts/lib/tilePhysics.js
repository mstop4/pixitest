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
            
            spr.x = clamp(spr.x, spr.width / 2, renderer.view.width - spr.width / 2)
            spr.y = clamp(spr.y, spr.height / 2, renderer.view.height - spr.height / 2)
            
            if (spr.x === spr.width / 2 || spr.x === renderer.view.width - spr.width / 2) {
                spr.vx *= -bounceDamping
                spr.vy *= bounceDamping
            }
            
            if (spr.y === spr.height / 2 || spr.y === renderer.view.height - spr.height / 2) {
                spr.vy *= -bounceDamping
                spr.vx *= bounceDamping
            }
        } else {
            // tiles repairing
            spr.x += spr.vx
            spr.y += spr.vy
            
            spr.x = clamp(spr.x, spr.width / 2, renderer.view.width - spr.width / 2)
            spr.y = clamp(spr.y, spr.height / 2, renderer.view.height - spr.height / 2)

            if (Math.abs(spr.x - spr.xStart) <= spr.vx) {
                spr.vx = 0
                spr.x = spr.xStart
            }

            if (Math.abs(spr.y - spr.yStart) <= spr.vy) {
                spr.vy = 0
                spr.y = spr.yStart
            }
        }
    })
}

function handleClick(container) {

    console.log("Click")

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

        spr.vx = speed * Math.cos(direction * 180 / Math.PI)
        spr.vy = speed * Math.sin(direction * 180 / Math.PI)
    })
}

function fixTiles() {
    sprites.forEach( function(spr) {
        spr.physicsOn = false;
        let direction = Math.atan( (spr.y - spr.yStart) / (spr.x - spr.xStart) ) * 180 / Math.PI
        let speed = 1

        spr.vx = speed * Math.cos(direction * 180 / Math.PI)
        spr.vy = speed * Math.sin(direction * 180 / Math.PI)
    })
}

function spinTiles() {
    sprites.forEach( function (spr) {
        spr.rotation += 0.01
    })
}