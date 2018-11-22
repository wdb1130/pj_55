var modalTitle;
var chartTypeState;

// 模态框获取的
var postModalData;

// 所有图表请求后暂存
var storageData = {
    drawLine: [],
    drawLiquidFill1: [],
    drawLiquidFill2: [],
    draw3DCylinderH: [],
    drawPartRing: [[], []]
}

var colorLine = ['#FF3838', '#8124FF', '#45CE8D', '#9000FF'];
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

var color3DCylinder = ['#FF3838', '#2420FF'];
var colorPartRingList = ['#45CE8D', '#FF3838'];

$(function () {
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
                    },
                    full: function (dom) {
                        if (chartTypeState == "drawLiquidFill1" || chartTypeState == "drawLiquidFill2") {
                            dom.find('iframe').contents().find('.content').html("");
                            dom.find('iframe').contents().find('.content').append('<div id="chartModal"></div>');
                            var funName = dom.find('iframe')[0].contentWindow.funName;
                            var postodalData = dom.find('iframe')[0].contentWindow.postodalData;
                            dom.find('iframe')[0].contentWindow.initChartFun[funName]('chartModal', postodalData);
                        }
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
                            symbolSize: 8,
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
                    initChartFun.drawLine('chart-1', storageData.drawLine);
                };
            }
        });

        // chart2
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/oneFanPie_1.json",
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
                };
            }
        });

        // chart3
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/oneFanPie_1.json",
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
                };
            }
        });

        // list4
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
            url: "../test-json/3dH_2.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    res.result.seriesData.forEach(function (item, idx) {
                        item.color = color3DCylinder[idx];
                    });
                    storageData.draw3DCylinderH.push(res.result.seriesData);
                    initChartFun.draw3DCylinderH('chart-4', storageData.draw3DCylinderH);
                };
            }
        });

        // chart5,6
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/networkDataRing_2.json",
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


    var wrapper1Left = $('.wrapper1').offset().left;
    var wrapper1Top = $('.wrapper1').offset().top;
    var wrapper1Width = $('.wrapper1').width();
    var wrapper1Hight = $('.wrapper1').height();
    var cx1 = Math.floor(wrapper1Left + wrapper1Width);
    var cy1 = Math.floor(wrapper1Top + wrapper1Hight / 2);
    var box1Width = $('.chart-box1').width();
    var box1Left = Math.floor($('.chart-box1').offset().left) + 5;
    var pathLine1 = "M" + cx1 + " " + cy1 + " L" + box1Left + " " + cy1;
    var wrapper2Left = $('.wrapper2').offset().left;
    var wrapper2Top = $('.wrapper2').offset().top;
    var wrapper2Width = $('.wrapper2').width();
    var wrapper2Hight = $('.wrapper2').height();
    // 起点
    var cx2 = Math.floor(wrapper2Left + wrapper2Width);
    var cy2 = Math.floor(wrapper2Top + wrapper2Hight / 2);
    var box2Left = $('.chart-box2').offset().left;
    var box2Top = $('.chart-box2').offset().top;
    var box2Width = $('.chart-box2').width();
    var box2Hight = $('.chart-box2').height();
    var box3Left = $('.chart-box3').offset().left;
    var box3Top = $('.chart-box3').offset().top;
    var box3Width = $('.chart-box3').width();
    var box3Hight = $('.chart-box3').height();
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

    var wrapper1Arc = '<path stroke-dasharray="2,2" d="' + pathLine1 + '" fill="transparent" stroke="#fff" />';
    var wrapper2Arc = '<path stroke-dasharray="2,2" d="' + pathLine2 + '" fill="transparent" stroke="#fff" />';
    var wrapper3Arc = '<path stroke-dasharray="2,2" d="' + pathLine3 + '" fill="transparent" stroke="#fff" />';



    $('.svg-data').html(wrapper1Arc + wrapper2Arc + wrapper3Arc)






















});