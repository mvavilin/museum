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

// Слайдер в секции Video
const videosInfo = [
  { videoId: "aWmJ5DgyWPI", poster: "poster0.jpg", title: "Exposition - Le Corps et l'Âme. De Donatello à Michel-Ange. Sculptures italiennes de la Renaissance" },
  { videoId: "2OR0OCr6uRE", poster: "poster1.jpg", title: "Petits contes de Printemps - La ruse du Renard 🦊" },
  { videoId: "NOhDysLnTvY", poster: "poster2.jpg", title: "Promenade dans les collections mésopotamiennes avec Ariane Thomas" },
  { videoId: "Vi5D6FKhRmo", poster: "poster3.jpg", title: "Au Louvre ! La Vénus de Milo" },
  { videoId: "zp1BXPX8jcU", poster: "poster4.jpg", title: "Welcome to the Louvre - Bienvenue au Louvre - Musée du Louvre" }
];
const videosCont = document.querySelector(".videoslider__videoslides");
let currentFrame = null;
let currentPoster = null;

function closeCurrentVideo() {
  if (currentFrame && currentPoster) {
    currentFrame.replaceWith(currentPoster);
    currentFrame = null;
    currentPoster = null;
  }
}
function createPoster(videoInfo, i) {
  const videoPoster = document.createElement("div");
  videoPoster.className = "videoslider__videoslide videoslide";
  videoPoster.setAttribute("data-index", i);
  videoPoster.innerHTML = `
  <div class="videoslide__wrapper">
    <div class="videoslide__header">
      <div class="videoslide__logo-wrapper">
        <img class="videoslide__logo" src="assets/svg/videoslider/logo.jpg" alt="Channel logo">
      </div>
      <p class="videoslide__title">${videoInfo.title}</p>
      <div class="icon videoslide__icon videoslide__icon--kebab"></div>
    </div>
    <img class="videoslide__preview" src="assets/img/poster/${videoInfo.poster}" alt="">
    <span class="icon videoslide__youtube-icon videoslide__youtube-icon--rect"></span>
    <span class="icon videoslide__youtube-icon videoslide__youtube-icon--pyramid"></span>
  </div>
  `;
  return videoPoster;
}
function createFrame(videoInfo) {
  const videoFrame = document.createElement("iframe");
  videoFrame.className = "videoslider__videoslide videoslide";
  videoFrame.setAttribute("src", `https://www.youtube.com/embed/${videoInfo.videoId}?autoplay=1`);
  videoFrame.setAttribute("allow", "autoplay; encrypted-media");
  videoFrame.setAttribute("allowfullscreen", "true");
  return videoFrame;
}
function handlePosterClick(e) {
  const clickedPoster = e.target.closest(".videoslider__videoslide");
  if (!clickedPoster) return;

  const index = clickedPoster.getAttribute("data-index");
  if (index === null) return;

  const videoInfo = videosInfo[+index];

  closeCurrentVideo();

  const newVideoFrame = createFrame(videoInfo);
  clickedPoster.replaceWith(newVideoFrame);

  currentPoster = clickedPoster;
  currentFrame = newVideoFrame;
}

videosInfo.forEach((videoInfo, i) => { videosCont.append(createPoster(videoInfo, i)) });
videosCont.addEventListener("click", handlePosterClick);
