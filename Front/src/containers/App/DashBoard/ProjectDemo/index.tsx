import * as React from 'react';

import './index.less';
import ProjectBase from '../ProjectBase/index'
class ProjectDemo extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {

    }
  }

  componentWillMount() {

  }

  componentDidMount() {

  }
  componentWillReceiveProps(nextProps: any) {
    //  console.log(nextProps)
  }


  render() {
    return (
      <div className="ProjectDemo">
        <ProjectBase documentList={this.props.documentList} projectVerify={this.props.projectVerify} projectList={this.props.projectList} messagesList={this.props.messagesList} userid={this.props.userid} type={"demo"}></ProjectBase>
      </div>
    );
  }
}

export default ProjectDemo;