import { Layout, Menu } from "antd";
import { UserOutlined, LaptopOutlined } from "@ant-design/icons";
import "./index.css";
import React from "react";
import Taaaa from "./basic/tab/tab.js";
import Taaaa2 from "./basic/tab/tab1.js";
import Taaaa3 from "./basic/tab/tab2.js";
import Taaaa4 from "./basic/tab/tab3.js";
import Taaaa5 from "./basic/tab/tab5.js";
import { Link, Route, Routes } from "react-router-dom";
import hea from "./bac.jpg";
import { Input } from "antd";
import axios from "axios";

//const { Search } = Input;
const { SubMenu } = Menu;
const { Header, Sider } = Layout;
var style = {
  Height: "100%",
  width: "100%",
  backgroundColor: "white",
};
class tab extends React.Component {
  onHandleClick = (values) => {
    console.log("Received values of form: ", values);
    let url = "http://s0.z100.vip:8529/auth/getall";

    axios.interceptors.request.use((Request) => {
      Request.headers.Authorization = localStorage.getItem("token");
      return Request;
    });
    console.log("tokenl: " + localStorage.getItem("token"));

    axios.get(`${url}`).then(function (response) {
      console.log(response);
    });
  };
  render() {
    const { Search } = Input;
    const onSearch = (value) => console.log(value);
    return (
      <Layout style={{ Height: "100%" }}>
        <Header className="header">
          <div>煤炭学习——管理员界面</div>
          <div>首页</div>
          <div>课程</div>
          <Search
            placeholder="input search text"
            allowClear
            onSearch={onSearch}
            style={{ width: 300, borderRadius: "5px" }}
          />
          <div>消息</div>
          <div className="five">
            <img src={hea} alt="头像" className="photo" />
            &nbsp;&nbsp;&nbsp;
            <span>尉宸康</span>
          </div>
        </Header>
        <Layout style={{ Height: "800px" }}>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ borderRight: 0, overflow: "hidden" }}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="用户管理">
                <Menu.Item key="1">
                  {" "}
                  <Link to="one" style={{ textDecoration: "none" }}>
                    学生信息
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  {" "}
                  <Link to="five" style={{ textDecoration: "none" }}>
                    教师信息
                  </Link>
                </Menu.Item>

              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="资源管理">
                <Menu.Item key="5" onClick={this.onHandleClick()}>
                  <Link to="three" style={{ textDecoration: "none" }}>
                    {" "}
                    教材管理
                  </Link>
                </Menu.Item>
                <Menu.Item key="6">
                  <Link to="four" style={{ textDecoration: "none" }}>
                    试题管理
                  </Link>
                </Menu.Item>
                <Menu.Item key="7">
                  {" "}
                  <Link to="two" style={{ textDecoration: "none" }}>
                    课程管理
                  </Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: "24px 24px 24px", overflow: "scroll" }}>
            <Routes>
              <Route path="/one" element={<Taaaa style={style} />} />
              <Route path="/two" element={<Taaaa2 />} />
              <Route path="/three" element={<Taaaa3 />} />
              <Route path="/four" element={<Taaaa4 />} />
              <Route path="/five" element={<Taaaa5 />} />
            </Routes>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default tab;
