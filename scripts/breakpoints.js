var breakpoints = {
  xl: document.body.clientWidth < 1440,
  lg: document.body.clientWidth < 1024,
  md: document.body.clientWidth < 768,
  sm: document.body.clientWidth < 500,
  xs: document.body.clientWidth < 320
};

if (!breakpoints.md) {
  window.addEventListener("resize", () => {
    breakpoints = {
      xl: document.body.clientWidth < 1440,
      lg: document.body.clientWidth < 1024,
      md: document.body.clientWidth < 768,
      sm: document.body.clientWidth < 500,
      xs: document.body.clientWidth < 320
    };
  });
}