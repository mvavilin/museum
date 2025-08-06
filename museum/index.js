import { slide } from './js/slider.js';
import { initVideoPlayer } from './js/videoPlayer.js';
import { initHeaderNav } from './js/headerNav.js';
import { initSliderComparison } from './js/sliderComparison.js';

// Инициализация бургер-меню и навигации
initHeaderNav();

// Инициализация управления шириной верхнего изображения в секции Explore
initSliderComparison();

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