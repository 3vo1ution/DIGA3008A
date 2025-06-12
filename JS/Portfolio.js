document.addEventListener("DOMContentLoaded", function() {
    // Recent Works Carousel
    const recentWorksCarousel = document.querySelector('.RecentWorksTrack');
    const recentSlides = document.querySelectorAll('.RecentWorksSlide');
    const prevButton = document.querySelector('.CarouselButtonPrev');
    const nextButton = document.querySelector('.CarouselButtonNext');
    let currentSlideIndex = 0;

    function updateRecentCarousel() {
        const slideWidth = recentSlides[0].getBoundingClientRect().width;
        recentWorksCarousel.style.transform = `translateX(-${currentSlideIndex * (slideWidth + 24)}px)`;
        
        recentSlides.forEach((slide, index) => {
            slide.classList.toggle('RecentWorksSlideActive', index === currentSlideIndex);
        });
    }

    function goNext() {
        if (currentSlideIndex < recentSlides.length - 1) {
            currentSlideIndex++;
            updateRecentCarousel();
        }
    }

    function goPrev() {
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
            updateRecentCarousel();
        }
    }

    nextButton.addEventListener('click', goNext);
    prevButton.addEventListener('click', goPrev);

    // Digital Art Gallery Hover Effect
    digitalArtItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('.DigitalArtCaption').style.transform = 'translateY(0)';
        });
        item.addEventListener('mouseleave', () => {
            item.querySelector('.DigitalArtCaption').style.transform = 'translateY(100%)';
        });
    });

    // Digital Art Gallery Zoom Effect
const digitalArtItems = document.querySelectorAll('.DigitalArtItem');
digitalArtItems.forEach(item => {
    const img = item.querySelector('img');
    
    // Store original image source for high-res version
    const originalSrc = img.src;
    const highResSrc = originalSrc.replace(/(\.\w+)$/, '_highres$1');
    
    // Preload high-res image
    const highResImage = new Image();
    highResImage.src = highResSrc;
    
    item.addEventListener('mouseenter', () => {
        // Switch to high-res version if available
        if (highResImage.complete) {
            img.src = highResSrc;
        }
        
        // Calculate natural aspect ratio
        const naturalRatio = img.naturalWidth / img.naturalHeight;
        const containerRatio = item.clientWidth / item.clientHeight;
        
        // Adjust zoom based on image orientation
        if (naturalRatio > containerRatio) {
            // Landscape - fit to width
            img.style.transform = 'scale(1.2)';
        } else {
            // Portrait - fit to height
            img.style.transform = 'scale(1.4)';
        }
        
        item.querySelector('.DigitalArtCaption').style.transform = 'translateY(0)';
    });
    
    item.addEventListener('mouseleave', () => {
        // Revert to original image
        img.src = originalSrc;
        img.style.transform = 'scale(1)';
        img.style.objectFit = 'cover';
        item.querySelector('.DigitalArtCaption').style.transform = 'translateY(100%)';
    });
});

  // Photography Grid Aspect Ratio Handling
    const photoItems = document.querySelectorAll('.PhotoGridItem');
    photoItems.forEach(item => {
        const img = item.querySelector('img');
        
        // Wait for image to load
        if (img.complete) {
            setAspectRatio(img);
        } else {
            img.addEventListener('load', function() {
                setAspectRatio(img);
            });
        }
    });

    function setAspectRatio(img) {
        const naturalRatio = img.naturalWidth / img.naturalHeight;
        img.setAttribute('data-aspect', naturalRatio > 1 ? 'landscape' : 'portrait');
    }

    // Carousel Functionality 
    const carousels = document.querySelectorAll('.Carousel');
    carousels.forEach(carousel => {
        const slides = Array.from(carousel.children);
        const prevBtn = carousel.parentElement.querySelector('.CarouselButtonPrev');
        const nextBtn = carousel.parentElement.querySelector('.CarouselButtonNext');
        let currentSlide = 0;

        function moveSlide() {
            const slideWidth = slides[0].getBoundingClientRect().width;
            carousel.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
            
            slides.forEach(slide => {
                slide.classList.remove('CarouselItemActive');
                slide.style.filter = 'sepia(60%) hue-rotate(5deg)';
            });
            
            slides[currentSlide].classList.add('CarouselItemActive');
            slides[currentSlide].style.filter = 'none';
        }

        function handleNext() {
            if (currentSlide < slides.length - 1) {
                currentSlide++;
                moveSlide();
            }
        }

        function handlePrev() {
            if (currentSlide > 0) {
                currentSlide--;
                moveSlide();
            }
        }

        if (prevBtn) prevBtn.addEventListener('click', handlePrev);
        if (nextBtn) nextBtn.addEventListener('click', handleNext);

        // Touch support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});

        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                handleNext();
            }
            if (touchEndX > touchStartX + 50) {
                handlePrev();
            }
        }
    });

    // Animation Controls
    const animationItems = document.querySelectorAll('.AnimationItem');
    animationItems.forEach(item => {
        const playButton = item.querySelector('.AnimationPlayButton');
        const fullscreenButton = item.querySelector('.AnimationFullscreenButton');
        const animation = item.querySelector('img, video');

        if (playButton && animation) {
            playButton.addEventListener('click', () => {
                if (animation.paused) {
                    animation.play();
                    playButton.textContent = 'Pause';
                } else {
                    animation.pause();
                    playButton.textContent = 'Play';
                }
            });
        }

        if (fullscreenButton && animation) {
            fullscreenButton.addEventListener('click', () => {
                if (animation.requestFullscreen) {
                    animation.requestFullscreen();
                } else if (animation.webkitRequestFullscreen) {
                    animation.webkitRequestFullscreen();
                } else if (animation.msRequestFullscreen) {
                    animation.msRequestFullscreen();
                }
            });
        }
    });
});