// script.js

// Mobile Menu Toggle Functionality
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});


// Typewriter Animation Effect
function typeWriter(element, text, delay) {
    let index = 0;
    function typing() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(typing, delay);
        }
    }
    typing();
}

const typewriterElement = document.querySelector('.typewriter');
typeWriter(typewriterElement, 'Welcome to Vanmo!', 100);


// Smooth Scroll Behavior
const scrollLinks = document.querySelectorAll('a.scroll-link');

scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetPosition = document.querySelector(targetId).offsetTop;
        window.scroll({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});


// Reveal Animations on Scroll
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;
        if (elementPosition < viewportHeight) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);


// Form Handling
const form = document.querySelector('.contact-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log('Form submitted:', data);
    // Handle form submission with fetch or AJAX
});