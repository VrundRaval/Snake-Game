// Game constants and variables
let inputDir = { x: 0, y: 0 }
const foodSound = new Audio('food.mp3')
const gameOverSound = new Audio('gameover.mp3')
const moveSound = new Audio('move.mp3')
let score = 0
let lastPaintTime = 0
let speed = 10
let snakeArr = [
    { x: 13, y: 15 }
]
let food = { x: 6, y: 7 }
let flag = 0
let lastKeyDown = null
let bRows = 25
let bColumns = 25


// Game functions
function main(ctime) {
    window.requestAnimationFrame(main)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return
    }
    lastPaintTime = ctime

    gameEngine()

}

function isCollide(snake) {

    // If snake bumps into itself
    for (let i = 3; i < snakeArr.length; i++) {

        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true
        }
    }

    // if snakes bump into the wall
    if (snake[0].x >= bColumns || snake[0].x <= 0 || snake[0].y >= bRows || snake[0].y <= 0) {
        return true
    }

    return false
}

function gameEngine() {

    // Part 1: Updating the snake array and food
    if (isCollide(snakeArr)) {
        gameOverSound.play()
        inputDir = { x: 0, y: 0 }
        alert("Game Over. Click OK to play again.")
        snakeArr = [{ x: 13, y: 15 }]
        food = { x: 6, y: 7 }
        score = 0
        scoreBox.innerHTML = "Score: 0"
        speed = 10
        flag = 0

    }

    // if snake have eaten the food, increment the score and regenerate the food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        foodSound.play()
        // speed += 1
        score += 1
        if (score < 10) {
            speed += 1
        }
        else if (score < 20) {
            speed += 0.8
        }
        else if (score < 30) {
            speed += 0.5
        }
        else if (score < 40) {
            speed += 0.2
        }
        else if (score < 50) {
            speed += 0.1
        }
        else if (score < 60) {
            speed += 0.05
        }
        else {
            speed += 0.01
        }



        if (score > highestScoreVar) {
            highestScoreVar = score
            localStorage.setItem("highestScore", JSON.stringify(highestScoreVar))
            highestScoreBox.innerHTML = "Highest Score: " + highestScoreVar
        }
        scoreBox.innerHTML = "Score: " + score
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        let a = 2
        let b = bColumns - 2
        let c = 2
        let d = bRows - 2

        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(c + (d - c) * Math.random()) }
    }

    // Moving the snake
    for (i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] }
    }

    snakeArr[0].x += inputDir.x
    snakeArr[0].y += inputDir.y




    // Part 2: Display the snake and food
    // Display the Snake
    board.innerHTML = ""
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x
        if (index === 0) {
            snakeElement.classList.add('head')
        }
        else {
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement)
    })

    // Display the Food
    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    board.appendChild(foodElement)

}


// Main logic starts here

let highestScore = localStorage.getItem('highestScore')

if (highestScore === null) {
    let highestScoreVar = 0
    localStorage.setItem("highestScore", JSON.stringify(highestScoreVar))
}
else {
    highestScoreVar = JSON.parse(highestScore)
    highestScoreBox.innerHTML = "Highest Score: " + highestScoreVar
}

// Mobile Buttons

function btnUp() {
    btnPressed = "ArrowUp"
}

function btnDown() {
    btnPressed = "ArrowDown"

}

function btnLeft() {
    btnPressed = "ArrowLeft"

}

function btnRight() {
    btnPressed = "ArrowRight"
}

