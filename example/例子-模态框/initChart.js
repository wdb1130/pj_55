function initChart(chartDom, legend, xAxis, series) {
    var dom = document.getElementById(chartDom);
    var myChart = echarts.init(dom);
    option = null;
    option = {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: legend
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: xAxis
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: series
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
        window.onresize = myChart.resize;
    }
}