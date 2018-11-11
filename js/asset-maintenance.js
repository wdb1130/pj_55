$(function () {
    drawChart1();
    drawChart2();
    drawChart3();
    drawChart4();
    drawChart5();
    drawChart6();
    drawChart7();
});
// chart1
function drawChart1() {
    var dom1 = document.getElementById("chart1");
    var myChart1 = echarts.init(dom1);
    option = null;
    option = {
        color: ['#3398DB'],
        title: {
            text: '',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: "{b} <br> 合格率: {c}%"
        },
        grid: {
            x: 30,
            y: 20,
            x2: 40,
            y2: 20,
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: {
                formatter: '{value}%',
                textStyle: {
                    fontWeight: '80'
                }
            }
        },
        yAxis: {
            type: 'category',
            data: ['湖北省', '湖南省', '广东省', '山东省'],
            axisLabel: {
                show: true,
                interval: 0,
                rotate: 0,
                margin: 10,
                inside: false,
                textStyle: {
                    fontWeight: '50'
                }
            }
        },
        series: [{
            type: 'bar',
            barWidth: 20,
            label: {
                normal: {
                    show: true,
                    formatter: function (v) {
                        var val = v.data;
                        if (val == 0) {
                            return '';
                        }
                        return val;
                    },
                    color: '#fff'
                }
            },
            data: [22, 33, 88, 30]
        }]
    };
    if (option && typeof option === "object") {
        myChart1.setOption(option, true);
        window.onresize = myChart1.resize;
    }
}
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
// chart7
function drawChart7() {
    var dom7 = document.getElementById("chart7");
    var myChart7 = echarts.init(dom7);
    option = null;
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            orient: 'vertical',
            x: '5%',
            y: '20%',
            data: ['直接访问', '邮件营销', '搜索引擎']
        },
        grid: {
            x: 120,
            y: 15,
            x2: 20,
            y2: 10,
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['周一', '周二']
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
                barWidth: 20,
                data: [320, 332]
            },
            {
                name: '邮件营销',
                type: 'bar',
                stack: '广告',
                barWidth: 20,
                data: [120, 132]
            },
            {
                name: '搜索引擎',
                type: 'bar',
                barWidth: 20,
                data: [862, 1018],
            }
        ]
    };
    if (option && typeof option === "object") {
        myChart7.setOption(option, true);
        window.onresize = myChart7.resize;
    }
}