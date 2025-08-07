import { slide } from './js/slider.js';
import { initVideoPlayer } from './js/videoPlayer.js';
import { initHeaderNav } from './js/headerNav.js';
import { initSliderComparison } from './js/sliderComparison.js';
import { initGallery } from './js/gallery.js';

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


// const iframe = document.getElementById("videoFrame");

// const originalSrc = iframe.getAttribute("src");
// const originalSrcdoc = iframe.getAttribute("srcdoc");

// function resetPreview() {
//   iframe.setAttribute("src", originalSrc);
//   iframe.setAttribute("srcdoc", originalSrcdoc);
// }

const videos = [
  { videoId: "aWmJ5DgyWPI", poster: "poster0.jpg", title: "Exposition - Le Corps et l'Âme. De Donatello à Michel-Ange. Sculptures italiennes de la Renaissance" },
  { videoId: "Vi5D6FKhRmo", poster: "poster1.jpg", title: "Au Louvre ! La Vénus de Milo" },
  { videoId: "NOhDysLnTvY", poster: "poster2.jpg", title: "Promenade dans les collections mésopotamiennes avec Ariane Thomas" },
  { videoId: "2OR0OCr6uRE", poster: "poster3.jpg", title: "Petits contes de Printemps - La ruse du Renard 🦊" },
  { videoId: "zp1BXPX8jcU", poster: "poster4.jpg", title: "Welcome to the Louvre - Bienvenue au Louvre - Musée du Louvre" }
];

const videosCont = document.querySelector(".videoslider__videoslides");

videos.forEach((video, index) => {
  const videoEl = document.createElement("div");
  videoEl.className = "videoslider__videoslide videoslide";
  videoEl.setAttribute("data-index", index);
  videoEl.innerHTML = `
  <div class="videoslide__wrapper">
    <div class="videoslide__header">
      <div class="videoslide__logo-wrapper">
        <img class="videoslide__logo" src="assets/svg/videoslider/logo.jpg" alt="Channel logo">
      </div>
      <p class="videoslide__title">${video.title}</p>
      <div class="icon videoslide__icon videoslide__icon--kebab"></div>
    </div>
    <img class="videoslide__preview" src="assets/img/poster/${video.poster}" alt="">
    <span class="icon videoslide__youtube-icon videoslide__youtube-icon--rect"></span>
    <span class="icon videoslide__youtube-icon videoslide__youtube-icon--pyramid"></span>
  </div>
  `;

  videosCont.append(videoEl);
});

videosCont.addEventListener("click", (e) => {
  const videoEl = e.target.closest(".videoslider__videoslide");
  if (!videoEl) return;

  const index = videoEl.getAttribute("data-index");
  if (index === null) return;

  const video = videos[+index];

  const iframe = document.createElement("iframe");
  iframe.className = "videoslider__videoslide videoslide";
  iframe.setAttribute("src", `https://www.youtube.com/embed/${video.videoId}?autoplay=1`);
  iframe.setAttribute("allow", "autoplay; encrypted-media");
  iframe.setAttribute("allowfullscreen", "true");

  videoEl.replaceWith(iframe);
});
