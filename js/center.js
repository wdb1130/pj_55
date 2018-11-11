$(function () {
    drawChart1();
    drawChart2();
    drawChart3();
    drawChart4();
    drawChart5();
});
// chart1
function drawChart1() {
    var dom1 = document.getElementById("chart1");
    var myChart1 = echarts.init(dom1);
    option = null;
    option = {
        color: ["#37A2DA", "#32C5E9", "#67E0E3"],
        series: [{
            name: '业务指标',
            type: 'gauge',
            detail: {
                formatter: '{value}%'
            },
            axisLine: {
                show: true,
                lineStyle: {
                    width: 30,
                    shadowBlur: 0,
                    color: [
                        [0.3, '#67e0e3'],
                        [0.7, '#37a2da'],
                        [1, '#fd666d']
                    ]
                }
            },
            data: [{
                value: 50,
                name: '完成率',
            }]

        }]
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
        xAxis: {
            data: ['Sun', 'Mon', 'Tue', 'Wed']
        },
        yAxis: {},
        series: [{
            type: 'bar',
            barWidth: 37,
            itemStyle: {
                normal: {
                    borderWidth: 1,
                    borderColor: '#18CEE2',
                    barBorderRadius: 28,
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 1, 0,
                        [
                            { offset: 0, color: '#2dc3db' },
                            { offset: 1, color: '#0f88c0' }
                        ]
                    )
                },
                emphasis: {
                    barBorderRadius: 13,
                    shadowBlur: 18,
                    shadowColor: 'rgba(218,170, 58, 0.7)'
                }
            },
            data: [220, 182, 191, 234]
        }, {
            name: 'a',
            tooltip: {
                show: false
            },
            type: 'pictorialBar',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 1, 0,
                        [
                            { offset: 0, color: '#2bc6dd' },
                            { offset: 1, color: '#18cde1' }
                        ]
                    ),
                    borderWidth: 1,
                    borderColor: '#18CEE2'
                }
            },
            symbol: 'circle',
            symbolSize: ['38', '22'],
            symbolPosition: 'end',
            data: [220, 182, 191, 234],
            z: 3
        }]
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
        color: ['#f00'],
        radar: {
            indicator: [{
                name: '低危用户',
                max: 100
            }, {
                name: '中危用户',
                max: 100
            }, {
                name: '极高危用户',
                max: 100
            }, {
                name: '高危用户',
                max: 100
            }]
        },
        series: [{
            name: '',
            type: 'radar',
            data: [{
                value: [23, 55, 82, 12]
            }]
        }]
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
    option = {
        title: {
            text: '',
            x: 'center',
            y: 0,
            textStyle: {
                color: '#3259B8',
                fontSize: 16,
                fontWeight: 'normal',
            }
        },
        visualMap: {
            min: 15202,
            max: 159980,
            dimension: 1,
            left: 'right',
            top: 'top',
            text: ['HIGH', 'LOW'], // 文本，默认为数值文本
            calculable: true,
            itemWidth: 18,
            itemHeight: 160,
            textStyle: {
                color: '#3259B8',
                height: 56,
                fontSize: 11,
                lineHeight: 60,
            },
            inRange: {
                color: ['#3EACE5', '#F02FC2']
            },
            padding: [50, 20],
            orient: 'horizontal',
        },
        grid: {
            left: '5%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        tooltip: {
            trigger: 'item',
            showDelay: 0,
            formatter: function (params) {
                if (params.value.length > 1) {
                    return 'Area: ' +
                        params.value[0] + '㎡<br/> ' + 'House price: ' +
                        params.value[1] + ' CNY/㎡ ';
                } else {
                    return params.seriesName + ' :<br/>' +
                        params.name + ' : ' +
                        params.value + ' CNY/㎡ ';
                }
            },
            axisPointer: {
                show: true,
                type: 'cross',
                lineStyle: {
                    type: 'dashed',
                    width: 1
                }
            }
        },
        xAxis: [{
            type: 'value',
            scale: true,
            axisLabel: {
                formatter: '{value} m'
            },
            nameTextStyle: {
                color: '#3259B8',
                fontSize: 14,
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                lineStyle: {
                    color: '#3259B8',
                }
            },
            splitLine: {
                show: false,
            }
        }],
        yAxis: [{
            type: 'value',
            scale: true,
            axisLabel: {
                formatter: '{value} CNY/㎡'
            },
            nameTextStyle: {
                color: '#3259B8',
                fontSize: 14
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                lineStyle: {
                    color: '#3259B8',
                }
            },
            splitLine: {
                show: false,
            }
        }],
        series: [{
            name: 'price-area',
            type: 'scatter',
            data: [
                [25.94, 142637],
                [25.71, 60288],
                [25.52, 118731],
                [24.37, 123103],
                [23.8, 126051],
                [23.75, 91790],
                [22.5, 132000],
                [22.04, 136117],
                [20.28, 53255],
                [18.78, 22365],
                [18.78, 23430],
                [18.06, 25471],
            ],
            symbolSize: 4,
        }]
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
        title: {
            text: '',
            textStyle: {
                fontWeight: 'normal',
                fontSize: 16,
                color: '#F1F1F3'
            },
            left: '6%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#57617B'
                }
            }
        },
        legend: {
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: ['南宁-曼芭', '桂林-曼芭', '南宁-甲米'],
            right: '4%',
            textStyle: {
                fontSize: 12,
                color: '#F1F1F3'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    color: '#57617B'
                }
            },
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }],
        yAxis: [{
            type: 'value',
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#57617B'
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
            name: '南宁-曼芭',
            type: 'line',
            lineStyle: {
                normal: {
                    width: 1
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(137, 189, 27, 0.3)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(137, 189, 27, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgb(137,189,27)'
                }
            },
            data: [96.3, 96.4, 97.5, 95.6, 98.1, 94.8, 89.6, 94.1, 80.1, 52.4, 75.8, 94.7]
        }, {
            name: '桂林-曼芭',
            type: 'line',
            lineStyle: {
                normal: {
                    width: 1
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(0, 136, 212, 0.3)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(0, 136, 212, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgb(0,136,212)'
                }
            },
            data: [97.3, 99.2, 99.3, 100.0, 99.6, 90.6, 80.0, 91.5, 69.8, 67.5, 90.4, 84.9]
        }, {
            name: '南宁-甲米',
            type: 'line',
            lineStyle: {
                normal: {
                    width: 1
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(219, 50, 51, 0.3)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(219, 50, 51, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgb(219,50,51)'
                }
            },
            data: [84.2, 81.0, 67.5, 72.1, 43.7, 88.5, 91.9, 101.8, 79.7, 87.6, 92.9, 0]
        },]
    };
    if (option && typeof option === "object") {
        myChart5.setOption(option, true);
        window.onresize = myChart5.resize;
    }
}