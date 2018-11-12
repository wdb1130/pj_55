$(function () {
    drawChart1();
    drawChart3();
    drawChart4();
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
function drawChart3() {
    var dom3 = document.getElementById("chart3");
    var myChart3 = echarts.init(dom3);
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
            x: 0,
            y: 10,
            x2: 20,
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
            data: ['湖北省', '湖南省', '广东省'],
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
            barWidth : 20,
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
            data: [22, 33, 88]
        }]
    };
    if (option && typeof option === "object") {
        myChart3.setOption(option, true);
        window.onresize = myChart3.resize;
    }
}
function drawChart4() {
    var dom4 = document.getElementById("chart4");
    var myChart4 = echarts.init(dom4);
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
            x: 0,
            y: 10,
            x2: 20,
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
            data: ['湖北省', '湖南省'],
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
            barWidth : 20,
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
            data: [22, 33]
        }]
    };
    if (option && typeof option === "object") {
        myChart4.setOption(option, true);
        window.onresize = myChart4.resize;
    }
}