import {
    maps
} from "./level.js";
import {
    player
} from "./player.js";
var game = {
    canvas: document.createElement("canvas"),
    fps: 60,
    level: 0,
    start: function () {
        this.canvas.width = 900;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(this.update, 1000 / this.fps);
    },
    update: function () {
        let walls = maps[game.level]
        game.clear();
        player.draw();
        player.movement();
        player.colisions();
        for (var wall of walls) {
            wall.update();
        }
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
export {
    game
};