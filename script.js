// ===== BUTTON COLOR LOGIC (define FIRST) =====
const colorMap = {
  "rgb(14, 150, 127)": "rgb(0, 87, 183)", // green → purple
  "rgb(0, 87, 183)": "rgb(255, 215, 0)",  // purple → yellow
  "rgb(255, 215, 0)": "rgb(90, 50, 181)",   // yellow → blue
  "rgb(90, 50, 181)": "rgb(14, 150, 127)"   // blue → green
};

// ===== SLIDE STATE =====
const slides = document.querySelectorAll(".slide");
const backBtn = document.getElementById("back");
const nextBtn = document.getElementById("next");
const homeBtn = document.getElementById("nav-home");

let currentSlide = 0;
let gray = 100;

function updateButtonColor(slide) {
  const bgColor = getComputedStyle(slide).backgroundColor;
  const btnColor = colorMap[bgColor];

  // Always set something so it never stays undefined
  document.documentElement.style.setProperty(
    "--nav-btn-color",
    btnColor || "rgb(0,0,0)"
  );
}

function animateSlide(fromIndex, toIndex, direction) {
  const current = slides[fromIndex];
  const next = slides[toIndex];

  // Reset all slides
  slides.forEach(slide => {
    slide.classList.remove(
      "active",
      "center",
      "off-left",
      "off-right"
    );
  });

  // Prepare starting positions
  if (direction === "next") {
    next.classList.add("off-right");
    current.classList.add("center");
  } else {
    next.classList.add("off-left");
    current.classList.add("center");
  }

  // Activate both
  current.classList.add("active");
  next.classList.add("active");

  // Force browser reflow
  void next.offsetWidth;

  // Animate
  if (direction === "next") {
    current.classList.replace("center", "off-left");
    next.classList.replace("off-right", "center");
  } else {
    current.classList.replace("center", "off-right");
    next.classList.replace("off-left", "center");
  }

  // Cleanup after animation
  setTimeout(() => {
    current.classList.remove("active");
    updateButtonColor(next);
    updateUI(toIndex);
  }, 600);
}

// ===== INIT / RENDER =====
function updateUI(index) {
  const isFirst = index === 0;
  const isLast = index === slides.length - 1;

  homeBtn.classList.toggle("hidden", isFirst);
  backBtn.classList.toggle("hidden", isFirst);
  nextBtn.classList.toggle("hidden", isLast);

  const progressBar = document.getElementById("progress-bar");
  const progressPercent = (index / (slides.length - 1)) * 100;
  progressBar.style.width = `${progressPercent}%`;

  slides[index].style.filter = `grayscale(${gray}%)`;
}

// ===== NAVIGATION =====
function nextSlide() {
  if (currentSlide >= slides.length - 1) return;

  const prev = currentSlide;
  currentSlide++;
  gray -= 100 / slides.length;

  animateSlide(prev, currentSlide, "next");
}

function prevSlide() {
  if (currentSlide <= 0) return;

  const prev = currentSlide;
  currentSlide--;
  gray += 100 / slides.length;

  animateSlide(prev, currentSlide, "prev");
}

function goHome() {
  if (currentSlide === 0) return;

  function step() {
    if (currentSlide === 0) return;

    const prev = currentSlide;
    currentSlide--;
    gray += 100 / slides.length;

    animateSlide(prev, currentSlide, "prev");

    setTimeout(step, 620);
  }
  step();
}
// ===== BUTTON EVENTS =====
nextBtn.addEventListener("click", nextSlide);
backBtn.addEventListener("click", prevSlide);
homeBtn.addEventListener("click", goHome);

// Show first slide on load (after everything is defined)
slides.forEach((slide, i) => {
  slide.classList.add(i === 0 ? "active" : "off-right");
});
slides[0].classList.add("center");

updateUI(0);
updateButtonColor(slides[0]);
