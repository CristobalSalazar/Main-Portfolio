var open = false;
const navSpacer = document.getElementById("nav-spacer");
const nav = document.querySelector(".navbar");

function setNav() {
  if (breakpoints.md) {
    nav.style.display = "none";
  } else if (navSpacer) {
    navSpacer.style.height = nav.clientHeight + "px";
  }
}
setNav();

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

if (breakpoints.md) {
  window.addEventListener("scroll", e => {
    handleNavDisplay(e);
  });
}
