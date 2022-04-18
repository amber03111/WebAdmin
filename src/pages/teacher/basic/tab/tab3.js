import React, { Component } from "react";
import { Button } from "antd";
//import { Select } from "antd";
import "./tab.css";
import { Table } from 'antd';
//const { Option } = Select;
//function handleChange(value) {
//  console.log(`selected ${value}`);
//}
//const { Search } = Input;

const headers = ['序号', '姓名', '课程视频', '每日一题','小测验','期末考试','公开课','线下课','总成绩'];
const quanzhong = ['20%','20%','20%','20%'];

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
    title: '课程视频',
    dataIndex: 'video',
    key: 'video',
  },
  
  {
    title: '小测验',
    key: 'test',
    dataIndex: 'test',
   
  },
  {
    title: '期末考试',
    key: 'exam',
    dataIndex: 'exam',
    
  },
  {
    title: '公开课',
    key: 'action',
     dataIndex: 'action',
    
     
  },
  {
    title: '公开课',
    key: 'open',
    dataIndex: 'open',
    
  },
  {
    title: '线下课',
    key: 'down',
    dataIndex: 'down',
    
  },
  {
    title: '总成绩',
    key: 'sum',
    dataIndex: 'sum',
  
  },
];

//const { Search } = Input;
const data = [
  {
    key: '1',
    num:"1",
    name: 'John Brown',
    video:'10',
    test: '10',
    exam: '10',
    action:"0",
    open:"0",
    down:"0",
    sum:"30",
  },
  {
    key: '2',
    num:"2",
    name: 'Gn',
    video:'10',
    test: '10',
    exam: '10',
    action:"0",
    open:"0",
    down:"0",
    sum:"30",
  },
  {
    key: '3',
    num:"3",
    name: 'Ys',
    video:'10',
    test: '10',
    exam: '10',
    action:"0",
    open:"0",
    down:"0",
    sum:"30",
  },
  {
    key: '4',
    num:"4",
    name: 'Hx',
    video:'10',
    test: '10',
    exam: '10',
    action:"0",
    open:"0",
    down:"0",
    sum:"30",
  },
  {
    key: '5',
    num:"5",
    name: 'Xq',
    video:'10',
    test: '10',
    exam: '10',
    action:"0",
    open:"0",
    down:"0",
    sum:"30",
  },

 
];



export default class TabControl extends Component {
  render() {
    //const onSearch = value => console.log(value);
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <h3>成绩统计</h3>
        <div >
         
          <div    style={{float:"right"}} >
            {" "}
            <Button type="primary">修改权重</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary">导出成绩</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

          </div>
        </div>

        <Table columns={columns} dataSource={data} pagination={false} columnWidth="40px" style={{marginTop:"60px",marginRight:"10px"}}/>
      </div>
    );
  }
}
