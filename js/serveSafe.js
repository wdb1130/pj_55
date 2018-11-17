var chartTypeState;

// 模态框获取的
var postModalData;

// 所有图表请求后暂存
var storageData = {
    drawLiquidFill: [],
    drawOneFanPie1: [],
    drawOneFanPie2: [],
    drawLine4: [],
    drawLine5: [],
    drawLine6: [],
    drawTwoFanPie: [],
    drawVerticalBarH: []
}

var ColorOneFanPie1List = ['#45CE8D', 'rgba(69,206,141, .5)'];
var ColorOneFanPie2List = ['#FB943A', 'rgba(251,148,58, .5)'];
var colorVerticalBarList = ['#45CE8D', '#9000FF'];
var colorLineList1 = ['#FF3838', '#9000FF', '#45CE8D'];
var colorLineList2 = ['#2420FF', '#EC13FF', '#FB943A', '#45CE8D', '#FF3838'];
var colorTwoFanPieList = ['#2420FF', '#9000FF'];
var colorLiquidFillList1 = ['rgba(144,0,255,0.3)', 'rgba(144,0,255, 0.1)'];
var colorLiquidFillList2 = new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [{
    offset: 0,
    color: 'rgba(28,141,239,0)' // 0% 处的颜色
},
{
    offset: 0.6,
    color: 'rgba(28,141,239,0.4)' // 0% 处的颜色
}, {
    offset: 1,
    color: 'rgba(28,141,239,1)' // 100% 处的颜色
}
], false);

