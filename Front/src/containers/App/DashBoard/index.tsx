import * as React from 'react';
import { connect } from 'react-redux';
import Icon from 'antd/lib/icon';
import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import { Link, Switch, Route } from 'react-router-dom';

// 加载子组件
import './index.less';
import Messages from './Messages/index';
import MockModel from './MockModel/index';
import MyProject from './MyProject/index';
import OverView from './OverView/index'
import ProjectDemo from './ProjectDemo/index';
import ProjectSpec from './ProjectSpec/index';
import TeamManage from './TeamManage/index';
import LoadingBar from '../../../components/LoadingBar';
// import { isEqual } from '../../../util/helper'
import { userLogout, userInfo } from '../../../actions/user';
import { fetchMessages, fetchProject, fetchDemo, fetchDocument, fetchTeam, fetchUnJoinProject, fetchBaseModel, fetchCustomModel } from '../../../actions/index';
import UserInfo from './UserInfo'
import Modal from 'antd/lib/modal';
import Badge from 'antd/lib/badge';
// import Upload from 'antd/lib/upload';

const { Header, Sider, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;
export class DashBoard extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.logout = this.logout.bind(this);
    this.state = {
      collapsed: false,
      progress: 0,
      error: false,
      // messagesList: [],
      // teamMessagesList: [],
      // projectList: [],
      // projectVerify: [],
      // demoList: [],
      // documentList: [],
      // teamList: [],
      // baseModelList: [],
      // customModelList: [],
      userInfoVisible: false
    };
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  errorDone() {
    this.setState({ error: true })
  }

  progressDone() {
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

  componentWillReceiveProps(nextProps: any) {
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
    // // 获取最新消息列表
    // if (nextProps.messagesList.length >= 0 && !isEqual(nextProps.messagesList, this.state.messagesList)) {
    //   this.setState({
    //     messagesList: nextProps.messagesList
    //   }, () => {
    //     // console.log(this.state.messagesList)
    //   })
    // }

    // // 获取最新团队消息列表
    // if (nextProps.teamMessagesList.length >= 0 && !isEqual(nextProps.teamMessagesList, this.state.teamMessagesList)) {
    //   this.setState({
    //     teamMessagesList: nextProps.teamMessagesList
    //   }, () => {
    //     // console.log(this.state.messagesList)
    //   })
    // }

    // // 获取最新项目列表
    // if (nextProps.projectList.length && !isEqual(nextProps.projectList, this.state.projectList)) {
    //   this.setState({
    //     projectList: nextProps.projectList
    //   }, () => {
    //     // console.log(this.state.projectList)
    //   })
    // }

    // // 获取最新演示项目列表
    // if (nextProps.demoList.length && !isEqual(nextProps.demoList, this.state.demoList)) {
    //   this.setState({
    //     demoList: nextProps.demoList
    //   }, () => {
    //     // console.log(this.state.projectList)
    //   })
    // }

    // // 获取最新项目校验结果
    // if (nextProps.projectVerify && !isEqual(nextProps.projectVerify, this.state.projectVerify)) {
    //   this.setState({
    //     projectVerify: nextProps.projectVerify
    //   }, () => {
    //     console.log(this.state.projectVerify)
    //   })
    // }


    // // 获取最新文档列表
    // if (nextProps.documentList.length >= 0 && !isEqual(nextProps.documentList, this.state.documentList)) {
    //   this.setState({
    //     documentList: nextProps.documentList
    //   }, () => {
    //      console.log(this.state.documentList)
    //   })
    // }

    // // 获取最新团队列表
    // if (nextProps.teamList.length >= 0 && !isEqual(nextProps.teamList, this.state.teamList)) {
    //   this.setState({
    //     teamList: nextProps.teamList
    //   }, () => {
    //     // console.log(this.state.projectList)
    //   })
    // }

    // // 获取最新Base Model列表
    // if (nextProps.baseModelList.length >= 0 && !isEqual(nextProps.baseModelList, this.state.baseModelList)) {
    //   this.setState({
    //     baseModelList: nextProps.baseModelList
    //   }, () => {
    //     // console.log(this.state.projectList)
    //   })
    // }
    // // 获取最新Custom Model列表
    // if (nextProps.customModelList.length >= 0 && !isEqual(nextProps.customModelList, this.state.customModelList)) {
    //   this.setState({
    //     customModelList: nextProps.customModelList
    //   }, () => {
    //     // console.log(this.state.projectList)
    //   })
    // }
  }

  overView = () => {
    const { history } = this.props;
    history.push('/wmock/OverView');
  }
  logout = (e: any) => {
    if (e.key === 'logout') {
      const { dispatch, history } = this.props;
      dispatch(userLogout())
      history.push('/login')
    }
    if (e.key === 'userinfo') {
      this.showUserInfoVisible()
    }
  }
  getMessagesList = () => {
    const { dispatch } = this.props;
    dispatch(fetchMessages())
  }

  getProjectList = (user: any) => {
    const { dispatch } = this.props;
    dispatch(fetchProject(user))
  }

  getMyProject = () => {
    const { dispatch } = this.props;
    dispatch(fetchProject({ 'username': this.props.username }))
  }

  getProjectDemo = () => {
    const { dispatch } = this.props;
    dispatch(fetchDemo({ 'username': this.props.username }))
  }
  getDocumentList = () => {
    this.getProjectList({ 'username': this.props.username })
    const { dispatch } = this.props;
    dispatch(fetchDocument())
  }

  getTeamList = () => {
    const { dispatch } = this.props;
    dispatch(fetchTeam({ 'id': this.props.userid }))
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
    dispatch(fetchCustomModel({ 'id': this.props.userid }))
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
    dispatch(userInfo({ userid: this.props.userid, token: localStorage.getItem('token') }))
  }

  getUnJoinProjectList = () => {
    const { dispatch } = this.props;
    dispatch(fetchUnJoinProject({ id: this.props.userid }))

  }
  render() {
    return (
      <div id="DashBoard">
        <LoadingBar
          progress={this.state.progress}
          error={this.state.error}
          onErrorDone={this.errorDone.bind(this)}
          onProgressDone={this.progressDone.bind(this)}
          direction='right'
        />

        <div className="aside">
          <Layout>
            <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
            >
              <div className="logo">
                <img src="http://haoqiao.qiniudn.com/dragonPng.png" alt="logo" />
              </div>
              <Menu mode="inline" defaultSelectedKeys={['1']}>

                <SubMenu key="sub0" title={<span onClick={this.overView}><Icon type="appstore" /><span>项目概况</span></span>} >
                  <Menu.Item key="1">
                    <Link to='/wmock/messages' onClick={this.getMessagesList}>
                      <Icon type="message" />消息中心
                      </Link>
                  </Menu.Item>
                  {/* <Menu.Item key="2">
                      <Link to='/wmock/template' >
                        <Icon type="copy" />前后端模板
                      </Link>
                    </Menu.Item> */}
                  <Menu.Item key="3">
                    <Link to='/wmock/teamManage' onClick={() => { this.getTeamList(); this.getUnJoinProjectList() }}>
                      <Icon type="team" /> <Badge count={this.props.teamMessagesList.length}> <span className="header">团队管理</span></Badge>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="4">
                    <Link to='/wmock/mockModel' onClick={() => { this.getBaseModelList(); this.getCustomModelList() }}>
                      <Icon type="code" />Mock数据模型
                      </Link>
                  </Menu.Item>
                </SubMenu>

                <SubMenu key="sub1" title={<span><Icon type="laptop" /><span>项目管理</span></span>}>
                  <Menu.Item key="5">
                    <Link to='/wmock/projectDemo' onClick={this.getProjectDemo}>
                      <Icon type="credit-card" />项目示例
                      </Link>
                  </Menu.Item>
                  <Menu.Item key="9">
                    <Link to='/wmock/myProject' onClick={this.getMyProject}>
                      <Icon type="credit-card" />我的项目
                      </Link>
                  </Menu.Item>
                </SubMenu>
                {/* 
                  <Menu.Item key="6">
                    <Link to='/wmock/interfaceTest'>
                      <Icon type="rocket" />
                        <span>
                        接口测试
                        </span>
                    </Link>
                  </Menu.Item> */}


                <Menu.Item key="7">
                  <Link to='/wmock/projectSpec' onClick={() => { this.getDocumentList() }}>
                    <Icon type="folder-open" />
                    <span>
                      文档与规范
                        </span>
                  </Link>
                </Menu.Item>

                {/* <Menu.Item key="8">
                      <Link to='/wmock/projectStruct'>
                        <Icon type="folder-open" />
                        <span>
                          工程结构
                        </span>
                      </Link>
                  </Menu.Item> */}
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
                  <SubMenu title={<span><Icon type="user" />{this.props.username}</span>}>
                    <Menu.Item key="userinfo">个人信息</Menu.Item>
                    <Menu.Item key="logout">退出登录</Menu.Item>
                  </SubMenu>
                </Menu>
              </Header>
              <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                <Switch>
                  <Route path="/wmock/messages" render={() => <Messages data={this.props.messagesList}></Messages>} />
                  <Route path="/wmock/mockModel" render={() => <MockModel refresh={() => this.getModel()} baseModelList={this.props.baseModelList} customModelList={this.props.customModelList} userid={this.props.userid}></MockModel>} />
                  <Route path="/wmock/myProject" render={() => <MyProject documentList={this.props.documentList} projectVerify={this.props.projectVerify}  otherList={this.props.demoList}  projectList={this.props.projectList} messagesList={this.props.messagesList} userid={this.props.userid}></MyProject>} />
                  <Route path="/wmock/overView" render={() => <OverView messagesList={this.props.messagesList}></OverView>} />
                  <Route path="/wmock/projectDemo" render={() => <ProjectDemo documentList={this.props.documentList} projectVerify={this.props.projectVerify} projectList={this.props.demoList} otherList={this.props.projectList} messagesList={this.props.messagesList} userid={this.props.userid}></ProjectDemo>} />
                  <Route path="/wmock/projectSpec" render={() => <ProjectSpec refresh={() => this.getDocumentList()} projectList={this.props.projectList} documentList={this.props.documentList} userid={this.props.userid}></ProjectSpec>} />
                  <Route path="/wmock/teamManage" render={() => <TeamManage unJoinprojectList={this.props.unJoinprojectList} userid={this.props.userid} username={this.props.username} refresh={() => { this.getTeamList(); this.getMessagesList() }} teamList={this.props.teamList} teamMessagesList={this.props.teamMessagesList}></TeamManage>} />
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

const mapStateToProps = (state: any) => ({
  username: state.user.username,
  userid: state.user.userid,
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
