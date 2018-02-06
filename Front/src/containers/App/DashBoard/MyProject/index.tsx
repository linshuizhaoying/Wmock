import * as React from 'react';
import './index.less';
import ProjectBase from '../ProjectBase/index'
export class MyProject extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = {
     
    };
  }
  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps: any) {
   //  console.log(nextProps)
  }


  render () {
    return(
      <div id="MyProject">
        <ProjectBase documentList={this.props.documentList} projectVerify={this.props.projectVerify} projectList={this.props.projectList} messagesList={this.props.messagesList} userid={this.props.userid} type={"user"}></ProjectBase>
      </div>
    )
  }
}




export default MyProject;
