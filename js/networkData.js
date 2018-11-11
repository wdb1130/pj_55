// chart5
$(function () {
  initChart1();
  initChart2();
})

function initChart1() {
  var dom1 = document.getElementById("chart-1");
  var myChart1 = echarts.init(dom1);
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
      axisLine:{
        lineStyle :{
          color: '#ccc'
        }
      },
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value',
      name:'最值',
      nameLocation:'end',
      nameGap:5,
      splitLine:false, //辅助线
      splitNumber:5,
      max: 100,
      min: 0,
      nameTextStyle:{
        color:' #fff',
        fontSize: 10,
        align: 'left'
      },
      boundaryGap: true, //折现与轴间距
      axisLine:{
        lineStyle :{
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
    myChart1.setOption(option, true);
    window.onresize = myChart1.resize;
  }
}

function initChart2() {
  var dom = document.getElementById("chart-2");
  var myChart2 = echarts.init(dom);
  var option = {
    series: [{
      type: 'liquidFill',
      radius: '80%',
      data: [0.5, 0.45, 0.4, 0.3],
      label: {
        normal: {
          color: 'red',
          insideColor: 'yellow',
          fontSize: 50
        }
      }
    }]
  };
  if (option && typeof option === "object") {
    myChart2.setOption(option, true);
    window.onresize = myChart2.resize;
  }

}