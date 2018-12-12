var modalTitle;
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

var colorOneFanPie1List = [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
    offset: 0,
    color: 'rgb(50,214,255)'
}, {
    offset: 1,
    color: 'rgb(18,241,170)'
}], false), new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
    offset: 0,
    color: 'rgba(50,214,255,.3)'
}, {
    offset: 1,
    color: 'rgba(18,241,170,.3)'
}], false)];
var colorOneFanPie2List = [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
    offset: 0,
    color: 'rgb(255,160,68)'
}, {
    offset: 1,
    color: 'rgb(246,92,62)'
}], false), new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
    offset: 0,
    color: 'rgba(255,160,68,.3)'
}, {
    offset: 1,
    color: 'rgba(246,92,62,.3)'
}], false)];
var colorVerticalBarList = ['#45CE8D', '#8124FF'];
var colorLineList1 = ['#FF3838', '#8124FF', '#45CE8D'];
var colorLineList2 = ['#2420FF', '#EC13FF', '#DF9B4C', '#40CF77', '#FF3838'];
var colorTwoFanPieList = [new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
    offset: 0,
    color: '#8F3CF7'
}, {
    offset: 1,
    color: '#570BE2'
}], false), new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
    offset: 0,
    color: '#2970FB'
}, {
    offset: 1,
    color: '#021BAB'
}], false)];
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
    drawSvgDash();
    $(window).resize(function () {
        drawSvgDash();
    });
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
                    maxmin: false,
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
                    },
                    full: function (dom) {
                        if (chartTypeState == "drawLiquidFill") {
                            dom.find('iframe').contents().find('.content').html("");
                            dom.find('iframe').contents().find('.content').append('<div id="chartModal"></div>');
                            var funName = dom.find('iframe')[0].contentWindow.funName;
                            var postodalData = dom.find('iframe')[0].contentWindow.postodalData;
                            dom.find('iframe')[0].contentWindow.initChartFun[funName]('chartModal', postodalData);
                        }
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

                    // var legend = '';
                    // var value = '';
                    // res.result.seriesData.forEach(function (item) {
                    //     legend = item.name
                    //     value = item.value ;
                    // });
                    // initChartFun.drawWaterBall('chart1',value,legend);
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
                    storageData.drawOneFanPie1.push(colorOneFanPie1List);
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
                    storageData.drawOneFanPie2.push(colorOneFanPie2List);
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
                            symbolSize: 4,
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
                            symbolSize: 4,
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
                            symbolSize: 4,
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
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: '#95D9F8'
                                    }
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
function drawSvgDash() {
    $('.svg-data').html("");
    var tag1Left = $('#tag1').offset().left;
    var tag1Top = $('#tag1').offset().top;
    var tag1Width = $('#tag1').width();
    var tag1Hight = $('#tag1').height();
    // 起点
    var cx1 = Math.floor(tag1Left + tag1Width / 3);
    var cy1 = Math.floor(tag1Top + tag1Hight / 2);
    // 终点
    var boxSvg4Top = $('.box-svg4').offset().top;
    var boxSvg4Left = $('.box-svg4').offset().left;
    var boxSvg4Height = $('.box-svg4').height();
    var cyy1 = Math.floor(boxSvg4Top + boxSvg4Height) - 5;
    var pathLine1 = "M" + cx1 + " " + cy1 + " L" + cx1 + " " + cyy1;

    var tag2Left = $('#tag2').offset().left;
    var tag2Top = $('#tag2').offset().top;
    var tag2Width = $('#tag2').width();
    var tag2Hight = $('#tag2').height();
    // 起点
    var cx2 = Math.floor(tag2Left + tag2Width / 3);
    var cy2 = Math.floor(tag2Top + tag2Hight / 2);
    // 终点
    var boxSvg3Left = $('.box-svg3').offset().left;
    var boxSvg3Width = $('.box-svg3').width();
    var cxx2 = Math.floor(boxSvg3Left + boxSvg3Width) - 5;
    var pathLine2 = "M" + cx2 + " " + cy2 + " L" + cxx2 + " " + cy2;
    // 终点
    var boxSvg1Top = $('.box-svg1').offset().top;
    var boxSvg1Left = $('.box-svg1').offset().left;
    var boxSvg1Width = $('.box-svg1').width();
    var boxSvg1Height = $('.box-svg1').height();
    var line1X = Math.floor((boxSvg4Left - (boxSvg1Left + boxSvg1Width)) * (1 / 3) + (boxSvg1Left + boxSvg1Width));
    var line1Y = Math.floor(boxSvg1Top + boxSvg1Height * (3 / 4));
    var line1XX = Math.floor(boxSvg1Left + boxSvg1Width) - 5;
    var pathLine3 = "M" + cx2 + " " + cy2 + " L" + line1X + " " + line1Y + " L" + line1XX + " " + line1Y;
    // 终点
    var boxSvg2Top = $('.box-svg2').offset().top;
    var boxSvg2Left = $('.box-svg2').offset().left;
    var boxSvg2Width = $('.box-svg2').width();
    var boxSvg2Height = $('.box-svg2').height();
    var line2X = Math.floor(boxSvg2Top + boxSvg2Height * (2 / 3));
    var line2Y = Math.floor(boxSvg2Left + boxSvg2Width) - 5;
    var pathLine4 = "M" + cx2 + " " + cy2 + " L" + line1X + " " + line2X + " L" + line2Y + " " + line2X;
    // 起点
    var tag3Left = $('#tag3').offset().left;
    var tag3Top = $('#tag3').offset().top;
    var tag3Width = $('#tag3').width();
    var tag3Hight = $('#tag3').height();
    // 起点
    var cx3 = Math.floor(tag3Left + tag3Width * (2 / 3));
    var cy3 = Math.floor(tag3Top + tag3Hight / 2);
    // 终点
    var boxSvg5Top = $('.box-svg5').offset().top;
    var boxSvg5Left = $('.box-svg5').offset().left;
    var boxSvg5Width = $('.box-svg5').width();
    var boxSvg5Height = $('.box-svg5').height();
    var line5Y = Math.floor(boxSvg5Top + boxSvg5Height) - 5
    var pathLine5 = "M" + cx3 + " " + cy3 + " L" + cx3 + " " + line5Y;
    // 终点
    var boxSvg6Left = $('.box-svg6').offset().left;
    var boxSvg6Top = $('.box-svg6').offset().top;
    var boxSvg6Width = $('.box-svg6').width();
    var boxSvg6Height = $('.box-svg6').height();
    var line6X = Math.floor((boxSvg6Left - (boxSvg5Left + boxSvg5Width)) * (2 / 3) + (boxSvg5Left + boxSvg5Width));
    var line6Y = Math.floor(boxSvg6Top + boxSvg6Height * (3 / 4));
    var line6XX = Math.floor(boxSvg6Left) + 5;
    var pathLine6 = "M" + cx3 + " " + cy3 + " L" + line6X + " " + line6Y + " L" + line6XX + " " + line6Y;
    // 终点
    var boxSvg7Left = $('.box-svg7').offset().left;
    var boxSvg7Top = $('.box-svg7').offset().top;
    var boxSvg7Width = $('.box-svg7').width();
    var boxSvg7Height = $('.box-svg7').height();
    var line7Y = Math.floor(boxSvg7Top + boxSvg7Height * (2 / 3));
    var line7XX = Math.floor(boxSvg7Left) + 5;
    var pathLine7 = "M" + cx3 + " " + cy3 + " L" + line6X + " " + line7Y + " L" + line7XX + " " + line7Y;
    // 终点
    var boxSvg8Top = $('.box-svg8').offset().top;
    var boxSvg8Left = $('.box-svg8').offset().left;
    var boxSvg8Width = $('.box-svg8').width();
    var boxSvg8Height = $('.box-svg8').height();
    var line8X = Math.floor(boxSvg8Top + boxSvg8Height / 2);
    var line8XX = Math.floor(boxSvg8Left) + 5;
    var pathLine8 = "M" + cx3 + " " + cy3 + " L" + line6X + " " + cy3 + " L" + line6X + " " + line8X + " L" + line8XX + " " + line8X;

    var wrapper1Arc = '<path stroke-dasharray="2,2" d="' + pathLine1 + '" fill="transparent" stroke="#A3E8FE" />';
    var wrapper2Arc = '<path stroke-dasharray="2,2" d="' + pathLine2 + '" fill="transparent" stroke="#A3E8FE" />';
    var wrapper3Arc = '<path stroke-dasharray="2,2" d="' + pathLine3 + '" fill="transparent" stroke="#A3E8FE" />';
    var wrapper4Arc = '<path stroke-dasharray="2,2" d="' + pathLine4 + '" fill="transparent" stroke="#A3E8FE" />';
    var wrapper5Arc = '<path stroke-dasharray="2,2" d="' + pathLine5 + '" fill="transparent" stroke="#A3E8FE" />';
    var wrapper6Arc = '<path stroke-dasharray="2,2" d="' + pathLine6 + '" fill="transparent" stroke="#A3E8FE" />';
    var wrapper7Arc = '<path stroke-dasharray="2,2" d="' + pathLine7 + '" fill="transparent" stroke="#A3E8FE" />';
    var wrapper8Arc = '<path stroke-dasharray="2,2" d="' + pathLine8 + '" fill="transparent" stroke="#A3E8FE" />';

    $('.svg-data').html(
        wrapper1Arc + wrapper2Arc + wrapper3Arc + wrapper4Arc + wrapper5Arc + wrapper6Arc + wrapper7Arc + wrapper8Arc
    );
}