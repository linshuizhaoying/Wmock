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
const TabPane = Tabs.TabPane;

class EditableCell extends React.Component<any, any> {
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = (e: any) => {
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
  }
  changeProjectName = (id: any, index: any) => {
    return (value: any) => {
      console.log(id,index,value)
      // const dataSource = [...this.state.dataSource];
      // const target = dataSource.find(item => item.id === id);
      // if (target) {
      //   target[dataIndex] = value;
      //   this.setState({ dataSource });
      // }
    };
  }
  render () {
    return(
      <div id="ProjectDetail">
          <Tabs defaultActiveKey="1">
            <TabPane tab="项目简介" key="1">
              <div className="proejctName title">
                项目名称

                <EditableCell
                    value='测试项目'
                    onChange={this.changeProjectName('123asd', 'name')}
                  />
              </div>
              <div className="proejctMockUrl title">
                Mock地址
                
              <Tooltip placement="top" title={'点击复制到粘贴板'}>
                <Button type="dashed" className="projectUrl">
                  /wmock/project/xxx123
                </Button>
              </Tooltip>
              
              </div>
               <div className="proejctGroup title">
                团队成员
                 <ul className="userList">
                  <li> 
                    <Popover content={
                          <div>
                            <div>
                              用户名: 2333
                            </div>
                            <div>
                              职位: 前端工程师
                            </div>
                          </div>
                      }>
                          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    </Popover>   
                    <div className="projectUserDelete">
                       <Icon type="close" />
                    </div>
                  </li>
                  
                  <li> 
                  <Popover content={
                        <div>
                          <div>
                            用户名: 2333
                          </div>
                          <div>
                            职位: 前端工程师
                          </div>
                        </div>
                    }>
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  </Popover>   
                  <div className="projectUserDelete">
                      <Icon type="close" />
                  </div>
                </li>

                  <li className="addProjectUser">
                    <Icon type="plus" />
                  </li>
            
                 </ul>
              </div>
              <div className="proejctBeta title">
                项目版本
                  <EditableCell
                    value='V1.0'
                    onChange={this.changeProjectName('123asd', 'name')}
                  />
              </div>
            </TabPane>
            <TabPane tab="接口列表" key="2">Content of Tab Pane 2</TabPane>
            <TabPane tab="项目动态" key="3"> 
                <Timeline pending={ 
                      <div>已经是全部信息了~</div>}>
            {
              this.state.projectMessagesList.map((item: any, index: any) =>{
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
            </TabPane>
            <TabPane tab="项目文档" key="4">Content of Tab Pane 2</TabPane>
          </Tabs>
      </div>
    )
  }
}




export default ProjectDetail;
