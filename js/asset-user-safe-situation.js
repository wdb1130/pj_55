var modalTitle;
var chartTypeState;

// 模态框获取的
var postModalData;

// 所有图表请求后暂存
var storageData = {
    drawLine1: [],
    draw3DCylinderH: [],
    drawPartRing: [[], [], []],
    drawRing: [],
    drawLine2: [],
}

var colorLine = ['#FF3838', '#FB943A', '#45CE8D', '#2420FF'];
var color3DCylinder = ['#FF3838', '#FB943A', '#45CE8D', '#2420FF'];
var colorPartRingList = ['#2420FF', '#45CE8D', '#FF3838'];
var colorRingList = ['#0DC3FF', '#E9D356', '#F65C3E'];
var radiusArr = [
    ['70%', '75%'],
    ['55%', '60%'],
    ['40%', '45%']
];
var centerArr = [
    ['60%', '50%'],
    ['60%', '50%'],
    ['60%', '50%']
];
var colorLineList = ['#FF3838'];

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
                    res.result.seriesData.forEach(function (item, idx) {
                        item.color = color3DCylinder[idx];
                    });
                    storageData.draw3DCylinderH.push(res.result.seriesData);
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
                    storageData.drawLine1.push(res.result.legendData);
                    storageData.drawLine1.push(xAxisData);
                    storageData.drawLine1.push(seriesData);
                    initChartFun.drawLine('chart2', storageData.drawLine1);
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
                                        show: false
                                    },
                                    shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
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
                                    color: colorLineList[idx],
                                    borderWidth: 1
                                }
                            },
                            data: sitemArr[idx]
                        })
                    });
                    storageData.drawLine2.push(res.result.legendData);
                    storageData.drawLine2.push(xAxisData);
                    storageData.drawLine2.push(seriesData);
                    initChartFun.drawLine('chart7', storageData.drawLine2);
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