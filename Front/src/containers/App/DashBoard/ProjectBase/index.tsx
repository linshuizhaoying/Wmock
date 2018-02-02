import * as React from 'react';
import './index.less';
import differenceWith from 'lodash/differenceWith'
import isEqual from 'lodash/isEqual'
import Card from 'antd/lib/card';
import Tree  from 'antd/lib/tree';
import Icon  from 'antd/lib/icon';
import Input  from 'antd/lib/input';
import Tooltip  from 'antd/lib/tooltip';
import notification from 'antd/lib/notification'
import Message from 'antd/lib/message';
import ProjectDetail from '../../../../components/ProjectDetail';
import NewProject from '../../../../components/NewProject';
import Modal from 'antd/lib/modal';
import Upload from 'antd/lib/upload';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import Validator from '../../../../util/validator'
import InterfaceMode from '../../../../components/InterfaceMode'
import { exportFile } from '../../../../util/fileExport'
import { isJson } from '../../../../util/helper'
import Select from 'antd/lib/select';
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
const Dragger = Upload.Dragger;
let inviteMemberEmailInput:any;

export class ProjectBase extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = {
     allData: [],
     allMessages:[],
     currentProjectMessages:[],
     currentProjectData: '',
     currentInterfaceData:'',
     newProject: false,
     importProject: false,
     exportProject: false,
     inviteGroupMember: false,
     inviteMemberEmail:'',
     inviteMemberEmailInput:'',
     interfaceModeVisible:false,
     autoCheckVisible:false,
     uploadProject: false,
     uploadJsonData: '',
     uploadSelectType: 'demo'
    };
  }
  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps: any) {
     // 每次只更新变动的项目内容
     console.log(nextProps)
     console.log(nextProps.projectList.length)
     if(nextProps.projectList.length >0 &&  differenceWith( nextProps.projectList,this.state.allData, isEqual).length !== 0){
      this.setState({
        allData: nextProps.projectList
      },()=>{
        console.log(this.state.allData)
      })
     }
     // 每次只更新变动的项目动态
     if(nextProps.messagesList.length > 0 &&  differenceWith( nextProps.messagesList,this.state.allMessages, isEqual).length !== 0){
      this.setState({
        allMessages: nextProps.messagesList
      },()=>{
        console.log(this.state.allMessages)
      })
     }

  }

  selectProject = (id:string) => {
    console.log(id)
    console.log(this.state.allData)
    this.state.allData.map((project: any) => {
      if(project._id === id){
        this.setState({
          currentProjectData: project
        }, ()=>{
          console.log(this.state.currentProjectData)
        })
      }
    })
     // 筛选出对应项目的动态
    console.log(this.state.currentProjectMessages)
    let arr:any[] = []
    this.state.allMessages.map((item: any) =>{
      if(item.projectId === id){
        arr.push(item)
      }
    })
    this.setState({
      currentProjectMessages: arr
    },()=>{
      console.log(this.state.currentProjectMessages)
    })
  }

  // 新建项目

  handleOk = (projectName:any,url:any,desc:any) => {
    console.log(projectName,url,desc)
    if(projectName ===''){
       notification['error']({
        message: '出错啦!',
        description: '项目名称必须填写不能为空.',
      });
    }
    if(url ===''){
       notification['error']({
        message: '出错啦!',
        description: '项目URL必须填写不能为空.',
      });
    }
    if(desc === ''){
      desc = projectName;
    }
    if(projectName && url && desc){
      console.log(projectName,url,desc,this.props.type)
      Message.success('项目添加成功!');
      this.setState({
        newProject: false,
      });
    }

  }
  handleCancel = (e:any) => {
    console.log(e);
    this.setState({
      newProject: false,
    });
  }
  toggleNewProject = ()=>{
    this.setState({
      newProject: true,
    });
  }

  // 导入导出项目 


  showimportProject = () => {
    this.setState({
      importProject: true,
    });
  }
  showExportProject = () => {
    this.setState({
      exportProject: true,
    });
  }

  selectUpload = (value: string) => {
    console.log(value)
    this.setState({
      uploadSelectType: value
    })
  }

  importProjectOk = (e:any) => {
    const data = JSON.parse(this.state.uploadJsonData)
    data.type = this.state.uploadSelectType
    console.log(data)
    Message.success('项目导入成功!');
    this.setState({
      importProject: false,
      uploadProject: false,
      uploadJsonData: '',
      uploadSelectType: 'demo'
    });
  }


  importProjectCancel = (e:any) => {
    console.log(e);
    this.setState({
      importProject: false,
    });
  }
  filterData = (json: any) =>{
    console.log(json)
    let expectArr = ['_id', 'teamMember']
    let filterArr = []
    let result = ''
    for( let key in json){
      if (expectArr.indexOf(key) === -1){
        filterArr.push(key)
        // 如果是嵌套数组，而且数组内有数据
        if(Object.prototype.toString.call(json[key]) == "[object Array]" && json[key].length > 0){
          for( let item in json[key][0]){
            // 同样对里面的json数据进行属性字段过滤
            if (expectArr.indexOf(item) === -1){
              filterArr.push(item)
            }
          }
        }
      }
    }
    result = JSON.stringify(this.state.currentProjectData, filterArr)
    console.log(result)
    
    return result

  }
  exportJson = () => {
    exportFile(this.filterData(this.state.currentProjectData), 'default.json', 'json')
    Message.success('项目导出成功!');

    // this.setState({
    //   exportProject: false,
    // });
  }
  exportMarkdown = () => {
    console.log(this.state.currentProjectData);
    exportFile(JSON.stringify(this.state.currentProjectData), 'default.md', 'markdwon')
    Message.success('项目导出成功!');
    // this.setState({
    //   exportProject: false,
    // });
  }
  exportWord = () => {
    console.log(this.state.currentProjectData);
    Message.success('项目导出成功!');
    exportFile(JSON.stringify(this.state.currentProjectData), 'default.doc', 'doc')
    // this.setState({
    //   exportProject: false,
    // });
  }
  exportProjectCancel = (e:any) => {
    console.log(e);
    this.setState({
      exportProject: false,
    });
  }

  cloneProject = (projectId:string) =>{
    console.log(projectId)
    console.log(this.props.userid)
  }
  deleteProject = (projectId:string) =>{
    console.log(projectId)
    console.log(this.props.userid)
  }
  
  // 邀请成员
  
  showInviteGroupMember = () =>{
   this.setState({
      inviteGroupMember: true,
    });
  }

  inviteGroupMemberOk = (e:any) => {
    console.log(this.props.userid)
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
  
  showInterfaceMode = () => {
    console.log('showInterfaceMode')
    this.setState({
      interfaceModeVisible:true
    })
  }
  hideInterfaceMode = () => {
    console.log('showInterfaceMode')
    this.setState({
      interfaceModeVisible:false
    })
  }

  selectCurrentInterface = (data:any) =>{
    console.log(data)
    this.setState({
      currentInterfaceData:data
    })
  }

  addInterFace = () =>{
    this.setState({
      currentInterfaceData:'',
      interfaceModeVisible:true
    })
  }

  showAutoCheckVisible = (projectId:string)=>{
    console.log(projectId)
    this.setState({
      autoCheckVisible:true
    })
  }

  hideAutoCheckVisible = ()=>{
    this.setState({
      autoCheckVisible:false
    })
  }

  render () {
     const suffix = this.state.inviteMemberEmail ? <Icon type="close-circle" onClick={this.inviteMemberEmailEmpty} /> : null;
     const uploadProps = {
      name: 'file',
      action: '',
      showUploadList: false,
      beforeUpload: (file: any) => {{
        console.log(file)
        console.log(file.type)
        const isJSON = file.type === 'application/json';
        if (!isJSON) {
          Message.error('只允许上传JSON格式文件!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          Message.error('JSON文件大小必须小于 2MB!');
        }
        var reader = new FileReader(); // 读取操作都是由FileReader完成的
        var that = this
        reader.readAsText(file);
        reader.onload = function(){//读取完毕从中取值
          const json = this.result
          if(isJson(json) && that.state.uploadJsonData.length === 0){
            that.setState({
              uploadProject:true,
              uploadJsonData: json
            })
            Message.success('Json文件上传识别成功!');
          }
        }
        return false;
      }},
      
      onChange: (info: any) => {
      },
    };
    
    
    return(
      <div>
       {
         this.props.projectList.length > 0 ?
          <div  id="ProjectBase">
            <div className="projectTree">
            <div className="addProject">
              <Tooltip placement="right" title={'添加项目'}>
                <Icon type="plus-circle" onClick={this.toggleNewProject}/>
              </Tooltip>
               <Tooltip placement="right" title={'导入项目'}>
                <Icon type="left-circle" onClick={this.showimportProject}/>
              </Tooltip>
            </div>
            <Card style={{ width: 280 }}>
              <Tree>
                  {
                    this.props.projectList.map((project: any) =>{
                    return(
                      <TreeNode title={
                        <div className="projectType">
                          
                          <div className="projectName" onClick = {()=>{this.selectProject(project._id)}}><Icon type="folder-open"  />{
                            project.projectName
                          }</div> 
                          <div className="projectOperate">                          
                            <Popconfirm title="确定删除该项目么?" onConfirm={()=>{this.deleteProject(project._id)}} okText="确定删除" cancelText="取消">
                              <Tooltip placement="right" title={'删除项目'}>
                                <Icon type="delete" className="operate-icon"/>
                              </Tooltip>
                            </Popconfirm>
                            
                             <Popconfirm title="确定克隆该项目么?" onConfirm={()=>{this.cloneProject(project._id)}} okText="确定克隆" cancelText="取消">
                              <Tooltip placement="right" title={'克隆项目'}>
                                <Icon type="copy" className="operate-icon"/>
                              </Tooltip>
                             </Popconfirm>

                          </div>
                        </div>
                          } key={project._id} >
                              {
                                project.interfaceList.length > 0 ? 
                                  project.interfaceList.map((item: any) =>{
                                    return  (<TreeNode title={ 
                                      <div className="interfaceType">
                                          
                                          <div className="interfaceName" onClick={()=>{this.selectCurrentInterface(item);this.showInterfaceMode();}}><Icon type="file" /> {item.interfaceName} </div> 
                                          <div className="interfaceOperate">
                                              <Tooltip placement="top" title={'删除接口'}>
                                                <Icon type="delete" className="operate-icon"/>
                                              </Tooltip>

                                              <Tooltip placement="top" title={'复制接口'} >
                                                <Icon type="copy" className="operate-icon"/>
                                              </Tooltip>        
                                          </div>
                                      </div>
                                    }  key={item._id} />
                                    )
                                  })
                                
                                
                                : <div></div>
                              }
                    </TreeNode>
                  )
                  })
                  }
                    
              </Tree>
          
            </Card>
            </div>
            <div className="projectContent">
              {
                this.state.currentProjectData ?
                <ProjectDetail showAutoCheckVisible={this.showAutoCheckVisible} addInterFace={this.addInterFace} data={this.state.currentProjectData} messages={this.state.currentProjectMessages} showExportProject={this.showExportProject} showInviteGroupMember={this.showInviteGroupMember} showInterfaceMode={this.showInterfaceMode} selectCurrentInterface={this.selectCurrentInterface}/> :
                <div>
                  <h2>
                    项目示例说明
                  </h2>
                  <div className="demoDesc">
                    <h3>项目示例仅作为演示项目,如果需要可以复制到自己账号上,基于模板进行开发。</h3>
                  </div>
                </div>
              }
              
            </div> 
         </div>
      
         :
         <div className="nodata">
           <img src={require('./nodata.jpg')} alt="no Data" />
            <Button onClick={()=>this.toggleNewProject()}> 去添加新项目</Button>
         </div>

       
       }
      
      <NewProject visible={this.state.newProject} handleOk={this.handleOk} handleCancel={this.handleCancel}/>
      <div>
        <Modal
          title="导入项目"
          visible={this.state.importProject}
          onOk={this.importProjectOk}
          onCancel={this.importProjectCancel}
          okText="确认"
          cancelText="取消"
        >
        {
          !this.state.uploadProject ? 
          <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">点击上传JSON文件或者拖拽上传JSON文件</p>
              
          </Dragger>
          :
          <div>
            <h3>选择导入到:</h3>
            <Select defaultValue="demo" style={{ width: 400 }} onChange={this.selectUpload}>
              <Option value="demo">演示项目</Option>
              <Option value="user">我的项目</Option>
            </Select>
          </div>

        }
       

        </Modal>

        <Modal
          title="导出项目"
          visible={this.state.exportProject}
          width="600px"
          onCancel={this.exportProjectCancel}
          footer={null}
        >
         <div className="export">
            <h4>导出格式</h4>
            <ul>
              <li>
                <Tooltip placement="top" title={'导出项目为JSON格式'}>
                  <img className="json" src={require('./json.png')} onClick={this.exportJson}/>
                </Tooltip>
              </li>
              <li>
                <Tooltip placement="top" title={'导出项目为MarkDown格式'}>
                  <img className="markdown" src={require('./markdown.png')}  onClick={this.exportMarkdown}/>
                </Tooltip>
              </li>
              <li>
                <Tooltip placement="top" title={'导出项目为Word格式'}>
                  <img className="word" src={require('./word.png')}  onClick={this.exportWord}/>
                </Tooltip>
              </li>
            </ul>
         </div>

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

        <Modal
          title="自动校验"
          visible={this.state.autoCheckVisible}

          onCancel={this.hideAutoCheckVisible}
          footer={null}
        >
          
        </Modal>

        <InterfaceMode projectId={this.state.currentProjectData._id} data={this.state.currentInterfaceData} visible={this.state.interfaceModeVisible} hideInterfaceMode={this.hideInterfaceMode}/>
      </div>

      </div>
    )
  }
}




export default ProjectBase;
