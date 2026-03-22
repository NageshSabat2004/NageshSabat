// Sticky Navbar
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close menu when clicking link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Scroll Reveal Animations
const revealElements = document.querySelectorAll('.fade-in');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
};

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
revealElements.forEach(el => revealObserver.observe(el));

// Skills Gallery Navigation
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const gallery = document.querySelector('.skills-gallery');

if (prevBtn && nextBtn && gallery) {
    const scrollAmount = 350; // approximate width of card + gap

    nextBtn.addEventListener('click', () => {
        gallery.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        gallery.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
}

// Subtle Parallax on Hero Image
const heroImage = document.querySelector('.hero-image');
const bgLines = document.querySelector('.hero-bg-lines');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    if (scrollPosition < window.innerHeight && heroImage) {
        // Subtle move up for image
        heroImage.style.transform = `translateY(${scrollPosition * -0.1}px)`;
        if (bgLines) {
            bgLines.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        }
    }
});

// MODAL LOGIC
const modalOverlay = document.getElementById('contactModal');
const openModalBtns = document.querySelectorAll('.open-contact-modal');
const closeModalBtn = document.getElementById('closeModal');
const contactForm = document.getElementById('contactForm');

if (modalOverlay && closeModalBtn && contactForm) {
    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    closeModalBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'SENDING...';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(contactForm);
            const response = await fetch('https://formsubmit.co/ajax/nagesh22112004@gmail.com', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            if (data.success === 'true' || response.ok) {
                alert('Thank you! Your message has been sent successfully.');
                contactForm.reset();
                modalOverlay.classList.remove('active');
                document.body.style.overflow = '';
            } else {
                throw new Error(data.message || 'Server rejected the request');
            }
        } catch (error) {
            alert('Oops! Something went wrong. Please check your email inbox to activate FormSubmit if this is your first time testing the form. (Error: ' + error.message + ')');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}
