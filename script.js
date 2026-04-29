// ===== BUTTON COLOR LOGIC (define FIRST) =====
const colorMap = {
  "rgb(14, 150, 127)": "rgb(0, 87, 183)", // green → purple
  "rgb(0, 87, 183)": "rgb(255, 215, 0)",  // purple → yellow
  "rgb(255, 215, 0)": "rgb(90, 50, 181)",   // yellow → blue
  "rgb(90, 50, 181)": "rgb(14, 150, 127)"   // blue → green
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
let gray = 100;

// ===== INIT / RENDER =====
function showSlide(index, gray) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");

  // Update button color based on current slide background
  updateButtonColor(slides[index]);

  // ===== BUTTON VISIBILITY RULES =====
  const isFirst = index === 0;
  const isLast = index === slides.length - 1;

  // Home hidden on home slide
  homeBtn.classList.toggle("hidden", isFirst);

  // Prev hidden if no slide before
  backBtn.classList.toggle("hidden", isFirst);

  // Next hidden if no slide after
  nextBtn.classList.toggle("hidden", isLast);

  slides[index].style.filter = "grayscale("+gray+"%)";

  // ===== PROGRESS BAR UPDATE =====
  const progressBar = document.getElementById("progress-bar");
  const progressPercent = (index / (slides.length - 1)) * 100;
  progressBar.style.width = `${progressPercent}%`;
}

// ===== NAVIGATION =====
function nextSlide() {
  if (currentSlide >= slides.length - 1) return;
  currentSlide++;
  gray -= 100/slides.length;
  showSlide(currentSlide, gray);
}

function prevSlide() {
  if (currentSlide <= 0) return;
  currentSlide--;
  gray += 100/slides.length;
  showSlide(currentSlide, gray);
}

function goHome() {
  currentSlide = 0;
  gray = 100;
  showSlide(currentSlide, gray);
}

// ===== BUTTON EVENTS =====
nextBtn.addEventListener("click", nextSlide);
backBtn.addEventListener("click", prevSlide);
homeBtn.addEventListener("click", goHome);

// Show first slide on load (after everything is defined)
showSlide(currentSlide, gray);
