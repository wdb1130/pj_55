// chart5
$(function() {
    initChart1();
    initChart2();
    initChart3();
    initChart4();
    initChart5();
    initChart6();
    initChart7();
    initChart8();
})


function initChart1() {
    var dom = document.getElementById("chart1");
    var myChart1 = echarts.init(dom);
    var option = {
        series: [{
            type: 'liquidFill',
            radius: '65%',
            data: [0.5, 0.45],
            // 水球颜色
            color: ['#FE5555', '#F07581'],
            center: ['50%', '55ß%'],
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
                opacity: 0.4,

            },
            // "#160f64",
            label: {
                normal: {
                    color: '#fff',
                    insideColor: '#ccc',
                    fontSize: 25,
                    position: ['50%', '30%']
                }
            }
        }]
    };
    if (option && typeof option === "object") {
        myChart1.setOption(option, true);
        window.onresize = myChart1.resize;
    }
}

function initChart2() {
    var dom = document.getElementById("chart2");
    var myChart2 = echarts.init(dom);
    var option = {
        color: ['red', 'green'],
        series: [{
            name: '项目详情',
            type: 'pie',
            radius: '65%',
            center: ['50%', '55%'],
            data: [{
                    value: 60,
                    name: '已完成项目'
                }, {
                    value: 40,
                    name: '未完成项目'
                },

            ],
            itemStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: 'red'
                    }, {
                        offset: 1,
                        color: 'blue'
                    }]
                },
                emphasis: {
                    show: true,
                    fontSize: '20',
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            label: {
                normal: {
                    position: 'inner',
                    formatter: "{c}%",
                    fontSize: 20,
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '20',
                        fontWeight: 'bold'
                    }
                },
            },
        }]
    };
    if (option && typeof option === "object") {
        myChart2.setOption(option, true);
        window.onresize = myChart2.resize;
    }
}

function initChart3() {
    var dom = document.getElementById("chart3");
    var myChart3 = echarts.init(dom);
    var option = {
        color: ['red', 'green'],
        series: [{
            name: '项目详情',
            type: 'pie',
            radius: '65%',
            center: ['50%', '55%'],
            data: [{
                    value: 60,
                    name: '已完成项目'
                }, {
                    value: 40,
                    name: '未完成项目'
                },

            ],
            itemStyle: {
                emphasis: {
                    show: true,
                    fontSize: '20',
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            label: {
                normal: {
                    position: 'inner',
                    formatter: "{c}%",
                    fontSize: 20,
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '20',
                        fontWeight: 'bold'
                    }
                },
            },
        }]
    };
    if (option && typeof option === "object") {
        myChart3.setOption(option, true);
        window.onresize = myChart3.resize;
    }
}

function initChart4() {
    var dom = document.getElementById("chart4");
    var myChart = echarts.init(dom);
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
            top: '20%',
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
            top: '35%',
            right: '15%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            axisLine: {
                lineStyle: {
                    color: 'blue'
                }
            },
            // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value',
            name: '最值',
            nameLocation: 'end',
            nameGap: 5,
            splitLine: false, //辅助线
            splitNumber: 20,
            max: 100,
            min: -100,
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
        myChart.setOption(option, true);
        window.onresize = myChart.resize;
    }
}

function initChart5() {
    var dom = document.getElementById("chart5");
    var myChart = echarts.init(dom);
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
        myChart.setOption(option, true);
        window.onresize = myChart.resize;
    }
}

function initChart6() {
    var dom = document.getElementById("chart6");
    var myChart = echarts.init(dom);
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
        myChart.setOption(option, true);
        window.onresize = myChart.resize;
    }
}

function initChart7() {
    var dom = document.getElementById("chart7");
    var myChart = echarts.init(dom);
    option = {
        series: [{
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
                { value: 55, name: '直接访问' },
                { value: 44, name: '邮件营销' }
            ].sort(function(a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
                normal: {
                    position: 'inner',
                    formatter: "{c}%",
                    // formatter: "{c}\n{b}",
                    fontSize: 14,
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            color: ['#9BD16F', '#D07070'],
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function(idx) {
                return Math.random() * 200;
            }
        }]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
        window.onresize = myChart.resize;
    }
}

function initChart8() {
    var dom = document.getElementById("chart8");
    var myChart = echarts.init(dom);
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        color: ['#e4393c', 'aqua'],
        legend: {
            right: '12%',
            top: '15%',
            textStyle: {
                color: '#ccc'
            },
            data: ['进入流量', '流出流量']
        },
        grid: {
            x: '15%',
            y: '25%%',
            x2: '15%',
            y2: '5%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            axisLine: {
                lineStyle: {
                    color: 'blue'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#ddd'
                }
            }
        }],
        yAxis: [{
            type: 'value',
            min: 0,
            max: 100,
            splitNumber: 10,
            axisLine: {
                lineStyle: {
                    color: '#1255F0'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#8ECEEE'
                }
            },
            splitLine: {
                show: false
            }
        }],
        series: [{
                name: '进入流量',
                type: 'bar',
                barWidth: 10,
                barGap: 0.3,
                data: [30, 32, 11, 20, 90, 22, 29]
            },
            {
                name: '流出流量',
                type: 'bar',
                // stack: '广告',
                barWidth: 10,
                data: [12, 12, 10, 40, 88, 99, 33]
            }
        ]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
        window.onresize = myChart.resize;
    }
}