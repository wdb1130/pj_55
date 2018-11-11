$(function () {
    drawChart2();
    drawChart3();
});
function drawChart2() {
    var dom2 = document.getElementById("chart2");
    var myChart2 = echarts.init(dom2);
    option = null;
    option = {
        legend: {
            data: ['病毒库更新率'],
            right: '10%',
            textStyle: {
                color: '#ccc'
            }
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
        },
        yAxis: {
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
        },
        series: [{
            symbol: 'circle',
            symbolSize: 6,
            name: '病毒库更新率',
            itemStyle: {
                normal: {
                    color: "#FF3838",
                    lineStyle: {
                        color: "#FF3838"
                    }
                }
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
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
        myChart3.setOption(option, true);
        window.onresize = myChart3.resize;
    }
}