/**
 * =====================================
 * @Author : Md. Masum billa
 * @date : 25/02/2023
 * =====================================
 * 
 * Today task controller js
 * 
 * 
 */
$(document).ready(function () {

    $(document).on("scroll", function (e) {
        if ($(this).scrollTop() >= 210)
            $("#task-btn-container").addClass("task-btn-attachment");
        else
            $("#task-btn-container").removeClass("task-btn-attachment");
    });

    /**
     * Yeasterday home work 
     * teacher input field
     * 
    */
    $(".yhw-cust-input-field, .ct-cust-input-field").on("click toutch", function (e) {
        var text = $(this).val();
        $(".task-btn").each(function () {
            if (text == $(this).text()) {
                $(this).parent().children().removeClass("active");
                hwTaskChecker($(this), text);
                return;
            }
        });
    });

    /**
    * Today task add
   */
    $(".task-btn").on("click toutch", function () {
        if (($(this).text() == "P") || ($(this).text() == "F"))
            $(".ct-cust-input-field").prop("checked", false);
        else
            $(".yhw-cust-input-field").prop("checked", false);

        $(this).parent().children().removeClass("active");
        hwTaskChecker($(this), $(this).text());
    });

    const hwTaskChecker = (current, text) => {
        switch (text) {
            case "C":
                current.addClass("active");
                current.parent().next().next().val("Complete");
                break;
            case "G":
                current.addClass("active");
                current.parent().next().next().val("Good");
                break;
            case "B":
                current.addClass("active");
                current.parent().next().next().val("Better");
                break;
            case "N":
                current.addClass("active");
                current.parent().next().next().val("Not Complete");
                break;
            case "P":
                current.addClass("active");
                current.parent().next().next().val("Pass");

                break;
            case "F":
                current.addClass("active");
                current.parent().next().next().val("Failed");

                break;
        }
    }
    /**
     * Today task add
    */
    $('#add-today-hw,#add-comment').on("click toutch", function (event) {
        $(".spinner").removeClass("d-none");
        $(".cmnts-pls-write-error,.cmnts-add-success-check,.hw-add-success-check,.hw-pls-write-error").addClass("d-none");
        if ($(this).hasClass("comment") && ($("#comment-write").val() != "")) {
            $(".cmnts-pls-write-error,.cmnts-add-success-check").addClass("d-none");
            setTimeout(() => {
                $(".cmnts-add-success-check").removeClass("d-none");
                $(".spinner").addClass("d-none");
                $(".teacher-comment").val($("#comment-write").val());
            }, 2300);
        }
        else if ($(this).hasClass("hw") && ($("#today-hw-write").val() != "")) {
            $(".hw-add-success-check,.hw-pls-write-error").addClass("d-none");
            setTimeout(() => {
                $(".hw-add-success-check").removeClass("d-none");
                $(".spinner").addClass("d-none");
                $(".today-hw").val($("#today-hw-write").val());

            }, 2300);
        }
        else if ($(this).hasClass("comment") && $("#comment-write").val() == "") {
            setTimeout(() => {
                $(".spinner,.cmnts-add-success-check").addClass("d-none");
                $(".cmnts-pls-write-error").removeClass("d-none");
                $(".teacher-comment").val($("#comment-write").val());
            }, 1000);
        }
        else if ($(this).hasClass("hw") && $("#today-hw-write").val() == "") {
            setTimeout(() => {
                $(".spinner,.hw-add-success-check").addClass("d-none");
                $(".hw-pls-write-error").removeClass("d-none");
                $(".today-hw").val($("#today-hw-write").val());
            }, 1000);
        }

    });

    /**
     * Add date and day name in
     * td 
    */
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var date = new Date(Date.now());
    const add = weekday[date.getDay()] + "<hr/>" + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
    $(".date").html(add);

    const formatAMPM = date => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes.toString().padStart(2, '0');
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }


    $(".time").html(formatAMPM(date));


});