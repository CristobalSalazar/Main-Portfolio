function resizePortfolioImages() {
  let projects = document.getElementsByClassName("project");
  for (let i = 0; i < projects.length; i++) {
    const element = projects.item(i);
    element.style.height = element.clientWidth.toString(10) + "px";
  }
}
window.addEventListener("load", resizePortfolioImages);
window.onresize = resizePortfolioImages;
