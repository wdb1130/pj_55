var modalTitle;
var chartTypeState;

// 模态框获取的
var postModalData;

// 所有图表请求后暂存
var storageData = {
    drawVerticalBarH: [],
    drawLine: [],
    drawRing: []
}

var colorBarList = ['#FF3838', '#45CE8D', '#2420FF'];
var colorLine = ['#FF3838', '#FD953A', '#45CE8D', '#2420FF'];
var colorRingList = ['#0DC3FF', '#E9D356', '#F65C3E'];
var radiusArr = [
    ['55%', '60%'],
    ['40%', '45%'],
    ['25%', '30%']
];
var centerArr = [
    ['60%', '50%'],
    ['60%', '50%'],
    ['60%', '50%']
];

$(function () {
    $(".service-event").niceScroll({
        cursorcolor: "#0E3FB9",
        cursorwidth: "8px",
        background: "#03062A",
        cursorborder: "1px solid #0E3FB9",
        cursorborderradius: 0
    });
    $(".collect-event").niceScroll({
        cursorcolor: "#0E3FB9",
        cursorwidth: "8px",
        background: "#03062A",
        cursorborder: "1px solid #0E3FB9",
        cursorborderradius: 0
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
            url: "../test-json/muma_verticalBar_3.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    var xAxisData = [];
                    var sitemArr = [[], [], []];
                    var seriesData = [];
                    res.result.seriesData.forEach(function (item) {
                        xAxisData.push(item[0]['date']);
                        sitemArr[0].push(item[0]['attackNum']);
                        sitemArr[1].push(item[0]['rate']);
                        sitemArr[2].push(item[0]['proportion']);
                    });
                    res.result.legendData.forEach(function (item, idx) {
                        seriesData.push({
                            name: item,
                            type: 'bar',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: '#95D9F8'
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: colorBarList[idx]
                                }
                            },
                            barWidth: 12,
                            data: sitemArr[idx]
                        })
                    });
                    storageData.drawVerticalBarH.push(res.result.legendData);
                    storageData.drawVerticalBarH.push(xAxisData);
                    storageData.drawVerticalBarH.push(seriesData);
                    initChartFun.drawVerticalBarH('chart1', storageData.drawVerticalBarH);
                };
            }
        });

        // chart2
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/muma_line_4.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    var xAxisData = [];
                    var sitemArr = [[], [], [], []];
                    var seriesData = []
                    res.result.seriesData.forEach(function (item, idx) {
                        xAxisData.push(item.date);
                        sitemArr[0].push(item.globalSituation);
                        sitemArr[1].push(item.risk);
                        sitemArr[2].push(item.defense);
                        sitemArr[3].push(item.opera);
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
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: '#95D9F8'
                                    }
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
                    initChartFun.drawLine('chart2', storageData.drawLine);
                };
            }
        });

        // chart3
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/ring_3.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    var legendData = [];
                    var seriesData = [];
                    res.result.seriesData.forEach(function (item, idx) {
                        legendData.push(item.title);
                        seriesData.push({
                            name: 'Line' + idx,
                            type: 'pie',
                            clockWise: true,
                            radius: radiusArr[idx],
                            center: centerArr[idx],
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        formatter: "{d}%",
                                        textStyle: {
                                            color: '#95D9F8'
                                        }
                                    },
                                    labelLine: {
                                        show: true
                                    }
                                }
                            },
                            hoverAnimation: true,
                            startAngle: 90,
                            label: {
                                borderRadius: '10',
                            },
                            data: [{
                                value: item.value,
                                name: item.title,
                                itemStyle: {
                                    normal: {
                                        color: colorRingList[idx]
                                    }
                                }
                            },
                            {
                                value: 100 - item.value,
                                name: '',
                                tooltip: {
                                    show: false
                                },
                                itemStyle: {
                                    normal: {
                                        color: 'rgba(101,60,255,.3)',
                                        label: {
                                            show: false
                                        },
                                        labelLine: {
                                            show: false
                                        }
                                    },
                                    emphasis: {
                                        color: 'rgba(101,60,255,.3)'
                                    }
                                }
                            }]
                        });
                    });
                    console.log(JSON.stringify(seriesData))
                    storageData.drawRing.push(legendData);
                    storageData.drawRing.push(seriesData);
                    initChartFun.drawRing('chart3', storageData.drawRing);
                };
            }
        });

        // list3
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/device_table_list_3.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    var html = "";
                    res.result.forEach(function (item) {
                        html += "<div>"
                            + "<span>" + item.name + "</span>"
                            + "<span>" + item.value + "%</span>"
                            + "<span>" + item.date + "</span>"
                            + "</div>";
                    });
                    $('.service-event').html(html);
                };
            }
        });

        // list4
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/device_table_list_3.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    var html = "";
                    res.result.forEach(function (item) {
                        html += "<div>"
                            + "<span>" + item.name + "</span>"
                            + "<span>" + item.value + "%</span>"
                            + "<span>" + item.date + "</span>"
                            + "</div>";
                    });
                    $('.collect-event').html(html);
                };
            }
        });

    }, 1000);

});