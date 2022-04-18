import React from 'react';
//import ReactECharts from 'echarts-for-react';
import  * as echarts from 'echarts'
import { Component } from 'react';
//import { Button } from 'antd';
import { Select } from 'antd';
import { Table,  Space } from 'antd';
const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

const columns = [
  {
    title: '序号',
    dataIndex: 'num',
    key: 'num',
    render: text => <a>{text}</a>,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '成绩',
    dataIndex: 'grade',
    key: 'grade',
  },
  
  {
    title: '查看详细信息',
    key: 'mes',
    render: (text, record) => (
      <Space size="middle">
        <a>详细信息</a>
        
      </Space>
    ),
  },
];

//const { Search } = Input;
const data = [
  {
    key: '1',
    num: '1',
    name: 'john Brown',
    grade: '90',
    
  },
  {
    key: '2',
     num: '2',
    name: 'Jim Gree',
    grade: '80',
   
   
  },
  {
    key: '3',
    num: '3',
    name: 'Joe Black',
    grade: '85',
    
  },
  {
    key: '4',
    num: '4',
    name: 'Jane Blue',
    grade: '85',
    
  },
];


export default class Page extends Component{
  componentDidMount(){
    this.getOption()
  }
  getOption = () => {
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption({
      series : [
        {
            name: '访问来源',
            type: 'pie',    // 设置图表类型为饼图
            radius: '55%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
            data:[          // 数据数组，name 为数据项名称，value 为数据项值
                {value:5, name:'未完成试卷'},
                {value:14, name:'0~60分'},
                {value:55, name:'60~70分'},
                {value:76, name:'70~90分'},
                {value:8, name:'90分以上'}
            ]
          }
       ]
  });
  }

  render(){
    
    return (   
    <div style={{width:"100%",height:"100%",overflow:"scroll"}} className=".bigbody">
      <div> 
        <span></span>
        <Select defaultValue="月考" style={{ width: "300px" }} onChange={handleChange} value="请选择要查看的考试"style={{display:"flex",justifyContent:"center"}}  >
            <Option value="月考">月考</Option>
            <Option value="小测验">小测验</Option>
            <Option value="期末考试" >
            期末考试
            </Option>
            
          </Select></div>
     
      <div style={{float:"left", width:"400px",display:"inline-block"}}  >
      <div id="main" style={{height:"300px"}}>
        
        </div>
        <h3 style={{marginLeft:"50px"}}>平均分:</h3>
        <h3  style={{marginLeft:"50px"}}>最高分:</h3>
        <h3  style={{marginLeft:"50px"}}>最低分:</h3>
      </div>
    <div  style={{float:"right", width:"600px",height:"100%",display:"inline-block"}}> 
    <Table columns={columns} dataSource={data} pagination={false} columnWidth="40px" style={{marginTop:"30px",marginRight:"10px",textAlign:"center"}}/> </div>
   
    </div>)
  }
  
 
};
