import * as React from 'react';
import ProjectBase from '../ProjectBase/index';
import './index.less';
class ProjectDemo extends React.Component<ProjectProps, {}> {

  render() {
    return (
      <div className="ProjectDemo">
        <ProjectBase
          getProjectDemo={this.props.getProjectDemo}
          getMyProject={this.props.getMyProject}
          otherList={this.props.otherList}
          documentList={this.props.documentList}
          projectVerify={this.props.projectVerify}
          projectList={this.props.projectList}
          messagesList={this.props.messagesList}
          userId={this.props.userId}
          type={'demo'}
        />
      </div>
    );
  }
}

export default ProjectDemo;