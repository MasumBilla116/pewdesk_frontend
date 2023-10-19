/*********************************
 * create menue awesome
 ********************************/

$(document).ready(function () {
    // active sub menu
    $(".sub-menu-item").on("click toutch", function (e) {
        var target = $(this).attr("href");
        sessionStorage.setItem("sub-menu", target);
    });
    function loadSubMenu() {
        $('.erp-aside-menue-item').removeClass("active")
        $('.sub-menu-item').removeClass("active");
        var subMenu = sessionStorage.getItem('sub-menu');
        $('.sub-menu-item').each(function () {
            if ($(this).attr('href') == subMenu) { //sub-menu-btn
                if ($(this).parent().prev().hasClass("sub-menu-btn")) {

                    $(this).parent().prev().addClass("active");
                    $(this).parent().parent().parent().prev().addClass("active");
                    $(this).parent().parent().parent().slideDown();
                    $(this).addClass("active");

                }
                else {
                    $(this).parent().parent().prev().addClass("active");
                    $(this).parent().parent().slideDown();
                    $(this).addClass("active");
                }

                return;
            }
        });
    }
    loadSubMenu();
    // 
    $('.erp-aside-menue-item').on("mouseenter", function () {
        $(this).find(".erp-left-icon").addClass("fa-beat-fade");
    }).mouseleave(function () {
        $(this).find(".erp-left-icon").removeClass("fa-beat-fade");
    });

    // click event and open sub menue
    $(".erp-aside-menue-item").on("click toutch", function () {
        $(this).find(".menue-angle").toggleClass("fa-angle-right fa-angle-down");
        // open or hide sub menu onclick
        $(this).next(".sub-menu").slideToggle();
    });
});

// aside bar slide left and right
const asideExpand = () => {
    if (localStorage.getItem("aside-expand") == "true") {
        $(".menu-des").toggleClass("fade d-none");
        $(".aside-extra-menu-lg ,.aside-extra-menu-expand").toggleClass("d-none d-block");
        $("#aside-expand").attr("checked", "checked");
    }
}
asideExpand();

$(document).ready(function () {

    $(".aside-expand").click(function () {
        $(".menu-des").toggleClass("fade d-none");
        $(".aside-extra-menu-lg ,.aside-extra-menu-expand").toggleClass("d-none d-block");
        if ($(".menu-des").hasClass("fade d-none")) {
            localStorage.setItem("aside-expand", "true");
            $("#aside-expand").prop("checked", true);
        }
        else {
            localStorage.setItem("aside-expand", "false");
            $("#aside-expand").prop("checked", false);
        }
        $("#secondary-header").css({
            "left": $("#first-header").offset().left,
            "width": $("#first-header").width()
        });
    })

    $("#aside-expand").click(function () {
        $(".aside-extra-menu-lg ,.aside-extra-menu-expand").toggleClass("d-none d-block");
        if ($(this).prop("checked")) {
            $(".menu-des").addClass("fade d-none");
        }
        else {
            $(".menu-des").removeClass("fade d-none");
        }

    })
})


/*
    -----------------------
    @Author
    -----------------------
    Md. Masum billa
    -----------------------
    created at : 5/11/2022
    -----------------------

*/
// aside menu active controller
$(document).ready(() => {
    var url = $(location).attr("href").split("/");
    $(".sub-menu").find("a").each(function (index) {
        var href = $(this).attr("href");
        var button = $(this).parent().parent().prev("button");
        $(this).removeClass("sub-menu-active");
        button.removeClass("menu-active");
        if (href == url[url.length - 1]) {
            $(this).addClass("sub-menu-active");
            $(this).parent().parent().slideDown(300, "linear");
            button.addClass("menu-active");
            button.find(".menue-angle").toggleClass("fa-angle-right fa-angle-down");
        }
    })
});
// aside menu toggle
$(document).ready(() => {
    // mini screen menubars is working
    $(".menu-bars").on("click", function (event) {
        $(".erp-aside-menue-toggle").toggleClass("aside-fixd-none aside-fixd-block");
        $(".erp-aside")
            .toggleClass("aside d-xxsm-block d-smd-none")
            .animate({
                "left": "0%"
            }, 500, "linear");

        // $(this).children().toggle();
        // $(".erp-aside-menue-toggle").toggleClass("d-sm-none d-xsm-none d-smd-none d-md-none d-xxsm-none");
    });

    $(".close-btn").on("click", function () {
        $(".erp-aside")
            .animate({
                "left": "-100%"
            }, 500, "linear", function () {
                setTimeout(function () {
                    $(".erp-aside-menue-toggle").toggleClass("aside-fixd-none aside-fixd-block");
                    $(".erp-aside").toggleClass("aside d-xxsm-block d-smd-none");
                }, 300)
            });
    });


    // whene aside is display none for small screen
    $(".min-aside").on("click", function () {
        // $("aside").toggleClass("aside d-xxsm-block d-smd-none")
        $("aside")
            .animate({
                "left": "-100%"
            }, 500, "linear", function () {
                setTimeout(function () {
                    $("aside").toggleClass("aside d-xxsm-block d-smd-none");
                }, 800)
            });
    });

    $(".sub-menu-btn").on("click toutch", function (event) {
        $(this).next().filter(".sub-menu").toggle();
    });
});

