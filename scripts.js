// Burger menu
const burger = document.getElementById("burger-menu");
const menuList = document.getElementById("burger-menu");
const list = document.querySelector(".nav__breadcrumbs");
list.addEventListener("click", () => {
  if (list.offsetHeight !== 0) {
    list.classList.remove("show-mobile-menu");
  }
});

burger.addEventListener("click", () => {
  list.classList.add("show-mobile-menu");
});

window.addEventListener("resize", () => {
  list.classList.remove("show-mobile-menu");
});

// Swiper slider
const swiper = new Swiper(".swiper-container", {
  // autoplay: {
  //   delay: 5000,
  //   disableOnInteraction: false,
  // },
  speed: 500,
  loop: true,
  pagination: { el: ".swiper-pagination", clickable: true },
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
const toggles = document.querySelectorAll(".js-toggle__button");

toggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    toggle.parentNode.parentNode.classList.toggle("faq__question--active");
  });
});
