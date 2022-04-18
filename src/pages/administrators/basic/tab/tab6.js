import React, { useState } from 'react'
import { Row, Col, Select, Button } from 'antd'
import type { ProColumns } from '@ant-design/pro-table'
import { EditableProTable } from '@ant-design/pro-table'
import ComUpload from '@/components/ComUpload'

const { Option } = Select

type DataSourceType = {
  id: React.Key
  title?: string
  role?: string
  state?: string
  created_at?: string
  [propName: string]: any
}

const EditZTTable: React.FC = () => {
  
  // 表格数据
  const defaultData: DataSourceType[] = [
    {
      id: 624748504,
      title: '活动名称一',
      role: '这个活动真好玩',
      state: 'open',
      created_at: '2020-05-26T09:42:56Z',
      // attachments: [
      //   {
      //     uid: '1',
      //     name: 'xxx.png',
      //     status: 'done',
      //     response: 'Server Error 500', // custom error message to show
      //     url: 'http://www.baidu.com/xxx.png',
      //   }
      // ]
    },
    {
      id: 624691229,
      title: '活动名称二',
      role: '这个活动真好玩',
      state: 'closed',
      created_at: '2020-05-26T08:19:22Z',
      attachments: [
        {
          uid: '1',
          name: 'xxx.png',
          status: 'done',
          response: 'Server Error 500', // custom error message to show
          url: 'http://www.baidu.com/xxx.png',
        },
        {
          uid: '2',
          name: 'yyy.png',
          status: 'done',
          url: 'http://www.baidu.com/yyy.png',
        }
      ]
    },
  ]

  // 设置选中的表格key
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id),
  )
  // 设置表格数据
  const [dataSource, setDataSource] = useState<DataSourceType[]>(() => defaultData)

  const fileColumns: ProColumns<DataSourceType>[] = [
    {
      title: '序号',
      dataIndex: 'num',
      width: 55,
      editable: false,
      render: (_, record, index) => (
        <span>{index + 1}</span>
      )
    },
    {
      title: '附件类型',
      dataIndex: 'businessType',
      renderFormItem: () => {
        return <Select showSearch>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
        </Select>
      },
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: '此项是必填项',
          },
        ],
      },
    },
    {
      title: '附件上传',
      width: '50%',
      dataIndex: 'attachments',
      renderFormItem: () => (<ComUpload />),
    },
    {
      title: '操作',
      valueType: 'option',
      width: 60,
      render: (text, record) => [
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id))
          }}
        >
          删除
        </a>,
      ],
    },
  ]

  return (
    <>
      <Row>
        <Col span={24}>
          <EditableProTable<DataSourceType>
            columns={columns}
            rowKey="id"
            value={dataSource}
            recordCreatorProps={{
              newRecordType: 'dataSource',
              record: () => ({
                id: Date.now(),
              }),
            }}
            editable={{
              type: 'multiple',
              editableKeys,
              actionRender: (row, config, defaultDoms) => {
                return [defaultDoms.delete]
              },
              onValuesChange: (record, recordList) => {
                setDataSource(recordList)
              },
              onChange: (editableKeyss, editableRows: DataSourceType[]) => {
                setEditableRowKeys(editableKeyss)
                setDataSource(editableRows)
              },
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button style={{ margin: '15px 8px 0' }} onClick={ () => {  }}>重置</Button>
          <Button type="primary" onClick={onSave}>保存</Button>
        </Col>
      </Row>
    </>
  )
}

export default EditZTTable