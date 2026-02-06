// script.js - Zynx Corporation

document.addEventListener("DOMContentLoaded", () => {

  /* ===== Fade-in on scroll ===== */
  const fadeElements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
  );

  setTimeout(() => {
    fadeElements.forEach(el => observer.observe(el));
  }, 300);

  /* ===== Smooth scrolling for anchor links ===== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if(targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Close circular nav after click
      const navToggle = document.getElementById("nav-toggle");
      if(navToggle) navToggle.checked = false;
    });
  });

  /* ===== Close nav when clicking outside ===== */
  document.addEventListener("click", (e) => {
    const navContainer = document.querySelector(".floating-nav");
    const navToggle = document.getElementById("nav-toggle");
    if(navToggle && navToggle.checked && !navContainer.contains(e.target)) {
      navToggle.checked = false;
    }
  });

  /* ===== Dark mode toggle ===== */
  const themeToggle = document.getElementById('theme-toggle');
  if(themeToggle) {
    if(localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark');
      themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      if(document.body.classList.contains('dark')) {
        themeToggle.textContent = '☀️';
        localStorage.setItem('darkMode','enabled');
      } else {
        themeToggle.textContent = '🌙';
        localStorage.setItem('darkMode','disabled');
      }
    });
  }

  /* ===== Waitlist GA4 tracking ===== */
  const waitlistForm = document.querySelector('.waitlist-form');
  if(waitlistForm) {
    waitlistForm.addEventListener('submit', function() {
      if(typeof gtag === "function") {
        gtag('event', 'waitlist_signup', {
          'event_category': 'Form',
          'event_label': 'Waitlist Submission'
        });
      }

      // Show thank you message after submit
      const thankYou = document.createElement('p');
      thankYou.textContent = '✅ Thank you for joining the waitlist!';
      thankYou.style.marginTop = '1rem';
      waitlistForm.appendChild(thankYou);
    });
  }

  /* ===== Scroll-to-top button ===== */
  const scrollBtn = document.querySelector('.scroll-to-top');
  if(scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ===== FAQ toggle ===== */
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const answer = q.nextElementSibling;
      const open = answer.style.display === 'block';
      answer.style.display = open ? 'none' : 'block';
    });
  });

  /* ===== Donation card toggle ===== */
  const donateLink = document.querySelector('.donate-link');
  const donateCard = document.querySelector('.hidden-card');
  if(donateLink && donateCard) {
    donateLink.addEventListener('click', () => {
      donateCard.style.display = donateCard.style.display === 'block' ? 'none' : 'block';
      donateCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  /* ===== Live support connect ===== */
  const liveBtn = document.querySelector('.connect-live');
  if(liveBtn) {
    liveBtn.addEventListener('click', () => {
      // Example: open a chat widget or bot (replace with real chat link)
      window.open('https://example.com/live-support', '_blank');
    });
  }

});
