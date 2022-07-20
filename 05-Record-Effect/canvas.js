const canvasHandle = document.querySelector(".canvas-holder");
const canvasEls = document.querySelectorAll("canvas");
const bodyEl = document.querySelector("body");
let width = window.innerWidth;

canvasEls.forEach((canvasEl) => {
  const sandbox = new GlslCanvas(canvasEl);
  sandbox.load(frag);
  bodyEl.addEventListener("mousemove", function (e) {
    let mouseX = e.clientX;
    let recordIndex = (mouseX / width) * 2.0;
    sandbox.setUniform("recordIndex", recordIndex);
    sandbox.setUniform("circle", Math.random() * 2 + 1);
  });

  const sizer = function () {
    const w = canvasHandle.clientWidth;
    const h = canvasHandle.clientHeight;
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
    width = window.innerWidth;
  });
});
