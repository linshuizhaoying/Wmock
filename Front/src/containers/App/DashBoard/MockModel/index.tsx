import * as React from 'react';
import './index.less';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Divider from 'antd/lib/divider';
import Card from 'antd/lib/card';
import Popconfirm from 'antd/lib/popconfirm';
import ModelMode from '../../../../components/ModelMode'
import { isEqual } from '../../../../util/helper'
export class MockModel extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = {
      modelModeVisible: false,
      currentModelData: '',
      baseModelList: [],
      customModelList: [],
      isLoaded:false // 是否加载过
    };
  }
  componentDidMount() {

  }


  componentWillReceiveProps(nextProps: any) {
     // 每次只更新变动的模型
     console.log(nextProps)
     if(nextProps.baseModelList.length >= 0 && !isEqual(nextProps.baseModelList,this.state.baseModelList)){
      this.setState({
        baseModelList: nextProps.baseModelList,
        isLoaded: true
      },()=>{
        console.log('update ok')
      })
     }

    // 每次只更新变动的模型
    if(nextProps.customModelList.length >= 0 && !isEqual(nextProps.customModelList,this.state.customModelList)){
      this.setState({
        customModelList: nextProps.customModelList,
        isLoaded: true
      },()=>{
        console.log('update ok')
      })
      }

  }

  addModel = () => {
    console.log('addModel')
    this.setState({
      currentModelData:''
    },()=>{
      this.setState({
        modelModeVisible:true
      })
    })
  }
  
  showModelMode = () =>{
    this.setState({
     modelModeVisible:true
    })
  }
  hideModelMode = () =>{
    this.setState({
     modelModeVisible:false
    })
  }

  selectCurrentModel = (data:any)=>{
    console.log(data)
    this.setState({
      currentModelData:data
    })
  }

  deleteModel = (id:string) =>{
    // const { dispatch } = this.props;
    // dispatch(deleteModel(id)) 
    // Message.success('文档删除成功!');
  }

  updateModel = (data:any) =>{
   // const { dispatch } = this.props;
    // dispatch(updateModel(data)) 
  }
  render () {
    return(
      <div id="MockModel">
        <Row className="modelHeader">
          <Col span={16} className="textleft">Mock自定义模型总数为 <span className="red">{this.state.customModelList.length}</span> 个</Col>
          <Col span={8}><Button type="primary" onClick={()=>this.addModel()}>添加模型</Button> <Button>Mock模型说明<Icon type="question-circle" /></Button></Col>
        </Row>

        <Divider></Divider>
        <Row>
        {  this.state.customModelList.map((item: any) =>{
                    return(
            <Col span={6} key={item._id}> 
              <Card
                hoverable  actions={[<div onClick={()=> {this.selectCurrentModel(item);this.showModelMode();}}>编辑<Icon type="edit" /></div>,
                <div>
                <Popconfirm title="确定删除该文档么?" onConfirm={()=>{this.deleteModel('')}} okText="确定删除" cancelText="取消">
                删除<Icon type="close" />
                </Popconfirm>
              </div>]}
                >
                <ul className="modelContent">
                  <li> <div className="pre">名称:</div><div className="modelName">{item.modelName}</div></li>
                  <li> <div className="pre">描述:</div><div className="modelDesc">{item.modelDesc}</div></li>
                </ul>
              </Card>
            </Col>
         
            )
            })
          }
          </Row>
        <ModelMode customModelList={this.state.customModelList}  baseModelList={this.state.baseModelList} refresh={this.props.refresh} updateModel={this.updateModel} hideModelMode={this.hideModelMode} visible={this.state.modelModeVisible} data={this.state.currentModelData}/>
      </div>
    )
  }
}




export default MockModel;
