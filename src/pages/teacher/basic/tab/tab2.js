import React, { Component } from "react";
import { Select ,Radio, Space } from "antd";
import "./tab.css";
import {  Button ,Table, Tag } from 'antd';
import { SmileOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  DatePicker,
  TimePicker,
  Cascader,
  InputNumber,
  Mentions,
  TreeSelect,
  Popconfirm
} from "antd";
import { Modal } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { useContext, useState, useEffect, useRef } from "react";
import { EditableProTable } from "@ant-design/pro-table";


const { Option } = Select;
const { RangePicker } = DatePicker;
function handleChange(value) {
  console.log(`selected ${value}`);
}
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const headers = [
  "序号",
  "教材名称",
  "章",
  "节",
  "试题类型",
  "试题难度",
  "题干",
  "操作",
];
const data = [
  ["1", "J.F", "English", "1954-1955", "150milion", " ", ""],
  ["2", "J.F", "English", "1954-1955", "150milion", " ", ""],
  ["3", "J.F", "English", "1954-1955", "150milion", " ", ""],
  ["4", "J.F", "English", "1954-1955", "150milion", " ", ""],
  ["5", "J.F", "English", "1954-1955", "150milion", " ", ""],
];


const columns = [
  {
    title: '序号',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: '姓名',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '成绩',
    dataIndex: 'address',
    key: 'address',
  },
  
  {
    title: '详细信息',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

//const { Search } = Input;
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
      ) //这里是后端接口，注意不要跨域
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
          修改密码
        </a>
        <Modal
          title="选择题目"
          visible={this.state.visible}
          onOk={() => {
            this.hideModal(); //确认后隐藏 修改密码 弹窗
            this.changePwd();
            //调用 changepwd 接口 的函数
          }}
          onCancel={this.hideModal}
         okText ="确认"
         cancelText="取消"
         width="900px"
        >
          <EditableTable ></EditableTable >
          
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
          "http://s0.z100.vip:8529/admin/addstudent?telephone=" +
            value.user.id +
            "&username=" +
            value.user.name +
            "&pwd=" +
            value.user.pwd,
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
          添加用户
        </a>
        <Modal
          title="查看试卷详情"
          visible={this.state.visible}
          onOk={() => {
            this.hideModal();
          }}
          onCancel={this.hideModal}
          footer={[
            <Button type="primary" onClick={() => {
              this.onFinish();
              this.hideModal();
            }}  key={"submit"}>
              提交
            </Button>,
            <Button type="primary" onClick={this.hideModal} >
            取消
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
              label="昵称"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name={["user", "id"]}
              label="账号"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name={["user", "pwd"]}
              label="密码"
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
    this.state = {
      visible: false,
      selectedRowKeys: [], 
      loading: false,
    };
    
    this.columns = [
      {
        title: "序号",
        dataIndex: "key",
        key: "num",
      },
      {
        title: "教材",
        dataIndex: "book",
        key: "book",
        ...this.getColumnSearchProps("book"),
      },
      {
        title: "章",
        key: "zhang",
        dataIndex: "zhang",
      },
      {
        title: "节",
        key: "jie",
        dataIndex: "jie",
      },
      {
        title: "类型",
        key: "type",
        dataIndex: "type",

        ...this.getColumnSearchProps("type"),
      },
      {
        title: "题干",
        key: "main",
        dataIndex: "main",
      },
      {
        title: "操作",
        key: "action",
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <>
              <Popconfirm
                title="你确定要删除吗?"
                onConfirm={() => this.handleDelete(record.key,record.id)}
              >
                <a>查看详细信息</a>
              </Popconfirm>
            
           
            </>
          ) : null,
      },
    ];

    this.state = {
      dataSource: [
        {
          key: "1",
          num: "1",
          book: "摸鱼",
          zhang: "3",
          jie: "2",
          type: "选择",
          main: "阿巴巴巴",
        },
        {
          key: "2",
          num: "2",
          book: "Jim",
          zhang: "3",
          jie: "2",
          type: "选择",
          main: "阿巴巴巴",
        },
        {
          key: "3",
          num: "3",
          book: "Joe Black",
          zhang: "3",
          jie: "2",
          type: "选择",
          main: "阿巴巴巴",
        },
        {
          key: "4",
          num: "4",
          book: " Jull",
          zhang: "3",
          jie: "2",
          type: "选择",
          main: "阿巴巴巴",
        },
        {
          key: "5",
          num: "5",
          book: "Black",
          zhang: "3",
          jie: "2",
          type: "选择",
          main: "阿巴巴巴",
        },
      ],
      count: 5,
    };
  }
  componentDidMount() {
     this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
    const _this = this;
    axios
      .get("http://s0.z100.vip:8529/teacher/getowncourses", {}) //这里是后端接口，注意不要跨域
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

 start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
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
           搜索
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: "45px "}}
          >
            重置
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
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

   
    return (
      <div
        style={{ width: "101234567", height: "101234567", overflow: "scroll" }}
      >
        <div style={{ width: "100%", height: "100%" }}>
          <div classbook="headerone">
           <h3>试题管理</h3>
            <div style={{ display: "inline-block" }}>
             
            </div>
          </div>
          <Table
            pagination={false}
            components={components}
            rowClassName={() => "editable-row"}
            bordered
            rowSelection={rowSelection} 
            dataSource={dataSource}
            columns={columns}
          />
        </div>
      </div>
    );
  }
}


