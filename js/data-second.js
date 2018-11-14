var chartTypeState;

// 模态框获取的
var postModalData;

// 所有图表请求后暂存
var storageData = {
    drawLine: [],
    drawHorizontalBar: [],
    drawVerticalBar: []
}

var colorLine = ['#FF3838', '#8124FF', '#45CE8D'];
var colorList = [
    new echarts.graphic.LinearGradient(1, 1, 0, 0, [{
        offset: 0,
        color: 'rgba(13, 151, 246, 0.2)'
    }, {
        offset: 1,
        color: 'rgba(13, 151, 246, 1)'
    }]),
    new echarts.graphic.LinearGradient(1, 1, 0, 0, [{
        offset: 0,
        color: 'rgba(63, 5, 246, 0.2)'
    }, {
        offset: 1,
        color: 'rgba(63, 5, 246, 1)'
    }]),
    new echarts.graphic.LinearGradient(1, 1, 0, 0, [{
        offset: 0,
        color: 'rgba(63, 151, 7, 0.2)'
    }, {
        offset: 1,
        color: 'rgba(63, 151, 7, 1)'
    }])
];
var colorBarList = ['#FF3838', '#45CE8D', '#8124FF'];
var colorRadarList = ['rgba(255, 255, 0, 0.5)'];


// 页面加载
$(function () {
    layui.use('form', function () {
        var form = layui.form;
        form.on('submit(compareDate)', function (data) {
            layer.msg(JSON.stringify(data.field));
            return false;
        });
        form.on('submit(compareType)', function (data) {
            layer.msg(JSON.stringify(data.field));
            return false;
        });
    });
    layui.use('laydate', function () {
        var laydate = layui.laydate;
        laydate.render({
            elem: '#pickDate1',
            theme: '#050732'
        });
        laydate.render({
            elem: '#pickDate2',
            theme: '#050732'
        });
    });
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
                                    color: colorLine[idx],
                                    borderWidth: 1

                                }
                            },
                            data: sitemArr[idx]
                        })
                    });
                    storageData.drawLine.push(res.result.legendData);
                    storageData.drawLine.push(xAxisData);
                    storageData.drawLine.push(seriesData);
                    initChartFun.drawLine('chart1', storageData.drawLine);
                };
            }
        });

        // chart2
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/horizontalBar_3.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    var yAxisData = [];
                    var seriesData = [];
                    res.result.seriesData.forEach(function (item) {
                        yAxisData.push(item.title);
                        seriesData.push(item.value);
                    });
                    storageData.drawHorizontalBar.push(yAxisData, seriesData, colorList);
                    initChartFun.drawHorizontalBar('chart2', storageData.drawHorizontalBar);
                };
            }
        });

        // chart3
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/verticalBar_3.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    var xAxisData = [];
                    var sitemArr = [[], [], []];
                    var seriesData = [];
                    res.result.seriesData.forEach(function (item) {
                        xAxisData.push(item[0]['date']);
                        sitemArr[0].push(item[0]['globalSituation']);
                        sitemArr[1].push(item[0]['usability']);
                        sitemArr[2].push(item[0]['stability']);
                    });
                    res.result.legendData.forEach(function (item, idx) {
                        seriesData.push({
                            name: item,
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color: colorBarList[idx],
                                    label: {
                                        show: true,
                                        position: 'top',
                                        textStyle: {
                                            color: '#fff',
                                            fontSize: 16
                                        }
                                    }
                                }
                            },
                            barWidth: 20,
                            data: sitemArr[idx]
                        })
                    });
                    storageData.drawVerticalBar.push(res.result.legendData);
                    storageData.drawVerticalBar.push(xAxisData);
                    storageData.drawVerticalBar.push(seriesData);
                    initChartFun.drawVerticalBar('chart3', storageData.drawVerticalBar);
                };
            }
        });












    }, 1000)


    drawChart5();
});

// chart5
function drawChart5() {
    var dom5 = document.getElementById("chart5");
    var myChart5 = echarts.init(dom5);
    option = null;
    option = {
        radar: [{
            indicator: [{
                text: '参数一',
                max: 100
            }, {
                text: '参数二',
                max: 100
            }, {
                text: '参数三',
                max: 100
            }, {
                text: '参数四',
                max: 100
            }],
            radius: '65%',
            center: ['50%', '50%'],
            startAngle: 90,
            splitNumber: 4,
            shape: 'circle',
            name: {
                formatter: '{value}',
                textStyle: {
                    color: '#fff'
                }
            },
            splitArea: {
                areaStyle: {
                    color: [],
                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                    shadowBlur: 10
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#1254ED'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#1254ED'
                }
            }
        }],
        series: [{
            name: '雷达图',
            type: 'radar',
            itemStyle: {
                emphasis: {
                    lineStyle: {
                        width: 4
                    }
                }
            },
            data: [{
                value: [40, 20, 60, 55],
                name: '长沙',
                symbol: 'rect',
                symbolSize: 0,
                areaStyle: {
                    normal: {
                        color: 'rgba(255, 255, 0, 0.5)'
                    }
                },
                lineStyle: {
                    normal: {
                        type: 'solid',
                        width: 0
                    }
                }
            }]
        }]
    }
    if (option && typeof option === "object") {
        myChart5.setOption(option, true);
        window.onresize = myChart5.resize;
    }
}