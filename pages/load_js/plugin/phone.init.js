import { useEffect, useRef } from "react";


export default function PhoneInitJs() {
    const RunEffect = useRef(true);
    useEffect(() => {
        if (RunEffect.current === true) {
            var phone_number = window.intlTelInput(document.querySelector("#phone"), {
                separateDialCode: true,
                preferredCountries: ["bd"],
                hiddenInput: "full",
                utilsScript: "../../assets/js/plagins/phone.utils.js"
            });

            return () => RunEffect.current = false;
        }

    }, [])
    return (<></>)
}