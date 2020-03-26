class components {
    constructor(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.update = function () {
            game.context.fillStyle = color;
            game.context.fillRect(this.x, this.y, this.width, this.height);
        };
    }
}
var walls = [];

function startGame() {
    game.start();
    wall = new components(600, 20, "black", 0, 580)
    wall2 = new components(20, 50, "black", 0, 550)
    wall3 = new components(20, 100, "black,", 400, 300)
    walls.push(wall2, wall, wall3)
}



var game = {
    canvas: document.createElement("canvas"),
    fps: 60,
    start: function () {
        this.canvas.width = 900;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(this.update, 1000 / this.fps);
    },
    update: function () {
        game.clear();
        player.draw();
        player.movement();
        player.colisions();
        for (var i = 0; i < walls.length; i++) {
            walls[i].update();
        }
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


var player = {
    x: 200,
    y: 200,
    width: 20,
    height: 20,
    color: "white",
    velocity_x: 0,
    onAir: true,
    velocity_y: 0,
    jump_count: 0,
    collision_right: false,
    collision_left: false,
    crouching: false,
    movement: function () {
        this.velocity_x = 0;
        window.addEventListener('keydown', function (e) {
            player.keys = (player.keys || []);
            player.keys[e.key] = true;
            e.preventDefault();
        })
        window.addEventListener('keyup', function (e) {
            player.keys[e.key] = false;
        })
        if (player.keys && player.keys["ArrowLeft"]) {
            if (this.collision_right == false)
                player.velocity_x = -1.5
        }

        if (player.keys && player.keys["ArrowUp"]) {
            if (this.onAir == false) {
                player.onAir = true
                player.velocity_y = -5;
            }
        }
        if (player.keys && player.keys["ArrowRight"]) {
            if (this.collision_right == false)
                player.velocity_x = 1.5
        }
        if (player.keys && player.keys["ArrowDown"]) {
            if (player.crouching == false) {
                player.crouching = true
                player.height = 10
                player.y += 10
            }
        } else if (player.crouching == true) {
            player.crouching = false
            player.height = 20
            player.y -= 10

        }



        //right collision


        for (var i = 0; i < walls.length; i++) {
            if (player.x + player.width + player.velocity_x >= walls[i].x && player.x + player.velocity_x < walls[i].x + walls[i].width && player.y + player.height >= walls[i].y && player.y <= walls[i].y + walls[i].height) {
                {
                    player.collision_right = true
                    player.velocity_x = 0
                    if (player.keys && player.keys["ArrowRight"])
                        player.x = walls[i].x - player.width - 1
                }
            } else {
                player.collision_right = false
            }
        }

        //left collision

        for (var i = 0; i < walls.length; i++) {
            if (player.x + player.width + player.velocity_x >= walls[i].x && player.x + player.velocity_x < walls[i].x + walls[i].width && player.y + player.height >= walls[i].y && player.y <= walls[i].y + walls[i].height) {
                {

                    player.collision_left = true
                    player.velocity_x = 0
                    if (player.keys && player.keys["ArrowLeft"])
                        player.x = walls[i].x + walls[i].width + 1
                }
            } else {
                player.collision_left = false;
            }
        }


        //down collision
        player.onAir = true
        for (var i = 0; i < walls.length; i++) {
            if (player.y + player.height + player.velocity_y >= walls[i].y && player.y + player.velocity_y <= walls[i].y + walls[i].height && player.x + player.width + player.velocity_x - 1 >= walls[i].x && player.x + 1 + player.velocity_x <= walls[i].x + walls[i].width) {

                player.velocity_y = 0;
                player.y = walls[i].y - player.height - 1

                player.onAir = false
            }
        }


        if (player.onAir)
            player.velocity_y += 0.2
        player.y += this.velocity_y
        player.x += this.velocity_x

    },
    draw: function () {
        game.context.fillStyle = this.color;
        game.context.fillRect(this.x, this.y, this.width, this.height);
    },
    colisions: function () {

    }
}

startGame();
//console.log(wall2)