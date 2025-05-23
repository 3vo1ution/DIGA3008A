document.addEventListener("DOMContentLoaded", function () {
    
    const toggleButton = document.getElementById("ToggleButton");
    const navLinks = document.querySelector(".NavLinks");
  
      if (toggleButton && navLinks) {
    toggleButton.addEventListener("click", function() {
      navLinks.classList.toggle("show");
    });
  }


  // Fullscreen functionality for all images
  const allImages = document.querySelectorAll('img');
  
  // Create exit button (styled to match your theme)
  const exitButton = document.createElement('button');
  exitButton.innerHTML = '&times;';
  exitButton.className = 'fullscreen-exit';
  exitButton.setAttribute('aria-label', 'Exit fullscreen');
  exitButton.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    background: rgba(0,0,0,0.7);
    color: #d4af37;
    border: 2px solid #d4af37;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 24px;
    cursor: pointer;
    display: none;
    transition: all 0.3s ease;
  `;
  document.body.appendChild(exitButton);

  // Fullscreen toggle function
  function toggleFullscreen(imgElement) {
    if (!document.fullscreenElement) {
      // Enter fullscreen
      imgElement.style.cssText = `
        max-width: 100% !important;
        max-height: 100% !important;
        width: auto !important;
        height: auto !important;
        object-fit: contain !important;
        background: rgba(0,0,0,0.9) !important;
      `;
      
      if (imgElement.requestFullscreen) {
        imgElement.requestFullscreen();
      } else if (imgElement.webkitRequestFullscreen) {
        imgElement.webkitRequestFullscreen();
      } else if (imgElement.msRequestFullscreen) {
        imgElement.msRequestFullscreen();
      }
      
      exitButton.style.display = 'block';
      
      // Add golden glow effect
      imgElement.style.boxShadow = '0 0 40px #d4af37';
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }

  // Click handler for all images
  allImages.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function() {
      toggleFullscreen(this);
    });
  });

  // Exit button handler
  exitButton.addEventListener('click', function() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  });

  // Handle fullscreen change to reset styles
  document.addEventListener('fullscreenchange', function() {
    if (!document.fullscreenElement) {
      allImages.forEach(img => {
        img.style.cssText = ''; // Reset all inline styles
        img.style.cursor = 'zoom-in'; // Maintain zoom cursor
      });
      exitButton.style.display = 'none';
    }
  });

  // Keyboard support
  document.addEventListener('keydown', function(e) {
    if (document.fullscreenElement) {
      if (e.key === 'Escape') {
        if (document.exitFullscreen) document.exitFullscreen();
      }
    }
  });
}); 
