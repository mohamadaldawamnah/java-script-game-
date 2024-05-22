let canvas;
let context;

let background = [

          [60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60],
/*1*/     [259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259],
/*2*/     [259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259],
/*3*/     [259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259],
/*4*/     [259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259],
/*5*/     [259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259],
/*6*/     [259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259],
/*7*/     [259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259],
/*8*/     [259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259],
/*9*/     [259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259],
/*10*/    [259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259],
/*11*/    [259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259],
/*12*/    [259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259],
/*13*/    [259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259],
/*14*/    [259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259],
/*15*/    [259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259],
/*16*/    [259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259],
/*17*/    [259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,16,17,259,259,259,259],
/*18*/    [259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,41,42,259,259,259,259],
/*19*/    [259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,259,33,35,259,259,259,259],
]


//mushroom = 95
let tilesPerRow = 25;
let tileSize = 16*2;

let fpsInterval = 1000 / 30;
let now;
let then = Date.now();
let request_id;

let asteroids = [];
let player = {
    x : 150,
    y : 150,
    width : 24*2,
    height :24*2,
    xChange : 3,
    yChange : 3,
    framex:0,
    framey:0,
    facing: 0,
    jump : false,
    health: 100,
    timer: 0,
    
};
let projectiles = [];
let shoot = false;
let space = false ;
let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;



let number_of_goblins_killed =0;
// let number_of_goblins = 1;
let level = 0;
let dragonImage = new Image();
let goblinimage = new Image();
let charImage = new Image();
let backgroundImage = new Image();
let mushroomImage = new Image();
let goblins =[]
let mushrooms = [];
let floorT;
let floorR;
let floorL;
let floorD;

document.addEventListener("DOMContentLoaded", init, false);


function init() {
    load_assets([
        {"var":charImage,"url":"static/char_scaled_2x_pngcrushed.png"},
        {"var":goblinimage,"url":"static/goblin__scaled_2x_pngcrushed.png"},
        {"var":backgroundImage , "url":"static/background_scaled_2x_pngcrushed.png"},
        { 'var': mushroomImage, 'url': 'static/mushroom_scaled_3x_pngcrushed.png'},
    ],draw);
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");
    player.x = canvas.width/2;
    player.y = canvas.width/2;
  

    

    window.addEventListener("keydown", activate, false);
    window.addEventListener("keyup", deactivate, false);
    //Draw_Gob(number_of_goblins);  //create obj
   draw();
}
function load_assets(assets,callback_function){
    let number_of_assets = assets.length;
    let loaded = function(){
        console.log("loaded💀")
        number_of_assets -=1;
        if (number_of_assets===0){
            callback_function();
        }
    
    }  
    for (let asset of assets){
        let element = asset.var;
        if (element instanceof HTMLImageElement){
            console.log("image loaded:"+element)
            element.addEventListener("load",loaded,false)
        }
        else if (element instanceof HTMLAudioElement){
            console.log("Audio loaded: "+element);
            element.addEventListener("canplaythrough",loaded,false)
        }
        element.src = asset.url
    }
}


async function load_images(urls) {
    let promises = [];
    for (let url of urls) {
        promises.push(new Promise((resolve) => {
            let img = new Image();
            img.onload = resolve;
            img.src = url;
        }));
    }
    await Promise.all(promises); 
}


