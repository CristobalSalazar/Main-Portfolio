var breakpoints = {
  xl: document.body.clientWidth < 1440,
  l: document.body.clientWidth < 1024,
  m: document.body.clientWidth < 768,
  s: document.body.clientWidth < 425,
  xs: document.body.clientWidth < 320
};
window.addEventListener("resize", () => {
  breakpoints = {
    xl: document.body.clientWidth < 1440,
    l: document.body.clientWidth < 1024,
    m: document.body.clientWidth < 768,
    s: document.body.clientWidth < 425,
    xs: document.body.clientWidth < 320
  };
  console.log(breakpoints);
});
