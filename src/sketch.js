let len = 40;
let inc = 0.15;
let noiseReduce = 0.01;
let pos;
let seed = 1;
let r, g, b;
let imgIdx = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  noLoop();
  background(0);
  fill(0);
  strokeWeight(2);
  noiseSeed(seed);
  seed += 1;
  r = random(3);
  g = random(3);
  b = random(3);
  pos = createVector(3 * len, 3 * len);
  while (pos.x < width - 3 * len) {
    while (pos.y < height - 3 * len) {
      let noiseValue = noise(
        pos.x * noiseReduce,
        pos.y * noiseReduce
      );
      let tilt = p5.Vector.fromAngle(
        noiseValue * PI * 2
      );
      tilt.setMag(len);
      stroke(
        r *
          noiseValue *
          map(pos.y, 0, height, 255, 100),
        g *
          noiseValue *
          map(pos.y, 0, height, 100, 255),
        b *
          noiseValue *
          map(pos.y, 0, height, 255, 50)
      );

      line(
        pos.x - len / 2 + tilt.x,
        pos.y + tilt.y,
        pos.x + len / 2 - tilt.x,
        pos.y - tilt.y
      );

      // translate(pos.x, pos.y);
      // rotate(noiseValue * PI);
      // ellipse(0, 0, len * 3, len * 1.5);
      // rotate(-noiseValue * PI);
      // translate(-pos.x, -pos.y);

      pos.y += inc;
    }
    pos.x += 4 * len;
    pos.y = 3 * len;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

function mouseClicked() {
  redraw();
  imgIdx++;
  saveCanvas(`silk${imgIdx}`);
}
