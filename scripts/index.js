(function() {
  "use strict";
  // Sections
  const intro = document.getElementById("intro");
  const about = document.getElementById("about");
  const skills = document.getElementById("skills");
  const education = document.getElementById("education");
  const testemonials = document.getElementById("testemonials") || null;
  // Links
  const aboutLink = document.getElementById("about-link");
  const skillsLink = document.getElementById("skills-link");
  const educationLink = document.getElementById("education-link");
  const testemonialsLink = document.getElementById("testemonials-link");
  const aside = document.getElementById("side-list");

  // --- Handle Link Scrolling ---
  function scrollToElement(element) {
    const fpos = element.children[0].clientHeight;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - fpos / 2;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }

  function onClickScrollTo(clickElement, scrollElement) {
    clickElement.addEventListener("click", function(e) {
      e.preventDefault();
      scrollToElement(scrollElement);
    });
  }
  // --- Handle Active Links ---
  function getActiveBounds(element) {
    return element.getBoundingClientRect().top - nav.clientHeight;
  }

  function handleActiveSection(sections = [], links = []) {
    for (let i = sections.length - 1; i >= 0; i--) {
      if (getActiveBounds(sections[i]) <= 0) {
        for (let link of links) {
          link.classList.remove("active");
        }
        links[i].classList.add("active");
        return;
      }
    }
    for (let link of links) {
      link.classList.remove("active");
    }
  }
  // --- Handle Fades ---
  function getFadeBounds(element) {
    return element.getBoundingClientRect().top - window.innerHeight / 2;
  }

  function handleSectionFades(section) {
    if (getFadeBounds(section) <= 0) {
      section.classList.add("fadeIn");
    }
  }

  // ****** Events ******
  window.addEventListener("scroll", () => {
    // TODO: WRAP INSIDE FUNCTION

    let currentOpacity = intro.getBoundingClientRect().bottom / intro.clientHeight;
    if (currentOpacity > 0) {
      if (!breakpoints.sm) {
        nav.style.background = `rgba(255,255,255, ${1 - currentOpacity})`;
        nav.style.boxShadow = `0 0 0.618rem rgba(125,125,125,${1 - currentOpacity})`;
        nav.querySelector(".active").style.color = `rgb(${currentOpacity * 255},${currentOpacity *
          255},${currentOpacity * 255})`;
        intro.style.opacity = currentOpacity;
      } else {
        intro.style.opacity = currentOpacity;
      }
    } else {
      if (!breakpoints.sm) {
        nav.style.background = "white";
        nav.querySelector(".active").style.color = `black`;
        intro.style.opacity = 0;
      } else {
        intro.style.opacity = 0;
      }
    }

    handleActiveSection(
      [about, skills, education, testemonials],
      [aboutLink, skillsLink, educationLink, testemonialsLink]
    );
    handleSectionFades(about);
    handleSectionFades(skills);
    handleSectionFades(education);
    handleSectionFades(testemonials);
    if (getFadeBounds(testemonials) < 0) {
      let time = 0;
      for (let i = 1; i < testemonials.children.length; i++) {
        setTimeout(() => {
          testemonials.children[i].classList.add("slideIn");
        }, time);
        time += 100;
      }
    }
  });

  onClickScrollTo(aboutLink, about);
  onClickScrollTo(skillsLink, skills);
  onClickScrollTo(educationLink, education);
  onClickScrollTo(testemonialsLink, testemonials);

  about.style.opacity = 0;
  skills.style.opacity = 0;
  education.style.opacity = 0;
  testemonials.style.opacity = 0;

  if (!breakpoints.sm) {
    nav.style.background = "transparent";
    nav.style.boxShadow = "0 0 0 transparent";
    nav.querySelector(".active").style.color = `white`;
  } else {
    nav.style.display = "none";
  }
  if (!breakpoints.md) {
    let h1Offset = getComputedStyle(about.children[0]).marginTop;
    h1Offset = parseInt(h1Offset.substr(0, h1Offset.length - 2));
    aside.style.marginTop = h1Offset + "px";
    aside.style.top = nav.clientHeight + h1Offset + "px";
  }
})();
