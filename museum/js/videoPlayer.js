// Кастомный видеоплеер в секции Video
const
	video = document.getElementById('player'),
	playerWrapper = document.querySelector('.player__wrapper'),
	bigPlayBtn = document.getElementById('playerPaused'),
	bigPlayIcon = bigPlayBtn.querySelector('.player__icon'),
	smallPlayBtn = document.getElementById('videoPlayBtn'),
	smallPlayIcon = smallPlayBtn.querySelector('.video-controller__icon'),
	progressRange = document.getElementById('videoProgressRange'),
	videoProgressRangeProperty = '--videoProgressRange',
	videoVolumeRangeProperty = '--videoVolumeRange',
	volumeRange = document.getElementById('videoVolumeRange'),
	volumeBtn = document.getElementById('videoVolumeBtn'),
	volumeIcon = volumeBtn.querySelector('.video-controller__icon--volume'),
	fullscreenBtn = document.getElementById('videoFullscreenBtn'),
	fullscreenIcon = fullscreenBtn.querySelector('.video-controller__icon--fullscreen'),
	speedPopup = playerWrapper.querySelector('.player__speed-info');

let speedPopupTimeout;

// Функции управления воспроизведением
function togglePlay() {
	if (video.paused || video.ended) {
		/* Воспроизведение видео с указанного в progressRange значения (по умолчанию 0) */
		const percent = progressRange.value;
		const startTime = (percent / 100) * video.duration;
		video.currentTime = startTime;

		video.play();
		updatePlayIcons(true);
	} else {
		video.pause();
		updatePlayIcons(false);
	}
}
function updatePlayIcons(isPlaying) {
	bigPlayIcon.classList.toggle('player__icon--paused', !isPlaying);
	smallPlayIcon.classList.toggle('video-controller__icon--pause', isPlaying);
}

// Функции управления прогрессом видео
function updateRangeStyle(range, property) {
	const val = range.value;
	range.style.setProperty(property, `${val}%`);
}

export function initVideoPlayer(isPlay) {
	// Инициализация
	updateVolumeRange();

	// Управление воспроизведением
	bigPlayBtn.addEventListener('click', togglePlay);
	smallPlayBtn.addEventListener('click', togglePlay);
	video.addEventListener('ended', () => {
		updatePlayIcons(false);
		progressRange.value = 100;
	});

	// Управление прогрессом видео
	video.addEventListener('timeupdate', () => {
		const percent = (video.currentTime / video.duration) * 100;
		progressRange.value = percent;
		updateRangeStyle(progressRange, videoProgressRangeProperty);
	});
	progressRange.addEventListener('input', () => {
		const newTime = (progressRange.value / 100) * video.duration;
		video.currentTime = newTime;
		updateRangeStyle(progressRange, videoProgressRangeProperty);
	});

	// Функции управления звуком
	function updateVolumeRange() {
		const volume = volumeRange.value / 100;
		video.volume = volume;
		video.muted = volume === 0;
		updateVolumeIcon(volume);
		updateRangeStyle(volumeRange, videoVolumeRangeProperty);
	}
	function updateVolumeIcon(vol) {
		volumeIcon.classList.toggle(`video-controller__icon--mute`, !vol);
	}

	volumeRange.addEventListener('input', () => {
		updateVolumeRange();
	});
	volumeBtn.addEventListener('click', () => {
		const volume = volumeRange.value / 100;
		if (volume !== 0) {
			video.muted = !video.muted;
			updateVolumeIcon(!video.muted);
		}
	});

	// Функции управления полноэкранным режимом
	fullscreenBtn.addEventListener('click', () => {
		if (!document.fullscreenElement) {
			video.parentElement.requestFullscreen();
		} else {
			document.exitFullscreen();
		}

		if (window.innerWidth < window.innerHeight) {
			video.classList.toggle('player__video--fullscreen');
		}
		progressRange.classList.toggle('video-controller__progress--fullscreen');
		fullscreenIcon.classList.toggle('video-controller__icon--minimize');
	});
	window.addEventListener('resize', () => {
		if (document.fullscreenElement) {
			const isPortrait = window.innerWidth < window.innerHeight;
			video.classList.toggle('player__video--fullscreen', isPortrait);
		}
	});

	// Функции управления с клавиатуры
	document.addEventListener('keydown', (e) => {
		const key = e.key.toLowerCase();
		const shift = e.shiftKey;
		if (!isPlay()) return;
		switch (key) {
			case ' ':
				e.preventDefault();
				togglePlay();
				break;
			case 'а':
			case 'f':
				fullscreenBtn.click();
				break;
			case 'ь':
			case 'm':
				volumeBtn.click();
				break;
			case 'б':
			case '<':
				if (shift) changePlaybackSpeed(-0.25);
				break;
			case 'ю':
			case '>':
				if (shift) changePlaybackSpeed(0.25);
				break;
		}
	});

	// Функции управления скоростью воспроизведения
	function changePlaybackSpeed(delta) {
		speedPopup.classList.remove('player__speed-info--hidden')
		let newRate = Math.max(0.25, Math.min(2, video.playbackRate + delta));
		video.playbackRate = newRate;
		showSpeedPopup(newRate);
	}
	function showSpeedPopup(rate) {
		speedPopup.textContent = `${rate.toFixed(2)}x`;

		clearTimeout(speedPopupTimeout);
		speedPopupTimeout = setTimeout(() => {
			speedPopup.classList.add('player__speed-info--hidden');
		}, 800);
	}
}

export function updateMainVideo(videoInfo = null) {
	if (!video.paused) {
		video.pause();
		video.currentTime = 0;
		progressRange.value = 0;
		updatePlayIcons(false);
		updateRangeStyle(progressRange, videoProgressRangeProperty);
	}
	if (videoInfo) {
		video.setAttribute('poster', `assets/img/poster/${videoInfo.poster}`);
		video.setAttribute('src', `assets/video/${videoInfo.video}`);
		video.load();
		video.addEventListener('loadedmetadata', () => { video.currentTime = 0; });
	}
}