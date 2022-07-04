const canvas = document.querySelector("canvas");
const sandbox = new GlslCanvas(canvas);

const calcSize = function () {
  let ww = window.innerWidth;
  let wh = window.innerHeight;
  let dpi = window.devicePixelRatio;

  let s = Math.max(wh, ww);

  canvas.width = s * dpi;
  canvas.height = s * dpi;
  canvas.style.width = s + "px";
  canvas.style.height = s + "px";
};

calcSize();

window.addEventListener("resize", () => {
  calcSize();
});

const images = [
  "https://s3.bmp.ovh/imgs/2022/07/04/b9d16b6084360687.jpg",
  "https://s3.bmp.ovh/imgs/2022/07/04/bee80b1b59bb909c.jpg",
  "https://s3.bmp.ovh/imgs/2022/07/04/d3596db15c86384e.jpg",
  "https://s3.bmp.ovh/imgs/2022/07/04/0ac9b1a33d0908a2.jpg",
  "https://s3.bmp.ovh/imgs/2022/07/04/5c783ea8b239079a.jpg",
];
let current = 0;

canvas.addEventListener("click", () => {
  current += 1;
  if (current >= images.length) {
    current = 0;
  }
  sandbox.setUniform("image", images[current]);
});

sandbox.load(frag);
sandbox.setUniform("image", images[current]);
