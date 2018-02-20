import * as React from 'react';
import Badge from 'antd/lib/badge';
import Icon from 'antd/lib/icon';
import Layout from 'antd/lib/layout';
import LoadingBar from '../../../components/LoadingBar';
import Menu, { ClickParam } from 'antd/lib/menu';
import Messages from './Messages/index';
import MockModel from './MockModel/index';
import Modal from 'antd/lib/modal';
import MyProject from './MyProject/index';
import OverView from './OverView/index';
import ProjectDemo from './ProjectDemo/index';
import ProjectSpec from './ProjectSpec/index';
import TeamManage from './TeamManage/index';
import UserInfo from './UserInfo';
// import { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import {
  fetchBaseModel,
  fetchCustomModel,
  fetchDemo,
  fetchDocument,
  fetchMessages,
  fetchProject,
  fetchTeam,
  fetchUnJoinProject
  } from '../../../actions/index';
import { Link, Route, Switch } from 'react-router-dom';
import { userInfo, userLogout } from '../../../actions/user';
import './index.less';

const { Header, Sider, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;

export class DashBoard extends React.Component<AppProps, DashBoardState> {
  constructor(props: AppProps) {
    super(props)
    this.state = {
      collapsed: false,
      progress: 0,
      error: false,
      userInfoVisible: false
    };
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  errorDone = () => {
    this.setState({ error: true })
  }

  progressDone = () => {
    this.setState({ progress: 0 })
  }

  componentDidMount() {
    // 初始化拿数据
    this.getProjectDemo()
    this.getMessagesList()
    this.getTeamList();
    this.getUnJoinProjectList()
    this.getBaseModelList();
    this.getCustomModelList()
    this.getDocumentList()
  }

  componentWillReceiveProps(nextProps: AppProps) {
    // loadingbar处理过程

    if (nextProps.loadingState === 'start') {
      this.setState({
        progress: 75,
        error: false
      })
    }
    if (nextProps.loadingState === 'error') {
      this.setState({ error: true })
    }
    if (nextProps.loadingState === 'success') {
      this.setState({
        progress: 100
      })
    }
  }

  overView = () => {
    const { history } = this.props;
    history.push('/wmock/OverView');
  }
  logout = (e: ClickParam) => {
    if (e.key === 'logout') {
      // this.props.changeLoginState()
      const { dispatch, history } = this.props;
      dispatch(userLogout())
      history.push('/login');
    }
    if (e.key === 'userinfo') {
      this.showUserInfoVisible()
    }
  }
  getMessagesList = () => {
    const { dispatch } = this.props;
    dispatch(fetchMessages())
  }

  getProjectList = (user: Id) => {
    const { dispatch } = this.props;
    dispatch(fetchProject(user))
  }

  getMyProject = () => {
    const { dispatch } = this.props;
    dispatch(fetchProject({ 'id': this.props.userId }))
  }

  getProjectDemo = () => {
    const { dispatch } = this.props;
    dispatch(fetchDemo({ 'id': this.props.userId }))
  }
  getDocumentList = () => {
    this.getProjectList({ 'id': this.props.userId })
    const { dispatch } = this.props;
    dispatch(fetchDocument())
  }

  getTeamList = () => {
    const { dispatch } = this.props;
    dispatch(fetchTeam({ 'id': this.props.userId }))
  }

  getModel = () => {
    this.getBaseModelList()
    this.getCustomModelList()
  }
  getBaseModelList = () => {
    const { dispatch } = this.props;
    dispatch(fetchBaseModel())
  }

  getCustomModelList = () => {
    const { dispatch } = this.props;
    dispatch(fetchCustomModel({ 'id': this.props.userId }))
  }

  showUserInfoVisible = () => {
    this.setState({
      userInfoVisible: true
    })
  }

  hideUserInfoVisible = () => {
    this.setState({
      userInfoVisible: false
    })
  }
  getUserInfo = () => {
    const { dispatch } = this.props;
    dispatch(userInfo({ userId: this.props.userId, token: localStorage.getItem('token') }))
  }

  getUnJoinProjectList = () => {
    const { dispatch } = this.props;
    dispatch(fetchUnJoinProject({ id: this.props.userId }))

  }
  render() {
    return (
      <div id="DashBoard">
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
                <img src="http://haoqiao.qiniudn.com/dragonPng.png" alt="logo" />
              </div>
              <Menu mode="inline" defaultSelectedKeys={['1']}>

                <SubMenu
                  key="sub0"
                  title={
                    <span onClick={this.overView}>
                      <Icon type="appstore" />
                      <span>项目概况</span>
                    </span>}
                >
                  <Menu.Item key="1">
                    <Link to="/wmock/messages" onClick={this.getMessagesList}>
                      <Icon type="message" />消息中心
                      </Link>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Link to="/wmock/teamManage" onClick={() => { this.getTeamList(); this.getUnJoinProjectList() }}>
                      <Icon type="team" />
                      <Badge count={this.props.teamMessagesList.length}>
                        <span className="header">团队管理</span>
                      </Badge>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="4">
                    <Link to="/wmock/mockModel" onClick={() => { this.getBaseModelList(); this.getCustomModelList() }}>
                      <Icon type="code" />Mock数据模型
                      </Link>
                  </Menu.Item>
                </SubMenu>

                <SubMenu key="sub1" title={<span><Icon type="laptop" /><span>项目管理</span></span>}>
                  <Menu.Item key="5">
                    <Link to="/wmock/projectDemo" onClick={this.getProjectDemo}>
                      <Icon type="credit-card" />项目示例
                      </Link>
                  </Menu.Item>
                  <Menu.Item key="9">
                    <Link to="/wmock/myProject" onClick={this.getMyProject}>
                      <Icon type="credit-card" />我的项目
                      </Link>
                  </Menu.Item>
                </SubMenu>

                <Menu.Item key="7">
                  <Link to="/wmock/projectSpec" onClick={() => { this.getDocumentList() }}>
                    <Icon type="folder-open" />
                    <span>
                      文档与规范
                        </span>
                  </Link>
                </Menu.Item>

              </Menu>
            </Sider>
            <Layout>
              <Header style={{ background: '#fff' }}>
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
                <Menu
                  mode="horizontal"
                  onClick={this.logout}
                >
                  <SubMenu title={<span><Icon type="user" />{this.props.userName}</span>}>
                    <Menu.Item key="userinfo">个人信息</Menu.Item>
                    <Menu.Item key="logout">退出登录</Menu.Item>
                  </SubMenu>
                </Menu>
              </Header>
              <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                <Switch>
                  <Route path="/wmock/messages" render={() => <Messages data={this.props.messagesList} />} />
                  <Route
                    path="/wmock/mockModel"
                    render={() =>
                      <MockModel
                        refresh={() => this.getModel()}
                        baseModelList={this.props.baseModelList}
                        customModelList={this.props.customModelList}
                        userId={this.props.userId}
                      />}
                  />
                  <Route
                    path="/wmock/myProject"
                    render={() =>
                      <MyProject
                        documentList={this.props.documentList}
                        projectVerify={this.props.projectVerify}
                        otherList={this.props.demoList}
                        projectList={this.props.projectList}
                        messagesList={this.props.messagesList}
                        userId={this.props.userId}
                      />}
                  />
                  <Route
                    path="/wmock/overView"
                    render={() =>
                      <OverView
                        messagesList={this.props.messagesList}
                      />}
                  />
                  <Route
                    path="/wmock/projectDemo"
                    render={() =>
                      <ProjectDemo
                        documentList={this.props.documentList}
                        projectVerify={this.props.projectVerify}
                        projectList={this.props.demoList}
                        otherList={this.props.projectList}
                        messagesList={this.props.messagesList}
                        userId={this.props.userId}
                      />}
                  />
                  <Route
                    path="/wmock/projectSpec"
                    render={() =>
                      <ProjectSpec
                        refresh={() => this.getDocumentList()}
                        projectList={this.props.projectList}
                        documentList={this.props.documentList}
                        userId={this.props.userId}
                      />}
                  />
                  <Route
                    path="/wmock/teamManage"
                    render={() =>
                      <TeamManage
                        unJoinprojectList={this.props.unJoinprojectList}
                        userId={this.props.userId}
                        userName={this.props.userName}
                        refresh={() => { this.getTeamList(); this.getMessagesList() }}
                        teamList={this.props.teamList}
                        teamMessagesList={this.props.teamMessagesList}
                      />}
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
          width={'60%'}
          onCancel={this.hideUserInfoVisible}
          onOk={this.hideUserInfoVisible}
          cancelText="取消"
          okText="确定"
        >
          <UserInfo getUserInfo={this.getUserInfo} userData={this.props.userData} />
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state: DashBoardState) => ({
  userName: state.user.userName,
  userId: state.user.userId,
  userData: state.user,
  loadingState: state.loading.loadingState,
  messagesList: state.messages.data,
  projectList: state.project.data,
  projectVerify: state.project.verify,
  demoList: state.project.demo,
  documentList: state.document.data,
  teamList: state.team.data,
  teamMessagesList: state.messages.teamMessages,
  unJoinprojectList: state.project.unJoinList,
  baseModelList: state.model.base,
  customModelList: state.model.custom,
})

export default connect(mapStateToProps)(DashBoard);