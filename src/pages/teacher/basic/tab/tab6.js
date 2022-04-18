import React from "react";
import axios from "axios";
import {  Form, Button, Input,Popconfirm , DatePicker} from "antd";
import { Modal } from "antd";
import moment from "moment";
import { Table, Badge} from "antd";
import "moment/locale/zh-cn"

const disabledDate = (current) => {
  console.log(current)
  return current < moment().startOf('day');
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
  onChange = (value,dateString)=>{
    this.setState({
        date:dateString
    })
}

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };
 onChange(date, dateString) {
    console.log(dateString);
  }
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
      const a= moment(value.user.class_starttime).format('YYYY-MM-DD')
      const b=moment(value.user.class_endtime).format('YYYY-MM-DD')
      const c=moment(value.user.online_enroll_begin_time).format('YYYY-MM-DD')
      const d=moment(value.user.online_enroll_end_time).format('YYYY-MM-DD')
      axios
        .post(
          "http://s0.z100.vip:8529/teacher/createonlinecourse?online_name=" +
            value.user.class_name+
            "&online_picture=" +
            value.user.classpic +
            "&online_begin_time=" +
           a+"&online_end_time="+ b
          +"&online_enroll_begin_time="+c+"&online_enroll_end_time="+d+"&online_course_status="+
            value.user.status+"&courseID="+value.user.class_id,
          {}
        ) //这里是后端接口，注意不要跨域
        .then(function (response) {
          if(response.status.code === 200){
            console.log("success");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };

  render() {
    return (
      <>
        <a type="primary" onClick={this.showModal}>
        创建课程
        </a>
        <Modal
          title="课程名称"
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
          <Form name="nest-messages" onFinish={this.onSubmit} ref={this.form}>
            <Form.Item
              name={["user", "class_name"]}
              label="课程名称"
              rules={[{ required: true }]}
           
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", "classpic"]}
              label="课程头像"
              
            >
              <Input    type="file"/>
            </Form.Item>

            <Form.Item
              name={["user", "class_starttime"]}
              label="课程开始时间"
              rules={[{ required: true }]}
            >
                 <DatePicker onChange={this.onChange}  disabledDate={disabledDate}/>
            </Form.Item>
            <Form.Item
              name={["user", "class_endtime"]}
              label="课程结束时间"
              rules={[{ required: true }]}
            >
                 <DatePicker onChange={this.onChange}  disabledDate={disabledDate}/>
            </Form.Item>
            <Form.Item
              name={["user", "online_enroll_begin_time"]}
              label="课程报名开始时间"
              rules={[{ required: true }]}
            >
                 <DatePicker onChange={this.onChange} disabledDate={disabledDate}/>
            </Form.Item>
            <Form.Item
              name={["user", "conline_enroll_end_time"]}
              label="课程报名结束时间"
              rules={[{ required: true }]}
            >
                 <DatePicker onChange={this.onChange}  disabledDate={disabledDate}/>
            </Form.Item>
            <Form.Item
              name={["user", "status"]}
              label="课程状态"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", "class_id"]}
              label="课程ID"
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

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
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
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
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
        { title: "课程名称", dataIndex: "id", key: "name" },
        {
          title: "课程状态",
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
          key: '0',
          name: 'Edward King 0',
          age: '32',
          address: 'London, Park Lane no. 0',
        },
        
      ],
      count: 1,
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
  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
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

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
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
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
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
         <LocalizedModal2></LocalizedModal2>
         <h3>所有课程信息</h3>
       {/*<Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}> Add a ro</Button>*/}
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}
export default EditableTable ;
