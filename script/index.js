var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;

var canvasElement = $("<canvas style='border: 10px solid #fff' width='" + CANVAS_WIDTH +
    "' height='" + CANVAS_HEIGHT + "'></canvas>");
var canvas = canvasElement.get(0).getContext("2d");
canvasElement.appendTo('body');

var FPS = 30;
setInterval(function () {
    update();
    draw();
}, 1000 / FPS);

var hotkeys = { 37: "left", 38: "up", 39: "right", 40: "down" }
var keydown = {};

var player = {
    color: "#FFF",
    x: 220,
    y: 570,
    width: 150,
    height: 15,
    step: 5,
    draw: function () {
        canvas.fillStyle = this.color;
        canvas.fillRect(this.x, this.y, this.width, this.height);
    },
    update: function(direction) {
        new_pos = this.x + direction * (this.step + 2);
        if (new_pos > 5 && new_pos < CANVAS_WIDTH - 155) 
            this.x += direction * (this.step + 2);
    }
};

var ball = {
    color: "#FFF",
    x: 120,
    y: 70,
    radius: 8,
    step: 2,
    speed: 2,
    direction: {x: 1, y: 1},
    draw: function () {
        canvas.fillStyle = this.color;
        canvas.beginPath();
        canvas.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        canvas.fill();
        // canvas.endPath();
    },
    collided: function() {
        this.direction.y = -this.direction.y;
    },
    update: function() {
        this.x += this.speed * this.step * this.direction.x;
        this.y += this.speed * this.step * this.direction.y;
        if (this.x <= 8 || this.x >= CANVAS_WIDTH - 8) 
            this.direction.x = -this.direction.x;
        if (this.y <= 8 || this.y >= CANVAS_HEIGHT - 8) 
            this.direction.y = -this.direction.y;
    }
}
$(document).bind("keydown", function (evt) {
    keydown[hotkeys[evt.keyCode]] = true;
});
$(document).bind("keyup", function (evt) {
    keydown[hotkeys[evt.keyCode]] = false;
});

function update() {
    if (keydown.left) {
        player.update(-1)
    }
    if (keydown.right) {
        player.update(1)
    }
    ball.update();
    if (checkCollisions()) {
        ball.collided()
    }
}

function checkCollisions() {
    if (ball.x > player.x && ball.x < player.x + player.width && (ball.y + ball.radius) >= player.y)
        return true;
    return false;
}

function draw() {
    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    player.draw();
    ball.draw();
}