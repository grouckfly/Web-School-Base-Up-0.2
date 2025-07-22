// Variables
let currentSlide = 0;
const slides = document.querySelectorAll(".gallery-slide");
const totalSlides = slides.length;
let autoSlideInterval;

// Loading Screen
window.addEventListener("load", function () {
  setTimeout(function () {
    document.getElementById("loadingScreen").style.opacity = "0";
    setTimeout(function () {
      document.getElementById("loadingScreen").style.display = "none";
      document.getElementById("welcomeScreen").style.display = "flex";
    }, 500);
  }, 2000);
});

// Welcome Screen
function closeWelcome() {
  document.getElementById("welcomeScreen").style.opacity = "0";
  setTimeout(function () {
    document.getElementById("welcomeScreen").style.display = "none";
  }, 500);
}

// Navbar Scroll Effect
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Dark Mode Toggle
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");

themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeIcon.className = "fas fa-sun";
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.className = "fas fa-moon";
    localStorage.setItem("theme", "light");
  }
});

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeIcon.className = "fas fa-sun";
}

// Mobile Menu
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const sidebar = document.getElementById("sidebar");
const sidebarClose = document.getElementById("sidebarClose");

mobileMenuBtn.addEventListener("click", function () {
  sidebar.classList.add("open");
});

sidebarClose.addEventListener("click", function () {
  sidebar.classList.remove("open");
});

// Close sidebar when clicking on links
const sidebarLinks = document.querySelectorAll(".sidebar-menu a");
sidebarLinks.forEach((link) => {
  link.addEventListener("click", function () {
    sidebar.classList.remove("open");
  });
});

// Smooth Scrolling for Navigation Links
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Gallery Slider
function initGallery() {
  const container = document.getElementById("galleryContainer");
  const dotsContainer = document.getElementById("galleryDots");

  // Create dots
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("div");
    dot.className = "gallery-dot";
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  // Auto slide
  startAutoSlide();
}

function goToSlide(index) {
  const container = document.getElementById("galleryContainer");
  const dots = document.querySelectorAll(".gallery-dot");

  currentSlide = index;
  container.style.transform = `translateX(-${currentSlide * 100}%)`;

  dots.forEach((dot) => dot.classList.remove("active"));
  dots[currentSlide].classList.add("active");
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  goToSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  goToSlide(currentSlide);
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 4000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Gallery Navigation
document.getElementById("galleryNext").addEventListener("click", function () {
  stopAutoSlide();
  nextSlide();
  startAutoSlide();
});

document.getElementById("galleryPrev").addEventListener("click", function () {
  stopAutoSlide();
  prevSlide();
  startAutoSlide();
});

// Pause auto slide on hover
const gallerySlider = document.querySelector(".gallery-slider");
gallerySlider.addEventListener("mouseenter", stopAutoSlide);
gallerySlider.addEventListener("mouseleave", startAutoSlide);

// Contact Form Functions
function sendWhatsApp() {
  const form = document.getElementById("contactForm");
  const formData = new FormData(form);

  if (!validateForm()) return;

  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const subject = formData.get("subject");
  const message = formData.get("message");

  const whatsappMessage = `*Pesan dari Website Sekolah Anda*%0A%0A*Nama:* ${name}%0A*Email:* ${email}%0A*Telepon:* ${phone}%0A*Subjek:* ${subject}%0A*Pesan:*%0A${message}`;

  const whatsappNumber = "6281234567890"; // Ganti dengan nomor WhatsApp sekolah
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  window.open(whatsappURL, "_blank");
}

function sendEmail() {
  const form = document.getElementById("contactForm");
  const formData = new FormData(form);

  if (!validateForm()) return;

  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const subject = formData.get("subject");
  const message = formData.get("message");

  const emailSubject = `${subject} - dari ${name}`;
  const emailBody = `Nama: ${name}%0AEmail: ${email}%0ATelepon: ${phone}%0A%0APesan:%0A${message}`;

  const emailURL = `mailto:info@sman1jakarta.sch.id?subject=${emailSubject}&body=${emailBody}`;

  window.location.href = emailURL;
}

function validateForm() {
  const form = document.getElementById("contactForm");
  const inputs = form.querySelectorAll("input[required], textarea[required]");
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.style.border = "2px solid #ff4757";
      isValid = false;

      setTimeout(() => {
        input.style.border = "none";
      }, 3000);
    }
  });

  if (!isValid) {
    alert("Mohon lengkapi semua field yang required!");
  }

  return isValid;
}

// Add floating animation to cards
function addFloatingAnimation() {
  const cards = document.querySelectorAll(".about-card");
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.style.animation = "float 3s ease-in-out infinite";
  });
}

// CSS Animation for floating effect
const floatingCSS = `
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
        `;

const styleSheet = document.createElement("style");
styleSheet.textContent = floatingCSS;
document.head.appendChild(styleSheet);

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll(
  ".about-card, .contact-form, .contact-info"
);
animatedElements.forEach((element) => {
  element.style.opacity = "0";
  element.style.transform = "translateY(50px)";
  element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(element);
});

// Parallax effect for sections
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const sections = document.querySelectorAll(".section");

  sections.forEach((section) => {
    const rate = scrolled * -0.5;
    section.style.transform = `translateY(${rate}px)`;
  });
});

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initGallery();
  addFloatingAnimation();

  // Add ripple effect to buttons
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.position = "absolute";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(255, 255, 255, 0.3)";
      ripple.style.transform = "scale(0)";
      ripple.style.animation = "ripple 0.6s linear";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.style.width = size + "px";
      ripple.style.height = size + "px";

      button.style.position = "relative";
      button.style.overflow = "hidden";
      button.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// Add ripple animation CSS
const rippleCSS = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;

const rippleStyleSheet = document.createElement("style");
rippleStyleSheet.textContent = rippleCSS;
document.head.appendChild(rippleStyleSheet);

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener("keydown", function (e) {
  konamiCode.push(e.keyCode);

  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }

  if (
    konamiCode.length === konamiSequence.length &&
    konamiCode.every((code, index) => code === konamiSequence[index])
  ) {
    // Easter egg activated!
    document.body.style.animation = "rainbow 2s linear infinite";
    setTimeout(() => {
      document.body.style.animation = "";
    }, 5000);
  }
});

// Rainbow animation for easter egg
const rainbowCSS = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;

const rainbowStyleSheet = document.createElement("style");
rainbowStyleSheet.textContent = rainbowCSS;
document.head.appendChild(rainbowStyleSheet);