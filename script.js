// ========================================
// APLUS ACADEMY - SIMPLE & CLEAN JS
// ========================================

// === 1. MOBILE MENU (Hamburger) ===
const menuBtn = document.getElementById('menu-btn');
const navbar = document.querySelector('.navbar');

menuBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  menuBtn.classList.toggle('open');
  navbar.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!document.querySelector('.header').contains(e.target)) {
    menuBtn.classList.remove('open');
    navbar.classList.remove('active');
  }
});

// Close menu when clicking a link
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', () => {
    menuBtn.classList.remove('open');
    navbar.classList.remove('active');
  });
});

// === 2. DARK/LIGHT MODE ===
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check saved theme
if (localStorage.getItem('aplus-theme') === 'light') {
  body.classList.add('light');
  themeToggle.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light');
  
  if (body.classList.contains('light')) {
    themeToggle.classList.replace('fa-moon', 'fa-sun');
    localStorage.setItem('aplus-theme', 'light');
  } else {
    themeToggle.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('aplus-theme', 'dark');
  }
});

// === 3. REVEAL ON SCROLL (Simple) ===
const reveals = document.querySelectorAll('.reveal');

function revealScroll() {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealScroll);
window.addEventListener('load', revealScroll);

// === 4. SIMPLE COUNTERS (Just show numbers - no complex animation) ===
// For simplicity, just display the numbers - they're already in HTML
// If you want simple counting, uncomment below:
/*
const counters = document.querySelectorAll('.stat-number');
counters.forEach(counter => {
  const target = parseInt(counter.innerText);
  let count = 0;
  const update = setInterval(() => {
    if (count < target) {
      count += Math.ceil(target / 50);
      counter.innerText = count + '+';
    } else {
      counter.innerText = target + '+';
      clearInterval(update);
    }
  }, 30);
});
*/

// === 5. FORM VALIDATION (Clean & simple) ===
const form = document.getElementById('registration-form');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const age = document.getElementById('age').value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const region = document.getElementById('region').value;

    // Simple checks
    if (!name || name.length < 3) {
      alert('Please enter your full name (min 3 characters)');
      return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      alert('Please enter a valid email address');
      return;
    }
    
    if (password.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }
    
    if (!age || age < 16 || age > 50) {
      alert('Age must be between 16 and 50');
      return;
    }
    
    if (!gender) {
      alert('Please select your gender');
      return;
    }
    
    if (!region) {
      alert('Please select your region');
      return;
    }
    
    // Success!
    alert(`✅ Thank you ${name}! You've successfully joined Aplus Academy. We'll contact you at ${email}`);
    form.reset();
  });
}

// === 6. SMOOTH SCROLLING ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// === 7. VIDEO PLAY/PAUSE ON HOVER (Optional) ===
const videos = document.querySelectorAll('.video-card video');

videos.forEach(video => {
  video.parentElement.addEventListener('mouseenter', () => {
    video.play().catch(() => {}); // Ignore autoplay errors
  });
  
  video.parentElement.addEventListener('mouseleave', () => {
    video.pause();
  });
});

// === 8. ACTIVE NAVIGATION HIGHLIGHT ===
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// === 9. LOGO FADE ON SCROLL (Like your portfolio) ===
const logo = document.querySelector('.logo');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    logo.style.opacity = '0.7';
  } else {
    logo.style.opacity = '1';
  }
});
