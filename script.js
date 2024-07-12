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
      });
    }, 300);
  }
  updateCounter();
}
import { Application } from "@splinetool/runtime";

const canvas = document.getElementById("canvas");
const spline = new Application(canvas);

let mouseX = 0;
let mouseY = 0;

// Track mouse movement
canvas.addEventListener("mousemove", (event) => {
  mouseX = event.clientX - canvas.offsetLeft;
  mouseY = event.clientY - canvas.offsetTop;
});

spline
  .load("https://prod.spline.design/hoU1IRriLYqe4Tq4/scene.splinecode")
  .then(() => {
    // After loading, animate the object
    addInteractions();
  });

function addInteractions() {
  const myObject = spline.findObjectById(
    "8174f8a8-928a-4f7e-a036-a0942060badb"
  );

  if (myObject) {
    // Apply CSS animation for bounce-in effect
    myObject.element.style.animation = "bounceIn 1s forwards";

    function animate() {
      const targetX = mouseX - canvas.width / 2;
      const targetY = canvas.height / 2 - mouseY;

      const ease = 0.1; // Adjust ease value for smoothness
      myObject.position.x += (targetX - myObject.position.x) * ease;
      myObject.position.y += (targetY - myObject.position.y) * ease;

      spline.render();

      requestAnimationFrame(animate);
    }

    animate();
  } else {
    console.error("Object not found");
  }
}

startLoader();
