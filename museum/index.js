import { slide } from './js/slider.js';
import { initVideoPlayer, updateMainVideo } from './js/videoPlayer.js';
import { initHeaderNav } from './js/headerNav.js';
import { initSliderComparison } from './js/sliderComparison.js';
import { initGallery } from './js/gallery.js';
import { initVideoslider } from './js/videoslider.js';
import { initTicketCalculator } from './js/ticketСalculator.js';
import { initInteractiveMap } from './js/interactiveMap.js';

// Инициализация бургер-меню и навигации
initHeaderNav();

// Инициализация управления шириной верхнего изображения в секции Explore
initSliderComparison();

// 
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

// Инициализация анимация при прокрутке изображений в секции Gallery
initGallery();

// Инициализация cлайдера в секции Video
initVideoslider(updateMainVideo);

// Инициализация калькулятора продажи билетов в секции Tickets
initTicketCalculator();

// Инициализация интерактивной карты в секции Contacts
const prices = { permanent: { basic: 20, senior: 10 }, temporary: { basic: 25, senior: 12.5 }, combined: { basic: 40, senior: 20 }, };
initInteractiveMap(prices);
