var options = {
    series: [44, 55, 41, 17, 15],
    chart: {
        type: 'donut',
    },
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 200
            },
            legend: {
                position: 'bottom'
            }
        }
    }],
    colors: ["#E69900", "#00BD52", "#0F0F0F", '#DC3545', "#0DCAF0"],
    stroke: {
        show: false
    }
};

var chart = new ApexCharts(document.querySelector("#transection-chart"), options);
chart.render();
