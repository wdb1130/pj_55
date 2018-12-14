var modalTitle;
var chartTypeState;

// 模态框获取的
var postModalData;

// 所有图表请求后暂存
var storageData = {
    drawLine: [],
    draw3DCylinderH1: [],
    draw3DCylinderH2: [],
    drawPartRing: [[], []],
    drawLiquidFill: [],
    drawWaterBall: []
}

var colorLine = ['#FF3838', '#FD953A', '#45CE8D', '#2420FF'];
var color3DCylinder1 = [
    ['#4ED6AD', '#5DDBF8'],
    ['#2324FF', '#05B8FF'],
    ['#D9162E', '#FE7421']
];
var color3DCylinder2 = [
    ['#2324FF', '#05B8FF'],
    ['#D9162E', '#FE7421']
];
var colorPartRingList = ['#13D799', '#F45925'];
var colorLiquidFillList1 = ['rgba(144,0,255,0.3)', 'rgba(144,0,255, 0.1)'];
var colorLiquidFillList2 = new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [{
    offset: 0,
    color: 'rgba(28,141,239,0)' // 0% 处的颜色
},
{
    offset: 0.6,
    color: 'rgba(28,141,239,0.4)' // 0% 处的颜色
}, {
    offset: 1,
    color: 'rgba(28,141,239,1)' // 100% 处的颜色
}
], false);

