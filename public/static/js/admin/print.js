$(document).ready(function () {
    $(".print").on("click", function () {
        printSection();
    })
});
function printSection() {
    printJS({
        printable: 'printable',
        type: "html",
        targetStyles: ['*']
    });
}