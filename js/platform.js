var modalTitle;
var chartTypeState;

// 模态框获取的
var postModalData;

// 所有图表请求后暂存
var storageData = {
    drawMeterPointer: [],
    draw3DCylinder: [],
    drawRectRadar: [],
    drawGradientLine: [],
    drawScatter: []
}

var color3DCylinder = [
    ['#D8152E', '#FF7521'],
    ['#FE7421', '#FACF65'],
    ['#085BC1', '#26E8FF'],
    ['#085BC1', '#26E8FF']
];
var colorRadarList = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#FF4C23' }, { offset: 1, color: '#FFD385' }], false)
var percentColor = "#27BAFE";

var colorScatterList = ['#0DF6FF', '#FFC65C', '#FF3F3F'];

var colorLineList = [
    '#FF3838',
    '#0CDCFF',
    '#FFBA58',
    '#135BFF',
    '#8124FF',
];
var colorLineGradientList = [
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(255,56,56, 0.16)'
    }, {
        offset: 0.8,
        color: 'rgba(255,56,56, 0)'
    }], false),
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(12,220,255, 0.16)'
    }, {
        offset: 0.8,
        color: 'rgba(12,220,255, 0)'
    }], false),
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(255,186,88, 0.16)'
    }, {
        offset: 0.8,
        color: 'rgba(255,186,88, 0)'
    }], false),
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(19,91,255, 0.16)'
    }, {
        offset: 0.8,
        color: 'rgba(19,91,255, 0)'
    }], false),
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(129,36,255, 0.16)'
    }, {
        offset: 0.8,
        color: 'rgba(129,36,255, 0)'
    }], false),
];


$(function () {
    setTimeout(function () {
        // chart1
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/meter.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    var val = res.result.seriesData[0].value;
                    storageData.drawMeterPointer.push(val);
                    initChartFun.drawMeterPointer('chart1', val);
                };
            }
        });

        // chart2
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/3d_arc.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    storageData.draw3DCylinder.push(res.result.seriesData);
                    storageData.draw3DCylinder.push(color3DCylinder);
                    initChartFun.draw3DCylinder('chart2', storageData.draw3DCylinder);
                };
            }
        });

        // chart3
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/arcRadar_5.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    var indicator = [];
                    var seriesData = [];
                    res.result.seriesData.forEach(function (item, idx) {
                        indicator.push({
                            text: idx ? item.title + '\n' + item.value + '%' : item.value + '%\n' + item.title + '&',
                            max: 100
                        });
                        seriesData.push(item.value);
                    });
                    storageData.drawRectRadar.push(indicator);
                    storageData.drawRectRadar.push(seriesData);
                    storageData.drawRectRadar.push(colorRadarList);
                    storageData.drawRectRadar.push(percentColor);
                    initChartFun.drawRectRadar('chart3', storageData.drawRectRadar);
                };
            }
        });

        // chart4
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/scatter.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    var seriesData = [];
                    res.result.seriesData.forEach(function (item, idx) {
                        var arr = [];
                        arr.push(item.host, item.risk);
                        seriesData.push(arr);
                    });
                    storageData.drawScatter.push(seriesData, colorScatterList);
                    initChartFun.drawScatter('chart4', storageData.drawScatter);
                };
            }
        });

        // chart5
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/lineGradient_5.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    var xAxisData = [];
                    var sitemArr = [[], [], [], [], []];
                    var seriesData = []
                    res.result.seriesData.forEach(function (item, idx) {
                        xAxisData.push(item.date);
                        sitemArr[0].push(item.globalSituation);
                        sitemArr[1].push(item.asset);
                        sitemArr[2].push(item.serve);
                        sitemArr[3].push(item.user);
                        sitemArr[4].push(item.data);
                    });
                    res.result.legendData.forEach(function (item, idx) {
                        seriesData.push({
                            name: item,
                            type: 'line',
                            lineStyle: {
                                normal: {
                                    width: 1
                                }
                            },
                            label: {
                                normal: {
                                    show: false,
                                    position: 'top',
                                    textStyle: {
                                        color: '#95D9F8'
                                    }
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: colorLineGradientList[idx],
                                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                                    shadowBlur: 10
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: colorLineList[idx]
                                }
                            },
                            data: sitemArr[idx]
                        });
                    });
                    storageData.drawGradientLine.push(res.result.legendData);
                    storageData.drawGradientLine.push(xAxisData);
                    storageData.drawGradientLine.push(seriesData);
                    initChartFun.drawGradientLine('chart5', storageData.drawGradientLine);
                }
            }
        });
    }, 1000);

    // initModal
    $('[data-method="setTop"]').click(function () {
        modalTitle = $(this).text();
        chartTypeState = $(this).attr('data-chartType');
        postModalData = storageData[chartTypeState];
        initModal(modalTitle, chartTypeState, postModalData);
    });
});
