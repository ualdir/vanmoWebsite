// Professional JavaScript Implementation for Website

// Mobile Menu
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
});

// Typewriter Effect
const typewriter = (element, text, delay) => {
    let index = 0;
    const typingEffect = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
        } else {
            clearInterval(typingEffect);
        }
    }, delay);
};

document.addEventListener('DOMContentLoaded', () => {
    const element = document.querySelector('.typewriter');
    typewriter(element, 'Welcome to our website!', 150);
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Reveal Animations
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        if (elementBottom < windowHeight - 100) {
            element.classList.add('active');
        }
    });
};
window.addEventListener('scroll', revealOnScroll);

// Header Shadow
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('shadow');
    } else {
        header.classList.remove('shadow');
    }
});

// Active Nav Links
document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav a');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 0 && sectionTop + section.offsetHeight >= 0) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === section.id) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Marquee Duplication
const marquee = document.querySelector('.marquee');
const marqueeClone = marquee.cloneNode(true);
marquee.appendChild(marqueeClone);

// Form Validation
const form = document.querySelector('.form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = form.querySelectorAll('input[required]');
    let valid = true;
    inputs.forEach(input => {
        if (!input.value) {
            valid = false;
            input.classList.add('error');
            input.setCustomValidity('This field cannot be empty');
        } else {
            input.classList.remove('error');
            input.setCustomValidity('');
        }
    });
    if (valid) {
        form.submit();
    }
});

// Dark Mode
const toggleDarkMode = document.querySelector('.dark-mode-toggle');
toggleDarkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Lazy Loading Images
const lazyImages = document.querySelectorAll('img.lazy');
const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
}, options);
lazyImages.forEach(image => {
    imageObserver.observe(image);
});

// Analytics Tracking
const trackEvent = (event) => {
    // Placeholder for tracking analytics
    console.log('Tracking event:', event);
};

// Accessibility Features
const toggleAccessibility = document.querySelector('.accessibility-toggle');
toggleAccessibility.addEventListener('click', () => {
    document.body.classList.toggle('accessible');
});
