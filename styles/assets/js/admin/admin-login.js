/**********************************
 * Created by shaheen reza
 * Created at 7/4/2022
 **********************************/
$(document).ready(function (data) {
    $("#erp-btn-login").click(function () {
        $(".erp-form-loader").fadeIn();
        let email = $(this).closest("form").find("input[type=email]").val();
        let password = $(this).closest("form").find("input[type=password]").val();
        let has_err= 0;
        setTimeout(() => {
            if(email===""){
                has_err = 1;
                $(this).closest("form").find("#erp-user-err").html("User name is required!").fadeIn();
                $(this).closest("form").find("input[type=email]").closest(".form-group").addClass("has-error");
                $(this).closest("form").find("input[type=email]").addClass("is-invalid");
            }else{
                $(this).closest("form").find("#erp-user-err").html("User name is required!").fadeOut();
                $(this).closest("form").find("input[type=email]").removeClass("is-invalid");
                $(this).closest("form").find("input[type=email]").addClass("is-valid");
            }
            if(password ===""){
                has_err = 1;
                $(this).closest("form").find("#erp-password-err").html("Password name is required!").fadeIn();
                $(this).closest("form").find("input[type=password]").closest(".form-group").addClass("has-error");
                $(this).closest("form").find("input[type=password]").addClass("is-invalid");
            }else{
                $(this).closest("form").find("input[type=password]").removeClass("is-invalid");
                $(this).closest("form").find("input[type=password]").addClass("is-valid");
                $(this).closest("form").find("#erp-password-err").html("Password name is required!").fadeOut();
            }
        }, 5000);
        setTimeout(() => {
            $(".erp-form-loader").fadeOut();
            if(has_err===0){
                $(this).attr("disabled","disabled");
                $(this).closest("form").find("input").attr("disabled","disabled");
                $(this).closest("form").find(".alert").html("Login success<br>Please wait while we redirecting you...");
                $(this).closest("form").find(".alert").addClass("alert-success").fadeIn();
                $(this).closest("form").find(".alert").removeClass("alert-danger");
            }else{
                $(this).closest("form").find(".alert").html("Login failed, Please fix following error(s)");
                $(this).closest("form").find(".alert").addClass("alert-danger").fadeIn();
                $(this).closest("form").find(".alert").removeClass("alert-success");
            }
        }, 5000);
    });
    // input icon animated by hover this
    $('.form-control').on("mouseenter",function() {
        $(this).prev().find("svg").addClass("fa-beat-fade");
    }).mouseleave(function() {
        $(this).prev("span").find("svg").removeClass("fa-beat-fade");
    });
});