import { slide } from './js/slider.js';
import { initVideoPlayer } from './js/videoPlayer.js';

// Бургер-меню и навигация
const burger = document.querySelector('.burger');
const headerNav = document.querySelector('.header__nav');
const headerNavWrapper = document.querySelector('.header__nav-wrapper');
const headerLinks = document.querySelectorAll('.header__link');

burger.addEventListener('click', function (e) {
  e.stopPropagation();
  burger.classList.toggle('burger--active');
  headerNav.classList.toggle('header__nav--visibility');
  headerNavWrapper.classList.toggle('header__nav-wrapper--active');
});

headerLinks.forEach((link) => {
  link.addEventListener('click', () => {
    burger.classList.remove('burger--active');
    headerNav.classList.toggle('header__nav--visibility');
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

// Слайдер в секции Welcome
const slides = document.getElementById('slides'),
  sliderPrevBtn = document.getElementById('sliderPrevBtn'),
  sliderNextBtn = document.getElementById('sliderNextBtn'),
  sliderPagination = document.querySelector('.slider__pagination'),
  sliderDots = document.querySelectorAll('.slider__dot'),
  sliderCurrentSlide = document.querySelector('.slider__current-slide'),
  sliderTotalSlides = document.querySelector('.slider__total-slides');

slide(slides, sliderPrevBtn, sliderNextBtn, sliderPagination, sliderDots, sliderCurrentSlide, sliderTotalSlides);

// Инициализация кастомного видеоплеера в секции Video
initVideoPlayer();