import * as React from 'react';
import Button from 'antd/lib/button';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import Input from 'antd/lib/input';
import Message from 'antd/lib/message';
import Select from 'antd/lib/select';
import { ChangeEvent } from 'react';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import './index.less';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const Option = Select.Option;

export class DocumentMode extends React.Component<DocumentModePorps, DocumentModeState> {
  constructor(props: DocumentModePorps) {
    super(props)
    this.state = {
      visible: false,
      editorContent: '',
      status: 'add',
      id: '',
      type: 'project',
      desc: '',
      method: '',
      content: '',
      name: '',
      assign: [],
      ownerName: '',
      ownerId: ''

    };
  }
  componentWillReceiveProps(nextProps: AdvanceAny) {
    // 如果有传入数据说明是编辑状态
    if (nextProps.data) {
      const contentBlock = htmlToDraft(nextProps.data.content);
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);

      this.setState({
        status: 'update',
        id: nextProps.data._id,
        type: nextProps.data.type,
        desc: nextProps.data.desc,
        content: editorState,
        name: nextProps.data.name,
        assign: nextProps.data.assign || [],
        ownerName: nextProps.data.ownerName,
        ownerId: nextProps.data.ownerId
      })
    } else {
      this.setState({
        status: 'add',
        id: '',
        type: 'spec',
        desc: '',
        content: '',
        name: '',
        assign: [],
      })
    }
  }

  selectedMethod = (value: string) => {
    this.setState({
      method: value
    })
  }

  changeName = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      name: e.target.value
    })
  }

  changeDesc = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      desc: e.target.value
    })
  }
  update = () => {
    let newDocument = {
      '_id': this.state.id,
      'desc': this.state.desc,
      'type': this.state.type,
      'name': this.state.name,
      'content': draftToHtml(convertToRaw(this.state.content.getCurrentContent())),
      'assign': this.state.assign,
      'ownerName': this.state.ownerName,
      'ownerId': this.state.ownerId
    }
    if (this.state.desc === '' ||
      this.state.type === '' ||
      this.state.name === '' ||
      this.state.content === '' ||
      this.state.assign === []) {
      Message.error(`有内容为空，请填写!!`);
    } else {
      this.props.updateDocument(newDocument)
      this.props.hideDocumentMode();
      // this.props.refresh();
    }
  }

  add = () => {
    let newDocument = {
      'desc': this.state.desc,
      'type': this.state.type,
      'name': this.state.name,
      'content': this.state.content === '' ? '' : draftToHtml(convertToRaw(this.state.content.getCurrentContent())),
      'assign': this.state.assign
    }
    if (this.state.desc === '' ||
      this.state.type === '' ||
      this.state.name === '' ||
      this.state.content === '' ||
      this.state.assign === []) {
      Message.error(`有内容为空，请填写!!`);
    } else {
      this.props.addDocument(newDocument)
      this.props.hideDocumentMode();
      //     this.props.refresh();
    }
  }

  onEditorStateChange = (editorState: string) => {
    // console.log(this.state.editorContent)
    this.setState({
      content: editorState
    })
  }
  handleChange = (value: Array<string>) => {
    this.setState({
      assign: [...value]
    })
  }
  selectedType = (value: string) => {
    this.setState({
      type: value
    })
  }
  closeModal = () => {
    this.setState({
      status: 'add',
      id: '',
      type: 'spec',
      desc: '',
      content: '',
      name: '',
      assign: [],
    })
  }
  render() {
    const children = [];
    for (let i = 0; i < this.props.projectList.length; i++) {
      children.push();
    }

    return (
      <div id="DocumentMode" className={this.props.visible === true ? 'show' : 'hide'} >
        <div className="editor">
          <Editor
            editorState={this.state.content}
            // toolbarOnFocus
            toolbar={{
              options: ['inline', 'list', 'textAlign', 'blockType', 'fontSize', 'fontFamily', 'link'],
              inline: {
                options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
                bold: { className: 'bordered-option-classname' },
                italic: { className: 'bordered-option-classname' },
                underline: { className: 'bordered-option-classname' },
                strikethrough: { className: 'bordered-option-classname' },
                code: { className: 'bordered-option-classname' },
              },
              blockType: {
                className: 'bordered-option-classname',
              },
              fontSize: {
                className: 'bordered-option-classname',
              },
              fontFamily: {
                className: 'bordered-option-classname',
              },
              link: {
                className: 'bordered-option-classname'
              },
            }}
            wrapperClassName="wrapper"
            editorClassName="editorContent"
            onEditorStateChange={this.onEditorStateChange}
          />

        </div>
        <div className="config">
          {this.state.status === 'update' ? <h2>更新文档</h2> : <h2>创建文档</h2>}
          <div className="form">

            <div className="item">
              <h3>文档名称</h3>
              <div style={{ width: '100%' }}>
                <Input value={this.state.name} onChange={this.changeName} />
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
            {
              this.state.status === 'add' ?
                <div className="item">
                  <h3>分配项目</h3>
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="将文档分配给项目"
                    value={this.state.assign}
                    onChange={this.handleChange}
                  >
                    {this.props.projectList.map((item: Project) => {
                      return (
                        <Option key={item._id}>{item.projectName}</Option>
                      )

                    })}
                  </Select>
                </div> :
                null
            }

            {
              this.state.status === 'update' && this.props.userId === this.state.ownerId ?
                <div className="item">
                  <h3>分配项目</h3>
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="将文档分配给项目"
                    value={this.state.assign}
                    onChange={this.handleChange}
                  >
                    {this.props.projectList.map((item: Project) => {
                      return (
                        <Option key={item._id}>{item.projectName}</Option>
                      )

                    })}
                  </Select>
                </div> :
                null
            }

            <div className="item">
              <h3>文档描述</h3>
              <div style={{ width: '100%' }}>
                <Input value={this.state.desc} onChange={this.changeDesc} />
              </div>
            </div>

            <div className="item">
              <div style={{ width: '100%' }}>
                {this.state.status === 'update' ?
                  <Button type="primary" className="update" onClick={this.update}>更新</Button>
                  : <Button type="primary" className="add" onClick={this.add}>创建</Button>}
              </div>

            </div>
          </div>
          <div className="switcher">
            <ul>
              <li onClick={() => { this.closeModal(); this.props.hideDocumentMode() }}>关闭</li>
            </ul>
          </div>

        </div>
      </div>
    )
  }
}

export default DocumentMode;