// right side option menu
$(document).ready(_ => {
    $(".right-op .close").on("click toutch", function (event) {
        $(".right-op").animate({
            "right": "-100%"
        }, 1500, "linear", function () {
            $(this).removeAttr("style");
        });
    });

    $(".right-side-op button").on("click toutch", function (event) {
        $(".right-op").animate({
            "right": "0%"
        }, 1000);
    });
});


// aside theme color change from right option
$(document).ready(_ => {

    const setGradientTheme = () => {
        // set theme color in gradient
        $("aside").addClass("aside-gradient");
        $(".erp-header-right").addClass("nav-gradient");
        $(".erp-container").addClass("bg-gradient");


        // all option false for aside 
        $("#default-aside").prop("checked", false).prop("disabled", true);
        $("#light-blue-aside").prop("checked", false).prop("disabled", true);
        $("#dark-blue-aside").prop("checked", false).prop("disabled", true);

        // all option false for nav
        $("#default-nav").prop("checked", false).prop("disabled", true);
        $("#light-blue-nav").prop("checked", false).prop("disabled", true);
        $("#dark-blue-nav").prop("checked", false).prop("disabled", true);

        //  all option false for body
        $("#body-blue").prop("checked", false).prop("disabled", true);
        $("#body-dark-blue").prop("checked", false).prop("disabled", true);
        $("#body-dark-orange").prop("checked", false).prop("disabled", true);
        $("#body-dark-green").prop("checked", false).prop("disabled", true);
        $("#default-body").prop("checked", false).prop("disabled", true);
    }
    $("#both-gradient").on("click toutch", function (e) {
        if ($(this).prop("checked")) {
            // remove all theme color
            $("aside").removeClass("theme-darkblue theme-lightblue");
            $(".erp-header-right").removeClass("theme-lightblue theme-darkblue");
            $(".erp-container").removeClass("erp-bg-front-blue erp-bg-front-darkblue erp-bg-front-darkorange  erp-bg-front-darkgreen ");

            // storage theme color 
            localStorage.setItem("aside-theme", "aside-gradient");
            localStorage.setItem("nav-theme", "nav-gradient");
            localStorage.setItem("main-theme", "bg-gradient");

            // set gradient theme
            setGradientTheme();

        }
        else {
            // all option false for aside 
            $("#default-aside").prop("disabled", false);
            $("#light-blue-aside").prop("disabled", false);
            $("#dark-blue-aside").prop("disabled", false);

            // all option false for nav
            $("#default-nav").prop("disabled", false);
            $("#light-blue-nav").prop("disabled", false);
            $("#dark-blue-nav").prop("disabled", false);

            //  all option false for body
            $("#body-blue").prop("disabled", false);
            $("#body-dark-blue").prop("disabled", false);
            $("#body-dark-orange").prop("disabled", false);
            $("#body-dark-green").prop("disabled", false);
            $("#default-body").prop("disabled", false);
            // default aside theme
            localStorage.setItem("aside-theme", "default");
            $("aside").removeClass("theme-darkblue theme-lightblue  aside-gradient");
            $("#default-aside").prop("checked", true);
            // default nav theme
            $(".erp-header-right").removeClass("theme-lightblue theme-darkblue nav-gradient");
            localStorage.setItem("nav-theme", "default");
            $("#default-nav").prop("checked", true);
            // default main
            $(".erp-container").removeClass("erp-bg-front-blue erp-bg-front-darkblue erp-bg-front-darkorange  erp-bg-front-darkgreen bg-gradient");
            localStorage.setItem("main-theme", "default");
            $("#default-body").prop("checked", true);
        }
    })
    $("#dark-blue-aside").on("change toutch", function (event) {
        $("aside").removeClass("theme-darkblue theme-lightblue");
        $("#both-gradient").prop("checked", false);
        if ($(this).prop("checked")) {
            localStorage.setItem("aside-theme", "dark-blue");
            $("aside").addClass("theme-darkblue");
            $("#default-aside").prop("checked", false);
            $("#light-blue-aside").prop("checked", false);
        } else {

            if ($("#light-blue-aside").prop("checked")) {
                localStorage.setItem("aside-theme", "light-blue");
                $("#default-aside").prop("checked", false);
                $("#dark-blue-aside").prop("checked", false);
                $("aside").addClass("theme-lightblue");
            } else {
                localStorage.setItem("aside-theme", "default");
                $("#default-aside").prop("checked", true);
                $("#light-blue-aside").prop("checked", false);
                $("#dark-blue-aside").prop("checked", false);
            }

        }

    });

    $("#light-blue-aside").on("change toutch", function (event) {
        $("#both-gradient").prop("checked", false);
        $("aside").removeClass("theme-darkblue theme-lightblue ");

        if ($(this).prop("checked")) {
            localStorage.setItem("aside-theme", "light-blue");
            $("aside").addClass("theme-lightblue");
            $("#default-aside").prop("checked", false);
            $("#dark-blue-aside").prop("checked", false);
        } else {

            if ($("#dark-blue-aside").prop("checked")) {
                localStorage.setItem("aside-theme", "dark-blue");
                $("#default-aside").prop("checked", false);
                $("#light-blue-aside").prop("checked", false);
                $("aside").addClass("theme-darkblue");
            } else {
                localStorage.setItem("aside-theme", "default");
                $("#default-aside").prop("checked", true);
                $("#light-blue-aside").prop("checked", false);
                $("#dark-blue-aside").prop("checked", false);
            }

        }

    });


    $("#default-aside").on("change toutch", function (event) {
        $("#both-gradient").prop("checked", false);
        localStorage.setItem("aside-theme", "default");
        $("aside").removeClass("theme-darkblue theme-lightblue");
        $("#default-aside").prop("checked", true);
        $("#light-blue-aside").prop("checked", false);
        $("#dark-blue-aside").prop("checked", false);

    });

    loadThemeColor();
    function loadThemeColor() {
        var AsideTheme = localStorage.getItem("aside-theme");
        var NavTheme = localStorage.getItem("nav-theme");
        var MainTheme = localStorage.getItem("main-theme");
        // for main
        if (AsideTheme == "aside-gradient") {
            $("#both-gradient").prop("checked", true);
            // set gradient theme
            setGradientTheme();
        }
        else if (MainTheme == "blue") {
            $(".erp-container").addClass("erp-bg-front-blue");
            $("#default-body").prop("checked", false);
            $("#body-blue").prop("checked", true);
            $("#body-dark-blue").prop("checked", false);
            $("#body-dark-orange").prop("checked", false);
            $("#body-dark-green").prop("checked", false);
        }
        else if (MainTheme == "dark-blue") {
            $(".erp-container").addClass("erp-bg-front-darkblue");
            $("#default-body").prop("checked", false);
            $("#body-blue").prop("checked", false);
            $("#body-dark-blue").prop("checked", true);
            $("#body-dark-orange").prop("checked", false);
            $("#body-dark-green").prop("checked", false);
        }
        else if (MainTheme == "dark-orange") {
            $(".erp-container").addClass("erp-bg-front-darkorange");
            $("#default-body").prop("checked", false);
            $("#body-blue").prop("checked", false);
            $("#body-dark-blue").prop("checked", false);
            $("#body-dark-orange").prop("checked", true);
            $("#body-dark-green").prop("checked", false);
        }
        else if (MainTheme == "dark-green") {
            $(".erp-container").addClass("erp-bg-front-darkgreen");
            $("#default-body").prop("checked", false);
            $("#body-blue").prop("checked", false);
            $("#body-dark-blue").prop("checked", false);
            $("#body-dark-orange").prop("checked", false);
            $("#body-dark-green").prop("checked", true);
        }
        // for aside and nav
        if (AsideTheme == "light-blue") {
            $("aside").addClass("theme-lightblue");
            $("#default-aside").prop("checked", false);
            $("#light-blue-aside").prop("checked", true);
            $("#dark-blue-aside").prop("checked", false);
        }
        else if (AsideTheme == "dark-blue") {
            $("aside").addClass("theme-darkblue");
            $("#default-aside").prop("checked", false);
            $("#light-blue-aside").prop("checked", false);
            $("#dark-blue-aside").prop("checked", true);
        }

        if (NavTheme == "light-blue") {
            $(".erp-header-right").addClass("theme-lightblue");
            $("#default-nav").prop("checked", false);
            $("#dark-blue-nav").prop("checked", false);
            $("#light-blue-nav").prop("checked", true);
        }
        else if (NavTheme == "dark-blue") {
            $(".erp-header-right").addClass("theme-darkblue");
            $("#default-nav").prop("checked", false);
            $("#dark-blue-nav").prop("checked", true);
            $("#light-blue-nav").prop("checked", false);
        }
    }


    $("#dark-blue-nav").on("change toutch", function (event) {
        $("#both-gradient").prop("checked", false);
        $(".erp-header-right").removeClass("theme-lightblue theme-darkblue");

        if ($(this).prop("checked")) {
            localStorage.setItem("nav-theme", "dark-blue");
            $("#default-nav").prop("checked", false);
            $("#light-blue-nav").prop("checked", false);
            $(".erp-header-right").addClass("theme-darkblue");
        }
        else {
            if ($("#light-blue-nav").prop("checked")) {
                localStorage.setItem("nav-theme", "light-blue");
                $("#default-nav").prop("checked", false);
                $("#dark-blue-nav").prop("checked", false);
                $(".erp-header-right").addClass("theme-lightblue");
            }
            else {
                localStorage.setItem("nav-theme", "default");
                $("#default-nav").prop("checked", true);
                $("#dark-blue-nav").prop("checked", false);
                $("#light-blue-nav").prop("checked", false);
            }

        }


    });




    $("#light-blue-nav").on("change toutch", function (event) {
        $("#both-gradient").prop("checked", false);
        $(".erp-header-right").removeClass("theme-lightblue theme-darkblue");
        if ($(this).prop("checked")) {
            localStorage.setItem("nav-theme", "light-blue");
            $("#default-nav").prop("checked", false);
            $("#dark-blue-nav").prop("checked", false);
            $(".erp-header-right").addClass("theme-lightblue");
        }
        else {
            if ($("#dark-blue-nav").prop("checked")) {
                localStorage.setItem("nav-theme", "dark-blue");
                $("#default-nav").prop("checked", false);
                $("#light-blue-nav").prop("checked", false);
                $(".erp-header-right").addClass("theme-darkblue");
            }
            else {
                localStorage.setItem("nav-theme", "default");
                $("#default-nav").prop("checked", true);
                $("#dark-blue-nav").prop("checked", false);
                $("#light-blue-nav").prop("checked", false);
            }

        }


    });

    $("#default-nav").on("change toutch", function (event) {
        $("#both-gradient").prop("checked", false);
        $(".erp-header-right").removeClass("theme-lightblue theme-darkblue");
        localStorage.setItem("nav-theme", "default");
        $("#default-nav").prop("checked", true);
        $("#dark-blue-nav").prop("checked", false);
        $("#light-blue-nav").prop("checked", false);


    });



    /****
     * -----------------------------
     * body color change
     * -----------------------------
     * */
    $("#default-body").on("change toutch", function () {
        $("#both-gradient").prop("checked", false);
        $(".erp-container").removeClass("erp-bg-front-blue erp-bg-front-darkblue erp-bg-front-darkorange  erp-bg-front-darkgreen");
        if ($(this).prop("checked")) {
            $("#body-blue").prop("checked", false);
            $("#body-dark-blue").prop("checked", false);
            $("#body-dark-orange").prop("checked", false);
            $("#body-dark-green").prop("checked", false);
            localStorage.setItem("main-theme", "");
        }
        else {
            if ($("#body-dark-blue").prop("checked")) {
                localStorage.setItem("main-theme", "dark-blue");
                $("#default-body").prop("checked", false);
                $("#body-blue").prop("checked", false);
                $("#body-dark-orange").prop("checked", false);
                $("#body-dark-green").prop("checked", false);
                $(".erp-container").addClass("erp-bg-front-darkblue");

            } else if ($("#body-blue").prop("checked")) {
                localStorage.setItem("main-theme", "blue");
                $("#default-body").prop("checked", false);
                $("#body-dark-blue").prop("checked", false);
                $("#body-dark-orange").prop("checked", false);
                $("#body-dark-green").prop("checked", false);
                $(".erp-container").addClass("erp-bg-front-blue");

            }
            else if ($("#body-dark-orange").prop("checked")) {
                localStorage.setItem("main-theme", "dark-orange");
                $("#default-body").prop("checked", false);
                $("#body-blue").prop("checked", false);
                $("#body-dark-blue").prop("checked", false);
                $("#body-dark-green").prop("checked", false);
                $(".erp-container").addClass("erp-bg-front-darkorange");

            }
            else if ($("#body-dark-green").prop("checked")) {
                localStorage.setItem("main-theme", "dark-green");
                $("#default-body").prop("checked", false);
                $("#body-blue").prop("checked", false);
                $("#body-dark-blue").prop("checked", false);
                $("#body-dark-orange").prop("checked", false);
                $(".erp-container").addClass("erp-bg-front-darkgreen");

            }
            else {
                $("#default-body").prop("checked", true);
                $("#body-blue").prop("checked", false);
                $("#body-dark-blue").prop("checked", false);
                $("#body-dark-orange").prop("checked", false);
                $("#body-dark-green").prop("checked", false);
                localStorage.setItem("main-theme", "");

            }
        }
    })
    // theme blue

    $("#body-blue").on("change toutch", function () {
        $("#both-gradient").prop("checked", false);
        $(".erp-container").removeClass("erp-bg-front-blue erp-bg-front-darkblue erp-bg-front-darkorange  erp-bg-front-darkgreen");
        if ($(this).prop("checked")) {
            $("#default-body").prop("checked", false);
            $("#body-dark-blue").prop("checked", false);
            $("#body-dark-orange").prop("checked", false);
            $("#body-dark-green").prop("checked", false);
            $(".erp-container").addClass("erp-bg-front-blue");
            localStorage.setItem("main-theme", "blue");

        }
        else {
            if ($("#body-dark-blue").prop("checked")) {

                $("#default-body").prop("checked", false);
                $("#body-blue").prop("checked", false);
                $("#body-dark-orange").prop("checked", false);
                $("#body-dark-green").prop("checked", false);
                $(".erp-container").addClass("erp-bg-front-darkblue");
                localStorage.setItem("main-theme", "dark-blue");

            } else if ($("#default-body").prop("checked")) {

                $("#body-blue").prop("checked", false);
                $("#body-dark-blue").prop("checked", false);
                $("#body-dark-orange").prop("checked", false);
                $("#body-dark-green").prop("checked", false);
                localStorage.setItem("main-theme", "");

            }
            else if ($("#body-dark-orange").prop("checked")) {

                $("#default-body").prop("checked", false);
                $("#body-blue").prop("checked", false);
                $("#body-dark-blue").prop("checked", false);
                $("#body-dark-green").prop("checked", false);
                $(".erp-container").addClass("erp-bg-front-darkorange");
                localStorage.setItem("main-theme", "dark-orange");

            }
            else if ($("#body-dark-green").prop("checked")) {

                $("#default-body").prop("checked", false);
                $("#body-blue").prop("checked", false);
                $("#body-dark-blue").prop("checked", false);
                $("#body-dark-orange").prop("checked", false);
                $(".erp-container").addClass("erp-bg-front-darkgreen");
                localStorage.setItem("main-theme", "dark-green");

            }
            else {
                $("#default-body").prop("checked", true);
                $("#body-blue").prop("checked", false);
                $("#body-dark-blue").prop("checked", false);
                $("#body-dark-orange").prop("checked", false);
                $("#body-dark-green").prop("checked", false);
                localStorage.setItem("main-theme", "");
            }
        }
    })


    // theme dark-blue

    $("#body-dark-blue").on("change toutch", function () {
        $("#both-gradient").prop("checked", false);
        $(".erp-container").removeClass("erp-bg-front-blue erp-bg-front-darkblue erp-bg-front-darkorange  erp-bg-front-darkgreen ");

        if ($(this).prop("checked")) {

            $("#default-body").prop("checked", false);
            $("#body-blue").prop("checked", false);
            $("#body-dark-orange").prop("checked", false);
            $("#body-dark-green").prop("checked", false);
            $(".erp-container").addClass("erp-bg-front-darkblue");
            localStorage.setItem("main-theme", "dark-blue");

        }
        else {
            if ($("#body-blue").prop("checked")) {

                $("#default-body").prop("checked", false);
                $("#body-dark-blue").prop("checked", false);
                $("#body-dark-orange").prop("checked", false);
                $("#body-dark-green").prop("checked", false);
                $(".erp-container").addClass("erp-bg-front-blue");
                localStorage.setItem("main-theme", "blue");


            } else if ($("#default-body").prop("checked")) {

                $("#body-blue").prop("checked", false);
                $("#body-dark-blue").prop("checked", false);
                $("#body-dark-orange").prop("checked", false);
                $("#body-dark-green").prop("checked", false);
                localStorage.setItem("main-theme", "");

            }
            else if ($("#body-dark-orange").prop("checked")) {

                $("#default-body").prop("checked", false);
                $("#body-blue").prop("checked", false);
                $("#body-dark-blue").prop("checked", false);
                $("#body-dark-green").prop("checked", false);
                $(".erp-container").addClass("erp-bg-front-darkorange");
                localStorage.setItem("main-theme", "dark-orange");

            }
            else if ($("#body-dark-green").prop("checked")) {

                $("#default-body").prop("checked", false);
                $("#body-blue").prop("checked", false);
                $("#body-dark-blue").prop("checked", false);
                $("#body-dark-orange").prop("checked", false);
                $(".erp-container").addClass("erp-bg-front-darkgreen");
                localStorage.setItem("main-theme", "dark-green");

            }
            else {
                $("#default-body").prop("checked", true);
                $("#body-blue").prop("checked", false);
                $("#body-dark-blue").prop("checked", false);
                $("#body-dark-orange").prop("checked", false);
                $("#body-dark-green").prop("checked", false);
                localStorage.setItem("main-theme", "");
            }
        }
    });

    // theme dark-orange

    $("#body-dark-orange").on("change toutch", function () {
        $("#both-gradient").prop("checked", false);
        $(".erp-container").removeClass("erp-bg-front-blue erp-bg-front-darkblue erp-bg-front-darkorange  erp-bg-front-darkgreen");

        if ($(this).prop("checked")) {

            $("#default-body").prop("checked", false);
            $("#body-blue").prop("checked", false);
            $("#body-dark-blue").prop("checked", false);
            $("#body-dark-green").prop("checked", false);
            $(".erp-container").addClass("erp-bg-front-darkorange");
            localStorage.setItem("main-theme", "dark-orange");

        }
        else {
            if ($("#body-blue").prop("checked")) {

                $("#default-body").prop("checked", false);
                $("#body-dark-blue").prop("checked", false);
                $("#body-dark-orange").prop("checked", false);
                $("#body-dark-green").prop("checked", false);
                $(".erp-container").addClass("erp-bg-front-blue");
                localStorage.setItem("main-theme", "blue");


            } else if ($("#default-body").prop("checked")) {

                $("#body-blue").prop("checked", false);
                $("#body-dark-blue").prop("checked", false);
                $("#body-dark-orange").prop("checked", false);
                $("#body-dark-green").prop("checked", false);
                localStorage.setItem("main-theme", "");

            }
            else if ($("#body-dark-blue").prop("checked")) {

                $("#default-body").prop("checked", false);
                $("#body-blue").prop("checked", false);
                $("#body-dark-orange").prop("checked", false);
                $("#body-dark-green").prop("checked", false);
                $(".erp-container").addClass("erp-bg-front-darkblue");
                localStorage.setItem("main-theme", "dark-blue");


            }
            else if ($("#body-dark-green").prop("checked")) {

                $("#default-body").prop("checked", false);
                $("#body-blue").prop("checked", false);
                $("#body-dark-blue").prop("checked", false);
                $("#body-dark-orange").prop("checked", false);
                $(".erp-container").addClass("erp-bg-front-darkgreen");
                localStorage.setItem("main-theme", "dark-green");

            }
            else {
                $("#default-body").prop("checked", true);
                $("#body-blue").prop("checked", false);
                $("#body-dark-blue").prop("checked", false);
                $("#body-dark-orange").prop("checked", false);
                $("#body-dark-green").prop("checked", false);
                localStorage.setItem("main-theme", "");
            }
        }
    });


    // theme dark-green

    $("#body-dark-green").on("change toutch", function () {
        $("#both-gradient").prop("checked", false);
        $(".erp-container").removeClass("erp-bg-front-blue erp-bg-front-dark-blue erp-bg-front-darkorange  erp-bg-front-darkgreen");

        if ($(this).prop("checked")) {
            $("#default-body").prop("checked", false);
            $("#body-blue").prop("checked", false);
            $("#body-dark-blue").prop("checked", false);
            $("#body-dark-orange").prop("checked", false);
            $(".erp-container").addClass("erp-bg-front-darkgreen");
            localStorage.setItem("main-theme", "dark-green");
        }
        else {
            if ($("#body-blue").prop("checked")) {

                $("#default-body").prop("checked", false);
                $("#body-dark-blue").prop("checked", false);
                $("#body-dark-orange").prop("checked", false);
                $("#body-dark-green").prop("checked", false);
                $(".erp-container").addClass("erp-bg-front-blue");
                localStorage.setItem("main-theme", "blue");


            } else if ($("#default-body").prop("checked")) {

                $("#body-blue").prop("checked", false);
                $("#body-dark-blue").prop("checked", false);
                $("#body-dark-orange").prop("checked", false);
                $("#body-dark-green").prop("checked", false);
                localStorage.setItem("main-theme", "");

            }
            else if ($("#body-dark-blue").prop("checked")) {

                $("#default-body").prop("checked", false);
                $("#body-blue").prop("checked", false);
                $("#body-dark-orange").prop("checked", false);
                $("#body-dark-green").prop("checked", false);
                $(".erp-container").addClass("erp-bg-front-dark-blue");
                localStorage.setItem("main-theme", "dark-blue");

            }
            else if ($("#body-dark-orange").prop("checked")) {

                $("#default-body").prop("checked", false);
                $("#body-blue").prop("checked", false);
                $("#body-dark-blue").prop("checked", false);
                $("#body-dark-green").prop("checked", false);
                $(".erp-container").addClass("erp-bg-front-darkorange");
                localStorage.setItem("main-theme", "dark-orange");
            }
            else {
                $("#default-body").prop("checked", true);
                $("#body-blue").prop("checked", false);
                $("#body-dark-blue").prop("checked", false);
                $("#body-dark-orange").prop("checked", false);
                $("#body-dark-green").prop("checked", false);
                localStorage.setItem("main-theme", "");
            }
        }
    });





});


