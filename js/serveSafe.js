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
      myChart1.setOption(option, true);
      window.onresize = myChart1.resize;
  }
}
function initChart2() {
  var dom = document.getElementById("chart2");
  var myChart2 = echarts.init(dom);
  var option = {
    title: {
        text: '公司所有项目详情',
        subtext: '目前所有',
        x: 'center',
        y: '10%'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    color: ['red', 'green'],
    legend: {
        orient: 'vertical',
        x: 'left',
        y: '30%',
        data: ['已完成项目', '未完成项目']
    },
    series: [{
        name: '项目详情',
        type: 'pie',
        radius: '50%',
        center: ['50%', '70%'],
        data: [{
                value: 8,
                name: '已完成项目'
            }, {
                value: 5,
                name: '未完成项目'
            },

        ],
        itemStyle: {
            emphasis: {
                show: true,
                fontSize: '20',
            }
        },
        label: {
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
    title: {
        text: '公司所有项目详情',
        subtext: '目前所有',
        x: 'center',
        y: '10%'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    color: ['red', 'green'],
    legend: {
        orient: 'vertical',
        x: 'left',
        y: '30%',
        data: ['已完成项目', '未完成项目']
    },
    series: [{
        name: '项目详情',
        type: 'pie',
        radius: '50%',
        center: ['50%', '70%'],
        data: [{
                value: 8,
                name: '已完成项目'
            }, {
                value: 5,
                name: '未完成项目'
            },

        ],
        itemStyle: {
            emphasis: {
                show: true,
                fontSize: '20',
            }
        },
        label: {
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
    backgroundColor: '#2c343c',

    title: {
        text: 'Customized Pie',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#ccc'
        }
    },

    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },

    visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    series : [
        {
            name:'访问来源',
            type:'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:274, name:'联盟广告'},
                {value:235, name:'视频广告'},
                {value:400, name:'搜索引擎'}
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
                normal: {
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                }
            },
            itemStyle: {
                normal: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
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
      myChart.setOption(option, true);
      window.onresize = myChart.resize;
  }
}