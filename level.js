import {
    game
} from "./game.js"
var walls = new Array;
class components {
    constructor(width, height, color, x, y, id) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.id = id;
        this.update = function () {
            game.context.fillStyle = color;
            game.context.fillRect(this.x, this.y, this.width, this.height);
        };
    }
}
var wall = new components(600, 20, "black", 0, 580, 0)
var wall5 = new components(500, 20, "black", 200, 540, 4)
var wall2 = new components(20, 50, "black", 0, 550, 1)
var wall3 = new components(20, 100, "black,", 400, 420, 2)
var wall4 = new components(30, 60, "black", 100, 540, 3)
walls.push(wall, wall2, wall3, wall4, wall5)

export {
    walls
}