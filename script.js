/* ===================================================
   CHETENDRA SINGH — Portfolio Scripts
   =================================================== */

/* TYPING ANIMATION */
const roles = [
  "Backend Developer",
  "Data Engineering Intern",
  "ML Enthusiast",
  "DSA Problem Solver",
  "Open Source Builder",
  "Open to Work 🚀",
];

let roleIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById("typed-text");

function type() {
  const current = roles[roleIndex];
  if (!isDeleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      setTimeout(() => { isDeleting = true; type(); }, 2000);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(type, isDeleting ? 40 : 80);
}
type();

/* MATRIX RAIN */
const canvas = document.getElementById("matrix-bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const chars = "01アイウエオカキクケコ<>{}[]()#$%&ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 14;
let columns, drops;

function initMatrix() {
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
}
initMatrix();
window.addEventListener("resize", initMatrix);

function drawMatrix() {
  ctx.fillStyle = "rgba(8,11,16,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,212,255,0.75)";
  ctx.font = fontSize + "px JetBrains Mono, monospace";
  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(char, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
setInterval(drawMatrix, 60);

/* NAVBAR SCROLL */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

/* HAMBURGER */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
hamburger.addEventListener("click", () => navLinks.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

/* SCROLL REVEAL */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.08 });
document.querySelectorAll(".section").forEach(s => observer.observe(s));

/* ACCURACY BAR ANIMATION on scroll */
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target.querySelector(".accuracy-fill");
      if (fill) {
        fill.style.animation = "none";
        fill.offsetHeight;
        fill.style.animation = "fill-bar 1.4s ease forwards";
      }
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll(".project-card").forEach(c => barObserver.observe(c));