function draw() {
    request_id = window.requestAnimationFrame(draw);
    let now = Date.now();
    let elapsed = now - then;
    
    if (elapsed <= fpsInterval) {
        return;
    }
    then = now - (elapsed % fpsInterval);
    //Draw_Gob(number_of_goblins);  //create obj 
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "cyan"
    context.fillRect(player.x, player.y, player.size, player.size);
    for (let r = 0; r < 20; r +=1){
        for (let c = 0; c <32; c += 1){
            let tile = background[r][c];
            if (tile >= 0){
                let tileRow = Math.floor(tile / tilesPerRow); //38/9 = 4
                let tileCol = Math.floor(tile % tilesPerRow); //38%8 = 6
                context.drawImage(backgroundImage, 
                    tileCol * tileSize ,tileRow* tileSize,tileSize,tileSize,//extract from the sprite 
                    c * tileSize, r * tileSize , tileSize, tileSize);//where you want to draw it of the top left, and how wide and how hight it will be
            }
        }
    }
    //  draw zombie
    for(let gob of goblins){
    if ( gob.framex === 0 && gob.framey === 4){
            gob.framey = 0;
        }
    for(let projectile of projectiles){
        if (collision(projectile,gob)){
            gob.health -=10
            projectile.counter -= 1;
            if (player.timer < 0 || projectile.counter === 0){
                projectiles.splice(projectiles.indexOf(projectile, 1));

            }
            gob.framey = 4;
            gob.framex = 1;
        }
    }
    context.drawImage(goblinimage, 
        (Math.floor(gob.framex)+gob.facing) * gob.width,gob.framey * gob.height,gob.width, gob.height,
        gob.x, gob.y, gob.width, gob.height);
        gob.framex = (gob.framex+0.25)%4
    

    //
    
    if (gob.health <= 0 ){
        gob.framey = 5;
        number_of_goblins_killed += 1
    
        if ( gob.framex === 0){
            goblins.splice(goblins.indexOf(gob), 1);
            let mushroom = {
                x: gob.x,
                y: gob.y,
                size: 16*3,
                cool_down: 50,
            }
            mushrooms.push(mushroom);
        }
    }
    //border of the canvas to the zombie
    if (gob.x <0) {
        gob.x =0; 
    }
    if (gob.x > 1000) {
        gob.x = 1000; 
    }
    if (gob.y < 0) {
        gob.y = 0; 
    }
    if (gob.y > 600) {
        gob.y = 600; 
    }
    //

    //this is the code for the function that makes the goblin follow the charechter 
    if (player.x<gob.x){
        gob.x = gob.x - gob.xChange;
        gob.facing = 4;
    }
    if (player.x>gob.x) {
        gob.x = gob.x + gob.xChange;
        gob.facing = 0;
    }
    if (player.y < gob.y) {
        gob.y = gob.y - gob.yChange;
    }
    if (player.y > gob.y){
        gob.y = gob.y + gob.yChange;
    }


    //this is the code that measures the health of the charechter if the goblin touches him
    if (distance(player, gob)< 10){
            player.health = player.health-2;
        }
    }

    for (let mushroom of mushrooms){
        context.drawImage(mushroomImage, 
            0, 0, mushroom.size, mushroom.size,
            mushroom.x, mushroom.y, mushroom.size, mushroom.size);

        if (distance(player, mushroom)< 15){
            player.health = Math.min(100, player.health + 30);
            if (player.timer < 0){
                player.xChange += 2;
                player.yChange += 2;
            }
            player.timer += mushroom.cool_down;
            mushrooms.splice(mushrooms.indexOf(mushroom), 1);
        }

    }
    //the charechter been drawed
    context.drawImage(charImage, 
        (Math.floor(player.framex)+player.facing) * player.width,player.framey * player.height,player.width, player.height,
        player.x, player.y, player.width, player.height);
    //
    
    context.drawImage(charImage, 
        (Math.floor(player.framex)+player.facing) * player.width,player.framey * player.height,player.width, player.height,
        player.x, player.y, player.width, player.height);

    //idle
    player.framex = (player.framex+0.25)%4

    if (moveLeft){
        player.x = player.x - player.xChange;
        player.facing = 4;
    }
    if (moveRight) {
        player.x = player.x + player.xChange;
        player.facing = 0;
    }
    if (moveUp) {
        player.y = player.y - player.yChange;
    }
    if (moveDown) {
        player.y = player.y + player.yChange;
    }
    
    //boarders of the canvas for the charechter
    if (player.x <0) {
        player.x =0; 
    }
    if (player.x > 1000) {
        player.x = 1000; 
    }
    if (player.y < 0) {
        player.y = 0; 
    }
    if (player.y > 600) {
        player.y = 600; 
    }
    //the health of the goblin
    for(let gob of goblins){
        context.fillStyle = 'white';
        context.fillText("gobling health " + Math.max(gob.health,0),100,10,1000,1000);
    }
    //the health of the hero
    context.fillStyle = 'white';
    context.fillText("hero health " + Math.max(player.health, 0), 10, 10, 1000, 1000);
    if (player.health === 0 ){
        player.framey =5;
        player.framex = 0;
    }

    if (player.health <= 0 && player.framex === 0){
        stop();
    }

    player.timer -= 1;
    if (player.timer === 0){
        player.xChange -=2;
        player.yChange -=2;
    }
    if (player.timer < 0){
        player.timer = -1;
    }

    if (shoot) {
        let projectile = {
            x: player.x+15,
            y: player.y+15,
            size: 10,
            xChange: 0,
            yChange: 0,
            counter:1,
        };
        projectiles.push(projectile);
        if (moveDown) {
            projectile.yChange = 10;
        }
        if (moveLeft) {
            projectile.xChange = -10;
        }
        if (moveRight) {
            projectile.xChange = 10;
        }
        if (moveUp) {
            projectile.yChange = -10;
        }
        if (projectile.xChange === 0 && projectile.yChange ===0){
            if (player.facing === 4){
                projectile.xChange = -10;
            }
            else{
                projectile.xChange = 10;
            }
        }
        
        
        shoot = false;
    }

    for (let projectile of projectiles){
        projectile.x += projectile.xChange;
        projectile.y += projectile.yChange;
        if (distance(projectile, player) > 1000){
            projectiles.splice(projectiles.indexOf(projectile), 1);
        }
        context.fillStyle = "black";
        context.fillRect(projectile.x , projectile.y , projectile.size , projectile.size)
    }

    if (goblins.length === 0){
        level += 1;
        Draw_Gob(level *2);
        console.log(level)
    }

}

function distance(entity1, entity2){
    return Math.sqrt((entity1.x-entity2.x)**2 + (entity1.y-entity2.y)**2);
}





//goblin got created
function Draw_Gob(number_of_goblins){
    console.log(number_of_goblins)
    while (goblins.length < number_of_goblins){
        let gob = {
            x :randint(30, 90),
            y : randint(30, 90),
            width : 24*2,
            height :24*2,
            xChange : 1,
            yChange : 1,
            framex:0,
            framey:0,
            health:50
        };
        goblins.push(gob);
    }
}

function collision (projectile,gob){
    if (distance(projectile,gob)<20){
        return true;
    }
    else{
        return false;
    }

}
    
//movment
function activate(event) {
    let key = event.key;
    if (key === "ArrowLeft") {
        moveLeft = true;
    } else if (key === "ArrowRight") {
        moveRight = true;
    } else if (key === "ArrowUp") {
        moveUp = true;
    } else if (key === "ArrowDown") {
        moveDown = true;
    }
    else if (key === ' '){
        shoot = true;
    }
}  

function deactivate(event) {
    let key = event.key;
    if (key === "ArrowLeft") {
        moveLeft = false;
    } else if (key === "ArrowRight") {
        moveRight = false;
    } else if (key === "ArrowUp") {
        moveUp = false;
    } else if (key === "ArrowDown") {
        moveDown = false;
    }
    // else if (key === ' '){
    //     shoot = true;
    // }
}

function randint(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}


function stop() {
    window.removeEventListener("keydown", activate, false);
    window.removeEventListener("keyup", deactivate, false);
    window.cancelAnimationFrame(request_id);
}