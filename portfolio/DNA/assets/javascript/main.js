var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var palette = [
    "#581845",
    "#900C3F",
    "#C70039",
    "#FF5733",
    "#FFC300"
]
var palette2 = [
    "#BEEEF7",
    "#83C4F7",
    "#62A2D1",
    "#4B87CC",
    "#497CB2"
]

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function titleText() {
    context.font = "150px apple";
    context.textAlign = "center";
    context.strokeStyle = "white"
    context.lineWidth = 2;
    context.strokeText("DNA", canvas.width / 2, canvas.height / 2);
}
function subtitleText() {
    context.font = "32px apple";
    context.fillStyle = "white"
    context.textAlign = "center";
    context.fillText("Click and hold to collect bubbles!", canvas.width / 2, canvas.height / 1.25);
}

class Point {
    x = 0;
    y = 0;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}
class SinWave
{
    x = 0;
    y = 0;
    width = 10;
    offsetY = 0;
    offsetX = 0;
    color = getRandomElement(palette2);
    amplitude = 0;
    frequency = canvas.width / 4;
    coords = [];
    
    constructor(x = 0, y = 0, a = 50, f = 200) {
        this.x = x;
        this.y = y;
        this.amplitude = a;
        this.frequency = f;
        this.color = "black";
    }

    draw() {
        const steps = canvas.width/50;
        this.coords = [];
        context.closePath();
        context.beginPath();
        context.moveTo(0, innerHeight / 2);
        context.strokeStyle = this.color;
        context.lineWidth = this.width;
        for (let i = this.x; i < canvas.width + steps; i += steps) {
            
            let y = Math.sin(((i + this.offsetX ) / this.frequency)) * this.amplitude + this.offsetY;
            
            context.lineTo(i, y + this.y);
            this.coords.push(new Point(i, y + this.y));
        }
        context.stroke();
    }
}
class Circle
{
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    };

    dy = 0;
    dx = 0;
    color = "black";

    draw() {
        context.beginPath();
        context.globalAlpha = 0.5;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = "red";
        context.strokeStyle = "white";
        context.lineWidth = 1;
        context.fill();
        context.stroke();
        context.closePath();
        context.globalAlpha = 1;
    }
    update() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x + this.radius > canvas.width || this.x < 0 + this.radius) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y < 0 + this.radius) {
            this.dy = -this.dy;
        }
    }
}

var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;

                            
function lerp(a, b, t)
{
    return (1 - t) * a + t * b;
}

function initCircles()
{
    var circles = [];
    for (let i = 0; i < 250; i++)
    {
        var radius = Math.random() * 10 + 5;
        var maxSpeed = 1;
        
        //Start Position
        let circle = new Circle(
            Math.random() * (canvas.width - (radius * 2)) + radius,
            Math.random() * (canvas.height - (radius*2)) + radius,
            radius
        );
        //Color and speed
        circle.dx = (Math.random() - 0.5) * 2 * maxSpeed;
        circle.dy = (Math.random() - 0.5) * 2 * maxSpeed;

        //Add to Array
        circles.push(circle);
    }
    return circles;
}

class Mouse {
    x = 0;
    y = 0;
    held = false;
}
var mouse = new Mouse();

function getMouseCoords(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
}
function resetMouse() {
    mouse.held = false;
}
function holdMouse() {
    mouse.held = true;
}
function followMouse() {

    let pickupRadius = 150;

    for (circle of circles) {

        if (Math.abs(circle.x - mouse.x) < pickupRadius &&
            Math.abs(circle.y - mouse.y) < pickupRadius)
        {
            circle.x = lerp(circle.x, mouse.x, 0.05);
            circle.y = lerp(circle.y, mouse.y, 0.05);
        }
    }
}

//Events
canvas.addEventListener('mouseleave', resetMouse);
canvas.addEventListener('mousemove', getMouseCoords);
canvas.addEventListener('mouseup', resetMouse);
canvas.addEventListener('mousedown', holdMouse);

//Create Objects
var sin = new SinWave();
var sin2 = new SinWave();
var sin3 = new SinWave();
var sin4 = new SinWave();
var circles = initCircles();

sin.offsetY = canvas.height / 1.5;
sin2.offsetY = canvas.height / 1.5;
sin3.offsetY = canvas.height / 4;
sin4.offsetY = canvas.height / 4;

function main()
{
    context.closePath();
    context.clearRect(0, 0, canvas.width, canvas.height);    
    for (var circle of circles) {
           circle.update();
           circle.draw();
    }
    if (mouse.held)
    {
        followMouse();
    }

    sin.offsetX += 10;
    sin2.offsetX -= 20;
    sin3.offsetX += 20;
    sin4.offsetX -= 10;
    
    sin.draw();
    sin2.draw();
    sin3.draw();
    sin4.draw();

    for (let i = 0; i < sin.coords.length; i+=3) {
        var point1 = sin.coords[i];
        var point2 = sin2.coords[i];

        context.moveTo(point1.x, point1.y);
        context.lineTo(point2.x, point2.y);
    }
    for (let i = 0; i < sin3.coords.length; i+=3) {
        var point1 = sin3.coords[i];
        var point2 = sin4.coords[i];
        context.lineCap = "round";
        context.moveTo(point1.x, point1.y);
        context.lineTo(point2.x, point2.y);
    }
    context.stroke();
    titleText();
    subtitleText();
    requestAnimationFrame(main);
}
main();