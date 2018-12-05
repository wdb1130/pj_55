var modalTitle;
var chartTypeState;

// 模态框获取的
var postModalData;

// 所有图表请求后暂存
var storageData = {
    drawLine: [],
    draw3DCylinderH: [],
    drawPartRing: [[], [], []],
    drawRing: [],
    drawPlusLine: [],
}

var colorLine = ['#FF3838', '#FB943A', '#45CE8D', '#2420FF'];
var color3DCylinder = [
    ['#4ED6AD', '#5DDBF8'],
    ['#2324FF', '#05B8FF'],
    ['#FFD062', '#FACE64'],
    ['#D9162E', '#FE7421']
];
var colorPartRingList = ['#2420FF', '#45CE8D', '#FF3838'];
var colorRingList = ['#0DC3FF', '#E9D356', '#F65C3E'];
var radiusArr = [
    ['55%', '60%'],
    ['40%', '45%'],
    ['25%', '30%']
];
var centerArr = [
    ['50%', '50%'],
    ['50%', '50%'],
    ['50%', '50%']
];
var colorLineList = ['#FF3838'];

$(function () {
    drawSvgDash();
    $(window).resize(function () {
        drawSvgDash();
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
            url: "../test-json/3dH_4.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    storageData.draw3DCylinderH.push(res.result.seriesData);
                    storageData.draw3DCylinderH.push(color3DCylinder);
                    initChartFun.draw3DCylinderH('chart1', storageData.draw3DCylinderH);
                };
            }
        });

        // chart2
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
                    initChartFun.drawLine('chart2', storageData.drawLine);
                };
            }
        });

        // chart3,4,5
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/maintenanceOccupancyRate_3.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    var resizeChart = [];
                    var xAxisDataArr = [[], [], []];
                    var seriesDataArr = [[], [], []];
                    res.result.seriesData.forEach(function (item, idx) {
                        var domId = 'chart' + (idx + 3);
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

        // chart6
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/ring_3.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    var legendData = [];
                    var seriesData = [];
                    res.result.seriesData.forEach(function (item, idx) {
                        legendData.push(item.title);
                        seriesData.push({
                            name: 'Line' + idx,
                            type: 'pie',
                            clockWise: true,
                            radius: radiusArr[idx],
                            center: centerArr[idx],
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        formatter: "{b}({d}%)"
                                    },
                                    labelLine: {
                                        show: true
                                    }
                                }
                            },
                            hoverAnimation: true,
                            startAngle: 90,
                            label: {
                                borderRadius: '10',
                            },
                            data: [{
                                value: item.value,
                                name: item.title,
                                itemStyle: {
                                    normal: {
                                        color: colorRingList[idx]
                                    }
                                }
                            },
                            {
                                value: 100 - item.value,
                                name: '',
                                tooltip: {
                                    show: false
                                },
                                itemStyle: {
                                    normal: {
                                        color: 'rgba(41,27,135,.3)',
                                        label: {
                                            show: false
                                        },
                                        labelLine: {
                                            show: false
                                        }
                                    },
                                    emphasis: {
                                        color: 'rgba(41,27,135,.3)'
                                    }
                                }
                            }]
                        });
                    });
                    storageData.drawRing.push(legendData);
                    storageData.drawRing.push(seriesData);
                    initChartFun.drawRing('chart6', storageData.drawRing);
                };
            }
        });

        // chart7
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
                            symbolSize: 4,
                            lineStyle: {
                                normal: {
                                    width: 1
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
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
                    initChartFun.drawPlusLine('chart7', storageData.drawPlusLine);
                };
            }
        });

        // list1
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/device_table_list_3.json",
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
            url: "../test-json/device_table_list_3.json",
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
});
function drawSvgDash() {
    $('.svg-data').html("");
    var tag1Left = $('.tag-1').offset().left;
    var tag1Top = $('.tag-1').offset().top;
    var tag1Width = $('.tag-1').width();
    var tag1Hight = $('.tag-1').height();
    // 起点
    var cx1 = Math.floor(tag1Left + tag1Width / 4);
    var cy1 = Math.floor(tag1Top + tag1Hight / 2);
    // 终点
    var boxSvg1Top = $('.box-svg1').offset().top;
    var boxSvg1Left = $('.box-svg1').offset().left;
    var boxSvg1Height = $('.box-svg1').height();
    var cyy1 = Math.floor(boxSvg1Top + boxSvg1Height) - 4;
    var pathLine1 = "M" + cx1 + " " + cy1 + " L" + cx1 + " " + cyy1;
    // 起点
    var tag2Left = $('.tag-2').offset().left;
    var tag2Top = $('.tag-2').offset().top;
    var tag2Width = $('.tag-2').width();
    var tag2Hight = $('.tag-2').height();
    var cx2 = Math.floor(tag2Left + tag2Width / 3);
    var cy2 = Math.floor(tag2Top + tag2Hight / 2);
    // 终点
    var boxSvg2Top = $('.box-svg2').offset().top;
    var boxSvg2Left = $('.box-svg2').offset().left;
    var boxSvg2Width = $('.box-svg2').width();
    var boxSvg2Height = $('.box-svg2').height();
    var line1X = Math.floor((tag2Left - (boxSvg2Left + boxSvg2Width)) / 2 + (boxSvg2Left + boxSvg2Width));
    var line1Y = Math.floor(boxSvg2Top + boxSvg2Height / 2);
    var line1XX = Math.floor(boxSvg2Left + boxSvg2Width) - 5;
    var pathLine2 = "M" + cx2 + " " + cy2 + " L" + line1X + " " + line1Y + " L" + line1XX + " " + line1Y;
    // 终点
    var boxSvg3Top = $('.box-svg3').offset().top;
    var line2Y = Math.floor(boxSvg3Top) + 5;
    var pathLine3 = "M" + cx2 + " " + cy2 + " L" + cx2 + " " + line2Y;
    // 起点
    var tag3Left = $('.tag-3').offset().left;
    var tag3Top = $('.tag-3').offset().top;
    var tag3Width = $('.tag-3').width();
    var tag3Hight = $('.tag-3').height();
    var cx3 = Math.floor(tag3Left + tag3Width * (3 / 4));
    var cy3 = Math.floor(tag3Top + tag3Hight / 2);
    // 终点
    var boxSvg4Top = $('.box-svg4').offset().top;
    var boxSvg4Height = $('.box-svg4').height();
    var line3X = Math.floor(boxSvg4Top + boxSvg4Height) - 5;
    var pathLine4 = "M" + cx3 + " " + cy3 + " L" + cx3 + " " + line3X;
    // 终点
    var boxSvg5Left = $('.box-svg5').offset().left;
    var line4X = Math.floor(boxSvg5Left) + 3;
    var pathLine5 = "M" + cx3 + " " + cy3 + " L" + line4X + " " + cy3;
    // 起点
    var tag4Left = $('.tag-4').offset().left;
    var tag4Top = $('.tag-4').offset().top;
    var tag4Width = $('.tag-4').width();
    var tag4Hight = $('.tag-4').height();
    var cx4 = Math.floor(tag4Left + tag4Width * (3 / 4));
    var cy4 = Math.floor(tag4Top + tag4Hight * (3 / 4));
    // 终点
    var boxSvg6Left = $('.box-svg6').offset().left;
    var line6X = Math.floor(boxSvg6Left) + 3;
    var pathLine6 = "M" + cx4 + " " + cy4 + " L" + line6X + " " + cy4;
    // 终点
    var boxSvg7Top = $('.box-svg7').offset().top;
    var line7Y = Math.floor(boxSvg7Top) + 5;
    var pathLine7 = "M" + cx4 + " " + cy4 + " L" + cx4 + " " + line7Y;

    var wrapper1Arc = '<path stroke-dasharray="2,2" d="' + pathLine1 + '" fill="transparent" stroke="#fff" />';
    var wrapper2Arc = '<path stroke-dasharray="2,2" d="' + pathLine2 + '" fill="transparent" stroke="#fff" />';
    var wrapper3Arc = '<path stroke-dasharray="2,2" d="' + pathLine3 + '" fill="transparent" stroke="#fff" />';
    var wrapper4Arc = '<path stroke-dasharray="2,2" d="' + pathLine4 + '" fill="transparent" stroke="#fff" />';
    var wrapper5Arc = '<path stroke-dasharray="2,2" d="' + pathLine5 + '" fill="transparent" stroke="#fff" />';
    var wrapper6Arc = '<path stroke-dasharray="2,2" d="' + pathLine6 + '" fill="transparent" stroke="#fff" />';
    var wrapper7Arc = '<path stroke-dasharray="2,2" d="' + pathLine7 + '" fill="transparent" stroke="#fff" />';

    $('.svg-data').html(
        wrapper1Arc + wrapper2Arc + wrapper3Arc + wrapper4Arc + wrapper5Arc + wrapper6Arc + wrapper7Arc
    );
}