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

    drawChart1();
    drawChart2();
    drawChart3();
    drawChart4();
    drawChart5();
    drawChart6();
});
// chart1
function drawChart1() {
    var dom1 = document.getElementById("chart1");
    var myChart1 = echarts.init(dom1);
    option = null;
    option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: ['移动', '电信', '联通'],
            right: '4%',
            textStyle: {
                fontSize: 12,
                color: '#F1F1F3'
            }
        },
        xAxis: [{
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            data: ['13:00', '13:05', '13:10', '13:15', '13:20', '13:40', '13:45']
        }],
        yAxis: [{
            type: 'value',
            name: '单位（%）',
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            axisLabel: {
                margin: 10,
                textStyle: {
                    fontSize: 14
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#57617B'
                }
            }
        }],
        series: [{
            name: '移动',
            type: 'line',
            symbol: 'circle',
            symbolSize: 5,
            lineStyle: {
                normal: {
                    width: 1
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgb(137,189,27)',
                    borderColor: 'rgba(137,189,2,0.27)',
                    borderWidth: 10

                }
            },
            data: [150, 120, -110, 125, 145, -122, 165]
        }, {
            name: '电信',
            type: 'line',
            symbol: 'circle',
            symbolSize: 5,
            lineStyle: {
                normal: {
                    width: 1
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgb(0,136,212)',
                    borderColor: 'rgba(0,136,212,0.2)',
                    borderWidth: 10

                }
            },
            data: [165, -122, 220, 182, -191, 134, 150]
        }, {
            name: '联通',
            type: 'line',
            symbol: 'circle',
            symbolSize: 5,
            lineStyle: {
                normal: {
                    width: 1
                }
            },
            itemStyle: {
                normal: {

                    color: 'rgb(219,50,51)',
                    borderColor: 'rgba(219,50,51,0.2)',
                    borderWidth: 10
                }
            },
            data: [220, 182, -125, 150, 120, 110, -165]
        },]
    };
    if (option && typeof option === "object") {
        myChart1.setOption(option, true);
        window.onresize = myChart1.resize;
    }
}
// chart2
function drawChart2() {
    var dom2 = document.getElementById("chart2");
    var myChart2 = echarts.init(dom2);
    option = null;
    option = {
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            x: 20,
            y: 20,
            x2: 20,
            y2: 10,
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '直接访问',
                type: 'bar',
                barWidth: '20',
                data: [10, 52, 200, 334, 390, 330, 220]
            }
        ]
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
    option = {
        radar: [{
            indicator: [{
                text: '参数一',
                max: 100
            }, {
                text: '参数二',
                max: 100
            }, {
                text: '参数三',
                max: 100
            }, {
                text: '参数四',
                max: 100
            }],

            radius: '65%',
            center: ['50%', '50%'],
            startAngle: 90,
            splitNumber: 4,
            name: {
                formatter: '{value}',
                textStyle: {
                    color: '#fff'
                }
            },
            splitArea: {
                areaStyle: {
                    color: [],
                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                    shadowBlur: 10
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#1254ED'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#1254ED'
                }
            }
        }],
        series: [{
            name: '雷达图',
            type: 'radar',
            itemStyle: {
                emphasis: {
                    lineStyle: {
                        width: 4
                    }
                }
            },
            data: [{
                value: [40, 20, 60, 55],
                name: '长沙',
                symbol: 'rect',
                symbolSize: 0,
                areaStyle: {
                    normal: {
                        color: 'rgba(255, 255, 0, 0.5)'
                    }
                },
                lineStyle: {
                    normal: {
                        type: 'solid',
                        width: 0
                    }
                }
            }]
        }]
    }
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
    option = {
        radar: [{
            indicator: [{
                text: '参数一',
                max: 100
            }, {
                text: '参数二',
                max: 100
            }, {
                text: '参数三',
                max: 100
            }, {
                text: '参数四',
                max: 100
            }],

            radius: '65%',
            center: ['50%', '50%'],
            startAngle: 90,
            splitNumber: 4,
            name: {
                formatter: '{value}',
                textStyle: {
                    color: '#fff'
                }
            },
            splitArea: {
                areaStyle: {
                    color: [],
                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                    shadowBlur: 10
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#1254ED'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#1254ED'
                }
            }
        }],
        series: [{
            name: '雷达图',
            type: 'radar',
            itemStyle: {
                emphasis: {
                    lineStyle: {
                        width: 4
                    }
                }
            },
            data: [{
                value: [40, 20, 60, 55],
                name: '长沙',
                symbol: 'rect',
                symbolSize: 0,
                areaStyle: {
                    normal: {
                        color: 'rgba(255, 255, 0, 0.5)'
                    }
                },
                lineStyle: {
                    normal: {
                        type: 'solid',
                        width: 0
                    }
                }
            }]
        }]
    }
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
        radar: [{
            indicator: [{
                text: '参数一',
                max: 100
            }, {
                text: '参数二',
                max: 100
            }, {
                text: '参数三',
                max: 100
            }, {
                text: '参数三',
                max: 100
            }],
            center: ['50%', '60%'],
            startAngle: 90,
            splitNumber: 4,
            shape: 'circle',
            name: {
                formatter: '{value}',
                textStyle: {
                    color: '#fff'
                }
            },
            splitArea: {
                areaStyle: {
                    color: [],
                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                    shadowBlur: 10
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#1254ED'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#1254ED'
                }
            }
        }],
        series: [{
            name: '雷达图',
            type: 'radar',
            itemStyle: {
                emphasis: {
                    lineStyle: {
                        width: 4
                    }
                }
            },
            data: [{
                value: [40, 20, 60, 55],
                name: '长沙',
                symbol: 'rect',
                symbolSize: 0,
                areaStyle: {
                    normal: {
                        color: 'rgba(255, 255, 0, 0.5)'
                    }
                },
                lineStyle: {
                    normal: {
                        type: 'solid',
                        width: 0
                    }
                }
            }]
        }]
    }
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
        radar: [{
            indicator: [{
                text: '参数一',
                max: 100
            }, {
                text: '参数二',
                max: 100
            }, {
                text: '参数三',
                max: 100
            }, {
                text: '参数三',
                max: 100
            }],
            center: ['50%', '60%'],
            startAngle: 90,
            splitNumber: 4,
            shape: 'circle',
            name: {
                formatter: '{value}',
                textStyle: {
                    color: '#fff'
                }
            },
            splitArea: {
                areaStyle: {
                    color: [],
                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                    shadowBlur: 10
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#1254ED'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#1254ED'
                }
            }
        }],
        series: [{
            name: '雷达图',
            type: 'radar',
            itemStyle: {
                emphasis: {
                    lineStyle: {
                        width: 4
                    }
                }
            },
            data: [{
                value: [40, 20, 60, 55],
                name: '长沙',
                symbol: 'rect',
                symbolSize: 0,
                areaStyle: {
                    normal: {
                        color: 'rgba(255, 255, 0, 0.5)'
                    }
                },
                lineStyle: {
                    normal: {
                        type: 'solid',
                        width: 0
                    }
                }
            }]
        }]
    }
    if (option && typeof option === "object") {
        myChart6.setOption(option, true);
        window.onresize = myChart6.resize;
    }
}