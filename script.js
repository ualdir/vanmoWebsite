// script.js

// Mobile Menu
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');

mobileMenu.addEventListener('click', () => {
    document.body.classList.toggle('mobile-menu-active');
});

// Typewriter Effect
function typeWriter(element) {
    const text = element.innerHTML;
    element.innerHTML = '';
    let i = 0;
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, 100);
        }
    }
    typing();
}

document.querySelectorAll('.typewriter').forEach(typeWriter);

// Smooth Scrolling
const smoothScrollLinks = document.querySelectorAll('a[href^="#"];');
smoothScrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Reveal Animations
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
});

revealElements.forEach(element => {
    observer.observe(element);
});

// Header Shadow
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('shadow');
    } else {
        header.classList.remove('shadow');
    }
});

// Active Nav Links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(link => link.classList.remove('active'));
        link.classList.add('active');
    });
});

// Marquee Functionality
const marquee = document.querySelector('.marquee');
let marqueeSpeed = 1;
function startMarquee() {
    marquee.scrollLeft += marqueeSpeed;
    if (marquee.scrollLeft >= marquee.scrollWidth) {
        marquee.scrollLeft = 0;
    }
}
setInterval(startMarquee, 30);

// Form Validation
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        if (!validateEmail(email)) {
            alert('Please enter a valid email.');
            return;
        }
        form.submit();
    });
});
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Dark Mode Toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Lazy Loading
const lazyLoadImages = document.querySelectorAll('img[data-src]');
const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

lazyLoadImages.forEach(img => {
    lazyLoadObserver.observe(img);
});

// Analytics Tracking
const analyticsBtns = document.querySelectorAll('.track-analytics');
analyzeData = (event) => console.log(event);
analyticsBtns.forEach(btn => {
    btn.addEventListener('click', analyzeData);
});

// Accessibility Features
const accessibleElements = document.querySelectorAll('[tabindex]');
accessibleElements.forEach(element => {
    element.setAttribute('role', 'button');
});

// Error Handling and Performance Optimization
try {
    // Code that can throw an error
} catch (error) {
    console.error('Error occurred:', error);
}

// Performance optimization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}

function initialize() {
    console.log('Initialization complete.');
}