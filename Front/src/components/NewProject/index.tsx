import * as React from 'react';
import './index.less';
import Modal  from 'antd/lib/modal';
import Input  from 'antd/lib/input';
import Icon  from 'antd/lib/icon';
import Tooltip  from 'antd/lib/tooltip';
export class NewProject extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = {
      projectName: '',
      url: '',
      desc: ''
    };
  }
  

  componentDidMount() {
    console.log('2333')
  }

  editProjectName = (name:string) => {
    this.setState({
      projectName: name
    })
  }
  editUrl = (url:string) => {
    this.setState({
      url: url
    })
  }
  editDesc = (desc:string) => {
    this.setState({
      desc: desc
    })
  }

  clear =() => {
    this.setState({
      projectName: '',
      url: '',
      desc: ''
    })
  }


  componentWillReceiveProps(nextProps: any) {
  }
  
  render () {

    return(
    
        <Modal
          title="创建项目"
          visible={this.props.visible}
          onOk={ ()=>{
            this.clear();
            this.props.handleOk(this.state.projectName,this.state.url,this.state.desc);
          }}
          onCancel={()=>{
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
            <Input addonBefore="demo"  value={this.state.projectName}
             onChange={(e: any) => { this.editProjectName(e.target.value)}} placeholder="example"/>
          </span>

          <p>项目基础URL
            <Tooltip placement="right" title={'url尽量简短，如getList'}>
              <Icon type="question-circle" />
            </Tooltip>
          </p>
          <span>
            <Input addonBefore="/"  value={this.state.url}
             onChange={(e: any) => { this.editUrl(e.target.value)}} placeholder="example"/>
          </span>
           <p>
             项目描述
          </p>
          <span>
            <Input value={this.state.desc}
             onChange={(e: any) => { this.editDesc(e.target.value)}} placeholder="不填写默认为项目名称"/>
          </span>
         </div>
        </Modal>
     
    )
  }
}




export default NewProject;
