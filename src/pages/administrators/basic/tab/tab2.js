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
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
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
          ??????????????????
        </a>
        <Modal
          title="??????????????????"
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText="??????"
          cancelText="??????"
        >
          <div>????????????????????????</div>
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
    };
    this.columns = [
      {
        title: "??????",
        dataIndex: "key",
        key: "num",
      },
      {
        title: "??????",
        dataIndex: "book",
        key: "book",
        ...this.getColumnSearchProps("book"),
      },
      {
        title: "???",
        key: "zhang",
        dataIndex: "zhang",
      },
      {
        title: "???",
        key: "jie",
        dataIndex: "jie",
      },
      {
        title: "??????",
        key: "type",
        dataIndex: "type",

        ...this.getColumnSearchProps("type"),
      },
      {
        title: "??????",
        key: "main",
        dataIndex: "main",
      },
      {
        title: "??????",
        key: "action",
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <>
              <Popconfirm
                title="??????????????????????"
                onConfirm={() => this.handleDelete(record.key,record.id)}
              >
                <a>????????????</a>
              </Popconfirm>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <LocalizedModal2 />
            </>
          ) : null,
      },
    ];

    this.state = {
      dataSource: [
        {
          key: "1",
          num: "1",
          book: "??????",
          zhang: "3",
          jie: "2",
          type: "??????",
          main: "????????????",
        },
        {
          key: "2",
          num: "2",
          book: "Jim",
          zhang: "3",
          jie: "2",
          type: "??????",
          main: "????????????",
        },
        {
          key: "3",
          num: "3",
          book: "Joe Black",
          zhang: "3",
          jie: "2",
          type: "??????",
          main: "????????????",
        },
        {
          key: "4",
          num: "4",
          book: " Jull",
          zhang: "3",
          jie: "2",
          type: "??????",
          main: "????????????",
        },
        {
          key: "5",
          num: "5",
          book: "Black",
          zhang: "3",
          jie: "2",
          type: "??????",
          main: "????????????",
        },
      ],
      count: 5,
    };
  }
  componentDidMount() {
    const _this = this;
    axios
      .get("http://s0.z100.vip:8529/admin/getall", {}) //??????????????????????????????????????????
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
    axios.post("http://s0.z100.vip:8529/admin/delete?id=" + id, {});
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
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 ,width:"100px"}}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          
            size="small"
            style={{ width: "45px"}}
          >
           ??????
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: "45px "}}
          >
            ??????
          </Button>
          
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
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
           <h3>????????????</h3>
            <div style={{ display: "inline-block" }}>
              <Button type="primary">????????????</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   
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
