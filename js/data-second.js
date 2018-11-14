var chartTypeState;

// 模态框获取的
var postModalData;

// 所有图表请求后暂存
var storageData = {
    drawLine: [],
    drawHorizontalBar: [],
    drawVerticalBar: [],
    drawArcRadar1: [],
    drawArcRadar2: [],
}

var colorLine = ['#FF3838', '#FB943A', '#45CE8D', '#2420FF'];
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
    }]),
    new echarts.graphic.LinearGradient(1, 1, 0, 0, [{
        offset: 0,
        color: 'rgba(255, 255, 0, 0.2)'
    }, {
        offset: 1,
        color: 'rgba(255, 255, 0, 1)'
    }])
];
var colorBarList = ['#FF3838', '#FB943A', '#45CE8D', '#2420FF'];
var colorRadarList1 = ['rgba(205, 106, 75, 0.5)'];
var colorRadarList2 = ['rgba(35, 180, 170, 0.5)'];

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
            url: "../test-json/line_4.json",
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
            url: "../test-json/horizontalBar_4.json",
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
            url: "../test-json/verticalBar_4.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    var xAxisData = [];
                    var sitemArr = [[], [], [], []];
                    var seriesData = [];
                    res.result.seriesData.forEach(function (item) {
                        xAxisData.push(item[0]['date']);
                        sitemArr[0].push(item[0]['globalSituation']);
                        sitemArr[1].push(item[0]['risk']);
                        sitemArr[2].push(item[0]['defense']);
                        sitemArr[3].push(item[0]['opera']);
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
                    initChartFun.drawVerticalBar('chart3', storageData.drawVerticalBar);
                };
            }
        });

        // chart4
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
                            text: item.title+ ':' +item.value+ '%',
                            max: 100
                        });
                        seriesData.push(item.value)
                    });
                    storageData.drawArcRadar1.push(indicator);
                    storageData.drawArcRadar1.push(seriesData);
                    storageData.drawArcRadar1.push(colorRadarList1);
                    initChartFun.drawArcRadar('chart4', storageData.drawArcRadar1);
                };
            }
        });

        // chart5
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
                            text: item.title+ ':' +item.value+ '%',
                            max: 100
                        });
                        seriesData.push(item.value)
                    });
                    storageData.drawArcRadar2.push(indicator);
                    storageData.drawArcRadar2.push(seriesData);
                    storageData.drawArcRadar2.push(colorRadarList2);
                    initChartFun.drawArcRadar('chart5', storageData.drawArcRadar2);
                };
            }
        });
    }, 1000)
});