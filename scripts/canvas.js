(function() {
  const canvas = document.getElementById("intro-canvas");
  const context = canvas.getContext("2d");

  if (breakpoints.s) {
    canvas.height = window.innerHeight;
  } else {
    canvas.height = window.innerHeight - nav.clientHeight;
  }
  function checkWidth() {
    canvas.width = window.innerWidth;
  }
  checkWidth();
  window.onresize = checkWidth;
  // ------ Circle Object ------
  function Circle(x, y, radius) {
    this.x = x;
    this.y = y;
    this.xvel = 0;
    this.yvel = 0;
    this.shrinkRate = Math.random() / 4;
    this.radius = radius;
    this.fadeRate = Math.random() * 0.01;
    this.opacity = 1;
    this.color = "black";
  }
  // *** METHODS ***
  // --- Render ---
  Circle.prototype.draw = function() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.globalAlpha = this.opacity;
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
    context.globalAlpha = 1;
  };
  // --- Update ---
  Circle.prototype.update = function() {
    this.x += this.xvel;
    this.y += this.yvel;
    this.yvel += 0.0985;
    this.xvel = this.xvel / 2;
    this.radius -= this.shrinkRate;
    this.opacity = this.opacity <= 0 ? (this.opacity = 0) : (this.opacity -= this.fadeRate);
    // --- Reset ---
    if (this.radius <= 0 || this.opacity <= 0) {
      this.radius = randomRange(6, 12);
      this.shrinkRate = Math.random() / 4;
      this.x = randomRange(this.radius, canvas.width - this.radius);
      this.y = 0;
      this.yvel = 0;
      this.xvel = randomRange(-1, 1);
      this.opacity = 1;
      this.xvel = -this.xvel;
      return;
    } else if (this.y - this.radius >= canvas.height) {
      this.yvel = -this.yvel / 2;
      this.radius /= 1.5;
      this.y = canvas.height - this.radius;
    }
    // --- Collision ---
    if (this.x + this.radius > canvas.width || this.x < 0 + this.radius) {
      this.xvel = -this.xvel;
    }
  };
  Circle.prototype.initRadius = function() {
    this.radius = Math.floor(Math.random() * 5 + 5) + 3;
  };

  function randomRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
  // --- Circle Factory ---
  function createCircles() {
    let circles = [];
    if (breakpoints.s) {
      for (let i = 0; i < 250; i++) {
        let circle = initCircle();
        circles.push(circle);
      }
    } else {
      for (let i = 0; i < 100; i++) {
        let circle = initCircle();
        circles.push(circle);
      }
    }
    return circles;
  }
  const circles = createCircles();
  // --- Initialize Circles ---
  function initCircle() {
    const radius = randomRange(2, 3);
    const xpos = randomRange(radius, canvas.width - radius);
    const ypos = 0;
    const circle = new Circle(xpos, ypos, radius);
    circle.xvel = randomRange(-5, 5);
    circle.yvel = randomRange(0, 1);
    return circle;
  }

  // --- Mouse Object ---
  var mouse = {
    x: 0,
    y: 0,
    held: false
  };
  mouse.getCoords = function(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  };
  mouse.reset = function() {
    mouse.held = false;
  };
  mouse.hold = function() {
    mouse.held = true;
  };

  // --- Mouse Events ---
  canvas.addEventListener("mouseleave", mouse.reset);
  canvas.addEventListener("mousemove", mouse.getCoords);
  canvas.addEventListener("mouseup", mouse.reset);
  canvas.addEventListener("mousedown", mouse.hold);

  function lerp(a, b, t) {
    return (1 - t) * a + t * b;
  }
  // --- Text ---
  function drawTitle() {
    context.fillStyle = "#111";
    if (breakpoints.s) {
      context.textAlign = "left";
      context.font = `40px Times`;
      context.fillText("Cristobal Salazar", 16, canvas.height / 1.25);
    } else if (breakpoints.m) {
      context.textAlign = "left";
      context.font = `64px Times`;
      context.fillText("Cristobal Salazar", 16, canvas.height / 1.25);
    } else {
      context.textAlign = "center";
      context.font = `100px Times`;
      context.fillText("Cristobal Salazar", canvas.width / 2, canvas.height / 2);
    }
  }
  function drawSubtitle() {
    context.fillStyle = "#000";
    if (breakpoints.s) {
      context.textAlign = "left";
      context.font = "22px Times";
      context.fillText("Full-Stack Web Developer", 32, canvas.height / 1.125);
    } else if (breakpoints.m) {
      context.textAlign = "left";
      context.font = "32px Times";
      context.fillText("Full-Stack Web Developer", 32, canvas.height / 1.125);
    } else {
      context.textAlign = "center";
      context.font = "50px Times";
      context.fillText("Full-Stack Web Developer", canvas.width / 2, canvas.height / 1.5);
    }
  }

  const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let circle of circles) {
      circle.update();
      if (mouse.held) {
        circle.x = lerp(circle.x, mouse.x, 0.01);
        circle.y = lerp(circle.y, mouse.y, 0.05);
      }
      circle.draw();
    }
    drawTitle();
    drawSubtitle();
    requestAnimationFrame(render);
  }
  render();
})();
