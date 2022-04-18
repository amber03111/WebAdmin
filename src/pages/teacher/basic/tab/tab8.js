import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Input, Popconfirm, Select } from "antd";
import { Modal } from "antd";
import moment from "moment";
import { Table, Badge, Menu } from "antd";
import "moment/locale/zh-cn";
const { Option } = Select;

const disabledDate = (current) => {
  console.log(current);
  return current < moment().startOf("day");
};

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = EditableRow;

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = (e) => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = (form) => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(
          <Input
            ref={(node) => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
          />
        )}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      { title: "序号", dataIndex: "key", key: "date" },
      { title: "二级章节名", dataIndex: "name", key: "name" },
      {
        title: "状态",
        key: "state",
        render: () => (
          <span>
            <Badge status="success" />
            Finished{console.log(this.props.response)}
          </span>
        ),
      },
      { title: "Upgrade Status", dataIndex: "upgradeNum", key: "upgradeNum" },
      {
        title: "操作",
        dataIndex: "operation",
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <>
              <Popconfirm
                title="你确定要删除吗?"
                onConfirm={() => this.handleDelete(record.key, record.id)}
              >
                <a>删除</a>
              </Popconfirm>
              <a>删除</a>
            </>
          ) : null,
      },
    ];

    this.state = {
      dataSource: [
        {
          key: "0",
          name: "Edward King 0",
          age: "32",
          address: "London, Park Lane no. 0",
        },
      ],
      count: 1,
    };
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
  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
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
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
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
      <div>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          Add a row
        </Button>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

class SSRFNJKAFH extends React.Component {
  state = { districts: [], loading: false };
  constructor(props) {
    super(props);
    this.state = {
      districts: [],
    };
    //this.componentDidMount = this.componentDidMount.bind(this);
    //this.test = this.test.bind(this);
  }

  // componentDidMount() {
  test = () => {
    this.setState({ loading: true });
    // ajax request after empty completin
    const _this = this;
    axios
      .get("http://s0.z100.vip:8529/teacher/getowncourses", {}) //这里是后端接口，注意不要跨域
      .then(function (response) {
        console.log("test");
        console.log(response.data);
        this.setState({
          districts: response.data,
        });

        console.log("after: " + this.state.districts);
      })

      .catch(function (error) {
        console.log("error:" + error);
      });
  };
  render() {
    return (
      <Select
        className="create-form-select"
        placeholder="请选择区域"
        onClick={() => {
          console.log("click");
          this.test();
        }}
      >
        <Option>{this.state.districts[0]}</Option>
      </Select>
    );
  }
}
class NestedTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      { title: "序号", dataIndex: "key", key: "name" },
      { title: "章节名称", dataIndex: "id", key: "name" },
      {
        title: "操作",
        key: "operation",
        render: () => (
          <span className="table-operation">
            <a>添加章节测验/ar模型</a> &nbsp;&nbsp;&nbsp;
            <a>删除</a>&nbsp;&nbsp;&nbsp;
          </span>
        ),
      },
    ];

    this.state = {
      dataSource: [
        {
          key: 1,
          name: "dddd",
          platform: "iOS",
          version: "10.3.4.5654",
          upgradeNum: 500,
          creator: "Jack",
          createdAt: "2014-12-24 23:12:00",
        },
      ],
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    // ajax request after empty completing

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
  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
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
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

  expandedRowRender = (record) => {
    var ll = [];
    var dataidc = {};
    for (var item in record) {
      dataidc[item] = record[item];
    }
    ll.push(dataidc);

    return (
      <EditableTable
        pagination={false}
        fatherid={this.state.dataSource.id}
      ></EditableTable>
    );
  };

  onExpand = (expanded, record) => {
    const { actions } = this.props;
    const rid = record.id;
    actions.fetchProcess(rid);
  };
  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
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
      <div style={{ width: "100%", height: "100%", overflow: "scroll" }}>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          dddd
        </Button>

        <SSRFNJKAFH></SSRFNJKAFH>

        <Table
          className="components-table-demo-nested"
          columns={this.columns}
          dataSource={this.state.dataSource}
          onExpand={this.onExpand}
          expandedRowRender={(record) => this.expandedRowRender(record)}
          expandRowByClick="true"
          rowKey={(record) => `${record.id}record`}
        />
      </div>
    );
  }
}
export default NestedTable;
