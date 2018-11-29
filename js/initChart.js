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
            grid: {
                top: 50,
                left: '15%',
                right: '10%',
                bottom: 30,
            },
            xAxis: [{
                boundaryGap: true,
                axisLine: {
                    lineStyle: {
                        color: '#1255F0'
                    }
                },
                axisLabel: {
                    show: true,
                    interval: 0,
                    textStyle: {
                        color: '#8ECEEE'
                    }
                },
                data: postModalData[1]
            }],
            yAxis: [{
                type: 'value',
                name: '(量值)',
                max: 100,
                min: -100,
                nameTextStyle: { //最值样式
                    color: '#8ECEEE'
                },
                axisTick: { //y轴刻度隐藏
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#8ECEEE'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#1941B3'
                    },
                },
                axisLabel: {
                    color: '#8ECEEE',
                },
                splitLine: {
                    lineStyle: {
                        color: '#121C64'
                    }
                },
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
                axisTick: { //y轴刻度隐藏
                    show: false
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
    // 纵向柱状图(单独)
    drawVerticalSingleBar: function (dom, postModalData) {
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
                    data: postModalData[0],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    min: 0,
                    max: 100,
                    axisTick: { //y轴刻度隐藏
                        show: false
                    },
                    type: 'value'
                }
            ],
            series: [
                {
                    type: 'bar',
                    barWidth: '20',
                    data: postModalData[1],
                    itemStyle: {
                        normal: {
                            color: function (params) {
                                var colorList = postModalData[2];
                                return colorList[params.dataIndex]
                            }
                        }
                    },
                }
            ]
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
            window.onresize = myChart.resize;
        }
    },
    // 纵向柱状图(合并、legend竖)
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
                y: '10%',
                itemGap: 30,
                data: postModalData[0],
                textStyle: {
                    color: '#fff'
                }
            },
            grid: {
                x: 100,
                y: 15,
                x2: 0,
                y2: 10,
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    axisLine: {
                        lineStyle: {
                            color: '#1941B3'
                        },
                    },
                    axisLabel: {
                        color: '#ddd',
                        fontSize: 16
                    },
                    data: postModalData[1]
                }
            ],
            yAxis: [
                {
                    min: 0,
                    max: 100,
                    type: 'value',
                    name: '(量值)',
                    axisLine: {
                        lineStyle: {
                            color: '#1941B3'
                        },
                    },
                    axisTick: { //y轴刻度隐藏
                        show: false
                    },
                    axisLabel: {
                        color: '#ddd'
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#121C64'
                        }
                    }
                }
            ],
            series: postModalData[2]
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
            window.onresize = myChart.resize;
        }
    },
    // 纵向柱状图(合并、legend横)
    drawVerticalBarH: function (dom, postModalData) {
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
                right: '10%',
                textStyle: {
                    color: '#ccc'
                },
                data: postModalData[0]
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
                    data: postModalData[1],
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
                min: 0,
                max: 100,
                axisLine: {
                    lineStyle: {
                        color: '#1255F0'
                    }
                },
                axisTick: { //y轴刻度隐藏
                    show: false
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
                indicator: postModalData[0],
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
                areaStyle: {
                    normal: {
                        opacity: 0.9
                    }
                },
                data: [{
                    value: postModalData[1],
                    symbol: 'rect',
                    symbolSize: 0,
                    areaStyle: {
                        normal: {
                            color: postModalData[2]
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: postModalData[2],
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
    drawRectRadar: function (dom, postModalData) {
        var dom = document.getElementById(dom);
        var myChart = echarts.init(dom);
        option = null;
        option = {
            radar: [{
                indicator: postModalData[0],
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
                areaStyle: {
                    normal: {
                        opacity: 0.9
                    }
                },
                data: [{
                    value: postModalData[1],
                    symbol: 'rect',
                    symbolSize: 0,
                    areaStyle: {
                        normal: {
                            color: postModalData[2]
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
            myChart.setOption(option, true);
            window.onresize = myChart.resize;
        }
    },
    // 内中外三环圆环图
    drawRing: function (dom, postModalData) {
        var dom = document.getElementById(dom);
        var myChart = echarts.init(dom);
        option = null;
        option = {
            tooltip: {
                trigger: 'item',
                show: true,
                formatter: "{b} : {d}%",
            },
            legend: {
                orient: 'vertical',
                left: '2%',
                top: 'center',
                itemGap: 30,
                data: postModalData[0],
                textStyle: {
                    color: '#fff'
                }
            },
            series: postModalData[1]
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
            window.onresize = myChart.resize;
        }
    },
    // 部分比例圆环
    drawPartRing: function (dom, postModalData) {
        var dom = document.getElementById(dom);
        var myChart = echarts.init(dom);
        option = null;
        var echartData = postModalData[1];
        var outColor = postModalData[2]; //最外层圆环边框颜色 
        var startColor = postModalData[2]; //最大内层圆环填充颜色
        var endColor = postModalData[2]; //最大内层圆环填充颜色 
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
        option = {
            title: [{
                text: postModalData[0],
                x: '50%',
                y: '80%',
                textAlign: 'center',
                textStyle: {
                    color: '#fff',
                    textAlign: 'center',
                    fontSize: '120%'
                },
            }],
            series: [
                {
                    name: 'Line 0',
                    type: 'pie',
                    clockWise: true,
                    hoverAnimation: false,
                    center: ['50%', '40%'],
                    radius: ['50%', '51.5%'],
                    itemStyle: {
                        normal: {
                            color: 'transparent'
                        }
                    },
                    data: [{
                        value: 0,
                        name: '',
                    }],
                    label: {
                        normal: {
                            formatter: function () {
                                var time = echartData[0].value;
                                return '{time|' + time + '%}';
                            },
                            position: 'center',
                            textStyle: {
                                fontSize: 38 * scale,
                                fontWeight: 'bold'
                            },
                            rich: {
                                time: {
                                    color: '#fff',
                                    fontSize: 20 * scale,
                                    padding: [0, 0],
                                    fontWeight: 'bold'
                                }
                            }
                        }
                    }
                },
                {
                    name: 'Line 1',
                    type: 'pie',
                    clockWise: true,
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
                    clockWise: true,
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
                        value: 0,
                        name: '',

                    }]
                }
            ],
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
            window.onresize = myChart.resize;
            return myChart;
        }
    },
    // 空心圆环图
    drawHollowRing: function (dom, postModalData) {
        var dom = document.getElementById(dom);
        var myChart = echarts.init(dom);
        option = null;
        option = {
            tooltip: {
                trigger: 'item',
                formatter: "{b}: {c} ({d}%)"
            },
            title: {
                text: postModalData[0],
                left: 'center',
                top: 'center',
                textStyle: {
                    fontSize: '80%',
                    color: '#fff'
                }
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: ['40%', '55%'],
                    label: {
                        normal: {
                            formatter: '{b}:{c}: ({d}%)',
                            textStyle: {
                                color: '#fff',
                                fontWeight: 'normal',
                                fontSize: 12
                            }
                        },
                    },
                    itemStyle: {
                        normal: {
                            color: function (params) {
                                var colorList = postModalData[2];
                                return colorList[params.dataIndex]
                            }
                        }
                    },
                    data: postModalData[1]
                }
            ]
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
            window.onresize = myChart.resize;
            return myChart;
        }
    },
    // 2半扇形状饼型图
    drawTwoFanPie: function (dom, postModalData) {
        var dom = document.getElementById(dom);
        var myChart = echarts.init(dom);
        option = {
            legend: {
                x: 'right',
                y: 'top',
                data: postModalData[0],
                textStyle: {
                    color: 'white'
                }
            },
            series: [{
                name: '',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: postModalData[1],
                roseType: 'radius',
                label: {
                    normal: {
                        position: 'inner',
                        formatter: "{c}%",
                        fontSize: 14,
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                color: postModalData[2],
                animationType: 'scale',
                animationEasing: 'elasticOut'
            }]
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
            window.onresize = myChart.resize;
        }
    },
    // 1个扇形状饼型图
    drawOneFanPie: function (dom, postModalData) {
        var dom = document.getElementById(dom);
        var myChart = echarts.init(dom);
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
                shadowColor: 'rgba(0, 0, 0, 0)'
            }
        };
        option = {
            title: {
                text: postModalData[1] + '%',
                x: 'center',
                y: 'center',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 24,
                    color: "#fff",
                }
            },
            tooltip: {
                trigger: 'item',
                show: true,
                formatter: "{b} : <br/>{d}%",
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: [8, 10]
            },
            series: [{
                name: 'Line 2',
                type: 'pie',
                clockWise: true,
                radius: ['0%', '80%'],
                center: ['50%', '50%'],
                itemStyle: dataStyle,
                hoverAnimation: false,
                startAngle: 90,
                data: [{
                    value: postModalData[1],
                    name: postModalData[0],
                    itemStyle: {
                        normal: {
                            color: postModalData[2][0],
                        }
                    }
                },
                {
                    value: 100 - postModalData[1],
                    name: '',
                    tooltip: {
                        show: false
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgba(255, 255, 255, .2)'//不改
                        }
                    }
                }
                ]
            },
            {
                name: 'Line 3',
                type: 'pie',
                clockWise: true,
                radius: ['40%', '40%'],
                center: ['50%', '50%'],
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        borderWidth: 1,
                        borderType: 'dashed',
                        borderColor: postModalData[2][1],
                    }
                },
                hoverAnimation: false,
                startAngle: 90,
                data: [{
                    value: postModalData[1],
                    name: postModalData[0],
                    itemStyle: {
                        normal: {
                            color: 'transparent',
                        }
                    }
                },
                {
                    value: 100 - postModalData[1],
                    name: '',
                    tooltip: {
                        show: false
                    },
                    itemStyle: {
                        normal: {
                            color: 'transparent'
                        }
                    }
                }
                ]
            },
            {
                name: 'Line 3',
                type: 'pie',
                clockWise: true,
                radius: ['45%', '60%'],
                center: ['50%', '50%'],
                itemStyle: dataStyle,
                hoverAnimation: false,
                startAngle: 90,
                data: [{
                    value: postModalData[1],
                    name: postModalData[0],
                    itemStyle: {
                        normal: {
                            color: postModalData[2][1],
                        }
                    }
                },
                {
                    value: 100 - postModalData[1],
                    name: '',
                    tooltip: {
                        show: false
                    },
                    itemStyle: {
                        normal: {
                            color: postModalData[2][1]
                        }
                    }
                }
                ]
            }
            ]
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
            window.onresize = myChart.resize;
        }
    },
    // 水球图
    drawLiquidFill: function (dom, postModalData) {
        var dom = document.getElementById(dom);
        var myChart = echarts.init(dom);
        var option = {
            title: {
                text: postModalData[0],
                bottom: '4%',
                left: 'center',
                textStyle: {
                    fontSize: 14,
                    color: '#fff',
                    align: 'center',
                    verticalAlign: 'bottom',
                }
            },
            series: [{
                type: 'liquidFill',
                radius: '65%',
                data: [postModalData[1] / 100, postModalData[1] / 100 - 0.1],
                center: ['50%', '48%'],
                color: postModalData[2], // 水球颜色
                outline: {
                    borderDistance: 5,
                    itemStyle: {
                        borderWidth: 2,
                        borderColor: 'rgb(16,52,221)',
                    },
                },
                backgroundStyle: { //背景颜色设置
                    color: postModalData[3],
                    opacity: 0.4,
                },
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
            myChart.setOption(option, true);
            window.onresize = myChart.resize;
        }
    },
    //水球图css
    drawWaterBall: function (dom, val, legend) {
        var text = legend || '';
        var htmlStr =
            '<div class="water-wrapper center">' +
            '<div class="ball-border"> </div>' +
            '<div class="ball center">' +
            '<span class="water-value center">' + val + '%</span>' +
            '</div>' +
            '<div class="water center">' +
            '<img  id="bw_1" class="bw" src="../img/bw_1.png" />' +
            '<img  id="bw_2" class="bw" src="../img/bw_2.png" />' +
            '</div>' +
            '<div class="legend">' + text + '</div>' +
            '</div>';
        $('#' + dom).html(htmlStr);
        $('#' + dom).find('.bw').css('top', (100 - val) + '%');

        var w = $('#' + dom).find('.water-wrapper').css('height');
        $('#' + dom).find('.water-wrapper').css('width', w);
    },
    //仪表图css
    drawMeterPointer: function (dom, val) {
        var valArr = (val + '').split("");
        var showNum;
        if (valArr.length == 1) {
            showNum = "0 0 " + valArr[0];
        } else if (valArr.length == 2) {
            showNum = "0 " + valArr[0] + " " + valArr[1];
        } else {
            showNum = valArr[0] + " 0 0";
        }
        var htmlStr =
            '<div class="meter-box">' +
            '<img src="../img/pointer_arc.png" alt="">' +
            '<p class="font-num">' + showNum + '</p>' +
            '</div>';
        var degSingle = 2.6; //大约1间隔度数
        var deg = (val - 50) * degSingle;
        $('#' + dom).html(htmlStr);
        setTimeout(function () {
            $('.meter-box>img').css('transform', 'rotate(' + deg + 'deg)');
        }, 300)
    },
    // 渐变背景折线图
    drawGradientLine: function (dom, postModalData) {
        var dom = document.getElementById(dom);
        var myChart = echarts.init(dom);
        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#0D53A2'
                    }
                }
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
            grid: {
                left: '0%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                boundaryGap: true,
                axisLine: {
                    lineStyle: {
                        color: '#0D53A2'
                    }
                },
                data: postModalData[1]
            }],
            yAxis: [{
                type: 'value',
                name: '(量值)',
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#0D53A2'
                    }
                },
                axisTick: { //y轴刻度隐藏
                    show: false
                },
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        fontSize: 14
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#0D53A2'
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
    // 散点图
    drawScatter: function (dom, postModalData) {
        var dom = document.getElementById(dom);
        var myChart = echarts.init(dom);
        option = {
            visualMap: {
                min: 0,
                max: 100,
                dimension: 1,
                left: 'right',
                top: 'top',
                text: ['高', '低'],
                calculable: true,
                itemWidth: 10,
                itemHeight: 100,
                textStyle: {
                    color: '#ccc',
                    fontSize: 11
                },
                inRange: {
                    color: postModalData[1]
                },
                padding: [10, 20],
                orient: 'horizontal',
            },
            grid: {
                left: '0%',
                right: '15%',
                bottom: '0%',
                containLabel: true
            },
            tooltip: {
                trigger: 'item',
                showDelay: 0,
                formatter: function (params) {
                    if (params.value.length > 1) {
                        return '主机: ' +
                            params.value[0] + '<br/> ' + '风险值: ' +
                            params.value[1];
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
                name: '(主机)',
                scale: true,
                min: 0,
                max: 100,
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
                name: '(风险值)',
                scale: true,
                min: 0,
                max: 100,
                axisTick: {
                    show: false,
                },
                axisLine: {
                    lineStyle: {
                        color: '#3259B8',
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#09206F'
                    }
                }
            }],
            series: [{
                name: 'price-area',
                type: 'scatter',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                data: postModalData[0],
                symbolSize: 4,
            }]
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
            window.onresize = myChart.resize;
        }
    },
    //3d圆柱图
    draw3DCylinder: function (dom, postModalData) {
        var chart = AmCharts.makeChart(dom, {
            "theme": "light",
            "type": "serial",
            "startDuration": 2,
            "dataProvider": postModalData[0],
            "valueAxes": [{
                "position": "left",
                "color": "#A4C1E4",
                "title": "",
                "axisColor": "#0D53A2",
                "minimum": 0,
                "maximum": 100,
                "gridColor": '#0D53A2'
            }],
            "graphs": [{
                "balloonText": "[[category]]: <b>[[value]]</b>",
                "colorField": "color",
                "fillAlphas": 0.85,
                "lineAlpha": 0.1,
                "type": "column",
                "topRadius": 1,
                "valueField": "value",
                "labelText": "[[value]]",
                "color": "#fff"
            }],
            "depth3D": 20,
            "angle": 30,
            "columnWidth": 0.4,
            "chartCursor": {
                "categoryBalloonEnabled": false,
                "cursorAlpha": 0,
                "zoomable": false
            },
            "categoryField": "title",
            "categoryAxis": {
                "gridPosition": "start",
                "color": "#A4C1E4",
                "labelRotation": 0,
                "axisColor": "#0D53A2",
                "gridColor": '#0D53A2'
            },
            "export": {
                "enabled": true
            }
        }, 0);
    },
    // 3d柱状图（纵向）
    draw3DCylinderV: function (dom, postModalData) {
        var chart = AmCharts.makeChart(dom, {
            "theme": "light",
            "type": "serial",
            "startDuration": 2,
            "dataProvider": postModalData[0],
            "valueAxes": [{
                "position": "left",
                "color": "#A4C1E4",
                "title": "",
                "axisColor": "#0D53A2",
                "minimum": 0,
                "maximum": 100,
                "gridColor": '#0D53A2'
            }],
            "graphs": [{
                "balloonText": "[[category]]: <b>[[value]]</b>",
                "fillColorsField": "color",
                "fillAlphas": 1,
                "lineAlpha": 0.1,
                "type": "column",
                "valueField": "value",
                "labelText": "[[value]]",
                "color": "#fff"
            }],
            "depth3D": 15,
            "angle": 30,
            "columnWidth": 0.3,
            "rotate": false,
            "chartCursor": {
                "categoryBalloonEnabled": false,
                "cursorAlpha": 0,
                "zoomable": false
            },
            "categoryField": "title",
            "categoryAxis": {
                "gridPosition": "start",
                "color": "#A4C1E4",
                "labelRotation": 0,
                "axisColor": "#0D53A2",
                "gridColor": '#0D53A2'
            },
            "export": {
                "enabled": true
            }
        });
    },
    // 3d柱状图（横向）
    draw3DCylinderH: function (dom, postModalData) {
        var chart = AmCharts.makeChart(dom, {
            "theme": "light",
            "type": "serial",
            "startDuration": 2,
            "dataProvider": postModalData[0],
            "valueAxes": [{
                "position": "left",
                "color": "#8DA1C9",
                "title": "",
                "axisColor": "#0D53A2",
                "minimum": 0,
                "maximum": 100,
                "gridColor": '#0D53A2'
            }],
            "graphs": [{
                "balloonText": "[[category]]: <b>[[value]]</b>",
                "fillColorsField": "color",
                "fillAlphas": 1,
                "lineAlpha": 0.1,
                "type": "column",
                "valueField": "value",
                "labelText": "[[value]]",
                "color": "#fff"
            }],
            "depth3D": 15,
            "angle": 30,
            "columnWidth": 0.5,
            "rotate": true,
            "chartCursor": {
                "categoryBalloonEnabled": false,
                "cursorAlpha": 0,
                "zoomable": false
            },
            "categoryField": "title",
            "categoryAxis": {
                "gridPosition": "start",
                "color": "#A4C1E4",
                "labelRotation": 0,
                "axisColor": "#0D53A2",
                "gridColor": '#0D53A2'
            },
            "export": {
                "enabled": true
            }
        });
    }
};
