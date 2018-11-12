$(function () {
    drawChart1();
    drawChart2();
    drawChart3();
});
// chart1
function drawChart1() {
    var dom1 = document.getElementById("chart1");
    var myChart1 = echarts.init(dom1);
    option = null;
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            right: '10%',
            textStyle: {
                color: '#ccc'
            },
            data: ['直接访问', '邮件营销']
        },
        grid: {
            x: 20,
            y: 40,
            x2: 20,
            y2: 20,
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['周一', '周二', '周三', '周四'],
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
                }
            }
        ],
        yAxis: [{
            type: 'value',
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
                show: true,
                lineStyle: {
                    color: '#09206F'
                }
            }
        }],
        series: [
            {
                name: '直接访问',
                type: 'bar',
                barWidth: 20,
                data: [320, 332, 110, 230]
            },
            {
                name: '邮件营销',
                type: 'bar',
                stack: '广告',
                barWidth: 20,
                data: [120, 132, 103, 240]
            }
        ]
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
        myChart2.setOption(option, true);
        window.onresize = myChart2.resize;
    }
}
// chart3
function drawChart3() {
    var dom3 = document.getElementById("chart3");
    var myChart3 = echarts.init(dom3);
    option = null;
    var color = ['#fb734e', '#e32f46', '#94d96c', '#0bbcb7', '#1a9bfc', '#7049f0'];
    var dataStyle = {
        normal: {
            label: {
                show: false
            },
            labelLine: {
                show: false
            },
            shadowBlur: 40,
            borderWidth: 10,
            shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
        }
    };
    var placeHolderStyle = {
        normal: {
            color: '#393d50',
            label: {
                show: false
            },
            labelLine: {
                show: false
            }
        },
        emphasis: {
            color: '#393d50'
        }
    };
    option = {
        tooltip: {
            trigger: 'item',
            show: true,
            formatter: "{b} : <br/>{d}%",
            backgroundColor: 'rgba(0,0,0,0.7)', // 背景
            padding: [8, 10], //内边距
            extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
        },
        legend: {
            orient: 'vertical',
            // icon: 'circle',
            left: '5%',
            top: 'center',
            itemGap: 20,
            data: ['二级匹配度', '三级匹配度', '四级匹配度', '04', '05', '06'],
            textStyle: {
                color: '#fft'
            }
        },
        series: [{
            name: 'Line 1',
            type: 'pie',
            clockWise: true,
            radius: ['70%', '75%'],
            center: ['60%', '50%'],
            itemStyle: dataStyle,
            hoverAnimation: true,
            startAngle: 90,
            label: {
                borderRadius: '10',
            },
            data: [{
                value: 50,
                name: '四级匹配度',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: color[0]
                        }, {
                            offset: 1,
                            color: color[1]
                        }])
                    }
                }
            },
            {
                value: 50,
                name: '',
                tooltip: {
                    show: false
                },
                itemStyle: placeHolderStyle
            },
            ]
        },
        {
            name: 'Line 2',
            type: 'pie',
            clockWise: true,
            radius: ['55%', '60%'],
            center: ['60%', '50%'],
            itemStyle: dataStyle,
            hoverAnimation: true,
            startAngle: 90,
            data: [{
                value: 30,
                name: '三级匹配度',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: color[2]
                        }, {
                            offset: 1,
                            color: color[3]
                        }])
                    }
                }
            },
            {
                value: 70,
                name: '',
                tooltip: {
                    show: false
                },
                itemStyle: placeHolderStyle
            },
            ]
        },
        {
            name: 'Line 3',
            type: 'pie',
            clockWise: true,
            radius: ['40%', '45%'],
            center: ['60%', '50%'],
            itemStyle: dataStyle,
            hoverAnimation: true,
            startAngle: 90,
            data: [{
                value: 30,
                name: '二级匹配度',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: color[4]
                        }, {
                            offset: 1,
                            color: color[5]
                        }]),
                    }
                }
            },
            {
                value: 70,
                name: '',
                tooltip: {
                    show: false
                },
                itemStyle: placeHolderStyle
            },
            ]
        }
        ]
    };
    if (option && typeof option === "object") {
        myChart3.setOption(option, true);
        window.onresize = myChart3.resize;
    }
}