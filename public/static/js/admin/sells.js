/**
 * *****************************
 * @Author Md. Masum
 * @Date 12/03/2023
 * -----------------------------
 * sells document js
 * *****************************
*/

$(document).ready(function () {
    $(".toggle-next").on("click toutch", function (e) {
        $(this).find("*").filter("span > svg").toggleClass("fa-plus fa-minus text-danger text-warning")
        $(this).parent().next().filter(".tbl-description").toggleClass("d-none");
    });
});