import { slide } from './js/slider.js';
import { initVideoPlayer, updateMainVideo } from './js/videoPlayer.js';
import { initHeaderNav } from './js/headerNav.js';
import { initSliderComparison } from './js/sliderComparison.js';
import { initGallery } from './js/gallery.js';
import { initVideoslider } from './js/videoslider.js';
import { initTicketCalculator, saveTicketDateToStorage, restoreTicketDateFromStorageToForm, restoreTicketDateFromStorage } from './js/ticketСalculator.js';
import { initInteractiveMap } from './js/interactiveMap.js';
import { initTicketForm, openPopup } from './js/popup.js';

document.addEventListener('DOMContentLoaded', () => {
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

  // Валидация формы
  const nameInput = document.getElementById('name');

  nameInput.addEventListener('input', () => validateName(nameInput));
  nameInput.addEventListener('blur', () => clearErrorOnInput(nameInput));

  function validateName(el) {
    const name = el.value.trim();
    const errElCont = document.getElementById('nameErrCont');
    const errEl = document.getElementById('nameErr');
    const regex = /^[a-zA-Zа-яА-ЯёЁ\s]{3,15}$/;
    if (!name) {
      showError(errElCont, errEl, 'This field is required');
      return;
    }
    if (!regex.test(name)) {
      showError(errElCont, errEl, 'The name must contain 3-15 characters (letters and spaces only)');
      return;
    }
    hideError(errElCont, errEl);
  }

  function showError(errElCont, errEl, message) {
    errElCont.classList.add('booking__input-container--err');
    errEl.classList.add('booking__err-message--active');
    errEl.textContent = message;
  }

  function hideError(errElCont, errEl) {
    errElCont.classList.remove('booking__input-container--err');
    errEl.classList.remove('booking__err-message--active');
  }

  function clearErrorOnInput(el) {
    const fieldName = el.id;
    const errElCont = document.getElementById(`${fieldName}ErrCont`);
    const errEl = document.getElementById(`${fieldName}Err`);
    hideError(errElCont, errEl);
  }
});