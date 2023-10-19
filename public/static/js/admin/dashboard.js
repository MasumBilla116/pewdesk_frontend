$(document).ready(function () {
  $(".progress-bar").loading();
  // setTimeout(function () {	
  //     $rotate.css({
  //         'transition': 'transform ' + opts.duration + 'ms linear',
  //         'transform': 'rotate(' + opts.percent * 3.6 + 'deg)'
  //     });
  // },1);
  // apexchart 
  // var options = {
  //     series: [{
  //     data: data.slice()
  //   }],
  //     chart: {
  //     id: 'realtime',
  //     height: 350,
  //     type: 'line',
  //     animations: {
  //       enabled: true,
  //       easing: 'linear',
  //       dynamicAnimation: {
  //         speed: 1000
  //       }
  //     },
  //     toolbar: {
  //       show: false
  //     },
  //     zoom: {
  //       enabled: false
  //     }
  //   },
  //   dataLabels: {
  //     enabled: false
  //   },
  //   stroke: {
  //     curve: 'smooth'
  //   },
  //   title: {
  //     text: 'Dynamic Updating Chart',
  //     align: 'left'
  //   },
  //   markers: {
  //     size: 0
  //   },
  //   xaxis: {
  //     type: 'datetime',
  //     range: XAXISRANGE,
  //   },
  //   yaxis: {
  //     max: 100
  //   },
  //   legend: {
  //     show: false
  //   },
  //   };

  //   var chart = new ApexCharts(document.querySelector("#dyanmic-updatechart"), options);
  //   chart.render();


  //   window.setInterval(function () {
  //   getNewSeries(lastDate, {
  //     min: 10,
  //     max: 90
  //   })

  //   chart.updateSeries([{
  //     data: data
  //   }])
  // }, 1000);

  /*****************************
   * apex chart gradiant radial
   * ******************************/
  /*
 <<=============================================================>>
   start Rounded progress bar
 <<=============================================================>>
 */
  var options = {
    chart: {
      height: 280,
      type: "radialBar",
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350
      }
    },

    series: [35],
    colors: ["#20E647"],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "70%",
          background: "#293450"
        },
        track: {
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            blur: 4,
            opacity: 0.15
          }
        },
        dataLabels: {
          name: {
            offsetY: -10,
            color: "#fff",
            fontSize: "13px"
          },
          value: {
            color: "#fff",
            fontSize: "30px",
            show: true
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        gradientToColors: ["#87D4F9"],
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: "round"
    },
    labels: ["Tution fesh pay"]
  };

  var chart = new ApexCharts(document.querySelector("#radial-gradiant-chart"), options);

  chart.render();
  var options = {
    chart: {
      height: 280,
      type: "radialBar",
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350
      }
    },

    series: [82],
    colors: ["#20E647"],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "70%",
          background: "#293450"
        },
        track: {
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            blur: 4,
            opacity: 0.15
          }
        },
        dataLabels: {
          name: {
            offsetY: -10,
            color: "#fff",
            fontSize: "13px"
          },
          value: {
            color: "#fff",
            fontSize: "30px",
            show: true
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        gradientToColors: ["#87D4F9"],
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: "round"
    },
    labels: ["Today Student in present"]
  };

  var chart = new ApexCharts(document.querySelector("#radial-gradiant-chart2"), options);

  chart.render();
  var options = {
    chart: {
      height: 280,
      type: "radialBar",
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350
      }
    },

    series: [67],
    colors: ["#20E647"],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "70%",
          background: "#293450"
        },
        track: {
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            blur: 4,
            opacity: 0.15
          }
        },
        dataLabels: {
          name: {
            offsetY: -10,
            color: "#fff",
            fontSize: "13px"
          },
          value: {
            color: "#fff",
            fontSize: "30px",
            show: true
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        gradientToColors: ["#87D4F9"],
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: "round"
    },
    labels: ["Today Teacher is present"]
  };
  /*
  <<=============================================================>>
    End Rounded progress bar
  <<=============================================================>>
  */
  var chart = new ApexCharts(document.querySelector("#radial-gradiant-chart3"), options);

  chart.render();

  // chart 3
  var data = generateDayWiseTimeSeries(new Date("22 Apr 2017").getTime(), 115, {
    min: 30,
    max: 90
  });
  var options1 = {
    chart: {
      id: "chart2",
      type: "area",
      height: 230,
      foreColor: "#ccc",
      toolbar: {
        autoSelected: "pan",
        show: false
      }
    },
    colors: ["#00BAEC"],
    stroke: {
      width: 3
    },
    grid: {
      borderColor: "#555",
      clipMarkers: false,
      yaxis: {
        lines: {
          show: false
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      gradient: {
        enabled: true,
        opacityFrom: 0.55,
        opacityTo: 0
      }
    },
    markers: {
      size: 5,
      colors: ["#000524"],
      strokeColor: "#00BAEC",
      strokeWidth: 3
    },
    series: [
      {
        data: data
      }
    ],
    tooltip: {
      theme: "dark"
    },
    xaxis: {
      type: "datetime"
    },
    yaxis: {
      min: 0,
      tickAmount: 4
    }
  };

  var chart1 = new ApexCharts(document.querySelector("#chart-area"), options1);

  chart1.render();

  var options2 = {
    chart: {
      id: "chart1",
      height: 130,
      type: "bar",
      foreColor: "#ccc",
      brush: {
        target: "chart2",
        enabled: true
      },
      selection: {
        enabled: true,
        fill: {
          color: "#fff",
          opacity: 0.4
        },
        xaxis: {
          min: new Date("27 Jul 2017 10:00:00").getTime(),
          max: new Date("14 Aug 2017 10:00:00").getTime()
        }
      }
    },
    colors: ["#FF0080"],
    series: [
      {
        data: data
      }
    ],
    stroke: {
      width: 2
    },
    grid: {
      borderColor: "#444"
    },
    markers: {
      size: 0
    },
    xaxis: {
      type: "datetime",
      tooltip: {
        enabled: false
      }
    },
    yaxis: {
      tickAmount: 2
    }
  };

  var chart2 = new ApexCharts(document.querySelector("#chart-bar"), options2);

  chart2.render();

  function generateDayWiseTimeSeries(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = baseval;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push([x, y]);
      baseval += 86400000;
      i++;
    }
    return series;
  }

});
