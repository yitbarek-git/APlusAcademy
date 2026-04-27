(() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
    initThemeToggle();
    initRevealOnScroll();
    initFormValidation();
    initSmoothScrolling();
    initVideoHoverPlayback();
    initActiveNavHighlight();
    initLogoFade();
    initCounters();
  });

  // ---------- Shared helpers ----------
  function $(selector, scope = document) {
    return scope.querySelector(selector);
  }

  function $all(selector, scope = document) {
    return Array.from(scope.querySelectorAll(selector));
  }

  function safeAddEvent(target, event, handler, options) {
    if (target) target.addEventListener(event, handler, options);
  }

  // ---------- Error handling ----------
  function showError(errorId, message) {
    const errorEl = document.getElementById(errorId);
    if (!errorEl) return;

    errorEl.textContent = message;

    const formGroup = errorEl.closest(".form-group");
    const field =
      formGroup && formGroup.querySelector("input, textarea, select");

    if (field) {
      field.classList.add("error-border");
      field.setAttribute("aria-invalid", "true");
    }
  }

  function clearErrors(form) {
    if (!form) return;

    $all(".error", form).forEach((el) => {
      el.textContent = "";
    });

    $all(".error-border", form).forEach((el) => {
      el.classList.remove("error-border");
      el.removeAttribute("aria-invalid");
    });
  }

  function clearFieldError(field) {
    if (!field) return;

    field.classList.remove("error-border");
    field.removeAttribute("aria-invalid");

    const formGroup = field.closest(".form-group");
    const errorEl = formGroup && formGroup.querySelector(".error");
    if (errorEl) errorEl.textContent = "";
  }

  // ---------- Mobile menu ----------
  function initMobileMenu() {
    const menuBtn = document.getElementById("menu-btn");
    const navbar = document.querySelector(".navbar");
    const header = document.querySelector(".header");

    if (!menuBtn || !navbar || !header) return;

    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      menuBtn.classList.toggle("open");
      navbar.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!header.contains(e.target)) {
        menuBtn.classList.remove("open");
        navbar.classList.remove("active");
      }
    });

    $all(".navbar a").forEach((link) => {
      link.addEventListener("click", () => {
        menuBtn.classList.remove("open");
        navbar.classList.remove("active");
      });
    });
  }

  // ---------- Theme toggle ----------
  function initThemeToggle() {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    if (!themeToggle) return;

    const savedTheme = localStorage.getItem("aplus-theme");

    if (savedTheme === "light") {
      body.classList.add("light");
      themeToggle.classList.replace("fa-moon", "fa-sun");
    }

    themeToggle.addEventListener("click", () => {
      const isLight = body.classList.toggle("light");

      themeToggle.classList.toggle("fa-sun", isLight);
      themeToggle.classList.toggle("fa-moon", !isLight);
      localStorage.setItem("aplus-theme", isLight ? "light" : "dark");
    });
  }

  // ---------- Reveal animations ----------
  function initRevealOnScroll() {
    const revealEls = $all(".reveal");
    if (!revealEls.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  // ---------- Form validation ----------
  function initFormValidation() {
    const form = document.getElementById("registration-form");
    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) return;

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const genderInputs = $all('input[name="gender"]', form);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const validate = () => {
      clearErrors(form);

      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const password = passwordInput ? passwordInput.value : "";
      const gender = form.querySelector('input[name="gender"]:checked');

      let isValid = true;

      if (!name) {
        showError("nameError", "Name is required.");
        isValid = false;
      } else if (name.length < 5) {
        showError("nameError", "Name must be at least 5 characters.");
        isValid = false;
      }

      if (!email) {
        showError("emailError", "Email is required.");
        isValid = false;
      } else if (!emailRegex.test(email)) {
        showError("emailError", "Enter a valid email address.");
        isValid = false;
      }

      if (!password) {
        showError("passwordError", "Password is required.");
        isValid = false;
      } else if (password.length < 8) {
        showError("passwordError", "Password must be at least 8 characters.");
        isValid = false;
      }

      if (!gender) {
        showError("genderError", "Please select your gender.");
        isValid = false;
      }

      return isValid;
    };

    const resetButtonState = () => {
      submitBtn.textContent = "Join Academy";
      submitBtn.classList.remove("success-btn", "loading");
      submitBtn.disabled = false;
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!validate()) return;

      const email = emailInput ? emailInput.value.trim() : "";

      submitBtn.textContent = "Processing...";
      submitBtn.classList.add("loading");
      submitBtn.disabled = true;

      window.setTimeout(() => {
        submitBtn.textContent = "✅ Registered Successfully";
        submitBtn.classList.remove("loading");
        submitBtn.classList.add("success-btn");

        form.reset();
        clearErrors(form);

        window.setTimeout(() => {
          resetButtonState();
        }, 5000);
      }, 1000);
    });

    // Optional live validation
    if (nameInput) {
      nameInput.addEventListener("input", () => clearFieldError(nameInput));
    }
    if (emailInput) {
      emailInput.addEventListener("input", () => clearFieldError(emailInput));
    }
    if (passwordInput) {
      passwordInput.addEventListener("input", () =>
        clearFieldError(passwordInput),
      );
    }
    genderInputs.forEach((radio) => {
      radio.addEventListener("change", () => clearFieldError(radio));
    });

    form.addEventListener("reset", () => {
      window.setTimeout(() => {
        clearErrors(form);
        resetButtonState();
      }, 0);
    });
  }

  // ---------- Smooth scrolling ----------
  function initSmoothScrolling() {
    $all('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (!href || href === "#") return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  // ---------- Video hover playback ----------
  function initVideoHoverPlayback() {
    const videos = $all(".video-card video");
    if (!videos.length) return;

    videos.forEach((video) => {
      const card = video.closest(".video-card");
      if (!card) return;

      card.addEventListener("mouseenter", () => {
        video.play().catch(() => {});
      });

      card.addEventListener("mouseleave", () => {
        video.pause();
      });
    });
  }

  // ---------- Active nav highlight ----------
  function initActiveNavHighlight() {
    const sections = $all("section[id]");
    const navLinks = $all(".navbar a");
    if (!sections.length || !navLinks.length) return;

    const setActiveLink = () => {
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
          current = section.id;
        }
      });

      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${current}`,
        );
      });
    };

    window.addEventListener("scroll", setActiveLink, { passive: true });
    setActiveLink();
  }

  // ---------- Logo fade ----------
  function initLogoFade() {
    const logo = document.querySelector(".logo");
    if (!logo) return;

    const onScroll = () => {
      logo.style.opacity = window.scrollY > 100 ? "0.7" : "1";
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ---------- Counters ----------
  function initCounters() {
    const counters = $all(".counter");
    if (!counters.length) return;

    function formatNumber(num) {
      return num >= 1000 ? `${(num / 1000).toFixed(1)}K+` : `${num}+`;
    }

    function animateCounter(counter, target) {
      let start = 0;
      const duration = 2000;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = target / steps;

      const timer = window.setInterval(() => {
        start += increment;
        if (start >= target) {
          counter.innerText = formatNumber(target);
          clearInterval(timer);
        } else {
          counter.innerText = formatNumber(Math.ceil(start));
        }
      }, stepTime);
    }

    function startCounterLoop(counter) {
      const originalTarget = Number(counter.getAttribute("data-target")) || 0;

      const runAnimation = () => {
        const growthAmount = Math.floor(
          originalTarget * (0.05 + Math.random() * 0.1),
        );
        const currentTarget = originalTarget + growthAmount;

        counter.setAttribute("data-target", String(currentTarget));
        counter.innerText = "0";
        animateCounter(counter, currentTarget);
      };

      runAnimation();
      window.setInterval(runAnimation, 8000);
    }

    counters.forEach(startCounterLoop);
  }
})();
