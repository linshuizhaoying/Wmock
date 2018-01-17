import * as React from 'react';
import { connect } from 'react-redux';
import  Icon  from 'antd/lib/icon';
import  Layout  from 'antd/lib/layout';
import  Menu  from 'antd/lib/menu';
import { Link, Switch, Route } from 'react-router-dom';

// 加载子组件
import './index.less';
import InterfaceTest from './InterfaceTest/index';
import Messages from './Messages/index';
import MockModel from './MockModel/index';
import MyProject from './MyProject/index';
import OverView from './OverView/index'
import ProjectDemo from './ProjectDemo/index';
import ProjectManage from './ProjectManage/index';
import ProjectSpec from './ProjectSpec/index';
import ProjectStruct from './ProjectStruct/index';
import Template from './Template/index';
import TeamManage from './TeamManage/index';
import LoadingBar from '../../../components/LoadingBar';
import { userLogout } from '../../../actions/user';
import { fetchMessages, fetchProject } from '../../../actions/index';
const { Header, Sider, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;
export class DashBoard extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.logout = this.logout.bind(this);
    this.state = {
      collapsed: false,
      progress: 0,
      error: false,
      messagesList: [],
      projectList: []
    };
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  errorDone(){
    this.setState({ error: true })
  }

  progressDone() {
    this.setState({ progress: 0 })
  }

  componentDidMount() {
    this.getMessagesList()
   // console.log(this.props)
  }

  componentWillReceiveProps(nextProps: any) {
    // loadingbar处理过程

    if (nextProps.loadingState === 'start'){
      this.setState({
        progress: 75,
        error: false
      })
    }
    if (nextProps.loadingState === 'error'){
      this.setState({ error: true })
    }
    if (nextProps.loadingState === 'success'){
      this.setState({
        progress: 100
      })
    }
    // 获取最新消息列表
    if(nextProps.messagesList.length > 0 && nextProps.messagesList != this.state.messagesList){
      this.setState({
        messagesList:nextProps.messagesList
      },()=>{
       // console.log(this.state.messagesList)
      })
    }
    // 获取最新项目列表
    if(nextProps.projectList  !== undefined && nextProps.projectList != this.state.projectList){
      this.setState({
        projectList:nextProps.projectList
      },()=>{
       // console.log(this.state.projectList)
      })
    }

  }

  overView = () =>{
    const { history } = this.props;
    history.push('/wmock/OverView');
  }
  logout = (e: any) => {
    if(e.key === 'logout'){
      const { dispatch, history } = this.props;
      dispatch(userLogout()) 
      history.push('/login')
    }
  }
  getMessagesList = () => {
    const { dispatch } = this.props;
    dispatch(fetchMessages()) 
  }
  
  getProjectList = (user:any) =>{
    const { dispatch } = this.props;
    dispatch(fetchProject(user)) 
  }

  getProjectDemo = () =>{
    this.getProjectList({'username':this.props.username})
  }


  render () {
    return(
      <div id="DashBoard">
        <LoadingBar
          progress={ this.state.progress }
          error={ this.state.error }
          onErrorDone={ this.errorDone.bind(this) }
          onProgressDone={ this.progressDone.bind(this) } 
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
                  <img src="http://haoqiao.qiniudn.com/dragonPng.png" alt="logo"/>
                </div>
                <Menu  mode="inline" defaultSelectedKeys={['1']}>
                 
                <SubMenu key="sub0" title={<span onClick = {this.overView}><Icon type="appstore" /><span>项目概况</span></span>} >
                    <Menu.Item key="1">
                      <Link to='/wmock/messages' onClick = {this.getMessagesList}>
                        <Icon type="message" />消息中心
                      </Link>
                    </Menu.Item>
                    {/* <Menu.Item key="2">
                      <Link to='/wmock/template' >
                        <Icon type="copy" />前后端模板
                      </Link>
                    </Menu.Item> */}
                    <Menu.Item key="3">
                      <Link to='/wmock/teamManage' >
                        <Icon type="team" />团队管理
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                      <Link to='/wmock/mockModel' >
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
                      <Link to='/wmock/myProject'>
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
                      <Link to='/wmock/projectSpec'>
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
              <Header style={{ background: '#fff'}}>
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
                    <Route path="/wmock/InterfaceTest" component={InterfaceTest}/>
                    <Route path="/wmock/Messages" render={() => <Messages data={this.state.messagesList}></Messages>}/>
                    <Route path="/wmock/MockModel" component={MockModel}/>
                    <Route path="/wmock/MyProject" component={MyProject}/>
                    <Route path="/wmock/OverView" render={() => <OverView messagesList={this.state.messagesList}></OverView>}/>

                    <Route path="/wmock/ProjectDemo" render={() => <ProjectDemo projectList={this.state.projectList} messagesList={this.state.messagesList} userid={this.props.userid}></ProjectDemo>}/>

                    <Route path="/wmock/ProjectManage" component={ProjectManage}/>
                    <Route path="/wmock/ProjectSpec" component={ProjectSpec}/>
                    <Route path="/wmock/ProjectStruct" component={ProjectStruct}/>
                    <Route path="/wmock/Template" component={Template}/>
                    <Route path="/wmock/TeamManage" component={TeamManage}/>
                  </Switch>
              </Content>
              <Footer>Wmock ©2018 Created by LinShuiZhaoYing</Footer>
            </Layout>
          </Layout>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  username: state.user.username,
  userid: state.user.userid,
  loadingState: state.loading.loadingState,
  messagesList: state.messages.data,
  projectList: state.project.data
})


export default connect(mapStateToProps)(DashBoard);
