// chart5
$(function() {
    initChart1();
    initChart2();
    initChart3();
    drawChart5();
    drawChart6();
})

function initChart1() {
    var dom1 = document.getElementById("chart-1");
    var myChart1 = echarts.init(dom1);
    option = {
        title: {
            // text: '折线图堆叠',
            textStyle: {
                color: '#fff',
                fontSize: '14px',
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            textStyle: {
                fontSize: 10,
                color: '#ccc'
            },
            data: [{
                    name: '全局态势',
                    icon: 'rect',
                    color: 'red'
                },
                {
                    name: '威胁',
                    icon: 'rect',
                    color: 'aqua'
                },
                {
                    name: '防御',
                    icon: 'rect',
                    color: 'green'
                },
                {
                    name: '操作',
                    icon: 'rect',
                    color: 'blue'
                },
            ]
        },
        grid: {
            left: '15%',
            top: '20%',
            right: '20%',
            bottom: '20%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value',
            name: '最值',
            nameLocation: 'end',
            nameGap: 5,
            splitLine: false, //辅助线
            splitNumber: 5,
            max: 100,
            min: 0,
            nameTextStyle: {
                color: ' #fff',
                fontSize: 10,
                align: 'left'
            },
            boundaryGap: true, //折现与轴间距
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            }
        },
        series: [{
                name: '全局态势',
                type: 'line',
                stack: '总量',
                data: [20, 32, 10, 34, 0, 30, 10]
            },
            {
                name: '威胁',
                type: 'line',
                stack: '总量',
                data: [22, 2, 11, 24, 9, 30, 31]
            },
            {
                name: '防御',
                type: 'line',
                stack: '总量',
                data: [5, 32, 21, 14, 10, 30, 41]
            },
            {
                name: '操作',
                type: 'line',
                stack: '总量',
                data: [32, 32, 1, 34, 15, 30, 32]
            }
        ]
    };

    if (option && typeof option === "object") {
        myChart1.setOption(option, true);
        window.onresize = myChart1.resize;
    }
}

function initChart2() {
    var dom = document.getElementById("chart-2");
    var myChart2 = echarts.init(dom);
    var option = {
        title: {
            text: '保密系统更新率',
            bottom: '8%',
            left:'25%',
            textStyle: {
                fontSize: 14,
                color: '#fff',
                align: 'center',
                verticalAlign:'bottom',
            }
        },
        series: [{
            type: 'liquidFill',
            radius: '85%',
            data: [0.5, 0.45, 0.4, 0.3],
            // 水球颜色
            color: ['#FE5555', '#F07581', '#FB5E61'],
            center: ['57%', '40%'],
            outline: {
                // show: false
                borderDistance: 5,
                itemStyle: {
                    borderWidth: 2,
                    borderColor: '#13FDCE',
                },
            },
            backgroundStyle: { //背景颜色设置
                // color: new echarts.graphic.RadialGradient(['center','red', 'blue']),
                opacity: 0.4
            },
                    // "#160f64",
            label: {
                normal: {
                    color: '#fff',
                    insideColor: '#ccc',
                    fontSize: 25,
                    position :['50%','30%']
                }
            }
        }]
    };
    if (option && typeof option === "object") {
        myChart2.setOption(option, true);
        window.onresize = myChart2.resize;
    }
}

function initChart3() {
    var dom = document.getElementById("chart-3");
    var myChart3 = echarts.init(dom);
    var option = {
        title: {
            text: '文件系统更新率',
            bottom: '8%',
            left:'25%',
            textStyle: {
                fontSize: 14,
                color: '#fff',
                align: 'center',
                verticalAlign:'bottom',
            }
        },
        series: [{
            type: 'liquidFill',
            name: 'hello chiana',
            radius: '85%',
            center: ['57%', '40%'],
            color: ['#661fca','#4a19a1'],
            data: [0.45,0.44],
            outline: { //外边框样式
                show: true,
                borderDistance: 5,
                itemStyle: {
                    color: 'none',
                    borderColor: '#203487',
                    borderWidth: 2,
                    shadowBlur: 20,
                    shadowColor: 'rgba(0, 0, 0, 0.25)'
                }
            },
            backgroundStyle: { //背景颜色设置
                color:"#160f64",
                opacity: 0.4
            },
            // itemStyle: {
            //     opacity: 0.95,
            //     shadowBlur: 50,
            //     shadowColor: 'rgba(0, 0, 0, 1)'
            // },
            // emphasis: {
            //     itemStyle: {
            //         opacity: 0.8
            //     }
            // },
            label: { //标签样式
                normal: {
                    color: '#fff',
                    insideColor: '#ccc',
                    fontSize: 25,
                    position :['50%','30%']
                }
            }
        }]
    };
    if (option && typeof option === "object") {
        myChart3.setOption(option, true);
        window.onresize = myChart3.resize;
    }
}
// chart5
function drawChart5() {
    var dom = document.getElementById("chart-5");
    var myChart5 = echarts.init(dom);
    option = null;
    var echartData = [{
        value: 50,
        name: '交卷时间'
    }, {
        value: 50,
        name: '未交卷时间'
    }];
    var innerColor = '#2bff8f';
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
                radius: ['75%', '67.5%'],
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
                        formatter: function(params) {
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
                radius: ['67.5%', '55%'],
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
            }
        ],
    };
    if (option && typeof option === "object") {
        myChart5.setOption(option, true);
        window.onresize = myChart5.resize;
    }
}
// chart6
function drawChart6() {
    var dom = document.getElementById("chart-6");
    var myChart6 = echarts.init(dom);
    option = null;
    var echartData = [{
        value: 50,
        name: '交卷时间'
    }, {
        value: 50,
        name: '未交卷时间'
    }];
    var innerColor = '#2bff8f';
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
                radius: ['75%', '67.5%'],
                itemStyle: {
                    normal: {
                        color: innerColor
                    }
                },
                data: [{
                    value: 50,
                    name: '',
                }],
                label: {
                    normal: {
                        formatter: function(params) {
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
                radius: ['67.5%', '55%'],
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
            }
        ],
    };
    if (option && typeof option === "object") {
        myChart6.setOption(option, true);
        window.onresize = myChart6.resize;
    }
}