export default class TabControl extends Component {
  state = {
    value: 1,
  };
  onChange = (e) => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value,
    });
  };
  
  render() {
    const { value } = this.state;
    //const onSearch = value => console.log(value);
    return (
      <div style={{ width: "100%", height: "100%", overflow: "scroll" ,display:"flex",justifyContent:"center"}}>
        <Form {...formItemLayout} style={{ width: "100%", height: "100%"}}>
          <fieldset >
            <legend>基础设置</legend>
            <Form.Item
              name="nickname"
              label="试卷名称"
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
              name="time"
              label="考试可作答时间"
              rules={[
                {
                  required: true,
                  message: "请输入考试可作答时间!",
                },
              ]}
            >
              <RangePicker showTime />
            </Form.Item>

            <Form.Item
              name="long"
              label="考试时间"
              rules={[
                {
                  required: true,
                  message: "请输入考试时间",
                },
              ]}
            >
              <InputNumber />
              分钟
            </Form.Item>

            <Form.Item
              name="num"
              label="满分"
              rules={[
                {
                  required: true,
                  message: "请输入试卷满分",
                },
              ]}
            >
              <InputNumber min="1" defaultValue="1" />
            </Form.Item>

            <Form.Item
              name="long"
              label="试卷份数"
              rules={[
                {
                  required: true,
                  message: "请输入试卷份数",
                },
              ]}
            >
              <InputNumber min="1" defaultValue="1" />
            </Form.Item>

          </fieldset>
          <fieldset>
            <legend>试题设置</legend>
            <fieldset>
              <legend>选择题</legend>
              <Form.Item
                name="sum1"
                label="总分"
                rules={[
                  {
                    required: true,
                    message: "请输入选择题总分",
                  },
                ]}
              >
                <InputNumber min="0" defaultValue="0" />
              </Form.Item>

              <Form.Item
                name="option1"
                label="出题方式"
                rules={[
                  {
                    required: true,
                    message: "请选择出题方式",
                  },
                ]}
              >
                <Radio.Group onChange={this.onChange} value={value}>
                  <Space direction="vertical">
                  <div><Radio value={1}>从题库随机抽取题目</Radio>     <span>抽取</span><InputNumber min="0" defaultValue="0" />道题目</div>
                  <div> <Radio value={2}>从题库选择题目</Radio>  <Button><LocalizedModal/></Button></div>
                   
                   
                  </Space>
                </Radio.Group>
              </Form.Item>
            </fieldset>
            <fieldset>
              <legend>填空题</legend>
              <Form.Item
                name="sum2"
                label="总分"
                rules={[
                  {
                    required: true,
                    message: "请输入填空题总分",
                  },
                ]}
              >
                <InputNumber min="0" defaultValue="0" />
              </Form.Item>

              <Form.Item
                name="option2"
                label="出题方式"
                rules={[
                  {
                    required: true,
                    message: "请选择出题方式",
                  },
                ]}
              >
                <Radio.Group onChange={this.onChange} value={value}>
                  <Space direction="vertical">
                  <div><Radio value={1}>从题库随机抽取题目</Radio>     <span>抽取</span><InputNumber min="0" defaultValue="0" />道题目</div>
                  <div> <Radio value={2}>从题库选择题目</Radio>  <Button>打开题库</Button></div>
                   
                   
                  </Space>
                </Radio.Group>
              </Form.Item>
            </fieldset>
            <fieldset>
              <legend>大题</legend>
              <Form.Item
                name="long"
                label="总分"
                rules={[
                  {
                    required: true,
                    message: "请输入大题总分",
                  },
                ]}
              >
                <InputNumber min="0" defaultValue="0" />
              </Form.Item>

              <Form.Item
                name="option"
                label="出题方式"
                rules={[
                  {
                    required: true,
                    message: "请输入单选题总分",
                  },
                ]}
              >
                <Radio.Group onChange={this.onChange} value={value}>
                  <Space direction="vertical">
                  <div><Radio value={1}>从题库随机抽取题目</Radio>     <span>抽取</span><InputNumber min="0" defaultValue="0" />道题目</div>
                  <div> <Radio value={2}>从题库选择题目</Radio>  <Button>打开题库</Button></div>
                   
                   
                  </Space>
                </Radio.Group>
              </Form.Item>
            </fieldset>
            
          </fieldset>
          <Form.Item
                name="option"
              style={{display:"flex",justifyContent:"center"}} >
                <Button>提交</Button>
                <a>浏览试卷</a>
              </Form.Item>
        </Form>
        ,
        <div style={{ display: "none" }}>
          <div className="headerone">
            所需教材:{" "}
            <Select
              defaultValue="lucy"
              style={{ width: "150px" }}
              onChange={handleChange}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>
                Disabled
              </Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
            试题类型:
            <Select
              defaultValue="lucy"
              style={{ width: "150px" }}
              onChange={handleChange}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>
                Disabled
              </Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
            题干
            <Select
              defaultValue="lucy"
              style={{ width: "150px" }}
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
              <Button type="primary">筛选</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button type="primary">导入</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button type="primary" onClick="show()">
                创建
              </Button>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}
