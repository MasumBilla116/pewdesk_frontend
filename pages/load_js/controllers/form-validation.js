import { useEffect, useRef } from "react";

export default function FormValidationJs() {
  const RunEffect = useRef(true);
  useEffect(() => {
    if (RunEffect.current === true) {
      /******************************
       * create registration from validation
       * created by MD. Masum billa
       * created at 22/4/2022
       ********************************/
      $(document).ready(function () {
        /**
                |---------------------------------------
                |  check cherecter or not
                |----------------------------------------
                */
        $.validator.addMethod(
          "lettersonly",
          function (value) {
            return /^[A-Za-z\s]+$/.test(value);
          },
          "Only charecters allowed"
        );
        /**
                |----------------------------------------------
                |  check strong password or not
                |-----------------------------------------------
                */
        $.validator.addMethod(
          "strongPassword",
          function (value) {
            return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(
              value
            );
          },
          "Please enter strong password"
        );

        $("#erad-reg-form").validate({
          rules: {
            fname: {
              required: true,
              lettersonly: true,
              minlength: 3,
              maxlength: 10,
              nowhitespace: true,
            },
            lname: {
              required: true,
              lettersonly: true,
              minlength: 3,
              maxlength: 10,
              nowhitespace: true,
            },
            email: {
              required: true,
              email: true,
            },
            country: {
              required: true,
            },
            state: {
              required: true,
            },
            city: {
              required: true,
            },
            zipcode: {
              required: true,
              digits: true,
              nowhitespace: true,
            },
            phone: {
              required: true,
              digits: true,
              nowhitespace: true,
              minlength: 11,
              maxlength: 11,
            },
            orgname: {
              required: true,
            },
            addrline1: {
              required: true,
            },
            businesstype: {
              required: true,
            },
            business_email: {
              required: true,
              email: true,
            },
            business_location: {
              required: true,
            },
            employees: {
              required: true,
            },
            module: {
              required: true,
            },
            language: {
              required: true,
            },
            version: {
              required: true,
            },
            currency: {
              required: true,
            },
            taxcode: {
              required: true,
            },
            conditions: {
              required: true,
            },
            password: {
              required: true,
              strongPassword: true,
            },
            designation: {
              required: true,
            },
            password: {
              required: true,
              minlength: 4,
              // strongPassword: true
            },
            confpassword: {
              required: true,
              equalTo: "#password",
            },
          },
          messages: {
            fname: {
              required: "First name is required",
              minlength: "Minimum 3 charecters",
              maxlength: "Maximum 10 charecters",
              nowhitespace: "Whitespace not allowed",
            },
            lname: {
              required: "Last name is required",
              minlength: "Minimum 3 charecters",
              maxlength: "Maximum 10 charecters",
              nowhitespace: "Whitespace not allowed",
            },
            email: {
              required: "Email is required",
              email: "Invalid email",
            },
            country: {
              required: "Country is required",
            },
            state: {
              required: "State is required",
            },
            city: {
              required: "City is required",
            },
            zipcode: {
              required: "Zip-code is required",
              digits: "Only digits allowed",
              nowhitespace: "Whitespace not allowed",
            },
            phone: {
              required: "Phone is required",
              digits: "Only digits allowed",
              nowhitespace: "White space not allowed",
              minlength: "11 digits allowed",
              maxlength: "11 digits allowed",
            },
            orgname: {
              required: "Organization is required",
            },
            addrline1: {
              required: "Address line is required",
            },
            businesstype: {
              required: "Business type is required",
            },
            business_email: {
              required: "Business email is required",
              email: "Invalid email",
            },
            business_location: {
              required: "Business location is required",
            },
            employees: {
              required: "Employee is required",
            },
            module: {
              required: "Module is required",
            },
            language: {
              required: "Language is required",
            },
            version: {
              required: "Version is required",
            },
            currency: {
              required: "Currency is required",
            },
            taxcode: {
              required: "Tax-code is required",
            },
            conditions: {
              required: "Condition is required",
            },
            designation: {
              required: "Designation is required",
            },
            password: {
              required: "Password is required",
            },
            conf_password: {
              required: "Password is required",
              equalTo: "Both password are not identical",
            },
          },
        });
      });
      return () => (RunEffect.current = false);
    }
  }, []);
  return <></>;
}
