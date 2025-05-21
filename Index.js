document.addEventListener("DOMContentLoaded", function() {
    
const carousel = document.getElementById("Gallery"); // gets the row of images
const slides = Array.from(carousel.children); //gets all the images into an array
const prevButton = document.getElementById("Previous");
const nextButton = document.getElementById("Next");

let currentSlide = 0; 

function moveSlide () {
    const slideWidth = slides[0].getBoundingClientRect().width; // gets the width of the image
    carousel.style.transform = `translateX(-${currentSlide * slideWidth}px)`; // moves the image to the left by the width of the image
}

nextButton.addEventListener("click", () => {
    if  (currentSlide < slides.length - 1) {
        currentSlide++;
        moveSlide();
    }
});

prevButton.addEventListener("click", () => {
    if (currentSlide > 0) {
      currentSlide--;
      moveSlide();
    }
  });

  // Fullscreen functionality
  const images = document.querySelectorAll(".CarouselItem");
  const activeImage = document.querySelector(".CarouselItemActive");

  images.forEach((image) => {
      image.addEventListener("click", () => {
          if (image.requestFullscreen) {
              image.requestFullscreen(); // ForStandardBrowser
          } else if (image.webkitRequestFullscreen) {
              image.webkitRequestFullscreen(); // ForSafari

          } else if (image.msRequestFullscreen) {
              image.msRequestFullscreen(); // For MicrosoftEdge
          } 
      });

    });

    // Fullscreen functionality for the active image
    activeImage.addEventListener("click", () => {
        if (activeImage.requestFullscreen) {
          activeImage.requestFullscreen();
        } else if (activeImage.webkitRequestFullscreen) {
          activeImage.webkitRequestFullscreen();
        } else if (activeImage.msRequestFullscreen) {
          activeImage.msRequestFullscreen();
        }
      });

});