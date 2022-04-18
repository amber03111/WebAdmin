import React from "react";
import { Link, Navigate } from "react-router-dom";
//, useNavigate, Router
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./font.css";
import axios from "axios";
export function setToken(token) {
  return localStorage.setItem("uesr_token", token);
}
//const Message = () => {
//   const navigate = useNavigate();
//}
//const router = new Router({})

class Front extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      InputValue1: " ",
      InputValue2: " ",
      target: "/",
      token: "Bearer ",
      user: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.choice = false;
    axios.interceptors.request.use((Request) => {
      Request.headers.Authorization = localStorage.getItem("token");
      return Request;
    });

    axios.interceptors.response.use(
      (response) => {
        console.log("拦截器响应成功");
        if (localStorage.getItem("token")) {
          response.headers.Authenticate = localStorage.getItem("token");
        }
        setTimeout(() => {
          this.setState((prevState) => {
            if (
              response.data.base_role_name == null ||
              response.data.base_role_name == 0
            ) {
              alert("警告！学生无法进入管理员端！");
            } else if (response.data.base_role_name == 1) {
              return {
                user: "teacher",
                target: "/teacher/*",
              };
            } else if (response.data.base_role_name == 2) {
              return {
                target: "/administrator/*",
                user: "admin",
              };
            }
          });

          console.log("response", response.data.base_role_name);
          
        }, 0);
        // 获取state
        console.log(this.state);
      
        console.log("response=>", response);
        
        return response;
      },
      (error) => {
        console.log("拦截器响应失败");
        this.setState({ target: "/" }, function () {
          console.log(this.state.target);
        });

        console.log(error);
        return Promise.reject(error);
      }
    );
  }

  handleGetInputValueone = (event) => {
    this.setState({
      InputValue1: event.target.value,
    });
  };

  handleGetInputValuetwo = (event) => {
    this.setState({
      InputValue2: event.target.value,
    });
  };
  componentDidMount(){
    this.setState({
      target:"error"
    });
  }
  handleClick() {
    let ll = this;
    //console.log(typeof(ll));
    const { InputValue1 } = this.state;
    const { InputValue2 } = this.state;
    console.log(InputValue1, InputValue2, " -InputValue");
    let url =
      "http://s0.z100.vip:8529/auth/token?Telephone=" +
      InputValue1 +
      "&Password=" +
      InputValue2;
  
    let data = new FormData();
    axios.post(`${url}`, data)
      .then(function (response) {
        let data = response.data;
        let storage = window.localStorage;
        if (response.status === 200) {
          console.log("200!!!!");
          storage.token = "Bearer " + data.token;
          ll.setState({ user: true });
          if (ll.state.user === false) console.log("nullllllllll");
        }
        console.log(storage);

        console.log("response", response);
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.response.status);
      });
  }

  changeUrl(state, props) {
    return {
      target: "/teacher/",
    };
  }

  render() {
    const onFinish = (values) => {
      console.log("Received values of form: ", values);
    };
    return (
      <div>
        {this.state.user == "teacher" && (
          <Navigate to="/teacher" replace="true" />
        )}
        {this.state.user == "admin" && (
          <Navigate to="/administrator" replace="true" />
        )}
        <div className="father">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <h3 style={{ width: "85%", textAlign: "center", margin: "5% 0" }}>
              欢迎登录煤炭管理系统
            </h3>

            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
              style={{ width: "85%", textAlign: "center" }}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                value={this.state.InputValue1}
                onChange={this.handleGetInputValueone}
                placeholder="请输入手机号/账号"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "请输入密码!",
                },
              ]}
              style={{ width: "85%", textAlign: "center", margin: "0" }}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="请输入密码"
                value={this.state.InputValue2}
                onChange={this.handleGetInputValuetwo}
              />
            </Form.Item>
            <Form.Item style={{ width: "85%", textAlign: "center" }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Link to="forget">忘记密码?</Link>
            </Form.Item>

            <Form.Item style={{ height: "20px" }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={this.handleClick.bind(this)}
              >
                {/* <Link to={this.state.target}>登录</Link> */}登录
              </Button> &nbsp;&nbsp;&nbsp; Or  &nbsp;&nbsp;&nbsp;<Link to="/enroll">现在注册</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
export default Front;
