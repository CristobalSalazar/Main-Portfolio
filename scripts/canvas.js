(function () {
  "use strict"
  const canvas = document.getElementById("intro-canvas");
  const context = canvas.getContext("2d");
  const dpr = window.devicePixelRatio;

  function setSize() {
    if (breakpoints.sm) {
      // canvas size
      canvas.setAttribute("height", window.innerHeight * dpr);
      canvas.setAttribute("width", window.innerWidth * dpr);
      // style
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    } else {
      // canvas size
      canvas.setAttribute("height", window.innerHeight / 2 * dpr);
      canvas.setAttribute("width", window.innerWidth * dpr);
      // style
      canvas.style.height = window.innerHeight / 2 + "px";
      canvas.style.width = window.innerWidth + "px";
    }
  }
  setSize();
  if (!breakpoints.sm) {
    window.onresize = setSize;
  }

  // ------ Circle Object ------
  function Circle() {
    this.reset();
    this.color = 'lightblue'
  }
  // *** METHODS ***
  Circle.prototype.draw = function () {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.globalAlpha = this.opacity;
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
    context.globalAlpha = 1;
  };
  Circle.prototype.update = function () {

    const xgrav = 0;
    const ygrav = 0.0985;

    this.x += this.xvel;
    this.y += this.yvel;
    this.yvel += ygrav * dpr;
    this.xvel += xgrav * dpr;
    this.radius -= this.shrinkRate * dpr;
    this.opacity = this.opacity <= 0 ? (this.opacity = 0) : (this.opacity -= this.fadeRate);

    if (this.radius <= 0 || this.opacity <= 0) {
      this.reset();
      return;
    }
    // Collision
    if (this.y - this.radius >= canvas.height) {
      this.yvel = -this.yvel / 2;
      this.radius /= 1.5;
      this.y = canvas.height - this.radius;
    }
    // if (this.x + this.radius > canvas.width || this.x < 0 + this.radius) {
    //   this.xvel = -this.xvel;
    // }
  };
  Circle.prototype.reset = function () {
    const minRadius = 2;
    const maxRadius = 4;
    const shrinkRate = Math.random() / 4;
    const yvel = Math.random() * 5;
    const fadeRate = Math.random() * 0.05;

    const xvel = 0;

    this.radius = randomRange(minRadius, maxRadius) * dpr;
    this.shrinkRate = shrinkRate * dpr;
    this.x = randomRange(this.radius, canvas.width - this.radius);
    this.y = -this.radius;
    this.yvel = yvel;
    this.xvel = xvel;
    this.fadeRate = fadeRate;
    this.opacity = 1;
  }

  function randomRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
  // --- Circle Factory ---
  function createCircles() {
    let circles = [];
    if (breakpoints.sm) {
      for (let i = 0; i < 100; i++) {
        let circle = new Circle();
        circle.reset();
        circles.push(circle);
      }
    } else {
      for (let i = 0; i < 100; i++) {
        let circle = new Circle();
        circle.reset();
        circles.push(circle);
      }
    }
    return circles;
  }
  const circles = createCircles();

  // --- Mouse Object ---
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

  // --- Mouse Events ---
  window.addEventListener("mouseleave", mouse.reset);
  window.addEventListener("mousemove", mouse.getCoords);
  window.addEventListener("touchmove", e => mouse.getCoords(e, true));
  window.addEventListener("mouseup", mouse.reset);
  window.addEventListener("touchend", mouse.reset);
  window.addEventListener("mousedown", mouse.hold);
  window.addEventListener("touchstart", e => mouse.hold(e, true));

  function lerp(a, b, t) {
    return (1 - t) * a + t * b;
  }

  const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

  var posy = 0;

  function render() {
    if (canvas.getBoundingClientRect().bottom < 0) {
      requestAnimationFrame(render);
      return;
    }

    canvas.style.backgroundPositionY = posy + 'px';

    posy += 10;
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let circle of circles) {
      circle.update();
      if (mouse.held) {
        circle.x = lerp(circle.x, mouse.x, 0.05);
        circle.y = lerp(circle.y, mouse.y, 0.1);
      }
      circle.draw();
    }
    requestAnimationFrame(render);
  }
  render();
})();