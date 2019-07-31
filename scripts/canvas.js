(function () {
  "use strict"
  const canvas = document.getElementById("intro-canvas");
  const intro = document.getElementById('intro');
  const dpr = window.devicePixelRatio;
  const context = canvas.getContext("2d");
  const goldenRatio = 1.61803398875;

  // ------ Sizing ------
  function setCanvasSize() {
    const canvasHeight = canvas.clientHeight
    const canvasWidth = canvas.clientWidth;

    if (breakpoints.sm) {
      canvas.setAttribute("height", canvasHeight * dpr);
      canvas.setAttribute("width", canvasWidth * dpr);
    } else {
      canvas.setAttribute("height", canvasHeight * dpr);
      canvas.setAttribute("width", canvasWidth * dpr);
    }
  }
  // ------ Circle ------
  function Circle() {
    this.init();
  }
  Circle.prototype.init = function () {
    let minRadius = 25 * (goldenRatio - 1);
    let maxRadius = 25;
    const yvel = randomRange(-6, -12);
    const xvel = (Math.random() - 0.5) * 5;
    const shrinkRate = Math.random();
    const fadeRate = Math.random();
    const interval = canvas.width / 1.96;

    if (breakpoints.sm) {
      minRadius = 1;
      maxRadius = 2;
    }
    this.xOffset = canvas.width / 4;
    this.radius = randomRange(minRadius, maxRadius) * dpr;
    this.shrinkRate = shrinkRate * dpr;
    this.x = randomRange(this.radius + interval, canvas.width - interval - this.radius);
    this.x += this.xOffset
    this.y = -this.radius;
    this.y = this.radius + canvas.height - Math.random() * 2;
    this.yvel = yvel;
    this.xvel = xvel;
    this.fadeRate = fadeRate;
    this.opacity = 1;
    this.color = new Color(255, 255, 0);
  }
  Circle.prototype.draw = function () {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.globalAlpha = this.opacity;
    context.fillStyle = `rgb(${this.color.r},${this.color.g},${this.color.b})`;
    context.fill();
    context.closePath();
    context.globalAlpha = 1;
  };
  Circle.prototype.update = function () {
    const xForce = 0;
    const yForce = 0.0985;
    const shrinkDelta = 0.01;
    const above = this.y + this.radius < 0;
    const below = this.y - this.radius > canvas.height;
    const isBlack = this.color.r < 5 && this.color.g < 5 && this.color.b < 5;
    this.shrinkRate += shrinkDelta;
    this.color = colorLerp(this.color, new Color(0, 0, 0), 0.05)
    this.x += this.xvel;
    this.y += this.yvel;
    this.yvel += yForce * dpr;
    this.xvel += xForce * dpr;
    this.radius -= this.shrinkRate * dpr;
    this.x = lerp(this.x, canvas.width / 2 + this.xOffset, 0.02);

    this.opacity = this.opacity <= 0 ? (this.opacity = 0) : (this.opacity -= this.fadeRate);
    if (this.radius <= 0 || this.opacity <= 0 || above || below || isBlack) {
      this.init()
    }
  };
  Circle.prototype.createCircles = function (density) {
    const circles = [];
    for (let i = 0; i < density; i++) {
      const circle = new Circle();
      circles.push(circle);
    }
    return circles;
  }

  // ------ Mouse ------
  var mouse = {
    x: 0,
    y: 0,
    held: false
  };
  mouse.getCoords = function (e, isTouch = false) {
    if (isTouch) {
      mouse.x = e.touches[0].clientX * dpr;
      mouse.y = e.touches[0].clientY * dpr;
    } else {
      mouse.x = e.clientX * dpr;
      mouse.y = e.clientY * dpr;
    }
  };
  mouse.reset = function () {
    mouse.held = false;
  };
  mouse.hold = function (e, isTouch = false) {
    mouse.getCoords(e, isTouch);
    mouse.held = true;
  };
  canvas.addEventListener("mouseleave", mouse.reset);
  canvas.addEventListener("mousemove", mouse.getCoords);
  canvas.addEventListener("touchmove", e => mouse.getCoords(e, true));
  canvas.addEventListener("mouseup", mouse.reset);
  canvas.addEventListener("touchend", mouse.reset);
  canvas.addEventListener("mousedown", mouse.hold);
  canvas.addEventListener("touchstart", e => mouse.hold(e, true));

  // ------ Utility ------
  function lerp(a, b, t) {
    return (1 - t) * a + t * b;
  }

  function Color(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  function colorLerp(color1, color2, t) {
    const r = lerp(color1.r, color2.r, t);
    const g = lerp(color1.g, color2.g, t);
    const b = lerp(color1.b, color2.b, t);
    return new Color(r, g, b);
  }

  function randomRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  // ------ Render ------
  const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

  let posy = 0;

  function render() {
    if (canvas.getBoundingClientRect().bottom < 0) {
      requestAnimationFrame(render);
      return;
    }
    intro.style.backgroundPositionY = -posy + 'px';
    canvas.style.backgroundPositionY = -posy / goldenRatio / 2 + 'px';
    posy += 10;
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let circle of circles) {
      circle.update();
      if (mouse.held) {
        circle.x = lerp(circle.x, mouse.x, 0.025);
      }
      circle.draw();
    }
    requestAnimationFrame(render);
  }

  // ------ Exec ------
  setCanvasSize()
  if (!breakpoints.sm) {
    window.onresize = setCanvasSize;
  }
  const circles = Circle.prototype.createCircles(500);
  render();
})();