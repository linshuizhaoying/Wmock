import * as React from 'react';
import './index.less';
import Tabs from 'antd/lib/tabs';
import Badge from 'antd/lib/badge';
import Divider from 'antd/lib/divider';
import Avatar from 'antd/lib/avatar';
import Icon from 'antd/lib/icon';
import Popconfirm from 'antd/lib/popconfirm';
import Table from 'antd/lib/table'
import Button from 'antd/lib/button'
import Modal from 'antd/lib/modal'
import notification from 'antd/lib/notification'
import Input  from 'antd/lib/input';
import Validator from '../../../../util/validator'
import Message  from 'antd/lib/message';
import Select from 'antd/lib/select';
import { isEqual } from '../../../../util/helper'
import { ColumnProps } from "antd/lib/table/";
import { imgBaseUrl } from '../../../../service/api'
const Option = Select.Option;
const TabPane = Tabs.TabPane;
class MyTable extends Table<any>{}
let inviteMemberEmailInput:any;
export class TeamManage extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = {
      joinProjectVisible: false,
      allTeams:[],
      isLoaded:false, // 是否加载
      inviteGroupMember: false,
      inviteMemberEmail:'',
      inviteMemberEmailInput:'',
      invitedProjectId:'',
      selectJoinProject:''
    };
  }
  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps: any) {
    // 每次只更新变动的团队
    console.log(nextProps.teamList)
    // &&  differenceWith( nextProps.documentList,this.state.allDocuments, isEqual).length !== 0
    if(nextProps.teamList.length >= 0 && !isEqual(nextProps.teamList,this.state.allTeams)){
    this.setState({
      allTeams: nextProps.teamList,
      isLoaded: true
    },()=>{
      console.log('update ok')
    })
    }
  }

  removeUser = () =>{

  }

  showJoinProject = ()=>{
    this.setState({
      joinProjectVisible:true
    })
  }

  hideJoinProject = ()=>{
    this.setState({
      joinProjectVisible:false
    })
  }
  sendApply = () =>{
    if(this.state.selectJoinProject !== ''){
      this.setState({
        joinProjectVisible:false
      })
      console.log(this.props.userid)
      console.log(this.state.selectJoinProject)
  
      Message.success('发送申请成功!');
    }else{
      Message.error('请选择一个未加入的项目!');
    }

  }

   // 邀请成员
  
   showInviteGroupMember = (id:string) =>{
    this.setState({
       inviteGroupMember: true,
       invitedProjectId: id
     });
   }
 
   inviteGroupMemberOk = (e:any) => {
     console.log(this.state.invitedProjectId)
     console.log(this.state.inviteMemberEmail);
     if(Validator.emailCheck(this.state.inviteMemberEmail)){
       Message.success('发送邀请成功!');
       this.setState({
         inviteGroupMember: false,
       });
     }else{
       notification['error']({
         message: '出错啦!',
         description: '邮箱地址格式错误!',
       });
     }
 
   }
   inviteGroupMemberCancel = (e:any) => {
     console.log(e);
     this.setState({
       inviteGroupMember: false,
       invitedProjectId: ''
     });
   }
 
   inviteMemberEmailEmpty = () =>{
     inviteMemberEmailInput.focus();
     this.setState({
       inviteMemberEmail: ''
     });
   }
    
   onChangeinviteMemberEmail = (e: any) => {
     this.setState({ inviteMemberEmail: e.target.value });
   }
 
   isMaster = (currentItem: any) =>{
     console.log(this.props.userid)
     console.log(currentItem.project_id)
     console.log(this.props.teamList)
     let flag = false;
     this.props.teamList.map((item:any)=>{
       // 匹配项目
       if(item.project_id === currentItem.project_id){
         // 如果当前用户是该项目的创建者
         if(item.master_id === this.props.userid){
           flag = true;
         }else{
           flag = false;
         }
       }
     })
     console.log(flag)
     return flag
   }

   teamAllowed = (projectId:any, userId:any) =>{
     
    this.props.teamList.map((item:any)=>{
      // 匹配项目
      if(item.project_id === projectId){
        console.log(item._id, userId)
        Message.success('已成功加入!');
        // 重新刷新信息
        this.props.refresh();
      }
    })
   }
   teamReject = (projectId:any, userId:any) =>{
    this.props.teamList.map((item:any)=>{
      // 匹配项目
      if(item.project_id === projectId){
        console.log(item._id, userId)
        Message.success('拒绝成功!');
        // 重新刷新信息
        this.props.refresh();
      }
    })
  }

  joinTeam = (value:any) =>{
    this.setState({
      selectJoinProject:value
    })
  }
  
  render () {
    const columns:ColumnProps<any>[] = [
      {
      title: '发起者',
      dataIndex: 'operator_name',
      key: 'operator_name',
      width: '20%',
      render : (operator_name: any)=> (
        <div className="organizer">{operator_name}</div>
      )
      },  
      {
      title: '描述',
      dataIndex: 'desc',
      key:'desc',
      width: '60%',
      render : (desc: any)=> (
        <div className='desc'>
          <span className={desc}>{desc}</span>
        </div>
      )
    },{
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      width: '20%',
      render: (value:any, item:any) => (
        <div className="interface-operation">
            {this.isMaster(item)?
             <div>
              <Button type="primary" onClick={()=>this.teamAllowed(item.project_id,item.userId)}> 允许 </Button>
              <Button type="danger" onClick={()=>this.teamReject(item.project_id,item.userId)}> 拒绝 </Button>
             </div>:"请等待创建者处理..."
            }
       
            
        </div>
      ),
    }
    ];
    const suffix = this.state.inviteMemberEmail ? <Icon type="close-circle" onClick={this.inviteMemberEmailEmpty} /> : null;
    return(
      <div id="TeamManage">
        <Tabs defaultActiveKey="1">
          <TabPane tab="团队管理" key="1">
             <div className="teamList">
             <Button type="primary" onClick={this.showJoinProject}>去加入项目</Button>
             <Divider>我的项目团队</Divider>
             {this.state.isLoaded  &&  this.state.allTeams.length > 0 ? 
              <div>
                  { 
                    this.state.allTeams.map((item: any) =>{
                    return(
                        <div className="teamItem" key={item.project_id}>
                            <h2>{item.project_name}</h2>
                            <ul>
                              <li>
                                <div className="member">
                                  <div className="avatar">
                                    <Avatar src={imgBaseUrl + item.master_avatar}  />
                                    <div className="operate">
                                    {/* <Popconfirm title="确定移除该用户么?" onConfirm={()=>{this.removeUser()}} okText="确定移除" cancelText="取消">
                                        <div className="removeUser">
                                          <Icon type="close" />
                                        </div>
                                    </Popconfirm> */}
                                    
                                    </div>
                                  </div>
                                  <div className="desc">
                                    <div>{item.master_name}</div>
                                    <div>创建者</div>
                                    <div>{item.role === 'front' ? '前端开发' : '后端开发'}</div>
                                  </div>
                                </div>
                              </li>
                              {item.member.length > 0 ? 
                                  item.member.map((user: any) =>{
                                    return(
                                      <li key={user.userid}>
                                      <div className="member">
                                        <div className="avatar">
                                          <Avatar src={imgBaseUrl + user.avatar}  />
                                          <div className="operate">
                                          <Popconfirm title={"确定移除 " + user.username + " 吗?"} onConfirm={()=>{this.removeUser()}} okText="确定移除" cancelText="取消">
                                              <div className="removeUser">
                                                <Icon type="close" />
                                              </div>
                                          </Popconfirm>
                                          
                                          </div>
                                        </div>
                                        <div className="desc">
                                          <div>{user.username}</div>
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
                              <div className="addUser" onClick={()=>this.showInviteGroupMember(item.project_id)}>
                                <Icon type="plus"/>
                              </div>
                            </ul>

                            <Divider></Divider>

                        </div>
                      )
                    }) 
                  }
              </div>
              : <div></div>
              }
             </div>

          </TabPane>
          <TabPane tab={ <Badge count={this.props.teamMessagesList.length}> <span className="header">团队消息</span></Badge>} key="2">
          <MyTable columns={columns} dataSource={this.props.teamMessagesList} rowKey={record => record._id} pagination={false} scroll={{y:480}} size='middle' >
         </MyTable>
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
             this.props.unJoinprojectList.map((item: any) =>{
                return(       
                    <Option value={item.project_id} key={item.project_id}>{item.project_name}</Option>
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




export default TeamManage;
