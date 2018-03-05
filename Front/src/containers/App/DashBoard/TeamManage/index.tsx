import * as React from 'react';
import Avatar from 'antd/lib/avatar';
import Badge from 'antd/lib/badge';
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import notification from 'antd/lib/notification';
import Popconfirm from 'antd/lib/popconfirm';
import Select from 'antd/lib/select';
import Table from 'antd/lib/table';
import Tabs from 'antd/lib/tabs';
import Validator from '../../../../util/validator';
import {
  allowedJoinGroup,
  invitedGroupMember,
  rejectJoinGroup,
  removeGroupMember,
  sendApply
} from '../../../../actions';
import { ChangeEvent } from 'react';
import { ColumnProps } from 'antd/lib/table/';
import { connect } from 'react-redux';
import { imgBaseUrl } from '../../../../service/api';
import { isEqual } from '../../../../util/helper';
import './index.less';
const Option = Select.Option;
const TabPane = Tabs.TabPane;
class MyTable extends Table<Team> { }

let inviteMemberEmailInput: Input | null;

export class TeamManage extends React.Component<AppProps, AdvanceAny> {
  constructor(props: AppProps) {
    super(props)
    this.state = {
      joinProjectVisible: false,
      allTeams: [],
      isLoaded: false, // 是否加载
      inviteGroupMember: false,
      inviteMemberEmail: '',
      invitedProjectId: '',
      selectJoinProject: ''
    };
  }
  componentDidMount() {

  }

  componentWillReceiveProps(nextProps: AppProps) {
    if (nextProps.teamList.length >= 0 && !isEqual(nextProps.teamList, this.state.allTeams)) {
      this.setState({
        allTeams: nextProps.teamList,
        isLoaded: true
      })
    }
  }

  removeUser = (userId: string, projectId: string) => {
    const { dispatch } = this.props;
    dispatch(removeGroupMember({
      userId,
      projectId
    }))
    setTimeout(() => {
      this.props.refresh()
    }, 500)
  }

  showJoinProject = () => {
    this.setState({
      joinProjectVisible: true
    })
  }

  hideJoinProject = () => {
    this.setState({
      joinProjectVisible: false
    })
  }
  sendApply = () => {
    if (this.state.selectJoinProject !== '') {
      this.setState({
        joinProjectVisible: false
      })
      const { dispatch } = this.props;
      dispatch(sendApply({
        operatorId: this.props.userId,
        operatorName: this.props.userName,
        projectId: this.state.selectJoinProject.split('_')[0],
        time: new Date(),
        action: 'apply',
        objectId: this.props.userId,
        objectName: this.props.userName,
        desc: this.props.userName + ' 申请加入 ' + '项目团队 ' + this.state.selectJoinProject.split('_')[1],
        type: 'team'
      }))
      setTimeout(() => {
        this.props.refresh()
      }, 500)
    } else {
      Message.error('请选择一个未加入的项目!');
    }

  }

  // 邀请成员

  showInviteGroupMember = (id: string) => {
    this.setState({
      inviteGroupMember: true,
      invitedProjectId: id
    });
  }

  inviteGroupMemberOk = (e: React.FormEvent<HTMLFormElement>) => {
    if (Validator.emailCheck(this.state.inviteMemberEmail)) {
      const { dispatch } = this.props;
      dispatch(invitedGroupMember({
        userEmail: this.state.inviteMemberEmail,
        projectId: this.state.invitedProjectId
      }))
      this.setState({
        inviteGroupMember: false,
      });
      setTimeout(() => {
        this.props.refresh()
      }, 500)
    } else {
      notification.error({
        message: '出错啦!',
        description: '邮箱地址格式错误!',
      });
    }

  }
  inviteGroupMemberCancel = (e: React.FormEvent<HTMLFormElement>) => {
    this.setState({
      inviteGroupMember: false,
      invitedProjectId: ''
    });
  }

  inviteMemberEmailEmpty = () => {
    this.setState({
      inviteMemberEmail: ''
    });
    return inviteMemberEmailInput ? inviteMemberEmailInput.focus() : null;
  }

