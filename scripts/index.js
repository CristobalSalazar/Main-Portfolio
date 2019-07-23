(function() {
  // Sections
  const intro = document.getElementById("intro-canvas");
  const about = document.getElementById("about");
  const skills = document.getElementById("skills");
  const education = document.getElementById("education");
  const resume = document.getElementById("resume");
  // Links
  const aboutLink = document.getElementById("about-link");
  const skillsLink = document.getElementById("skills-link");
  const educationLink = document.getElementById("education-link");
  const resumeLink = document.getElementById("resume-link");
  // Misc
  const aside = document.getElementById("side-list");

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
  if (!breakpoints.s) {
    // adjust sidebar height
    h1Offset = getComputedStyle(about.children[0]).marginTop;
    h1Offset = parseInt(h1Offset.substr(0, h1Offset.length - 2));
    aside.style.marginTop = h1Offset + "px";
    aside.style.top = nav.clientHeight + h1Offset + "px";

    adjustTitleHeight();
    window.addEventListener("resize", adjustTitleHeight);
  }
  // Event Listeners
  // TODO: AUTOMATE PROCESS
  window.addEventListener("scroll", e => {
    const currentOpcaity =
      (intro.getBoundingClientRect().bottom - nav.clientHeight) / intro.clientHeight;
    if (currentOpcaity > 0) {
      intro.style.opacity = currentOpcaity;
    }

    const introAbout = (about.getBoundingClientRect().top + intro.getBoundingClientRect().top) / 2;
    const aboutSkills =
      (about.getBoundingClientRect().top + skills.getBoundingClientRect().top) / 2;
    const skillsEducation =
      (skills.getBoundingClientRect().top + education.getBoundingClientRect().top) / 2;
    const educationResume =
      (education.getBoundingClientRect().top + resume.getBoundingClientRect().top) / 2;

    // Sidebar Navigation
    if (educationResume <= 0) {
      aboutLink.classList.remove("active");
      skillsLink.classList.remove("active");
      educationLink.classList.remove("active");
      resumeLink.classList.add("active");
      resume.classList.add("fadeIn");
    } else if (skillsEducation <= 0) {
      aboutLink.classList.remove("active");
      skillsLink.classList.remove("active");
      educationLink.classList.add("active");
      resumeLink.classList.remove("active");
      education.classList.add("fadeIn");
    } else if (aboutSkills <= 0) {
      aboutLink.classList.remove("active");
      educationLink.classList.remove("active");
      skillsLink.classList.add("active");
      resumeLink.classList.remove("active");
      skills.classList.add("fadeIn");
    } else if (introAbout <= 0) {
      educationLink.classList.remove("active");
      skillsLink.classList.remove("active");
      resumeLink.classList.remove("active");
      aboutLink.classList.add("active");
      about.classList.add("fadeIn");
    } else {
      aboutLink.classList.remove("active");
      skillsLink.classList.remove("active");
      educationLink.classList.remove("active");
      resumeLink.classList.remove("active");
    }
  });

  about.style.opacity = 0;
  skills.style.opacity = 0;
  education.style.opacity = 0;
  resume.style.opacity = 0;

  onClickScrollTo(aboutLink, about);
  onClickScrollTo(skillsLink, skills);
  onClickScrollTo(educationLink, education);
  onClickScrollTo(resumeLink, resume);
})();
