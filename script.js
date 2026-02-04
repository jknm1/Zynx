// script.js - Zynx Corporation

document.addEventListener("DOMContentLoaded", () => {
  // Fade-in on scroll
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
  );

  setTimeout(() => {
    fadeElements.forEach((el) => observer.observe(el));
  }, 300);

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
      if (navToggle) {
        navToggle.checked = false;
      }
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

  // Thank-you message after waitlist form submit
  const waitlistForm = document.querySelector('.waitlist-form');
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', function(e) {
      // Let Formspree process first (small delay)
      setTimeout(() => {
        this.innerHTML = '<p class="success-msg visible">Thank you! You\'re on the waitlist.<br>Check your email for confirmation.</p>';
      }, 800);
    });
  }
});
