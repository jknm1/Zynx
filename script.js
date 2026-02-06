// script.js - Zynx Corporation

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------
     Fade-in on scroll
  ------------------------- */
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

  /* -------------------------
     Floating card parallax
  ------------------------- */
  const floatingCards = document.querySelectorAll('.floating-card');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    floatingCards.forEach(card => {
      card.style.transform = `translateY(${scrollY * 0.05}px)`;
    });
  });

  /* -------------------------
     Smooth scroll for anchor links
  ------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Close circular nav after click
      const navToggle = document.getElementById("nav-toggle");
      if (navToggle) navToggle.checked = false;
    });
  });

  /* -------------------------
     Close nav when clicking outside
  ------------------------- */
  document.addEventListener("click", (e) => {
    const navContainer = document.querySelector(".floating-nav");
    const navToggle = document.getElementById("nav-toggle");
    if (navToggle && navToggle.checked && !navContainer.contains(e.target)) {
      navToggle.checked = false;
    }
  });

  /* -------------------------
     Dark mode toggle
  ------------------------- */
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

  /* -------------------------
     Waitlist form submit tracking & success
  ------------------------- */
  const waitlistForm = document.querySelector('.waitlist-form');
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', (e) => {
      e.preventDefault(); // prevent default submission for demo
      const formData = new FormData(waitlistForm);

      // Track event in GA4
      gtag('event', 'waitlist_signup', {
        'event_category': 'Form',
        'event_label': 'Waitlist Submission'
      });

      // Show success message
      let successMsg = document.querySelector('.waitlist-success');
      if (!successMsg) {
        successMsg = document.createElement('p');
        successMsg.classList.add('waitlist-success');
        successMsg.textContent = "✅ Thanks! You’ve joined the waitlist.";
        waitlistForm.appendChild(successMsg);
      }

      successMsg.style.display = 'block';
      successMsg.classList.add('visible');

      // Optional: reset form
      waitlistForm.reset();
    });
  }

  /* -------------------------
     Scroll-to-top buttons
  ------------------------- */
  const scrollButtons = document.querySelectorAll('.scroll-to-top, .back-to-waitlist');
  scrollButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
 // ===== FAQ toggle =====
  document.querySelectorAll('.faq-item h3').forEach(faq => {
    faq.addEventListener('click', ()=>{
      const p = faq.nextElementSibling;
      if(p.style.display==='block'){
        p.style.display='none';
      } else {
        p.style.display='block';
      }
    });
  

  // ===== Live support =====
  const supportOpen = document.getElementById('support-open');
  const liveSupport = document.getElementById('live-support');
  const supportClose = document.getElementById('support-close');
  const supportSend = document.getElementById('support-send');
  const supportInput = document.getElementById('support-input');
  const supportMessages = document.getElementById('support-messages');
  const supportHuman = document.getElementById('support-human');

  supportOpen.addEventListener('click', ()=> liveSupport.style.display='flex');
  supportClose.addEventListener('click', ()=> liveSupport.style.display='none');

  supportSend.addEventListener('click', ()=>{
    if(supportInput.value.trim()==='') return;
    const userMsg = document.createElement('div');
    userMsg.className='user-message';
    userMsg.textContent=supportInput.value;
    supportMessages.appendChild(userMsg);
    supportInput.value='';
    supportMessages.scrollTop = supportMessages.scrollHeight;

    setTimeout(()=>{
      const botMsg = document.createElement('div');
      botMsg.className='bot-message';
      botMsg.textContent='Thank you for your message. A human agent will assist shortly.';
      supportMessages.appendChild(botMsg);
      supportMessages.scrollTop = supportMessages.scrollHeight;
    },1000);
  });

  supportHuman.addEventListener('click', ()=>{
    const botMsg = document.createElement('div');
    botMsg.className='bot-message';
    botMsg.textContent='Connecting you to a human agent...';
    supportMessages.appendChild(botMsg);
    supportMessages.scrollTop = supportMessages.scrollHeight;
  });

});
});
