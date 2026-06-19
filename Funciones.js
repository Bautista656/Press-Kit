document.addEventListener("DOMContentLoaded", () => {
  // Menú responsive
  const menuToggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");
  const menuLinks = document.querySelectorAll(".menu a");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("open");
    });
  }

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (menu) {
        menu.classList.remove("open");
      }
    });
  });

  // Animaciones al hacer scroll
  const revealElements = document.querySelectorAll(".reveal");

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

    carouselSlides.forEach((slide) => {
      slide.classList.remove("active");
    });

    dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    carouselSlides[index].classList.add("active");

    if (dots[index]) {
      dots[index].classList.add("active");
    }
  }

  function nextSlide() {
    if (!carouselSlides.length) return;

    currentSlide++;

    if (currentSlide >= carouselSlides.length) {
      currentSlide = 0;
    }

    showSlide(currentSlide);
  }

  function prevSlide() {
    if (!carouselSlides.length) return;

    currentSlide--;

    if (currentSlide < 0) {
      currentSlide = carouselSlides.length - 1;
    }

    showSlide(currentSlide);
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", nextSlide);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", prevSlide);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Cambio automático cada 5 segundos
  if (carouselSlides.length > 1) {
    setInterval(nextSlide, 5000);
  }

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
});