// keybinds i will forget:
// commenting code: shift + alt + a
// https://bagong-games.itch.io/hana-caraka-base-character

let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

let money = 500
let health = 100

let target = "none"
let toweratk = 0

ctx.font = "18px Tomorrow";

const waypoints = [
    { "x": 0, "y": canvas.height / 2 },
    { "x": 100, "y": canvas.height / 2 },
    { "x": 100, "y": 200 },
    { "x": 250, "y": 200 },
    { "x": 250, "y": 450 },
    { "x": 500, "y": 450 },
    { "x": 500, "y": 200 },
    { "x": 700, "y": 200 },
    { "x": 700, "y": 500 },
    { "x": 890, "y": 500 },
]

let enemys = []

class test {
    constructor(x, y) {
        this.X = x;
        this.Y = y;
        this.health = 3;
        this.distance = 0;
        this.range = 0;
        this.waypoint = 0;
    }
}

function wave() {
    enemys.push(new test(waypoints[0].x, waypoints[0].y));
}

function tower() {
    target.health -= 3
    console.log("hit")
}

function update() {

    for (let i = 0; i < enemys.length; i++) {
        let enemy = enemys[i]

        let xvalue = Math.abs(enemy.X - 300 + (25 / 2));
        let yvalue = Math.abs(enemy.Y - 300 + (25 / 2));

        enemy.range = Math.round(Math.sqrt(Math.pow(xvalue, 2) + Math.pow(yvalue, 2)));


        if (target == "none" && enemy.range <= 150 || enemy.distance > target.distance && enemy.range <= 150) {
            target = enemy
        }

        if (enemy.waypoint == waypoints.length) {
            enemys.splice(i, 1);
            health -= enemy.health
        }
        else if (waypoints[enemy.waypoint].x > enemy.X) {
            enemy.X++;
            enemy.distance++;
        }
        else if (waypoints[enemy.waypoint].y > enemy.Y) {
            enemy.Y++;
            enemy.distance++;
        }
        else if (waypoints[enemy.waypoint].x < enemy.X) {
            enemy.X--;
            enemy.distance++;
        }
        else if (waypoints[enemy.waypoint].y < enemy.Y) {
            enemy.Y--;
            enemy.distance++;
        }
        else if (waypoints[enemy.waypoint].y == enemy.Y && waypoints[enemy.waypoint].x == enemy.X) {
            enemy.waypoint++;
        }
    }

    if (toweratk >= 90 && target != "none") {
        toweratk = 0
        tower()
    }
    else {
        toweratk++;
        target == "none"
    }

}

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < waypoints.length; i++) {
        point = waypoints[i]
        ctx.fillStyle = "green";
        ctx.fillRect(point.x, point.y, 10, 10);
    }

    ctx.fillStyle = "red";

    for (let i = 0; i < enemys.length; i++) {
        let enemy = enemys[i]
        if (enemy.health <= 0) {
            enemys.splice(i, 1);
            money++;
        }
        else {
            ctx.fillRect(enemy.X - 20 / 4, enemy.Y - 20 / 4, 20, 20);
        }
    }

    ctx.fillStyle = "blue";

    ctx.globalAlpha = 0.2;
    ctx.beginPath();
    ctx.arc(300 + 25 / 2, 300 + 25 / 2, 150, 0, 2 * Math.PI);
    ctx.fill();

    ctx.globalAlpha = 1;
    ctx.fillRect(300, 300, 25, 25);

    ctx.fillStyle = "Black";
    ctx.fillText("Tower Defence Game", 10, 20);
    ctx.fillText("🪙" + money, 10, 40);
    ctx.fillText("❤️" + health, 10, 60);

    ctx.fillText("spawn enemy", (canvas.width / 2 - 150), canvas.height -10);
    ctx.fillText("spawn tower", (canvas.width / 2), canvas.height -10);
}

function gameloop() {
    update();
    draw();
    window.requestAnimationFrame(gameloop);
}

gameloop()