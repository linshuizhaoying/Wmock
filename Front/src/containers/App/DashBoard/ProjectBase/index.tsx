import "./index.less";

import * as React from "react";

import {
  addInterface,
  addProject,
  cloneInterface,
  cloneProject,
  importProject,
  invitedGroupMember,
  removeInterface,
  removeProject,
  updateInterface,
  updateProject,
  verifyProject
} from "../../../../actions";

import Alert from "antd/lib/alert";
import Button from "antd/lib/button";
import Card from "antd/lib/card";
import { ChangeEvent } from "react";
import Collapse from "antd/lib/collapse";
import Icon from "antd/lib/icon";
import InterfaceMode from "./components/ProjectDetail/components/InterfaceMode";
import Message from "antd/lib/message";
import { MockUrl } from "../../../../service/api";
import Modal from "antd/lib/modal";
import NewProject from "./components/NewProject";
import Popconfirm from "antd/lib/popconfirm";
import ProjectDetail from "./components/ProjectDetail";
import Select from "antd/lib/select";
import Spin from "antd/lib/spin";
import Tag from "antd/lib/tag";
import Tooltip from "antd/lib/tooltip";
import Tree from "antd/lib/tree";
import Upload from "antd/lib/upload";
import { UploadFile } from "antd/es/upload/interface";
import Validator from "../../../../util/validator";
import { connect } from "react-redux";
import { exportFile } from "../../../../util/fileExport";
import { isEqual } from "../../../../util/helper";
import { isJson } from "../../../../util/helper";
import notification from "antd/lib/notification";

// import jsBeautify from 'js-beautify/js/lib/beautify';
// import jsondiffpatch from 'jsondiffpatch'
let jsondiffpatch = require("jsondiffpatch");

const { Option, OptGroup } = Select;
const TreeNode = Tree.TreeNode;
const Dragger = Upload.Dragger;
const Panel = Collapse.Panel;

let inviteMemberEmailInput: HTMLInputElement;

