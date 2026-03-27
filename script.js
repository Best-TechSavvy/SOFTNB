// ===== SLIDE STATE =====
const slides = document.querySelectorAll(".slide");
const backBtn = document.getElementById("back");
const nextBtn = document.getElementById("next");
const homeBtn = document.getElementById("nav-home");

let currentSlide = 0;

// ===== INIT =====
function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

// Show first slide on load
showSlide(currentSlide);

// ===== NAVIGATION =====
function nextSlide() {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    showSlide(currentSlide);
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    showSlide(currentSlide);
  }
}

function goHome() {
  currentSlide = 0;
  showSlide(currentSlide);
}


function nextSlide() {
  if (currentSlide >= slides.length - 1) return;
  currentSlide++;
  showSlide(currentSlide);
}

function prevSlide() {
  if (currentSlide <= 0) return;
  currentSlide--;
  showSlide(currentSlide);
}


// ===== BUTTON EVENTS =====
nextBtn.addEventListener("click", nextSlide);
backBtn.addEventListener("click", prevSlide);
homeBtn.addEventListener("click", goHome);