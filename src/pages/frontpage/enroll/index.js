import React from "react";
import "./index.css";
import { Form, Input, Row, Col, Checkbox, Button } from "antd";
import { Select } from "antd";
import axios from "axios";
import Pic from "../返回.png";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
function handleChange(value) {
  console.log(`selected ${value}`);
}
const RegistrationForm = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    let url =
      "http://s0.z100.vip:8529/auth/register?Telephone=" +
      values.phone +
      "&Name=" +
      values.password +
      "&Sex=" +
      values.sex +
      "&Password=" +
      values.password +
      "&code=" +
      values.invite_code;
    let data = new FormData();
    axios.post(`${url}`, data);
  };
  return (
    <div className="boxin">
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        style={{
         
          width:"80%"
       
        }}
      >
        <div
          style={{
            backgroundImage: `url(${Pic})`,
            backgroundSize: "100% 100%",
            width: "40px",
            height: "40px",
          }}
          onClick={() => window.history.back(-1)}
        ></div>
        <Form.Item
          name="phone"
          label="手机号码"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item
          name="nickname"
          label="昵称"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="sex"
          label="性别"
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true,
            },
          ]}
        >
          <Select style={{ width: "100" }} onChange={handleChange}>
            <Option value="true">男</Option>
            <Option value="false">女</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        {/*    <Form.Item
        name="confirm"
        label="确认密码"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      */}
        {/*   <Form.Item label="验证码" >
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="captcha"
                noStyle
                rules={[
                  {
                    required: true,
                    message: 'Please input the captcha you got!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button>Get captcha</Button>
            </Col>
          </Row>
        </Form.Item>
              */}
        <Form.Item label="邀请码">
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="invite_code"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Please input the invite code!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            我已阅读并同意 <a href="###">注册协议</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
              form.submit();
            }}
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default RegistrationForm;
