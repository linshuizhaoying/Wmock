import * as React from 'react';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Modal from 'antd/lib/modal';
import Tooltip from 'antd/lib/tooltip';
import { ChangeEvent } from 'react';
import './index.less';

export class NewProject extends React.Component<NewProjectProps, NewProjectState> {
  constructor(props: NewProjectProps) {
    super(props)
    this.state = {
      projectName: '',
      url: '',
      desc: ''
    };
  }

  componentDidMount() {

  }

  editProjectName = (name: string) => {
    this.setState({
      projectName: name
    })
  }
  editUrl = (url: string) => {
    this.setState({
      url: url
    })
  }
  editDesc = (desc: string) => {
    this.setState({
      desc: desc
    })
  }

  clear = () => {
    this.setState({
      projectName: '',
      url: '',
      desc: ''
    })
  }

  changeProjectName = (e: ChangeEvent<HTMLInputElement>) => {
    this.editProjectName(e.target.value)
  }
  changeProjectUrl = (e: ChangeEvent<HTMLInputElement>) => {
    this.editUrl(e.target.value)
  }
  changeProjectDesc = (e: ChangeEvent<HTMLInputElement>) => {
    this.editDesc(e.target.value)
  }
  render() {

    return (

      <Modal
        title="创建项目"
        visible={this.props.visible}
        onOk={() => {
          this.clear();
          this.props.handleOk(this.state.projectName, this.state.url, this.state.desc);
        }}
        onCancel={() => {
          this.clear();
          this.props.handleCancel();
        }}
        width={800}
        okText="创建"
        cancelText="取消"
      >
        <div id="NewProject">
          <p>
            创建者/项目名
            <Tooltip placement="right" title={'项目名尽量简短易懂，如GameStore'}>
              <Icon type="question-circle" />
            </Tooltip>
          </p>
          <span>
            <Input
              addonBefore="demo"
              value={this.state.projectName}
              onChange={this.changeProjectName}
              placeholder="example"
            />
          </span>

          <p>项目基础URL
            <Tooltip placement="right" title={'url尽量简短，如getList'}>
              <Icon type="question-circle" />
            </Tooltip>
          </p>
          <span>
            <Input addonBefore="/" value={this.state.url} onChange={this.changeProjectUrl} placeholder="example" />
          </span>
          <p>
            项目描述
          </p>
          <span>
            <Input value={this.state.desc} onChange={this.changeProjectDesc} placeholder="不填写默认为项目名称" />
          </span>
        </div>
      </Modal>

    )
  }
}

export default NewProject;
