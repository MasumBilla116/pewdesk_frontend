$(document).ready(_ => {
    $(".student-present, .student-absent, .student-null")
        .on("click", function (e) {

            target = $(this);
            if (target.hasClass("student-present")) {
                target.next().removeClass("student-absent-active");
                target.next().next().removeClass("student-null-active")
                target.addClass("student-present-active");
            }
            else if (target.hasClass("student-absent")) {
                target.prev().removeClass("student-present-active");
                target.next().removeClass("student-null-active")
                target.addClass("student-absent-active");
            }
            else if (target.hasClass("student-null")) {
                target.prev().removeClass("student-absent-active");
                target.prev().prev().removeClass("student-present-active")
                target.addClass("student-null-active");
            }
        })
})