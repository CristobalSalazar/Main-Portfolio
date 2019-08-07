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

    canvas.setAttribute("height", canvasHeight * dpr);
    canvas.setAttribute("width", canvasWidth * dpr);
  }

  // ------ Circle ------
  function Circle() {
    this.init();
  }
  Circle.prototype.init = function () {
    let minRadius = 18 * (goldenRatio - 1);
    let maxRadius = 18;

    minRadius = 16;
    maxRadius = 16;
    let xOffset = canvas.width / 4;
    // let yvel = randomRange(-6, -12);
    let yvel = 0;
    // let xvel = (Math.random() - 0.5);
    let xvel = 0;
    let shrinkRate = Math.random();
    let fadeRate = Math.random();

    if (breakpoints.sm) {

      xOffset = 0;
      interval = 0;
    }
    this.xOffset = xOffset;
    this.radius = randomRange(minRadius, maxRadius) * dpr;
    this.shrinkRate = shrinkRate;
    // this.x = randomRange(this.radius + interval, canvas.width - interval - this.radius);
    // this.x += xOffset;
    this.x = mouse.x + (Math.random() - 0.5) * 25;
    // this.y = -this.radius;
    // this.y = this.radius + canvas.height - Math.random() * 2;
    this.y = mouse.y + (Math.random() - 0.5) * 25;
    this.yvel = yvel;
    this.xvel = xvel;
    this.fadeRate = fadeRate;
    this.opacity = 1;
    this.color = new Color(0, 255, 255);
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
    const yForce = 0.985;
    const shrinkDelta = 0.02;
    const above = this.y + this.radius < 0;
    const below = this.y - this.radius > canvas.height;
    const isBlack = this.color.r < 5 && this.color.g < 5 && this.color.b < 5;
    this.shrinkRate += shrinkDelta;
    this.color = colorLerp(this.color, new Color(255, 255, 0), 0.05)
    this.x += this.xvel;
    this.y += this.yvel;
    this.yvel += yForce * dpr;
    this.xvel += xForce * dpr;
    this.radius -= this.shrinkRate * dpr;
    // this.x = lerp(this.x, canvas.width / 2 + this.xOffset, 0.02);

    if (below) {
      this.yvel = -this.yvel;
    }

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
  function Mouse() {
    this.x = Number.MAX_SAFE_INTEGER;
    this.y = Number.MAX_SAFE_INTEGER;
  };
  Mouse.prototype.getCoords = function (e, isTouch = false) {
    let offset = canvas.getBoundingClientRect().top
    if (isTouch) {
      this.x = e.touches[0].clientX * dpr;
      this.y = (e.touches[0].clientY - offset) * dpr;
    } else {
      this.x = e.clientX * dpr;
      this.y = e.clientY - offset * dpr;
    }
  };
  Mouse.prototype.reset = function () {
    this.x = Number.MAX_SAFE_INTEGER;
    this.y = Number.MAX_SAFE_INTEGER;
  };
  const mouse = new Mouse();

  window.addEventListener("mouseleave", mouse.reset);
  window.addEventListener("mousemove", e => mouse.getCoords(e));


  if (breakpoints.md) {
    canvas.addEventListener('touchstart', e => mouse.getCoords(e, true));
    canvas.addEventListener("touchmove", e => mouse.getCoords(e, true));
    canvas.addEventListener('touchend', mouse.reset)
  }

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
    canvas.style.backgroundPositionY = -posy / 2 + 'px';
    posy += 10;
    if (posy < -canvas.height) {
      posy = 0;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let circle of circles) {
      circle.update();
      circle.draw();
    }


    requestAnimationFrame(render);
  }

  // ------ Execution ------
  setCanvasSize()
  if (!breakpoints.sm) {
    window.onresize = setCanvasSize;
  }
  const circles = Circle.prototype.createCircles(100);
  render();
})();