const canvasEl = document.querySelector("canvas");
const canvasContainer = document.querySelector(".container-img-wrap");

const sandbox = new GlslCanvas(canvasEl);
sandbox.load(frag);

sandbox.setUniform("image", "./imgs/image-four.jpg");
sandbox.setUniform("strength", 0.5);

const sizer = function () {
  const w = canvasContainer.clientWidth;
  const h = canvasContainer.clientHeight;
  const dpi = window.devicePixelRatio;

  sandbox.setUniform("dpi", dpi);

  canvasEl.width = w * dpi;
  canvasEl.height = h * dpi;

  canvasEl.style.width = w + "px";
  canvasEl.style.height = h + "px";
};

sizer();

window.addEventListener("resize", () => {
  sizer();
});
