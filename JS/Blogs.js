document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("ToggleButton");
  const blogNav = document.getElementById("BlogNav");

  if (hamburger && blogNav) {
    hamburger.addEventListener("click", () => {
      blogNav.classList.toggle("Active");

     
      document.body.classList.toggle("NoScroll");
    });
  }
});
