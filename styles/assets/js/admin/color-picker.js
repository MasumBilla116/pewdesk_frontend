/*
*--------------------------------
* @Author: Masum billa
*--------------------------------
* All task controller
*--------------------------------
* @Date: 13/05/2022
*/
$(document).ready(_ => {
    var colorPicker = "<button type='button' class='bg-color-toggle'> </button><div class='color-indicator-1 color-indicator'></div><div class='color-indicator-2 color-indicator active-color'></div><div class='color-indicator-3 color-indicator'></div><div class='color-indicator-4 color-indicator'></div><div class='color-indicator-5 color-indicator'></div><input type='color' value='#293450' class='color-indicator-6 color-indicator color-picker' />";

    $("#color-picker").after(colorPicker);
    $(".color-picker").on("input click", function (event) {
        var color = $(this).val();
        localStorage.setItem("bg", color);
        $(".erp-bg").css({ "background-color": color });
    })

    $(".color-indicator").on("click", function (event) {
        $(".color-indicator").removeClass("active-color");
        $(this).addClass("active-color");
        var storageColor = localStorage.getItem("bg");
        var color = $(this).css("background-color") || storageColor;
        if (storageColor != 'null' && color) {
            storageColor = color;
            localStorage.setItem("bg", storageColor);
        }
        $(".erp-bg").css({ "background-color": storageColor });
    });

    loadBg();
    function loadBg() {

        var storageColor = localStorage.getItem("bg");
        var bg = $(".erp-bg").css("background-color");
        if (!storageColor) {
            activeColorIndicator(bg);
            return;
        }
        $(".erp-bg").css({ "background-color": storageColor });
        activeColorIndicator(storageColor);
    }


    function activeColorIndicator(storageColor) {
        $(".color-indicator").each(function () {
            $(this).removeClass("active-color");
            if (storageColor == $(this).css("background-color")) {
                $(this).addClass("active-color");
            }

        });
    }

    var toggle = true;
    $(".bg-color-toggle").on("click", function () {

        if (toggle) {
            ShowColorIcon();
            toggle = false;
        }
        else {
            HideColorIcon();
            toggle = true;
        }

    });

    function HideColorIcon() {

        $(".color-indicator").each(function (index) {
            $(".color-indicator-" + (index + 1)).animate({
                "right": "30px",
                "bottom": "40px",
                "opacity": 0,
            }, 500, function () {
                toggleZindex($(this));
            });
        });
    }

    function ShowColorIcon() {
        toggleZindex($(".color-indicator"));
        $(".color-indicator-1 ").animate({
            "right": "10px",
            "bottom": "110px",
            "opacity": 1,
        }, 500);

        $(".color-indicator-2 ").animate({
            "right": "54px",
            "bottom": "100px",
            "opacity": 1,
        }, 500);

        $(".color-indicator-3 ").animate({
            "right": "90px",
            "bottom": "80px",
            "opacity": 1,
        }, 500);

        $(".color-indicator-4 ").animate({
            "right": "116px",
            "bottom": "48px",
            "opacity": 1,
        }, 500);

        $(".color-indicator-5 ").animate({
            "right": "127px",
            "bottom": "8px",
            "opacity": 1,
        }, 500);
        $(".color-indicator-6 ").animate({
            "right": "10px",
            "bottom": "170px",
            "opacity": 1,
        }, 500);
    }


    function toggleZindex(target) {
        target.toggleClass("z-9");
    }

});