// script.js - Zynx Corporation

document.addEventListener("DOMContentLoaded", () => {
  console.log("script.js loaded successfully!"); // Debug: confirms file is running

  // 1. Fade-in sections/cards on scroll
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    }
  );

  setTimeout(() => {
    fadeElements.forEach((el) => observer.observe(el));
  }, 300);

  // 2. Handle all anchor links (#home, #about, etc.)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1); // e.g. "about"
      const targetElement = document.getElementById(targetId);

      console.log("Clicked: #" + targetId); // Debug: see which link was clicked

      if (targetElement) {
        if (targetId === "about") {
          // Show About section
          targetElement.classList.remove("section-hidden");
          // Hide main homepage content
          document.body.classList.add("about-visible");
          // Scroll to top of About
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
          console.log("About section shown");
        } else {
          // Hide About if it was open
          const aboutSection = document.getElementById("about");
          if (aboutSection) {
            aboutSection.classList.add("section-hidden");
            document.body.classList.remove("about-visible");
          }
          // Scroll to the clicked section
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
          console.log("Scrolled to: " + targetId);
        }
      }

      // Close the circular navigation menu
      const navToggle = document.getElementById("nav-toggle");
      if (navToggle) {
        navToggle.checked = false;
      }
    });
  });

  // 3. Back to Home button inside About section
  document.querySelectorAll(".back-to-home").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.classList.add("section-hidden");
        document.body.classList.remove("about-visible");
      }

      // Scroll back to top of homepage
      document.getElementById("home").scrollIntoView({ behavior: "smooth" });

      console.log("Returned to home view");
    });
  });

  // 4. Close circular nav when clicking outside it
  document.addEventListener("click", (e) => {
    const navContainer = document.querySelector(".floating-nav");
    const navToggle = document.getElementById("nav-toggle");

    if (navToggle && navToggle.checked && !navContainer.contains(e.target)) {
      navToggle.checked = false;
      console.log("Nav closed by outside click");
    }
  });
});
