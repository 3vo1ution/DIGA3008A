document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("ToggleButton");
  const blogNav = document.getElementById("BlogNav");

  if (hamburger && blogNav) {
    hamburger.addEventListener("click", () => {
      blogNav.classList.toggle("Active");

     
      // Toggle body scroll lock and navbar scrolling
      if (blogNav.classList.contains("Active")) {
        document.body.style.overflow = "hidden";
        blogNav.style.overflowY = "auto";
      } else {
        document.body.style.overflow = "";
        blogNav.style.overflowY = "";
      }
    });
  }
});
