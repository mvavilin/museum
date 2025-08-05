// Слайдер в секции Welcome
export function slide(items, prev, next, dotsContainer, dots, currentSlide, totalSlides) {
  let posX1 = 0,
    posX2 = 0,
    posInitial,
    posFinal,
    threshold = 100, // Порог срабатывания переключения слайда
    slides = items.querySelectorAll('.slider__slide'),
    slidesLength = slides.length,
    slideSize = items.querySelectorAll('.slider__slide')[0].offsetWidth,
    firstSlide = slides[0],
    lastSlide = slides[slidesLength - 1],
    cloneFirst = firstSlide.cloneNode(true),
    cloneLast = lastSlide.cloneNode(true),
    index = 0,
    allowShift = true, // Флаг, разрешающий переключение слайдов
    timer,
    interval = 5000;

  items.append(cloneFirst);
  items.prepend(cloneLast, firstSlide);

  // Начало перетаскивания слайда
  function dragStart(e) {
    e.preventDefault();
    posInitial = items.offsetLeft;

    if (e.type === 'touchstart') {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;

      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;

      items.style.setProperty('--slides-cursor', `grabbing`);
    }
  }

  // Действие при перетаскивании слайда
  function dragAction(e) {
    if (e.type === 'touchmove') {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }
    items.style.setProperty('--slides-left', `${items.offsetLeft - posX2}px`);

    stopAutoSlide();
  }

  // Завершение перетаскивания слайда
  function dragEnd(e) {
    posFinal = items.offsetLeft;
    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, 'drag');
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, 'drag');
    } else {
      items.style.setProperty('--slides-left', `${posInitial}px`);
    }

    document.onmouseup = null;
    document.onmousemove = null;

    items.style.setProperty('--slides-cursor', `grab`);
  }

  // Переключение слайда
  function shiftSlide(dir, action) {
    items.classList.add('slider__slides--shifting');

    if (allowShift) {
      if (!action) { posInitial = items.offsetLeft; }

      if (dir === 1) {
        items.style.setProperty('--slides-left', `${posInitial - slideSize}px`);
        index++;
      } else if (dir === -1) {
        items.style.setProperty('--slides-left', `${posInitial + slideSize}px`);
        index--;
      }
    };

    allowShift = false;
  }

  // Проверка и корректировка индекса слайда
  function checkIndex() {
    items.classList.remove('slider__slides--shifting');

    if (index === -1) {
      items.style.setProperty('--slides-left', `${-(slidesLength * slideSize)}px`);
      index = slidesLength - 1;
    }

    if (index === slidesLength) {
      items.style.setProperty('--slides-left', `${-(1 * slideSize)}px`);
      index = 0;
    }

    allowShift = true;

    updateActiveDot();
    updateSlideCounter();
  }

  // Обновление счетчика
  function updateSlideCounter() {
    currentSlide.textContent = '0' + (index + 1).toString();
  }

  // Обновление активной точки
  function updateActiveDot() {
    const activeDot = dotsContainer.querySelector(`[data-slide="${index}"]`);
    dots.forEach(dot => dot.classList.remove('slider__dot--active'));
    if (activeDot) activeDot.classList.add('slider__dot--active');
  }

  // Автопереключение слайда
  function startAutoSlide() {
    interval = 5000
    timer = setInterval(() => shiftSlide(1), interval);
  }

  function stopAutoSlide() {
    interval = 0;
    clearTimeout(timer);
  }

  // Инициализация
  totalSlides.textContent = '0' + slidesLength.toString();
  updateActiveDot();
  updateSlideCounter();
  startAutoSlide();

  // События мыши
  items.onmousedown = dragStart;

  // События касания (для мобильных устройств)
  items.addEventListener('touchstart', dragStart);
  items.addEventListener('touchend', dragEnd);
  items.addEventListener('touchmove', dragAction);

  // События клика
  prev.addEventListener('click', () => {
    shiftSlide(-1);
    stopAutoSlide();
  });
  next.addEventListener('click', () => {
    shiftSlide(1);
    stopAutoSlide();
  });

  // Обработка клика по точке
  dotsContainer.addEventListener('click', (e) => {
    const dot = e.target.closest('[data-slide]');

    if (!dot || !allowShift) return;

    const slideNum = parseInt(dot.getAttribute('data-slide'), 10);
    if (slideNum === index) return;

    items.classList.add('slider__slides--shifting');
    items.style.setProperty('--slides-left', `${-(slideNum + 1) * slideSize}px`);
    index = slideNum;
    allowShift = false;

    updateActiveDot();
    updateSlideCounter();

    if (interval === 0) startAutoSlide();
  });

  // События завершения анимации
  items.addEventListener('transitionend', checkIndex);
}