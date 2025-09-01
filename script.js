const canvas = document.getElementById("network");
const ctx = canvas.getContext("2d");

// Scope canvas to hero section only
const heroSection = canvas.parentElement;

function resizeCanvas() {
  canvas.width = heroSection.clientWidth;
  canvas.height = heroSection.clientHeight;
}
resizeCanvas();

let particles = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = 2;
    this.dx = (Math.random() - 0.5) * 0.5;
    this.dy = (Math.random() - 0.5) * 0.5;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

    // Use Aeiron gradient for particles
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#2b59ff"); // Aeiron blue
    gradient.addColorStop(1, "#8a2be2"); // Aeiron purple
    ctx.fillStyle = gradient;

    ctx.fill();
  }
  update() {
    this.x += this.dx;
    this.y += this.dy;

    // Bounce at edges
    if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.dy *= -1;

    this.draw();
  }
}

function init() {
  particles = [];
  for (let i = 0; i < 120; i++) {
    particles.push(new Particle());
  }
}

function connect() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      let dx = particles[a].x - particles[b].x;
      let dy = particles[a].y - particles[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        ctx.beginPath();

        // Gradient line effect
        const gradient = ctx.createLinearGradient(
          particles[a].x, particles[a].y,
          particles[b].x, particles[b].y
        );
        gradient.addColorStop(0, "rgba(43, 89, 255, 0.3)"); // blue
        gradient.addColorStop(1, "rgba(138, 43, 226, 0.3)"); // purple

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => p.update());
  connect();
  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  resizeCanvas();
  init();
});

init();
animate();


// ====================
// Aeiron Animated Orb
// ====================
const donutCanvas = document.getElementById("donut");
const donutCtx = donutCanvas.getContext("2d");

if (donutCanvas) {
  donutCanvas.width = 300;
  donutCanvas.height = 300;

  let t = 0;
  const centerX = donutCanvas.width / 2;
  const centerY = donutCanvas.height / 2;

  function drawDonut() {
    donutCtx.clearRect(0, 0, donutCanvas.width, donutCanvas.height);

    const outerRadius = 120;
    const innerRadius = 60;

    const outerPoints = [];
    const innerPoints = [];
    const step = 0.05;

    // Build outer + inner with the same angle steps
    for (let angle = 0; angle <= Math.PI * 2 + step; angle += step) {
      let offsetOuter = Math.sin(angle * 3 + t) * 6 + Math.cos(angle * 2 + t * 0.7) * 4;
      let rOuter = outerRadius + offsetOuter;
      outerPoints.push([
        centerX + rOuter * Math.cos(angle),
        centerY + rOuter * Math.sin(angle)
      ]);

      let offsetInner = Math.sin(angle * 3 + t) * 6 + Math.cos(angle * 2 + t * 0.7) * 4;
      let rInner = innerRadius + offsetInner * 0.5;
      innerPoints.push([
        centerX + rInner * Math.cos(angle),
        centerY + rInner * Math.sin(angle)
      ]);
    }

    // === Draw path ===
    donutCtx.beginPath();
    donutCtx.moveTo(outerPoints[0][0], outerPoints[0][1]);

    // Outer edge
    outerPoints.forEach(([x, y]) => donutCtx.lineTo(x, y));

    // Inner edge (reverse order)
    innerPoints.reverse().forEach(([x, y]) => donutCtx.lineTo(x, y));

    donutCtx.closePath();

    // === Animated Gradient ===
    const gradient = donutCtx.createRadialGradient(
      centerX, centerY, innerRadius,
      centerX, centerY, outerRadius
    );

    // Animate middle color stop to "shift" colors
    const shift = (Math.sin(t * 0.02) + 1) / 2; // oscillates 0 → 1
    gradient.addColorStop(0, "#2b59ff");       // deep blue
    gradient.addColorStop(shift * 0.7, "#3f87ff"); // shifting blue
    gradient.addColorStop(1, "#8a2be2");       // purple

    donutCtx.fillStyle = gradient;
    donutCtx.fill();

    t += 0.03;
    requestAnimationFrame(drawDonut);
  }

  drawDonut();
}
