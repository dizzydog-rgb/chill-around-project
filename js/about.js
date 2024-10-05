import Swiper from 'swiper/bundle';

// 等待 DOM 加載完成
document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,
    
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
    
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
});