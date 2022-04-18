import React from "react";

import * as echarts from "echarts";
import { Component } from "react";

//import { Select } from "antd";
//const { Option } = Select;
//function handleChange(value) {
 // console.log(`selected ${value}`);
//}

export default class Page extends Component {
  componentDidMount() {
    this.getOption1();
    this.getOption2();
  }
  getOption1 = () => {
    var myChart = echarts.init(document.getElementById("main"));
    myChart.setOption({
      title: {
        text: "课程学习进度",
      },
      legend: {
        data: ["学习进度"],
      },
    
      tooltip: {},
      yAxis: {

        data: ["最快进度", "最慢进度", "平均进度"],
      },
      xAxis: {
        name: "百分比",
        max:100,
          min:0,
      },
      
      series: [
        {
          name: "百分比",
          type: "bar",
          
          data: [50, 20, 30],
        },
      ],
    });
  };
  getOption2 = () => {
    var myChart = echarts.init(document.getElementById("ave"));
    myChart.setOption({
      title: {
        text: "视频观看时长",
      },
      tooltip: {},
      legend: {
        data: ["观看时长"],
      },
   
      xAxis: {
        type: "category",
        data: ["平均观看时长", "最长观看时长", "最短观看时长"],
      },
      yAxis: { name: "分钟" },
      series: [
        {
          name: "观看时长",
          type: "bar",
          data: [10, 10, 20],
        },
      ],
    });
  };
  render() {
    return (
      <div style={{ width: "100%", height: "100%" ,overflow:"scroll"}}>
        <div>
          
          
        </div>

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
