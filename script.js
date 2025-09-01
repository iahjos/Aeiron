

// ====================
// Aeiron Animated Orb
// ====================
const donutCanvas = document.getElementById("donut");
const donutCtx = donutCanvas?.getContext("2d");

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

    donutCtx.beginPath();
    donutCtx.moveTo(outerPoints[0][0], outerPoints[0][1]);
    outerPoints.forEach(([x, y]) => donutCtx.lineTo(x, y));
    innerPoints.reverse().forEach(([x, y]) => donutCtx.lineTo(x, y));
    donutCtx.closePath();

    const gradient = donutCtx.createRadialGradient(
      centerX, centerY, innerRadius,
      centerX, centerY, outerRadius
    );

    const shift = (Math.sin(t * 0.02) + 1) / 2;
    gradient.addColorStop(0, "#2b59ff");
    gradient.addColorStop(shift * 0.7, "#3f87ff");
    gradient.addColorStop(1, "#8a2be2");

    donutCtx.fillStyle = gradient;
    donutCtx.fill();

    t += 0.03;
    requestAnimationFrame(drawDonut);
  }

  drawDonut();
}
