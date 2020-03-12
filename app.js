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
    wall = new components(900, 20, "black", 0, 580)
    wall2 = new components(20, 400, "black", 0, 300)
    wall3 = new components(20, 30, "black,", 400, 550)
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
    velocity_y: 0,
    onAir: true,
    jump_count: 0,
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

            for (var i = 0; i < walls.length; i++) {

                if (player.x + player.width - 1.5 >= walls[i].x && player.x + player.width + 1.5 <= walls[i].x + walls[i].width) {
                    if (player.y <= walls[i].y + walls[i].height && player.y >= walls[i].y)
                        player.velocity_x = 0
                } else {
                    player.velocity_x = -1.5
                }
            }
        }
        if (player.keys && player.keys["ArrowRight"]) {

            for (var i = 0; i < walls.length; i++) {
                console.log(player.x, walls[i].x)
                if (player.x + player.width + 1.5 >= walls[i].x && player.x + player.width + 1.5 <= walls[i].x + walls[i].width) {
                    if (player.y <= walls[i].y + walls[i].height && player.y >= walls[i].y)
                        player.velocity_x = 0
                } else {
                    player.velocity_x = +1.5
                }
            }
        }
        if (player.keys && player.keys["ArrowUp"]) {
            if (this.onAir == false) {
                player.velocity_y = -5;
                player.onAir = true
            }
        }
        player.y += this.velocity_y
        player.x += this.velocity_x

        for (var i = 0; i < walls.length; i++) {
            if (player.y + player.height + player.velocity_y >= walls[i].y && player.y + player.height + player.velocity_y <= walls[i].y + walls[i].height) {
                if (player.x <= walls[i].x + walls[i].width && player.x >= walls[i].x) {
                    player.y = walls[i].y - player.height
                    player.velocity_y = 0
                    player.onAir = false
                }
            } else {
                player.onAir = true
            }

        }
        if (player.onAir)
            player.velocity_y += 0.2

    },
    draw: function () {
        game.context.fillStyle = this.color;
        game.context.fillRect(this.x, this.y, this.width, this.height);
    },
    colisions: function () {

    }
}

startGame();
console.log(wall2)