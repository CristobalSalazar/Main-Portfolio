var open = false;
const navSpacer = document.getElementById("nav-spacer");
const nav = document.querySelector(".navbar");

if (breakpoints.sm) {
  nav.style.display = "none";
  nav.querySelector(".navbar-brand").style.display = "none";
  // nav.querySelector(".navbar-left").style.display = "none";
  nav.querySelector(".navbar-right").style.display = "none";
} else if (navSpacer) {
  navSpacer.style.height = nav.clientHeight + "px";
}

var __prevScroll = 0;
var scrollDir = 0;
function handleNavDisplay(e) {
  const currentScroll = document.body.getBoundingClientRect().top;
  const threshold = 10;
  if (currentScroll > __prevScroll + threshold) {
    nav.style.display = "flex";
    scrollDir = 1;
    __prevScroll = currentScroll;
  } else if (currentScroll < __prevScroll - threshold) {
    scrollDir = -1;
    __prevScroll = currentScroll;
  }
  if (scrollDir === 1) {
    nav.classList.add("navbar-show");
    nav.classList.remove("navbar-hide");
  } else if (scrollDir === -1) {
    nav.classList.add("navbar-hide");
    nav.classList.remove("navbar-show");
  }
}
if (breakpoints.sm) {
  window.addEventListener("scroll", e => {
    handleNavDisplay(e);
  });
}