  onChangeinviteMemberEmail = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inviteMemberEmail: e.target.value });
  }

  isMaster = (currentItem: Message) => {
    let flag = false;
    this.props.teamList.map((item: Team) => {
      // 匹配项目
      if (item.projectId === currentItem.projectId) {
        // 如果当前用户是该项目的创建者
        if (item.masterId === this.props.userId) {
          flag = true;
        } else {
          flag = false;
        }
      }
    })
    return flag
  }

  teamAllowed = (currentItem: Message) => {
    this.props.teamList.map((item: Team) => {
      // 匹配项目
      if (item.projectId === currentItem.projectId) {
        const { dispatch } = this.props;
        dispatch(allowedJoinGroup({
          userId: currentItem.userId,
          projectId: currentItem.projectId,
          messageId: currentItem._id
        }))
        setTimeout(() => {
          this.props.refresh()
        }, 500)
      }
    })
  }
  teamReject = (currentItem: Message) => {
    this.props.teamList.map((item: Team) => {
      // 匹配项目
      if (item.projectId === currentItem.projectId) {
        const { dispatch } = this.props;
        dispatch(rejectJoinGroup({
          userId: currentItem.userId,
          projectId: currentItem.projectId,
          messageId: currentItem._id
        }))
        setTimeout(() => {
          this.props.refresh()
        }, 500)
      }
    })
  }

  joinTeam = (value: string) => {
    this.setState({
      selectJoinProject: value
    })
  }

  render() {
    const columns: ColumnProps<object>[] = [
      {
        title: '发起者',
        dataIndex: 'operatorName',
        key: 'operatorName',
        width: '20%',
        render: (operatorName: ChangeEvent<HTMLInputElement>) => (
          <div className="organizer">{operatorName}</div>
        )
      },
      {
        title: '描述',
        dataIndex: 'desc',
        key: 'desc',
        width: '60%',
        render: (desc: string) => (
          <div className="desc">
            <span className={desc}>{desc}</span>
          </div>
        )
      }, {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        width: '20%',
        render: (value: ChangeEvent<HTMLInputElement>, item: Message) => (
          <div className="interface-operation">
            {this.isMaster(item) ?
              <div>
                <Button type="primary" onClick={() => this.teamAllowed(item)}> 允许 </Button>
                <Button type="danger" onClick={() => this.teamReject(item)}> 拒绝 </Button>
              </div> : '请等待创建者处理...'
            }
          </div>
        ),
      }
    ];
    const suffix = this.state.inviteMemberEmail ?
      <Icon type="close-circle" onClick={this.inviteMemberEmailEmpty} /> :
      null;
    return (
      <div id="TeamManage">
        <Tabs defaultActiveKey="1">
          <TabPane tab="团队管理" key="1">
            <div className="teamList">
              <Button type="primary" onClick={this.showJoinProject}>去加入项目</Button>
              <Divider>我的项目团队</Divider>
              {this.state.isLoaded && this.state.allTeams.length > 0 ?
                <div>
                  {
                    this.state.allTeams.map((item: Team) => {
                      return (
                        <div className="teamItem" key={item.projectId}>
                          <h2>{item.projectName}</h2>
                          <ul>
                            <li>
                              <div className="member">
                                <div className="avatar">
                                  <Avatar src={imgBaseUrl + item.masterAvatar} />
                                </div>
                                <div className="desc">
                                  <div>{item.masterName}</div>
                                  <div>创建者</div>
                                  <div>{item.role === 'front' ? '前端开发' : '后端开发'}</div>
                                </div>
                              </div>
                            </li>
                            {item.member.length >= 0 ?
                              item.member.map((user: TeamMember, key: number) => {
                                return (
                                  <li key={key}>
                                    <div className="member">
                                      <div className="avatar">
                                        <Avatar src={imgBaseUrl + user.avatar} />
                                        {
                                          item.masterId === this.props.userId ?
                                            <div className="operate" key={key}>
                                              <Popconfirm
                                                title={'确定移除 ' + user.userName + ' 吗?'}
                                                onConfirm={() => { this.removeUser(user._id, item.projectId) }}
                                                okText="确定移除"
                                                cancelText="取消"
                                              >
                                                <div className="removeUser">
                                                  <Icon type="close" />
                                                </div>
                                              </Popconfirm>

                                            </div>
                                            : null
                                        }
                                        {
                                          user._id === this.props.userId ?
                                            <div className="operate" key={key}>
                                              <Popconfirm
                                                title={'确定退出该团队吗(同时退出项目)?'}
                                                onConfirm={() => { this.removeUser(user._id, item.projectId) }}
                                                okText="确定退出"
                                                cancelText="取消"
                                              >
                                                <div className="removeUser">
                                                  <Icon type="logout" />
                                                </div>
                                              </Popconfirm>

                                            </div>
                                            : null
                                        }
                                      </div>
                                      <div className="desc">
                                        <div>{user.userName}</div>
                                        <div>成员</div>
                                        <div>{user.role === 'front' ? '前端开发' : '后端开发'}</div>
                                      </div>
                                    </div>
                                  </li>
                                )
                              })

                              :
                              null
                            }
                            <div className="addUser" onClick={() => this.showInviteGroupMember(item.projectId)}>
                              <Icon type="plus" />
                            </div>
                          </ul>

                          <Divider />

                        </div>
                      )
                    })
                  }
                </div>
                : null
              }
            </div>

          </TabPane>
          <TabPane
            tab={<Badge count={this.props.teamMessagesList.length}> <span className="header">团队消息</span></Badge>}
            key="2"
          >
            <MyTable
              columns={columns}
              dataSource={this.props.teamMessagesList}
              rowKey={record => record._id}
              pagination={false}
              scroll={{ y: 480 }}
              size="middle"
            />
          </TabPane>
        </Tabs>
        <Modal
          title="申请加入项目"
          visible={this.state.joinProjectVisible}
          width={'60%'}
          onCancel={this.hideJoinProject}
          onOk={this.sendApply}
          cancelText="取消"
          okText="发送申请"
        >
          <h2>选择项目:</h2>
          <Select defaultValue="" style={{ width: 400 }} onChange={this.joinTeam}>
            {
              this.props.unJoinprojectList.length > 0 ?
                this.props.unJoinprojectList.map((item: UnJoinproject) => {
                  return (
                    <Option value={item.projectId + '_' + item.projectName} key={item.projectId}>
                      {item.projectName}
                    </Option>
                  )
                })
                : null
            }

          </Select>

        </Modal>

        <Modal
          title="邀请开发成员"
          visible={this.state.inviteGroupMember}
          onOk={this.inviteGroupMemberOk}
          onCancel={this.inviteGroupMemberCancel}
          okText="邀请"
          cancelText="取消"
        >
          <Input
            placeholder="输入邀请成员的邮箱地址 example: xxx@qq.com"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            suffix={suffix}
            value={this.state.inviteMemberEmail}
            onChange={this.onChangeinviteMemberEmail}
            ref={node => inviteMemberEmailInput = node}
          />
        </Modal>

      </div>
    )
  }
}
export default connect()(TeamManage);
