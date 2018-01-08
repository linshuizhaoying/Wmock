import * as React from 'react';
import './index.less';
import differenceWith from 'lodash/differenceWith'
import isEqual from 'lodash/isEqual'
import Card from 'antd/lib/card';
import Tree  from 'antd/lib/tree';
import Icon  from 'antd/lib/icon';
import Tooltip  from 'antd/lib/tooltip';
// import Button from 'antd/lib/button';
import ProjectDetail from '../../../../components/ProjectDetail';
const TreeNode = Tree.TreeNode;

export class ProjectDemo extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = {
     data: []
    };
  }
  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps: any) {
     // 每次只更新变动的内容
     if(nextProps.projectList.length > 0 &&  differenceWith( nextProps.projectList,this.state.data, isEqual).length !== 0){
      this.setState({
        data: nextProps.projectList
      },()=>{
        console.log(this.state.data)
      })
    }

  }

  onSelect = (selectedKeys: any, info: any) => {
    console.log('selected', selectedKeys, info);
  }

  render () {
    return(
      <div>
       {
         this.props.projectList.length > 0 ?
          <div  id="ProjectDemo">
            <div className="projectTree">
            <div className="addProject">
              <Tooltip placement="right" title={'添加项目'}>
                <Icon type="plus-circle" />
              </Tooltip>
            
            </div>
            <Card style={{ width: 280 }}>

              <Tree defaultExpandedKeys={['1']} onSelect={this.onSelect}>
                <TreeNode title={
                  <div className="projectType">
                    
                    <div className="projectName"><Icon type="folder-open" />REST接口示例超长字符串测试asd123</div> 
                    <div className="projectOperate">

                      <Tooltip placement="top" title={'删除项目'}>
                          <Icon type="delete" className="operate-icon"/>
                        </Tooltip>

                        <Tooltip placement="top" title={'复制项目'}>
                          <Icon type="copy" className="operate-icon"/>
                        </Tooltip>

                        <Tooltip placement="top" title={'导入接口'}>
                          <Icon type="file-add" className="operate-icon"/>
                        </Tooltip>

                  
                        
                    </div>
                  </div>
                } key="1">
                    <TreeNode title={ 
                      <div className="interfaceType">
                          
                          <div className="interfaceName"><Icon type="file" /> 获取 </div> 
                          <div className="interfaceOperate">

                              <Tooltip placement="top" title={'删除接口'}>
                                <Icon type="delete" className="operate-icon"/>
                              </Tooltip>

                              <Tooltip placement="top" title={'复制接口'} >
                                <Icon type="copy" className="operate-icon"/>
                              </Tooltip>

                                
                        </div>
                      </div>
                    }  key="2" />
                    <TreeNode  title={ 
                      <div className="interfaceType">
                  
                          <div className="interfaceName"><Icon type="file" /> 增加 </div>
                          <div className="interfaceOperate">

                              <Tooltip placement="top" title={'删除接口'}>
                                <Icon type="delete" className="operate-icon"/>
                              </Tooltip>
                                

                              <Tooltip placement="top" title={'复制接口'}>
                                <Icon type="copy" className="operate-icon" />
                              </Tooltip>

                          
                        </div>
                      </div>
                    }  key="3" />
                    <TreeNode  title={ 
                      <div className="interfaceType">
                    
                          <div className="interfaceName"><Icon type="file" /> 删除 </div>  
                          <div className="interfaceOperate">
                              <Tooltip placement="top" title={'删除接口'}>
                                <Icon type="delete" className="operate-icon"/>
                              </Tooltip>

                              <Tooltip placement="top" title={'复制接口'}>
                                <Icon type="copy" className="operate-icon"/>
                              </Tooltip>

                    
                                
                        </div>
                      </div>
                    }   key="0-0-0-1" />
                    <TreeNode  title={ 
                      <div className="interfaceType">
                    
                          <div className="interfaceName"><Icon type="file" /> 更新 </div>
                          <div className="interfaceOperate">


                              <Tooltip placement="top" title={'删除接口'}>
                                <Icon type="delete" className="operate-icon"/>
                              </Tooltip>

                              <Tooltip placement="top" title={'复制接口'}>
                                <Icon type="copy" className="operate-icon"/>
                              </Tooltip>

                                
                        </div>
                      </div>
                    }  key="0-0-0-2" />
                </TreeNode>
                
                <TreeNode title={
                  <div className="projectType">
                  
                    <div className="projectName"><Icon type="folder-open" />基本操作接口示例</div>
                    <div className="projectOperate">


                        <Tooltip placement="top" title={'删除项目'}>
                          <Icon type="delete" className="operate-icon" />
                        </Tooltip>

                        <Tooltip placement="top" title={'Copy'}>
                          <Icon type="copy" className="operate-icon"/>
                        </Tooltip>

                        <Tooltip placement="top" title={'新增接口'}>
                          <Icon type="file-add" className="operate-icon"/>
                        </Tooltip>

                        
                    </div>
                  </div>
                }  key="8">
                  <TreeNode title={ 
                      <div className="interfaceType">
                          
                          <div className="interfaceName"><Icon type="file" /> 注册</div> 
                          <div className="interfaceOperate">
                              <Tooltip placement="top" title={'复制接口'} >
                                <Icon type="copy" className="operate-icon"/>
                              </Tooltip>

                              <Tooltip placement="top" title={'删除接口'}>
                                <Icon type="delete" className="operate-icon"/>
                              </Tooltip>
                                
                        </div>
                      </div>
                    }  key="9" />
                    <TreeNode  title={ 
                      <div className="interfaceType">
                  
                          <div className="interfaceName"><Icon type="file" /> 登录 </div>
                          <div className="interfaceOperate">
                              <Tooltip placement="top" title={'复制接口'}>
                                <Icon type="copy" className="operate-icon" />
                              </Tooltip>

                              <Tooltip placement="top" title={'删除接口'}>
                                <Icon type="delete" className="operate-icon"/>
                              </Tooltip>
                                
                        </div>
                      </div>
                    }  key="10" />
                    <TreeNode  title={ 
                      <div className="interfaceType">
                    
                          <div className="interfaceName"><Icon type="file" /> token </div>  
                          <div className="interfaceOperate">
                              <Tooltip placement="top" title={'复制接口'}>
                                <Icon type="copy" className="operate-icon"/>
                              </Tooltip>

                              <Tooltip placement="top" title={'删除接口'}>
                                <Icon type="delete" className="operate-icon"/>
                              </Tooltip>
                                
                        </div>
                      </div>
                    }   key="11" />
                    <TreeNode  title={ 
                      <div className="interfaceType">
                    
                          <div className="interfaceName"><Icon type="file" /> 退出 </div>
                          <div className="interfaceOperate">
                              <Tooltip placement="top" title={'复制接口'}>
                                <Icon type="copy" className="operate-icon"/>
                              </Tooltip>

                              <Tooltip placement="top" title={'删除接口'}>
                                <Icon type="delete" className="operate-icon"/>
                              </Tooltip>
                                
                        </div>
                      </div>
                    }  key="12" />
                </TreeNode>

              </Tree>
          
            </Card>
            </div>
            <div className="projectContent">
              <ProjectDetail/>
            </div> 
         </div>
      
         :
         <div className="nodata">
           <img src={require('./nodata.jpg')} alt="no Data" />
         </div>

       
       }
      
        
      </div>
    )
  }
}




export default ProjectDemo;
