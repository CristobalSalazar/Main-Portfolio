(function() {
  // Sections
  const intro = document.getElementById("intro-canvas");
  const about = document.getElementById("about");
  const skills = document.getElementById("skills");
  const education = document.getElementById("education");
  const resume = document.getElementById("resume");
  const testemonials = document.getElementById("testemonials");
  // Links
  const aboutLink = document.getElementById("about-link");
  const skillsLink = document.getElementById("skills-link");
  const educationLink = document.getElementById("education-link");
  const testemonialsLink = document.getElementById("testemonials-link");
  // Misc
  const aside = document.getElementById("side-list");

  const parralax = document.querySelector(".intro-text");

  if (breakpoints.sm) {
    window.addEventListener("scroll", e => {
      const rect = parralax.getBoundingClientRect();
      if (rect.bottom < 0) return;
      const percent = (rect.bottom / parralax.clientHeight) * 100;
      parralax.style.backgroundPositionY = `${percent.toFixed(2)}%`;
      parralax.style.backgroundSize = `500%`;
    });
  }

  // FUNCTIONS
  function scrollToElement(element) {
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - nav.clientHeight;
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
  function adjustTitleHeight() {
    var adjustedHeight = window.innerHeight - nav.clientHeight + "px";
    intro.style.height = adjustedHeight;
  }
  if (!breakpoints.sm) {
    // adjust sidebar height
    h1Offset = getComputedStyle(about.children[0]).marginTop;
    h1Offset = parseInt(h1Offset.substr(0, h1Offset.length - 2));
    aside.style.marginTop = h1Offset + "px";
    aside.style.top = nav.clientHeight + h1Offset + "px";
    adjustTitleHeight();
    window.addEventListener("resize", adjustTitleHeight);
  }

  function getBoundry(element) {
    return element.getBoundingClientRect().top - window.innerHeight / 2;
  }
  // TODO: DRY
  window.addEventListener("scroll", e => {
    let currentOpcaity =
      (parralax.getBoundingClientRect().bottom - nav.clientHeight) / parralax.clientHeight;
    if (currentOpcaity > 0) {
      parralax.style.opacity = currentOpcaity;
    }
    const aboutBoundry = getBoundry(about);
    const skillsBoundry = getBoundry(skills);
    const educationBoundry = getBoundry(education);
    const testemonialsBoundry = getBoundry(testemonials);

    // Sidebar Navigation
    if (testemonialsBoundry <= 0) {
      aboutLink.classList.remove("active");
      skillsLink.classList.remove("active");
      educationLink.classList.remove("active");
      testemonialsLink.classList.add("active");
      testemonials.classList.add("fadeIn");
    } else if (educationBoundry <= 0) {
      aboutLink.classList.remove("active");
      skillsLink.classList.remove("active");
      educationLink.classList.add("active");
      testemonialsLink.classList.remove("active");
      education.classList.add("fadeIn");
    } else if (skillsBoundry <= 0) {
      aboutLink.classList.remove("active");
      educationLink.classList.remove("active");
      skillsLink.classList.add("active");
      testemonialsLink.classList.remove("active");
      skills.classList.add("fadeIn");
    } else if (aboutBoundry <= 0) {
      educationLink.classList.remove("active");
      skillsLink.classList.remove("active");
      testemonialsLink.classList.remove("active");
      aboutLink.classList.add("active");
      about.classList.add("fadeIn");
    } else {
      aboutLink.classList.remove("active");
      skillsLink.classList.remove("active");
      educationLink.classList.remove("active");
    }
  });

  about.style.opacity = 0;
  skills.style.opacity = 0;
  education.style.opacity = 0;
  // resume.style.opacity = 0;
  testemonials.style.opacity = 0;

  onClickScrollTo(aboutLink, about);
  onClickScrollTo(skillsLink, skills);
  onClickScrollTo(educationLink, education);
  onClickScrollTo(testemonialsLink, testemonials);
})();
