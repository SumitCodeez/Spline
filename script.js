import { Application } from "@splinetool/runtime";

document.addEventListener("DOMContentLoaded", function () {
  splitTextIntoSpans(".logo p");

  gsap.to(".img-holder img", {
    left: 0,
    stagger: 0.1,
    ease: "power4.out",
    duration: 1.5,
    delay: 4,
  });
  gsap.to(".img-holder img", {
    left: "110%",
    stagger: -0.1,
    ease: "power4.out",
    duration: 1.5,
    delay: 7,
  });
});

function splitTextIntoSpans(selector) {
  var element = document.querySelector(selector);
  if (element) {
    var text = element.innerText;
    var splitText = text
      .split("")
      .map((char) => `<span>${char}</span>`)
      .join("");

    element.innerHTML = splitText;
  }
}

function startLoader() {
  var counterElement = document.querySelector(".counter p");
  var logoElement = document.querySelector(".logo p");
  var currentValue = 0;

  function updateCounter() {
    if (currentValue === 100) {
      animateText();
      return;
    }

    currentValue += Math.floor(Math.random() * 10) + 1;
    currentValue = currentValue > 100 ? 100 : currentValue;
    counterElement.innerHTML =
      currentValue
        .toString()
        .split("")
        .map((char) => `<span>${char}</span>`)
        .join("") + "<span>%</span>";

    var delay = Math.floor(Math.random() * 200) + 100;

    setTimeout(updateCounter, delay);
  }

  function animateText() {
    setTimeout(() => {
      gsap.to(".counter p span", {
        top: "-400px",
        stagger: 0.1,
        ease: "power3.inOut",
        duration: 1,
      });

      gsap.to(".logo p span", {
        top: "0",
        stagger: 0.1,
        ease: "power3.inOut",
        duration: 1,
      });
      gsap.to(".logo p span", {
        top: "-400px",
        stagger: 0.1,
        ease: "power3.inOut",
        duration: 1,
        delay: 3,
      });
      gsap.to(".loader", {
        opacity: 0,
        ease: "power3.inOut",
        duration: 1,
        delay: 4,
        onComplete: startSplineAnimation,
      });
    }, 300);
  }

  updateCounter();
}

function startSplineAnimation() {
  const canvas = document.getElementById("canvas");
  const spline = new Application(canvas);

  const loadspline = async () => {
    spline
      .load("https://prod.spline.design/hoU1IRriLYqe4Tq4/scene.splinecode")
      .then(async () => {
        addInteractions();

        gsap.to(canvas, { autoAlpha: 1, duration: 1.5, ease: "power2.inOut" });
      });
  };

  const addInteractions = () => {
    const obj =
      spline.findObjectByName("obj") ||
      spline.findObjectById("8174f8a8-928a-4f7e-a036-a0942060badb");

    const position = obj.position;
    const rotation = obj.rotation;

    gsap.set(position, { y: -800 });

    gsap.set(rotation, { x: 0.1, y: 4.24, z: 0.08 });

    const tlspline = gsap.timeline({
      defaults: { duration: 3.2, ease: "expo.inOut" },
    });

    tlspline.to(position, { y: 30 }).to(rotation, { y: 0.24 }, 0);
  };

  gsap.set(canvas, { autoAlpha: 0 });
  loadspline();
}
function marqueeEffect() {
  let currentScroll = 0;
  let isScrollingDown = true;
  let arrows = document.querySelectorAll(".arrow");

  let tween = gsap
    .to(".marquee__part", {
      xPercent: -100,
      repeat: -1,
      duration: 5,
      ease: "linear",
    })
    .totalProgress(0.5);

  gsap.set(".marquee__inner", { xPercent: -50 });

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > currentScroll) {
      isScrollingDown = true;
    } else {
      isScrollingDown = false;
    }

    gsap.to(tween, {
      timescale: isScrollingDown ? 1 : -1,
    });

    arrows.forEach((arrow) => {
      if (isScrollingDown) {
        arrow.classList.remove("active");
      } else {
        arrow.classList.add("active");
      }
    });
    currentScroll = this.window.pageYOffset;
  });
}
function parallaxEffect() {
  gsap.registerPlugin(ScrollTrigger);

  const cards = [
    { id: "#card-1", endTranslateX: -2000, rotate: 45 },
    { id: "#card-2", endTranslateX: -1000, rotate: -30 },
    { id: "#card-3", endTranslateX: -2000, rotate: 45 },
    { id: "#card-4", endTranslateX: -1500, rotate: -30 },
  ];

  ScrollTrigger.create({
    trigger: ".wrapper",
    start: "top top",
    end: "+=900vh",
    scrub: true,
    pin: true,
    onUpdate: (self) => {
      gsap.to(".wrapper", {
        x: `${-350 * self.progress}vw`,
        duration: 0.5,
        ease: "power3.inOut",
      });
    },
  });

  cards.forEach((card) => {
    ScrollTrigger.create({
      trigger: card.id,
      start: "top top",
      end: "+=1200vh",
      scrub: true,
      onUpdate: (self) => {
        gsap.to(card.id, {
          x: `${card.endTranslateX * self.progress}px`,
          rotate: `${card.rotate * self.progress * 2}`,
          duration: 0.5,
          ease: "power3.inOut",
        });
      },
    });
  });
}

window.addEventListener("DOMContentLoaded", function () {
  parallaxEffect();
  startLoader();
  marqueeEffect();
});
