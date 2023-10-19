var phone_number = window.intlTelInput(document.querySelector("#phone"), {
    separateDialCode: true,
    preferredCountries:["bd"],
    hiddenInput: "full",
    utilsScript: "../../assets/js/plagins/phone.utils.js"
  });