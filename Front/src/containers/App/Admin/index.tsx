import "./index.less";

import * as React from "react";

import { Link, Route, Switch } from "react-router-dom";
import Menu, { ClickParam } from "antd/lib/menu";
import {
  allProjectList,
  fetchRemovedDocumentList,
  fetchRemovedInterfaceList,
  fetchRemovedProjectList,
  recoverDocument,
  recoverInterface,
  recoverProject
} from "../../../actions/index";
import { userInfo, userLogout } from "../../../actions/user";

import DocumentManage from "./components/DocumentManage";
import Icon from "antd/lib/icon";
import InterfaceManage from "./components/InterfaceManage";
import Layout from "antd/lib/layout";
import LoadingBar from "../../../components/LoadingBar";
import Modal from "antd/lib/modal";
import ProjectManage from "./components/ProjectManage";
import UserInfo from "../DashBoard/UserInfo";
import { connect } from "react-redux";

// import { ChangeEvent } from 'react';

const { Header, Sider, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;

export class Admin extends React.Component<AppProps, AdminState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      collapsed: false,
      progress: 0,
      error: false,
      userInfoVisible: false
    };
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  errorDone = () => {
    this.setState({ error: true });
  };

  progressDone = () => {
    this.setState({ progress: 0 });
  };

  getRemovedProjectList = () => {
    const { dispatch } = this.props;
    dispatch(fetchRemovedProjectList());
  };

  recoverProject = (projectId: string) => {
    const { dispatch } = this.props;
    dispatch(recoverProject({ projectId }));
    setTimeout(() => {
      this.getRemovedProjectList();
    }, 500);
  };

  getRemovedDocumentList = () => {
    const { dispatch } = this.props;
    dispatch(fetchRemovedDocumentList());
  };

  recoverDocument = (DocumentId: string) => {
    const { dispatch } = this.props;
    dispatch(recoverDocument({ DocumentId }));
    setTimeout(() => {
      this.getRemovedDocumentList();
    }, 500);
  };

  getRemovedInterfaceList = () => {
    const { dispatch } = this.props;
    dispatch(fetchRemovedInterfaceList());
  };

  recoverInterface = (projectId: string, interfaceId: string) => {
    const { dispatch } = this.props;
    dispatch(recoverInterface({ projectId, interfaceId }));
    setTimeout(() => {
      this.getRemovedInterfaceList();
    }, 500);
  };

  componentDidMount() {
    // 初始化拿数据
    this.getAllProject();
    this.getRemovedInterfaceList();
  }

  componentWillReceiveProps(nextProps: AppProps) {
    const { history } = this.props;
    // 防止越权访问页面
    if (nextProps.userData.role && nextProps.userData.role !== "admin") {
      history.push("/wmock/OverView");
    }

    // loadingbar处理过程
    if (nextProps.loadingState === "start") {
      this.setState({
        progress: 75,
        error: false
      });
    }
    if (nextProps.loadingState === "error") {
      this.setState({ error: true });
    }
    if (nextProps.loadingState === "success") {
      this.setState({
        progress: 100
      });
    }
  }

  logout = (e: ClickParam) => {
    if (e.key === "logout") {
      // this.props.changeLoginState()
      const { dispatch, history } = this.props;
      dispatch(userLogout());
      history.push("/login");
    }
    if (e.key === "userinfo") {
      this.showUserInfoVisible();
    }
  };

  getAllProject = () => {
    const { dispatch } = this.props;
    dispatch(allProjectList());
  };

  showUserInfoVisible = () => {
    this.setState({
      userInfoVisible: true
    });
  };

  hideUserInfoVisible = () => {
    this.setState({
      userInfoVisible: false
    });
  };
  getUserInfo = () => {
    const { dispatch } = this.props;
    dispatch(userInfo());
  };

  render() {
    return (
      <div id="Admin">
        <LoadingBar
          progress={this.state.progress}
          error={this.state.error}
          onErrorDone={this.errorDone}
          onProgressDone={this.progressDone}
          direction="right"
        />
        <div className="aside">
          <Layout>
            <Sider
              trigger={null}
              collapsible={true}
              collapsed={this.state.collapsed}
            >
              <div className="logo">
                <img
                  src="http://haoqiao.qiniudn.com/dragonPng.png"
                  alt="logo"
                />
              </div>
              <Menu mode="inline" defaultSelectedKeys={["1"]}>
                <SubMenu
                  key="sub0"
                  title={
                    <span>
                      <Icon type="appstore" />
                      <span>误删恢复</span>
                    </span>
                  }
                >
                  <Menu.Item key="0">
                    <Link
                      to="/admin/DocumentManage"
                      onClick={() => {
                        this.getRemovedDocumentList();
                      }}
                    >
                      <Icon type="folder" />文档恢复
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="1">
                    <Link
                      to="/admin/ProjectManage"
                      onClick={() => {
                        this.getRemovedProjectList();
                      }}
                    >
                      <Icon type="laptop" />项目恢复
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link
                      to="/admin/InterfaceManage"
                      onClick={() => {
                        this.getRemovedInterfaceList();
                      }}
                    >
                      <Icon type="credit-card" />接口恢复
                    </Link>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout>
              <Header style={{ background: "#fff" }}>
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                  onClick={this.toggle}
                />
                <Menu mode="horizontal" onClick={this.logout}>
                  <SubMenu
                    title={
                      <span>
                        <Icon type="user" />
                        {this.props.userName}
                      </span>
                    }
                  >
                    <Menu.Item key="userinfo">个人信息</Menu.Item>
                    <Menu.Item key="logout">退出登录</Menu.Item>
                  </SubMenu>
                </Menu>
              </Header>
              <Content
                style={{
                  margin: "24px 16px",
                  padding: 24,
                  background: "#fff",
                  minHeight: 280
                }}
              >
                <Switch>
                  <Route
                    path="/admin/InterfaceManage"
                    render={() => (
                      <InterfaceManage
                        removedInterfaceList={this.props.removedInterfaceList}
                        recoverInterface={this.recoverInterface}
                      />
                    )}
                  />
                  <Route
                    path="/admin/ProjectManage"
                    render={() => (
                      <ProjectManage
                        removedProjectList={this.props.removedProjectList}
                        recoverProject={this.recoverProject}
                      />
                    )}
                  />
                  <Route
                    path="/admin/DocumentManage"
                    render={() => (
                      <DocumentManage
                        removedDocumentList={this.props.removedDocumentList}
                        recoverDocument={this.recoverDocument}
                      />
                    )}
                  />
                </Switch>
              </Content>
              <Footer>Wmock ©2018 Created by LinShuiZhaoYing</Footer>
            </Layout>
          </Layout>
        </div>
        <Modal
          title="个人信息设置"
          visible={this.state.userInfoVisible}
          width={"60%"}
          onCancel={this.hideUserInfoVisible}
          onOk={this.hideUserInfoVisible}
          cancelText="取消"
          okText="确定"
        >
          <UserInfo
            getUserInfo={this.getUserInfo}
            userData={this.props.userData}
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state: AdminState) => ({
  userName: state.user.userName,
  isLogin: state.user.isLogin,
  userData: state.user,
  loadingState: state.loading.loadingState,
  removedInterfaceList: state.project.removedInterfaceList,
  removedProjectList: state.project.removedProjectList,
  removedDocumentList: state.document.removedDocumentList
});

export default connect(mapStateToProps)(Admin);
