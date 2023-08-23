import Swiper from 'swiper/swiper-bundle.min.mjs';

import 'swiper/swiper-bundle.min.css';

import { fetchEvent } from "./heroApi";
import { eventRender } from './heroRender';

const swiperEvent = document.querySelector(".swiper-wrapper");

fetchEvent().then(data => {
    swiperEvent.insertAdjacentHTML('beforeend', eventRender(data));
    const swiper = new Swiper('.swiper', {
     
      allowSlideNext: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'bullets',
       
      },
   spaceBetween: 10,
      autoplay: {
        delay: 3000,
      },
//  к-сть показаних слайдів на сторінку
  slidesPerView: 1,
  // к-сть слайдів які пролистуються
  slidesPerGroup: 1,
      speed: 800,
      loop: true,
      mousewheel: {
    invert: true,
  },
    });
  
  }
);
