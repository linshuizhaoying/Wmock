import * as copy from 'copy-to-clipboard';
import * as React from 'react';
import AceEditor from 'react-ace';
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';
import Input from 'antd/lib/input';
import jsBeautify from 'js-beautify/js/lib/beautify';
import Message from 'antd/lib/message';
import Mock from 'mockjs';
import Select from 'antd/lib/select';
import { ChangeEvent } from 'react';
import './index.less';
import 'brace/theme/monokai';
import 'brace/mode/javascript';
const { Option, OptGroup } = Select;

export class ModelMode extends React.Component<ModelModeProps, ModelModeState> {
  constructor(props: ModelModeProps) {
    super(props)
    this.state = {
      status: 'add',
      visible: false,
      editorContent: '',
      modelDataName: '',
      modelDesc: '',
      modelMode: '',
      id: '',
      result: ''

    };
  }
  componentWillReceiveProps(nextProps: AdvanceAny) {
    // 如果有传入数据说明是编辑状态
    if (nextProps.data) {
      this.setState({
        id: nextProps.data._id,
        modelDataName: nextProps.data.modelDataName,
        modelDesc: nextProps.data.modelDesc,
        modelMode: nextProps.data.modelMode,
        editorContent: nextProps.data.modelMode,
        status: 'update',
      }, () => {
        this.editorOnChange(this.state.editorContent);
        this.format()
      })
    } else {
      this.setState({
        id: '',
        modelDataName: '',
        modelDesc: '',
        modelMode: '',
        editorContent: `{
  "data": {}
}`,
        status: 'add'
      }, () => { this.format() })
    }
  }

  formatCode = (oldStrig: string) => {
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

  changeName = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      modelDataName: e.target.value
    })
  }
  changeDesc = (e: ChangeEvent<HTMLInputElement>) => {
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
      '_id': this.state.id,
      'modelDataName': this.state.modelDataName,
      'modelDesc': this.state.modelDesc,
      'modelMode': this.state.editorContent,
    }
    if (this.state.modelDataName === '' || this.state.modelDesc === '' || this.state.editorContent === '') {
      Message.error(`有内容为空，请填写!!`);
    } else {
      this.props.update(newInterface)
      this.props.hideModelMode()
    }
  }

  add = () => {
    let newModel = {
      'modelDataName': this.state.modelDataName,
      'modelDesc': this.state.modelDesc,
      'modelMode': this.state.editorContent,
      'userId': this.props.userId,
      'userName': this.props.userName,
    }
    if (this.state.modelDataName === '' || this.state.modelDesc === '' || this.state.editorContent === '') {
      Message.error(`有内容为空，请填写!!`);
    } else {
      this.props.add(newModel)
      this.props.hideModelMode()
    }

  }
  selectModel = (value: string) => {
    if (copy(value)) {
      Message.success('复制模型成功,可直接用于模型编辑!');
    } else {
      Message.error('复制失败!');
    }
  }

  render() {
    return (
      <div id="ModelMode" className={this.props.visible === true ? 'show' : 'hide'} >
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
            }}
          />

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
                enableSnippets: true,
                showLineNumbers: true,
                useWorker: false,
                tabSize: 2,
              }}
            />
          </div>
          <Divider />
          <h3>选择模型</h3>
          <div className="selectModel">
            <Select
              style={{ width: 200 }}
              onChange={this.selectModel}
            >
              <OptGroup label="基础模型">
                {this.props.baseModelList.map((item: Model) => {
                  return (
                    <Option key={item.modelMode}>{item.modelDataName}</Option>
                  )

                })}
              </OptGroup>
              <OptGroup label="自定义模型">
                {this.props.customModelList.map((item: Model) => {
                  return (
                    <Option key={item.modelMode}>{item.modelDataName}</Option>
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
                <Input addonAfter="" value={this.state.modelDataName} onChange={this.changeName} />
              </div>
              <div className="item">
                <h3>描述</h3>
                <div style={{ width: '100%' }}>
                  <Input addonAfter="" value={this.state.modelDesc} onChange={this.changeDesc} />
                </div>
              </div>

              <div className="item">
                <div style={{ width: '100%' }}>
                  {this.state.status === 'update' ?
                    <Button type="primary" className="update" onClick={this.update}>更新</Button> :
                    <Button type="primary" className="add" onClick={this.add}>创建</Button>}
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
