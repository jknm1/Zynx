document.addEventListener("DOMContentLoaded", () => {
  // ===== Fade-in on scroll =====
  const fadeElements = document.querySelectorAll(".fade-in");
  if (fadeElements.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    fadeElements.forEach((el) => observer.observe(el));
  }

  // ===== Smooth scrolling for anchor links =====
  const offset = 100;
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      const target = href ? document.querySelector(href) : null;

      // only prevent default if it’s a real in-page target
      if (target) {
        e.preventDefault();
        const topPos =
          target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: topPos, behavior: "smooth" });
      }

      const navToggle = document.getElementById("nav-toggle");
      if (navToggle) navToggle.checked = false;
    });
  });

  // ===== Close nav on outside click =====
  document.addEventListener("click", (e) => {
    const navContainer = document.querySelector(".floating-nav");
    const navToggle = document.getElementById("nav-toggle");
    if (navToggle && navToggle.checked && navContainer && !navContainer.contains(e.target)) {
      navToggle.checked = false;
    }
  });

  // ===== Dark mode toggle =====
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    if (localStorage.getItem("darkMode") === "enabled") {
      document.body.classList.add("dark");
      themeToggle.textContent = "☀️";
    }
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const enabled = document.body.classList.contains("dark");
      themeToggle.textContent = enabled ? "☀️" : "🌙";
      localStorage.setItem("darkMode", enabled ? "enabled" : "disabled");
    });
  }

  // ===== Cookie notice =====
  const cookieBanner = document.getElementById("cookie-banner");
  const cookieAccept = document.getElementById("cookie-accept");
  if (cookieBanner && !localStorage.getItem("zynxCookiesAccepted")) {
    cookieBanner.style.display = "flex";
  }
  if (cookieAccept && cookieBanner) {
    cookieAccept.addEventListener("click", () => {
      localStorage.setItem("zynxCookiesAccepted", "true");
      cookieBanner.style.display = "none";
    });
  }

  // ===== Waitlist + Affiliate + Footer forms (Formspree) =====
  // This handles ALL Formspree forms safely, and shows the right success message.
  document.querySelectorAll("form[action*='formspree.io']").forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method || "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          // analytics only for main waitlist form
          if (form.classList.contains("waitlist-form") && typeof gtag === "function") {
            gtag("event", "waitlist_signup", {
              event_category: "Form",
              event_label: "Waitlist Submission",
            });
          }

          form.reset();
          form.style.display = "none";

          // Find a nearby success message:
          // - for the main waitlist card: .success-message
          // - for affiliate form section: #affiliate-success
          const parent = form.parentElement;
          const success =
            parent?.querySelector(".success-message") ||
            parent?.querySelector("#affiliate-success") ||
            document.querySelector("#affiliate-success");

          if (success) {
            success.style.display = "block";

            // Auto-hide after 5s (optional; remove if you don’t want it)
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
        } else {
          alert("Submission failed. Try again.");
        }
      } catch (error) {
        console.error("Error!", error);
        alert("Network error. Try again.");
      }
    });
  });

  // ===== Scroll-to-top buttons =====
  document.querySelectorAll(".scroll-to-top").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // ===== Live Support Widget =====
  const supportWidget = document.getElementById("live-support");
  const supportOpen = document.getElementById("support-open");
  const supportClose = document.getElementById("support-close");
  const supportSend = document.getElementById("support-send");
  const supportInput = document.getElementById("support-input");
  const supportHuman = document.getElementById("support-human");
  const supportMessages = document.getElementById("support-messages");

  function appendMessage(msg, sender = "bot") {
    if (!supportMessages) return;
    const div = document.createElement("div");
    div.classList.add(sender === "bot" ? "bot-message" : "user-message");
    div.textContent = msg;
    supportMessages.appendChild(div);
    supportMessages.scrollTop = supportMessages.scrollHeight;
  }

  if (supportOpen && supportWidget) {
    supportOpen.addEventListener("click", () => {
      supportWidget.style.display = "flex";
      supportOpen.style.display = "none";
    });
  }

  if (supportClose && supportWidget && supportOpen) {
    supportClose.addEventListener("click", () => {
      supportWidget.style.display = "none";
      supportOpen.style.display = "block";
    });
  }

  if (supportSend && supportInput) {
    supportSend.addEventListener("click", () => {
      const msg = supportInput.value.trim();
      if (!msg) return;
      appendMessage(msg, "user");
      supportInput.value = "";
      setTimeout(
        () => appendMessage("Thanks for your message. A human agent will respond shortly."),
        600
      );
    });

    supportInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        supportSend.click();
      }
    });
  }

  if (supportHuman) {
    supportHuman.addEventListener("click", () => {
      appendMessage("Connecting you to a human support agent...", "bot");
      window.open("mailto:hello@zynxcorp.com?subject=Live%20Support%20Request", "_blank");
    });
  }

  // ===== FAQ Toggle =====
  document.querySelectorAll(".faq-item h3").forEach((header) => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      if (!content) return;
      content.style.display = content.style.display === "block" ? "none" : "block";
    });
  });
});
