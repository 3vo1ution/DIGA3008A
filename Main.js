document.addEventListener("DOMContentLoaded", function () {
    
    const toggleButton = document.getElementById("ToggleButton");
    const navLinks = document.querySelector(".NavLinks");
  
    toggleButton.addEventListener("click", function () {
      navLinks.classList.toggle("show");
    });


  });