// chart5
$(function () {
    layui.use('layer', function () {
        var $ = layui.jquery, layer = layui.layer;
        //触发事件
        var active = {
            setTop: function () {
                var that = this;
                layer.open({
                    type: 2,
                    title: '图表的模态框测试',
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
                    },
                    full: function (dom) {
                        dom.find('iframe').contents().find('.content').html("");
                        dom.find('iframe').contents().find('.content').append('<div id="chartModal"></div>');
                        var funName = dom.find('iframe')[0].contentWindow.funName;
                        var postodalData = dom.find('iframe')[0].contentWindow.postodalData;
                        dom.find('iframe')[0].contentWindow.initChartFun[funName]('chartModal', postodalData);
                    }
                });
            }
        };
        $('.chart-click').on('click', function () {
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
            url: "../test-json/oneFanPie_1.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    var legendData = [];
                    var seriesData = [];
                    res.result.seriesData.forEach(function (item) {
                        legendData.push(item.name);
                        seriesData.push(item.value);
                    });
                    storageData.drawLiquidFill.push(legendData);
                    storageData.drawLiquidFill.push(seriesData);
                    storageData.drawLiquidFill.push(colorLiquidFillList1);
                    storageData.drawLiquidFill.push(colorLiquidFillList2);
                    initChartFun.drawLiquidFill('chart1', storageData.drawLiquidFill);
                };
            }
        });

        // chart2
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/oneFanPie_1.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    var legendData = [];
                    var seriesData = [];
                    res.result.seriesData.forEach(function (item) {
                        legendData.push(item.name);
                        seriesData.push(item.value);
                    });
                    storageData.drawOneFanPie1.push(legendData);
                    storageData.drawOneFanPie1.push(seriesData);
                    storageData.drawOneFanPie1.push(ColorOneFanPie1List);
                    initChartFun.drawOneFanPie('chart2', storageData.drawOneFanPie1);
                };
            }
        });

        // chart3
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/oneFanPie_1.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    var legendData = [];
                    var seriesData = [];
                    res.result.seriesData.forEach(function (item) {
                        legendData.push(item.name);
                        seriesData.push(item.value);
                    });
                    storageData.drawOneFanPie2.push(legendData);
                    storageData.drawOneFanPie2.push(seriesData);
                    storageData.drawOneFanPie2.push(ColorOneFanPie2List);
                    initChartFun.drawOneFanPie('chart3', storageData.drawOneFanPie2);
                };
            }
        });

        // chart4
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/line_3.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    var xAxisData = [];
                    var sitemArr = [[], [], []];
                    var seriesData = []
                    res.result.seriesData.forEach(function (item, idx) {
                        xAxisData.push(item.date);
                        sitemArr[0].push(item.globalSituation);
                        sitemArr[1].push(item.usability);
                        sitemArr[2].push(item.stability);
                    });
                    res.result.legendData.forEach(function (item, idx) {
                        seriesData.push({
                            name: item,
                            type: 'line',
                            symbol: 'circle',
                            symbolSize: 8,
                            lineStyle: {
                                normal: {
                                    width: 1
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: colorLineList1[idx],
                                    borderWidth: 1

                                }
                            },
                            data: sitemArr[idx]
                        })
                    });
                    storageData.drawLine4.push(res.result.legendData);
                    storageData.drawLine4.push(xAxisData);
                    storageData.drawLine4.push(seriesData);
                    initChartFun.drawLine('chart4', storageData.drawLine4);
                };
            }
        });


        // chart5
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/line_5.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    var xAxisData = [];
                    var sitemArr = [[], [], [], [], []];
                    var seriesData = []
                    res.result.seriesData.forEach(function (item, idx) {
                        xAxisData.push(item.date);
                        sitemArr[0].push(item.TCP);
                        sitemArr[1].push(item.UDP);
                        sitemArr[2].push(item.HTTP);
                        sitemArr[3].push(item.FTP);
                        sitemArr[4].push(item.SSL);
                    });
                    res.result.legendData.forEach(function (item, idx) {
                        seriesData.push({
                            name: item,
                            type: 'line',
                            symbol: 'circle',
                            symbolSize: 8,
                            lineStyle: {
                                normal: {
                                    width: 1
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: colorLineList2[idx],
                                    borderWidth: 1

                                }
                            },
                            data: sitemArr[idx]
                        })
                    });
                    storageData.drawLine5.push(res.result.legendData);
                    storageData.drawLine5.push(xAxisData);
                    storageData.drawLine5.push(seriesData);
                    initChartFun.drawLine('chart5', storageData.drawLine5);
                };
            }
        });

        // chart6
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/line_5.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    var xAxisData = [];
                    var sitemArr = [[], [], [], [], []];
                    var seriesData = []
                    res.result.seriesData.forEach(function (item, idx) {
                        xAxisData.push(item.date);
                        sitemArr[0].push(item.TCP);
                        sitemArr[1].push(item.UDP);
                        sitemArr[2].push(item.HTTP);
                        sitemArr[3].push(item.FTP);
                        sitemArr[4].push(item.SSL);
                    });
                    res.result.legendData.forEach(function (item, idx) {
                        seriesData.push({
                            name: item,
                            type: 'line',
                            symbol: 'circle',
                            symbolSize: 8,
                            lineStyle: {
                                normal: {
                                    width: 1
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: colorLineList2[idx],
                                    borderWidth: 1

                                }
                            },
                            data: sitemArr[idx]
                        })
                    });
                    storageData.drawLine6.push(res.result.legendData);
                    storageData.drawLine6.push(xAxisData);
                    storageData.drawLine6.push(seriesData);
                    initChartFun.drawLine('chart6', storageData.drawLine6);
                };
            }
        });

        // chart7
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/twoFanPie_2.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    var legendData = [];
                    res.result.seriesData.forEach(function (item) {
                        legendData.push(item.name);
                    });
                    storageData.drawTwoFanPie.push(legendData);
                    storageData.drawTwoFanPie.push(res.result.seriesData);
                    storageData.drawTwoFanPie.push(colorTwoFanPieList);
                    initChartFun.drawTwoFanPie('chart7', storageData.drawTwoFanPie);
                };
            }
        });

        // chart8
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/verticalBar_2.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    var xAxisData = [];
                    var sitemArr = [[], []];
                    var seriesData = [];
                    res.result.seriesData.forEach(function (item) {
                        xAxisData.push(item[0]['date']);
                        sitemArr[0].push(item[0]['openness']);
                        sitemArr[1].push(item[0]['rate']);
                    });
                    res.result.legendData.forEach(function (item, idx) {
                        seriesData.push({
                            name: item,
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color: colorVerticalBarList[idx]
                                }
                            },
                            barWidth: 12,
                            data: sitemArr[idx]
                        })
                    });
                    storageData.drawVerticalBarH.push(res.result.legendData);
                    storageData.drawVerticalBarH.push(xAxisData);
                    storageData.drawVerticalBarH.push(seriesData);
                    initChartFun.drawVerticalBarH('chart8', storageData.drawVerticalBarH);
                };
            }
        });

    }, 1000);

});