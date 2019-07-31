var breakpoints = {
  xl: document.body.clientWidth < 1440,
  lg: document.body.clientWidth < 1024,
  md: document.body.clientWidth < 800,
  sm: document.body.clientWidth < 500,
  xs: document.body.clientWidth < 320
};

window.addEventListener("resize", () => {
  breakpoints = {
    xl: document.body.clientWidth < 1440,
    lg: document.body.clientWidth < 1024,
    md: document.body.clientWidth < 800,
    sm: document.body.clientWidth < 500,
    xs: document.body.clientWidth < 320
  };
});