

$(document).ready(function () {

    $('[name="phone"]').inputmask('+7 (999) 999-99-99');


    $('[name="phone"]').attr('type', 'tel');

    $('.js-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
    });

    $(".block-sett__item").on("click", function () {
       $(".block-sett__item").removeClass("bg-blue");
       $(this).addClass("bg-blue");
    });

});
