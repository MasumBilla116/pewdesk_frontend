$(document).ready(function () {
    $("#totalMark").on("keyup", function (e) {

        if (parseInt($(this).val()) > 99) {
            $(this).val(100)
        }
        if (parseInt($(this).val()) < 0) {
            $(this).val(0)
        }

        var totalMark = parseInt($(this).val());


        if (totalMark < 0 || $(this).val() == "") {
            $(".total-mark").text(0);
        }
        else {
            $(".total-mark").text(totalMark);
        }

        if (totalMark >= 80) {
            $(".toggle-td").show(function () {
                $(".exam-mark").each(function () {
                    generateLetterGrate($(this));
                })
            });
        }
        else {
            $(".toggle-td").hide();
        }
    });


    $("#subject").on("change", function () {
        var sub = $(this).val();
        if (sub == "") {
            $(".subject").text("");
        }
        else {
            $(".subject").text(sub);

        }
    });


    $(".exam-mark").on("keyup", function () {

        if ((parseFloat($(this).val()) > 100) && ($(this).val() != "")) {
            $(this).val(100);
        }
        generateLetterGrate($(this));
    });

    function generateLetterGrate(curElement) {
        var mark = parseFloat(curElement.val());
        var targetGrade = curElement.parent().next().children().filter("input");
        var targetPoint = curElement.parent().next().next().children().filter("input");

        if (mark >= 0 && curElement.val() != "") {
            if ((mark >= 80) && (mark <= 100)) {
                targetGrade.val("A+").removeClass("letter-grate-b letter-grate-c letter-grate-d letter-grate-f")
                    .addClass("letter-grate-a");
                targetPoint.val("5").removeClass("letter-grate-b letter-grate-c letter-grate-d letter-grate-f")
                    .addClass("letter-grate-a");
            }
            else if ((mark >= 70) && (mark <= 79)) {
                targetGrade.val("A")
                    .removeClass("letter-grate-b letter-grate-c letter-grate-d letter-grate-f")
                    .addClass("letter-grate-a");
                targetPoint.val("4").removeClass("letter-grate-b letter-grate-c letter-grate-d letter-grate-f")
                    .addClass("letter-grate-a");

            }
            else if ((mark >= 60) && (mark <= 69)) {
                targetGrade.val("A-")
                    .removeClass("letter-grate-b letter-grate-c letter-grate-d letter-grate-f")
                    .addClass("letter-grate-a");
                targetPoint.val("3.5").removeClass("letter-grate-b letter-grate-c letter-grate-d letter-grate-f")
                    .addClass("letter-grate-a");

            }
            else if ((mark >= 50) && (mark <= 59)) {
                targetGrade.val("B")
                    .removeClass("letter-grate-a letter-grate-c letter-grate-d letter-grate-f")
                    .addClass("letter-grate-b");
                targetPoint.val("3").removeClass("letter-grate-a letter-grate-c letter-grate-d letter-grate-f")
                    .addClass("letter-grate-b");

            }

            else if ((mark >= 40) && (mark <= 49)) {
                targetGrade.val("C")
                    .removeClass("letter-grate-a letter-grate-b letter-grate-d letter-grate-f")
                    .addClass("letter-grate-c");
                targetPoint.val("2").removeClass("letter-grate-a letter-grate-b letter-grate-d letter-grate-f")
                    .addClass("letter-grate-c");

            }
            else if ((mark >= 33) && (mark <= 39)) {
                targetGrade.val("D")
                    .removeClass("letter-grate-a letter-grate-c letter-grate-b letter-grate-f")
                    .addClass("letter-grate-d");
                targetPoint.val("1").removeClass("letter-grate-a letter-grate-c letter-grate-b letter-grate-f")
                    .addClass("letter-grate-d");

            }
            else {
                targetGrade.val("F")
                    .removeClass("letter-grate-b letter-grate-c letter-grate-d letter-grate-a")
                    .addClass("letter-grate-f");
                targetPoint.val("0").removeClass("letter-grate-b letter-grate-c letter-grate-d letter-grate-a")
                    .addClass("letter-grate-f");

            }
        }
        else {
            curElement.parent().next().children().filter("input").val("")
        }
    }




    $("#reset").on("click", function () {
        $("#resultForm")[0].reset();
        alert("ok")
    });

});