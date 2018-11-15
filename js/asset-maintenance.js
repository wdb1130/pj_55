var chartTypeState;

// 模态框获取的
var postModalData;

// 所有图表请求后暂存
var storageData = {
    drawHorizontalBar: [],
    drawVerticalBar: [],
    drawPartRing: [[], [], []]
}

var colorBarList = ['#2420FF', '#45CE8D', '#FB943A', '#FF3838'];
var colorVerticalBarList = ['#FF3838', '#FB943A', '#2420FF'];
var colorPartRingList = ['#2420FF', '#45CE8D', '#FF3838'];


$(function () {
    layui.use('layer', function () {
        var $ = layui.jquery, layer = layui.layer;
        //触发事件
        var active = {
            setTop: function () {
                var that = this;
                layer.open({
                    type: 2,
                    title: '图表的模态框测试',
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
                    }
                });
            }
        };
        $('.chart-click').on('click', function () {
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
            url: "../test-json/maintenance_horizontalBar_4.json",
            success: function (res) {
                if (res.resultCode == 200) {
                    var yAxisData = [];
                    var seriesData = [];
                    res.result.seriesData.forEach(function (item) {
                        yAxisData.push(item.title);
                        seriesData.push(item.value);
                    });
                    storageData.drawHorizontalBar.push(yAxisData, seriesData, colorBarList);
                    initChartFun.drawHorizontalBar('chart1', storageData.drawHorizontalBar);
                };
            }
        });
        // chart2,3,4
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/maintenanceOccupancyRate_3.json",
            success: function (res) {
                if (res.resultCode == 200) {
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
                        initChartFun.drawPartRing(domId, storageData.drawPartRing[idx]);
                    });
                };
            }
        });













        // chart7
        $.ajax({
            type: "GET",
            data: "",
            dataType: 'json',
            url: "../test-json/maintenance_verticalBar_3.json",
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
                                            color: '#ccc',
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
                    initChartFun.drawVerticalBar('chart7', storageData.drawVerticalBar);
                };
            }
        });
    }, 1000);




});


