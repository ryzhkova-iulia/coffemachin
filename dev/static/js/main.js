

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
        $(this).toggleClass("arrow-down");
    });

    $(document).load($(window).bind("resize", checkPosition));
    function checkPosition()
    {
        if($( window ).width() > 930) {
            $(".filter").css("display", "block");
            // $(".product").css("display", "block");
        }  else if($( window ).width() < 930) {
            $(".filter").css("display", "none");
            // $(".product").css("display", "none");
        }
    }

    $(document).load($(window).bind("resize", productPos));
    function productPos()
    {
        if($( window ).width() > 768) {
            $(".product").css("display", "flex");
        }  else if($( window ).width() < 768) {
            $(".product").css("display", "none");
        }
    }

    $(".show-filter").on("click", function () {
        $(".filter").slideToggle();
        $(".filter-item__cont").css("display", "none");
        $(".filter-item__title").addClass("arrow-down");
    });

    $(".show-more").on("click", function () {
        $(this).parent().find(".hide").removeClass("hide");
        $(this).css("display", "none");
    });

    // busket show-hide
    $(".prew__show").on("click", function () {
        $(this).parent().toggleClass("js-product-show");
        $(this).parent().find(".product").slideToggle().css("display", "flex");
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

    $(".upload").upload({
        action: "//jquery-file-upload.appspot.com/",
        label: "Кликните или поместите карточку организации в поле",
        // multiple: false,
        // maxFiles: 1,
        maxSize: 1073741824,
        beforeSend: onBeforeSend
    }).on("start.upload", onStart)
        .on("complete.upload", onComplete)
        .on("filestart.upload", onFileStart)
        .on("fileprogress.upload", onFileProgress)
        .on("filecomplete.upload", onFileComplete)
        .on("fileerror.upload", onFileError)
        .on("chunkstart.upload", onChunkStart)
        .on("chunkprogress.upload", onChunkProgress)
        .on("chunkcomplete.upload", onChunkComplete)
        .on("chunkerror.upload", onChunkError)
        .on("queued.upload", onQueued);

    // $(".cancel_all").on("click", onCancelAll);

    // function onCancelAll(e) {
    //     console.log("Cancel All");
    //     $(this).parents("form").find(".upload").upload("abort");
    // }

    function onBeforeSend(formData, file) {
        console.log("Before Send");
        formData.append("test_field", "test_value");
        // return (file.name.indexOf(".jpg") < -1) ? false : formData; // cancel all jpgs
        return formData;
    }

    function onQueued(e, files) {
        console.log("Queued");
        var html = '';
        for (var i = 0; i < files.length; i++) {
            html += '<li data-index="' + files[i].index + '"><span class="content"><span class="file">' + files[i].name + '</span><span class="cancel">Cancel</span><span class="progress">Queued</span></span><span class="bar"></span></li>';
        }

        $(this).parents("form").find(".filelist.queue")
            .append(html);
    }

    function onStart(e, files) {
        console.log("Start");
        $(this).parents("form").find(".filelist.queue")
            .find("li")
            .find(".progress").text("Waiting");
    }

    function onComplete(e) {
        console.log("Complete");
        // All done!
    }

    function onFileStart(e, file) {
        console.log("File Start");
        $(this).parents("form").find(".filelist.queue")
            .find("li[data-index=" + file.index + "]")
            .find(".progress").text("0%");
    }

    function onFileProgress(e, file, percent) {
        console.log("File Progress");
        var $file = $(this).parents("form").find(".filelist.queue").find("li[data-index=" + file.index + "]");

        $file.find(".progress").text(percent + "%")
        $file.find(".bar").css("width", percent + "%");
    }

    function onFileComplete(e, file, response) {
        console.log("File Complete");
        if (response.trim() === "" || response.toLowerCase().indexOf("error") > -1) {
            $(this).parents("form").find(".filelist.queue")
                .find("li[data-index=" + file.index + "]").addClass("error")
                .find(".progress").text(response.trim());
        } else {
            var $target = $(this).parents("form").find(".filelist.queue").find("li[data-index=" + file.index + "]");
            $target.find(".file").text(file.name);
            $target.find(".progress").remove();
            $target.find(".cancel").remove();
            $target.appendTo($(this).parents("form").find(".filelist.complete"));
        }
    }

    function onFileError(e, file, error) {
        console.log("File Error");
        $(this).parents("form").find(".filelist.queue")
            .find("li[data-index=" + file.index + "]").addClass("error")
            .find(".progress").text("Error: " + error);
    }

    function onChunkStart(e, file) {
        console.log("Chunk Start");
    }

    function onChunkProgress(e, file, percent) {
        console.log("Chunk Progress");
    }

    function onChunkComplete(e, file, response) {
        console.log("Chunk Complete");
    }

    function onChunkError(e, file, error) {
        console.log("Chunk Error");
    }

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

