// loader-example/loader.js

// Wait for the entire page (including images, stylesheets) to load
window.addEventListener('load', function() {
    const loader = document.querySelector('.page-loader');
    const body = document.body;

    // Ensure the loader element exists in the HTML
    if (loader) {
        // Wait a bit (e.g., 1500ms) for the loader animation to be shown
        // Adjust this delay (in milliseconds) as needed
        setTimeout(() => {
            // Add 'loaded' class to the body. CSS uses this to fade in #main-content.
            body.classList.add('loaded');

            // Add 'hidden' class to the loader. CSS uses this to fade out the loader.
            loader.classList.add('hidden');

            // Optional: Remove the loader element from the DOM after its fade-out transition completes.
            // The timeout duration should match the transition duration in CSS (0.5s = 500ms).
            setTimeout(() => {
                if (loader.parentNode) {
                   loader.parentNode.removeChild(loader);
                }
            }, 500);
        }, 1500); // Delay before starting fade-out/fade-in
    } else {
        // Fallback: If the loader element wasn't found, immediately mark the body as loaded
        // to ensure the main content becomes visible.
        console.warn('Page loader element not found. Showing main content immediately.');
        body.classList.add('loaded');
    }
});
