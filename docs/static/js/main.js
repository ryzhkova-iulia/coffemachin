

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

    $(".filter-item__title").on("click", function () {
        $(this).parent().find(".filter-item__cont").slideToggle();
    });

    $(".show-filter").on("click", function () {
        $(".filter").slideToggle();
        $(".filter-item__cont").css("display", "none");
    });

    $(".show-more").on("click", function () {
        $(this).parent().find(".hide").removeClass("hide");
        $(this).css("display", "none");
    });

    $(".block-sett__list").on("click", function () {
       $(".catalog").addClass("catalog_list");
    });

    $(".block-sett__grid").on("click", function () {
        $(".catalog").removeClass("catalog_list");
    });



    $(".js-basket").on("click", function(){
        $.get("./basket.html", function(data) {
            $.magnificPopup.open({
                closeOnContentClick: false,
                overflowY: 'scroll',
                items: {
                    src: data,
                    type: 'inline'
                }
            });
        });
        return false;
    });

    $(".js-popup-close").on("click", function () {
        $.magnificPopup.close();
    });

    $(".js-popup-modal").magnificPopup({
        closeOnContentClick: false,
        overflowY: 'scroll'
    });

    $('.js__pop-add').magnificPopup({
        items: {
            src: '#popup-form-add',
            type: 'inline'
        },
        callbacks: {
            elementParse: function(item) {

                var mp = $.magnificPopup.instance,
                    cur = mp.st.el,
                    title = cur.attr('data-header');

                $(item.src).find('.title_form').text(title);
            }
        }
    });

    $('.js__pop-oneclick').magnificPopup({
        items: {
            src: '#popup-form-oneclick',
            type: 'inline'
        },
        callbacks: {
            elementParse: function(item) {

                var mp = $.magnificPopup.instance,
                    cur = mp.st.el,
                    title = cur.attr('data-header');

                $(item.src).find('.title_form').text(title);
            }
        }
    });

    // hidden/show fields for the different delivery
    $(".delivery-btn .checkbox").on("change", function () {
        var allValues = [];

        // find all delivery classes
        $(".delivery-btn .checkbox").each(function () {
            allValues.push($(this).val());
        });

        // remove all delivery classes
        $(".js-delivery-form").removeClass(allValues.join(" "));

        // add current delivery class
        $(".js-delivery-form").addClass($(this).val());
    }).find(":checked").trigger("change");


    $(".btn[value='legal']").on("click", function () {
       $(this).parents(".js-type").removeClass("physical").addClass("legal");
        $(".bnt-tab .btn").removeClass("btn_active");
       $(this).addClass("btn_active");
    });

    $(".btn[value='physical']").on("click", function () {
        $(this).parents(".js-type").removeClass("legal").addClass("physical");
        $(".bnt-tab .btn").removeClass("btn_active");
        $(this).addClass("btn_active");
    });


});


// range
(function() {
    var parent = document.querySelector(".range-slider");
    if(!parent) return;

    var
        rangeS = parent.querySelectorAll("input[type=range]"),
        numberS = parent.querySelectorAll("input[type=number]");

    rangeS.forEach(function(el) {
        el.oninput = function() {
            var slide1 = parseFloat(rangeS[0].value),
                slide2 = parseFloat(rangeS[1].value);

            if (slide1 > slide2) {
                [slide1, slide2] = [slide2, slide1];
                // var tmp = slide2;
                // slide2 = slide1;
                // slide1 = tmp;
            }

            numberS[0].value = slide1;
            numberS[1].value = slide2;
        }
    });

    numberS.forEach(function(el) {
        el.oninput = function() {
            var number1 = parseFloat(numberS[0].value),
                number2 = parseFloat(numberS[1].value);

            if (number1 > number2) {
                var tmp = number1;
                numberS[0].value = number2;
                numberS[1].value = tmp;
            }

            rangeS[0].value = number1;
            rangeS[1].value = number2;

        }
    });

})();
// range end

