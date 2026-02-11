/* =====================================
   ZYNX CORPORATION - PROFESSIONAL JS
===================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* =====================================
     FADE-IN ON SCROLL
  ===================================== */
  const fadeElements = document.querySelectorAll(".fade-in");

  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  }



  /* =====================================
     SMOOTH SCROLL FOR ANCHOR LINKS
  ===================================== */
  const offset = 100;

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const href = anchor.getAttribute("href");
      const target = href ? document.querySelector(href) : null;

      if (target) {
        e.preventDefault();

        const topPos =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          offset;

        window.scrollTo({
          top: topPos,
          behavior: "smooth",
        });
      }

      const navToggle = document.getElementById("nav-toggle");
      if (navToggle) navToggle.checked = false;
    });
  });



  /* =====================================
     CLOSE NAV ON OUTSIDE CLICK
  ===================================== */
  document.addEventListener("click", function (e) {
    const navContainer = document.querySelector(".floating-nav");
    const navToggle = document.getElementById("nav-toggle");

    if (
      navToggle &&
      navToggle.checked &&
      navContainer &&
      !navContainer.contains(e.target)
    ) {
      navToggle.checked = false;
    }
  });



  /* =====================================
     DARK MODE TOGGLE
  ===================================== */
  const themeToggle = document.getElementById("theme-toggle");

  if (themeToggle) {
    if (localStorage.getItem("darkMode") === "enabled") {
      document.body.classList.add("dark");
      themeToggle.textContent = "☀️";
    }

    themeToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark");

      const enabled = document.body.classList.contains("dark");
      themeToggle.textContent = enabled ? "☀️" : "🌙";

      localStorage.setItem(
        "darkMode",
        enabled ? "enabled" : "disabled"
      );
    });
  }



  /* =====================================
     COOKIE NOTICE
  ===================================== */
  const cookieBanner = document.getElementById("cookie-banner");
  const cookieAccept = document.getElementById("cookie-accept");

  if (cookieBanner && !localStorage.getItem("zynxCookiesAccepted")) {
    cookieBanner.style.display = "flex";
  }

  if (cookieAccept && cookieBanner) {
    cookieAccept.addEventListener("click", function () {
      localStorage.setItem("zynxCookiesAccepted", "true");
      cookieBanner.style.display = "none";
    });
  }



  /* =====================================
     FORM HANDLER (Formspree)
  ===================================== */
  const forms = document.querySelectorAll("form[action*='formspree.io']");

  forms.forEach(function (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method || "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {

          // Google Analytics event (optional)
          if (
            form.classList.contains("waitlist-form") &&
            typeof gtag === "function"
          ) {
            gtag("event", "waitlist_signup", {
              event_category: "Form",
              event_label: "Waitlist Submission",
            });
          }

          form.reset();
          form.style.display = "none";

          const parent = form.parentElement;

          const success =
            parent?.querySelector(".success-message") ||
            parent?.querySelector("#affiliate-success") ||
            document.querySelector("#affiliate-success");

          if (success) {
            success.style.display = "block";

            setTimeout(function () {
              success.style.opacity = "0";
              success.style.transition = "opacity 0.5s ease";

              setTimeout(function () {
                success.style.display = "none";
                success.style.opacity = "1";
                form.style.display = "block";
              }, 500);
            }, 5000);
          }

        } else {
          alert("Submission failed. Please try again.");
        }

      } catch (error) {
        console.error("Network error:", error);
        alert("Network error. Please try again.");
      }
    });
  });



  /* =====================================
     SCROLL TO TOP
  ===================================== */
  document.querySelectorAll(".scroll-to-top").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });



  /* =====================================
     LIVE SUPPORT WIDGET
  ===================================== */
  const supportWidget = document.getElementById("live-support");
  const supportOpen = document.getElementById("support-open");
  const supportClose = document.getElementById("support-close");
  const supportSend = document.getElementById("support-send");
  const supportInput = document.getElementById("support-input");
  const supportHuman = document.getElementById("support-human");
  const supportMessages = document.getElementById("support-messages");

  function appendMessage(message, sender = "bot") {
    if (!supportMessages) return;

    const div = document.createElement("div");
    div.classList.add(sender === "bot" ? "bot-message" : "user-message");
    div.textContent = message;

    supportMessages.appendChild(div);
    supportMessages.scrollTop = supportMessages.scrollHeight;
  }

  if (supportOpen && supportWidget) {
    supportOpen.addEventListener("click", function () {
      supportWidget.style.display = "flex";
      supportOpen.style.display = "none";
    });
  }

  if (supportClose && supportWidget && supportOpen) {
    supportClose.addEventListener("click", function () {
      supportWidget.style.display = "none";
      supportOpen.style.display = "block";
    });
  }

  if (supportSend && supportInput) {
    supportSend.addEventListener("click", function () {
      const msg = supportInput.value.trim();
      if (!msg) return;

      appendMessage(msg, "user");
      supportInput.value = "";

      setTimeout(function () {
        appendMessage(
          "Thanks for your message. A human support agent will respond shortly."
        );
      }, 600);
    });

    supportInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        supportSend.click();
      }
    });
  }

  if (supportHuman) {
    supportHuman.addEventListener("click", function () {
      appendMessage("Connecting you to a human support agent...");
      window.open(
        "mailto:hello@zynxcorp.com?subject=Live%20Support%20Request",
        "_blank"
      );
    });
  }



  /* =====================================
     FAQ TOGGLE
  ===================================== */
  document.querySelectorAll(".faq-item h3").forEach(function (header) {
    header.addEventListener("click", function () {
      const content = header.nextElementSibling;
      if (!content) return;

      content.style.display =
        content.style.display === "block" ? "none" : "block";
    });
  });

});
