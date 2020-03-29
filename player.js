import {
    game
} from "./game.js"
import {
    walls
} from "./level.js"
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
    crouching: false,
    floor: -1,
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

            player.velocity_x = -1.5
        }

        if (player.keys && player.keys["ArrowUp"]) {
            if (this.onAir == false) {
                player.onAir = true
                player.velocity_y = -5;
            }
        }
        if (player.keys && player.keys["ArrowRight"]) {

            player.velocity_x = 1.5
        }
        if (player.keys && player.keys["ArrowDown"]) {
            if (player.crouching == false) {
                player.crouching = true
                player.height = 10
                player.y += 10
            }
        } else if (player.crouching == true) {
            let vertical_collision = false
            for (var wall of walls) {
                if (player.y - 10 + player.height + 10 + player.velocity_y >= wall.y && player.y - 10 + player.velocity_y <= wall.y + wall.height && player.x + player.width + player.velocity_x - 1 >= wall.x && player.x + 1 + player.velocity_x <= wall.x + wall.width) {
                    vertical_collision = true
                    break;
                }
            }
            if (vertical_collision == false) {
                player.crouching = false;
                player.height = 20
                player.y -= 10
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
        //horizontal collision
        for (var wall of walls) {
            if (player.x + player.width + player.velocity_x >= wall.x && player.x + player.velocity_x < wall.x + wall.width && player.y + player.height - 1 >= wall.y && player.y + 1 <= wall.y + wall.height) {
                {
                    player.velocity_x = 0
                    if (player.x > wall.x)
                        player.x = wall.x + wall.width + 1
                    else
                        player.x = wall.x - player.width - 1
                    break;
                }
            }
        }
        //is in air?
        if (player.floor != -1) {
            if (player.y + player.height + player.velocity_y + 1 != walls[player.floor].y || !(player.x + player.width + player.velocity_x - 1 >= walls[player.floor].x && player.x + 1 + player.velocity_x <= walls[player.floor].x + walls[player.floor].width)) {
                player.onAir = true
                player.floor = -1
            }
        }

        //vertical collision
        if (player.floor == -1) {
            for (var wall of walls) {
                if (player.y + player.height + player.velocity_y >= wall.y && player.y + player.velocity_y <= wall.y + wall.height && player.x + player.width + player.velocity_x - 1 >= wall.x && player.x + 1 + player.velocity_x <= wall.x + wall.width) {
                    if (player.y < wall.y) {

                        player.floor = wall.id

                        player.velocity_y = 0;
                        player.y = wall.y - player.height - 1

                        player.onAir = false
                        break;
                    } else {
                        player.velocity_y = 0
                        player.y = wall.y + wall.height + 1
                        break;
                    }
                }
            }
        }
    }
}
export {
    player
}