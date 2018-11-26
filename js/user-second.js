var modalTitle;
var chartTypeState;

// 模态框获取的
var postModalData;

// 所有图表请求后暂存
var storageData = {
    drawLine: [],
    draw3DCylinder: [],
    drawRectRadar1: [],
    drawRectRadar2: [],
    drawArcRadar1: [],
    drawArcRadar2: []
}

var colorLine = ['#FF3838', '#FB943A', '#45CE8D', '#2420FF'];
var color3DCylinder = ['#FF3838', '#FB943A', '#45CE8D', '#2420FF'];
var colorRadarList1 = new echarts.graphic.LinearGradient(0, 0, 1, 0,[{offset: 0, color: '#FF3838'},{offset: 1, color: '#C5AC8E'}]);
var colorRadarList2 = new echarts.graphic.LinearGradient(0, 0, 1, 0,[{offset: 0, color: '#3AA8D6'},{offset: 1, color: '#1FB494'}]);


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
                            symbolSize: 4,
                            lineStyle: {
                                normal: {
                                    width: 1
                                }
                            },
                            label: {
                                normal: {
                                    show: false,
                                    position: 'top'
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
            url: "../test-json/arcRadar_4.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    res.result.seriesData.forEach(function (item, idx) {
                        item.color = color3DCylinder[idx];
                    });
                    storageData.draw3DCylinder.push(res.result.seriesData);
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
                    storageData.drawRectRadar1.push(indicator);
                    storageData.drawRectRadar1.push(seriesData);
                    storageData.drawRectRadar1.push(colorRadarList1);
                    initChartFun.drawRectRadar('chart3', storageData.drawRectRadar1);
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
                            text: item.title + ':' + item.value + '%',
                            max: 100
                        });
                        seriesData.push(item.value)
                    });
                    storageData.drawRectRadar2.push(indicator);
                    storageData.drawRectRadar2.push(seriesData);
                    storageData.drawRectRadar2.push(colorRadarList2);
                    initChartFun.drawRectRadar('chart4', storageData.drawRectRadar2);
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
                            text: item.title + ':' + item.value + '%',
                            max: 100
                        });
                        seriesData.push(item.value)
                    });
                    storageData.drawArcRadar1.push(indicator);
                    storageData.drawArcRadar1.push(seriesData);
                    storageData.drawArcRadar1.push(colorRadarList1);
                    initChartFun.drawArcRadar('chart5', storageData.drawArcRadar1);
                };
            }
        });

        // chart6
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
                    storageData.drawArcRadar2.push(indicator);
                    storageData.drawArcRadar2.push(seriesData);
                    storageData.drawArcRadar2.push(colorRadarList2);
                    initChartFun.drawArcRadar('chart6', storageData.drawArcRadar2);
                };
            }
        });

    }, 1000);
});