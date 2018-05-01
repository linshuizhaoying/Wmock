import "./index.less";

import * as React from "react";

import Button from "antd/lib/button";
import Popconfirm from "antd/lib/popconfirm";
import Popover from "antd/lib/popover";
import Table from "antd/lib/table";
import { isEqual } from "../../../../../util/helper";

export class ProjectManage extends React.Component<AdvanceAny, AdvanceAny> {
  constructor(props: AdvanceAny) {
    super(props);
    this.state = {
      oldData: [],
      removedProjectList: [],
      loading: false
    };
  }
  componentWillReceiveProps(nextProps: AdvanceAny) {
    if (
      nextProps.removedProjectList.length >= 0 &&
      !isEqual(nextProps.removedProjectList, this.state.removedProjectList)
    ) {
      this.setState({
        removedProjectList: nextProps.removedProjectList
      });
    }
  }

  render() {
    const columns = [
      {
        title: "项目名称",
        key: "projectName",
        dataIndex: "projectName"
      },
      {
        title: "创建者",
        dataIndex: "masterName",
        key: "masterName"
      },
      {
        title: "Url",
        dataIndex: "projectUrl",
        key: "projectUrl"
      },
      {
        title: "描述",
        dataIndex: "projectDesc",
        key: "projectDesc"
      },
      {
        title: "版本",
        dataIndex: "version",
        key: "version"
      },
      {
        title: "类型",
        dataIndex: "type",
        key: "type",
        render: (data: string) => (
          data.toString() === 'user' ? '个人项目' : '演示项目'
        )
      },
      {
        title: "操作",
        key: "action",
        dataIndex: "action",
        render: (value: string, item: AdvanceAny) => (
          <Popconfirm
            title="确定恢复该项目么?"
            onConfirm={() => {
              this.props.recoverProject(item._id);
            }}
            okText="确定恢复"
            cancelText="取消"
          >
            <Popover content={<div>恢复项目</div>}>
              <Button shape="circle" icon="edit" />
            </Popover>
          </Popconfirm>
        )
      }
    ];
    return (
      <div id="ProjectManage">
        <Table
          columns={columns}
          dataSource={this.state.removedProjectList}
          loading={this.state.loading}
          pagination={{pageSize:8}}
          // onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default ProjectManage;
