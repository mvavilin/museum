// Кастомный видеоплеер в секции Video
export function initVideoPlayer() {
    const video = document.getElementById('player'),

        bigPlayBtn = document.getElementById('playerPaused'),
        bigPlayIcon = bigPlayBtn.querySelector('.player__icon'),

        smallPlayBtn = document.getElementById('videoPlayBtn'),
        smallPlayIcon = smallPlayBtn.querySelector('.video-controller__icon'),

        progressRange = document.getElementById('videoProgressRange'),

        volumeRange = document.getElementById('videoVolumeRange'),
        volumeBtn = document.getElementById('videoVolumeBtn'),
        volumeIcon = volumeBtn.querySelector('.video-controller__icon--volume'),

        fullscreenBtn = document.getElementById('videoFullscreenBtn'),
        fullscreenIcon = fullscreenBtn.querySelector('.video-controller__icon--fullscreen');

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

    bigPlayBtn.addEventListener('click', togglePlay);
    smallPlayBtn.addEventListener('click', togglePlay);
    video.addEventListener('ended', () => {
        updatePlayIcons(false);
        progressRange.value = 100;
    });

    // Функции управления прогрессом видео
    function updateRangeStyle(range) {
        const val = range.value;
        range.style.background = `linear-gradient(to right, #710707 0%, #710707 ${val}%, #fff ${val}%, white 100%)`;
    }

    video.addEventListener('timeupdate', () => {
        const percent = (video.currentTime / video.duration) * 100;
        progressRange.value = percent;
        updateRangeStyle(progressRange);
    });
    progressRange.addEventListener('input', () => {
        const newTime = (progressRange.value / 100) * video.duration;
        video.currentTime = newTime;
        updateRangeStyle(progressRange);
    });

    // Функции управления звуком
    function updateVolumeRange() {
        const volume = volumeRange.value / 100;
        video.volume = volume;
        video.muted = volume === 0;
        updateVolumeIcon(volume);
        updateRangeStyle(volumeRange);
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

    updateVolumeRange();

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
}