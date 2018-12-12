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

var colorLine = ['#FF3838', '#FD953A', '#45CE8D', '#2420FF'];
var color3DCylinder = [
    ['#D8152E', '#FF7521'],
    ['#FE7421', '#FACF65'],
    ['#199359', '#53EE65'],
    ['#085BC1', '#26E8FF']
];;
var colorRadarList1 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#FF4C23' }, { offset: 1, color: '#FFD385' }]);
var colorRadarList2 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#23E2A5' }, { offset: 1, color: '#3AD8FF' }]);


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
                    initChartFun.drawLine('chart1', storageData.drawLine);
                };
            }
        });

        // chart2
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/3d_arc1.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    storageData.draw3DCylinder.push(res.result.seriesData);
                    storageData.draw3DCylinder.push(color3DCylinder);
                    initChartFun.draw3DCylinder('chart22', storageData.draw3DCylinder);
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
                    res.result.seriesData.forEach(function (item, idx) {
                        indicator.push({
                            text: idx ? item.title + '\n' + item.value + '%' : item.value + '%\n' + item.title + '&',
                            max: 100
                        });
                        seriesData.push(item.value)
                    });
                    storageData.drawRectRadar1.push(indicator);
                    storageData.drawRectRadar1.push(seriesData);
                    storageData.drawRectRadar1.push(colorRadarList1);
                    // storageData.drawRectRadar1.push(percentColor);
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
                    res.result.seriesData.forEach(function (item, idx) {
                        indicator.push({
                            text: idx ? item.title + '\n' + item.value + '%' : item.value + '%\n' + item.title + '&',
                            max: 100
                        });
                        seriesData.push(item.value)
                    });
                    storageData.drawRectRadar2.push(indicator);
                    storageData.drawRectRadar2.push(seriesData);
                    storageData.drawRectRadar2.push(colorRadarList2);
                    // storageData.drawRectRadar2.push(percentColor);
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
                            text: item.title + '\n' + item.value + '%',
                            max: 100
                        });
                        seriesData.push(item.value)
                    });
                    storageData.drawArcRadar1.push(indicator);
                    storageData.drawArcRadar1.push(seriesData);
                    storageData.drawArcRadar1.push(colorRadarList1);
                    // storageData.drawArcRadar1.push(percentColor);
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
                    // storageData.drawArcRadar2.push(percentColor);
                    initChartFun.drawArcRadar('chart6', storageData.drawArcRadar2);
                };
            }
        });

    }, 1000);
});