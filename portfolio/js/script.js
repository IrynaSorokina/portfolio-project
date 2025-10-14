document.addEventListener("DOMContentLoaded", () => {
  // Бургер-меню
  document.addEventListener("click", function (e) {
    if (e.target.closest(".icon-menu")) {
      document.documentElement.classList.toggle("menu-open");
    }
  });

  let swiperEdits;
  let currentMode = "mouse"; // поточний режим: "mouse" або "keyboard"

  // 1️⃣ Універсальна функція ініціалізації
  function initSwiper(loop = true) {
    if (swiperEdits) swiperEdits.destroy(true, true); // знищуємо попередній інстанс
    swiperEdits = new Swiper(".edits__slider", {
      loop: loop,
      slidesPerView: 3,
      spaceBetween: 40,
      freeMode: true,
      navigation: {
        nextEl: ".edits__arrow-move",
      },
      breakpoints: {
        320: { slidesPerView: 1.7, spaceBetween: 20 },
        450: { slidesPerView: 2, spaceBetween: 30 },
        768: { slidesPerView: 3, spaceBetween: 30 },
        1200: { slidesPerView: 3.2, spaceBetween: 40 },
      },
    });
  }

  // Стартуємо з loop: true (звичайна навігація)
  initSwiper(true);

  // 2️⃣ Перехід на клавіатуру (Tab)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab" && currentMode !== "keyboard") {
      currentMode = "keyboard";
      initSwiper(false); // вимикаємо loop для доступності
    }
  });

  // 3️⃣ Повернення до миші або тачу
  function backToMouse() {
    if (currentMode !== "mouse") {
      currentMode = "mouse";
      initSwiper(true); // знову вмикаємо loop
    }
  }
  document.addEventListener("mousedown", backToMouse);
  document.addEventListener("touchstart", backToMouse);
});
