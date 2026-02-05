// script.js - Zynx Corporation

document.addEventListener("DOMContentLoaded", () => {

  // ----- FADE-IN ON SCROLL -----
  const fadeElements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
  );
  fadeElements.forEach(el => observer.observe(el));

  // ----- SMOOTH SCROLL FOR ANCHORS -----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });

      // Close floating nav after click
      const navToggle = document.getElementById("nav-toggle");
      if (navToggle) navToggle.checked = false;
    });
  });

  // ----- CLOSE NAV WHEN CLICKING OUTSIDE -----
  document.addEventListener("click", e => {
    const nav = document.querySelector(".floating-nav");
    const navToggle = document.getElementById("nav-toggle");
    if (navToggle && navToggle.checked && !nav.contains(e.target)) {
      navToggle.checked = false;
    }
  });

  // ----- DARK MODE TOGGLE -----
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark');
      themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      if (document.body.classList.contains('dark')) {
        themeToggle.textContent = '☀️';
        localStorage.setItem('darkMode', 'enabled');
      } else {
        themeToggle.textContent = '🌙';
        localStorage.setItem('darkMode', 'disabled');
      }
    });
  }

  // ----- WAITLIST FORM SUBMISSION -----
  const waitlistForm = document.getElementById('waitlist-form');
  const waitlistSection = document.getElementById('waitlist-section');
  const successMessage = document.getElementById('success-message');
  const backButton = document.getElementById('back-to-waitlist');

  if (waitlistForm) {
    waitlistForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent default to show success first
      const formData = new FormData(waitlistForm);
      
      fetch(waitlistForm.action, {
        method: waitlistForm.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok) {
          waitlistSection.style.display = 'none';
          successMessage.style.display = 'block';
          successMessage.classList.add('visible');

          // GA4 Event
          gtag('event', 'waitlist_signup', {
            'event_category': 'Form',
            'event_label': 'Waitlist Submission'
          });
        } else {
          alert("Oops! Something went wrong. Please try again.");
        }
      }).catch(error => alert("Oops! Something went wrong. Please try again."));
    });
  }

  // Back to waitlist button
  if (backButton) {
    backButton.addEventListener('click', () => {
      successMessage.style.display = 'none';
      waitlistSection.style.display = 'block';
      waitlistSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // ----- FLOATING PARALLAX EFFECT FOR CARDS -----
  const floatCards = document.querySelectorAll('.float-card');
  document.addEventListener('mousemove', e => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    floatCards.forEach((card, i) => {
      const speed = 5 + i; // different speed per card
      card.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });

});
