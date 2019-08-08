(function () {
  "use strict"

  const canvas = document.getElementById("intro-canvas");
  const intro = document.getElementById('intro');
  const dpr = window.devicePixelRatio;
  const context = canvas.getContext("2d");
  const goldenRatio = 1.61803398875;

  // ------ Circle ------
  function Circle() {
    this.init();
  }
  Circle.prototype.init = function () {
    // config
    let minRadius = 24 * (goldenRatio - 1);
    let maxRadius = 24;
    let yvel = 0;
    let xvel = 0;
    let rndPosFactor = 24;
    let shrinkRate = Math.random();
    let fadeRate = Math.random() / 0.05;


    this.radius = randomRange(minRadius, maxRadius) * dpr;
    this.shrinkRate = shrinkRate;
    this.fadeRate = fadeRate;

    this.x = mouse.x + (Math.random() - 0.5) * rndPosFactor;
    this.y = mouse.y + (Math.random() - 0.5) * rndPosFactor;

    this.yvel = yvel;
    this.xvel = xvel;

    this.opacity = 1;
    this.color = new Color(0, 255, 255);
  }
  Circle.prototype.update = function () {
    const xForce = 0;
    const yForce = 0.0985;
    const shrinkDelta = 0.3;
    const above = this.y + this.radius < 0;
    const below = this.y - this.radius > canvas.height;
    const isBlack = this.color.r < 1 && this.color.g < 1 && this.color.b < 1;
    this.shrinkRate -= shrinkDelta;
    this.color = colorLerp(this.color, new Color(255, 255, 0), 0.05)
    this.x += this.xvel;
    this.y += this.yvel;
    this.yvel += yForce * dpr;
    this.xvel += xForce * dpr;
    this.radius += this.shrinkRate * dpr;
    this.opacity = this.opacity <= 0 ? (this.opacity = 0) : (this.opacity -= this.fadeRate);
    // reset
    if (this.radius <= 0 || this.opacity <= 0 || above || below || isBlack) {
      this.init()
    }
  };
  Circle.prototype.draw = function () {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.globalAlpha = this.opacity;
    context.fillStyle = `rgb(${this.color.r},${this.color.g},${this.color.b})`;
    context.fill();
    context.closePath();
    context.globalAlpha = 1;
  };
  Circle.prototype.getCircles = function (density) {
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
    console.log('getCoords');
    let offset = canvas.getBoundingClientRect().top
    if (isTouch) {
      this.x = e.touches[0].clientX * dpr;
      this.y = (e.touches[0].clientY - offset) * dpr;
    } else {
      this.x = e.clientX * dpr;
      this.y = e.clientY - offset * dpr;
    }
  };
  Mouse.prototype.reset = function (e) {
    console.log('reseting')
    this.x = Number.MAX_SAFE_INTEGER;
    this.y = Number.MAX_SAFE_INTEGER;
  };

  // ------ Utility ------
  function setCanvasSize() {
    canvas.setAttribute("height", canvas.clientHeight * dpr);
    canvas.setAttribute("width", canvas.clientWidth * dpr);
  }

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
    circles.sort((x, y) => {
      x.radius > y.radius;
    })
    for (let circle of circles) {
      circle.update();
      circle.draw();
    }
    requestAnimationFrame(render);
  }

  // ------ Execution ------
  setCanvasSize()

  const mouse = new Mouse();
  const circles = Circle.prototype.getCircles(200);

  if (breakpoints.md) {
    canvas.addEventListener('touchstart', e => mouse.getCoords(e, true));
    canvas.addEventListener("touchmove", e => mouse.getCoords(e, true));
    canvas.addEventListener('touchend', e => mouse.reset(e))
  } else {
    window.addEventListener("mouseleave", mouse.reset);
    window.addEventListener("mousemove", e => mouse.getCoords(e));
    window.addEventListener('click', mouse.reset);
  }
  window.onresize = setCanvasSize;
  console.log(circles.length);

  render();
})();