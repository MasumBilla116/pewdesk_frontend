import { useEffect , useRef} from "react"


export default function SellesJs() {

    const RunEffect = useRef(true);
    useEffect(() => {
        if (RunEffect.current === true) {
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
                    $(this).find("*").filter("span > i").toggleClass("fa-plus fa-minus text-danger text-warning")
                    $(this).parent().next().filter(".tbl-description").toggleClass("d-none");
                });
            });


            return () => RunEffect.current = false;
        }
    })
    return (<></>)
}