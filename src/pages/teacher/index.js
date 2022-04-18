import { Layout, Menu} from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import "./index.css"
import React from 'react';
import Taaaa from  './basic/tab/tab.js'
import Taaaa2 from './basic/tab/tab1.js'
import Taaaa3 from './basic/tab/tab2.js'
import Taaaa4 from './basic/tab/tab3.js'
import Taaaa5 from './basic/tab/tab5'
import Taaaa6 from './basic/tab/tab6'
import Taaaa7 from './basic/tab/tab7'
import Taaaa8 from './basic/tab/tab8'
import { Link, Route,Routes } from 'react-router-dom';
import hea from"./bac.jpg"
import { Input} from 'antd';


//const { Search } = Input;
const { SubMenu } = Menu;
const { Header, Sider } = Layout;
var style ={
  Height:"100%",
  width:"100%",
  backgroundColor:"white"
  
}
class tab extends React.Component  {
    
   render(){
    
    const { Search } = Input;
    const onSearch = value => console.log(value);
    
  return (
    <Layout style={{Height :"100%"}}>
      <Header className="header">
      
        <div>煤炭学习——教师界面</div>
        
      
        
    <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 300 ,borderRadius:"5px" }} />
 
        <div>消息</div>
        <div className="five">
            <img src={hea} alt="头像" className="photo"/>&nbsp;&nbsp;&nbsp;
            <span>尉宸康</span>
        </div>
      </Header>
      <Layout style={{Height :"800px"}}>
        <Sider width={200} className="site-layout-background" >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{  borderRight: 0 ,overflow:"hidden"}}
          >
              <SubMenu key="sub1" icon={<UserOutlined />} title="班级管理">
              <Menu.Item key="1">   <Link to ="one"  style={{ textDecoration:'none'}}>班级成员信息</Link></Menu.Item>
            
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="发起学习">
            
              <Menu.Item key="6"><Link to='three'>发起考试</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<LaptopOutlined />} title="课程 ">
          
            <Menu.Item key="8"><Link to='six'>课程列表</Link></Menu.Item>
            <Menu.Item key="9"><Link to='eight'>课程修改</Link></Menu.Item>
          </SubMenu>
            <SubMenu key="sub4" icon={<NotificationOutlined />} title="统计分析">
            <Menu.Item key="13"><Link to='four'>总学习情况 </Link></Menu.Item>
              <Menu.Item key="14"><Link to='five'>课程学习情况 </Link></Menu.Item>
              <Menu.Item key="15" ><Link to='two'>考试情况</Link></Menu.Item>
              <Menu.Item key="16"><Link to='seven'>每日一题情况</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '24px 24px 24px',overflow:"hidden" }} >
      
              <Routes >
                    <Route path="/one" element={<Taaaa style ={style}/>} />
                    <Route path="/two" element={<Taaaa2/>} />
                    <Route path="/three" element={<Taaaa3/>} />
                    <Route path="/four" element={<Taaaa4  />} />
                    <Route path="/five" element={<Taaaa5  />} />
                    <Route path="/six" element={<Taaaa6/>} />
                    <Route path="/seven" element={<Taaaa7  />} />
                    <Route path="/eight" element={<Taaaa8  />} />
                    <Route path="/nine" element={<Taaaa4  />} />

               </Routes>
            
         
        </Layout>
      </Layout>
    </Layout>
  )
}
}
export default tab
