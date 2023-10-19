// zip code validation function
	function zipcode_valid() {
		let error_count=0;
		let u_country = $("#w1-account").find("#country").val();
		let u_zip = $("#w1-account").find("#zip").val();
		// FETCHING DATA FROM JSON FILE
		$.ajaxSetup({
			async: false
		});
		var zip_regex= (function() {
			var result;
			$.getJSON('json/postal-codes.json', {}, function(data){
				// result = data;
				$.each(data, function (key, value) {
					if(u_country===value.Country){
						result = value.Regex;
						return false;
					}
				});
			});
			return result;
		})();
		
		if(u_zip==""){
			$("#w1-account").find("#errzip").closest(".form-group").addClass("has-error");
			$("#errzip").fadeIn();
			$("#errzip").text("This field is required !");
			error_count = 1;
		}else if(!u_zip.match(zip_regex)){
			$("#w1-account").find("#errzip").closest(".form-group").addClass("has-error");
			$("#errzip").fadeIn();
			$("#errzip").text("Zip code not matched with your country!");
			error_count = 1;
		}else{
			$("#errzip").closest(".form-group").removeClass("has-error");
			$("#errzip").text("")
			$("#errzip").fadeOut();
		}
		return error_count;
	}