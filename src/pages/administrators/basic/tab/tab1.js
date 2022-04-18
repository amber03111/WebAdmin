import { Component } from "react";
import { Button } from "antd";
import { Select } from "antd";
import "./tab.css";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { Space } from "antd";
import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Popconfirm, Form } from "antd";
import InForm from "../component/form.js";
const EditableContext = React.createContext(null);

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const { Option } = Select;
function handleChange(value) {
  console.log(`selected ${value}`);
}
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

class LocalizedModal extends React.Component {
  state = { visible: false, getChildValue: "" };
  getChildValue(value) {
    this.setState({
      getChildValue: value,
    });
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

  onSubmit = (values) => {
    console.log(values);
  };
  form = React.createRef();
  onFinish = () => {
    this.setState({
      visible: false,
    });
    this.form.current.validateFields().then((value) => {
      console.log("value :", value);
      axios
        .post(
          "http://s0.z100.vip:8529/courseequipment/create?equipment_name=" +
            value.user.equipment_name +
            "&equipment_type=" +
            value.user.equipment_type +
            "&ar_address_api=" +
            value.user.ar_address_api,
          {}
        ) //这里是后端接口，注意不要跨域
        .then(function (response) {})
        .catch(function (error) {
          console.log(error);
        });
    });
  };

  render() {
    return (
      <>
        <a type="primary" onClick={this.showModal}>
          新建课程
        </a>
        <Modal
          title="课程信息"
          visible={this.state.visible}
          onOk={() => {
            this.hideModal();
          }}
          onCancel={this.hideModal}
          footer={[
            <Button
              type="primary"
              onClick={() => {
                this.onFinish();
                this.hideModal();
              }}
              key={"submit"}
            >
              提交
            </Button>,
            <Button type="primary" onClick={this.hideModal}>
              取消
            </Button>,
          ]}
        >
          <Form
            {...layout}
            name="nest-messages"
            onFinish={this.onSubmit}
            validateMessages={validateMessages}
            ref={this.form}
          >
            <Form.Item
              name={["user", "equipment_name"]}
              label="课程名"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name={["user", "equipment_type"]}
              label="需要用到的模型"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name={["user", "ar_ address_api"]}
              label="api"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Form>
          {this.state.getChildValue}
        </Modal>
      </>
    );
  }
}
class LocalizedModal2 extends React.Component {
  state = { visible: false };
 
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
   
    return (
      <>
        <a type="primary" onClick={this.showModal}>
          查看详细信息
        </a>
        <Modal
          title="试题详细信息"
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
        >
          <div>{console.log(this.props.response)}</div>
          <div>{this.props.response}</div>
        </Modal>
      </>
    );
  }
}
class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      name:"1"
    };
    this.columns = [
      {
        title: "序号",
        dataIndex: "key",
        key: "num",
      },
      {
        title: "课程",
        dataIndex: "equipment_name",
        key: "class",
      },

      {
        title: "课程信息",
        key: "id",

        render: (text, record) => (
          <Space size="middle">
            <div>
              线上课:
              <br /> 邀请码{record.invitecode}
              <br /> 教师:{record.teacher}
            </div>
            <br />
            <div>
              线下课:
              <br /> 邀请码{record.invitecode}
              <br /> 教师:{record.teacher}
            </div>
            <br />
            <div>
              公选课：
              <br /> 邀请码{record.invitecode}
              <br /> 教师:{record.teacher}
            </div>
            <br />
          </Space>
        ),
      },

      {
        title: "操作",
        key: "action",
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <>
              <Popconfirm
                title="你确定要删除吗?"
                onConfirm={() => this.handleDelete(record.key, record.id)}
              >
                <a>删除课程</a>
              </Popconfirm>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <LocalizedModal2 response ={record.id}/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <a>修改课程</a>
            </>
          ) : null,
      },
    ];

    this.state = {
      dataSource: [
        {
          key: "1",
          num: "1",
          class: "摸鱼",
          id: "1234567",
        },
        {
          key: "2",
          num: "2",
          class: "我想摸鱼",
          id: "1234567",
        },
        {
          key: "3",
          num: "3",
          class: "啊啊啊啊",
          id: "1234567",
        },
        {
          key: "4",
          num: "4",
          class: "嘎嘎嘎",
          id: "1234567",
        },
        {
          key: "5",
          num: "5",
          class: "Black",
          id: "1234567",
        },
      ],
      count: 5,
    };
  }

  componentDidMount() {
    const _this = this;
    axios
      .get("http://s0.z100.vip:8529/courseequipment/getall", {}) //这里是后端接口，注意不要跨域
      .then(function (response) {
        console.log(response.data);
        response.data.forEach((item) => {
          item.key = response.data.indexOf(item) + 1;
        });
        console.log(response.data);
        _this.setState({
          dataSource: response.data,
          count: response.data.length,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  handleDelete = (key, id) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
    axios.delete("http://s0.z100.vip:8529/delete/" + id, {});
  };
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: "32",
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };
  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div
        style={{ width: "101234567", height: "101234567", overflow: "scroll" }}
      >
        <div style={{ width: "100%", height: "100%" }}>
          <div classbook="headerone">
            <div style={{ display: "inline-block" }}>
              <LocalizedModal />
            </div>
          </div>

          <Table
            pagination={false}
            components={components}
            rowClassName={() => "editable-row"}
            bordered
            dataSource={dataSource}
            columns={columns}
          />
        </div>
      </div>
    );
  }
}

export default EditableTable;
