let balls = [];
let numBalls;
let maxDistance;
let forceStrength;
let canvas;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.mousePressed(splitBall);
    resetSimulation();
}

function draw() {
    background(220);
    updateBalls();
    drawLines();
    drawBalls();
}

function startSimulation() {
    numBalls = int(select('#numBalls').value());
    maxDistance = int(select('#distance').value());
    forceStrength = int(select('#force').value());
    resetSimulation();
}

function resetSimulation() {
    balls = [];
    for (let i = 0; i < numBalls; i++) {
        balls.push(new Ball(random(width), random(height)));
    }
}

function drawLines() {
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            let d = dist(balls[i].x, balls[i].y, balls[j].x, balls[j].y);
            if (d < maxDistance) {
                stroke(0, map(d, 0, maxDistance, 255, 0));
                line(balls[i].x, balls[i].y, balls[j].x, balls[j].y);
            }
        }
    }
}

function drawBalls() {
    for (let ball of balls) {
        ball.display();
    }
}

function updateBalls() {
    for (let ball of balls) {
        ball.update();
        ball.checkEdges();
        ball.checkMouse();
    }
}

class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = random(-2, 2);
        this.vy = random(-2, 2);
        this.r = 10;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
    }

    checkEdges() {
        if (this.x < this.r || this.x > width - this.r) {
            this.vx *= -1;
        }
        if (this.y < this.r || this.y > height - this.r) {
            this.vy *= -1;
        }
    }

    checkMouse() {
        let d = dist(this.x, this.y, mouseX, mouseY);
        if (d < 100) {
            let angle = atan2(this.y - mouseY, this.x - mouseX);
            this.vx += cos(angle) * forceStrength / d;
            this.vy += sin(angle) * forceStrength / d;
        }
    }

    display() {
        fill(0);
        noStroke();
        ellipse(this.x, this.y, this.r * 2);
    }
}

function splitBall() {
    for (let i = balls.length - 1; i >= 0; i--) {
        let d = dist(mouseX, mouseY, balls[i].x, balls[i].y);
        if (d < balls[i].r) {
            balls.splice(i, 1);
            balls.push(new Ball(random(width), random(height)));
            balls.push(new Ball(random(width), random(height)));
            return;
        }
    }
}
