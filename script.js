// script.js - Zynx Corporation

document.addEventListener("DOMContentLoaded", () => {
  // Fade-in on scroll
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // stop observing once visible
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
  );

  fadeElements.forEach((el) => observer.observe(el));

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

      // Close circular nav after click
      const navToggle = document.getElementById("nav-toggle");
      if (navToggle) navToggle.checked = false;
    });
  });

  // Close nav when clicking outside
  document.addEventListener("click", (e) => {
    const navContainer = document.querySelector(".floating-nav");
    const navToggle = document.getElementById("nav-toggle");

    if (navToggle && navToggle.checked && !navContainer.contains(e.target)) {
      navToggle.checked = false;
    }
  });

  // Dark mode toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    // Load saved preference
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark');
      themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');

      // Small animation for background transition
      document.body.style.transition = 'background 0.4s, color 0.4s';

      if (document.body.classList.contains('dark')) {
        themeToggle.textContent = '☀️';
        localStorage.setItem('darkMode', 'enabled');
      } else {
        themeToggle.textContent = '🌙';
        localStorage.setItem('darkMode', 'disabled');
      }
    });
  }

  // Track waitlist form submissions in GA4
  const waitlistForms = document.querySelectorAll('form');
  waitlistForms.forEach(form => {
    form.addEventListener('submit', () => {
      const isWaitlist = form.classList.contains('waitlist-form');
      const isFooter = form.classList.contains('mini-form');

      gtag('event', isWaitlist ? 'waitlist_signup' : 'newsletter_signup', {
        'event_category': 'Form',
        'event_label': isWaitlist ? 'Waitlist Submission' : 'Footer Newsletter Submission'
      });
    });
  });
});
