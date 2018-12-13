var modalTitle;
var chartTypeState;

// 模态框获取的
var postModalData;

// 所有图表请求后暂存
var storageData = {
    drawLine: [],
    draw3DCylinderV: [],
    drawVerticalBar: [],
    drawRectRadar1: [],
    drawRectRadar2: []
}

var colorLine = ['#FF3838', '#FD953A', '#45CE8D', '#2420FF'];
var color3DCylinder = [
    ['#FF732E', '#FF3838'],
    ['#FFD062', '#FA8015'],
    ['#68EDC6', '#10B857'],
    ['#06B8EB', '#2420FF']
];
var colorBarList = ['#FF3838', '#FD953A', '#45CE8D', '#2420FF'];
var colorRadarList1 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(255,76,35,.8)' }, { offset: 1, color: 'rgba(255,211,133,.8)' }]);
var colorRadarList2 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(35,226,165,.8)' }, { offset: 1, color: 'rgba(58,216,255,.8)' }]);
var percentColor = "#E7672F";

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
            url: "../test-json/3dH_4.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    storageData.draw3DCylinderV.push(res.result.seriesData);
                    storageData.draw3DCylinderV.push(color3DCylinder);
                    initChartFun.draw3DCylinderV('chart2', storageData.draw3DCylinderV);
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
                                            color: '#95D9F8',
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
                    res.result.seriesData.forEach(function (item, idx) {
                        indicator.push({
                            text: idx == 2 ? item.title + '\n' + item.value + '%' : item.value + '%\n' + item.title + '&',
                            max: 100
                        });
                        seriesData.push(item.value)
                    });
                    storageData.drawRectRadar1.push(indicator);
                    storageData.drawRectRadar1.push(seriesData);
                    storageData.drawRectRadar1.push(colorRadarList1);
                    storageData.drawRectRadar1.push(percentColor);
                    initChartFun.drawRectRadar('chart4', storageData.drawRectRadar1);
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
                    res.result.seriesData.forEach(function (item, idx) {
                        indicator.push({
                            text: idx == 2 ? item.title + '\n' + item.value + '%' : item.value + '%\n' + item.title + '&',
                            max: 100
                        });
                        seriesData.push(item.value)
                    });
                    storageData.drawRectRadar2.push(indicator);
                    storageData.drawRectRadar2.push(seriesData);
                    storageData.drawRectRadar2.push(colorRadarList2);
                    storageData.drawRectRadar2.push(percentColor);
                    initChartFun.drawRectRadar('chart5', storageData.drawRectRadar2);
                };
            }
        });
    }, 1000);

    // initModal
    $('[data-method="setTop"]').click(function () {
        modalTitle = $(this).text();
        chartTypeState = $(this).attr('data-chartType');
        postModalData = storageData[chartTypeState];
        initModal(modalTitle, chartTypeState, postModalData);
    });
});