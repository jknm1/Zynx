document.addEventListener("DOMContentLoaded", () => {
  // Fade-in observer
  const fadeEls = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, {threshold: 0.15});
  fadeEls.forEach(el => observer.observe(el));

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if(target) target.scrollIntoView({behavior: "smooth"});
      document.getElementById("nav-toggle").checked = false;
    });
  });

  // Dark mode toggle
  const themeBtn = document.getElementById("theme-toggle");
  if(localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️";
  }
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if(document.body.classList.contains("dark")) {
      localStorage.setItem("darkMode","enabled");
      themeBtn.textContent = "☀️";
    } else {
      localStorage.setItem("darkMode","disabled");
      themeBtn.textContent = "🌙";
    }
  });

  // FAQ toggle
  document.querySelectorAll(".faq-item").forEach(item => {
    item.addEventListener("click", () => {
      const answer = item.querySelector(".faq-answer");
      if(answer) answer.style.display = answer.style.display === "block" ? "none" : "block";
    });
  });

  // Show donation card
  const donateLinks = document.querySelectorAll(".donate-link");
  const hiddenCard = document.querySelector(".hidden-card");
  donateLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      if(hiddenCard) hiddenCard.style.display = "block";
      window.scrollTo({top: hiddenCard.offsetTop, behavior:"smooth"});
    });
  });

  // Live support button
  const liveBtn = document.querySelector(".connect-live");
  if(liveBtn) {
    liveBtn.addEventListener("click", () => {
      window.location.href = "mailto:support@zynxcorp.com"; // or replace with chat widget link
    });
  }

  // GA4 waitlist tracking
  const waitForm = document.querySelector(".waitlist-form");
  if(waitForm) {
    waitForm.addEventListener("submit", () => {
      gtag('event', 'waitlist_signup', {
        'event_category':'Form',
        'event_label':'Waitlist Submission'
      });
    });
  }
});
