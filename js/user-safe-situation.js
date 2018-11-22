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
}

var colorLine = ['#FF3838', '#FB943A', '#45CE8D', '#2420FF'];
var color3DCylinder = ['#FF3838', '#FB943A', '#45CE8D', '#2420FF'];
var colorPartRingList = ['#45CE8D', '#FF3838'];
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
                        if (chartTypeState == "drawLiquidFill") {
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

        // chart3
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/3dH_3.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    res.result.seriesData.forEach(function (item, idx) {
                        item.color = color3DCylinder[idx];
                    });
                    storageData.draw3DCylinderH1.push(res.result.seriesData);
                    initChartFun.draw3DCylinderH('chart3', storageData.draw3DCylinderH1);
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
                    storageData.draw3DCylinderH2.push(res.result.seriesData);
                    initChartFun.draw3DCylinderH('chart4', storageData.draw3DCylinderH2);
                };
            }
        });

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
            url: "../test-json/oneFanPie_1.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    var legendData = [];
                    var seriesData = [];
                    res.result.seriesData.forEach(function (item) {
                        legendData.push(item.name);
                        seriesData.push(item.value);
                    });
                    storageData.drawLiquidFill.push(legendData);
                    storageData.drawLiquidFill.push(seriesData);
                    storageData.drawLiquidFill.push(colorLiquidFillList1);
                    storageData.drawLiquidFill.push(colorLiquidFillList2);
                    initChartFun.drawLiquidFill('chart2', storageData.drawLiquidFill);
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