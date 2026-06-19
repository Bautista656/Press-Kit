const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");
const menuLinks = document.querySelectorAll(".menu a");
const revealElements = document.querySelectorAll(".reveal");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("open");
});

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("open");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((element) => {
  observer.observe(element);
});

// Carrusel de fotos del hero
const carouselSlides = document.querySelectorAll(".carousel-slide");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentSlide = 0;

function showSlide(index) {
  if (!carouselSlides.length) return;

  carouselSlides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  carouselSlides[index].classList.add("active");
  dots[index].classList.add("active");
}

function nextSlide() {
  currentSlide++;

  if (currentSlide >= carouselSlides.length) {
    currentSlide = 0;
  }

  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide--;

  if (currentSlide < 0) {
    currentSlide = carouselSlides.length - 1;
  }

  showSlide(currentSlide);
}

if (nextBtn && prevBtn) {
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
});

// Cambio automático cada 4 segundos
setInterval(nextSlide, 5000);

// Botón ver más en presentaciones
const showMoreVenuesBtn = document.getElementById("showMoreVenues");
const hiddenVenues = document.querySelectorAll(".venue-hidden");

if (showMoreVenuesBtn) {
  showMoreVenuesBtn.addEventListener("click", () => {
    hiddenVenues.forEach((venue) => {
      venue.classList.remove("venue-hidden");
    });

    showMoreVenuesBtn.style.display = "none";
  });
}
