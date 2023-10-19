$(document).ready(function () {

    var tr = "<tr>";
    tr += "<td class='class'>Play</td>";
    tr += "<td class='class-roll'></td>";
    tr += "<td>";
    tr += "<input type='text' name='student' id='student' placeholder='Student name' class='form-control bg-transparent border-success text-light mb-3' />";
    tr += "<input type='text' name='phone[]' id='phone' placeholder='Phone number' class='form-control bg-transparent border-success text-light' />";
    tr += "</td>";
    tr += "<td>";
    tr += "<input type='text' name='father' id='father' placeholder='Father name' class='form-control bg-transparent border-success text-light mb-3' />";
    tr += "<input type='text' name='phone[]' id='phone' placeholder='Phone number' class='form-control bg-transparent border-success text-light' />";
    tr += "</td>";
    tr += "<td>";
    tr += "<input type='text' name='mother[]' id='mother' placeholder='Mother name' class='form-control bg-transparent border-success text-light mb-3' />";
    tr += "<input type='text' name='phone[]' id='phone' placeholder='Phone number' class='form-control bg-transparent border-success text-light' />";
    tr += "</td>";
    tr += "<td>";
    tr += "<div class='form-floating'>";
    tr += "<textarea class='form-control text-light bg-transparent border-success'  placeholder='Present address' id='present-addr' style='height: 100px'></textarea>";
    tr += "<label for='present-addr'>Present Address</label>";
    tr += "</div>";
    tr += " </td>";
    tr += "<td>";
    tr += "<div class='form-floating'>";
    tr += "<textarea class='form-control text-light bg-transparent border-success' placeholder='Permanent address' id='permanent-addr' style='height: 100px'></textarea>";
    tr += "<label for='present-addr'>Permanent Address</label>";
    tr += "</div>";
    tr += "</td>";
    tr += " <td>";
    tr += "<button class='add btn btn-success rounded-circle d-block btn-sm mb-2'> <i class='fas fa fa-add'></i> </button>";
    tr += "<button class='remove btn btn-danger rounded-circle d-block btn-sm '> <i class='fas fa fa-trash'></i> </button>";
    tr += "</td>";
    tr += "";
    tr += "";
    tr += "";
    tr += "";
    tr += "";
    tr += " </tr >";



    $('#row').on('keyup', function () {

        var row = parseInt($(this).val());
        $(".overlap-loader").show();
        setTimeout(function () {
            $('tbody').empty()
            $(".overlap-loader").hide();
            for (i = 1; i <= row; i++)
                $('tbody').append(tr)
        }, 2000)


    });


    $(document).on("click toutch", '.remove', function () {
        updateRowCont($(this));
    });

    /*
    ----------------------------------------------
    insert  class in the tr
    ----------------------------------------------
    */
    $("#class").on("change", function (event) {
        var cls = $(this).val();
        $(".class").text(cls);
    })



    $(document).on("click", ".add", function (e) {

        $(this).parent().parent().after(tr);
        updateRowCont($(this));
    });


    function updateRowCont(target) {
        if (target.hasClass("remove")) {

            target.parent().parent().remove();
            $("#row").val($(".remove").length);
        }
        else {
            $("#row").val($(".add").length);

        }
    }

});



































