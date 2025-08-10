import { slide } from './js/slider.js';
import { initVideoPlayer, updateMainVideo } from './js/videoPlayer.js';
import { initHeaderNav } from './js/headerNav.js';
import { initSliderComparison } from './js/sliderComparison.js';
import { initGallery } from './js/gallery.js';
import { initVideoslider } from './js/videoslider.js';
import { initTicketCalculator, saveTicketDateToStorage, restoreTicketDateFromStorageToForm, restoreTicketDateFromStorage } from './js/ticketСalculator.js';
import { initInteractiveMap } from './js/interactiveMap.js';
import { initTicketForm, openPopup } from './js/popup.js';

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
document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const btnSubmit = document.querySelector('.popup__btn');

  nameInput.addEventListener('input', () => validateName(nameInput));
  nameInput.addEventListener('blur', () => clearErrorOnInput(nameInput));
  emailInput.addEventListener('input', () => validateEmail(emailInput));
  emailInput.addEventListener('blur', () => clearErrorOnInput(emailInput));
  phoneInput.addEventListener('input', () => validatePhone(phoneInput));
  phoneInput.addEventListener('blur', () => {
    formatPhoneInput(phoneInput);
    clearErrorOnInput(phoneInput);
  });

  function validateName(el) {
    const name = el.value.trim();
    const errElCont = document.getElementById('nameErrCont');
    const errEl = document.getElementById('nameErr');
    const regex = /^[a-zA-Zа-яА-ЯёЁ\s]{3,15}$/;
    if (!name) {
      showError(errElCont, errEl, 'This field is required');
      return false;
    }
    if (!regex.test(name)) {
      showError(errElCont, errEl, 'The name must contain 3-15 characters (letters and spaces only)');
      return false;
    }
    hideError(errElCont, errEl);
    return true;
  }

  function validateEmail(el) {
    const email = el.value.trim();
    const errElCont = document.getElementById('emailErrCont');
    const errEl = document.getElementById('emailErr');
    const regex = /^[a-zA-Z0-9_-]{3,15}@[a-zA-Z]{4,}\.[a-zA-Z]{2,}$/;
    if (!email) {
      showError(errElCont, errEl, 'Email is required');
      return false;
    }
    if (!regex.test(email)) {
      showError(errElCont, errEl, 'Enter email in username@example.com format');
      return false;
    }
    hideError(errElCont, errEl);
    return true;
  }

  function validatePhone(el) {
    const phone = el.value.trim();
    const errElCont = document.getElementById('phoneErrCont');
    const errEl = document.getElementById('phoneErr');
    const digitsOnly = phone.replace(/[^0-9]/g, '');
    const regex = /^(\d{2,3}[ -]?)+\d{2,3}$|^\d+$/;
    if (!phone) {
      showError(errElCont, errEl, 'Phone number is required');
      return false;
    }
    if (digitsOnly.length > 10) {
      showError(errElCont, errEl, 'Phone number must contain no more than 10 digits');
      return false;
    }
    if (!regex.test(phone)) {
      showError(errElCont, errEl, 'Phone number must contain only digits, separated by spaces or hyphens');
      return false;
    }
    hideError(errElCont, errEl);
    return true;
  }

  function formatPhoneInput(el) {
    let digits = el.value.replace(/[^0-9]/g, '');
    if (digits.length > 10) {
      digits = digits.substring(0, 10);
    }
    let formatted = '';
    digits.length > 3 ? formatted = digits.substring(0, 3) + '-' + digits.substring(3) : formatted = digits;
    if (formatted.length > 7) {
      formatted = formatted.substring(0, 7) + '-' + formatted.substring(7);
    }
    el.value = formatted;
  }

  function showError(errElCont, errEl, message) {
    errElCont.classList.add('booking__input-container--err');
    errEl.classList.add('booking__err-message--active');
    btnSubmit.classList.add('popup__btn--inactive');
    errEl.textContent = message;
  }

  function hideError(errElCont, errEl) {
    errElCont.classList.remove('booking__input-container--err');
    errEl.classList.remove('booking__err-message--active');
    btnSubmit.classList.remove('popup__btn--inactive');
  }

  function clearErrorOnInput(el) {
    const fieldName = el.id;
    const errElCont = document.getElementById(`${fieldName}ErrCont`);
    const errEl = document.getElementById(`${fieldName}Err`);
    hideError(errElCont, errEl);
  }

  const form = document.querySelector('.popup__form');
  if (form) {
    form.addEventListener('submit', (e) => {
      const isNameValid = validateName(nameInput);
      const isEmailValid = validateEmail(emailInput);
      const isPhoneValid = validatePhone(phoneInput);
      if (!isNameValid || !isEmailValid || !isPhoneValid) { e.preventDefault(); }
    });
  }
});