function btnBoxDown() {

    if (flag === 0 && (btnPressed
        === "ArrowUp" || btnPressed === "ArrowDown" || btnPressed === "ArrowLeft" || btnPressed === "ArrowRight")) {
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })

    }

    switch (btnPressed) {

        case "ArrowUp":
            moveSound.play()

            if ((lastKeyDown === "ArrowDown" || lastKeyDown === "s") && flag === 1) {
                flag = 1
                break
            }
            else {
                inputDir.x = 0
                inputDir.y = -1
                lastKeyDown = btnPressed
                flag = 1

                break;
            }

        case "ArrowDown":
            moveSound.play()
            if ((lastKeyDown === "ArrowUp" || lastKeyDown === "w") && flag === 1) {
                flag = 1
                break
            }
            else {
                inputDir.x = 0
                inputDir.y = 1
                lastKeyDown = btnPressed
                flag = 1

                break;
            }


        case "ArrowLeft":
            moveSound.play()
            if ((lastKeyDown === "ArrowRight" || lastKeyDown === "d") && flag === 1) {
                flag = 1
                break
            }
            else {
                inputDir.x = -1
                inputDir.y = 0
                lastKeyDown = btnPressed
                flag = 1

                break;
            }


        case "ArrowRight":
            moveSound.play()
            if ((lastKeyDown === "ArrowLeft" || lastKeyDown === "a") && flag === 1) {
                flag = 1
                break
            }
            else {
                inputDir.x = 1
                inputDir.y = 0
                lastKeyDown = btnPressed
                flag = 1

                break;
            }

        default:
            break;
    }

}







window.requestAnimationFrame(main)
window.addEventListener('keydown', e => {

    if (flag === 0 && (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "w" || e.key === "s" || e.key === "a" || e.key === "d")) {
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })

    }

    switch (e.key) {

        case "ArrowUp":
            moveSound.play()

            if ((lastKeyDown === "ArrowDown" || lastKeyDown === "s") && flag === 1) {
                flag = 1
                break
            }
            else {
                inputDir.x = 0
                inputDir.y = -1
                lastKeyDown = e.key
                flag = 1

                break;
            }



        case "ArrowDown":
            moveSound.play()
            if ((lastKeyDown === "ArrowUp" || lastKeyDown === "w") && flag === 1) {
                flag = 1
                break
            }
            else {
                inputDir.x = 0
                inputDir.y = 1
                lastKeyDown = e.key
                flag = 1

                break;
            }


        case "ArrowLeft":
            moveSound.play()
            if ((lastKeyDown === "ArrowRight" || lastKeyDown === "d") && flag === 1) {
                flag = 1
                break
            }
            else {
                inputDir.x = -1
                inputDir.y = 0
                lastKeyDown = e.key
                flag = 1

                break;
            }


        case "ArrowRight":
            moveSound.play()
            if ((lastKeyDown === "ArrowLeft" || lastKeyDown === "a") && flag === 1) {
                flag = 1
                break
            }
            else {
                inputDir.x = 1
                inputDir.y = 0
                lastKeyDown = e.key
                flag = 1

                break;
            }


        case "w":
            moveSound.play()

            if ((lastKeyDown === "ArrowDown" || lastKeyDown === "s") && flag === 1) {
                flag = 1
                break
            }
            else {
                inputDir.x = 0
                inputDir.y = -1
                lastKeyDown = e.key
                flag = 1

                break;
            }



        case "s":
            moveSound.play()
            if ((lastKeyDown === "ArrowUp" || lastKeyDown === "w") && flag === 1) {
                flag = 1
                break
            }
            else {
                inputDir.x = 0
                inputDir.y = 1
                lastKeyDown = e.key
                flag = 1

                break;
            }


        case "a":
            moveSound.play()
            if ((lastKeyDown === "ArrowRight" || lastKeyDown === "d") && flag === 1) {
                flag = 1
                break
            }
            else {
                inputDir.x = -1
                inputDir.y = 0
                lastKeyDown = e.key
                flag = 1

                break;
            }


        case "d":
            moveSound.play()
            if ((lastKeyDown === "ArrowLeft" || lastKeyDown === "a") && flag === 1) {
                flag = 1
                break
            }
            else {
                inputDir.x = 1
                inputDir.y = 0
                lastKeyDown = e.key
                flag = 1

                break;
            }

        default:
            break;
    }



})
