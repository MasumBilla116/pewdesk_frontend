/**
 * *********************************
 * @Author @Masum_Billa 
 * @Date : 12/03/2023
 * *********************************
 * delete item from database
*/
$(document).ready(_ => {

    $(".delete-item").on("click toutch", function () {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary files!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
    });
})