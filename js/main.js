const colorArray = ["#BF2424", "#1A1D1A", "#36413E", "#ADEEE3", "#86DEB7"];

window.addEventListener("load", () => {
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");
  const circles = [];
  const mouse = {
    x: 0,
    y: 0,
    size: 50,
  };

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    update();
  };

  const update = () => {
    //reset screen
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    //draw / update circles
    circles.forEach((circle) => {
      circle.zoom(mouse);
      circle.draw(ctx);
      circle.update();
    });
    requestAnimationFrame(update);
  };

  const mousemove = (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
  };

  //creating random circles
  for (let i = 0; i < 350; i++) {
    let radius = Math.random() * 4 + 1.5;
    let x = Math.random() * (window.innerWidth - radius * 2) + radius;
    let y = Math.random() * (window.innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 1.5;
    let dy = (Math.random() - 0.5) * 1.5;
    circles.push(new Circle(x, y, dx, dy, radius));
  }

  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", mousemove);
  resize();
  update();
});

function Circle(x, y, dx, dy, radius) {
  const maxRadius = 50;

  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.originRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * (colorArray.length - 1))];

  this.zoom = (mouse) => {
    let distanceX = Math.abs(mouse.x - this.x);
    let distanceY = Math.abs(mouse.y - this.y);
    if (
      distanceX >= 0 &&
      distanceX <= mouse.size &&
      distanceY >= 0 &&
      distanceY <= mouse.size
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else {
      if (this.radius > this.originRadius) {
        this.radius -= 1;
      }
    }
  };

  this.draw = (ctx) => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  this.update = () => {
    let width = window.innerWidth;
    let height = window.innerHeight;

    this.x += this.dx;
    this.y += this.dy;

    if (this.x <= radius || this.x >= width - radius) {
      this.dx *= -1;
      if (this.x < 0) this.x = radius;
      if (this.x > width) this.x = width - radius * 2;
    }
    if (this.y <= radius || this.y >= height - radius) {
      this.dy *= -1;
      if (this.y < 0) this.y = radius;
      if (this.y > height) this.y = height - radius * 2;
    }
  };
}
