import { slide } from './js/slider.js';
import { initVideoPlayer, updateMainVideo } from './js/videoPlayer.js';
import { initHeaderNav } from './js/headerNav.js';
import { initSliderComparison } from './js/sliderComparison.js';
import { initGallery } from './js/gallery.js';
import { initVideoslider } from './js/videoslider.js';
import { initTicketCalculator, saveTicketDateToStorage, restoreTicketDateFromStorageToForm, restoreTicketDateFromStorage } from './js/ticketСalculator.js';
import { initInteractiveMap } from './js/interactiveMap.js';
import { initTicketForm, openPopup } from './js/popup.js';
import { formValidationInitialization } from './js/validation.js';

const disclaimer = document.getElementById('disclaimer');
setTimeout(() => disclaimer.classList.remove('disclaimer--active'), 20000);
let play = true;
const usePlay = (bool) => bool ? play = true : play = false;
const isPlay = () => play ? true : false;

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
// 

// Инициализация кастомного видеоплеера в секции Video
initVideoPlayer(isPlay);

// Инициализация анимация при прокрутке изображений в секции Gallery
initGallery();

// Инициализация cлайдера в секции Video
initVideoslider(updateMainVideo);

// Инициализация калькулятора продажи билетов в секции Tickets
initTicketCalculator(openPopup, usePlay);

// Инициализация интерактивной карты в секции Contacts
initInteractiveMap();

// Инициализация калькулятора продажи билетов в форме продажи билетов
initTicketForm(saveTicketDateToStorage, restoreTicketDateFromStorageToForm, restoreTicketDateFromStorage, usePlay);

// Инициализация валидации формы
formValidationInitialization();

// Плавная прокрутка вверх при клике
const backToTopButton = document.getElementById('returnToTop');
const disclaimerCloseBtn = document.getElementById('disclaimerCloseBtn');

disclaimer.classList.add('disclaimer--active');
disclaimerCloseBtn.addEventListener('click', () => disclaimer.classList.remove('disclaimer--active'));
if (window.pageYOffset > 0) disclaimer.classList.remove('disclaimer--active');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 0) {
    disclaimer.classList.remove('disclaimer--active');
  };
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add('return-to-top--active');
    // disclaimer.classList.add('disclaimer--inactive');
  } else {
    backToTopButton.classList.remove('return-to-top--active');
    // disclaimer.classList.remove('disclaimer--inactive');
    // setTimeout(() => disclaimer.classList.add('disclaimer--inactive'), 15000);
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});