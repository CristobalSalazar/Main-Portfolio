var open = false;
const navSpacer = document.getElementById("nav-spacer");
const nav = document.querySelector("nav");

if (window.innerWidth < 400) {
  nav.style.display = "none";
}

if (navSpacer) {
  navSpacer.style.height = nav.clientHeight + "px";
}

function dropdownToggle() {
  let mobileNav = document.getElementById("mobileNav");
  let navLayout = document.getElementsByClassName("navLayout").item(0);
  open = !open;
  if (open) {
    navLayout.style.display = "inline";
  } else {
    navLayout.style.display = "none";
    mobileNav.style.opacity = "1";
  }
}
