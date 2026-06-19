document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");
  const menuLinks = document.querySelectorAll(".menu a");
  const revealElements = document.querySelectorAll(".reveal");

  let menuHistoryActive = false;

  function openMenu() {
    if (!menu || !menuToggle) return;

    menu.classList.add("open");
    menuToggle.classList.add("open");
    document.body.classList.add("menu-open");

    if (!menuHistoryActive) {
      history.pushState({ menuOpen: true }, "");
      menuHistoryActive = true;
    }
  }

  function closeMenu(fromBackButton = false) {
    if (!menu || !menuToggle) return;

    menu.classList.remove("open");
    menuToggle.classList.remove("open");
    document.body.classList.remove("menu-open");

    if (fromBackButton) {
      menuHistoryActive = false;
    }
  }

  function isMenuOpen() {
    return menu && menu.classList.contains("open");
  }

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", (event) => {
      event.stopPropagation();

      if (isMenuOpen()) {
        closeMenu(false);
      } else {
        openMenu();
      }
    });
  }

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu(false);
    });
  });

  document.addEventListener("click", (event) => {
    if (!isMenuOpen()) return;

    const clickDentroDelMenu = menu.contains(event.target);
    const clickEnBoton = menuToggle.contains(event.target);

    if (!clickDentroDelMenu && !clickEnBoton) {
      closeMenu(false);
    }
  });

  window.addEventListener("popstate", () => {
    if (isMenuOpen()) {
      closeMenu(true);
    }
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

  if (carouselSlides.length > 1) {
    setInterval(nextSlide, 5000);
  }

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