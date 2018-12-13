var modalTitle;
var chartTypeState;

// 模态框获取的
var postModalData;

// 所有图表请求后暂存
var storageData = {
    drawPlusLine: [],
    drawVerticalBarH: []
}

var colorLineList = ['#FF3838'];
var colorVerticalBarList = ['#45CE8D', '#5B1AFF'];

$(function () {
    $(".device-resources").niceScroll({
        cursorcolor: "#0E3FB9",
        cursorwidth: "8px",
        background: "#03062A",
        cursorborder: "1px solid #0E3FB9",
        cursorborderradius: 0
    });
    $(".device-state").niceScroll({
        cursorcolor: "#0E3FB9",
        cursorwidth: "8px",
        background: "#03062A",
        cursorborder: "1px solid #0E3FB9",
        cursorborderradius: 0
    });

    setTimeout(function () {
        // list1
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/device_table_list_3.json" + getRandomNum(),
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
                    $('.device-resources').html(html);
                };
            }
        });

        // chart2
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/line_1.json" + getRandomNum(),
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
                                    color: colorLineList[idx],
                                    borderWidth: 1
                                }
                            },
                            data: sitemArr[idx]
                        })
                    });
                    storageData.drawPlusLine.push(res.result.legendData);
                    storageData.drawPlusLine.push(xAxisData);
                    storageData.drawPlusLine.push(seriesData);
                    initChartFun.drawPlusLine('chart2', storageData.drawPlusLine);
                };
            }
        });

        // chart3
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/verticalBar_2.json" + getRandomNum(),
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
                    initChartFun.drawVerticalBarH('chart3', storageData.drawVerticalBarH);
                };
            }
        });

        // list4
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/device_table_list_4.json" + getRandomNum(),
            success: function (res) {
                if (res.resultCode == 200) {
                    var html = "";
                    res.result.forEach(function (item) {
                        html += "<div>"
                            + "<span>" + item.name + "</span>"
                            + "<span>" + item.value + "%</span>"
                            + "<span>" + (item.state ? '已修复' : '未修复') + "</span>"
                            + "<span>" + item.date + "</span>"
                            + "</div>";
                    });
                    $('.device-state').html(html);
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
