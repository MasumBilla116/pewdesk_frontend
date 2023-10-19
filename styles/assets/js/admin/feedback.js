$(document).ready(_ => {
    $(".feedback-thumb-btn").on("click toutch", function () {
        $(".feedback-thumb-btn").removeClass("active");
        $(this).addClass("active");
    });
});