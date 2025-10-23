document.addEventListener("DOMContentLoaded", () => {
  // Бургер-меню
  document.addEventListener("click", function (e) {
    if (e.target.closest(".icon-menu")) {
      document.documentElement.classList.toggle("menu-open");
    }

    //========================================================================================================================================================

    // Плавний скролл
    const gotoLink = e.target.closest("[data-goto]");
    if (gotoLink) {
      e.preventDefault();
      const selector = gotoLink.dataset.goto;
      const targetSection = document.querySelector(selector);

      if (targetSection) {
        const headerHeight = document.querySelector("header.header")?.offsetHeight || 0;
        const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Закриваємо бургер-меню після кліку
        document.documentElement.classList.remove("menu-open");
      }
    }
  });

  //========================================================================================================================================================

  emailjs.init("pyCGevbI30xmjskvz"); 

  const form = document.querySelector(".form-contacts");
  const status = document.createElement("div");
  status.className = "form-status";
  form.appendChild(status);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_a030p48", "template_d8caxxh", form)
      .then(() => {
        status.textContent = "✅ Message sent successfully!";
        form.reset();
      })
      .catch((error) => {
        status.textContent = "❌ Error: " + error.text;
      });
  });
  //========================================================================================================================================================

  let swiperEdits;
  let currentMode = "mouse"; // поточний режим: "mouse" або "keyboard"

  //  Універсальна функція ініціалізації
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

  // Перехід на клавіатуру (Tab)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab" && currentMode !== "keyboard") {
      currentMode = "keyboard";
      initSwiper(false); // вимикаємо loop для доступності
    }
  });

  //  Повернення до миші або тачу
  function backToMouse() {
    if (currentMode !== "mouse") {
      currentMode = "mouse";
      initSwiper(true); // знову вмикаємо loop
    }
  }
  document.addEventListener("mousedown", backToMouse);
  document.addEventListener("touchstart", backToMouse);
});
