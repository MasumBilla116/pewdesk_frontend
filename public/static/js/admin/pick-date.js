$(document).ready(_ => {
    $(".form-date-input").on("change", function (event) {

        var date = $(this).val();

        if (date.length == 0) {

            $(this).prev().filter(".overlap-date-title").html("<img src='../../../assets/theme_icon/calendar.png' alt='' class='pe-2' />Select Date");
        }
        else {

            $(this).prev().filter(".overlap-date-title").text(date);

        }



    });
});