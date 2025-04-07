// Main JavaScript for Jane Doe Website

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
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Works section tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    const workCategories = document.querySelectorAll('.works-category');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and categories
            tabButtons.forEach(btn => btn.classList.remove('active'));
            workCategories.forEach(category => category.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding category
            const categoryId = this.getAttribute('data-category');
            document.getElementById(categoryId).classList.add('active');
        });
    });
    
    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.slider-dot');
    let currentTestimonial = 0;
    
    // Function to show testimonial
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.style.opacity = 0);
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].style.opacity = 1;
        dots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    // Click event for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Auto rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Parallax effect for images
    const parallaxSlowElements = document.querySelectorAll('.parallax-slow');
    const parallaxMediumElements = document.querySelectorAll('.parallax-medium');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        parallaxSlowElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top + scrollY;
            const elementBottom = elementTop + element.offsetHeight;
            
            if (scrollY > elementTop - window.innerHeight && scrollY < elementBottom) {
                const speed = 0.1;
                const yPos = (scrollY - elementTop) * speed;
                element.style.transform = `translateY(${yPos}px)`;
            }
        });
        
        parallaxMediumElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top + scrollY;
            const elementBottom = elementTop + element.offsetHeight;
            
            if (scrollY > elementTop - window.innerHeight && scrollY < elementBottom) {
                const speed = 0.05;
                const yPos = (scrollY - elementTop) * speed;
                element.style.transform = `translateY(${yPos}px)`;
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real implementation, this would send the form data to a server
            alert('Thank you for your message. Jane will get back to you soon!');
            contactForm.reset();
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real implementation, this would subscribe the user to a newsletter
            alert('Thank you for subscribing to Jane\'s newsletter!');
            newsletterForm.reset();
        });
    }
    
    // Audio player functionality
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
            } else {
                // Play audio logic would go here
                playPauseButton.classList.add('playing');
                isPlaying = true;
            }
        });
    }
    
    // Video player functionality
    const videoPlaceholder = document.querySelector('.video-placeholder');
    
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            // In a real implementation, this would load and play a video
            alert('Video would play here in a production environment.');
        });
    }
});
