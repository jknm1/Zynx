// script.js - Zynx Corporation
// Features: Smooth fade-in on scroll + Circular nav smooth scroll + auto-close on outside click

document.addEventListener("DOMContentLoaded", () => {
  // 1. Fade-in sections/cards on scroll
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optional: unobserve after visible to improve performance
          // observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,      // Trigger when 15% of element is visible
      rootMargin: "0px 0px -50px 0px" // Slight upward offset for better timing
    }
  );

  // Small delay to let page settle before observing
  setTimeout(() => {
    fadeElements.forEach((el) => observer.observe(el));
  }, 300);

  // 2. Smooth scrolling for anchor links (#home, #platforms, etc.)
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

      // Close circular nav menu after clicking a link
      const navToggle = document.getElementById("nav-toggle");
      if (navToggle) {
        navToggle.checked = false;
      }
    });
  });

  // 3. Close circular nav when clicking outside of it
  document.addEventListener("click", (e) => {
    const navContainer = document.querySelector(".floating-nav");
    const navToggle = document.getElementById("nav-toggle");

    // Only act if menu is open and click is outside nav
    if (navToggle && navToggle.checked && !navContainer.contains(e.target)) {
      navToggle.checked = false;
    }
  });
});
