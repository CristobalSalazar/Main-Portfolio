var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const isMobile = window.innerWidth < 400;

var palette = ["#581845", "#900C3F", "#C70039", "#FF5733", "#FFC300"];
var palette2 = ["#BEEEF7", "#83C4F7", "#62A2D1", "#4B87CC", "#497CB2"];

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function titleText() {
  context.textAlign = "center";
  context.fillStyle = "#111";
  context.lineWidth = 3;
  if (isMobile) {
    context.font = "40px Times";
  } else {
    context.font = "128px Times";
  }
  context.fillText("Cristobal Salazar", canvas.width / 2, canvas.height / 2);
}
function subtitleText() {
  if (isMobile) {
    context.font = "22px Times";
  } else {
    context.font = "64px Times";
  }
  context.fillStyle = "#111";
  context.textAlign = "center";
  context.fillText("Full-Stack Web Developer", canvas.width / 2, canvas.height / 1.5);
}
class Point {
  x = 0;
  y = 0;
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}
class SinWave {
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
    const steps = canvas.width / 50;
    this.coords = [];
    context.closePath();
    context.beginPath();
    context.moveTo(0, innerHeight / 2);
    context.strokeStyle = this.color;
    context.lineWidth = this.width;
    for (let i = this.x; i < canvas.width + steps; i += steps) {
      let y = Math.sin((i + this.offsetX) / this.frequency) * this.amplitude + this.offsetY;

      context.lineTo(i, y + this.y);
      this.coords.push(new Point(i, y + this.y));
    }
    context.stroke();
  }
}

class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
  dy = 0;
  dx = 0;
  dr = Math.random() / 2;
  color = Math.random() > 0.5 ? "#111" : "#5f9ea0";

  // --- FUNCTIONS ---
  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.globalAlpha = this.y / canvas.height;
    context.fill();
    context.closePath();
  }
  update() {
    this.x += this.dx;
    this.y += this.dy / (this.y * 0.002);
    this.radius -= this.dr;
    if (this.radius <= 0) {
      this.initRadius();
      if (isMobile) {
        this.y = canvas.height - this.radius - Math.floor(Math.random() * 10);
      } else {
        this.y = canvas.height - this.radius - Math.floor(Math.random() * 100);
      }
      this.dx = -this.dx;
      return;
    }
    if (this.x + this.radius > canvas.width || this.x < 0 + this.radius) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius <= 0) {
      this.y = canvas.height - this.radius - Math.floor(Math.random() * 25);
    }
  }
  initRadius() {
    this.radius = Math.floor(Math.random() * 5 + 5);
  }
}

var requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

function lerp(a, b, t) {
  return (1 - t) * a + t * b;
}
function initCircles() {
  var circles = [];
  if (isMobile) {
    for (let i = 0; i < 200; i++) {
      let radius = Math.floor(Math.random() * 2);
      let maxSpeed = 3;
      let position =
        Math.floor((Math.random() * canvas.width) / 50) + canvas.width / 2 + canvas.width / 50;
      let circle = new Circle(position, -10, radius);
      circle.dx = (Math.random() - 0.5) * 2;
      circle.dy = Math.floor(Math.random() * -2 * maxSpeed);
      circles.push(circle);
    }
  } else {
    for (let i = 0; i < 500; i++) {
      let radius = Math.floor(Math.random() * 10 + 5);
      let maxSpeed = 7;
      let position =
        Math.floor((Math.random() * canvas.width) / 50) + canvas.width / 2 + canvas.width / 50;
      let circle = new Circle(position, -10, radius);
      circle.dx = (Math.random() - 0.5) * 2;
      circle.dy = Math.floor(Math.random() * -2 * maxSpeed);
      circles.push(circle);
    }
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
    if (
      Math.abs(circle.x - mouse.x) < pickupRadius &&
      Math.abs(circle.y - mouse.y) < pickupRadius
    ) {
      circle.x = lerp(circle.x, mouse.x, 0.05);
      circle.y = lerp(circle.y, mouse.y, 0.05);
    }
  }
}

//Events
canvas.addEventListener("mouseleave", resetMouse);
canvas.addEventListener("mousemove", getMouseCoords);
canvas.addEventListener("mouseup", resetMouse);
canvas.addEventListener("mousedown", holdMouse);
var circles = initCircles();

window.addEventListener("scroll", e => {
  const rate = 0.1;
});
const fps = 1000 / 30;

function main() {
  context.closePath();

  context.clearRect(0, 0, canvas.width, canvas.height);

  for (var circle of circles) {
    circle.update();
    circle.draw();
  }
  if (mouse.held) {
    followMouse();
  }
  context.stroke();
  context.globalAlpha = 1;
  titleText();
  subtitleText();
  requestAnimationFrame(main);
}
main();
