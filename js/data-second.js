var chartTypeState;
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
            var othis = $(this), method = othis.data('method');
            active[method] ? active[method].call(this, othis) : '';
        });
    });


    setTimeout(function(){
        initChartFun.drawLine('chart1');
        initChartFun.drawHorizontalBar('chart2')
    },1000)


    drawChart3();
    drawChart4();
    drawChart5();
});

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
            orient: 'vertical',
            x: 'left',
            y: 'center',
            data: ['直接访问', '邮件营销', '搜索引擎', '百度一下']
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
            },
            {
                name: '百度一下',
                type: 'bar',
                barWidth: 20,
                data: [862, 118],
            }
        ]
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
                text: '参数四',
                max: 100
            }],
            radius: '65%',
            center: ['50%', '50%'],
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