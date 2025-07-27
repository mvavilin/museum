// Прогресс-бар плеера
const progressBar = document.querySelector(".control-unit__progress-bar");

progressBar.addEventListener("input", function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`;
});

// Громкость плеера
const volumeSlider = document.querySelector(".control-unit__volume-slider");

volumeSlider.addEventListener("input", function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`;
});

// Бургер-меню и навигация
const burger = document.querySelector(".burger");
const headerNavigation = document.querySelector(".header__list");

burger.addEventListener("click", function () {
  burger.classList.toggle("burger--active");
  headerNavigation.classList.toggle("header__list--active");
});

// Управление шириной верхнего изображения
const afterImgWrapper = document.querySelector(
  ".slider-comparison__img-wrapper--after"
);
const handleControl = document.querySelector(".slider-comparison__handle");
const sliderComparisonControl = document.querySelector(
  ".slider-comparison__control"
);

sliderComparisonControl.addEventListener("input", () => {
  const value = sliderComparisonControl.value;
  afterImgWrapper.style.setProperty("--width-percent", `${value}%`);
  handleControl.style.setProperty("--width-percent", `${value}%`);
});
