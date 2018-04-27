import "./index.less";

import * as React from "react";

import Button from "antd/lib/button";
import { ColumnProps } from "antd/lib/table/";
import { MockUrl } from "../../../../../../../../service/api";
import Popconfirm from "antd/lib/popconfirm";
import Popover from "antd/lib/popover";
import Table from "antd/lib/table";
import { connect } from "react-redux";

class MyTable extends Table<AdvanceAny> {}

export class InterfaceList extends React.Component<InterfaceListProps, {}> {
  preview = (item: Interface) => {
    window.open(
      MockUrl +
        "/" +
        this.props.projectId +
        "/" +
        item.url +
        "#!method=" +
        item.method
    );
  };
  deleteInterface = (id: string) => {
    this.props.removeInterface({
      interfaceId: id,
      projectId: this.props.projectId
    });
  };
  render() {
    const columns: ColumnProps<Interface>[] = [
      {
        title: "接口名称",
        dataIndex: "interfaceName",
        key: "interfaceName",
        width: "20%",
        render: (interfaceName: string) => (
          <div className="interfaceName">{interfaceName}</div>
        ),
        defaultSortOrder: "descend",
        sorter: (a: InterfaceWithFull, b: InterfaceWithFull) =>
          a.interfaceName.length - b.interfaceName.length
      },
      {
        title: "Method",
        dataIndex: "method",
        key: "method",
        width: "20%",
        render: (method: string) => (
          <div className="interfaceMethod">
            <span className={method}>{method.toUpperCase()}</span>
          </div>
        ),
        filters: [
          {
            text: "get",
            value: "get"
          },
          {
            text: "put",
            value: "put"
          },
          {
            text: "patch",
            value: "patch"
          },
          {
            text: "post",
            value: "post"
          },
          {
            text: "delete",
            value: "delete"
          }
        ],
        onFilter: (value: string, record: InterfaceWithFull) =>
          record.method.indexOf(value) === 0,
        sorter: (a: InterfaceWithFull, b: InterfaceWithFull) =>
          a.method.length - b.method.length
      },
      {
        title: "请求URL",
        dataIndex: "url",
        key: "url",
        width: "20%",
        defaultSortOrder: "descend",
        sorter: (a: InterfaceWithFull, b: InterfaceWithFull) =>
          a.url.length - b.url.length,
        render: (url: string, item: InterfaceWithFull) => (
          <div className="interfaceUrl">
            <Popover content={<div>复制接口地址</div>}>
              <span
                onClick={() =>
                  this.props.copyToClipBoard(this.props.baseUrl + "/" + url)
                }
              >
                {url}
              </span>
            </Popover>
          </div>
        )
      },
      {
        title: "描述",
        dataIndex: "desc",
        key: "desc",
        width: "20%",
        render: (desc: string) => <div className="interfaceDesc">{desc}</div>
      },
      {
        title: "操作",
        dataIndex: "operate",
        key: "operate",
        width: "20%",
        render: (value: string, item: InterfaceWithFull) => {
          return this.props.userRole !== "front" ? (
              <span className="interface-operation">
                <Popover content={<div>预览接口</div>}>
                  <Button
                    shape="circle"
                    icon="eye"
                    onClick={() => this.preview(item)}
                  />
                </Popover>
              </span>
          ) : (
            <span className="interface-operation">
              <Popover content={<div>预览接口</div>}>
                <Button
                  shape="circle"
                  icon="eye"
                  onClick={() => this.preview(item)}
                />
              </Popover>
              <Popover content={<div>编辑接口</div>}>
                <Button
                  shape="circle"
                  icon="edit"
                  onClick={() => {
                    this.props.selectCurrentInterface(item);
                    this.props.showInterfaceMode();
                  }}
                />
              </Popover>
              <Popconfirm
                title="确定删除该接口么?"
                onConfirm={() => {
                  this.deleteInterface(item._id);
                }}
                okText="确定删除"
                cancelText="取消"
              >
                <Popover content={<div>删除接口</div>}>
                  <Button shape="circle" icon="close" />
                </Popover>
              </Popconfirm>
            </span>
          );
        }
      }
    ];

    return (
      <div id="interfaceList">
        <MyTable
          columns={columns}
          dataSource={this.props.data}
          rowKey={record => record._id}
          pagination={false}
          scroll={{ y: 300 }}
          size="middle"
          expandedRowRender={(record: InterfaceWithFull) => (
            <div className="descMore">
              <h4>Method</h4>
              <span>{record.method}</span>
              <h4>URL</h4>
              <span>{this.props.baseUrl + "/" + record.url}</span>
              <h4>描述</h4>
              <span>{record.desc}</span>
            </div>
          )}
        />
      </div>
    );
  }
}
export default connect()(InterfaceList);
