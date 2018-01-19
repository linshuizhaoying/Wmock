import * as React from 'react';
import './index.less';
import Message from 'antd/lib/message';
import { EditorState, ContentState,convertToRaw } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
const Option = Select.Option;

// import { EditorState, convertToRaw, } from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';

export class DocumentMode extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = {
      visible:false,
      editorContent:'',
      status:'add',
      id: '',
      type:'project',
      desc:'',
      content:'',
      name:'',
      assign:[],

    };
  }
  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps: any) {
     // 如果有传入数据说明是编辑状态
    //  console.log(this.props)
    //  console.log(nextProps)
     if(nextProps.data){
      const contentBlock = htmlToDraft(nextProps.data.content);
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);

       this.setState({
        status:'update',
        id: nextProps.data._id,
        type: nextProps.data.type,
        desc: nextProps.data.desc,
        content: editorState,
        name: nextProps.data.name,
        assign: nextProps.data.assign || [],
        ownerName:nextProps.data.ownerName,
        ownerId:nextProps.data.ownerId
       },()=>{
         console.log('set update ok')
       })
     }else{
      this.setState({
        status:'add',
        id: '',
        type: 'spec',
        desc: '',
        content: '',
        name: '',
        assign: [],
       },()=>{
         console.log('set add ok')
       })
     }
  }
  
  selectedMethod = (value:string) => {
    console.log(value)
    this.setState({
      method:value
    })
  }

  changeName = (e: any) => {
    console.log(e.target.value)
    this.setState({
      name:e.target.value
    })
  }

  changeDesc = (e: any) => {
    console.log(e.target.value)
    this.setState({
      desc:e.target.value
    })
  }
  update = () =>{
    let newDocument = {
      "_id":this.state.id,
      "desc":this.state.desc,
      "type":this.state.type,
      "name":this.state.name,
      "content": draftToHtml(convertToRaw(this.state.content.getCurrentContent())),
      "assign":this.state.assign,
      "ownerName":this.state.ownerName,
      "ownerId":this.state.ownerId
      
    }
    console.log(newDocument)
    this.props.updateDocument(newDocument)
    
    this.props.hideDocumentMode()
    Message.success(`更新成功!`);
    
  }
  
  add = () =>{
    let newDocument = {
      "id":this.state.id,
      "desc":this.state.desc,
      "type":this.state.type,
      "name":this.state.name,
      "content":this.state.content === '' ? '' :draftToHtml(convertToRaw(this.state.content.getCurrentContent())),
      "assign":this.state.assign
    }
    console.log(newDocument)
    this.props.hideDocumentMode()
    Message.success(`添加成功!`);
    this.props.refresh();
    
  }

  onEditorStateChange = (editorState:any) =>{
    // console.log(this.state.editorContent)
    this.setState({
      content:editorState
    })
  }
  handleChange = (value:any) =>{
    console.log(`selected ${value}`);
    this.setState({
      assign:[...value]
    })
  }
  selectedType = (value:string) => {
    console.log(value)
    this.setState({
      type:value
    })
  }
  closeModal = () =>{
    console.log('clear')
    this.setState({
      status:'add',
      id: '',
      type: 'spec',
      desc: '',
      content: '',
      name: '',
      assign: [],
     })
  }
  render () {
    const children = [];
    for (let i = 0; i < this.props.projectList; i++) {
      console.log(this.props.projectList[i])
      children.push();
    }

    return(
      <div id="DocumentMode" className={ this.props.visible === true ? "show" : 'hide'} >
        <div className="editor">
        <Editor
          editorState={this.state.content}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapper"
          editorClassName="editorContent"
          onEditorStateChange={this.onEditorStateChange}
        />

        </div>
        <div className="config">
            {this.state.status === 'update' ? <h2>更新文档</h2> : <h2>创建文档</h2> }
            <div className="form">

             <div className="item">
                <h3>文档名称</h3>
                <div style={{ width: '100%' }}>
                  <Input  value={this.state.name} onChange={this.changeName} />
                </div>
              </div>
              <div className="item">
                <h3>类型</h3>
                <Select value={this.state.type} style={{ width: '100%' }} onChange={this.selectedType}>
                  <Option value="spec">规范</Option>  
                  <Option value="project">项目文档</Option>
                  <Option value="other">其他</Option>
                </Select>
              </div>
              <div className="item">
                <h3>分配项目</h3>
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="将文档分配给项目"
                  value={this.state.assign}
                  onChange={this.handleChange}
                >
                  {this.props.projectList.map((item:any) => {
                    return (
                      <Option key={item._id}>{item.projectName}</Option>
                    )

                  })}
                </Select>
              </div>
  
              <div className="item">
                <h3>文档描述</h3>
                <div style={{ width: '100%' }}>
                  <Input value={this.state.desc} onChange={this.changeDesc}/>
                </div>
              </div>

              <div className="item">
                <div style={{ width: '100%' }}>
                  {this.state.status === 'update' ?   <Button type="primary" className="update" onClick={this.update}>更新</Button>
                   :  <Button type="primary" className="add" onClick={this.add}>创建</Button>}
                </div>
              
              </div>
            </div>
            <div className="switcher">
              <ul>
                <li onClick={()=>{this.closeModal();this.props.hideDocumentMode()}}>关闭</li>
              </ul>
            </div>

        </div>
      </div>
    )
  }
}




export default DocumentMode;
