$(document).ready(_ => {

    var toggle = 0;
    $(".wfullscreen").on("click toutch", function (event) {

        if (toggle == 0) {
            toggle = 1;
            wfullscreen();
        }
        else {
            toggle = 0;
            exitefullscreen();
        }

    });

    function wfullscreen() {

        var elm = document.body;
        if (elm.requestFullscreen) {
            elm.requestFullscreen();
        } else if (elm.webkitRequestFullscreen) {
            elm.webkitRequestFullscreen();
        } else if (elm.msRequestFullscreen) {
            elm.msRequestFullscreen();
        }

    }

    function exitefullscreen() {

        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }

});