// chart
function drawChart2() {
    var dom2 = document.getElementById("chart2");
    var myChart2 = echarts.init(dom2);
    option = null;
    var echartData = [{
        value: 50,
        name: '交卷时间'
    }, {
        value: 50,
        name: '未交卷时间'
    }];
    var innerColor = '#2bff8f';
    var outColor = "#50e0ff";
    var textColor = '#50e0ff';
    var startColor = 'rgba(73,223,240,0.1)';
    var endColor = 'rgba(73,223,240,0.8)';
    var scale = 1;
    var color = [{
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0,
            color: startColor
        }, {
            offset: 1,
            color: endColor
        }],
        globalCoord: false
    }, 'none'];
    var rich = {
        time: {
            color: innerColor,
            fontSize: 32 * scale,
            padding: [0, 0],
            fontWeight: 'bold'
        },
        unit: {
            color: innerColor,
            fontSize: 14 * scale,
            padding: [0, 0, 0, 0],
            verticalAlign: 'bottom',
        }
    }
    option = {
        title: [{
            text: '网络宽带占用率',
            x: '50%',
            y: '80%',
            textAlign: 'center',
            textStyle: {
                color: '#fff',
                textAlign: 'center',
                fontSize: 15 * scale,
                fontWeight: 'bold'
            },
        }],
        legend: {
            show: false,
            itemGap: 12,
            data: ['通过', '未通过']
        },
        series: [{
            name: 'Line 0',
            type: 'pie',
            clockWise: false,
            hoverAnimation: false,
            center: ['50%', '40%'],
            radius: ['50%', '51.5%'],
            itemStyle: {
                normal: {
                    color: innerColor
                }
            },
            data: [{
                value: 10,
                name: '',
            }],
            label: {
                normal: {
                    formatter: function (params) {
                        var time = echartData[0].value;
                        return '{time|' + time + '}{unit|min}';
                    },
                    position: 'center',
                    textStyle: {
                        fontSize: 38 * scale,
                        fontWeight: 'bold',
                        color: textColor
                    },
                    rich: rich
                }
            }
        },
        {
            name: 'Line 1',
            type: 'pie',
            clockWise: false,
            hoverAnimation: true,
            center: ['50%', '40%'],
            radius: ['75%', '65%'],
            color: color,
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                }
            },
            data: echartData,
        },
        {
            name: 'Line 2',
            type: 'pie',
            clockWise: false,
            hoverAnimation: false,
            center: ['50%', '40%'],
            radius: ['75%', '75%'],
            itemStyle: {
                normal: {
                    borderWidth: 2 * scale,
                    borderColor: outColor,
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                }
            },
            data: [{
                value: 10,
                name: '',

            }]
        }
        ],
    };
    if (option && typeof option === "object") {
        myChart2.setOption(option, true);
        window.onresize = myChart2.resize;
    }
}
// chart3
function drawChart3() {
    var dom3 = document.getElementById("chart3");
    var myChart3 = echarts.init(dom3);
    option = null;
    var echartData = [{
        value: 50,
        name: '交卷时间'
    }, {
        value: 50,
        name: '未交卷时间'
    }];
    var innerColor = '#2bff8f';
    var outColor = "#50e0ff";
    var textColor = '#50e0ff';
    var startColor = 'rgba(73,223,240,0.1)';
    var endColor = 'rgba(73,223,240,0.8)';
    var scale = 1;
    var color = [{
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0,
            color: startColor
        }, {
            offset: 1,
            color: endColor
        }],
        globalCoord: false
    }, 'none'];
    var rich = {
        time: {
            color: innerColor,
            fontSize: 32 * scale,
            padding: [0, 0],
            fontWeight: 'bold'
        },
        unit: {
            color: innerColor,
            fontSize: 14 * scale,
            padding: [0, 0, 0, 0],
            verticalAlign: 'bottom',
        }
    }
    option = {
        title: [{
            text: '网络宽带占用率',
            x: '50%',
            y: '80%',
            textAlign: 'center',
            textStyle: {
                color: '#fff',
                textAlign: 'center',
                fontSize: 15 * scale,
                fontWeight: 'bold'
            },
        }],
        legend: {
            show: false,
            itemGap: 12,
            data: ['通过', '未通过']
        },
        series: [{
            name: 'Line 0',
            type: 'pie',
            clockWise: false,
            hoverAnimation: false,
            center: ['50%', '40%'],
            radius: ['50%', '51.5%'],
            itemStyle: {
                normal: {
                    color: innerColor
                }
            },
            data: [{
                value: 10,
                name: '',
            }],
            label: {
                normal: {
                    formatter: function (params) {
                        var time = echartData[0].value;
                        return '{time|' + time + '}{unit|min}';
                    },
                    position: 'center',
                    textStyle: {
                        fontSize: 38 * scale,
                        fontWeight: 'bold',
                        color: textColor
                    },
                    rich: rich
                }
            }
        },
        {
            name: 'Line 1',
            type: 'pie',
            clockWise: false,
            hoverAnimation: false,
            center: ['50%', '40%'],
            radius: ['75%', '65%'],
            color: color,
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                }
            },
            data: echartData,
        },
        {
            name: 'Line 2',
            type: 'pie',
            clockWise: false,
            hoverAnimation: false,
            center: ['50%', '40%'],
            radius: ['75%', '75%'],
            itemStyle: {
                normal: {
                    borderWidth: 2 * scale,
                    borderColor: outColor,
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                }
            },
            data: [{
                value: 10,
                name: '',

            }]
        }
        ],
    };
    if (option && typeof option === "object") {
        myChart3.setOption(option, true);
        window.onresize = myChart3.resize;
    }
}
// chart4
function drawChart4() {
    var dom4 = document.getElementById("chart4");
    var myChart4 = echarts.init(dom4);
    option = null;
    var echartData = [{
        value: 50,
        name: '交卷时间'
    }, {
        value: 50,
        name: '未交卷时间'
    }];
    var innerColor = '#2bff8f';
    var outColor = "#50e0ff";
    var textColor = '#50e0ff';
    var startColor = 'rgba(73,223,240,0.1)';
    var endColor = 'rgba(73,223,240,0.8)';
    var scale = 1;
    var color = [{
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0,
            color: startColor
        }, {
            offset: 1,
            color: endColor
        }],
        globalCoord: false
    }, 'none'];
    var rich = {
        time: {
            color: innerColor,
            fontSize: 32 * scale,
            padding: [0, 0],
            fontWeight: 'bold'
        },
        unit: {
            color: innerColor,
            fontSize: 14 * scale,
            padding: [0, 0, 0, 0],
            verticalAlign: 'bottom',
        }
    }
    option = {
        title: [{
            text: '网络宽带占用率',
            x: '50%',
            y: '80%',
            textAlign: 'center',
            textStyle: {
                color: '#fff',
                textAlign: 'center',
                fontSize: 15 * scale,
                fontWeight: 'bold'
            },
        }],
        legend: {
            show: false,
            itemGap: 12,
            data: ['通过', '未通过']
        },
        series: [{
            name: 'Line 0',
            type: 'pie',
            clockWise: false,
            hoverAnimation: false,
            center: ['50%', '40%'],
            radius: ['50%', '51.5%'],
            itemStyle: {
                normal: {
                    color: innerColor
                }
            },
            data: [{
                value: 10,
                name: '',
            }],
            label: {
                normal: {
                    formatter: function (params) {
                        var time = echartData[0].value;
                        return '{time|' + time + '}{unit|min}';
                    },
                    position: 'center',
                    textStyle: {
                        fontSize: 38 * scale,
                        fontWeight: 'bold',
                        color: textColor
                    },
                    rich: rich
                }
            }
        },
        {
            name: 'Line 1',
            type: 'pie',
            clockWise: false,
            hoverAnimation: false,
            center: ['50%', '40%'],
            radius: ['75%', '65%'],
            color: color,
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                }
            },
            data: echartData,
        },
        {
            name: 'Line 2',
            type: 'pie',
            clockWise: false,
            hoverAnimation: false,
            center: ['50%', '40%'],
            radius: ['75%', '75%'],
            itemStyle: {
                normal: {
                    borderWidth: 2 * scale,
                    borderColor: outColor,
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                }
            },
            data: [{
                value: 10,
                name: '',

            }]
        }
        ],
    };
    if (option && typeof option === "object") {
        myChart4.setOption(option, true);
        window.onresize = myChart4.resize;
    }
}
// chart5
function drawChart5() {
    var dom5 = document.getElementById("chart5");
    var myChart5 = echarts.init(dom5);
    option = null;
    option = {
        series: [
            {
                name: '车辆占比',
                type: 'pie',
                radius: ['40%', '55%'],
                label: {
                    normal: {
                        formatter: '{b|{b}}',
                        borderWidth: 1,
                        borderRadius: 4,
                        rich: {
                            b: {
                                fontSize: 12
                            }
                        }
                    }
                },
                data: [
                    { value: 348, name: '旅游客运' },
                    { value: 251, name: '班线客运' },
                    { value: 147, name: '普货' },
                    { value: 102, name: '危险品' },
                    { value: 147, name: '普货' },
                    { value: 102, name: '危险品' }
                ]
            }
        ]
    };
    if (option && typeof option === "object") {
        myChart5.setOption(option, true);
        window.onresize = myChart5.resize;
    }
}
// chart6
function drawChart6() {
    var dom6 = document.getElementById("chart6");
    var myChart6 = echarts.init(dom6);
    option = null;
    option = {
        series: [
            {
                name: '车辆占比',
                type: 'pie',
                radius: ['40%', '55%'],
                label: {
                    normal: {
                        formatter: '{b|{b}}',
                        borderWidth: 1,
                        borderRadius: 4,
                        rich: {
                            b: {
                                fontSize: 12
                            }
                        }
                    }
                },
                data: [
                    { value: 348, name: '旅游客运' },
                    { value: 251, name: '班线客运' },
                    { value: 147, name: '普货' },
                    { value: 102, name: '危险品' },
                    { value: 147, name: '普货' },
                    { value: 102, name: '危险品' }
                ]
            }
        ]
    };
    if (option && typeof option === "object") {
        myChart6.setOption(option, true);
        window.onresize = myChart6.resize;
    }
}
