class SinWave {
  constructor(x = 0, y = 0, a = 50, f = 200) {
    this.x = x;
    this.y = y;
    this.amplitude = a;
    this.frequency = f;
    this.color = "black";
    this.width = 10;
    this.offsetY = 0;
    this.offsetX = 0;
    this.coords = [];
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