// Управление шириной верхнего изображения в секции Explore
export function initSliderComparison() {
  const afterImgWrapper = document.querySelector(
    '.slider-comparison__img-wrapper--after'
  );
  const handleControl = document.querySelector('.slider-comparison__handle');
  const sliderComparisonControl = document.querySelector(
    '.slider-comparison__control'
  );

  sliderComparisonControl.addEventListener('input', () => {
    const value = sliderComparisonControl.value;
    afterImgWrapper.style.setProperty('--width-percent', `${value}%`);
    handleControl.style.setProperty('--width-percent', `${value}%`);
  });
}