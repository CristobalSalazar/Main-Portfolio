(function() {
  //elements
  const intro = document.getElementById("intro");
  const about = document.getElementById("about");
  const skills = document.getElementById("skills");
  const education = document.getElementById("education");
  const aside = document.getElementById("side-list");
  const aboutLink = document.getElementById("about-link");
  const skillsLink = document.getElementById("skills-link");
  const educationLink = document.getElementById("education-link");

  // adjust sidebar height
  h1Offset = getComputedStyle(about.children[0]).marginTop;
  h1Offset = parseInt(h1Offset.substr(0, h1Offset.length - 2));
  aside.style.marginTop = h1Offset + "px";
  aside.style.top = nav.clientHeight + h1Offset + "px";

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
  function adjustTitleHeight() {
    var adjustedHeight = window.innerHeight - nav.clientHeight + "px";
    intro.style.height = adjustedHeight;
  }
  adjustTitleHeight();
  // Event Listeners
  window.addEventListener("resize", adjustTitleHeight);
  window.addEventListener("scroll", e => {
    const aboutSkills =
      (about.getBoundingClientRect().top + skills.getBoundingClientRect().top) / 2;
    const skillsEducation =
      (skills.getBoundingClientRect().top + education.getBoundingClientRect().top) / 2;
    if (skillsEducation <= 0) {
      educationLink.classList.add("active");
      aboutLink.classList.remove("active");
      skillsLink.classList.remove("active");
    } else if (aboutSkills <= 0) {
      skillsLink.classList.add("active");
      aboutLink.classList.remove("active");
      educationLink.classList.remove("active");
    } else if (about.getBoundingClientRect().top <= h1Offset + nav.clientHeight) {
      aboutLink.classList.add("active");
      skillsLink.classList.remove("active");
      educationLink.classList.remove("active");
    } else {
      aboutLink.classList.remove("active");
      skillsLink.classList.remove("active");
      educationLink.classList.remove("active");
    }
  });

  intro.addEventListener("click", function(e) {
    e.preventDefault();
    scrollToElement(about);
  });
  about.addEventListener("click", function(e) {
    e.preventDefault();
    scrollToElement(skills);
  });
  skills.addEventListener("click", function(e) {
    e.preventDefault();
    scrollToElement(education);
  });

  aboutLink.addEventListener("click", function(e) {
    e.preventDefault();
    scrollToElement(about);
  });

  skillsLink.addEventListener("click", function(e) {
    e.preventDefault();
    scrollToElement(skills);
  });
  educationLink.addEventListener("click", function(e) {
    e.preventDefault();
    scrollToElement(education);
  });
})();
