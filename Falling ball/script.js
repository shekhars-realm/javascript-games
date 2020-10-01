var character = document.getElementById('character')
var game = document.getElementById("game")
var interval
var both = 0
var counter = 0
var currentBlocks = []

function moveLeft() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"))
    if(left > 0) {
        character.style.left = left - 2 + 'px'
    }
}

function moveRight() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"))
    if(left < 380) {
        character.style.left = left + 2 + 'px'
    }
}

document.addEventListener("keydown", event => {
    if(both === 0) {
        if (event.key === "ArrowLeft") {
            interval = setInterval(moveLeft, 1)
        }
        if (event.key === "ArrowRight") {
            interval = setInterval(moveRight, 1)
        }
    }
})

document.addEventListener("keyup", event => {
    clearInterval(interval)
    both = 0
})



setInterval(() => {

    var blockLast = document.getElementById("block"+(counter-1))
    var holeLast = document.getElementById("hole" + (counter - 1))

    if(counter > 0) {
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"))
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"))
    }

    if(blockLastTop < 400 || counter === 0) {
        var block = document.createElement("div")
        var hole = document.createElement("div")
        block.setAttribute("class", "block")
        hole.setAttribute("class", "hole")
        block.style.top = blockLastTop + 100 + "px"
        hole.style.top = holeLastTop + 100 + "px"
        block.setAttribute("id", "block" + counter)

        var random = Math.floor(Math.random() * 360);
        hole.style.left = random + 'px'

        hole.setAttribute("id", "hole" + counter)
        game.appendChild(block)
        game.appendChild(hole)
        counter++
    }

    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"))  
    let characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"))  
    var drop = 0

    if (characterTop <= 0) {
        alert("Game over. Score: " + (counter - 9));
        clearInterval(blocks);
        location.reload();
    }

    for(var i = 0; i < currentBlocks.length; i++) {
        let current = currentBlocks[i]
        let iBlock = document.getElementById("block" + current)
        let iHole = document.getElementById("hole" + current)
        let iBlockTop = parseInt(window.getComputedStyle(iBlock).getPropertyValue("top"))  
        iBlock.style.top = iBlockTop - 0.5 + "px"
        let iHoleTop = parseFloat(window.getComputedStyle(iHole).getPropertyValue("top")) 
        let iHoleLeft = parseFloat(window.getComputedStyle(iHole).getPropertyValue("left"))       
        iHole.style.top = iHoleTop - 0.5 + "px"
        if(iBlockTop < -20) {
            currentBlocks.shift()
            iBlock.remove()
            iHole.remove()
        }
        if (iBlockTop - 20 < characterTop && iBlockTop > characterTop) {
            drop++;
            if (iHoleLeft <= characterLeft && iHoleLeft + 20 >= characterLeft) {
                drop = 0;
            }
        }
    }

    if (drop == 0) {
        if (characterTop < 480) {
            character.style.top = characterTop + 2 + "px";
        }
    } else {
        character.style.top = characterTop - 0.5 + "px";
    }
    
}, 1);