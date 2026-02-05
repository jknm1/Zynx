// script.js - Zynx Corporation

document.addEventListener("DOMContentLoaded", () => {
  // Fade-in on scroll
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
  );

  setTimeout(() => {
    fadeElements.forEach(el => observer.observe(el));
  }, 300);

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e){
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if(target) target.scrollIntoView({behavior: "smooth", block: "start"});

      // Close circular nav after click
      const navToggle = document.getElementById("nav-toggle");
      if(navToggle) navToggle.checked = false;
    });
  });

  // Close nav when clicking outside
  document.addEventListener("click", e => {
    const nav = document.querySelector(".floating-nav");
    const navToggle = document.getElementById("nav-toggle");
    if(navToggle && navToggle.checked && !nav.contains(e.target)){
      navToggle.checked = false;
    }
  });

  // Dark mode toggle
  const themeToggle = document.getElementById('theme-toggle');
  if(themeToggle){
    if(localStorage.getItem('darkMode') === 'enabled'){
      document.body.classList.add('dark');
      themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', ()=>{
      document.body.classList.toggle('dark');
      if(document.body.classList.contains('dark')){
        themeToggle.textContent = '☀️';
        localStorage.setItem('darkMode','enabled');
      }else{
        themeToggle.textContent = '🌙';
        localStorage.setItem('darkMode','disabled');
      }
    });
  }

  // Track waitlist submissions in GA4
  const waitlistForm = document.querySelector('.waitlist-form');
  if(waitlistForm){
    waitlistForm.addEventListener('submit', () => {
      gtag('event', 'waitlist_signup', {
        'event_category': 'Form',
        'event_label': 'Waitlist Submission'
      });
    });
  }
});
