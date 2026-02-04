// script.js - Zynx Corporation
// Features: Fade-in on scroll, smooth scrolling for anchors, close floating nav on click/outside

document.addEventListener("DOMContentLoaded", () => {
  // 1. Fade-in sections/cards when they enter viewport
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optional: stop observing once visible (better performance)
          // observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,              // Trigger when ~15% is visible
      rootMargin: "0px 0px -50px 0px" // Slight upward offset for smoother feel
    }
  );

  // Small delay to let page settle
  setTimeout(() => {
    fadeElements.forEach((el) => observer.observe(el));
  }, 300);

  // 2. Smooth scrolling for all internal anchor links (#id)
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

      // Close floating navigation menu after any link click
      const navToggle = document.getElementById("nav-toggle");
      if (navToggle) {
        navToggle.checked = false;
      }
    });
  });

  // 3. Close floating nav when clicking anywhere outside it
  document.addEventListener("click", (e) => {
    const navContainer = document.querySelector(".floating-nav");
    const navToggle = document.getElementById("nav-toggle");

    // Only close if menu is open and click is not inside nav area
    if (navToggle && navToggle.checked && !navContainer.contains(e.target)) {
      navToggle.checked = false;
    }
  });
});
