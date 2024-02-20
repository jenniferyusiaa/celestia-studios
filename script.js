// Initiate splitting js

Splitting();

// Hambuger menu & navbar header

const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("hamburger-isactive");
  nav.classList.toggle("nav-isactive");
});

// Sliding text hero

const heroElements = document.querySelectorAll(
  ".hero-title, .hero-footer p:nth-of-type(1)"
);

heroElements.forEach((heroEl) => {
  gsap.to(heroEl, {
    xPercent: -85,
    scrollTrigger: {
      trigger: heroEl,
      start: "center center",
      end: "bottom top",
      scrub: 2.5,
    },
  });
});

const heroFooterCredit = document.querySelector(
  ".hero-footer p:nth-of-type(2)"
);

gsap.to(heroFooterCredit, {
  xPercent: 100,
  scrollTrigger: {
    trigger: heroFooterCredit,
    start: "center center",
    end: "bottom top",
    scrub: 0.25,
  },
});

// Text reveal intro

const introComps = gsap.utils.toArray(".intro-comp"); // Use the actual class name

introComps.forEach((introComp) => {
  const headings = introComp.querySelectorAll(".intro-comp-heading"); // Ensure correct class name

  headings.forEach((heading) => {
    const headingChar = heading.querySelectorAll(".char"); // Remove unnecessary nesting

    gsap.from(headingChar, {
      opacity: 0,
      yPercent: 100,
      stagger: 0.075,
      scrollTrigger: {
        trigger: heading,
        start: "top 75%",
        end: "bottom center",
        scrub: 0.25,
      },
    });
  });

  const paragraphs = introComp.querySelectorAll(".intro-comp-paragraph");

  paragraphs.forEach((paragraph) => {
    const paragraphChar = paragraph.querySelectorAll(".char");
    gsap.from(paragraphChar, {
      opacity: 0,
      yPercent: 100,
      stagger: 0.075,
      scrollTrigger: {
        trigger: paragraph,
        start: "top 75%",
        end: "bottom center",
        scrub: 0.25,
      },
    });
  });
});

// Images blur effect projects

const projectsImages = gsap.utils.toArray(".projects-images");

projectsImages.forEach((images) => {
  gsap.from(images, {
    filter: "blur(10px)",
    scrollTrigger: {
      trigger: images,
      start: "top bottom",
      end: "bottom center",
      scrub: 1,
    },
  });
});

// Text reveal whatwedo

const whatwedo = () => {
  const heading = document.querySelector(".whatwedo-heading");
  const headingChar = document.querySelectorAll(".whatwedo-heading .char");

  gsap.from(headingChar, {
    opacity: 0,
    yPercent: 100,
    stagger: 0.075,
    scrollTrigger: {
      trigger: heading,
      start: "top 90%",
      end: "bottom center",
      scrub: 1,
    },
  });
  const description = document.querySelector(".whatwedo-description");
  const descriptionChar = gsap.utils.toArray(".whatwedo-description .char");

  gsap.from(descriptionChar, {
    opacity: 0,
    xPercent: 100,
    stagger: 0.1,
    scrollTrigger: {
      trigger: description,
      start: "top 90%",
      end: "bottom center",
      scrub: 1,
    },
  });
};

whatwedo();

//  Services effects

const services = () => {
  // Image reveal on hover

  const links = document.querySelectorAll(".services a");
  const imagesSlider = document.querySelector(".services-slider");
  const images = document.querySelectorAll(".services-slider img");
  const cursor = document.querySelector(".services-cursor");

  document.addEventListener("mousemove", (ev) => {
    const { clientX, clientY } = ev;

    gsap.to(imagesSlider, {
      left: clientX,
      top: clientY,
      duration: 0.75,
      ease: "none",
    });

    gsap.to(cursor, {
      left: clientX,
      top: clientY,
      duration: 0.5,
      ease: "none",
    });
  });

  links.forEach((li, index) => {
    li.addEventListener("mouseover", () => {
      gsap.to(imagesSlider, {
        opacity: 0.85,
      });

      gsap.to(cursor, {
        opacity: 1,
      });

      const animationString = `${-index * 100}%`;

      gsap.to(images, {
        // transform: { translateY: `calc(100% - index * 100%)` },
        y: animationString,
        ease: "power1.inOut",
      });
    });
    li.addEventListener("mouseout", () => {
      gsap.to([imagesSlider, cursor], {
        opacity: 0,
      });
    });
  });

  // Text reveal on scroll

  const services = document.querySelector(".services");

  gsap.from(services, {
    opacity: 0,
    scrollTrigger: {
      trigger: services,
      start: "top center",
      end: "top 25%",
      scrub: 5,
    },
  });
};

services();

// Accordion services

const worktogether = () => {
  const minorTops = document.querySelectorAll(".worktogether-minor-top");

  minorTops.forEach((minorTop, index) => {
    const minorEnds = document.querySelectorAll(".worktogether-minor-end");
    const icons = document.querySelectorAll(".worktogether-minor-top-icons");

    minorTop.addEventListener("click", () => {
      const minorEnd = minorEnds[index];
      const icon = icons[index];

      icon.classList.toggle("worktogether-minor-top-icons-isactive");

      if (minorEnd.style.maxHeight) {
        minorEnd.style.maxHeight = null;
      } else {
        minorEnd.style.maxHeight = minorEnd.scrollHeight + "px";
      }
    });
  });
};

worktogether();

// Image slider testimonials

const testimonials = () => {
  const contents = document.querySelectorAll(".testimonials-contents");
  var currentIndex = 0;

  const initialize = () => {
    contents.forEach((co, index) => {
      if (index !== currentIndex) {
        co.style.opacity = 0;
      } else {
        co.style.opacity = 1;
      }

      const translation = -index * 100 + "%";
      co.style.transform = `translateX(${translation})`;
    });
    const mains = document.querySelectorAll(".testimonials-contents-main");
    const quotes = document.querySelectorAll(".testimonials-contents-quotes");
    const icons = document.querySelectorAll(
      ".testimonials-contents-main-icons"
    );

    const main = mains[currentIndex];
    main.addEventListener("click", () => {
      const quote = quotes[currentIndex];
      const icon = icons[currentIndex];

      quote.classList.toggle("testimonials-ishidden");
      icon.classList.toggle("testimonials-contents-main-icons-isrotate");
    });
  };
  initialize();

  let intervalId;

  const resetInterval = () => {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      currentIndex =
        currentIndex === contents.length - 1 ? 0 : currentIndex + 1;
      initialize();
    }, 5000);
  };

  resetInterval();

  const buttonBack = document.querySelector(".testimonials-button-back");
  const buttonForward = document.querySelector(".testimonials-button-forward");

  buttonBack.addEventListener("click", () => {
    currentIndex = currentIndex === 0 ? 2 : currentIndex - 1;
    initialize();
    resetInterval();
  });

  buttonForward.addEventListener("click", () => {
    currentIndex = currentIndex === contents.length - 1 ? 0 : currentIndex + 1;
    initialize();
    resetInterval();
  });

  // const mains = document.querySelectorAll(".testimonials-contents-main");

  // mains.forEach((mn) => {
  //   mn.addEventListener("click", () => {
  //     const quote = mn.querySelector(".testimonials-contents-quotes");
  //     if (quote.style.maxHeight) {
  //       quote.style.maxHeight = null;
  //     } else {
  //       quote.style.maxHeight = quote.scrollHeight + "px";
  //     }
  //   });
  // });
};

testimonials();
