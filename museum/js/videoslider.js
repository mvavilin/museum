// Слайдер в секции Video
export function initVideoslider(updateMainVideoCallback) {
	const videosInfo = [
		{ videoId: "aWmJ5DgyWPI", poster: "poster0.jpg", video: "video0.mp4", title: "Exposition - Le Corps et l'Âme. De Donatello à Michel-Ange. Sculptures italiennes de la Renaissance" },
		{ videoId: "2OR0OCr6uRE", poster: "poster1.jpg", video: "video1.mp4", title: "Petits contes de Printemps - La ruse du Renard 🦊" },
		{ videoId: "NOhDysLnTvY", poster: "poster2.jpg", video: "video2.mp4", title: "Promenade dans les collections mésopotamiennes avec Ariane Thomas" },
		{ videoId: "Vi5D6FKhRmo", poster: "poster3.jpg", video: "video3.mp4", title: "Au Louvre ! La Vénus de Milo" },
		{ videoId: "zp1BXPX8jcU", poster: "poster4.jpg", video: "video4.mp4", title: "Welcome to the Louvre - Bienvenue au Louvre - Musée du Louvre" }
	];
	const videosCont = document.querySelector(".videoslider__videoslides");
	videosCont.isDragging = false;
	let currentFrame = null;
	let currentPoster = null;

	// Инициализация
	videosInfo.forEach((videoInfo, i) => { videosCont.append(createPoster(videoInfo, i)) });
	videosCont.addEventListener("click", handlePosterClick);

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
		if (videosCont.isDragging) return;
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
		updateMainVideoCallback();
	}

	const videosliderPrevBtn = document.getElementById('videosliderPrevBtn'),
		videosliderNextBtn = document.getElementById('videosliderNextBtn'),
		videosliderPagination = document.querySelector('.videoslider__pagination'),
		videosliderDots = document.querySelectorAll('.videoslider__dot');

	videoslider(videosCont, videosliderPrevBtn, videosliderNextBtn, videosliderPagination, videosliderDots);

	function videoslider(items, prev, next, dotsContainer, dots) {
		let posX1 = 0,
			posX2 = 0,
			posInitial,
			posFinal,
			threshold = 100, // Порог срабатывания переключения слайда
			slides = items.querySelectorAll('.videoslider__videoslide'),
			slidesLength = slides.length,
			slideSize = items.querySelectorAll('.videoslider__videoslide')[0].offsetWidth,
			firstSlide = slides[0],
			secondSlide = slides[1],
			lastSlide = slides[slidesLength - 1],
			preLastSlide = slides[slidesLength - 2],
			cloneFirst = firstSlide.cloneNode(true),
			cloneSecond = secondSlide.cloneNode(true),
			cloneLast = lastSlide.cloneNode(true),
			clonePreLast = preLastSlide.cloneNode(true),
			index = 0,
			virtualIndex = 0,
			allowShift = true; // Флаг, разрешающий переключение слайдов
		const videoslideMarginRight = parseInt(getComputedStyle(items).getPropertyValue('--videoslideMarginRight'), 10) * 10;

		// Инициализация
		updateActiveDot();
		items.append(cloneFirst, cloneSecond);
		items.prepend(clonePreLast, cloneLast, firstSlide);

		// Начало перетаскивания слайда
		function dragStart(e) {
			posInitial = items.offsetLeft;
			if (e.type === 'touchstart') {
				posX1 = e.touches[0].clientX;
			} else {
				posX1 = e.clientX;
				document.onmousemove = dragAction;
				document.onmouseup = dragEnd;
				items.style.setProperty('--videoslidesCursor', `grabbing`);
			}
		}
		// Действие при перетаскивании слайда
		function dragAction(e) {
			items.isDragging = true;
			if (e.type === 'touchmove') {
				posX2 = posX1 - e.touches[0].clientX;
				posX1 = e.touches[0].clientX;
			} else {
				posX2 = posX1 - e.clientX;
				posX1 = e.clientX;
			}
			items.style.setProperty('--videoslidesLeft', `${items.offsetLeft - posX2}px`);
		}
		// Завершение перетаскивания слайда
		function dragEnd(e) {
			setTimeout(() => { items.isDragging = false; }, 50);
			posFinal = items.offsetLeft;
			if (posFinal - posInitial < -threshold) {
				shiftSlide(1, 'drag');
			} else if (posFinal - posInitial > threshold) {
				shiftSlide(-1, 'drag');
			} else {
				items.style.setProperty('--videoslidesLeft', `${posInitial}px`);
			}
			document.onmouseup = null;
			document.onmousemove = null;
			items.style.setProperty('--videoslidesCursor', `grab`);
		}
		function validateIndex(i, min, max) {
			if (i < min) return max;
			if (i > max) return 0;
			return i;
		}
		// Переключение слайда
		function shiftSlide(dir, action) {
			items.classList.add('videoslider__videoslides--shifting');
			if (allowShift) {
				if (!action) { posInitial = items.offsetLeft; }
				if (dir === 1) {
					items.style.setProperty('--videoslidesLeft', `${posInitial - (slideSize + videoslideMarginRight)}px`);
					index++;
					virtualIndex++;
				} else if (dir === -1) {
					items.style.setProperty('--videoslidesLeft', `${posInitial + (slideSize + videoslideMarginRight)}px`);
					index--;
					virtualIndex--;
				}
				index = validateIndex(index, 0, slidesLength - 1);
			};
			allowShift = false;
		}
		// Проверка и корректировка индекса слайда
		function checkVirtualIndex() {
			items.classList.remove('videoslider__videoslides--shifting');
			if (virtualIndex === -2) {
				items.style.setProperty('--videoslidesLeft', `${-(slidesLength * (slideSize + videoslideMarginRight))}px`);
				virtualIndex = slidesLength - 2;
			}
			if (virtualIndex === slidesLength) {
				items.style.setProperty('--videoslidesLeft', `${-(2 * (slideSize + videoslideMarginRight))}px`);
				virtualIndex = 0;
			}
			allowShift = true;
			updateActiveDot();
			closeCurrentVideo();
			updateMainVideoCallback(videosInfo[index]);
		}
		// Обновление активной точки
		function updateActiveDot() {
			const activeDot = dotsContainer.querySelector(`[data-videoslide="${index}"]`);
			dots.forEach(dot => dot.classList.remove('videoslider__dot--active'));
			if (activeDot) activeDot.classList.add('videoslider__dot--active');
		}

		// События мыши
		items.onmousedown = dragStart;
		// События касания (для мобильных устройств)
		items.addEventListener('touchstart', dragStart);
		items.addEventListener('touchend', dragEnd);
		items.addEventListener('touchmove', dragAction);
		// События клика
		prev.addEventListener('click', () => { shiftSlide(-1); });
		next.addEventListener('click', () => { shiftSlide(1); });
		// Обработка клика по точке
		dotsContainer.addEventListener('click', (e) => {
			const dot = e.target.closest('[data-videoslide]');
			if (!dot || !allowShift) return;
			const slideNum = parseInt(dot.getAttribute('data-videoslide'), 10);
			if (slideNum === index) return;
			items.classList.add('videoslider__videoslides--shifting');
			items.style.setProperty('--videoslidesLeft', `${-(slideNum + 2) * (slideSize + videoslideMarginRight)}px`);
			index = slideNum;
			virtualIndex = slideNum;
			allowShift = false;
			updateActiveDot();
		});
		// События завершения анимации
		items.addEventListener('transitionend', checkVirtualIndex);
	}
}