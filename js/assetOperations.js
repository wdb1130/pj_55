var modalTitle;
var chartTypeState;

// 模态框获取的
var postModalData;

// 所有图表请求后暂存
var storageData = {
    draw3DCylinderH: [],
    drawVerticalBar: [],
    drawPartRing: [[], [], []],
    drawHollowRing: [[], []]
}

var color3DCylinder = [
    ['#251EFF', '#04BBFF'],
    ['#10B857', '#68EDC6'],
    ['#FE7421', '#FACF65'],
    ['#D8152E', '#FF7521']
];
var colorVerticalBarList = ['#FF3838', '#FD953A', '#2420FF'];
var colorPartRingList = ['#135BFF', '#13D799', '#F45925'];
var colorHollowRingList = ['#FF3838', '#9000FF', '#2420FF', '#EC13FF', '#40CF77', '#DF9B4C'];

$(function () {
    setTimeout(function () {
        // chart1
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/maintenance_horizontalBar_4.json" + getRandomNum(),
            success: function (res) {
                if (res.resultCode == 200) {
                    storageData.draw3DCylinderH.push(res.result.seriesData);
                    storageData.draw3DCylinderH.push(color3DCylinder);
                    initChartFun.draw3DCylinderH('chart1', storageData.draw3DCylinderH);
                };
            }
        });

        // chart2,3,4
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/maintenanceOccupancyRate_3.json" + getRandomNum(),
            success: function (res) {
                if (res.resultCode == 200) {
                    var resizeChart = [];
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
                        var myChart = initChartFun.drawPartRing(domId, storageData.drawPartRing[idx]);
                        resizeChart.push(myChart);
                        window.addEventListener("resize", function () {
                            for (var i = 0; i < resizeChart.length; i++) {
                                resizeChart[i].resize();
                            }
                        });
                    });
                };
            }
        });

        // chart5,6
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/maintenance_hollow_6.json" + getRandomNum(),
            success: function (res) {
                if (res.resultCode == 200) {
                    var legendData = [];
                    res.result.legendData.forEach(function (item) {
                        var len = item.length / 2;
                        legendData.push(item.slice(0, len) + '\n\n' + item.slice(len, item.length));
                    });
                    res.result.seriesData.forEach(function (item, idx) {
                        var domId = 'chart' + (idx + 5);
                        storageData.drawHollowRing[idx].push(legendData[idx]);
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
            url: "../test-json/maintenance_verticalBar_3.json" + getRandomNum(),
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
                                            color: '#95D9F8'
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

    // initModal
    $('[data-method="setTop"]').click(function () {
        modalTitle = $(this).text();
        chartTypeState = $(this).attr('data-chartType');
        postModalData = storageData[chartTypeState];
        initModal(modalTitle, chartTypeState, postModalData);
    });
});