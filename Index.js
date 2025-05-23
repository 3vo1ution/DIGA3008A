document.addEventListener("DOMContentLoaded", function() {
    
const carousel = document.getElementById("Gallery"); // gets the row of images
const slides = Array.from(carousel.children); //gets all the images into an array
const prevButton = document.getElementById("Previous");
const nextButton = document.getElementById("Next");

let currentSlide = 0; 


function moveSlide() {
  const slideWidth = slides[0].getBoundingClientRect().width;
  carousel.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  
  // Remove active class from all slides
  slides.forEach(slide => {
    slide.classList.remove('CarouselItemActive');
    slide.style.filter = 'sepia(60%) hue-rotate(5deg)'; // Aged artifact effect
    slide.style.transition = 'transform 0.7s cubic-bezier(0.52, 0.13, 0.15, 1.1), filter 0.5s';
  });
  
  // Add active class to current slide
  slides[currentSlide].classList.add('CarouselItemActive');
  slides[currentSlide].style.filter = 'none'; // Clear filter for active slide
  slides[currentSlide].style.boxShadow = '0 0 20px #d4af37'; // Gold relic glow
}


function goNext() {
      if  (currentSlide < slides.length - 1) {
        currentSlide++;
        moveSlide();
    }
  }
function goPrev() {
      if (currentSlide > 0) {
      currentSlide--;
      moveSlide();
    }
  }


nextButton.addEventListener("click", () => {
  goNext();

});

prevButton.addEventListener("click", () => {
  goPrev();

  }); 
});