$(function () {
    drawSvgDash();
    $(window).resize(function () {
        drawSvgDash();
    });

    setTimeout(function () {
        // chart3
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/3dH_3.json" + getRandomNum(),
            success: function (res) {
                if (res.resultCode == 200) {
                    storageData.draw3DCylinderH1.push(res.result.seriesData);
                    storageData.draw3DCylinderH1.push(color3DCylinder1);
                    initChartFun.draw3DCylinderH('chart3', storageData.draw3DCylinderH1);
                };
            }
        });

        // chart4
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/3dH_2.json" + getRandomNum(),
            success: function (res) {
                if (res.resultCode == 200) {
                    storageData.draw3DCylinderH2.push(res.result.seriesData);
                    storageData.draw3DCylinderH2.push(color3DCylinder2);
                    initChartFun.draw3DCylinderH('chart4', storageData.draw3DCylinderH2);
                };
            }
        });

        // chart1
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/line_4.json" + getRandomNum(),
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
            url: "../test-json/oneFanPie_1.json" + getRandomNum(),
            success: function (res) {
                if (res.resultCode == 200) {
                    // var legendData = [];
                    // var seriesData = [];
                    // res.result.seriesData.forEach(function (item) {
                    //     legendData.push(item.name);
                    //     seriesData.push(item.value);
                    // });
                    // storageData.drawLiquidFill.push(legendData);
                    // storageData.drawLiquidFill.push(seriesData);
                    // storageData.drawLiquidFill.push(colorLiquidFillList1);
                    // storageData.drawLiquidFill.push(colorLiquidFillList2);
                    // initChartFun.drawLiquidFill('chart2', storageData.drawLiquidFill);
                    var legend = '';
                    var value = '';
                    res.result.seriesData.forEach(function (item) {
                        legend = item.name
                        value = item.value;
                    });
                    storageData.drawWaterBall.push(value);
                    storageData.drawWaterBall.push(legend);
                    initChartFun.drawWaterBall('chart2', storageData.drawWaterBall);
                };
            }
        });

        // chart5,6
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/networkDataRing_2.json" + getRandomNum(),
            success: function (res) {
                if (res.resultCode == 200) {
                    var resizeChart = [];
                    var xAxisDataArr = [[], []];
                    var seriesDataArr = [[], []];
                    res.result.seriesData.forEach(function (item, idx) {
                        var domId = 'chart' + (idx + 5);
                        xAxisDataArr[idx].push(item.title);
                        seriesDataArr[idx].push(
                            {
                                value: item.value,
                                name: ''
                            }, {
                                value: 100 - item.value,
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
                        html += '<div class="swiper-slide swiper-slide-detail" data-swiper-autoplay="1000">'
                            + "<span>" + item.name + "</span>"
                            + "<span>" + item.value + "%</span>"
                            + "<span>" + item.date + "</span>"
                            + "</div>";
                    });
                    var height1 = $('.swiper-container1').height();
                    $('.swiper-container1').height(height1);
                    $('.swiper-container1>.swiper-wrapper').html(html);
                    var mySwiper1 = new Swiper('.swiper-container1', {
                        direction: 'vertical',
                        slidesPerView: 4,
                        loop: true,
                        autoplay: {
                            disableOnInteraction: false,
                            delay: 2000,
                        },
                        speed: 1000,
                    });
                };
            }
        });

        // list2
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/device_table_list_3.json" + getRandomNum(),
            success: function (res) {
                if (res.resultCode == 200) {
                    var html = "";
                    res.result.forEach(function (item) {
                        html += '<div class="swiper-slide swiper-slide-detail" data-swiper-autoplay="1000">'
                            + "<span>" + item.name + "</span>"
                            + "<span>" + item.value + "%</span>"
                            + "<span>" + item.date + "</span>"
                            + "</div>";
                    });
                    var height2 = $('.swiper-container2').height();
                    $('.swiper-container2').height(height2);
                    $('.swiper-container2>.swiper-wrapper').html(html);
                    var mySwiper1 = new Swiper('.swiper-container2', {
                        direction: 'vertical',
                        slidesPerView: 4,
                        loop: true,
                        autoplay: {
                            disableOnInteraction: false,
                            delay: 2000,
                        },
                        speed: 1000,
                    });
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

function drawSvgDash() {
    $('.svg-data').html("");
    var tag1Left = $('.tag1').offset().left;
    var tag1Top = $('.tag1').offset().top;
    var tag1Width = $('.tag1').width();
    var tag1Hight = $('.tag1').height();
    // 起点
    var cx1 = Math.floor(tag1Left + tag1Width / 4);
    var cy1 = Math.floor(tag1Top + tag1Hight / 2);
    // 终点
    var boxSvg1Top = $('.box-svg1').offset().top;
    var boxSvg1Left = $('.box-svg1').offset().left;
    var boxSvg1Height = $('.box-svg1').height();
    var cyy1 = Math.floor(boxSvg1Top + boxSvg1Height) - 5;
    var pathLine1 = "M" + cx1 + " " + cy1 + " L" + cx1 + " " + cyy1;
    // 起点
    var tag2Left = $('.tag2').offset().left;
    var tag2Top = $('.tag2').offset().top;
    var tag2Width = $('.tag2').width();
    var tag2Hight = $('.tag2').height();
    var cx2 = Math.floor(tag2Left + tag2Width / 4);
    var cy2 = Math.floor(tag2Top + tag2Hight / 2);
    // 终点
    var boxSvg2Top = $('.box-svg2').offset().top;
    var boxSvg2Left = $('.box-svg2').offset().left;
    var boxSvg2Width = $('.box-svg2').width();
    var boxSvg2Height = $('.box-svg2').height();
    var line2X = Math.floor((tag2Left - (boxSvg2Left + boxSvg2Width)) / 2 + (boxSvg2Left + boxSvg2Width));
    var line2Y = Math.floor(boxSvg2Top + boxSvg2Height / 2);
    var line2XX = Math.floor(boxSvg2Left + boxSvg2Width) - 5;
    var pathLine2 = "M" + cx2 + " " + cy2 + " L" + line2X + " " + line2Y + " L" + line2XX + " " + line2Y;
    // 终点
    var boxSvg3Top = $('.box-svg3').offset().top;
    var line3X = Math.floor(boxSvg3Top) + 15;
    var pathLine3 = "M" + cx2 + " " + cy2 + " L" + line2X + " " + cy2 + " L" + line2X + " " + line3X;
    // 起点
    var tag3Left = $('.tag3').offset().left;
    var tag3Top = $('.tag3').offset().top;
    var tag3Width = $('.tag3').width();
    var tag3Hight = $('.tag3').height();
    var cx3 = Math.floor(tag3Left + tag3Width * (3 / 4));
    var cy3 = Math.floor(tag3Top + tag3Hight / 2);
    // 终点
    var boxSvg4Top = $('.box-svg4').offset().top;
    var boxSvg4Height = $('.box-svg4').height();
    var line4X = Math.floor(boxSvg4Height + boxSvg4Top) - 5;
    var pathLine4 = "M" + cx3 + " " + cy3 + " L" + cx3 + " " + line4X;
    // 起点
    var tag4Left = $('.tag4').offset().left;
    var tag4Top = $('.tag4').offset().top;
    var tag4Width = $('.tag4').width();
    var tag4Hight = $('.tag4').height();
    var cx4 = Math.floor(tag4Left + tag4Width * (3 / 4));
    var cy4 = Math.floor(tag4Top + tag4Hight / 2);
    // 终点
    var boxSvg5Top = $('.box-svg5').offset().top;
    var boxSvg5Left = $('.box-svg5').offset().left;
    var boxSvg5Width = $('.box-svg5').width();
    var boxSvg5Height = $('.box-svg5').height();
    var line5X = Math.floor((boxSvg5Left - (tag4Left + tag4Width)) / 2 + (tag4Left + tag4Width));
    var line5Y = Math.floor(boxSvg5Top + boxSvg5Height / 2);
    var line5XX = Math.floor(boxSvg5Left) + 5;
    var pathLine5 = "M" + cx4 + " " + cy4 + " L" + line5X + " " + line5Y + " L" + line5XX + " " + line5Y;
    // 终点
    var boxSvg6Left = $('.box-svg6').offset().left;
    var line6X = Math.floor(boxSvg6Left) + 5;
    var pathLine6 = "M" + cx4 + " " + cy4 + " L" + line6X + " " + cy4;
    // 起点
    var cx5 = Math.floor(tag4Left + tag4Width / 2);
    var cy5 = Math.floor(tag4Top + tag4Hight * (5 / 6));
    var boxSvg7Top = $('.box-svg7').offset().top;
    var line7Y = Math.floor(boxSvg7Top) + 15;
    var pathLine7 = "M" + cx5 + " " + cy5 + " L" + line5X + " " + cy5 + " L" + line5X + " " + line7Y;

    var wrapper1Arc = '<path stroke-dasharray="2,2" d="' + pathLine1 + '" fill="transparent" stroke="#A3E8FE" />';
    var wrapper2Arc = '<path stroke-dasharray="2,2" d="' + pathLine2 + '" fill="transparent" stroke="#A3E8FE" />';
    var wrapper3Arc = '<path stroke-dasharray="2,2" d="' + pathLine3 + '" fill="transparent" stroke="#A3E8FE" />';
    var wrapper4Arc = '<path stroke-dasharray="2,2" d="' + pathLine4 + '" fill="transparent" stroke="#A3E8FE" />';
    var wrapper5Arc = '<path stroke-dasharray="2,2" d="' + pathLine5 + '" fill="transparent" stroke="#A3E8FE" />';
    var wrapper6Arc = '<path stroke-dasharray="2,2" d="' + pathLine6 + '" fill="transparent" stroke="#A3E8FE" />';
    var wrapper7Arc = '<path stroke-dasharray="2,2" d="' + pathLine7 + '" fill="transparent" stroke="#A3E8FE" />';

    $('.svg-data').html(
        wrapper1Arc + wrapper2Arc + wrapper3Arc + wrapper4Arc + wrapper5Arc + wrapper6Arc + wrapper7Arc
    );
}