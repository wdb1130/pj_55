var modalTitle;
var chartTypeState;

// 模态框获取的
var postModalData;

// 所有图表请求后暂存
var storageData = {
    drawLine: [],
    drawWaterBall1: [],
    drawWaterBall2: [],
    drawLiquidFill1: [],
    drawLiquidFill2: [],
    draw3DCylinderH: [],
    drawPartRing: [[], []]
}

var colorLine = ['#FF3838', '#FD953A', '#45CE8D', '#2420FF'];
var colorLiquidFillList1 = ['rgba(144,0,255,0.3)', 'rgba(144,0,255, 0.1)'];
var colorLiquidFillList2 = new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [{
    offset: 0,
    color: 'rgba(28,141,239,0)'
},
{
    offset: 0.6,
    color: 'rgba(28,141,239,0.4)'
}, {
    offset: 1,
    color: 'rgba(28,141,239,1)'
}
], false);
var color3DCylinder = [
    ['#2324FF', '#05B8FF'],
    ['#D9162E', '#FE7421']
];
var colorPartRingList = ['#45CE8D', '#FF3838'];

$(function () {
    drawSvgDash();
    $(window).resize(function () {
        drawSvgDash();
    });

    setTimeout(function () {
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
                    initChartFun.drawLine('chart-1', storageData.drawLine);
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
                    var legendData = [];
                    var seriesData = [];
                    res.result.seriesData.forEach(function (item) {
                        legendData.push(item.name);
                        seriesData.push(item.value);
                    });
                    storageData.drawLiquidFill1.push(legendData);
                    storageData.drawLiquidFill1.push(seriesData);
                    storageData.drawLiquidFill1.push(colorLiquidFillList1);
                    storageData.drawLiquidFill1.push(colorLiquidFillList2);
                    initChartFun.drawLiquidFill('chart-2', storageData.drawLiquidFill1);
                    // var legend = '';
                    // var value = '';
                    // res.result.seriesData.forEach(function (item) {
                    //     legend = item.name
                    //     value = item.value ;
                    // });
                    // storageData.drawWaterBall1.push(value);
                    // storageData.drawWaterBall1.push(legend);
                    // initChartFun.drawWaterBall('chart-2',value,legend);
                };
            }
        });

        // chart3
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/oneFanPie_1.json" + getRandomNum(),
            success: function (res) {
                if (res.resultCode == 200) {
                    var legendData = [];
                    var seriesData = [];
                    res.result.seriesData.forEach(function (item) {
                        legendData.push(item.name);
                        seriesData.push(item.value);
                    });
                    storageData.drawLiquidFill2.push(legendData);
                    storageData.drawLiquidFill2.push(seriesData);
                    storageData.drawLiquidFill2.push(colorLiquidFillList1);
                    storageData.drawLiquidFill2.push(colorLiquidFillList2);
                    initChartFun.drawLiquidFill('chart-3', storageData.drawLiquidFill2);
                    // var legend = '';
                    // var value = '';
                    // res.result.seriesData.forEach(function (item) {
                    //     legend = item.name
                    //     value = item.value ;
                    // });
                    // storageData.drawWaterBall2.push(value);
                    // storageData.drawWaterBall2.push(legend);
                    // initChartFun.drawWaterBall('chart-3',value,legend);
                };
            }
        });

        // list4
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

        // list5
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
                    $('.swiper-container2').height(height2 - 5);
                    $('.swiper-container2>.swiper-wrapper').html(html);
                    var mySwiper2 = new Swiper('.swiper-container2', {
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

        // chart4
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/3dH_2.json" + getRandomNum(),
            success: function (res) {
                if (res.resultCode == 200) {
                    storageData.draw3DCylinderH.push(res.result.seriesData);
                    storageData.draw3DCylinderH.push(color3DCylinder);
                    initChartFun.draw3DCylinderH('chart-4', storageData.draw3DCylinderH);
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
                        var domId = 'chart-' + (idx + 5);
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
    var wrapper1Left = $('.wrapper1').offset().left;
    var wrapper1Top = $('.wrapper1').offset().top;
    var wrapper1Width = $('.wrapper1').width();
    var wrapper1Hight = $('.wrapper1').height();
    var cx1 = Math.floor(wrapper1Left + wrapper1Width / 2);
    var cy1 = Math.floor(wrapper1Top + wrapper1Hight / 2);
    var box1Width = $('.chart-box1').width();
    var box1Left = Math.floor($('.chart-box1').offset().left) + 5;
    var pathLine1 = "M" + cx1 + " " + cy1 + " L" + box1Left + " " + cy1;
    var wrapper2Left = $('.wrapper2').offset().left;
    var wrapper2Top = $('.wrapper2').offset().top;
    var wrapper2Width = $('.wrapper2').width();
    var wrapper2Hight = $('.wrapper2').height();
    var box2Left = $('.chart-box2').offset().left;
    var box2Top = $('.chart-box2').offset().top;
    var box2Width = $('.chart-box2').width();
    var box2Hight = $('.chart-box2').height();
    var box3Left = $('.chart-box3').offset().left;
    var box3Top = $('.chart-box3').offset().top;
    var box3Width = $('.chart-box3').width();
    var box3Hight = $('.chart-box3').height();
    // 起点
    var cx2 = Math.floor(wrapper2Left + wrapper2Width / 2);
    var box5Top = $('.chart-box5').offset().top;
    var box5Height = $('.chart-box5').height();
    var cy2 = Math.floor((box5Top - (box2Top + box2Hight)) / 2 + (box2Top + box2Hight));
    // 终点
    var lastX = Math.floor(((box3Left - (box2Width + box2Left)) / 2) + box2Left + box2Width);
    var lastY = cy2;
    var lineTo1 = Math.floor(box3Width / 2 + box3Top);
    var lineTo2 = Math.floor((box3Left - (box2Width + box2Left)) / 2) + lastX + 5;
    var pathLine2 = "M" + cx2 + " " + cy2 + " L" + lastX + " " + lastY + " L" + lastX + " " + lineTo1 + " L" + lineTo2 + " " + lineTo1;
    // 起点
    otherLineX = Math.floor((box2Left - box1Left - box1Width) / 2 + box1Left + box1Width);
    otherLinex2 = Math.floor(box2Left + 5);
    var pathLine3 = "M" + otherLineX + " " + cy2 + " L" + otherLineX + " " + lineTo1 + " L" + otherLinex2 + " " + lineTo1;
    // 终点
    // 起点
    var wrapper3Left = $('.wrapper3').offset().left;
    var wrapper3Top = $('.wrapper3').offset().top;
    var wrapper3Width = $('.wrapper3').width();
    var wrapper3Hight = $('.wrapper3').height();
    var cx3 = Math.floor(wrapper3Left + wrapper3Width / 2);
    var cy3 = Math.floor(wrapper3Top + wrapper3Hight / 2);
    var box4Top = $('.chart-box4').offset().top;
    var box4Left = $('.chart-box4').offset().left;
    var box4Width = $('.chart-box4').width();
    var box4Height = $('.chart-box4').height();
    // 终点
    var zheLineX = Math.floor(((box4Left - (wrapper3Left + wrapper3Width)) / 2) + (wrapper3Left + wrapper3Width));
    var zheLineY = Math.floor(box4Top + box4Height / 2);
    var zheLineXX = Math.floor(box4Left) + 5;
    var pathLine4 = "M" + cx3 + " " + cy3 + " L" + zheLineX + " " + zheLineY + " L" + zheLineXX + " " + zheLineY;

    // 起点
    var wrapper4Left = $('.wrapper4').offset().left;
    var wrapper4Top = $('.wrapper4').offset().top;
    var wrapper4Width = $('.wrapper4').width();
    var wrapper4Hight = $('.wrapper4').height();
    var cx4 = Math.floor(wrapper4Left + wrapper4Width / 2);
    var cy4 = Math.floor(wrapper4Top + wrapper4Hight / 2);
    // 终点
    var box6Top = $('.chart-box6').offset().top;
    var box6Left = $('.chart-box6').offset().left;
    var box6Width = $('.chart-box6').width();
    var box6Height = $('.chart-box6').height();
    var line6X = Math.floor(box6Left) + 5;
    var pathLine5 = "M" + cx4 + " " + cy4 + " L" + line6X + " " + cy4;
    var zheLine6X = Math.floor((box6Left - (wrapper4Left + wrapper4Width)) / 2 + (wrapper4Left + wrapper4Width));
    var zheLine6Y = Math.floor((box6Top - (box4Top + box4Height)) / 2 + (box4Top + box4Height))
    var box7Top = $('.chart-box7').offset().top;
    var box7Left = $('.chart-box7').offset().left;
    var box7Width = $('.chart-box7').width();
    var box7Height = $('.chart-box7').height();
    var zheLine7X = Math.floor((box7Left - (box6Width + box6Left)) / 2 + (box6Width + box6Left));
    var zheLine7TopY = Math.floor(box4Top + box4Height / 2);
    var zheLine7LeftX = Math.floor($('.chart-box5').offset().left) + 5;
    var pathLine6 = "M" + cx4 + " " + cy4 + " L" + zheLine6X + " " + zheLine6Y + " L" + zheLine7X + " " + zheLine6Y + " L" + zheLine7X + " " + zheLine7TopY + " L" + zheLine7LeftX + " " + zheLine7TopY;
    var zheLine8X = Math.floor(box7Top + box7Height / 2);
    var zheLine8Y = Math.floor(box7Left) + 5;
    var pathLine7 = "M" + zheLine7X + " " + zheLine6Y + " L" + zheLine7X + " " + zheLine8X + " L" + zheLine8Y + " " + zheLine8X;

    var wrapper1Arc = '<path stroke-dasharray="2,2" d="' + pathLine1 + '" fill="transparent" stroke="#A3E8FE" />';
    var wrapper2Arc = '<path stroke-dasharray="2,2" d="' + pathLine2 + '" fill="transparent" stroke="#A3E8FE" />';
    var wrapper3Arc = '<path stroke-dasharray="2,2" d="' + pathLine3 + '" fill="transparent" stroke="#A3E8FE" />';
    var wrapper4Arc = '<path stroke-dasharray="2,2" d="' + pathLine4 + '" fill="transparent" stroke="#A3E8FE" />';
    var wrapper5Arc = '<path stroke-dasharray="2,2" d="' + pathLine5 + '" fill="transparent" stroke="#A3E8FE" />';
    var wrapper6Arc = '<path stroke-dasharray="2,2" d="' + pathLine6 + '" fill="transparent" stroke="#A3E8FE" />';
    var wrapper7Arc = '<path stroke-dasharray="2,2" d="' + pathLine7 + '" fill="transparent" stroke="#A3E8FE" />';

    $('.svg-data').html(wrapper1Arc + wrapper2Arc + wrapper3Arc + wrapper4Arc + wrapper5Arc + wrapper6Arc + wrapper7Arc);
}