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

spline
  .load("https://prod.spline.design/hoU1IRriLYqe4Tq4/scene.splinecode")
  .then(() => {
    // Add interaction once the scene is loaded
    addInteractions();
  });

function addInteractions() {
  // Find the object by name
  const myObject = spline.findObjectByName("MyObjectName");

  // Check if the object is found
  if (myObject) {
    // Add event listener for click event
    myObject.on("click", (event) => {
      console.log("Object clicked!", event);
      // Example: change color on click
      myObject.material.color.set("#ff0000");
    });

    // Add event listener for hover event
    myObject.on("pointerover", (event) => {
      console.log("Object hovered!", event);
      // Example: scale up on hover
      myObject.scale.set(1.2, 1.2, 1.2);
    });

    myObject.on("pointerout", (event) => {
      console.log("Object hover out!", event);
      // Example: scale back to original size on hover out
      myObject.scale.set(1, 1, 1);
    });
  } else {
    console.error("Object not found");
  }
}

startLoader();
