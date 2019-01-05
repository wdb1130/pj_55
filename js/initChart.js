var fontSet = function(size, isBig) {
  var width = screen.width
  if (isBig && width < 2560) {
    //如果是小屏显示最小值，大屏正常值
    return 8
  } else if (isBig) {
    //4k不需要放大
    return size
  } else {
    //放大
    var fontSize = parseInt((size * width) / 1920)
    return fontSize
  }
}
var initChartFun = {
  // 折线图
  drawLine: function(dom, postModalData, isBig) {
    var baseSize = isBig === true ? 16 : 8
    var dom = document.getElementById(dom)
    var myChart = echarts.init(dom)
    option = null
    option = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        icon: 'rect',
        itemWidth: fontSet(24),
        itemHeight: fontSet(10),
        itemGap: fontSet(13),
        data: postModalData[0],
        right: '4%',
        textStyle: {
          color: '#95D9F8',
          fontSize: fontSet(12)
        }
      },
      grid: {
        top: '18%',
        left: '15%',
        right: '15%',
        bottom: '20%'
      },
      xAxis: [
        {
          name: '(时间)',
          nameTextStyle: {
            //最值样式
            color: '#95D9F8',
            fontSize: fontSet(baseSize, true)
          },
          boundaryGap: true,
          axisLine: {
            lineStyle: {
              color: '#135BFF'
            }
          },
          axisLabel: {
            show: true,
            interval: 0,
            textStyle: {
              color: '#95D9F8',
              fontSize: fontSet(baseSize, true)
            }
          },
          data: postModalData[1]
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '(量值)',
          max: 100,
          min: -100,
          splitNumber: 10,
          nameTextStyle: {
            //最值样式
            color: '#95D9F8',
            padding: [0, 40, 0, 0],
            fontSize: fontSet(baseSize, true)
          },
          axisTick: {
            //y轴刻度隐藏
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#135BFF'
            }
          },
          axisLabel: {
            color: '#95D9F8',
            textStyle: {
              color: '#95D9F8',
              fontSize: fontSet(baseSize, true)
            }
          },
          splitLine: {
            lineStyle: {
              color: '#09206F'
            }
          }
        }
      ],
      series: postModalData[2]
    }
    if (option && typeof option === 'object') {
      myChart.setOption(option, true)
      window.onresize = myChart.resize
    }
  },
  // 折线图（正值且一条线）
  drawPlusLine: function(dom, postModalData, isBig) {
    var baseSize = isBig === false ? 8 : 16
    var dom = document.getElementById(dom)
    var myChart = echarts.init(dom)
    option = null
    option = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        icon: 'rect',
        itemWidth: fontSet(24),
        itemHeight: fontSet(10),
        data: postModalData[0],
        right: '4%',
        textStyle: {
          color: '#95D9F8',
          fontSize: fontSet(12)
        }
      },
      grid: {
        top: '20%',
        left: '15%',
        right: '15%',
        bottom: '20%'
      },
      xAxis: [
        {
          name: '(时间)',
          nameTextStyle: {
            //最值样式
            color: '#95D9F8',
            fontSize: fontSet(baseSize, true)
          },
          boundaryGap: true,
          axisLine: {
            lineStyle: {
              color: '#135BFF'
            }
          },
          axisLabel: {
            show: true,
            interval: 0,
            textStyle: {
              color: '#95D9F8',
              fontSize: fontSet(baseSize, true)
            }
          },
          data: postModalData[1]
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '(量值)',
          max: 100,
          min: 0,
          splitNumber: 10,
          nameTextStyle: {
            //最值样式
            color: '#95D9F8',
            padding: [0, 50, 0, 0],
            fontSize: fontSet(baseSize, true)
          },
          axisTick: {
            //y轴刻度隐藏
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#135BFF'
            }
          },
          axisLabel: {
            color: '#95D9F8',
            textStyle: {
              color: '#95D9F8',
              fontSize: fontSet(baseSize, true)
            }
          },
          splitLine: {
            lineStyle: {
              color: '#09206F'
            }
          }
        }
      ],
      series: postModalData[2]
    }
    if (option && typeof option === 'object') {
      myChart.setOption(option, true)
      window.onresize = myChart.resize
    }
  },
  // 横向柱状图
  drawHorizontalBar: function(dom, postModalData) {
    var dom = document.getElementById(dom)
    var myChart = echarts.init(dom)
    option = null
    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: '{b} : {c}%'
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
            fontWeight: '80',
            fontSize: fontSet(12)
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
        axisTick: {
          //y轴刻度隐藏
          show: false
        },
        axisLabel: {
          interval: 0,
          rotate: 0,
          margin: 10,
          inside: false,
          textStyle: {
            fontWeight: '50',
            fontSize: fontSet(12)
          }
        }
      },
      series: [
        {
          type: 'bar',
          data: postModalData[1],
          barMaxWidth: '20',
          itemStyle: {
            normal: {
              color: function(params) {
                var colorList = postModalData[2]
                return colorList[params.dataIndex]
              }
            }
          }
        }
      ]
    }
    if (option && typeof option === 'object') {
      myChart.setOption(option, true)
      window.onresize = myChart.resize
    }
  },
  // 纵向柱状图(单独)
  drawVerticalSingleBar: function(dom, postModalData) {
    var dom = document.getElementById(dom)
    var myChart = echarts.init(dom)
    option = null
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
          axisTick: {
            //y轴刻度隐藏
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
              color: function(params) {
                var colorList = postModalData[2]
                return colorList[params.dataIndex]
              }
            }
          }
        }
      ]
    }
    if (option && typeof option === 'object') {
      myChart.setOption(option, true)
      window.onresize = myChart.resize
    }
  },
  // 纵向柱状图(合并、legend竖)
  drawVerticalBar: function(dom, postModalData, isBig) {
    var dom = document.getElementById(dom)
    var myChart = echarts.init(dom)
    option = null
    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        icon: 'rect',
        itemWidth: fontSet(24),
        itemHeight: fontSet(10),
        orient: 'vertical',
        x: '3%',
        y: '10%',
        itemGap: fontSet(24),
        data: postModalData[0],
        textStyle: {
          color: '#95D9F8',
          fontSize: fontSet(14)
        }
      },
      grid: {
        x: '15%',
        y: 55,
        x2: 0,
        y2: '10%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#135BFF'
            }
          },
          axisLabel: {
            color: '#95D9F8',
            textStyle: {
              color: '#95D9F8',
              fontSize: fontSet(14, true)
            }
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
          nameTextStyle: {
            //最值样式
            color: '#95D9F8',
            padding: [0, 50, 0, 0],
            fontSize: fontSet(16, true)
          },
          splitNumber: 10,
          axisLine: {
            lineStyle: {
              color: '#135BFF'
            }
          },
          axisTick: {
            //y轴刻度隐藏
            show: false
          },
          axisLabel: {
            color: '#95D9F8',
            textStyle: {
              color: '#95D9F8',
              fontSize: fontSet(16, true)
            }
          },
          splitLine: {
            lineStyle: {
              color: '#09206F'
            }
          }
        }
      ],
      series: postModalData[2]
    }
    if (option && typeof option === 'object') {
      myChart.setOption(option, true)
      window.onresize = myChart.resize
    }
  },
  // 纵向柱状图(合并、legend横)
  drawVerticalBarH: function(dom, postModalData) {
    var dom = document.getElementById(dom)
    var myChart = echarts.init(dom)
    option = null
    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        icon: 'rect',
        right: '10%',
        itemWidth: fontSet(24),
        itemHeight: fontSet(10),
        textStyle: {
          color: '#C5D9FF',
          fontSize: fontSet(12)
        },
        data: postModalData[0]
      },
      grid: {
        top: '15%',
        left: '8%',
        right: '12%',
        bottom: '12%',
        containLabel: true
      },
      xAxis: [
        {
          name: '(时间)',
          nameTextStyle: {
            //最值样式
            color: '#95D9F8',
            fontSize: fontSet(16, true)
          },
          type: 'category',
          data: postModalData[1],
          axisLine: {
            lineStyle: {
              color: '#135BFF'
            }
          },
          axisLabel: {
            show: true,
            interval: 0,
            textStyle: {
              color: '#95D9F8',
              fontSize: fontSet(14, true)
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '(量值)',
          nameTextStyle: {
            //最值样式
            color: '#95D9F8',
            padding: [0, 50, 0, 0],
            fontSize: fontSet(16, true)
          },
          min: 0,
          max: 100,
          splitNumber: 10,
          axisLine: {
            lineStyle: {
              color: '#135BFF'
            }
          },
          axisTick: {
            //y轴刻度隐藏
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#95D9F8',
              fontSize: fontSet(16, true)
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#09206F'
            }
          }
        }
      ],
      series: postModalData[2]
    }
    if (option && typeof option === 'object') {
      myChart.setOption(option, true)
      window.onresize = myChart.resize
    }
  },
  // 圆形雷达图
  drawArcRadar: function(dom, postModalData) {
    var dom = document.getElementById(dom)
    var myChart = echarts.init(dom)
    option = null
    option = {
      radar: [
        {
          indicator: postModalData[0],
          radius: '55%',
          center: ['50%', '50%'],
          startAngle: 90,
          shape: 'circle',
          name: {
            formatter: function(value) {
              if (value.indexOf('&') > -1) {
                var arr = value.split('\n')
                var name = arr[0]
                var values = arr[1].substring(0, arr[1].length - 1)
                return '{col1|' + name + '\n}{col2| ' + values + '}'
              } else {
                var name = value.substring(0, value.indexOf('\n'))
                var values = value.substring(value.indexOf('\n') + 1, value.length)
                return '{col2|' + name + '\n}{col1| ' + values + '}'
              }
            },
            rich: {
              col2: {
                color: '#C5D9FF',
                align: 'center',
                padding: [5, 0, 0, 0],
                fontSize: fontSet(12)
              },
              col1: {
                color: postModalData[3],
                align: 'center',
                padding: [5, 0, 0, 0],
                fontSize: fontSet(12)
              }
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
        }
      ],
      series: [
        {
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
          data: [
            {
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
            }
          ]
        }
      ]
    }
    if (option && typeof option === 'object') {
      myChart.setOption(option, true)
      window.onresize = myChart.resize
    }
  },
  // 方形雷达图
  drawRectRadar: function(dom, postModalData) {
    var dom = document.getElementById(dom)
    var myChart = echarts.init(dom)
    option = null
    option = {
      radar: {
        indicator: postModalData[0],
        radius: '55%',
        center: ['50%', '50%'],
        startAngle: 90,
        splitNumber: 4,
        name: {
          formatter: function(value) {
            if (value.indexOf('&') > -1) {
              var arr = value.split('\n')
              var name = arr[0]
              var values = arr[1].substring(0, arr[1].length - 1)
              return '{col1|' + name + '\n}{col2| ' + values + '}'
            } else {
              var name = value.substring(0, value.indexOf('\n'))
              var values = value.substring(value.indexOf('\n') + 1, value.length)
              return '{col2|' + name + '\n}{col1| ' + values + '}'
            }
          },
          rich: {
            col2: {
              color: '#C5D9FF',
              align: 'center',
              padding: [5, 0, 0, 0],
              fontSize: fontSet(12)
            },
            col1: {
              color: postModalData[3],
              align: 'center',
              padding: [5, 0, 0, 0],
              fontSize: fontSet(12)
            }
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
            color: '#135BFF'
          }
        },
        splitLine: {
          lineStyle: {
            color: '#135BFF'
          }
        }
      },
      series: [
        {
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
          data: [
            {
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
                  color: postModalData[2],
                  width: 0
                }
              }
            }
          ]
        }
      ]
    }
    if (option && typeof option === 'object') {
      myChart.setOption(option, true)
      window.onresize = myChart.resize
    }
  },
  // 内中外三环圆环图
  drawRing: function(dom, postModalData) {
    var dom = document.getElementById(dom)
    var myChart = echarts.init(dom)
    option = null
    option = {
      tooltip: {
        trigger: 'item',
        show: true,
        formatter: '{b} : {d}%'
      },
      legend: {
        icon: 'rect',
        itemWidth: fontSet(24),
        itemHeight: fontSet(10),
        orient: 'vertical',
        left: '3%',
        top: 'center',
        padding: 30,
        itemGap: fontSet(20),
        data: postModalData[0],
        textStyle: {
          color: '#95D9F8',
          padding: [0, 0, 0, 5],
          fontSize: fontSet(12)
        }
      },
      series: postModalData[1]
    }
    if (option && typeof option === 'object') {
      myChart.setOption(option, true)
      window.onresize = myChart.resize
    }
  },
  // 部分比例圆环
  drawPartRing: function(dom, postModalData) {
    var dom = document.getElementById(dom)
    var myChart = echarts.init(dom)
    option = null
    var echartData = postModalData[1]
    var outColor = postModalData[2] //最外层圆环边框颜色
    var startColor = postModalData[2] //最大内层圆环填充颜色
    var endColor = postModalData[2] //最大内层圆环填充颜色
    var scale = 1
    var color = [
      {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: startColor
          },
          {
            offset: 1,
            color: endColor
          }
        ],
        globalCoord: false
      },
      'none'
    ]
    option = {
      tooltip: {
        trigger: 'item',
        formatter: '{d}%'
      },
      title: [
        {
          text: postModalData[0],
          x: '50%',
          y: '75%',
          textAlign: 'center',
          textStyle: {
            color: '#C5D9FF',
            fontSize: fontSet(15),
            fontWeight: '400'
          }
        }
      ],
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
          data: [
            {
              value: 0,
              name: ''
            }
          ],
          label: {
            normal: {
              formatter: function() {
                var time = echartData[0].value
                return '{time|' + time + '%}'
              },
              position: 'center',
              textStyle: {
                fontSize: fontSet(38),
                fontWeight: 'bold'
              },
              rich: {
                time: {
                  color: '#F0F5FF',
                  fontSize: fontSet(20),
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
          hoverOffset: -10,
          center: ['50%', '40%'],
          radius: ['60%', '50%'],
          color: color,
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
          data: echartData
        },
        {
          name: 'Line 2',
          type: 'pie',
          clockWise: true,
          hoverAnimation: false,
          center: ['50%', '40%'],
          radius: ['60%', '60%'],
          itemStyle: {
            normal: {
              borderWidth: 2 * scale,
              borderColor: outColor,
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
          data: [
            {
              value: 0,
              name: ''
            }
          ]
        }
      ]
    }
    if (option && typeof option === 'object') {
      myChart.setOption(option, true)
      window.onresize = myChart.resize
      return myChart
    }
  },
  // 空心圆环图
  drawHollowRing: function(dom, postModalData) {
    var dom = document.getElementById(dom)
    var myChart = echarts.init(dom)
    option = null
    option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      title: {
        text: postModalData[0],
        left: 'center',
        top: 'center',
        textStyle: {
          fontSize: '80%',
          color: '#95D9F8',
          fontSize: fontSet(12)
        }
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: ['40%', '55%'],
          label: {
            normal: {
              formatter: '{b}',
              textStyle: {
                color: '#95D9F8',
                fontWeight: 'normal',
                fontSize: fontSet(12)
              }
            }
          },
          itemStyle: {
            normal: {
              color: function(params) {
                var colorList = postModalData[2]
                return colorList[params.dataIndex]
              }
            }
          },
          data: postModalData[1]
        }
      ]
    }
    if (option && typeof option === 'object') {
      myChart.setOption(option, true)
      window.onresize = myChart.resize
      return myChart
    }
  },
  // 2半扇形状饼型图
  drawTwoFanPie: function(dom, postModalData) {
    var dom = document.getElementById(dom)
    var myChart = echarts.init(dom)
    option = {
      legend: {
        icon: 'rect',
        right: '5%',
        itemGap: 13,
        data: postModalData[0],
        textStyle: {
          color: '#C5D9FF',
          fontSize: fontSet(12)
        }
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: '65%',
          center: ['50%', '50%'],
          data: postModalData[1],
          roseType: 'radius',
          label: {
            normal: {
              position: 'inner',
              formatter: '{c}%',
              fontSize: fontSet(14)
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
        }
      ]
    }
    if (option && typeof option === 'object') {
      myChart.setOption(option, true)
      window.onresize = myChart.resize
    }
  },
  // 1个扇形状饼型图
  drawOneFanPie: function(dom, postModalData) {
    var dom = document.getElementById(dom)
    var myChart = echarts.init(dom)
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
    }
    option = {
      title: {
        text: postModalData[1] + '%',
        x: 'center',
        y: 'center',
        textStyle: {
          fontWeight: 'normal',
          color: '#fff',
          fontSize: fontSet(24)
        }
      },
      tooltip: {
        trigger: 'item',
        show: true,
        formatter: '{b} : {d}%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: [8, 10]
      },
      series: [
        {
          name: 'Line 2',
          type: 'pie',
          clockWise: true,
          radius: ['0%', '70%'],
          center: ['50%', '50%'],
          itemStyle: dataStyle,
          hoverAnimation: false,
          startAngle: 90,
          data: [
            {
              value: postModalData[1],
              name: postModalData[0],
              itemStyle: {
                normal: {
                  color: postModalData[2][0]
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
                  color: 'rgba(255, 255, 255, .2)' //不改
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
              borderColor: postModalData[2][1]
            }
          },
          hoverAnimation: false,
          startAngle: 90,
          data: [
            {
              value: postModalData[1],
              name: postModalData[0],
              itemStyle: {
                normal: {
                  color: 'transparent'
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
          data: [
            {
              value: postModalData[1],
              name: postModalData[0],
              itemStyle: {
                normal: {
                  color: postModalData[2][1]
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
    }
    if (option && typeof option === 'object') {
      myChart.setOption(option, true)
      window.onresize = myChart.resize
    }
  },
  // 水球图
  drawLiquidFill: function(dom, postModalData) {
    var dom = document.getElementById(dom)
    var myChart = echarts.init(dom)
    var option = {
      title: {
        text: postModalData[0],
        bottom: '4%',
        left: 'center',
        textStyle: {
          color: '#A3E8FE',
          align: 'center',
          verticalAlign: 'bottom',
          fontSize: fontSet(14)
        }
      },
      series: [
        {
          type: 'liquidFill',
          radius: '65%',
          data: [postModalData[1] / 100, postModalData[1] / 100 - 0.1],
          center: ['50%', '48%'],
          color: postModalData[2], // 水球颜色
          outline: {
            borderDistance: 5,
            itemStyle: {
              borderWidth: 2,
              borderColor: 'rgb(16,52,221)'
            }
          },
          backgroundStyle: {
            //背景颜色设置
            color: postModalData[3],
            opacity: 0.4
          },
          label: {
            normal: {
              color: '#fff',
              insideColor: '#ccc',
              fontSize: 25,
              position: ['50%', '30%']
            }
          }
        }
      ]
    }
    if (option && typeof option === 'object') {
      myChart.setOption(option, true)
      window.onresize = myChart.resize
    }
  },
  //水球图css
  drawWaterBall: function(dom, postModalData) {
    var val = postModalData[0]
    var text = postModalData[1] || ''
    var htmlStr =
      '<div class="water-wrapper center">' +
      '<div class="ball-border"> </div>' +
      '<div class="ball center">' +
      '<span class="water-value center">' +
      val +
      '%</span>' +
      '</div>' +
      '<div class="water center">' +
      '<img  id="bw_1" class="bw" src="../img/bw_1.png" />' +
      '<img  id="bw_2" class="bw" src="../img/bw_2.png" />' +
      '</div>' +
      '<div class="legend">' +
      text +
      '</div>' +
      '</div>'
    $('#' + dom).html(htmlStr)
    $('#' + dom)
      .find('.bw')
      .css('top', 100 - val + '%')
    var w = $('#' + dom)
      .find('.water-wrapper')
      .css('height')
    $('#' + dom)
      .find('.water-wrapper')
      .css('width', w)
  },
  //仪表图css
  drawMeterPointer: function(dom, val) {
    var valArr = (val + '').split('')
    var showNum
    if (valArr.length == 1) {
      showNum = '0 0 ' + valArr[0]
    } else if (valArr.length == 2) {
      showNum = '0 ' + valArr[0] + ' ' + valArr[1]
    } else {
      showNum = valArr[0] + ' 0 0'
    }
    var htmlStr =
      '<div class="meter-box">' +
      '<img src="../img/pointer_arc.png" alt="">' +
      '<p class="font-num">' +
      showNum +
      '</p>' +
      '</div>'
    var degSingle = 2.6 //大约1间隔度数
    var deg = (val - 50) * degSingle
    $('#' + dom).html(htmlStr)
    setTimeout(function() {
      $('.meter-box>img').css('transform', 'rotate(' + deg + 'deg)')
    }, 300)
  },
  // 渐变背景折线图
  drawGradientLine: function(dom, postModalData) {
    var dom = document.getElementById(dom)
    var myChart = echarts.init(dom)
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
        itemWidth: fontSet(24),
        itemHeight: fontSet(10),
        itemGap: fontSet(13),
        data: postModalData[0],
        right: '4%',
        textStyle: {
          color: '#95D9F8',
          fontSize: fontSet(12)
        }
      },
      grid: {
        left: '5%',
        right: '8%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          name: '(时间)',
          nameTextStyle: {
            //最值样式
            color: '#95D9F8',
            fontSize: fontSet(16, true)
          },
          type: 'category',
          boundaryGap: true,
          axisLabel: {
            show: true,
            interval: 0,
            textStyle: {
              color: '#95D9F8',
              fontSize: fontSet(16, true)
            }
          },
          axisLine: {
            lineStyle: {
              color: '#135BFF'
            }
          },
          data: postModalData[1]
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '(量值)',
          scale: true,
          min: 0,
          max: 100,
          splitNumber: 10,
          nameTextStyle: {
            //最值样式
            color: '#95D9F8',
            padding: [0, 50, 0, 0],
            fontSize: fontSet(16, true)
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#135BFF'
            }
          },
          axisTick: {
            //y轴刻度隐藏
            show: false
          },
          axisLabel: {
            show: true,
            interval: 0,
            textStyle: {
              color: '#95D9F8',
              fontSize: fontSet(16, true)
            }
          },
          splitLine: {
            lineStyle: {
              color: '#09206F'
            }
          }
        }
      ],
      series: postModalData[2]
    }
    if (option && typeof option === 'object') {
      myChart.setOption(option, true)
      window.onresize = myChart.resize
    }
  },
  // 散点图
  drawScatter: function(dom, postModalData) {
    var dom = document.getElementById(dom)
    var myChart = echarts.init(dom)
    option = {
      visualMap: {
        min: 0,
        max: 100,
        dimension: 1,
        left: 'right',
        top: 'top',
        text: ['高', '低'],
        calculable: false,
        itemWidth: fontSet(10),
        itemHeight: fontSet(100),
        textStyle: {
          color: '#ccc',
          fontSize: fontSet(11)
        },
        inRange: {
          color: postModalData[1]
        },
        padding: [10, 20],
        orient: 'horizontal'
      },
      grid: {
        left: '5%',
        right: '15%',
        bottom: '3%',
        containLabel: true
      },
      tooltip: {
        trigger: 'item',
        showDelay: 0,
        formatter: function(params) {
          if (params.value.length > 1) {
            return '主机: ' + params.value[0] + '<br/> ' + '风险值: ' + params.value[1]
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
      xAxis: [
        {
          type: 'value',
          name: '(主机)',
          scale: true,
          min: 0,
          max: 100,
          splitNumber: 5,
          nameTextStyle: {
            //最值样式
            color: '#95D9F8',
            fontSize: fontSet(16, true)
          },
          axisLine: {
            lineStyle: {
              color: '#135BFF'
            }
          },
          axisLabel: {
            show: true,
            interval: 0,
            textStyle: {
              color: '#95D9F8',
              fontSize: fontSet(16, true)
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '(风险值)',
          scale: true,
          min: 0,
          max: 100,
          splitNumber: 10,
          nameTextStyle: {
            //最值样式
            color: '#95D9F8',
            padding: [0, 50, 0, 0],
            fontSize: fontSet(16, true)
          },
          axisTick: {
            //y轴刻度隐藏
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#135BFF'
            }
          },
          axisLabel: {
            color: '#95D9F8',
            textStyle: {
              color: '#95D9F8',
              fontSize: fontSet(16, true)
            }
          },
          splitLine: {
            lineStyle: {
              color: '#09206F'
            }
          }
        }
      ],
      series: [
        {
          name: 'price-area',
          type: 'scatter',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          data: postModalData[0],
          symbolSize: 4
        }
      ]
    }
    if (option && typeof option === 'object') {
      myChart.setOption(option, true)
      window.onresize = myChart.resize
    }
  },
  //3d圆柱图
  draw3DCylinder: function(dom, postModalData) {
    am4core.useTheme(am4themes_animated)
    var chart = am4core.create(dom, am4charts.XYChart3D)
    var arr2 = postModalData[1]
    chart.angle = 30
    chart.depth = 20
    chart.data = postModalData[0]
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    categoryAxis.dataFields.category = 'title'
    categoryAxis.renderer.grid.template.location = 0
    categoryAxis.renderer.grid.template.strokeOpacity = 0
    categoryAxis.renderer.minGridDistance = 30
    categoryAxis.renderer.cellStartLocation = 0.25
    categoryAxis.renderer.cellEndLocation = 0.7
    categoryAxis.renderer.labels.template.fill = am4core.color('#95D9F8')
    categoryAxis.renderer.labels.template.hideOversized = false
    categoryAxis.renderer.labels.template.horizontalCenter = 'middle'
    categoryAxis.renderer.labels.template.verticalCenter = 'middle'
    categoryAxis.renderer.labels.template.dy = 10
    categoryAxis.tooltip.disabled = true
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
    valueAxis.calculateTotals = true
    valueAxis.renderer.grid.template.strokeOpacity = 0
    valueAxis.min = 0
    valueAxis.max = 109
    valueAxis.strictMinMax = true
    valueAxis.renderer.baseGrid.disabled = true
    valueAxis.renderer.labels.template.fill = am4core.color('#95D9F8')
    valueAxis.renderer.grid.template.stroke = am4core.color('#0B397A')
    valueAxis.renderer.grid.template.strokeOpacity = 1
    valueAxis.tooltip.disabled = true
    valueAxis.renderer.minGridDistance = 5
    valueAxis.tooltip.disabled = true
    var series1 = chart.series.push(new am4charts.ConeSeries())
    series1.dataFields.valueY = 'value1'
    series1.dataFields.categoryX = 'title'
    series1.columns.template.width = am4core.percent(80)
    series1.columns.template.fillOpacity = 0.9
    series1.columns.template.strokeOpacity = 1
    series1.columns.template.strokeWidth = 2
    series1.tooltipText = '{categoryX}: [bold]{valueY}%[/]'
    var columnTemplate1 = series1.columns.template
    columnTemplate1.strokeWidth = 0
    columnTemplate1.strokeOpacity = 0
    columnTemplate1.fillOpacity = 0.8
    columnTemplate1.stroke = am4core.color('#fff')
    columnTemplate1.adapter.add('fill', (fill, target) => {
      var gradient = new am4core.LinearGradient()
      gradient.addColor(am4core.color(arr2[target.dataItem.index][0]))
      gradient.addColor(am4core.color(arr2[target.dataItem.index][1]))
      return (fill = gradient)
    })

    var series2 = chart.series.push(new am4charts.ConeSeries())
    series2.dataFields.valueY = 'value2'
    series2.dataFields.categoryX = 'title'
    series2.stacked = true
    series2.columns.template.width = am4core.percent(80)
    series2.columns.template.fill = am4core.color('#000')
    series2.columns.template.fillOpacity = 0.1
    series2.columns.template.stroke = am4core.color('#000')
    series2.columns.template.strokeOpacity = 0.1
    series2.columns.template.strokeWidth = 1
    var columnTemplate2 = series2.columns.template
    columnTemplate2.strokeWidth = 0
    columnTemplate2.strokeOpacity = 0
    columnTemplate2.fillOpacity = 0.26
    columnTemplate2.stroke = am4core.color('#fff')
    columnTemplate2.adapter.add('fill', (fill, target) => {
      var gradient = new am4core.LinearGradient()
      gradient.addColor(am4core.color(arr2[target.dataItem.index][1]))
      gradient.addColor(am4core.color(arr2[target.dataItem.index][1]))
      return (fill = gradient)
    })
    chart.cursor = new am4charts.XYCursor()
    chart.cursor.lineX.strokeOpacity = 0
    chart.cursor.lineY.strokeOpacity = 0
    chart.cursor.behavior = 'none'
    var bullet = series1.bullets.push(new am4charts.LabelBullet())
    bullet.label.text = '{valueY}%'
    bullet.label.fill = am4core.color('#fff')
    bullet.label.verticalCenter = 'bottom'
    bullet.label.dy = -10
    chart.maskBullets = false
    for (var i = 0; i < $('svg title').length; i++) {
      if ($('svg title')[i].textContent == 'Chart created using amCharts library') {
        $($('svg title')[i])
          .parent()
          .hide()
      }
    }
    setTimeout(function() {
      var pointY = $('g[fill-opacity="0"][stroke-opacity="0"][stroke="#000000"][stroke-width="1"]').length - 8
      var tramsHtml = $($('g[fill-opacity="0"][stroke-opacity="0"][stroke="#000000"][stroke-width="1"]')[pointY]).attr(
        'transform'
      )
      var xidx = tramsHtml.indexOf(',') + 1
      var yidx = tramsHtml.indexOf('.')
      var numY = tramsHtml.substring(xidx, yidx)

      $('g[fill-opacity="0"][stroke-opacity="0"][stroke="#000000"][stroke-width="1"]')

      var len =
        $('g[stroke="#0b397a"][stroke-opacity="1"][fill="none"]').length > 15
          ? $('g[stroke="#0b397a"][stroke-opacity="1"][fill="none"]').length / 15 + 15
          : 2
      var hPath = $($('g[stroke="#0b397a"][stroke-opacity="1"][fill="none"]')[len])
      var hd = hPath.children().attr('d')
      window.sessionStorage.setItem('hd', hd)
      var hdStr = hd.match(/[L].*[\\.]/g).join('')
      var aIdx = hdStr.indexOf('L') + 1
      var bIdx = hdStr.indexOf('.')
      var cIdx = hdStr.lastIndexOf('L') + 1
      var dIdx = hdStr.lastIndexOf('.')
      var num1 = hdStr.substring(aIdx, bIdx)
      var num2 = hdStr.substring(cIdx, dIdx)
      var needNum = Math.abs(num1 - num2)
      var reHd = window.sessionStorage.getItem('hd')
      reHd += ' L' + needNum + ',0 Z'
      hPath.children().attr('d', reHd)
      var lastLen = $('g[stroke="#000000"][stroke-opacity=0][fill=none]').length - 2
      var replaceStr = 'M0,' + numY
      var gHtml = $($('g[stroke="#000000"][stroke-opacity=0][fill=none]')[lastLen])
      gHtml.css({
        stroke: '#09206F',
        'stroke-opacity': '1'
      })
      var gChild = gHtml.children()
      var gChildStr = gChild.attr('d')
      var newChildStr = gChildStr.replace(/M0,0/g, replaceStr)
      gChild.attr('d', newChildStr)
    }, 500)
  },
  // 3d柱状图（纵向）
  draw3DCylinderV: function(dom, postModalData) {
    am4core.useTheme(am4themes_animated)
    var chart = am4core.create(dom, am4charts.XYChart3D)
    chart.angle = 30
    chart.depth = 15
    chart.data = postModalData[0]
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    categoryAxis.dataFields.category = 'title'
    categoryAxis.renderer.labels.template.rotation = 0
    categoryAxis.renderer.labels.template.fill = am4core.color('#C5D9FF')
    categoryAxis.renderer.labels.template.hideOversized = false
    categoryAxis.renderer.labels.template.horizontalCenter = 'middle'
    categoryAxis.renderer.labels.template.verticalCenter = 'middle'
    categoryAxis.renderer.minGridDistance = 30
    categoryAxis.renderer.cellStartLocation = 0.25
    categoryAxis.renderer.cellEndLocation = 0.75
    categoryAxis.tooltip.disabled = true
    categoryAxis.renderer.grid.template.strokeOpacity = 0
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
    valueAxis.calculateTotals = true
    valueAxis.min = 0
    valueAxis.max = 100
    valueAxis.strictMinMax = true
    valueAxis.renderer.labels.template.fill = am4core.color('#C5D9FF')
    valueAxis.renderer.grid.template.stroke = am4core.color('#0B397A')
    valueAxis.renderer.grid.template.strokeOpacity = 1
    valueAxis.tooltip.disabled = true
    valueAxis.renderer.minGridDistance = 5
    var series = chart.series.push(new am4charts.ColumnSeries3D())
    series.dataFields.valueY = 'value'
    series.dataFields.categoryX = 'title'
    series.name = 'value'
    series.tooltipText = '{categoryX}: [bold]{valueY}[/]'
    series.columns.template.width = am4core.percent(50)
    var columnTemplate = series.columns.template
    columnTemplate.strokeWidth = 2
    columnTemplate.strokeOpacity = 1
    columnTemplate.fillOpacity = 0.8
    columnTemplate.stroke = am4core.color('#fff')
    var arr2 = postModalData[1]
    columnTemplate.adapter.add('fill', (fill, target) => {
      var gradient = new am4core.LinearGradient()
      gradient.addColor(am4core.color(arr2[target.dataItem.index][0]))
      gradient.addColor(am4core.color(arr2[target.dataItem.index][1]))
      gradient.rotation = 90
      return (fill = gradient)
    })
    chart.cursor = new am4charts.XYCursor()
    chart.cursor.lineX.strokeOpacity = 0
    chart.cursor.lineY.strokeOpacity = 0
    chart.cursor.behavior = 'none'
    var bullet = series.bullets.push(new am4charts.LabelBullet())
    bullet.label.text = '{valueY}'
    bullet.label.fill = am4core.color('#fff')
    bullet.label.verticalCenter = 'bottom'
    bullet.label.dx = 10
    bullet.label.dy = -10
    chart.maskBullets = false
    for (var i = 0; i < $('svg title').length; i++) {
      if ($('svg title')[i].textContent == 'Chart created using amCharts library') {
        $($('svg title')[i])
          .parent()
          .hide()
      }
    }
    setTimeout(function() {
      var lastLen = $('g[stroke="#000000"][stroke-opacity=0][fill=none]').length - 2
      var currentPath = $($('g[stroke="#000000"][stroke-opacity=0][fill=none]')[lastLen])
      currentPath.css({
        stroke: '#09206F',
        'stroke-opacity': '1'
      })
      var prevPath = currentPath.prev().prev()
      prevPath.css({
        stroke: '#09206F',
        'stroke-opacity': '1'
      })
    }, 0)
  },
  // 3d柱状图（横向）
  draw3DCylinderH: function(dom, postModalData, isSingle) {
    am4core.useTheme(am4themes_animated)
    var chart = am4core.create(dom, am4charts.XYChart3D)
    chart.angle = 20
    chart.depth = 20
    chart.data = postModalData[0]
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis())
    categoryAxis.dataFields.category = 'title'
    categoryAxis.renderer.labels.template.rotation = 0
    categoryAxis.renderer.labels.template.fill = am4core.color('#C5D9FF')
    categoryAxis.renderer.labels.template.hideOversized = false
    categoryAxis.renderer.labels.template.horizontalCenter = 'middle'
    categoryAxis.renderer.labels.template.verticalCenter = 'middle'
    categoryAxis.renderer.labels.template.fontSize = 13
    categoryAxis.tooltip.disabled = true
    categoryAxis.renderer.minGridDistance = 10
    categoryAxis.renderer.grid.template.strokeOpacity = 0
    categoryAxis.renderer.cellStartLocation = 0.25
    categoryAxis.renderer.cellEndLocation = 0.75
    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis())
    valueAxis.calculateTotals = true
    valueAxis.min = 0
    valueAxis.max = 100
    valueAxis.strictMinMax = true
    valueAxis.renderer.labels.template.fill = am4core.color('#95D9F8')
    valueAxis.renderer.grid.template.stroke = am4core.color('#09206F')
    valueAxis.renderer.grid.template.strokeOpacity = 1
    valueAxis.tooltip.disabled = true
    valueAxis.renderer.minGridDistance = 5
    var series = chart.series.push(new am4charts.ColumnSeries3D())
    series.dataFields.valueX = 'value'
    series.dataFields.categoryY = 'title'
    series.name = 'value'
    series.columns.template.propertyFields.fill = 'color'
    series.columns.template.tooltipText = '{categoryY}: [bold]{valueX}[/]'
    series.columns.template.height = am4core.percent(100)
    var columnTemplate = series.columns.template
    columnTemplate.strokeWidth = 0
    columnTemplate.strokeOpacity = 0
    columnTemplate.fillOpacity = 0.8
    columnTemplate.stroke = am4core.color('#fff')
    var arr2 = postModalData[1]
    columnTemplate.adapter.add('fill', (fill, target) => {
      var gradient = new am4core.LinearGradient()
      gradient.addColor(am4core.color(arr2[target.dataItem.index][0]))
      gradient.addColor(am4core.color(arr2[target.dataItem.index][1]))
      return (fill = gradient)
    })
    chart.cursor = new am4charts.XYCursor()
    chart.cursor.lineX.strokeOpacity = 0
    chart.cursor.lineY.strokeOpacity = 0
    chart.cursor.behavior = 'none'
    var bullet = series.bullets.push(new am4charts.LabelBullet())
    bullet.label.text = '{valueX}%'
    bullet.label.fill = am4core.color('#95D9F8')
    bullet.label.verticalCenter = 'bottom'
    bullet.label.dx = 40
    bullet.label.dy = 0
    bullet.label.fontSize = 13
    chart.maskBullets = true
    for (var i = 0; i < $('svg title').length; i++) {
      if ($('svg title')[i].textContent == 'Chart created using amCharts library') {
        $($('svg title')[i])
          .parent()
          .hide()
      }
    }
    var time = typeof isSingle === 'undefined' ? 1000 : 2000
    setTimeout(function() {
      if (time == 1000) {
        var lastLen = $('g[stroke="#000000"][stroke-opacity=0][fill=none]').length - 1
        $($('g[stroke="#000000"][stroke-opacity=0][fill=none]')[lastLen]).css({
          stroke: '#09206F',
          'stroke-opacity': '1'
        })
        var nextPath = $($('g[stroke="#000000"][stroke-opacity=0][fill=none]')[lastLen]).next()
        nextPath.css({
          stroke: '#09206F',
          'stroke-opacity': '0.15'
        })
        var childPath = nextPath.children('path')
        var dHtml = childPath.attr('d')
        dHtml += ' L0,0 Z'
        childPath.attr('d', dHtml)
      } else {
        var lastLen = $('g[stroke="#000000"][stroke-opacity=0][fill=none]').length - 1
        var lastLenOther = Math.floor((lastLen + 1) / 2)
        $($('g[stroke="#000000"][stroke-opacity=0][fill=none]')[lastLen]).css({
          stroke: '#09206F',
          'stroke-opacity': '1'
        })
        $($('g[stroke="#000000"][stroke-opacity=0][fill=none]')[lastLenOther]).css({
          stroke: '#09206F',
          'stroke-opacity': '1'
        })
        var nextPath = $($('g[stroke="#000000"][stroke-opacity=0][fill=none]')[lastLen]).next()
        var nextPathOther = $($('g[stroke="#000000"][stroke-opacity=0][fill=none]')[lastLenOther]).next()
        nextPath.css({
          stroke: '#09206F',
          'stroke-opacity': '0.15'
        })
        nextPathOther.css({
          stroke: '#09206F',
          'stroke-opacity': '0.15'
        })
        var childPath = nextPath.children('path')
        var childPathOther = nextPathOther.children('path')
        var dHtml = childPath.attr('d')
        dHtml += ' L0,0 Z'
        childPath.attr('d', dHtml)
        childPathOther.attr('d', dHtml)
      }
    }, time)
  }
}
