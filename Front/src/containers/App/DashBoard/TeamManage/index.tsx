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

import { ColumnProps } from "antd/lib/table/";
const TabPane = Tabs.TabPane;
class MyTable extends Table<any>{}

export class TeamManage extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = {
      joinProjectVisible: false
    };
  }
  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps: any) {

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

  }
  render () {
    const columns:ColumnProps<any>[] = [
      {
      title: '发起者',
      dataIndex: 'organizer',
      key: 'organizer',
      width: '20%',
      render : (organizer: any)=> (
        <div className="organizer">{organizer}</div>
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
            <Button type="danger"> 拒绝 </Button>
            <Button type="danger"> 允许 </Button>
        </div>
      ),
    }
    ];
    return(
      <div id="TeamManage">
        <Tabs defaultActiveKey="1">
          <TabPane tab="团队管理" key="1">
             <div className="teamList">
             <Button type="primary" onClick={this.showJoinProject}>去加入项目</Button>
             <Divider>我的项目团队</Divider>

              <div className="teamItem">
                  <h2>REST接口示例超长字符串测试asd123</h2>
                  <ul>
                    <li>
                      <div className="member">
                        <div className="avatar">
                          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"  />
                          <div className="operate">
                          <Popconfirm title="确定移除该用户么?" onConfirm={()=>{this.removeUser()}} okText="确定移除" cancelText="取消">
                               <div className="removeUser">
                                 <Icon type="close" />
                               </div>
                           </Popconfirm>
                           
                          </div>
                        </div>
                        <div className="desc">
                          <div>test007</div>
                          <div>创建者</div>
                          <div>前端开发</div>
                        </div>
                      </div>
                    </li>
                    <div className="addUser">
                     <Icon type="plus"/>
                    </div>
                  </ul>

                  <Divider></Divider>

              </div>
    
             </div>

          </TabPane>
          <TabPane tab={ <Badge count={5}> <span className="header">团队消息</span></Badge>} key="2">
          <MyTable columns={columns} dataSource={this.props.data} rowKey={record => record._id} pagination={false} scroll={{y:480}} size='middle' >
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
          
        </Modal>
      </div>
    )
  }
}




export default TeamManage;
