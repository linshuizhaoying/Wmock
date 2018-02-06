import * as React from 'react';
import './index.less';
// import brace from 'brace';
import AceEditor from 'react-ace';
import * as copy from 'copy-to-clipboard';
// import Select from 'antd/lib/select';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Mock from 'mockjs'
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import Divider from 'antd/lib/divider';
import jsBeautify from 'js-beautify/js/lib/beautify'
import Message from 'antd/lib/message';
import Select from 'antd/lib/select';
const { Option, OptGroup } = Select;
// import { MockUrl } from '../../service/api'
// const Option = Select.Option;

export class ModelMode extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      status: 'add',
      visible: false,
      editorContent: '',
      modelName: '',
      modelDesc: '',
      modelMode: '',
      id: '',
      result: ''

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
        modelName: nextProps.data.modelName,
        modelDesc: nextProps.data.modelDesc,
        modelMode: nextProps.data.modelMode,
        editorContent: nextProps.data.modelMode,
        status: 'update'
      }, () => {
        this.editorOnChange(this.state.editorContent)
        this.format()
      })
    } else {
      this.setState({
        id: '',
        modelName: '',
        modelDesc: '',
        modelMode: '',
        editorContent: `{
  "data": {}
}`,
        status: 'add'
      }, () => {
        this.format()
      })
    }
  }

  formatCode = (oldStrig: string) =>{
    let tpl, data
    try {
      tpl = oldStrig.replace(/^([\r\n]*)/i, '')
        .replace(/([\r\n]*$)/i, '')
      tpl = new Function('return ' + tpl)
      tpl = tpl()
    } catch (error) {
      tpl = error.toString()
    }
    try {
      data = Mock.mock(tpl) || ''
      data = JSON.stringify(data, null, 2)
    } catch (error) {
      data = error.toString()
    }
    return data
  }
  editorOnChange = (newValue: string) => {

    this.setState({
      editorContent: newValue,
      result: this.formatCode(newValue)
    })
  }

  changeName = (e: any) => {
    console.log(e.target.value)
    this.setState({
      modelName: e.target.value
    })
  }
  changeDesc = (e: any) => {
    console.log(e.target.value)
    this.setState({
      modelDesc: e.target.value
    })
  }
  format = () => {
    let temp = this.state.editorContent
    this.setState({
      editorContent: jsBeautify.js_beautify(temp, { indent_size: 2 })
    })
  }
  update = () => {
    let newInterface = {
      "_id": this.state.id,
      "modelName": this.state.modelName,
      "modelDesc": this.state.modelDesc,
      "modelMode": this.state.editorContent,
    }
    if(this.state.modelName === '' || this.state.modelDesc === '' || this.state.editorContent === '' ){
      Message.error(`有内容为空，请填写!!`);
    } else {
      this.props.update(newInterface)
     // Message.success(`添加成功!`);
      this.props.hideModelMode()
    }
  }

  add = () => {
    let newInterface = {
      "modelName": this.state.modelName,
      "modelDesc": this.state.modelDesc,
      "modelMode": this.state.editorContent,
    }
    console.log(newInterface)
    if(this.state.modelName === '' || this.state.modelDesc === '' || this.state.editorContent === '' ){
      Message.error(`有内容为空，请填写!!`);
    } else {
      this.props.add(newInterface)
     // Message.success(`添加成功!`);
      this.props.hideModelMode()
    }

  }
  selectModel = (value: any) => {
    console.log(`selected ${value}`);
    if (copy(this.formatCode(value))) {
      Message.success('复制模型成功,可直接用于模型编辑!');
    } else {
      Message.error('复制失败!');
    }
  }

  render() {
    return (
      <div id="ModelMode" className={this.props.visible === true ? "show" : 'hide'} >
        <div className="editor">
          <AceEditor
            mode="javascript"
            theme="monokai"
            name="blah2"
            fontSize={18}
            height="100%"
            width="100%"
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
        <div className="result">
          {/* <textarea value={this.state.result}></textarea> */}
          <h3>同步Mock结果:</h3>
          <div className="editorContent">
            <AceEditor
              mode="javascript"
              theme="monokai"
              name="blah2"
              fontSize={18}
              height="100%"
              width="100%"
              showPrintMargin={false}
              showGutter={true}
              highlightActiveLine={true}
              value={this.state.result}
              setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
              }} />
          </div>

          <Divider></Divider>
          <h3>选择模型</h3>
          <div className="selectModel">
            <Select
              style={{ width: 200 }}
              onChange={this.selectModel}
            >
              <OptGroup label="基础模型">
                {this.props.baseModelList.map((item: any) => {
                  return (
                    <Option key={item.modelMode}>{item.modelName}</Option>
                  )

                })}
              </OptGroup>
              <OptGroup label="自定义模型">
                {this.props.customModelList.map((item: any) => {
                  return (
                    <Option key={item.modelMode}>{item.modelName}</Option>
                  )

                })}
              </OptGroup>
            </Select>
          </div>

        </div>

        <div className="operate">
          <div className="wrapper">
            {this.state.status === 'update' ? <h2>更新模型</h2> : <h2>创建模型</h2>}
            <div className="form">
              <div className="item">
                <h3>模型名称</h3>
                <Input addonAfter="" value={this.state.modelName} onChange={this.changeName} />
              </div>
              <div className="item">
                <h3>描述</h3>
                <div style={{ width: '100%' }}>
                  <Input addonAfter="" value={this.state.modelDesc} onChange={this.changeDesc} />
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
                <li onClick={() => this.props.hideModelMode()}>关闭</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}




export default ModelMode;
