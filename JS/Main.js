document.addEventListener("DOMContentLoaded", function () {
  // Toggle button functionality (unchanged)
  const toggleButton = document.getElementById("ToggleButton");
  const navLinks = document.querySelector(".NavLinks");
  
  if (toggleButton && navLinks) {
    toggleButton.addEventListener("click", function() {
      navLinks.classList.toggle("show");
      navLinks.classList.toggle('Active');
    });
  }

  // Fullscreen functionality
  const allImages = document.querySelectorAll('img');
  let currentFullscreenIndex = 0;
  let fullscreenImages = [];


  // Add event listeners
  exitButton.addEventListener('click', exitFullscreen);
  prevButton.addEventListener('click', () => navigateFullscreen(-1));
  nextButton.addEventListener('click', () => navigateFullscreen(1));

  // Image click handler
  allImages.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function() {
      enterFullscreen(this);
    });
  });

  // Keyboard support
  document.addEventListener('keydown', function(e) {
    if (document.fullscreenElement) {
      switch(e.key) {
        case 'Escape':
          exitFullscreen();
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          navigateFullscreen(-1);
          e.preventDefault();
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          navigateFullscreen(1);
          e.preventDefault();
          break;
      }
    }
  });

  // Helper function to create control buttons
  function createControlButton(html, className, ariaLabel) {
    const button = document.createElement('button');
    button.innerHTML = html;
    button.className = className;
    button.setAttribute('aria-label', ariaLabel);
    document.body.appendChild(button);
    return button;
  }

  // Enter fullscreen
  function enterFullscreen(imgElement) {
    fullscreenImages = Array.from(allImages).filter(img => img.src);
    currentFullscreenIndex = fullscreenImages.indexOf(imgElement);
    
    imgElement.classList.add('fullscreen-image');
    
    if (imgElement.requestFullscreen) {
      imgElement.requestFullscreen();
    } else if (imgElement.webkitRequestFullscreen) {
      imgElement.webkitRequestFullscreen();
    } else if (imgElement.msRequestFullscreen) {
      imgElement.msRequestFullscreen();
    }
    
    showControls();
  }

  // Exit fullscreen
  function exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }

  // Navigate between images
  function navigateFullscreen(direction) {
    if (!document.fullscreenElement) return;
    
    currentFullscreenIndex += direction;
    
    // Loop around if at ends
    if (currentFullscreenIndex < 0) {
      currentFullscreenIndex = fullscreenImages.length - 1;
    } else if (currentFullscreenIndex >= fullscreenImages.length) {
      currentFullscreenIndex = 0;
    }
    
    // Exit current fullscreen
    exitFullscreen();
    
    // Small delay to allow exit to complete
    setTimeout(() => {
      enterFullscreen(fullscreenImages[currentFullscreenIndex]);
    }, 100);
  }

  // Show/hide controls
  function showControls() {
    [exitButton, prevButton, nextButton].forEach(btn => {
      btn.style.display = 'block';
    });
  }

  function hideControls() {
    [exitButton, prevButton, nextButton].forEach(btn => {
      btn.style.display = 'none';
    });
  }

  // Handle fullscreen change
  document.addEventListener('fullscreenchange', function() {
    if (!document.fullscreenElement) {
      allImages.forEach(img => {
        img.classList.remove('fullscreen-image');
        img.style.cursor = 'zoom-in';
      });
      hideControls();
    }
  });
});