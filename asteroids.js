let canvas;
let context;

let fpsInterval = 1000 / 30;
let now;
let then = Date.now();
let request_id;

let asteroids = [];
let player = {
    x : 0,
    y : 105,
    size : 10,
    xChange : 10,
    yChange :  10
}
let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;

document.addEventListener("DOMContentLoaded", init, false);

function init() {
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");

    window.addEventListener("keydown", activate, false);
    window.addEventListener("keyup", deactivate, false);

   draw();
}

function draw() {
    request_id = window.requestAnimationFrame(draw);
    let now = Date.now();
    let elapsed = now - then;
    if (elapsed <= fpsInterval) {
        return;
    }
    then = now - (elapsed % fpsInterval);

    if (asteroids.length < 10) {
        let a = {
            x : canvas.width,
            y : randint(5, 15),
            size : randint(5, 15),
            xChange : randint(-10, -1),
            yChange : 0
        };
        asteroids.push(a);
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "cyan"
    context.fillRect(player.x, player.y, player.size, player.size);
    context.fillStyle = "yellow";
    for (let a of asteroids) {
        context.fillRect(a.x, a.y, a.size, a.size);
    }

    if (player.x + player.size >= canvas.width) {
        stop();
        return;
    }
    for (let a of asteroids) {
        if (player_collides(a)) {
            stop();
            return;
        }
    }
    for (let a of asteroids) {
        if (a.x + a.size < 0) {
            a.x = canvas.width;
            a.y = randint(0, canvas.height);
        } else {
            a.x = a.x + a.xChange;
            a.y = a.y + a.yChange;
        }
    }
    if (moveRight) {
        player.x = player.x + player.xChange;
    }
    if (moveUp) {
        player.y = player.y - player.yChange;
    }
    if (moveDown) {
        player.y = player.y + player.yChange;
    }
}

function randint(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function activate(event) {
    let key = event.key;
    if (key === "ArrowLet") {
        moveLeft = true;
    } else if (key === "ArrowRight") {
        moveRight = true;
    } else if (key === "ArrowUp") {
        moveUp = true;
    } else if (key === "ArrowDown") {
        moveDown = true;
    }
}

function deactivate(event) {
    let key = event.key;
    if (key === "ArrowLet") {
        moveLeft = false;
    } else if (key === "ArrowRight") {
        moveRight = false;
    } else if (key === "ArrowUp") {
        moveUp = false;
    } else if (key === "ArrowDown") {
        moveDown = false;
    }
}

function player_collides(a) {
    if (player.x + player.size < a.x ||
        a.x + a.size < player.x ||
        player.y > a.y + a.size ||
        a.y > player.y + player.size) {
            return false;
        } else {
            return true;
        }
}

function stop() {
    window.removeEventListener("keydown", activate, false);
    window.removeEventListener("keyup", deactivate, false);
    window.cancelAnimationFrame(request_id);
}