export class ProjectBase extends React.Component<AppProps, ProjectState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      allData: [],
      allMessages: [],
      currentProjectMessages: [],
      currentProjectData: "",
      currentInterfaceData: {},
      newProject: false,
      importProject: false,
      cloneProject: false,
      cloneInterface: false,
      exportProject: false,
      inviteGroupMember: false,
      inviteMemberEmail: "",
      interfaceModeVisible: false,
      autoCheckVisible: false,
      uploadProject: false,
      uploadJsonData: "",
      uploadSelectType: "demo",
      currentCloneProjectType: "demo",
      currentCloneProjectId: "",
      currentCloneInterfaceId: "",
      verifyResult: "",
      verifyData: [],
      allDocumentList: [],
      currentDocumentList: [],
      currentCloneInterfaceProjectId: "",
      verifyDisplay: "html",
      baseModelList: [],
      customModelList: [],
      verifyModalState: "hide"
    };
  }

  componentWillReceiveProps(nextProps: AppProps) {
    // 每次只更新变动的项目内容
    if (
      nextProps.projectList.length > 0 &&
      !isEqual(nextProps.projectList, this.state.allData)
    ) {
      this.setState({ allData: nextProps.projectList }, () => {
        // 即时更新选中的项目里的内容
        nextProps.projectList.map((item: Project) => {
          if (item._id === this.state.currentProjectData._id) {
            this.setState({
              currentProjectData: item
            });
          }
        });
      });
    }
    // 每次只更新变动的项目动态
    if (
      nextProps.messagesList.length > 0 &&
      !isEqual(nextProps.messagesList, this.state.allMessages)
    ) {
      this.setState({
        allMessages: nextProps.messagesList
      });
    }
    // 更新自动校验内的数据
    // console.log(nextProps.projectVerify.data, this.state.verifyData);
    // console.log(isEqual(nextProps.projectVerify.data, this.state.verifyData));
    if (
      nextProps.projectVerify.data &&
      nextProps.projectVerify.data.length > 0 &&
      !isEqual(nextProps.projectVerify.data, this.state.verifyData)
    ) {
      if (this.state.verifyModalState === "show") {
        // 只有有数据而且点击了展示按钮才显示Modal
        this.setState({
          autoCheckVisible: true,
          verifyResult: nextProps.projectVerify.result,
          verifyData: nextProps.projectVerify.data
        });
      }
    }
    // 更新自动文档数据

    if (
      nextProps.documentList.length >= 0 &&
      !isEqual(nextProps.documentList, this.state.allDocumentList)
    ) {
      this.setState({ allDocumentList: nextProps.documentList }, () => {
        // 如果是在项目内操作文档,那么更新项目内的文档数据
        if (this.state.currentDocumentList.length > 0) {
          this.selectDocument(this.state.currentProjectData._id);
        }
      });
    }

    // 每次只更新变动的模型
    if (
      nextProps.baseModelList.length >= 0 &&
      !isEqual(nextProps.baseModelList, this.state.baseModelList)
    ) {
      this.setState({
        baseModelList: nextProps.baseModelList
      });
    }

    // 每次只更新变动的模型
    if (
      nextProps.customModelList.length >= 0 &&
      !isEqual(nextProps.customModelList, this.state.customModelList)
    ) {
      this.setState({
        customModelList: nextProps.customModelList
      });
    }
  }

  selectProject = (id: string) => {
    this.state.allData.map((project: Project) => {
      if (project._id === id) {
        this.setState({
          currentProjectData: project
        });
      }
    });
    // 筛选出对应项目的动态
    let arr: Array<Message> = [];
    this.state.allMessages.map((item: Message) => {
      if (item.projectId === id) {
        arr.push(item);
      }
    });
    this.setState({
      currentProjectMessages: arr
    });
    this.selectDocument(id);
  };
  selectDocument = (id: string) => {
    // 筛选出选中文档
    let documentTemp: Document[] = [];
    this.state.allDocumentList.map((item: Document) => {
      item.assign.map((projectId: string) => {
        if (projectId === id) {
          documentTemp.push(item);
        }
      });
    });
    this.setState({
      currentDocumentList: documentTemp
    });
  };

  // 新建项目

  handleOk = (projectName: string, url: string, desc: string) => {
    if (projectName === "") {
      notification.error({
        message: "出错啦!",
        description: "项目名称必须填写不能为空."
      });
    }
    if (url === "") {
      notification.error({
        message: "出错啦!",
        description: "项目URL必须填写不能为空."
      });
    }
    if (desc === "") {
      desc = projectName;
    }
    if (projectName && url && desc) {
      const { dispatch } = this.props;
      dispatch(
        addProject({
          projectName,
          projectUrl: url,
          projectDesc: desc,
          type: this.props.type,
          transferUrl: MockUrl
        })
      );
      this.setState({
        newProject: false
      });
      setTimeout(() => {
        if (this.props.type === "demo") {
          this.props.getProjectDemo();
        } else {
          this.props.getMyProject();
        }
      }, 500);
    }
  };

  // 更新项目

  update = (data: Project) => {
    const { dispatch } = this.props;

    dispatch(updateProject(data));
    // this.selectProject(data._id)
  };

  // 验证项目

  verify = (id: Id) => {
    const { dispatch } = this.props;

    dispatch(verifyProject(id));
    // this.selectProject(data._id)
  };

  handleCancel = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newProject: false
    });
  };
  toggleNewProject = () => {
    this.setState({
      newProject: true
    });
  };

  // 导入导出项目

  showimportProject = () => {
    this.setState({
      importProject: true
    });
  };
  showExportProject = () => {
    this.setState({
      exportProject: true
    });
  };

  selectUpload = (value: string) => {
    this.setState({
      uploadSelectType: value
    });
  };

  selectProjectClone = (value: string) => {
    this.setState({
      currentCloneProjectType: value
    });
  };

  selectInterfaceClone = (value: string) => {
    this.setState({
      currentCloneInterfaceProjectId: value
    });
  };

  importProjectOk = (e: React.FormEvent<HTMLFormElement>) => {
    const data = JSON.parse(this.state.uploadJsonData);
    data.type = this.state.uploadSelectType;
    data.masterId = this.props.userId;
    const { dispatch } = this.props;
    dispatch(importProject(data));

    this.setState({
      importProject: false,
      uploadProject: false,
      uploadJsonData: "",
      uploadSelectType: "demo"
    });

    setTimeout(() => {
      if (this.props.type === "demo") {
        this.props.getProjectDemo();
      } else {
        this.props.getMyProject();
      }
    }, 500);
  };

  cloneProjectOk = (e: React.FormEvent<HTMLFormElement>) => {
    const { dispatch } = this.props;
    dispatch(
      cloneProject({
        projectId: this.state.currentCloneProjectId,
        type: this.state.currentCloneProjectType
      })
    );
    setTimeout(() => {
      if (this.state.currentCloneProjectType === "demo") {
        this.props.getProjectDemo();
      } else {
        this.props.getMyProject();
      }
    }, 500);
    this.setState({
      cloneProject: false,
      currentCloneProjectId: ""
    });
  };
  cloneInterfaceOk = (e: React.FormEvent<HTMLFormElement>) => {
    const { dispatch } = this.props;
    dispatch(
      cloneInterface({
        interfaceId: this.state.currentCloneInterfaceId,
        projectId: this.state.currentCloneInterfaceProjectId
      })
    );
    this.setState({
      cloneInterface: false,
      currentCloneInterfaceId: ""
    });
    setTimeout(() => {
      if (this.props.type === "demo") {
        this.props.getProjectDemo();
      } else {
        this.props.getMyProject();
      }
    }, 500);
  };

  cloneProjectCancel = (e: React.FormEvent<HTMLFormElement>) => {
    this.setState({
      cloneProject: false
    });
  };

  cloneInterfaceCancel = (e: React.FormEvent<HTMLFormElement>) => {
    this.setState({
      cloneInterface: false
    });
  };
  importProjectCancel = (e: React.FormEvent<HTMLFormElement>) => {
    this.setState({
      importProject: false
    });
  };
  filterData = (json: object) => {
    let expectArr = ["_id", "teamMember"];
    let filterArr = [];
    let result = "";
    for (let key in json) {
      if (expectArr.indexOf(key) === -1) {
        filterArr.push(key);
        // 如果是嵌套数组，而且数组内有数据
        if (
          Object.prototype.toString.call(json[key]) === "[object Array]" &&
          json[key].length > 0
        ) {
          for (let item in json[key][0]) {
            // 同样对里面的json数据进行属性字段过滤
            if (expectArr.indexOf(item) === -1) {
              filterArr.push(item);
            }
          }
        }
      }
    }
    result = JSON.stringify(this.state.currentProjectData, filterArr);
    return result;
  };
  exportJson = () => {
    exportFile(
      this.filterData(this.state.currentProjectData),
      "default.json",
      "json"
    );
    Message.success("项目导出成功!");
  };
  exportMarkdown = () => {
    exportFile(
      JSON.stringify(this.state.currentProjectData),
      "default.md",
      "markdwon"
    );
    Message.success("项目导出成功!");
  };
  exportWord = () => {
    Message.success("项目导出成功!");
    exportFile(
      JSON.stringify(this.state.currentProjectData),
      "default.doc",
      "doc"
    );
  };
  exportProjectCancel = (e: React.FormEvent<HTMLFormElement>) => {
    this.setState({
      exportProject: false
    });
  };

  cloneCurrentProject = (projectId: string) => {
    this.setState({
      currentCloneProjectId: projectId,
      cloneProject: true
    });
  };

  cloneCurrentInterface = (interfaceId: string) => {
    this.setState({
      currentCloneInterfaceId: interfaceId,
      cloneInterface: true
    });
  };
  deleteProject = (projectId: string) => {
    const { dispatch } = this.props;
    dispatch(removeProject({ id: projectId }));
  };
  addInterface = (data: Interface) => {
    const { dispatch } = this.props;
    dispatch(addInterface(data));
    // 因为添加是没有拿到Id,因此需要刷新一下整个数据
    setTimeout(() => {
      if (this.props.type === "demo") {
        this.props.getProjectDemo();
      } else {
        this.props.getMyProject();
      }
    }, 500);
  };

  updateInterface = (data: Interface) => {
    const { dispatch } = this.props;
    dispatch(updateInterface(data));
  };

  removeInterface = (data: Id) => {
    const { dispatch } = this.props;
    dispatch(removeInterface(data));
  };

  // 邀请成员

  showInviteGroupMember = () => {
    this.setState({
      inviteGroupMember: true
    });
  };

  inviteGroupMemberOk = (e: React.FormEvent<HTMLFormElement>) => {
    if (Validator.emailCheck(this.state.inviteMemberEmail)) {
      const { dispatch } = this.props;
      dispatch(
        invitedGroupMember({
          userEmail: this.state.inviteMemberEmail,
          projectId: this.state.currentProjectData._id
        })
      );
      this.setState({
        inviteGroupMember: false
      });
    } else {
      notification.error({
        message: "出错啦!",
        description: "邮箱地址格式错误!"
      });
    }
  };
  inviteGroupMemberCancel = (e: React.FormEvent<HTMLFormElement>) => {
    this.setState({
      inviteGroupMember: false
    });
  };

  inviteMemberEmailEmpty = () => {
    inviteMemberEmailInput.focus();
    this.setState({
      inviteMemberEmail: ""
    });
  };

  onChangeinviteMemberEmail = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inviteMemberEmail: e.target.value });
  };

  showInterfaceMode = () => {
    this.setState({
      interfaceModeVisible: true
    });
  };
  hideInterfaceMode = () => {
    this.setState({
      interfaceModeVisible: false
    });
  };

  selectCurrentInterface = (data: Interface) => {
    this.setState({
      currentInterfaceData: data
    });
  };

  showAddInterface = () => {
    this.setState({
      currentInterfaceData: {},
      interfaceModeVisible: true
    });
  };

  showAutoCheckVisible = (projectId: string) => {
    this.setState(
      {
        verifyResult: "",
        verifyData: [],
        verifyModalState: "show"
      },
      () => {
        this.verify({ id: projectId });
      }
    );
  };

  hideAutoCheckVisible = () => {
    this.setState({
      autoCheckVisible: false,
      verifyResult: "",
      verifyData: [],
      verifyModalState: "hide"
    });
  };

  changeVerifyDisplay = (type: string) => {
    this.setState({
      verifyDisplay: type
    });
  };

  renderTreeProjectTitle = (project: Project) => {
    return (
      <div
        className="projectType"
        onClick={() => {
          this.selectProject(project._id);
        }}
      >
        <div className="projectName">
          <Icon type="folder-open" />
          {project.projectName}
        </div>
        <div className="projectOperate">
          {this.props.userId === project.masterId ? (
            <Popconfirm
              title="确定删除该项目么(项目删除后所有关于该项目的信息都会清空)?"
              onConfirm={() => {
                this.deleteProject(project._id);
              }}
              okText="确定删除"
              cancelText="取消"
            >
              <Tooltip placement="right" title={"删除项目"}>
                <Icon type="delete" className="operate-icon" />
              </Tooltip>
            </Popconfirm>
          ) : null}

          <Popconfirm
            title="确定克隆该项目么?"
            onConfirm={() => {
              this.cloneCurrentProject(project._id);
            }}
            okText="确定克隆"
            cancelText="取消"
          >
            <Tooltip placement="right" title={"克隆项目"}>
              <Icon type="copy" className="operate-icon" />
            </Tooltip>
          </Popconfirm>
        </div>
      </div>
    );
  };
  renderTreeInterfaceTitle = (projectId: string, item: InterfaceWithFull) => {
    return (
      <div className="interfaceType">
        {this.props.userRole !== "front" ? (
          <div
            className="interfaceName"
          >
            <Icon type="code-o" />
            {item.interfaceName}
          </div>
        ) : (
          <div
            className="interfaceName"
            onClick={() => {
              this.selectProject(projectId);
              this.selectCurrentInterface(item);
              this.showInterfaceMode();
            }}
          >
            <Icon type="code-o" />
            {item.interfaceName}
          </div>
        )}

        <div className="interfaceOperate">
          <Popconfirm
            title="确定克隆该接口么?"
            onConfirm={() => {
              this.cloneCurrentInterface(item._id);
            }}
            okText="确定克隆"
            cancelText="取消"
          >
            <Tooltip placement="top" title={"克隆接口"}>
              <Icon type="copy" className="operate-icon" />
            </Tooltip>
          </Popconfirm>
        </div>
      </div>
    );
  };
  checkJson = (file: Blob) => {
    var reader = new FileReader(); // 读取操作都是由FileReader完成的
    var that = this;
    reader.readAsText(file);
    reader.onload = function() {
      // 读取完毕从中取值
      const json = this.result;
      if (isJson(json) && that.state.uploadJsonData.length === 0) {
        that.setState({
          uploadProject: true,
          uploadJsonData: json
        });
        Message.success("Json文件上传识别成功!");
      }
    };
  };
  render() {
    const uploadProps = {
      name: "file",
      action: "",
      showUploadList: false,
      beforeUpload: (file: UploadFile) => {
        {
          const isJSON = file.type === "application/json";
          if (!isJSON) {
            Message.error("只允许上传JSON格式文件!");
          }
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isLt2M) {
            Message.error("JSON文件大小必须小于 2MB!");
          }
          const fileBlob: Blob = new Blob([file]);
          this.checkJson(fileBlob);
          return false;
        }
      }
    };

    return (
      <div>
        {this.props.projectList.length > 0 ? (
          <div id="ProjectBase">
            <div className="projectTree">
              <div className="addProject">
                <Tooltip placement="right" title={"添加项目"}>
                  <Icon type="plus-circle" onClick={this.toggleNewProject} />
                </Tooltip>
                <Tooltip placement="right" title={"导入项目"}>
                  <Icon type="left-circle" onClick={this.showimportProject} />
                </Tooltip>
              </div>
              <Card style={{ width: 280 }}>
                <Tree>
                  {this.props.projectList.map((project: Project) => {
                    return (
                      <TreeNode
                        title={this.renderTreeProjectTitle(project)}
                        key={project._id}
                      >
                        {project.interfaceList
                          ? project.interfaceList.map(
                              (item: InterfaceWithFull) => {
                                return (
                                  <TreeNode
                                    title={this.renderTreeInterfaceTitle(
                                      project._id,
                                      item
                                    )}
                                    key={item._id}
                                  />
                                );
                              }
                            )
                          : null}
                      </TreeNode>
                    );
                  })}
                </Tree>
              </Card>
            </div>
            <div className="projectContent">
              {this.state.currentProjectData ? (
                <ProjectDetail
                  selectDocument={this.selectDocument}
                  userId={this.props.userId}
                  userRole={this.props.userRole}
                  documentList={this.state.currentDocumentList}
                  projectList={this.props.projectList}
                  removeInterface={this.removeInterface}
                  showAutoCheckVisible={this.showAutoCheckVisible}
                  showAddInterface={this.showAddInterface}
                  data={this.state.currentProjectData}
                  messages={this.state.currentProjectMessages}
                  showExportProject={this.showExportProject}
                  showInviteGroupMember={this.showInviteGroupMember}
                  showInterfaceMode={this.showInterfaceMode}
                  selectCurrentInterface={this.selectCurrentInterface}
                  update={this.update}
                  documentRefresh={this.props.documentRefresh}
                  documentMessages={this.props.documentMessages}
                  getDocumentMessages={this.props.getDocumentMessages}
                />
              ) : (
                <div>
                  {this.props.type === "demo" ? (
                    <div>
                      <h2>项目示例说明</h2>
                      <div className="demoDesc">
                        <h3>
                          项目示例仅作为演示项目,如果需要可以复制到自己账号上,基于模板进行开发。
                        </h3>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h2>我的项目说明</h2>
                      <div className="demoDesc">
                        <h3>
                          项目可以自由导入导出、克隆，接口也支持克隆操作。项目默认转发本身，支持切换到实际后台接口。
                        </h3>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="nodata">
            <img src={require("./nodata.jpg")} alt="no Data" />
            <Button onClick={() => this.toggleNewProject()}>
              {" "}
              去添加新项目
            </Button>
          </div>
        )}

        <NewProject
          visible={this.state.newProject}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
        />
        <div>
          <Modal
            title="导入项目"
            visible={this.state.importProject}
            onOk={this.importProjectOk}
            onCancel={this.importProjectCancel}
            okText="确认"
            cancelText="取消"
          >
            {!this.state.uploadProject ? (
              <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">
                  点击上传JSON文件或者拖拽上传JSON文件
                </p>
              </Dragger>
            ) : (
              <div>
                <h3>选择导入到:</h3>
                <Select
                  defaultValue="demo"
                  style={{ width: 400 }}
                  onChange={this.selectUpload}
                >
                  <Option value="demo">演示项目</Option>
                  <Option value="user">我的项目</Option>
                </Select>
              </div>
            )}
          </Modal>

          <Modal
            title="导出项目"
            visible={this.state.exportProject}
            width="600px"
            onCancel={this.exportProjectCancel}
            footer={null}
          >
            <div className="export">
              <h4>导出格式</h4>
              <ul>
                <li>
                  <Tooltip placement="top" title={"导出项目为JSON格式"}>
                    <img
                      className="json"
                      src={require("./json.png")}
                      onClick={this.exportJson}
                    />
                  </Tooltip>
                </li>
                <li>
                  <Tooltip placement="top" title={"导出项目为MarkDown格式"}>
                    <img
                      className="markdown"
                      src={require("./markdown.png")}
                      onClick={this.exportMarkdown}
                    />
                  </Tooltip>
                </li>
                <li>
                  <Tooltip placement="top" title={"导出项目为Word格式"}>
                    <img
                      className="word"
                      src={require("./word.png")}
                      onClick={this.exportWord}
                    />
                  </Tooltip>
                </li>
              </ul>
            </div>
          </Modal>

          <Modal
            title="自动校验"
            visible={this.state.autoCheckVisible}
            width={800}
            onCancel={this.hideAutoCheckVisible}
            footer={null}
          >
            {this.state.verifyData.length > 0 ? (
              <div>
                <h2>
                  {this.state.verifyResult === "no" ? (
                    <div>
                      <Alert
                        message={
                          <div className="verify-alert">
                            <p>接口校验不匹配</p>{" "}
                            {this.state.verifyDisplay === "html" ? (
                              <div
                                onClick={() =>
                                  this.changeVerifyDisplay("annotated")
                                }
                              >
                                <Tag color="magenta">转为详细说明</Tag>
                              </div>
                            ) : (
                              <div
                                onClick={() => this.changeVerifyDisplay("html")}
                              >
                                <Tag color="cyan">转为可视化界面</Tag>
                              </div>
                            )}
                          </div>
                        }
                        type="error"
                        showIcon={true}
                      />
                    </div>
                  ) : (
                    <div>
                      <Alert
                        message="接口校验匹配"
                        type="success"
                        showIcon={true}
                      />
                    </div>
                  )}

                  <Collapse bordered={false}>
                    {this.state.verifyData.map(
                      (item: ProjectVerify, index: number) => {
                        let match =
                          item.compare === "match" ? "匹配" : "不匹配";
                        return item.compare !== "match" ? (
                          <Panel
                            key={index.toString()}
                            header={"接口 " + item.interfaceName + " " + match}
                          >
                            <div>
                              <span>数据对比</span>
                              {this.state.verifyDisplay === "html" ? (
                                <div
                                  className="content"
                                  dangerouslySetInnerHTML={{
                                    __html: jsondiffpatch.formatters.html.format(
                                      jsondiffpatch.diff(
                                        item.expect,
                                        item.actual
                                      ),
                                      item.expect
                                    )
                                  }}
                                />
                              ) : (
                                <div
                                  className="content"
                                  dangerouslySetInnerHTML={{
                                    __html: jsondiffpatch.formatters.annotated.format(
                                      jsondiffpatch.diff(
                                        item.expect,
                                        item.actual
                                      ),
                                      item.expect
                                    )
                                  }}
                                />
                              )}

                              {/* {jsBeautify.js_beautify(jsondiffpatch.diff(item.expect, item.actual))} */}
                              {/* {JSON.parse(JSON.stringify(item.actual))} */}
                            </div>
                          </Panel>
                        ) : null;
                      }
                    )}
                  </Collapse>
                </h2>
              </div>
            ) : (
              <h3>
                校验中,请稍后...<Spin size="large" />
              </h3>
            )}
          </Modal>
          <Modal
            title="克隆项目"
            visible={this.state.cloneProject}
            onOk={this.cloneProjectOk}
            onCancel={this.cloneProjectCancel}
            okText="确认"
            cancelText="取消"
          >
            <div>
              <h3>选择克隆到:</h3>
              <Select
                defaultValue="demo"
                style={{ width: 400 }}
                onChange={this.selectProjectClone}
              >
                <Option value="demo">演示项目</Option>
                <Option value="user">我的项目</Option>
              </Select>
            </div>
          </Modal>

          <Modal
            title="克隆接口"
            visible={this.state.cloneInterface}
            onOk={this.cloneInterfaceOk}
            onCancel={this.cloneInterfaceCancel}
            okText="确认"
            cancelText="取消"
          >
            <div>
              <h3>选择克隆到:</h3>

              {this.props.type === "user" ? (
                <Select
                  style={{ width: 400 }}
                  onChange={this.selectInterfaceClone}
                >
                  <OptGroup label="演示项目">
                    {this.props.otherList.map(
                      (item: Project, index: number) => {
                        return (
                          <Option key={index} value={item._id}>
                            {item.projectName}
                          </Option>
                        );
                      }
                    )}
                  </OptGroup>
                  <OptGroup label="我的项目">
                    {this.props.projectList.map(
                      (item: Project, index: number) => {
                        return (
                          <Option key={index} value={item._id}>
                            {item.projectName}
                          </Option>
                        );
                      }
                    )}
                  </OptGroup>
                </Select>
              ) : (
                <Select
                  style={{ width: 400 }}
                  onChange={this.selectInterfaceClone}
                >
                  <OptGroup label="演示项目">
                    {this.props.projectList.map(
                      (item: Project, index: number) => {
                        return (
                          <Option key={index} value={item._id}>
                            {item.projectName}
                          </Option>
                        );
                      }
                    )}
                  </OptGroup>
                  <OptGroup label="我的项目">
                    {this.props.otherList.map(
                      (item: Project, index: number) => {
                        return (
                          <Option key={index} value={item._id}>
                            {item.projectName}
                          </Option>
                        );
                      }
                    )}
                  </OptGroup>
                </Select>
              )}
            </div>
          </Modal>

          <InterfaceMode
            addInterface={this.addInterface}
            updateInterface={this.updateInterface}
            projectId={this.state.currentProjectData._id}
            data={this.state.currentInterfaceData}
            visible={this.state.interfaceModeVisible}
            hideInterfaceMode={this.hideInterfaceMode}
            customModelList={this.state.customModelList}
            baseModelList={this.state.baseModelList}
          />
        </div>
      </div>
    );
  }
}

export default connect()(ProjectBase);
