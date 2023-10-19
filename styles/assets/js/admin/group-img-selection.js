/***
 * ***********************
 * @Author Masum Billa
 * @date: 13/03/2023
 * ***********************
 * img preview and other 
 * controller
 * 
*/



$(document).ready(function () {
    $(".remove-btn").on("click", function () {
        $(this).parent().hide();
    });

    $(".add-btn").on("click toutch", function () {
        var avater = '<div class="form-group-img-selection"><button type="button" class="remove-btn"><i class="fas fa fa-close"></i></button><div class="img-loader spinner-border"></div><input type="file" name="file[]" class="img-reader" /><img class="rounded-circle img-fluid " src="../../../assets/images/user-300x300.jpg" alt="avater" /></div>';
        $(this).parent().children().filter(".add-btn").before(avater);
    });

    $(document).on("click toutch", ".remove-btn", function () {
        $(this).parent().hide();
    });

    $(document).on("change toutch", ".img-reader", function (e) {
        var file_reader = new FileReader();
        var view = $(this).next();
        var loader = $(this).prev().filter(".img-loader");
        loader.toggle();
        file_reader.onload = function (e) {
            view.attr("src", e.target.result);
            loader.toggle();
        }
        file_reader.readAsDataURL(e.target.files[0]);
    });


});