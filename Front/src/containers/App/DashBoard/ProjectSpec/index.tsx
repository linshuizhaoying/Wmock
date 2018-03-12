import * as React from "react";
import Button from "antd/lib/button";
import Card from "antd/lib/card";
import Col from "antd/lib/col";
import DocumentMode from "./components/DocumentMode";
import Icon from "antd/lib/icon";
import Modal from "antd/lib/modal";
import Popconfirm from "antd/lib/popconfirm";
import Row from "antd/lib/row";
import Timeline from "antd/lib/timeline";
import {
  addDocument,
  removeDocument,
  updateDocument
} from "../../../../actions/document";
import { connect } from "react-redux";
import { isEqual } from "../../../../util/helper";
import "./index.less";

export class ProjectSpec extends React.Component<AppProps, ProjectSpecState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      documentModeVisible: false,
      allDocuments: [],
      currentDocumentMessage: [],
      currentDocumentData: undefined,
      isLoaded: false, // 是否加载过
      showDocumentHistory: false // 是否显示历史信息
    };
  }

  componentWillReceiveProps(nextProps: AppProps) {
    // 每次只更新变动的文档
    if (
      nextProps.documentList.length >= 0 &&
      !isEqual(nextProps.documentList, this.state.allDocuments)
    ) {
      this.setState({
        allDocuments: nextProps.documentList,
        isLoaded: true
      });
    }
    // 每次只更新变动的文档历史信息
    if (
      nextProps.documentMessages.length >= 0 &&
      !isEqual(nextProps.documentMessages, this.state.currentDocumentMessage)
    ) {
      this.setState({
        currentDocumentMessage: nextProps.documentMessages,
        isLoaded: true
      });
    }
  }

  addDocumentMode = () => {
    this.setState(
      {
        currentDocumentData: undefined
      },
      () => {
        this.setState({
          documentModeVisible: true
        });
      }
    );
  };
  showDocumentMode = () => {
    this.setState({
      documentModeVisible: true
    });
  };
  hideDocumentMode = () => {
    this.setState({
      documentModeVisible: false
    });
  };

  selectCurrentDocument = (data: Document) => {
    this.setState({
      currentDocumentData: data
    });
  };

  removeDocument = (id: string) => {
    const { dispatch } = this.props;
    dispatch(removeDocument({ id }));
    setTimeout(() => {
      this.props.refresh();
    }, 500);
  };

  updateDocument = (data: Document) => {
    const { dispatch } = this.props;
    dispatch(updateDocument(data));
    setTimeout(() => {
      this.props.refresh();
    }, 500);
  };

  addDocument = (data: Document) => {
    const { dispatch } = this.props;
    dispatch(addDocument(data));
    setTimeout(() => {
      this.props.refresh();
    }, 500);
  };
  renderDocumentEditTitle = (item: Document) => {
    return (
      <div
        key={1}
        onClick={() => {
          this.selectCurrentDocument(item);
          this.showDocumentMode();
        }}
      >
        编辑<Icon type="edit" />
      </div>
    );
  };
  renderDocumentHistory = (item: Document) => {
    return (
      <div
        key={2}
        onClick={() => {
          this.displayDocumentHistory(item._id);
        }}
      >
        历史信息<Icon type="database" />
      </div>
    );
  };
  displayDocumentHistory = (documentId: string) => {
    this.props.getDocumentMessages(documentId);
    this.setState({
      showDocumentHistory: true
    });
  };
  hideDocumentHistory = () => {
    this.setState({
      showDocumentHistory: false
    });
  };
  render() {
    return (
      <div id="ProjectSpec">
        <Row className="documentHeader">
          <Col span={16} className="textleft">
            文档总数为{" "}
            <span className="red">{this.state.allDocuments.length}</span> 个
          </Col>
          <Col span={8}>
            <Button type="primary" onClick={() => this.addDocumentMode()}>
              添加文档
            </Button>
            {/* <Button>回收站</Button> */}
          </Col>
        </Row>

        {this.state.isLoaded && this.state.allDocuments.length >= 0 ? (
          <div className="documentList">
            <Row className="documentItem">
              {this.state.allDocuments.map((item: Document) => {
                return (
                  <Col span={6} key={item._id}>
                    {item._id !== this.props.userId ? (
                      <Card
                        hoverable={true}
                        actions={[
                          this.renderDocumentEditTitle(item),
                          this.renderDocumentHistory(item)
                        ]}
                      >
                        <ul className="documentDesc">
                          <li>名称:{item.name}</li>
                          <li>
                            类别:
                            {item.type === "spec" ? "规范" : ""}
                            {item.type === "project" ? "项目文档" : ""}
                            {item.type === "other" ? "其它" : ""}
                          </li>
                          <li>创建者: {item.ownerName}</li>
                        </ul>
                      </Card>
                    ) : (
                      <Card
                        hoverable={true}
                        actions={[
                          this.renderDocumentEditTitle(item),
                          this.renderDocumentHistory(item),
                          <div key={2}>
                            <Popconfirm
                              title="确定删除该文档么?"
                              onConfirm={() => {
                                this.removeDocument(item._id);
                              }}
                              okText="确定删除"
                              cancelText="取消"
                            >
                              删除<Icon type="close" />
                            </Popconfirm>
                          </div>
                        ]}
                      >
                        <ul className="documentDesc">
                          <li>名称:{item.name}</li>
                          <li>类别:{item.type}</li>
                          <li>创建者: {item.ownerName}</li>
                        </ul>
                      </Card>
                    )}
                  </Col>
                );
              })}
            </Row>
          </div>
        ) : null}

        {this.state.isLoaded && this.state.allDocuments.length === 0 ? (
          <div className="emptyDocument">
            <h2>
              <Icon type="frown-o" />
            </h2>
            <h2>文档库还没有任何文档</h2>
            <h2>请点击右上角按钮添加文档</h2>
          </div>
        ) : null}
        <Modal
          title="文档修改历史"
          visible={this.state.showDocumentHistory}
          onOk={this.hideDocumentHistory}
          onCancel={this.hideDocumentHistory}
          okText="确认"
          cancelText="取消"
        >
          <div className="doucmentHistory">
           {
             this.state.currentDocumentMessage.length === 0 ?
             <div>暂时还没有记录~</div>:
             null         
           }
            <Timeline>
              {this.state.currentDocumentMessage.length > 0 ? (
                this.state.currentDocumentMessage.map(
                  (item: Message, index: number) => {
                    return (
                      <Timeline.Item key={index}>
                        <div className="timeline">
                          <p className="date">
                            {new Date(item.time).toLocaleDateString() +
                              " " +
                              new Date(item.time).toLocaleTimeString()}
                          </p>
                          <div>
                            <div className="content">{item.desc}</div>
                          </div>
                        </div>
                      </Timeline.Item>
                    );
                  }
                )
              ) : 
                null
              }
            </Timeline>
          </div>
        </Modal>

        <DocumentMode
          refresh={this.props.refresh}
          addDocument={this.addDocument}
          userId={this.props.userId}
          updateDocument={this.updateDocument}
          projectList={this.props.projectList}
          hideDocumentMode={this.hideDocumentMode}
          visible={this.state.documentModeVisible}
          data={this.state.currentDocumentData}
        />
      </div>
    );
  }
}

export default connect()(ProjectSpec);
