import { useEffect } from "react";
import { useRef } from "react"



export default function Table2Excel() {
    const RunEffect = useRef(true);
    useEffect(() => {
        if (RunEffect.current === true) {
            $(document).ready(function () {
                $("#export-excel").on("click toutch", function () {
                    $("#printable").table2excel({
                        name: "Backup file for HTML content",

                        //  include extension also
                        filename: "excel-sheet.xls",

                        // 'True' is set if background and font colors preserved
                        preserveColors: false
                    });
                })


            })


            return () => RunEffect.current = false;

        }

    }, [])

    return (<></>)
}