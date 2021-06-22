document.addEventListener("DOMContentLoaded", function () {
  // Burger menu
  const burger = document.getElementById("burger-menu");
  const list = document.querySelector(".header-nav-list");

  function closeMenu() {
    burger.classList.remove("js-burger-open");
    list.classList.remove("show-mobile-menu");
  }

  function openMenu() {
    burger.classList.add("js-burger-open");
    list.classList.add("show-mobile-menu");
  }

  document.body.addEventListener("click", (e) => {
    const target = e.target;
    if (
      !target.closest(".burger-menu") &&
      !target.classList.contains("show-mobile-menu")
    ) {
      closeMenu();
    }
  });

  burger.addEventListener("click", () => {
    if (burger.classList.contains("js-burger-open")) {
      closeMenu();
      return;
    }

    openMenu();
  });

  window.addEventListener("resize", () => {
    closeMenu();
  });

  // Swiper slider
  const swiper = new Swiper(".swiper-container", {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
    speed: 500,
    effect: "fade",
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  // Tabs
  document.querySelectorAll(".tabs__button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const path = e.currentTarget.dataset.path;

      document.querySelectorAll(".tabs__button").forEach((content) => {
        content.classList.remove("tabs__button--active");
      });

      document
        .querySelector(`[data-path="${path}"]`)
        .classList.add("tabs__button--active");

      document.querySelectorAll(".how-we__content").forEach((content) => {
        content.classList.remove("how-we__content--active");
      });

      document
        .querySelector(`[data-target="${path}"]`)
        .classList.add("how-we__content--active");
    });
  });

  // Toggles
  // const toggles = document.querySelectorAll(".js-toggle");

  // toggles.forEach((toggle) => {
  //   toggle.addEventListener("click", () => {
  //     setTimeout(() => {
  //       toggle.parentNode.parentNode.classList.toggle("faq__question--active");
  //     }, 300);
  //   });
  // });

  // JQuery Toggles
  $(document).ready(function () {
    $(".js-accordion").accordion({
      collapsible: true,
      autoHeight: false,
      heightStyle: "content",
      active: false,
    });
  });
});
