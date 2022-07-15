const allcontainer = gsap.utils.toArray(".container-item");
const venueImageWrap = document.querySelector(".container-img-wrap");
const venueImage = document.querySelector(".container-img");

function initcontainer() {
  allcontainer.forEach((link) => {
    link.addEventListener("mouseenter", venueHover);
    link.addEventListener("mouseleave", venueHover);
    link.addEventListener("mousemove", moveVenueImage);
  });
}

function moveVenueImage(e) {
  let xpos = e.clientX;
  let ypos = e.clientY;
  let strength =
    (xpos - e.target.getBoundingClientRect().left) / e.target.clientWidth;
  sandbox.setUniform("strength", strength);
  const tl = gsap.timeline();
  tl.to(venueImageWrap, {
    x: xpos,
    y: ypos,
  });
}

function venueHover(e) {
  if (e.type === "mouseenter") {
    const targetImage = e.target.dataset.img;
    sandbox.setUniform("image", `./imgs/${targetImage}`);
    const tl = gsap.timeline();
    tl.set(venueImage, {
      // backgroundImage: `url(./imgs/${targetImage})`,
      // sandbox.setUniform("image", "./imgs/image-four.jpg"),
    }).to(venueImageWrap, {
      duration: 0.5,
      autoAlpha: 1,
    });
  } else if (e.type === "mouseleave") {
    const tl = gsap.timeline();
    tl.to(venueImageWrap, {
      duration: 0.5,
      autoAlpha: 0,
    });
  }
}

function init() {
  initcontainer();
}

window.addEventListener("load", function () {
  init();
});

tl = new TimelineMax();

tl.from(".navbar > div", 1.6, {
  opacity: 0,
  y: 60,
  ease: Expo.easeInOut,
  delay: 0.6,
});

tl.from(
  ".site-logo",
  1.6,
  {
    opacity: 0,
    y: 40,
    ease: Expo.easeInOut,
  },
  "-=1.6"
);

tl.staggerFrom(
  ".site-menu > div",
  1,
  {
    opacity: 0,
    y: 60,
    ease: Power2.easeOut,
  },
  0.2
);

tl.staggerFrom(
  ".header > div",
  1,
  {
    opacity: 0,
    y: 60,
    ease: Power2.easeOut,
    delay: -1.4,
  },
  0.2
);
