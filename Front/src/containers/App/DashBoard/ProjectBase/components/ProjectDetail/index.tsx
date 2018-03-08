import * as copy from 'copy-to-clipboard';
import * as React from 'react';
import Alert from 'antd/lib/alert';
import Avatar from 'antd/lib/avatar';
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import InterfaceList from './components/InterfaceList';
import Message from 'antd/lib/message';
import Popover from 'antd/lib/popover';
import ProjectSpec from '../../../ProjectSpec';
import Tabs from 'antd/lib/tabs';
import TimeAgo from 'timeago-react';
import Timeline from 'antd/lib/timeline';
import Tooltip from 'antd/lib/tooltip';
import { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { MockUrl } from '../../../../../../service/api';
import { imgBaseUrl } from '../../../../../../service/api/index';
import './index.less';
const TabPane = Tabs.TabPane;

class EditableCell extends React.Component<EditableCellProps, EditableCellState> {
  state = {
    value: this.props.value,
    editable: false,
  }
  componentWillReceiveProps(nextProps: EditableCellProps) {
    this.setState({
      value: nextProps.value
    })
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({ editable: true });
  }

  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}

export class ProjectDetail extends React.Component<ProjectDetailProps, ProjectDetailState> {
  constructor(props: ProjectDetailProps) {
    super(props)
    this.state = {
      selectUserId: '', // 从项目选择的用户ID
      projectMessagesList: [], // 项目的动态信息
    };
  }

  changeProjectName = (origin: string, id: string) => {
    return (value: string) => {
      this.props.update({
        _id: id,
        projectName: value
      })
    };
  }
  changeProjectDesc = (origin: string, id: string) => {
    return (value: string) => {
      this.props.update({
        _id: id,
        projectDesc: value
      })
    };
  }

  changeProjectVersion = (origin: string, id: string) => {
    return (value: string) => {
      this.props.update({
        _id: id,
        version: value
      })
    };
  }

  changeTransferUrl = (origin: string, id: string) => {
    return (value: string) => {
      this.props.update({
        _id: id,
        transferUrl: value
      })
    };
  }

  copyToClipBoard = (text: string) => {
    if (copy(text)) {
      Message.success('复制成功!');
    } else {
      Message.error('复制失败!');
    }
  }

  toggleTransfer = (id: string) => {
    this.props.update({
      _id: id,
      status: 'transfer'
    })
  }

  toggleMock = (id: string) => {
    this.props.update({
      _id: id,
      status: 'mock'
    })
  }
  selectTab = (key: string) => {
    if (key === '4') {
      // 让加载数据的方法能够在组件加载后执行
      setTimeout(() => { this.props.selectDocument(this.props.data._id) }, 0)
    }
  }

  pasteCopy = () => {
    this.copyToClipBoard(MockUrl + '/' + this.props.data._id + this.props.data.projectUrl)
  }
  render() {
    return (
      <div id="ProjectDetail">
        <Tabs defaultActiveKey="1" onTabClick={this.selectTab}>
          <TabPane tab="项目简介" key="1">
            <div className="exportMe">
              <Tooltip placement="right" title={'导出项目'}>
                <Icon type="right-circle" onClick={() => this.props.showExportProject()} />
              </Tooltip>
            </div>
            <div className="proejctName title">
              项目名称
              <EditableCell
                value={this.props.data.projectName}
                onChange={this.changeProjectName(this.props.data.projectName, this.props.data._id)}
              />
            </div>
            <div className="proejctMockUrl title">
              Mock地址

              <Tooltip placement="top" title={'点击复制到粘贴板'}>
                <Button type="dashed" className="projectUrl" onClick={this.pasteCopy}>
                  {MockUrl + '/' + this.props.data._id}
                </Button>
              </Tooltip>

            </div>
            {
              this.props.data.type === 'user' ?
                <div className="proejctGroup title">
                  团队成员
                 <ul className="userList">
                    {this.props.data.teamMember.length > 0 ?
                      this.props.data.teamMember.map((user: TeamMember, key: number) => {
                        return (

                          <li key={key}>
                            <Popover content={<div><div>用户名: {user.userName}</div><div>职位: {user.role} </div></div>}>
                              <Avatar src={imgBaseUrl + user.avatar} />
                            </Popover>
                          </li>
                        )
                      }) : null}
                    <Tooltip placement="top" title={'管理项目团队'}>
                      <Link to="/wmock/teamManage">
                        <li className="addProjectUser">
                          <Icon type="team" />
                        </li>
                      </Link>
                    </Tooltip>
                  </ul>
                </div>
                : null
            }

            <div className="proejctDesc title">
              项目描述
              <EditableCell
                value={this.props.data.projectDesc}
                onChange={this.changeProjectDesc(this.props.data.projectDesc, this.props.data._id)}
              />
            </div>
            <div className="proejctVersion title">
              项目版本
              <EditableCell
                value={this.props.data.version}
                onChange={this.changeProjectVersion(this.props.data.version, this.props.data._id)}
              />
            </div>
          </TabPane>
          <TabPane tab="接口列表" key="2">

            <div>
              {
                this.props.data.status === 'mock' ?
                  <Divider>  <Alert message="当前状态: 数据代理Mock中..." type="info" /> </Divider>
                  : <Divider> <Alert message="当前状态: 后台接口转发中..." type="info" /> </Divider>
              }
              <div className="backOperate">
                <EditableCell
                  value={this.props.data.transferUrl}
                  onChange={this.changeTransferUrl(this.props.data.transferUrl, this.props.data._id)}
                />
                {
                  this.props.data.status === 'mock' ?
                    <Button onClick={() => this.toggleTransfer(this.props.data._id)}>
                      切换为接口转发<Icon type="retweet" />
                    </Button>
                    : <Button onClick={() => this.toggleMock(this.props.data._id)}>
                      切换为Mock代理<Icon type="retweet" />
                    </Button>
                }

                <Button onClick={() => this.props.showAutoCheckVisible(this.props.data._id)}>
                  自动校验<Icon type="check-circle-o" />
                </Button>
              </div>

              <Divider />
              <div className="addInterFace">
                <Tooltip placement="right" title={'添加接口'}>
                  <Icon type="plus-circle-o" onClick={() => { this.props.showAddInterface() }} />
                </Tooltip>
              </div>
              <InterfaceList
                removeInterface={this.props.removeInterface}
                copyToClipBoard={this.copyToClipBoard}
                selectCurrentInterface={this.props.selectCurrentInterface}
                showInterfaceMode={this.props.showInterfaceMode}
                data={this.props.data.interfaceList}
                projectId={this.props.data._id}
                baseUrl={MockUrl + '/' + this.props.data._id}
              />
            </div>

          </TabPane>
          <TabPane tab="项目动态" key="3" >
            <div className="projectTimeline">
              <Timeline pending={<div>已经是全部信息了~</div>}>
                {
                  this.props.messages.map((item: Message, index: number) => {
                    return (
                      <Timeline.Item
                        dot={<Avatar src={imgBaseUrl + '/' + item.avatar} />}
                        color="red"
                        key={index}
                      >
                        <div className="timeline">
                          <p className="date">
                            <TimeAgo datetime={item.time} locale="zh_CN" />
                          </p>
                          <div>
                            <div className="user">用户: {item.operatorName}</div>
                            <div className="content">{item.desc}</div>
                          </div>

                        </div>
                      </Timeline.Item>
                    )
                  })
                }

              </Timeline>
            </div>
          </TabPane>
          <TabPane tab="项目文档" key="4">
            <ProjectSpec
              userId={this.props.userId}
              documentList={this.props.documentList}
              projectList={this.props.projectList}
              refresh={this.props.documentRefresh}
            />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default ProjectDetail;
