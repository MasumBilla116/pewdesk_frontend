$(document).ready(_ => {
    $(".table-form-control").on("keyup", function () {
        v = parseInt($(this).val());
        if (v > 0) {
            $(this).parent().prev().children().filter(".voucher-item-check ").show();
        }

        if (v < 0 || $(this).val() == "") {
            $(this).val("");
            $(this).parent().prev().children().filter(".voucher-item-check").hide();
        }
    });
    $("input").on("keyup", function (e) {
        var total = 0;
        maxField = $(this).parent().parent().parent().find("input").length - 1;
        $(this).parent().parent().parent().find("input")
            .each(function (index) {
                if ((parseFloat($(this).val()) > 0) && (index < maxField))
                    total += parseFloat($(this).val());
                if (index == maxField) {
                    $(this).val(total);
                    $(this).parent().parent().parent().parent().parent().next().find("input").val(numberToWords(total))
                }

            });
    });

    function numberToWords(number) {
        var digit = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        var elevenSeries = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
        var countingByTens = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
        var shortScale = ['', 'thousand', 'million', 'billion', 'trillion'];

        number = number.toString(); number = number.replace(/[\, ]/g, ''); if (number != parseFloat(number)) return 'not a number'; var x = number.indexOf('.'); if (x == -1) x = number.length; if (x > 15) return 'too big'; var n = number.split(''); var str = ''; var sk = 0; for (var i = 0; i < x; i++) { if ((x - i) % 3 == 2) { if (n[i] == '1') { str += elevenSeries[Number(n[i + 1])] + ' '; i++; sk = 1; } else if (n[i] != 0) { str += countingByTens[n[i] - 2] + ' '; sk = 1; } } else if (n[i] != 0) { str += digit[n[i]] + ' '; if ((x - i) % 3 == 0) str += 'hundred '; sk = 1; } if ((x - i) % 3 == 1) { if (sk) str += shortScale[(x - i - 1) / 3] + ' '; sk = 0; } } if (x != number.length) { var y = number.length; str += 'point '; for (var i = x + 1; i < y; i++) str += digit[n[i]] + ' '; } str = str.replace(/\number+/g, ' ');
        return str.trim() + " Tk. Only";

    }
})