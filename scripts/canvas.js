(function() {
  var canvas = document.getElementById("intro-canvas");
  var context = canvas.getContext("2d");
  const isMobile = window.innerWidth < 400;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - nav.clientHeight;

  function Circle(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dy = 0;
    this.dx = 0;
    this.dr = Math.random() / 2;
    this.color = Math.random() > 0.5 ? "#111" : "#5f9ea0";
  }
  Circle.prototype.draw = function() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.globalAlpha = this.y / canvas.height;
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
    context.globalAlpha = 1;
  };
  Circle.prototype.update = function() {
    // PHYSICS
    this.x += this.dx;
    this.y += this.dy;
    this.dy += 0.05;
    this.radius -= this.dr;

    if (this.radius <= 0) {
      if (isMobile) {
        this.radius = randomRange(6, 12);
        this.x = randomRange(this.radius, canvas.width - this.radius);
        this.y = canvas.height - this.radius * -2;
        this.dy = -randomRange(5, 6);
      } else {
        this.radius = randomRange(6, 12);
        this.x = randomRange(this.radius, canvas.width - this.radius);
        this.y = canvas.height - this.radius * -2;
        this.dy = -randomRange(6, 10);
      }
      this.dx = -this.dx;
      return;
    }

    if (this.x + this.radius > canvas.width || this.x < 0 + this.radius) {
      this.dx = -this.dx;
    }
  };
  Circle.prototype.initRadius = function() {
    this.radius = Math.floor(Math.random() * 5 + 5) + 3;
  };

  function randomRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
  function initCircle() {
    const radius = randomRange(2, 3);
    const xpos = randomRange(radius, canvas.width - radius);
    const ypos = canvas.height - radius;
    const circle = new Circle(xpos, ypos, radius);
    circle.dx = randomRange(-1, 1);
    circle.dy = -randomRange(2, 3);
    return circle;
  }
  function createCircles() {
    let circles = [];
    if (isMobile) {
      for (let i = 0; i < 250; i++) {
        let circle = initCircle();
        circles.push(circle);
      }
    } else {
      for (let i = 0; i < 500; i++) {
        let circle = initCircle();
        circles.push(circle);
      }
    }
    return circles;
  }
  const circles = createCircles();

  // --- Mouse Object ---
  // Ugly, but ok...
  var mouse = {
    x: 0,
    y: 0,
    held: false
  };
  mouse.getCoords = function(e) {
    mouse.x = e.clientX;
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
  function followMouse(circle) {
    let pickupRadius = 200;
    if (circle.x < mouse.x + pickupRadius && circle.x > mouse.x - pickupRadius) {
      circle.x = lerp(circle.x, mouse.x, 0.01);
      circle.y = lerp(circle.y, mouse.y, 0.01);
    }
  }

  function drawTitle() {
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
  function drawSubtitle() {
    if (isMobile) {
      context.font = "22px Times";
    } else {
      context.font = "64px Times";
    }
    context.fillStyle = "#111";
    context.textAlign = "center";
    context.fillText("Full-Stack Web Developer", canvas.width / 2, canvas.height / 1.5);
  }

  const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let circle of circles) {
      if (mouse.held) {
        followMouse(circle);
      }
      circle.update();
      circle.draw();
    }
    drawTitle();
    drawSubtitle();
    requestAnimationFrame(render);
  }
  render();
})();
