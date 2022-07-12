const canvases = document.querySelectorAll("canvas");

const imgs = [
  "https://s3.bmp.ovh/imgs/2022/07/12/96e4a9e323814f1a.jpg",
  "https://s3.bmp.ovh/imgs/2022/07/12/6b246a4e4e3bbbf6.jpg",
  "https://s3.bmp.ovh/imgs/2022/07/12/aaf9b06f82e1a5da.jpg",
  "https://s3.bmp.ovh/imgs/2022/07/12/4aae4598331152e3.jpg",
  "https://s3.bmp.ovh/imgs/2022/07/12/e6b3db4ec30e745d.jpg",
];

canvases.forEach((canvas, index) => {
  const sandbox = new GlslCanvas(canvas);
  sandbox.load(frag);
  sandbox.setUniform("flower", imgs[index]);
  sandbox.setUniform("seed", Math.random());

  const sizer = function () {
    const w = canvas.parentNode.clientWidth;
    const h = canvas.parentNode.clientHeight;
    const dpi = window.devicePixelRatio;

    canvas.width = w * dpi;
    canvas.height = h * dpi;

    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
  };

  sizer();

  window.addEventListener("resize", () => {
    sizer();
  });
});