// nav fixed
$(document).ready(_ => {
    $("#fiexd-nav").on("click toutch", function (event) {
        if ($(this).prop("checked")) {
            $("#secondary-header").addClass("fixed-top");

        }
        else {
            $("#secondary-header").removeClass("fixed-top");
        }

    });
});

// popup message for search
$(document).ready(_ => {
    $(".search-btn").on("click toutch", function (event) {
        $(".popup-searchbar").animate({
            "top": "13px"
        }, 500);
    })

    $(".close").on("click toutch", function () {
        $(".popup-searchbar").animate({
            "top": "-150px"
        }, 500);
    });

    $(".nav-item").on("click toutch", function (event) {
        event.preventDefault();
        event.stopPropagation();
        $(".message").slideUp(200);
        $(this).children().filter("div .message").slideDown(200);
    });

    $(".message").on("click toutch", function (event) {
        event.stopPropagation();
    });

    $(document).on("click toutch", function (event) {
        $(".message").slideUp(200);
    });
});



/*
---------------------------------
code for tooltipe
----------------------------------

*/
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})




/*
---------------------------------
code print
----------------------------------

*/


$(document).ready(function () {
    $("#print").on("click", function () {
        printTable();
    })
});
function printTable() {
    printJS({
        printable: 'printable',
        type: "html",
        targetStyles: ['*']
    });
}


/**
 * *************************************
 * Table button fixed top
 * *************************************
 * */
$(document).ready(_ => {
    $(document).on("scroll", function (e) {
        if ($(this).scrollTop() > 195) {
            $(".tbl-btn-group").css({
                "position": "fixed",
                "top": "62px"
            });
        }
        else {
            $(".tbl-btn-group").removeAttr("style")
        }
    });
})





/*
    ----------------------------------
    ---- Show the secondary nav 
    ----------------------------------
    */
$(document).on("scroll", function (event) {
    $("#secondary-header").css({
        "left": $("#first-header").offset().left,
        "width": $("#first-header").width()
    });
    if (window.pageYOffset > 80) {
        $("#secondary-header").animate({
            "top": "0"
        }, 300)
    }
    else {
        $("#secondary-header").animate({
            "top": "-65px"
        }, 1)
    }
})