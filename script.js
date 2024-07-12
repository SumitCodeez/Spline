document.addEventListener("DOMContentLoaded", function () {
  // Initialize the spline application
  const canvas = document.getElementById("canvas");
  const spline = new Application(canvas);

  // Start loader animation
  startLoader();

  function startLoader() {
    var counterElement = document.querySelector(".counter p");
    var logoElement = document.querySelector(".logo p");
    var currentValue = 0;

    function updateCounter() {
      if (currentValue >= 100) {
        // Adjusted to handle edge case where currentValue might exceed 100
        animateText();
        return;
      }

      currentValue += Math.floor(Math.random() * 10) + 1;
      currentValue = currentValue > 100 ? 100 : currentValue;

      // Update counter with span elements
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
          onComplete: loadspline,
        });
      }, 300);
    }

    updateCounter();
  }

  function loadspline() {
    // Load spline scene
    spline
      .load("https://prod.spline.design/hoU1IRriLYqe4Tq4/scene.splinecode")
      .then(() => {
        addInteractions();
      });
  }

  function addInteractions() {
    // Find and interact with spline object
    const obj =
      spline.findObjectByName("obj") ||
      spline.findObjectById("8174f8a8-928a-4f7e-a036-a0942060badb");

    const position = obj.position;
    const rotation = obj.rotation;

    gsap.set(position, { y: -800 });

    gsap.to(position, {
      y: 80,
      duration: 3.2,
      ease: "expo.inOut",
    });

    gsap.to(rotation, {
      y: 0.24,
      duration: 3.2,
      ease: "expo.inOut",
      delay: -3.2, // Adjusted delay to synchronize with position animation
    });
  }
});
