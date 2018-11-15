var chartTypeState;

// 模态框获取的
var postModalData;

// 所有图表请求后暂存
var storageData = {
    drawLine: [],
    drawVerticalBarH: []
}

var colorLineList = ['#FF3838'];
var colorVerticalBarList = ['#45CE8D', '#9000FF'];

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
        // chart2
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/line_1.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    var xAxisData = [];
                    var sitemArr = [[]];
                    var seriesData = []
                    res.result.seriesData.forEach(function (item, idx) {
                        xAxisData.push(item.date);
                        sitemArr[0].push(item.viruses);
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
                                    color: colorLineList[idx],
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
                    initChartFun.drawVerticalBarH('chart3', storageData.drawVerticalBarH);
                };
            }
        });


    }, 1000);

});
