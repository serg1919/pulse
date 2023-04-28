"use strict"

// Slick slider

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

  // jQuery - скрипт для табов(вкладок)

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.catalog__page-wrap').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });



  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');

      })
    })
  };

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

});
