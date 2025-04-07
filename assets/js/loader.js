// Jane Doe - Musical Stave Loader

// Wait for DOM to be ready before setting up loader
document.addEventListener('DOMContentLoaded', function() {
    // Initial setup - pre-hide main content but don't affect visibility
    const mainContent = document.getElementById('main-content');
    
    if (mainContent) {
        mainContent.style.opacity = '0';
        // Don't set visibility to hidden, just use opacity
    }
    
    // Reset scroll position
    window.scrollTo(0, 0);
    
    // Immediately prepare the lines for animation once DOM is ready
    const loader = document.querySelector('.page-loader');
    if (loader) {
        const staveLines = loader.querySelectorAll('.stave-line');
        const loaderName = loader.querySelector('.loader-name');
        
        // Make sure name is stable before showing
        if (loaderName) {
            // Ensure font is displaying correctly from the start
            loaderName.style.opacity = '0';
            setTimeout(() => {
                loaderName.style.opacity = '0.95';
            }, 50);
        }
        
        // Pre-set the lines for animation
        staveLines.forEach(line => {
            line.style.transition = 'transform 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.8s ease';
        });
    }
});

// Wait for all resources to load (images, fonts, etc.)
window.addEventListener('load', function() {
    const loader = document.querySelector('.page-loader');
    const body = document.body;
    const mainContent = document.getElementById('main-content');
    
    // Ensure we start at the top of the page
    window.scrollTo(0, 0);
    
    if (loader) {
        // Extended delay before starting animation (increased from 200ms to 1000ms)
        setTimeout(() => {
            // Ensure main content is ready to be shown
            if (mainContent) {
                mainContent.style.display = ''; // Reset any display:none that might be set
            }
            
            // Fade out loader immediately without the second timeout
            loader.classList.add('hidden');
            
            // Fade in content - make sure the class is added
            document.body.classList.add('loaded');
            
            // Make sure we're at the top of the page when content appears
            window.scrollTo(0, 0);
            
            // Remove loader from DOM after transition completes
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                    
                    // Final check to ensure we're at the top
                    window.scrollTo(0, 0);
                }
            }, 800); // Match the transition duration in CSS
        }, 1000); // Extended delay - now loader stays visible longer
    } else {
        // Fallback if loader element isn't found
        console.warn('Loader element not found. Displaying content immediately.');
        document.body.classList.add('loaded');
        
        // Ensure main content is visible in fallback case
        if (mainContent) {
            mainContent.style.opacity = '1';
            mainContent.style.visibility = 'visible';
        }
        
        // Ensure we're at the top of the page even in fallback case
        window.scrollTo(0, 0);
    }
}); 