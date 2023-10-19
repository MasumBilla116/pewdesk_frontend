/******************************
 * create tabs for application
 * created by reza
 * created at 8/4/2022
 ********************************/
 var formValidateOk = [];
 var nextActiveTab = [];
 var tabIndex = 0;
$(document).ready(function () {

   
    $("#erp-btn-next").on("click",function(event){
        event.preventDefault();
        if(($(this).off("submit").submit() && ($("label.error").text() == "")))
        {
            var l = $(".erp-tab-item").length-1;
            $(".erp-tab-item").each(function(index){
                var target = $(this).next().data("target");
                var current = $(this).data("target");
                var last = $(".erp-tab-item:last-child").data("target");
                var first = $(".erp-tab-item:first-child").data("target");
                if(index == l)
                {
                    process();
                    setTimeout(function(){
                        activeTab(last,first);
                        submitBtnToggle(target,last);
                        $(".erp-tab-item:first-child").addClass("erp-tab-active")
                        .removeClass("erp-tab-past");
                    },2001)
                    return false;
                }
                if($(this).hasClass("erp-tab-active"))
                {
                    process();
                    var This = $(this);
                    setTimeout(function(){
                        activeTab(current,target);
                        submitBtnToggle(target,last);
                        $(This).removeClass("erp-tab-active").addClass("erp-tab-past");
                        $(This).next().addClass("erp-tab-active").removeClass("erp-tab-past")
                        .removeAttr("disabled");
                    },2001)
                    return false;
                }
            });

        
        }
        
    })
     
    function activeTab(current,target){
        $(target).slideDown(800,'linear');
        $(current).hide();
    }

    // amination for hole form
    $("#erad-reg-form").slideDown(800,'linear');

    formValidateOk.push($(".erp-tab-item:first-child").data("target"));
    $(".erp-tab-item").on("click toutch",function(event){
        event.preventDefault();
        $(this).off("submit").submit();
        var target = $(this).data('target');
        var lastTab = $(".erp-tab-item:last-child").data("target");
        var currentTag = $(this);
        if(($(this).off("submit").submit() && ($("label.error").text() == "")))
        {
            process();
            setTimeout(function(){
                activeDeactiveTab(target,currentTag,lastTab);
                submitBtnToggle(target,lastTab);
            },2001)
            return;
        }
        else
        {
            submitBtnToggle(target,lastTab);
            for(i=0;i<=formValidateOk.length;i++)
            {
                if(target == formValidateOk[i])
                {
                    
                    activeDeactiveTab(target,currentTag,lastTab);
                    return;
                }
            }
        }

    });

    function process(){
        $(".hr-inner-process").animate({
            "width" : "75%",
        },1500,function(){
            $(".hr-inner-process").animate({
                "width" : "100%",
            },500,function(){
                $(this).removeAttr('style')
            })
        });
    }
    function submitBtnToggle(target,lastTab){
       if(target == lastTab)
        {
            $("#erp-btn-next").hide();
            $(".erp-reg-submit").show();
        }
        else
        {
            $("#erp-btn-next").show();
            $(".erp-reg-submit").hide();
        }
        
        return;
    }



    function activeDeactiveTab(target,currentTag,lastTab){
        let target_tab = $(currentTag).closest(".erp-tab-nav").data("tab");
        $(target).slideDown(800,'linear')
        $(".erp-tab-item").each(function (index, currentTag) {
            if($(currentTag).hasClass("erp-tab-active") || $(currentTag).hasClass("erp-tab-past")){
                $(currentTag).addClass("erp-tab-past");
            }
            $(currentTag).removeClass("erp-tab-active");
        });
        $(target_tab).find(".erp-tab").each(function (index, currentTag) {
            $(currentTag).removeClass("erp-tab-active").hide();
        })
        if(nextActiveTab.length >= 1)
        {
            nextActiveTab.splice($.inArray(target,nextActiveTab),1);
        }
        
        $(target).addClass("erp-tab-active").slideDown(800,'linear');
        $(currentTag).addClass("erp-tab-active");
        $(currentTag).removeAttr("disabled");
        $(currentTag).removeClass("erp-tab-past");
        formValidateOk.push(target);
        if((lastTab == $(currentTag).next().data('target')) || $(currentTag).next().hasClass("erp-tab-past"))
        {
            $(".erp-tab-item:last-child").removeAttr("disabled");
        }
        else
        {
            $(".erp-tab-item:last-child").attr("disabled","disabled");
        }
        return;
    }

    loadTab();
    function loadTab()
    {
        $(".erp-tab-item").each(function(index){
            var tab = $(this).data("target");
            nextActiveTab.push(tab);
        });
    }

})

 
// custom select option
$(document).ready(function () {

    $(".select-wrapper").click(function () {
        $(this).find(".select").toggleClass('open');
    });

    $(".custom-option").click(function () {
        let phoneCode = $(this).data("prepend");
        $("#phone").val(phoneCode);
        $(this).closest(".custom-option.selected").removeClass("selected");
        $(this).addClass("selected");
        let option = $(this).contents().clone(true);
        $(this).closest(".select").find(".select__trigger").find("span").html(option);
           
    })
});
// for (const option of document.querySelectorAll(".custom-option")) {
//     option.addEventListener('click', function() {
//         if (!this.classList.contains('selected')) {
//             this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
//             this.classList.add('selected');
//             this.closest('.select').querySelector('.select__trigger span').textContent = this.textContent;
//         }
//     })
// }
// window.addEventListener('click', function(e) {
//     const select = document.querySelector('.select')
//     if (!select.contains(e.target)) {
//         select.classList.remove('open');
//     }
// });
// animation of icons info
$(document).ready(function () {
    $('.input-group-text').on("mouseenter",function() {
        $(this).find("svg").addClass("fa-beat-fade");
    }).mouseleave(function() {
        $(this).find("svg").removeClass("fa-beat-fade");
    });
    // before input
    $('.form-control,.form-select').on("mouseenter",function() {
        $(this).prev().find("svg").addClass("fa-beat-fade");
    }).mouseleave(function() {
        $(this).prev("span").find("svg").removeClass("fa-beat-fade");
    });
});