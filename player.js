import {
    game
} from "./game.js"
import {
    maps
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
    crouching: false,
    floor: -1,
    jumps: 0,
    dash: 1,
    wall: -1,
    dashing: false,
    can_jump: true,
    wall_walking: false,
    skills: {
        walls_walking: true,
        dash: true,
        double_jump: true
    },
    movement: function () {
        let walls = maps[game.level]
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
            if (player.dashing) {
                if (player.velocity_y > 0)
                    player.velocity_y = 0
                player.velocity_x = -5
            } else
                player.velocity_x = -1.5
        }

        if (player.keys && player.keys["ArrowUp"] && player.can_jump) {
            if (player.jumps > 0) {
                player.can_jump = false
                player.jumps--
                setTimeout(function () {
                    if (player.onAir) {
                        if (player.jumps > 0)
                            player.can_jump = true
                    }
                }, 400);

                player.onAir = true
                player.velocity_y = -5;
            }
        }
        if (player.keys && player.keys["ArrowRight"]) {
            if (player.dashing) {
                if (player.velocity_y > 0)
                    player.velocity_y = 0
                player.velocity_x = 5
            } else
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
                if (player.y - 10 + player.height + 10 + player.velocity_y >= wall.y && player.y - 10 + player.velocity_y <= wall.y + wall.height && player.x + player.width >= wall.x && player.x <= wall.x + wall.width) {
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
        if (player.keys && player.keys["z"]) {
            if (player.skills.dash && player.wall_walking == false)
                if (player.dash == 1) {
                    player.dashing = true;
                    player.dash = 0
                    setTimeout(function () {
                        player.dashing = false
                    }, 250);
                    setTimeout(function () {
                        player.dash = 1
                    }, 3000)
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
        let walls = maps[game.level]
        //vertical collision
        if (player.floor == -1) {
            for (var wall of walls) {
                if (player.y + player.height + player.velocity_y >= wall.y && player.y + player.velocity_y <= wall.y + wall.height && player.x + player.width - 1 >= wall.x && player.x + 1 <= wall.x + wall.width) {

                    if (player.y < wall.y) {
                        player.wall_walking = false
                        player.floor = wall.id
                        player.can_jump = true
                        if (player.skills.double_jump) {
                            player.jumps = 2
                        } else {
                            player.jumps = 1
                        }
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
        //horizontal collision
        player.wall_walking = false;
        for (var wall of walls) {
            if (player.x + player.width + player.velocity_x >= wall.x && player.x + player.velocity_x < wall.x + wall.width && player.y + player.height - 1 >= wall.y && player.y + 1 <= wall.y + wall.height) {
                {
                    player.velocity_x = 0
                    if ((player.velocity_y > 0 && player.skills.walls_walking) || (player.wall_walking && player.velocity_y > 0 && player.velocity_y != 0.7)) {
                        player.wall_walking = true;
                        if (player.wall != wall.id) {

                            player.wall = wall.id
                            if (player.jumps < 1) {
                                player.can_jump = true
                                player.jumps = 1
                            }
                        }
                        player.velocity_y = 0.7
                        player.velocity_x = 0
                    }

                    if (player.x > wall.x) {
                        player.x = wall.x + wall.width + 1;
                    } else {
                        player.x = wall.x - player.width - 1
                    }

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
        player.y += this.velocity_y
        player.x += this.velocity_x

    }
}
export {
    player
}