document.addEventListener("DOMContentLoaded", () => {

  // ===== Fade-in on scroll =====
  const fadeElements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
  );
  fadeElements.forEach(el => observer.observe(el));

  // ===== Smooth scrolling for anchor links =====
  const offset = 100;
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        const topPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: topPos, behavior: "smooth" });
      }
      const navToggle = document.getElementById("nav-toggle");
      if (navToggle) navToggle.checked = false;
    });
  });

  // ===== Close nav on outside click =====
  document.addEventListener("click", e => {
    const navContainer = document.querySelector(".floating-nav");
    const navToggle = document.getElementById("nav-toggle");
    if (navToggle && navToggle.checked && !navContainer.contains(e.target)) {
      navToggle.checked = false;
    }
  });

  // ===== Dark mode toggle =====
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

  // ===== Waitlist form success =====
  const waitlistForm = document.querySelector('.waitlist-form');
  const successMsg = document.querySelector('.success-message');
  if (waitlistForm && successMsg) {
    waitlistForm.addEventListener('submit', e => {
      e.preventDefault();
      successMsg.style.display = 'block';
      waitlistForm.style.display = 'none';
      if (typeof gtag === 'function') {
        gtag('event', 'waitlist_signup', {
          'event_category': 'Form',
          'event_label': 'Waitlist Submission'
        });
      }
    });
  }

// AJAX submission for Affiliate Form
const affiliateForm = document.querySelector('#affiliate-form form');

affiliateForm.addEventListener('submit', function(e) {
  e.preventDefault(); // Stop page reload

  const formData = new FormData(affiliateForm);

  fetch(affiliateForm.action, {
    method: affiliateForm.method,
    body: formData,
    headers: { 'Accept': 'application/json' }
  })
  .then(response => {
    if (response.ok) {
      // Hide the form
      affiliateForm.style.display = 'none';

      // Show the success message
      const successMessage = document.querySelector('#affiliate-success');
      if (successMessage) {
        successMessage.style.display = 'block';
      }
    } else {
      response.json().then(data => {
        alert(data.error || 'Submission failed. Try again.');
      });
    }
  })
  .catch(error => {
    console.error('Error!', error);
    alert('Network error. Try again.');
  });
});

  // ===== Scroll-to-top buttons =====
  document.querySelectorAll('.scroll-to-top').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // ===== Live Support Widget =====
  const supportWidget = document.getElementById('live-support');
  const supportOpen = document.getElementById('support-open');
  const supportClose = document.getElementById('support-close');
  const supportSend = document.getElementById('support-send');
  const supportInput = document.getElementById('support-input');
  const supportHuman = document.getElementById('support-human');
  const supportMessages = document.getElementById('support-messages');

  function appendMessage(msg, sender='bot') {
    const div = document.createElement('div');
    div.classList.add(sender === 'bot' ? 'bot-message' : 'user-message');
    div.textContent = msg;
    supportMessages.appendChild(div);
    supportMessages.scrollTop = supportMessages.scrollHeight;
  }

  if (supportOpen && supportWidget) {
    supportOpen.addEventListener('click', () => {
      supportWidget.style.display = 'flex';
      supportOpen.style.display = 'none';
    });
  }

  if (supportClose && supportWidget) {
    supportClose.addEventListener('click', () => {
      supportWidget.style.display = 'none';
      supportOpen.style.display = 'block';
    });
  }

  if (supportSend && supportInput) {
    supportSend.addEventListener('click', () => {
      const msg = supportInput.value.trim();
      if (!msg) return;
      appendMessage(msg, 'user');
      supportInput.value = '';
      setTimeout(() => appendMessage('Thanks for your message. A human agent will respond shortly.'), 600);
    });
    supportInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        supportSend.click();
      }
    });
  }

  if (supportHuman) {
    supportHuman.addEventListener('click', () => {
      appendMessage('Connecting you to a human support agent...', 'bot');
      window.open('mailto:hello@zynxcorp.com?subject=Live%20Support%20Request', '_blank');
    });
  }

  // ===== FAQ Toggle =====
  const faqItems = document.querySelectorAll('.faq-item h3');
  faqItems.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      if (content) content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
  });

});
document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     COOKIE NOTICE
  ========================= */
  const cookieBanner = document.getElementById("cookie-banner");
  const cookieAccept = document.getElementById("cookie-accept");

  if (cookieBanner && !localStorage.getItem("zynxCookiesAccepted")) {
    cookieBanner.style.display = "flex";
  }

  if (cookieAccept) {
    cookieAccept.addEventListener("click", () => {
      localStorage.setItem("zynxCookiesAccepted", "true");
      cookieBanner.style.display = "none";
    });
  }

  /* =========================
   FORM SUCCESS (Formspree)
========================= */
const forms = document.querySelectorAll("form");

forms.forEach(form => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const action = form.getAttribute("action");

    try {
      const response = await fetch(action, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
      });

      if (response.ok) {
        form.reset();
        form.style.display = "none";

        const success = form.parentElement.querySelector(
          ".success-message, #affiliate-success"
        );

        if (success) {
          success.style.display = "block";

          // ⏱️ AUTO HIDE AFTER 5 SECONDS
          setTimeout(() => {
            success.style.opacity = "0";
            success.style.transition = "opacity 0.5s ease";

            setTimeout(() => {
              success.style.display = "none";
              success.style.opacity = "1";
              form.style.display = "block";
            }, 500);

          }, 5000);
        }
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  });
});
// ===============================
// Affiliate Form (AJAX + Success)
// ===============================
const affiliateForm = document.getElementById("affiliateForm");
const affiliateSuccess = document.getElementById("affiliate-success");

if (affiliateForm && affiliateSuccess) {
  affiliateForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(affiliateForm);

    fetch(affiliateForm.action, {
      method: "POST",
      body: formData,
      headers: { "Accept": "application/json" }
    })
    .then(() => {
      affiliateForm.style.display = "none";
      affiliateSuccess.style.display = "block";

      // Auto-hide success message after 6 seconds
      setTimeout(() => {
        affiliateSuccess.style.display = "none";
      }, 6000);
    })
    .catch(() => {
      alert("Something went wrong. Please try again.");
    });
  });
}

// ===================================
// Affiliate Dashboard (Approved Only)
// ===================================
const affiliateDashboard = document.getElementById("affiliate-dashboard");

if (affiliateDashboard) {
  const params = new URLSearchParams(window.location.search);

  if (params.get("approved") === "true") {
    affiliateDashboard.style.display = "block";
    affiliateDashboard.scrollIntoView({ behavior: "smooth" });
  }
}
