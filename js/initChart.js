var initChartFun = {
    // 折线图
    drawLine: function (dom, postModalData) {
        var dom = document.getElementById(dom);
        var myChart = echarts.init(dom);
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
                data: postModalData[0],
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
                data: postModalData[1]
            }],
            yAxis: [{
                type: 'value',
                name: '量值',
                max: 100,
                min: -100,
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
            series: postModalData[2]
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
            window.onresize = myChart.resize;
        }
    },
    // 横向柱状图
    drawHorizontalBar: function (dom, postModalData) {
        var dom = document.getElementById(dom);
        var myChart = echarts.init(dom);
        option = null;
        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: "{b} : {c}%"
            },
            grid: {
                x: 0,
                y: 10,
                x2: 20,
                y2: 20,
                containLabel: true
            },
            xAxis: {
                type: 'value',
                min: 0,
                max: 100,
                interval: 20,
                axisLabel: {
                    formatter: '{value}%',
                    textStyle: {
                        fontWeight: '80'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#135Bff'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#57617B'
                    }
                }
            },
            yAxis: {
                type: 'category',
                data: postModalData[0],
                axisLine: {
                    lineStyle: {
                        color: '#135Bff'
                    }
                },
                axisLabel: {
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
                data: postModalData[1],
                barMaxWidth: '20',
                itemStyle: {
                    normal: {
                        color: function (params) {
                            var colorList = postModalData[2];
                            return colorList[params.dataIndex]
                        }
                    }
                }
            }]
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
            window.onresize = myChart.resize;
        }
    },
    // 纵向柱状图
    drawVerticalBar: function (dom, postModalData) {
        var dom = document.getElementById(dom);
        var myChart = echarts.init(dom);
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
                x: 'left',
                y: 'center',
                data: postModalData[0]
            },
            grid: {
                x: 100,
                y: 15,
                x2: 0,
                y2: 0,
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: postModalData[1]
                }
            ],
            yAxis: [
                {
                    min: 0,
                    max: 100,
                    type: 'value'
                }
            ],
            series: postModalData[2]
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
            window.onresize = myChart.resize;
        }
    },
    // 圆形雷达图
    drawArcRadar: function (dom, postModalData) {
        var dom = document.getElementById(dom);
        var myChart = echarts.init(dom);
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
                shape: 'circle',
                name: {
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
                    symbol: 'rect',
                    symbolSize: 0,
                    areaStyle: {
                        normal: {
                            color: 'rgba(255, 255, 0, 0.5)'
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: 'rgba(255, 255, 0, 0.5)',
                            type: 'solid',
                            width: 0
                        }
                    }
                }]
            }]
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
            window.onresize = myChart.resize;
        }
    },
    // 方形雷达图
    drawRectRadar: function () {

    }
};