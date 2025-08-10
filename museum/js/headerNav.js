// Бургер-меню и навигация
export function initHeaderNav() {
  const burger = document.querySelector('.burger');
  const headerNav = document.querySelector('.header__nav');
  const headerNavWrapper = document.querySelector('.header__nav-wrapper');
  const headerLinks = document.querySelectorAll('.header__link');

  burger.addEventListener('click', function (e) {
    e.stopPropagation();
    burger.classList.toggle('burger--active');
    headerNav.classList.toggle('header__nav--visibility');
    headerNavWrapper.classList.toggle('header__nav-wrapper--active');
  });

  headerLinks.forEach((link) => {
    link.addEventListener('click', () => {
      burger.classList.remove('burger--active');
      headerNav.classList.toggle('header__nav--visibility');
      headerNavWrapper.classList.remove('header__nav-wrapper--active');
    });
  });

  document.addEventListener('click', (e) => {
    const target = e.target;
    const clickInsideNav = headerNavWrapper.contains(target);

    if (!clickInsideNav) {
      burger.classList.remove('burger--active');
      headerNavWrapper.classList.remove('header__nav-wrapper--active');
    }
  });
}