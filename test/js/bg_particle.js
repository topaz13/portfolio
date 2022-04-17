particlesJS("particles-js", {
  particles: {
    number: { value: 400, density: { enable: true, value_area: 800 } },
    color: { value: "#b5dc38" },
    shape: {
      type: "polygon",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 },
      image: { src: "img/github.svg", width: 100, height: 100 },
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
    },
    size: {
      value: 12.02559045649142,
      random: true,
      anim: {
        enable: true,
        speed: 26.79702471822524,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: false,
      distance: 128.27296486924183,
      color: "#009900",
      opacity: 0.4,
      width: 2,
    },
    move: {
      enable: true,
      speed: 1.603412060865523,
      direction: "top-right",
      random: true,
      straight: false,
      out_mode: "bounce",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "bubble" },
      resize: true,
    },
    modes: {
      grab: {
        distance: 462.85769967843606,
        line_linked: { opacity: 0.29614517694674347 },
      },
      bubble: { distance: 400, size: 4, duration: 0.3, opacity: 1, speed: 3 },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 },
    },
  },
  retina_detect: true,
});
var count_particles, stats, update;
// stats = new Stats();
// stats.setMode(0);
// stats.domElement.style.position = "absolute";
// stats.domElement.style.left = "0px";
// stats.domElement.style.top = "0px";
// document.body.appendChild(stats.domElement);
count_particles = document.querySelector(".js-count-particles");
update = function () {
//   stats.begin();
//   stats.end();
  if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
    count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
  }
  requestAnimationFrame(update);
};
requestAnimationFrame(update);
