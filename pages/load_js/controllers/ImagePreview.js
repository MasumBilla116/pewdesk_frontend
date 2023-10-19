import { useEffect } from "react";
import { useRef } from "react";
import $ from "jquery";

export default function ImagePreview() {
  const Fire = useRef(true);
  useEffect(() => {
    if (Fire.current === true) {
      $(function () {
        $(".reader").on("change input toutch", function (event) {
          const reader = new FileReader();
          const view = $(this).attr("data-view");
          reader.onload = function (event) {
            $(view).attr("src", event.target.result);
            $(view).attr("srcset", event.target.result);
          };
          reader.readAsDataURL(event.target.files[0]);
        });
      });

      return () => (Fire.current = false);
    }
  });

  return <></>;
}
