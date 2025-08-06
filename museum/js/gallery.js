// Анимация при прокрутке изображений в секции Gallery
export function initGallery() {
    document.addEventListener("DOMContentLoaded", function () {
        // const galleryCont = document.querySelector('.gallery__container');
        const imgWraps = document.querySelectorAll(".gallery__img-wrapper");
        // let lastY = window.scrollY;

        // Наблюдатель для анимации элементов
        const obs = new IntersectionObserver((entries) => {
            entries.forEach((entry) => { entry.target.classList.toggle("gallery__img-wrapper--open", entry.isIntersecting); });
        });

        // Инициализация
        imgWraps.forEach((imgWrap, i) => {
            imgWrap.style.setProperty('--order', i);
            obs.observe(imgWrap);
        });

        // function isBelowView() {
        //   const rect = galleryCont.getBoundingClientRect();
        //   return rect.top > window.innerHeight;
        // }

        // window.addEventListener("scroll", function () {
        //   const currY = window.scrollY;
        //   const dir = currY > lastY ? "down" : "up";
        //   // lastY = currY;

        //   // Сброс анимации при скролле вверх, если галерея ниже
        //   if (dir === "up" && isBelowView()) {
        //     imgWraps.forEach(imgWrap => imgWrap.classList.remove("gallery__img-wrapper--open"));
        //   }

        //   // ...
        // });
    });
}