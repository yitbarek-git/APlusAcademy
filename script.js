// MOBILE MENU (Hamburger)
const menuBtn = document.getElementById("menu-btn");
const navbar = document.querySelector(".navbar");

menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  menuBtn.classList.toggle("open");
  navbar.classList.toggle("active");
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!document.querySelector(".header").contains(e.target)) {
    menuBtn.classList.remove("open");
    navbar.classList.remove("active");
  }
});

// Close menu when clicking a link
document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", () => {
    menuBtn.classList.remove("open");
    navbar.classList.remove("active");
  });
});

//  DARK/LIGHT MODE
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Check saved theme
if (localStorage.getItem("aplus-theme") === "light") {
  body.classList.add("light");
  themeToggle.classList.replace("fa-moon", "fa-sun");
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");

  if (body.classList.contains("light")) {
    themeToggle.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("aplus-theme", "light");
  } else {
    themeToggle.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("aplus-theme", "dark");
  }
});

// Reveal Animations
const elementsToReveal = document.querySelectorAll(".reveal");

function checkRevealOnScroll() {
  const windowHeight = window.innerHeight;
  elementsToReveal.forEach((el) => {
    if (el.getBoundingClientRect().top < windowHeight - 0) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", checkRevealOnScroll);
window.addEventListener("load", checkRevealOnScroll);
checkRevealOnScroll();

//  FORM VALIDATION (Clean & simple)
const form = document.getElementById("registration-form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const gender = document.querySelector('input[name="gender"]:checked');

    // Simple checks
    if (!name || name.length < 3) {
      alert("Please enter your full name (min 3 characters)");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email address");
      return;
    }

    if (password.length < 4) {
      alert("Password must be at least 4 characters");
      return;
    }

    if (!gender) {
      alert("Please select your gender");
      return;
    }

    // Success!
    alert(
      `✅ Thank you ${name}! You've successfully joined Aplus Academy. We'll contact you at ${email}`,
    );
    form.reset();
  });
}

//  SMOOTH SCROLLING
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

//VIDEO PLAY/PAUSE ON HOVER (Optional)
const videos = document.querySelectorAll(".video-card video");

videos.forEach((video) => {
  video.parentElement.addEventListener("mouseenter", () => {
    video.play().catch(() => {}); // Ignore autoplay errors
  });

  video.parentElement.addEventListener("mouseleave", () => {
    video.pause();
  });
});

// ACTIVE NAVIGATION HIGHLIGHT
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// LOGO FADE ON SCROLL (Like your portfolio)
const logo = document.querySelector(".logo");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    logo.style.opacity = "0.7";
  } else {
    logo.style.opacity = "1";
  }
});

//COUNTER ANIMATION
const counters = document.querySelectorAll(".counter");

function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K+";
  }
  return num + "+";
}

function animateCounter(counter, target) {
  let start = 0;
  const duration = 2500; 
  const stepTime = 20;
  const steps = duration / stepTime;
  const increment = target / steps;
  
  const timer = setInterval(() => {
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
  const originalTarget = +counter.getAttribute("data-target");
  let currentTarget = originalTarget;
  
  function runAnimation() {
    const growthAmount = Math.floor(originalTarget * (0.05 + Math.random() * 0.1));
    currentTarget = originalTarget + growthAmount;
    
    // Update the displayed target
    counter.setAttribute("data-target", currentTarget);

    counter.innerText = "0";
    animateCounter(counter, currentTarget);
  }
  
  runAnimation();
  
  setInterval(runAnimation, 8000);//repeat after 8 seconds
}

counters.forEach(counter => {
  startCounterLoop(counter);
});