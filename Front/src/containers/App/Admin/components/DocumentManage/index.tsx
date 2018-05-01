import "./index.less";

import * as React from "react";

import Button from "antd/lib/button";
import Popconfirm from "antd/lib/popconfirm";
import Popover from "antd/lib/popover";
import Table from "antd/lib/table";
import { isEqual } from "../../../../../util/helper";

export class DocumentManage extends React.Component<AdvanceAny, AdvanceAny> {
  constructor(props: AdvanceAny) {
    super(props);
    this.state = {
      oldData: [],
      removedDocumentList: [],
      loading: false
    };
  }
  componentWillReceiveProps(nextProps: AdvanceAny) {
    if (
      nextProps.removedDocumentList.length >= 0 &&
      !isEqual(nextProps.removedDocumentList, this.state.removedDocumentList)
    ) {
      this.setState({
        removedDocumentList: nextProps.removedDocumentList
      });
    }
  }

  render() {
    const columns = [
      {
        title: "文档名称",
        key: "name",
        dataIndex: "name"
      },
      {
        title: "创建者",
        dataIndex: "masterName",
        key: "masterName"
      },
      {
        title: "描述",
        dataIndex: "desc",
        key: "desc"
      },
      {
        title: "类型",
        dataIndex: "type",
        key: "type",
        render: (data: string) => (
          data === "spec" ? "规范" : "" +
          data === "project" ? "项目文档" : "" +
          data === "other" ? "其它" : ""
        )
      },
      {
        title: "操作",
        key: "action",
        dataIndex: "action",
        render: (value: string, item: AdvanceAny) => (
          <Popconfirm
            title="确定恢复该文档么?"
            onConfirm={() => {
              this.props.recoverDocument(item._id);
            }}
            okText="确定恢复"
            cancelText="取消"
          >
            <Popover content={<div>恢复文档</div>}>
              <Button shape="circle" icon="edit" />
            </Popover>
          </Popconfirm>
        )
      }
    ];
    return (
      <div id="DocumentManage">
        <Table
          columns={columns}
          dataSource={this.state.removedDocumentList}
          loading={this.state.loading}
          pagination={{pageSize:8}}
          // onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default DocumentManage;
