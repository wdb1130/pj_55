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
var colorRadarList = new echarts.graphic.LinearGradient(0, 0, 1, 0, [{ offset: 0, color: '#CAA96E' }, { offset: 1, color: '#CE4430' }], false)
var colorScatterList = ['#45CE8D', '#FB943A', '#FF3838'];

var colorLineList = [
    'rgb(255,56,56)',
    'rgb(69,206,141)',
    'rgb(251,148,58)',
    'rgb(36,32,255)',
    'rgb(144,0,255)',
];
var colorLineGradientList = [
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(255,56,56, 0.3)'
    }, {
        offset: 0.8,
        color: 'rgba(255,56,56, 0)'
    }], false),
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(69,206,141, 0.3)'
    }, {
        offset: 0.8,
        color: 'rgba(69,206,141, 0)'
    }], false),
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(251,148,58, 0.3)'
    }, {
        offset: 0.8,
        color: 'rgba(251,148,58, 0)'
    }], false),
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(36,32,255, 0.3)'
    }, {
        offset: 0.8,
        color: 'rgba(36,32,255, 0)'
    }], false),
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(144,0,255, 0.3)'
    }, {
        offset: 0.8,
        color: 'rgba(144,0,255, 0)'
    }], false),
];


$(function () {
    layui.use('layer', function () {
        var $ = layui.jquery, layer = layui.layer;
        //触发事件
        var active = {
            setTop: function () {
                var that = this;
                layer.open({
                    type: 2,
                    title: ' ',
                    area: ['70%', '70%'],
                    shade: 0.3,
                    offset: ['15%', '15%'],
                    maxmin: true,
                    anim: 1,
                    content: '../pages/chartModal.html',
                    yes: function () {
                        $(that).click();
                    },
                    btn2: function () {
                        layer.closeAll();
                    },
                    zIndex: layer.zIndex,
                    success: function (layero) {
                        // 子页面弹出成功回调
                        layero.find('.layui-layer-title').text(modalTitle);
                    }
                });
            }
        };
        $('.chart-click').on('click', function () {
            modalTitle = $(this).text();
            chartTypeState = $(this).attr('data-chartType');
            postModalData = storageData[chartTypeState];
            var othis = $(this), method = othis.data('method');
            active[method] ? active[method].call(this, othis) : '';
        });
    });

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
            url: "../test-json/arcRadar_4.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    var indicator = [];
                    var seriesData = [];
                    res.result.seriesData.forEach(function (item) {
                        indicator.push({
                            text: item.title + ':' + item.value + '%',
                            max: 100
                        });
                        seriesData.push(item.value)
                    });
                    storageData.drawRectRadar.push(indicator);
                    storageData.drawRectRadar.push(seriesData);
                    storageData.drawRectRadar.push(colorRadarList);
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
                                    show: true,
                                    position: 'top'
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

});
