// ===== BUTTON COLOR LOGIC (define FIRST) =====
const colorMap = {
  "rgb(14, 150, 127)": "rgb(90, 50, 181)", // green → purple
  "rgb(90, 50, 181)": "rgb(255, 215, 0)",  // purple → yellow
  "rgb(255, 215, 0)": "rgb(0, 87, 183)",   // yellow → blue
  "rgb(0, 87, 183)": "rgb(14, 150, 127)"   // blue → green
};

function updateButtonColor(slide) {
  const bgColor = getComputedStyle(slide).backgroundColor;
  const btnColor = colorMap[bgColor];

  // Always set something so it never stays undefined
  document.documentElement.style.setProperty(
    "--nav-btn-color",
    btnColor || "rgb(0,0,0)"
  );
}

// ===== SLIDE STATE =====
const slides = document.querySelectorAll(".slide");
const backBtn = document.getElementById("back");
const nextBtn = document.getElementById("next");
const homeBtn = document.getElementById("nav-home");

let currentSlide = 0;

// ===== INIT / RENDER =====
function showSlide(index) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");
  updateButtonColor(slides[index]);
}

// ===== NAVIGATION =====
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

function goHome() {
  currentSlide = 0;
  showSlide(currentSlide);
}

// ===== BUTTON EVENTS =====
nextBtn.addEventListener("click", nextSlide);
backBtn.addEventListener("click", prevSlide);
homeBtn.addEventListener("click", goHome);

// Show first slide on load (after everything is defined)
showSlide(currentSlide);