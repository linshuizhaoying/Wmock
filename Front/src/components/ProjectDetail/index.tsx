import * as React from 'react';
import './index.less';
import Tabs from 'antd/lib/tabs';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import Tooltip from 'antd/lib/tooltip';
import Avatar from 'antd/lib/avatar';
import Popover from 'antd/lib/popover';
import Timeline from 'antd/lib/timeline';
import TimeAgo from 'timeago-react'
import InterfaceList from '../InterfaceList';
const TabPane = Tabs.TabPane;

class EditableCell extends React.Component<any, any> {
  state = {
    value: this.props.value,
    editable: false,
  }
  componentWillReceiveProps(nextProps: any) {
    this.setState({
      value:nextProps.value
    })
  }

  handleChange = (e: any) => {
    console.log(e.target.value)
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


export class ProjectDetail extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = {
      selectUserId:'', // 从项目选择的用户ID
      projectMessagesList:[], // 项目的动态信息
    };
  }
  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps: any) {
    console.log(nextProps)
  }
  changeProjectName = (origin: any, id: any) => {
    return (value: any) => {
      console.log(id,value)
    };
  }
  changeProjectDesc = (origin: any, id: any) => {
    return (value: any) => {
      console.log(id,value)
    };
  }
  changeProjectVersion = (origin: any, id: any) => {
    return (value: any) => {
      console.log(id,value)
    };
  }
  render () {
    return(
      <div id="ProjectDetail">
          <Tabs defaultActiveKey="1">
            <TabPane tab="项目简介" key="1">
              <div className="exportMe">
                <Tooltip placement="right" title={'导出项目'}>
                   <Icon type="right-circle" onClick={this.props.showexportProject}/>
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
                <Button type="dashed" className="projectUrl">
                  {this.props.data.projectUrl}
                </Button>
              </Tooltip>
              
              </div>
               <div className="proejctGroup title">
                团队成员
                 <ul className="userList">
                 {this.props.data.teamMember.length > 0 ?this.props.data.teamMember.map((user: any, key: any) => {
                  return (
                    <li key={key}> 
                      <Popover content={
                            <div>
                              <div>
                                用户名: {user.username}
                              </div>
                              <div>
                                职位: {user.role}
                              </div>
                            </div>
                        }>
                            <Avatar src={user.avatar} />
                      </Popover>   
                      <div className="projectUserDelete">
                        <Icon type="close" />
                      </div>
                    </li>
                  )
                 }) :
                  <div>  </div>
                 }
                  <li className="addProjectUser">
                    <Icon type="plus" />
                  </li>
            
                 </ul>
              </div>
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
              <InterfaceList data={this.props.data.interfaceList} key={this.props.data._id}/>
            </TabPane>
            <TabPane tab="项目动态" key="3" > 
                <div className="projectTimeline">
                <Timeline pending={ 
                      <div>已经是全部信息了~</div>}>
                    {
                      this.props.messages.map((item: any, index: any) =>{
                      return <Timeline.Item dot={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />} color="red" key={index} >
                            <div className="timeline">
                              <p className="date"><TimeAgo
                                      datetime={item.time} 
                                      locale='zh_CN' /></p>
                        
                              <div>
                                <div className="user">用户: {item.operator}</div>
                                <div className="content">{item.desc}</div> 
                              </div>
                            
                            </div>
                          </Timeline.Item>
                      })
                    }
       
                </Timeline>
                </div>
            </TabPane>
            <TabPane tab="项目文档" key="4">正在开发中...</TabPane>
          </Tabs>
      </div>
    )
  }
}




export default ProjectDetail;
