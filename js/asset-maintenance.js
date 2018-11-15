var chartTypeState;

// 模态框获取的
var postModalData;

// 所有图表请求后暂存
var storageData = {
    drawHorizontalBar: [],
    drawVerticalBar: [],
    drawPartRing: [[], [], []],
    drawHollowRing: [[], []]
}

var colorBarList = ['#2420FF', '#45CE8D', '#FB943A', '#FF3838'];
var colorVerticalBarList = ['#FF3838', '#FB943A', '#2420FF'];
var colorPartRingList = ['#2420FF', '#45CE8D', '#FF3838'];
var colorHollowRingList = ['#FF3838', '#9000FF', '#2420FF', '#EC13FF', '#45CE8D', '#FB943A'];

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
        // chart1
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/maintenance_horizontalBar_4.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    var yAxisData = [];
                    var seriesData = [];
                    res.result.seriesData.forEach(function (item) {
                        yAxisData.push(item.title);
                        seriesData.push(item.value);
                    });
                    storageData.drawHorizontalBar.push(yAxisData, seriesData, colorBarList);
                    initChartFun.drawHorizontalBar('chart1', storageData.drawHorizontalBar);
                };
            }
        });

        // chart2,3,4
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/maintenanceOccupancyRate_3.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    var xAxisDataArr = [[], [], []];
                    var seriesDataArr = [[], [], []];
                    res.result.seriesData.forEach(function (item, idx) {
                        var domId = 'chart' + (idx + 2);
                        xAxisDataArr[idx].push(item.title);
                        seriesDataArr[idx].push(
                            {
                                value: item.rate,
                                name: ''
                            }, {
                                value: 100 - item.rate,
                                name: ''
                            }
                        );
                        storageData.drawPartRing[idx].push(xAxisDataArr[idx], seriesDataArr[idx], colorPartRingList[idx]);
                        initChartFun.drawPartRing(domId, storageData.drawPartRing[idx]);
                    });
                };
            }
        });

        // chart5,6
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/maintenance_hollow_6.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    res.result.seriesData.forEach(function (item, idx) {
                        var domId = 'chart' + (idx + 5);
                        storageData.drawHollowRing[idx].push(res.result.legendData[idx]);
                        storageData.drawHollowRing[idx].push(item);
                        storageData.drawHollowRing[idx].push(colorHollowRingList);
                        initChartFun.drawHollowRing(domId, storageData.drawHollowRing[idx]);
                    });
                };
            }
        });

        // chart7
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/maintenance_verticalBar_3.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    var xAxisData = [];
                    var sitemArr = [[], [], []];
                    var seriesData = [];
                    res.result.seriesData.forEach(function (item) {
                        xAxisData.push(item[0]['title']);
                        sitemArr[0].push(item[0]['high']);
                        sitemArr[1].push(item[0]['middle']);
                        sitemArr[2].push(item[0]['low']);
                    });
                    res.result.legendData.forEach(function (item, idx) {
                        seriesData.push({
                            name: item,
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color: colorVerticalBarList[idx],
                                    label: {
                                        show: true,
                                        position: 'top',
                                        textStyle: {
                                            color: '#ccc',
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
                    initChartFun.drawVerticalBar('chart7', storageData.drawVerticalBar);
                };
            }
        });

    }, 1000);
});