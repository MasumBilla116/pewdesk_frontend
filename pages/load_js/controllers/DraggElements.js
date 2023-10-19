import { useEffect, useRef } from "react";

export default function DraggElements() {
  const RunEffect = useRef(true);
  useEffect(() => {
    if (RunEffect.current === true) {
      $(document).ready(function () {
        /*
               ----------------------------------
               --------- window minimize --------
               ----------------------------------
               */
        $(".window-minimize").on("click toutch", function (event) {
          $(this).parent().next().toggle();
          $(this).parent().toggleClass("mb-2");
          $(this)
            .children()
            .toggleClass("fa fa-window-maximize fa-solid fa-window-minimize");
          localStorage.setItem(
            "filter-ledger",
            $(this).parent().next().attr("style")
          );
        });

        /*
                ----------------------------------
                ------ Dragg element controller ----------
                ----------------------------------
                */
        $(".tbl-search-btn").on("click toutch", function () {
          $(this).prev().toggleClass("d-none d-block");
          $(this).parent().addClass("d-flex");
        });

        $("#draggable").on("click toutch", function () {
          $(this).toggleClass("d-none d-block");
          $("#dropable").toggleClass("d-none d-block");
          $("#dragg")
            .animate(
              {
                // width: "0px",
              },
              500,
              "linear",
              function () {
                $(".tbl-search-con").toggleClass("d-none d-block");
              }
            )
            .draggable({
              cursor: "grabbing",
            })
            .css({
              position: "fixed",
              background: "rgb(6, 102, 58)",
              "border-radius": "5px",
              "z-index": "9999",
            })
            .addClass(
              "d-flex justify-content-center align-items-center border border-light"
            );
        });
        /*
                -------------------------------------------------
                ------ get draggable element position 
                -------------------------------------------------
                */
        $("#dragg").on("mouseup", function () {
          localStorage.setItem("dragg-report-menu", $("#dragg").attr("style"));
          localStorage.setItem("search-icon", true);
        });
        /*
               -------------------------------------------------
               ------ Load draggable element custom set 
               -------------------------------------------------
               */
        loadDraggableSection();
        function loadDraggableSection() {
          var draggOptionPosition = localStorage.getItem("dragg-report-menu");
          var filterLedgerPosition = localStorage.getItem("filter-ledger");
          var searchIcon = localStorage.getItem("search-icon");

          if (
            draggOptionPosition != "undefined" &&
            draggOptionPosition != null &&
            draggOptionPosition != ""
          ) {
            if (searchIcon == "true") {
              $(".tbl-search-con").toggleClass("d-none d-block");
            }

            $("#dragg")
              .attr("style", draggOptionPosition)
              .draggable({
                cursor: "grabbing",
              })
              .addClass(
                "d-flex justify-content-center align-items-center border border-light"
              );

            $("#draggable").toggleClass("d-none d-block");
            $("#dropable").toggleClass("d-none d-block");
          }

          if (
            filterLedgerPosition != "undefined" &&
            filterLedgerPosition != null &&
            filterLedgerPosition != ""
          ) {
            $(".erp-filter-ledger").attr("style", filterLedgerPosition);
            $(".window-minimize")
              .children()
              .toggleClass("fa fa-window-maximize fa-solid fa-window-minimize");
            $(".window-minimize").parent().toggleClass("mb-2");
          }
        }

        /*
               -------------------------------------------------
               ------  Release draggable element to corect
               ------  Position or previous position
               -------------------------------------------------
               */

        $("#dropable").on("click toutch", function (event) {
          event.stopPropagation();
          event.preventDefault();

          $(this).toggleClass("d-none d-block");
          $("#draggable").toggleClass("d-none d-block");
          localStorage.setItem("search-icon", false);
          $("#dragg")
            .removeAttr("style")
            .removeClass(
              "justify-content-center align-items-center border border-light"
            );
          localStorage.setItem("dragg-report-menu", $("#dragg").attr("style"));
          $(".tbl-search-con").toggleClass("d-none d-block");
        });
        /*
                ----------------------------------
                ---- Show the secondary nav 
                ----------------------------------
                */
        $(document).on("scroll", function (event) {
          $("#secondary-header").css({
            left: $("#first-header").offset().left,
            width: $("#first-header").width(),
          });
          if (window.pageYOffset > 150) {
            $("#secondary-header").animate(
              {
                top: "0",
              },
              500
            );
          } else {
            $("#secondary-header").animate(
              {
                top: "-50%",
              },
              1
            );
          }
        });

        /*
                ---------------------------------------
                ---- dragg the right side option
                ---------------------------------------
                */

        $(".right-op").draggable({
          cursor: "grabbing",
          opacity: 0.5,
        });

        /*
                ----------------------------------
                ---- title here -------------
                ----------------------------------
                */
      });

      return () => (RunEffect.current = false);
    }
  }, []);
  return <></>;
}
