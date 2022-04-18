import React from "react";

import * as echarts from "echarts";
import { Component } from "react";

//import { Select } from "antd";
//const { Option } = Select;
//function handleChange(value) {
  //console.log(`selected ${value}`);
//}

export default class Page extends Component {
  componentDidMount() {
    this.getOption1();
    this.getOption2();
  }

  

  getOption1 = () => {
    var myChart = echarts.init(document.getElementById("main"));
    myChart.setOption({
        tooltip: {
            trigger:'axis',
            formatter: '{b0}({a0}): {c0}<br />{b1}({a1}): {c1}%'
        },
        legend: {
            data:['正确率','完成率']
        },
        xAxis: {
    type: "category",
    data: ["周一", "周二", "周三","周四","周五","周六","周天"],
  },
        yAxis: [ {
            type: 'value',
            name: '百分比',
            show:true,
            interval: 10,
            axisLine: {
                lineStyle: {
                    color: '#5e859e',
                    width: 2
                }
            }
        }],
        series: [{
            name: '正确率',
            type: 'bar',
            barWidth : '50%',
            data:[5, 20, 36, 10, 10, 20,80]
        },{
            name: '完成率',
            type: 'line',
            smooth:true,
            data: [100, 100, 96, 87, 98, 96,89]
        }]

    });
  };
  getOption2 = () => {
    var myChart = echarts.init(document.getElementById("ave"));
    myChart.setOption({
        series : [
          {
              name: '每日一题情况',
              type: 'pie',    // 设置图表类型为饼图
              radius: '55%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
              data:[          // 数据数组，name 为数据项名称，value 为数据项值
                  {value:5, name:'未完成'},
                  {value:14, name:'错误'},
                  {value:55, name:'正确'},
             
              ]
            }
         ]
    });
  };
  render() {
    return (
      <div style={{ width: "100%", height: "100%" ,overflow:"scroll"}}>
        <h3>每日一题情况</h3>

        <div style={{ float: "right", width: "600px", display: "inline-block" }}>
          <div id="main" style={{ height: "400px" }}>
          
          </div>
        </div>
        
          <div id="ave" style={{ height: "450px",width:"400px", overflow:"visible" ,  float:"left", display: "inline-block",}}>
          </div>
        
      </div>
    );
  }
}
