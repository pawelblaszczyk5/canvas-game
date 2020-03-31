import {
    game
} from "./game.js"

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
var maps = [];

var levels = () => {

    var wall = new components(600, 20, "black", 0, 580, 0)
    var wall5 = new components(500, 20, "black", 200, 540, 4)
    var wall2 = new components(20, 50, "black", 0, 550, 1)
    var wall3 = new components(20, 100, "black,", 400, 420, 2)
    var wall4 = new components(30, 60, "black", 100, 540, 3)
    var level = [wall, wall2, wall3, wall4, wall5]
    maps.push(level)
    var wall = new components(300, 20, "black", 50, 570, 0)
    var wall2 = new components(300, 20, "black", 60, 560, 1)
    var level = [wall, wall2]
    maps.push(level)
}

levels()


export {
    maps
}