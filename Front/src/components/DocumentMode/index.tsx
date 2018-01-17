import * as React from 'react';
import './index.less';
import Message from 'antd/lib/message';
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
    };
  }
  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps: any) {
     // 如果有传入数据说明是编辑状态
     console.log(nextProps)
     if(nextProps.data){
     }
  }
  editorOnChange = (newValue:string) =>{
    console.log(newValue)
    this.setState({
      editorContent:newValue
    })
  }
  
  selectedMethod = (value:string) => {
    console.log(value)
    this.setState({
      method:value
    })
  }

  changeUrl = (e: any) => {
    console.log(e.target.value)
    this.setState({
      url:e.target.value
    })
  }
  update = () =>{
    let newInterface = {
      "id":this.state.id,
      "desc":this.state.desc,
      "url":this.state.url,
      "method":this.state.method,
      "mode":this.state.editorContent
    }
    console.log(newInterface)
    this.props.hideDocumentMode()
    Message.success(`更新成功!`);
    
  }
  
  add = () =>{
    let newInterface = {
      "desc":this.state.desc,
      "url":this.state.url,
      "method":this.state.method,
      "mode":this.state.editorContent
    }
    console.log(newInterface)
    this.props.hideDocumentMode()
    Message.success(`添加成功!`);
    
  }

  onEditorStateChange = (editorState:any) =>{
    console.log(this.state.editorContent)
    this.setState({
      editorContent:editorState
    })
  }
  handleChange = (value:any) =>{
    console.log(`selected ${value}`);
  }

  render () {
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    return(
      <div id="DocumentMode" className={ this.props.visible === true ? "show" : 'hide'} >
        <div className="editor">
        <Editor
          editorState={this.state.editorContent}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapper"
          editorClassName="editorContent"
          onEditorStateChange={this.onEditorStateChange}
        />

        </div>
        <div className="config">
            <h2>创建文档</h2> 
            <div className="form">

             <div className="item">
                <h3>文档名称</h3>
                <div style={{ width: '100%' }}>
                  <Input  value={this.state.url} onChange={this.changeUrl} />
                </div>
              </div>

              <div className="item">
                <h3>分配项目</h3>
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="将文档分配给项目"
                  defaultValue={['a10', 'c12']}
                  onChange={this.handleChange}
                >
                  {children}
                </Select>
              </div>
  
              <div className="item">
                <h3>文档描述</h3>
                <div style={{ width: '100%' }}>
                  <Input value={this.state.desc} />
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
                <li onClick={()=>this.props.hideDocumentMode()}>关闭</li>
              </ul>
            </div>

        </div>
      </div>
    )
  }
}




export default DocumentMode;
