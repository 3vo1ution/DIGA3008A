// WritingNav.js - For Desktop Navigation
document.addEventListener("DOMContentLoaded", function() {
    const writingNav = document.querySelector(".WritingNav");
    
    if (writingNav) {
        // Show/hide on hover for desktop
        if (window.innerWidth > 768) {
            writingNav.style.opacity = '0';
            writingNav.style.pointerEvents = 'none';
            writingNav.style.transform = 'translateY(-50%) translateX(-20px)';
            
            // Show on hover of left edge
            document.addEventListener('mousemove', function(e) {
                if (e.clientX < 60) { // When mouse is near left edge
                    writingNav.style.opacity = '1';
                    writingNav.style.pointerEvents = 'auto';
                    writingNav.style.transform = 'translateY(-50%) translateX(0)';
                } else if (!writingNav.matches(':hover') && e.clientX > 200) {
                    writingNav.style.opacity = '0';
                    writingNav.style.pointerEvents = 'none';
                    writingNav.style.transform = 'translateY(-50%) translateX(-20px)';
                }
            });
            
            // Keep visible when hovering nav
            writingNav.addEventListener('mouseenter', function() {
                this.style.opacity = '1';
                this.style.pointerEvents = 'auto';
                this.style.transform = 'translateY(-50%) translateX(0)';
            });
            
            writingNav.addEventListener('mouseleave', function() {
                this.style.opacity = '0';
                this.style.pointerEvents = 'none';
                this.style.transform = 'translateY(-50%) translateX(-20px)';
            });
        }
    }
});