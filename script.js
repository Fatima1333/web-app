// Mobile Menu Toggle (runs immediately)
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// Reviews Slider (runs immediately)
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Add active class to current slide and dot
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Event listeners for slider
if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
}

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Auto-play slider
let sliderInterval;
if (slides.length > 0) {
    sliderInterval = setInterval(nextSlide, 5000);

    // Pause auto-play on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(sliderInterval);
        });
        sliderContainer.addEventListener('mouseleave', () => {
            sliderInterval = setInterval(nextSlide, 5000);
        });
    }
}

// Form Validation and Submission
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const goal = document.getElementById('goal').value;
        const message = document.getElementById('message').value.trim();

        // Reset message
        formMessage.className = 'form-message';
        formMessage.textContent = '';

        // Validation
        if (!name) {
            showFormMessage('Please enter your name.', 'error');
            return;
        }

        if (!email || !validateEmail(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        if (!phone || !validatePhone(phone)) {
            showFormMessage('Please enter a valid phone number.', 'error');
            return;
        }

        if (!goal) {
            showFormMessage('Please select your fitness goal.', 'error');
            return;
        }

        if (!message) {
            showFormMessage('Please enter a message.', 'error');
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Submit form (Formspree will handle this)
        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showFormMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
                contactForm.reset();
            } else {
                showFormMessage('Oops! Something went wrong. Please try again later.', 'error');
            }
        } catch (error) {
            showFormMessage('Oops! Something went wrong. Please try again later.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

function showFormMessage(message, type) {
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (backToTopBtn) {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Header scroll effect
const header = document.getElementById('header');

if (header) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        }
    });
}

// GSAP Animations - Wait for GSAP to load
function initGSAPAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        // Retry after a short delay
        setTimeout(initGSAPAnimations, 100);
        return;
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animations
    gsap.from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
    });

    gsap.from('.hero-buttons', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out'
    });

    gsap.from('.hero-visual', {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        delay: 0.4,
        ease: 'power3.out'
    });

    gsap.from('.stat-item', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Animate service cards
    gsap.utils.toArray('.service-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            delay: index * 0.1
        });
    });

    // Animate class cards
    gsap.utils.toArray('.class-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            delay: index * 0.1
        });
    });

    // Animate trainer cards
    gsap.utils.toArray('.trainer-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            delay: index * 0.1
        });
    });

    // Animate pricing cards
    gsap.utils.toArray('.pricing-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            delay: index * 0.2
        });
    });

    // Animate testimonial cards
    gsap.utils.toArray('.testimonial-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            delay: index * 0.1
        });
    });

    // Animate section titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Hover glow effects
    const addHoverGlow = (selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                gsap.to(element, {
                    boxShadow: '0 10px 40px rgba(30, 144, 255, 0.5)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            element.addEventListener('mouseleave', () => {
                gsap.to(element, {
                    boxShadow: '0 4px 15px rgba(30, 144, 255, 0.4)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    };

    addHoverGlow('.btn-primary');
    addHoverGlow('.class-card');
    addHoverGlow('.service-card');
    addHoverGlow('.trainer-card');

    // Initialize animations on load
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });
}

// Start GSAP animations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGSAPAnimations);
} else {
    initGSAPAnimations();
}
