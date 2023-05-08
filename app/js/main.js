"use strict"
/*! ==================== Main ================== */

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


  // Переключение контента табов и кнопки детальніше - назад

  $('.catalog-item__link').each(function (i) {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');

        if ($('.catalog-item__list').eq(i).hasClass('catalog-item__list_active')) {
          $(this).text('Назад');
        } else {
          $(this).text('Детальніше');
        }
      })
    });


    // Modal

  $('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn('slow');
  });

  $('.modal__close').on('click', function () {
    $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
  });

  $('.catalog-item__btn').each(function (i) {
    $(this).on('click', function () {
      $('#order .modal__subtitle').text($('.catalog-item__title').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    })
  });

  //  Modal validation

  function valideForms(form) {
    $(form).validate({
      rules: {
        name: 'required',
        tel: 'required',
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: "Будь ласка, вкажіть своє ім'я",
        tel: "Вкажить свій номер телефона",
        email: {
          required: "Нам потрібна ваша електронна адреса, щоб зв'язатися з вами",
          email: "Ваша електронна адреса має бути у форматі name@domain.com"
        }
      }
    });
  };

  valideForms('#consultation-form');
  valideForms('#consultation form');
  valideForms('#order form');

  $('input[name=tel]').mask('+380(99) 999-99-99');


  $('form').submit(function (e) {
    e.preventDefault();
    if (!$(this).valid()) {
      return;
    }

    $.ajax({
      type: 'POST',
      url: 'mailer/smart.php',
      data: $(this).serialize()
    }).done(function () {
      $(this).find('input').val('');
      $('#consultation, #order').fadeOut();
      $('.overlay, #thinks').fadeIn('slow');

      $('form').trigger('reset');
    });
    return false;
  });


});
