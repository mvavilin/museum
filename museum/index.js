import { slide } from './js/slider.js';

// Слайдер в секции Welcome
const slides = document.getElementById('slides'),
  sliderPrevBtn = document.getElementById('sliderPrevBtn'),
  sliderNextBtn = document.getElementById('sliderNextBtn');

slide(slides, sliderPrevBtn, sliderNextBtn);

// Прогресс-бар плеера
const progress = document.querySelector('.video-controller__progress');

progress.addEventListener('input', function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`;
});

// Громкость плеера
const volume = document.querySelector('.video-controller__volume');

volume.addEventListener('input', function () {
  const value = volume.value;
  volume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`;
});

// Бургер-меню и навигация
const burger = document.querySelector('.burger');
const headerNavWrapper = document.querySelector('.header__nav-wrapper');
const headerLinks = document.querySelectorAll('.header__link');

burger.addEventListener('click', function (e) {
  e.stopPropagation();
  burger.classList.toggle('burger--active');
  headerNavWrapper.classList.toggle('header__nav-wrapper--active');
});

headerLinks.forEach((link) => {
  link.addEventListener('click', () => {
    burger.classList.remove('burger--active');
    headerNavWrapper.classList.remove('header__nav-wrapper--active');
  });
});

document.addEventListener('click', (e) => {
  const target = e.target;
  const clickInsideNav = headerNavWrapper.contains(target);

  if (!clickInsideNav) {
    burger.classList.remove('burger--active');
    headerNavWrapper.classList.remove('header__nav-wrapper--active');
  }
});

// Управление шириной верхнего изображения
const afterImgWrapper = document.querySelector(
  '.slider-comparison__img-wrapper--after'
);
const handleControl = document.querySelector('.slider-comparison__handle');
const sliderComparisonControl = document.querySelector(
  '.slider-comparison__control'
);

sliderComparisonControl.addEventListener('input', () => {
  const value = sliderComparisonControl.value;
  afterImgWrapper.style.setProperty('--width-percent', `${value}%`);
  handleControl.style.setProperty('--width-percent', `${value}%`);
});
