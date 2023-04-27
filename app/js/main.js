"use strict"

// window.onload = function () {
//   // document.body.style.backgroundColor = 'red';


// };
$(window).on('load', function () {
  $('.polar-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    speed: 500,
    prevArrow: '<button type="button" class="slick-prev"><img src="images/icons/shevron.svg"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="images/icons/shevron.svg"></button>',
    responsive: [
      {
        breakpoint: 920,
        settings: {
          arrows: false,
          dots: true
        }
      }
    ]
  });
});
