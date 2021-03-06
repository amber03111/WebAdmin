import { Component } from "react";
import { Button } from "antd";
import { Select } from "antd";
import "./tab.css";
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from "axios";
import { Space } from "antd";
import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Popconfirm, Form } from 'antd';
import InForm  from "../component/form.js"
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
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
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
      console.log('Save failed:', errInfo);
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
class LocalizedModal extends React.Component {   //????????????
  state = { visible: false, guid: "", InputValue: "" };
  handleGetInputValue = (event) => {
    this.setState({
      InputValue: event.target.value,
    });
  };
  saveId = (id) => {
    console.log("constructor" + id);
    this.setState({
      guid: id,
    });
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
    console.log(this.state.guid);
  };
  hideModal = () => {
    this.setState({
      visible: false,
    });
  };
  onFinish = () => {
    this.form.current
      .validateFields()
      .then((value) => console.log("value :", value));
  };
  changePwd = () => {
    const newpwd = this.state.InputValue;
    const id = this.state.guid;

    axios
      .post(
        "http://s0.z100.vip:8529/admin/changepwd?gid=" +
          id +
          "&newpwd=" +
          newpwd,
        {}
      ) //??????????????????????????????????????????
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
      this.setState({
        visible: false,
      });
  };

  render() {
    return (
      <>
        <a
          type="primary"
          onClick={() => {
            this.showModal();
            this.saveId(this.props.id);
          }}
        >
          ????????????
        </a>
        <Modal
          title="????????????"
          visible={this.state.visible}
          onOk={() => {
            this.hideModal(); //??????????????? ???????????? ??????
            this.changePwd();
            //?????? changepwd ?????? ?????????
          }}
          onCancel={this.hideModal}
         okText ="??????"
         cancelText="??????"
        >
          <Input value = {this.state.InputValue} onChange={this.handleGetInputValue}></Input>
        </Modal>
      </>
    );
  }
}

class LocalizedModal2 extends React.Component {
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
  sureModal = () => {
    this.setState({
      visible: false,
    });
  };
  onSubmit = (values) => {
    console.log(values);
  };
  form = React.createRef();
  onFinish = () => {
    this.form.current.validateFields().then((value) => {
      console.log("value :", value);
      axios
        .post(
          "http://s0.z100.vip:8529/admin/addteacher?telephone=" +
            value.user.id +
            "&username=" +
            value.user.name +
            "&pwd=" +
            value.user.pwd,
          {}
        ) //??????????????????????????????????????????
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
          ????????????
        </a>
        <Modal
          title="????????????"
          visible={this.state.visible}
          onOk={() => {
            this.hideModal();
          }}
          onCancel={this.hideModal}
          footer={[
            <Button type="primary" onClick={() => {
              this.onFinish();
              this.hideModal();
            }}  key={"submit"}>??????
            </Button>,

            <Button type="primary" onClick={this.hideModal} >
            ??????
          </Button>
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
              name={["user", "name"]}
              label="??????"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name={["user", "id"]}
              label="??????"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name={["user", "pwd"]}
              label="??????"
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
class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state={
     visible: false 
    }
    this.columns = [
        {
          title: "??????",
          dataIndex: "key",
          key: "num",
          wordWrap: 'break-word',
          wordBreak: 'break-word' ,
          height:"40px"
        },
        {
          title: "??????",
          dataIndex: "name",
          key: "name",
         
          width:"300px",
          wordWrap: 'break-word',
           wordBreak: 'break-word' ,
           height:"40px"
        },
      
        {
          title: "??????",
          key: "id",
          dataIndex: "id",
          wordWrap: 'break-word',
          wordBreak: 'break-word' ,
          height:"40px"
        },
        {
          title: "????????????",
          key: "message",
          render: (_, record) =>
            this.state.dataSource.length >= 1 ? (
              <>
                 <LocalizedModal id={record.id} />
      </>
            ) : null,
          wordWrap: 'break-word',
          wordBreak: 'break-word' ,
          height:"40px"
        },
        {
          title: '??????',
          dataIndex: 'operation',
          render: (_, record) =>
            this.state.dataSource.length >= 1 ? (
              <Popconfirm title="??????????????????????"    onConfirm={() => this.handleDelete(record.key, record.id)}>
                <a>??????</a>
              </Popconfirm>
            ) : null,
        },
      
      ];
     
    
    this.state = {
      dataSource: [
        {
          key: "1",
          num: "1",
          name: "Jurl",
          id: "1234567",

        },
        {
          key: "2",
          num: "2",
          name: "Jim Green",
          id: "1234567",
        },
        {
          key: "3",
          num: "3",
          name: "Joe Black",
          id: "1234567",
        },
        {
          key: "4",
          num: "4",
          name: " Jull",
          id: "1234567",
        },
        {
          key: "5",
          num: "5",
          name: "Black",
          id: "1234567",
        },
       
      ],
      count: 5,
    };
  }

  componentDidMount() {
    const _this = this;
    axios
      .get("http://s0.z100.vip:8529/admin/getallteacher", {}) //??????????????????????????????????????????
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
      let temp = [...this.state.dataSource];    
    this.setState({
      dataSource : temp,
    });

    }

    handleDelete = (key, id) => {
      const dataSource = [...this.state.dataSource];
      this.setState({
        dataSource: dataSource.filter((item) => item.key !== key),
      });
      axios.post("http://s0.z100.vip:8529/admin/delete?id=" + id, {});
    };
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: '32',
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
       
        <div  style={{ display: "inline-block",width:"100%"}}>
        <h3>????????????</h3>
        <div className="headerone">
          <Select
            defaultValue="lucy"
            style={{ width: "300px" }}
            onChange={handleChange}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
          <div>
            {" "}
            
            <Button type="primary">????????????</Button>
          </div>
        </div>
        <Button
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
           <LocalizedModal2 />
        </Button>
        <Table
        pagination={false} 
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
        </div>
       
      </div>
    
     
    );
  }
}

export default EditableTable
