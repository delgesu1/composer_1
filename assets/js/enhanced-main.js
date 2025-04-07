// Enhanced JavaScript for Jane Doe Website

document.addEventListener('DOMContentLoaded', function() {
    // Navigation scroll effect
    const nav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    
    // Scroll event for navigation
    window.addEventListener('scroll', function() {
        // Add scrolled class to navigation
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Highlight active section in navigation
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Mobile menu toggle with improved animation
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Enhanced smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Cancel any ongoing scroll animations
                if (window.smoothScrollAnimationId) {
                    window.cancelAnimationFrame(window.smoothScrollAnimationId);
                }
                
                // Smooth scroll implementation
                const headerOffset = 80; // Adjust for fixed header
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                
                // No animation needed for very small distances
                if (Math.abs(distance) < 5) {
                    window.scrollTo(0, targetPosition);
                    return;
                }
                
                const duration = 800; // milliseconds
                let startTime = null;
                
                function scrollAnimation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / duration, 1);
                    
                    // Cubic bezier easing - smoother acceleration and deceleration
                    const easing = cubicBezier(0.33, 0.1, 0.25, 1.0, progress);
                    
                    window.scrollTo(0, startPosition + distance * easing);
                    
                    // Continue animation if not done
                    if (timeElapsed < duration) {
                        window.smoothScrollAnimationId = window.requestAnimationFrame(scrollAnimation);
                    }
                }
                
                // Cubic bezier function for smooth easing
                function cubicBezier(p0, p1, p2, p3, t) {
                    const ct = 1 - t;
                    return ct * ct * ct * p0 + 
                           3 * ct * ct * t * p1 + 
                           3 * ct * t * t * p2 + 
                           t * t * t * p3;
                }
                
                window.smoothScrollAnimationId = window.requestAnimationFrame(scrollAnimation);
            }
        });
    });
    
    // Works section tabs with enhanced transitions
    const tabButtons = document.querySelectorAll('.tab-button');
    const workCategories = document.querySelectorAll('.works-category');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and categories
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Enhanced category transition
            const categoryId = this.getAttribute('data-category');
            const targetCategory = document.getElementById(categoryId);
            
            // Fade out all categories
            workCategories.forEach(category => {
                if (category.classList.contains('active')) {
                    category.style.opacity = '0';
                    setTimeout(() => {
                        category.classList.remove('active');
                        // Fade in target category
                        targetCategory.classList.add('active');
                        setTimeout(() => {
                            targetCategory.style.opacity = '1';
                        }, 50);
                    }, 300);
                }
            });
            
            // If no categories are active, show target immediately
            if (!document.querySelector('.works-category.active')) {
                targetCategory.classList.add('active');
                setTimeout(() => {
                    targetCategory.style.opacity = '1';
                }, 50);
            }
        });
    });
    
    // Enhanced testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.slider-dot');
    let currentTestimonial = 0;
    
    // Initialize first testimonial
    testimonials[0].classList.add('active');
    
    // Function to show testimonial with enhanced transitions
    function showTestimonial(index) {
        // Remove active class from current testimonial with transition
        testimonials[currentTestimonial].classList.remove('active');
        dots[currentTestimonial].classList.remove('active');
        
        // Add active class to new testimonial with transition
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentTestimonial = index;
    }
    
    // Click event for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (index !== currentTestimonial) {
                showTestimonial(index);
            }
        });
    });
    
    // Auto rotate testimonials
    const testimonialInterval = setInterval(() => {
        const nextIndex = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(nextIndex);
    }, 5000);
    
    // Pause rotation on hover
    const testimonialContainer = document.querySelector('.testimonial-slider');
    if (testimonialContainer) {
        testimonialContainer.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        testimonialContainer.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(() => {
                const nextIndex = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(nextIndex);
            }, 5000);
        });
    }
    
    // Enhanced parallax effect for images
    const parallaxSlowElements = document.querySelectorAll('.parallax-slow');
    const parallaxMediumElements = document.querySelectorAll('.parallax-medium');
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const parallaxObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Observe all parallax elements
        parallaxSlowElements.forEach(element => {
            parallaxObserver.observe(element);
        });
        
        parallaxMediumElements.forEach(element => {
            parallaxObserver.observe(element);
        });
    }
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Only apply parallax to elements in view for better performance
        parallaxSlowElements.forEach(element => {
            if (element.classList.contains('in-view')) {
                const elementTop = element.getBoundingClientRect().top + scrollY;
                const elementBottom = elementTop + element.offsetHeight;
                
                if (scrollY > elementTop - window.innerHeight && scrollY < elementBottom) {
                    const speed = 0.1;
                    const yPos = (scrollY - elementTop) * speed;
                    element.style.transform = `translateY(${yPos}px)`;
                }
            }
        });
        
        parallaxMediumElements.forEach(element => {
            if (element.classList.contains('in-view')) {
                const elementTop = element.getBoundingClientRect().top + scrollY;
                const elementBottom = elementTop + element.offsetHeight;
                
                if (scrollY > elementTop - window.innerHeight && scrollY < elementBottom) {
                    const speed = 0.05;
                    const yPos = (scrollY - elementTop) * speed;
                    element.style.transform = `translateY(${yPos}px)`;
                }
            }
        });
    });
    
    // Enhanced form submission handling with validation
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    
    // Form validation function
    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
                
                // Add error message if not exists
                if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
                    const errorMessage = document.createElement('div');
                    errorMessage.classList.add('error-message');
                    errorMessage.textContent = 'This field is required';
                    input.parentNode.insertBefore(errorMessage, input.nextElementSibling);
                }
            } else {
                input.classList.remove('error');
                
                // Remove error message if exists
                if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
                    input.parentNode.removeChild(input.nextElementSibling);
                }
                
                // Email validation
                if (input.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        isValid = false;
                        input.classList.add('error');
                        
                        // Add error message if not exists
                        if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
                            const errorMessage = document.createElement('div');
                            errorMessage.classList.add('error-message');
                            errorMessage.textContent = 'Please enter a valid email address';
                            input.parentNode.insertBefore(errorMessage, input.nextElementSibling);
                        }
                    }
                }
            }
        });
        
        return isValid;
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(contactForm)) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.classList.add('success-message');
                successMessage.textContent = 'Thank you for your message. Jane will get back to you soon!';
                
                contactForm.parentNode.insertBefore(successMessage, contactForm.nextElementSibling);
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        contactForm.parentNode.removeChild(successMessage);
                    }, 300);
                }, 5000);
                
                contactForm.reset();
            }
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(newsletterForm)) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.classList.add('success-message');
                successMessage.textContent = 'Thank you for subscribing to Jane\'s newsletter!';
                
                newsletterForm.parentNode.insertBefore(successMessage, newsletterForm.nextElementSibling);
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        newsletterForm.parentNode.removeChild(successMessage);
                    }, 300);
                }, 5000);
                
                newsletterForm.reset();
            }
        });
    }
    
    // Enhanced audio player functionality
    const playPauseButton = document.querySelector('.play-pause');
    const progressBar = document.querySelector('.progress');
    const timeDisplay = document.querySelector('.time');
    
    if (playPauseButton) {
        let isPlaying = false;
        
        playPauseButton.addEventListener('click', function() {
            if (isPlaying) {
                // Pause audio logic would go here
                playPauseButton.classList.remove('playing');
                isPlaying = false;
                
                // Update UI
                timeDisplay.textContent = '0:00 / 3:45';
                progressBar.style.width = '0%';
            } else {
                // Play audio logic would go here
                playPauseButton.classList.add('playing');
                isPlaying = true;
                
                // Simulate progress for demo purposes
                let progress = 0;
                const duration = 225; // 3:45 in seconds
                
                const progressInterval = setInterval(() => {
                    progress++;
                    const percent = (progress / duration) * 100;
                    progressBar.style.width = `${percent}%`;
                    
                    const minutes = Math.floor(progress / 60);
                    const seconds = progress % 60;
                    timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds} / 3:45`;
                    
                    if (progress >= duration) {
                        clearInterval(progressInterval);
                        playPauseButton.classList.remove('playing');
                        isPlaying = false;
                    }
                }, 1000);
            }
        });
    }
    
    // Enhanced video player functionality
    const videoPlaceholder = document.querySelector('.video-placeholder');
    
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            // In a real implementation, this would load and play a video
            videoPlaceholder.classList.add('clicked');
            
            setTimeout(() => {
                videoPlaceholder.classList.remove('clicked');
                alert('Video would play here in a production environment.');
            }, 300);
        });
    }
    
    // Add scroll reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1
        });
        
        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        revealElements.forEach(element => {
            element.classList.add('revealed');
        });
    }
    
    // Initialize page with fade-in effect
    document.body.classList.add('loaded');
});

