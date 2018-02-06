import * as React from 'react';
import './index.less';
// import brace from 'brace';
import AceEditor from 'react-ace';
import Select from 'antd/lib/select';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import jsBeautify from 'js-beautify/js/lib/beautify'
import Message from 'antd/lib/message';
import { MockUrl } from '../../../../../../../../service/api'
const Option = Select.Option;

export class InterfaceMode extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      status: 'add',
      visible: false,
      editorContent: '',
      method: 'post',
      url: '',
      desc: '',
      id: '',
      interfaceName: ''

    };
  }
  componentDidMount() {

  }

  componentWillReceiveProps(nextProps: any) {
    // 如果有传入数据说明是编辑状态
    console.log(nextProps)
    if (nextProps.data) {
      this.setState({
        id: nextProps.data._id,
        method: nextProps.data.method,
        url: nextProps.data.url,
        desc: nextProps.data.desc,
        editorContent: nextProps.data.mode,
        status: 'update',
        interfaceName: nextProps.data.interfaceName,
      }, () => {
        console.log('set ok')
      })
    } else {
      this.setState({
        id: '',
        method: 'get',
        url: '',
        desc: '',
        editorContent: `{
  "data": {}
}`,
        status: 'add',
        interfaceName: ''
      })
    }
  }

  editorOnLoad = () => {
    this.setState({
      editorContent: `{
  "data": {}
}`
    })

  }
  editorOnChange = (newValue: string) => {
    console.log(newValue)
    this.setState({
      editorContent: newValue
    })
  }

  selectedMethod = (value: string) => {
    console.log(value)
    this.setState({
      method: value
    })
  }

  changeUrl = (e: any) => {
    console.log(e.target.value)
    this.setState({
      url: e.target.value
    })
  }
  changeDesc = (e: any) => {
    console.log(e.target.value)
    this.setState({
      desc: e.target.value
    })
  }
  changeInterfaceName = (e: any) => {
    console.log(e.target.value)
    this.setState({
      interfaceName: e.target.value
    })
  }
  format = () => {
    let temp = this.state.editorContent
    this.setState({
      editorContent: jsBeautify.js_beautify(temp, { indent_size: 2 })
    })
  }
  preview = () => {
    window.open(MockUrl + this.props.projectId + this.state.url + '#!method=' + this.state.method)
  }
  update = () => {
    let newInterface = {
      "_id": this.state.id,
      "desc": this.state.desc,
      "url": this.state.url,
      "method": this.state.method,
      "mode": this.state.editorContent,
      "interfaceName": this.state.interfaceName

    }
    if(this.state.interfaceName === '' || this.state.desc === '' || this.state.method === '' || this.state.mode === '' || this.state.url === ''){
      Message.error(`有内容为空，请填写!!`);
    } else {
      this.props.updateInterface(newInterface)
      this.props.hideInterfaceMode()
    }

  }

  add = () => {
    let newInterface = {
      "interfaceName": this.state.interfaceName,
      "desc": this.state.desc,
      "url": this.state.url,
      "method": this.state.method,
      "mode": this.state.editorContent
    }
    if(this.state.interfaceName === '' || this.state.desc === '' || this.state.method === '' || this.state.mode === '' || this.state.url === ''){
      Message.error(`有内容为空，请填写!!`);
    } else {
      this.props.addInterface(newInterface)
      this.props.hideInterfaceMode()
    }
  }

  render() {
    return (
      <div id="InterfaceMode" className={this.props.visible === true ? "show" : 'hide'} >
        <div className="editor">
          <AceEditor
            mode="javascript"
            theme="monokai"
            name="blah2"
            fontSize={18}
            height="100%"
            width="100%"
            onLoad={this.editorOnLoad}
            onChange={this.editorOnChange}
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
            value={this.state.editorContent}
            setOptions={{
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: false,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 2,
            }} />

        </div>
        <div className="operate">
          <div className="wrapper">
            {this.state.status === 'update' ? <h2>更新接口</h2> : <h2>创建接口</h2>}
            <div className="form">
              <div className="item">
                <h3>名称</h3>
                <div style={{ width: '100%' }}>
                  <Input addonAfter="" value={this.state.interfaceName} onChange={this.changeInterfaceName} />
                </div>
              </div>

              <div className="item">
                <h3>Method</h3>
                <Select value={this.state.method} style={{ width: '100%' }} onChange={this.selectedMethod}>
                  <Option value="get">Get</Option>
                  <Option value="post">Post</Option>
                  <Option value="put">Put</Option>
                  <Option value="patch">Patch</Option>
                  <Option value="delete">Delete</Option>
                </Select>
              </div>

              <div className="item">
                <h3>Url</h3>
                <div style={{ width: '100%' }}>
                  <Input addonBefore="/" addonAfter="" value={this.state.url} onChange={this.changeUrl} />
                </div>
              </div>
              <div className="item">
                <h3>描述</h3>
                <div style={{ width: '100%' }}>
                  <Input addonAfter="" value={this.state.desc} onChange={this.changeDesc} />
                </div>
              </div>

              <div className="item">
                <div style={{ width: '100%' }}>
                  {this.state.status === 'update' ? <Button type="primary" className="update" onClick={this.update}>更新</Button>
                    : <Button type="primary" className="add" onClick={this.add}>创建</Button>}
                </div>

              </div>
            </div>
            <div className="switcher">
              <ul>
                <li onClick={() => this.format()}>格式化</li>
                <li onClick={() => this.preview()}>预览</li>
                <li onClick={() => this.props.hideInterfaceMode()}>关闭</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}




export default InterfaceMode;
