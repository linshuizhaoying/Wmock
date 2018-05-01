import "./index.less";

import * as React from "react";

import Button from "antd/lib/button";
import Popconfirm from "antd/lib/popconfirm";
import Popover from "antd/lib/popover";
import Table from "antd/lib/table";
import { isEqual } from "../../../../../util/helper";

export class InterfaceManage extends React.Component<AdvanceAny, AdvanceAny> {
  constructor(props: AdvanceAny) {
    super(props);
    this.state = {
      oldData: [],
      removedInterfaceList: [],
      loading: false
    };
  }
  componentWillReceiveProps(nextProps: AdvanceAny) {
    if (
      nextProps.removedInterfaceList.length >= 0 &&
      !isEqual(nextProps.removedInterfaceList, this.state.removedInterfaceList)
    ) {
      this.setState({
        removedInterfaceList: nextProps.removedInterfaceList
      });
    }
  }

  render() {
    const columns = [
      {
        title: "所属项目",
        key: "projectName",
        dataIndex: "projectName"
      },
      {
        title: "接口名称",
        dataIndex: "interfaceName",
        key: "interfaceName"
      },
      {
        title: "创建者",
        dataIndex: "masterName",
        key: "masterName"
      },
      {
        title: "Url",
        dataIndex: "url",
        key: "url"
      },
      {
        title: "请求方式",
        dataIndex: "method",
        key: "method"
      },
      {
        title: "描述",
        dataIndex: "desc",
        key: "desc"
      },
      {
        title: "操作",
        key: "action",
        dataIndex: "action",
        render: (value: string, item: AdvanceAny) => (
          <Popconfirm
            title="确定恢复该接口么?"
            onConfirm={() => {
              this.props.recoverInterface(item.projectId, item._id);
            }}
            okText="确定恢复"
            cancelText="取消"
          >
            <Popover content={<div>恢复接口</div>}>
              <Button shape="circle" icon="edit" />
            </Popover>
          </Popconfirm>
        )
      }
    ];
    return (
      <div id="InterfaceManage">
        <Table
          columns={columns}
          dataSource={this.state.removedInterfaceList}
          loading={this.state.loading}
          pagination={{pageSize:8}}
          // onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default InterfaceManage;
