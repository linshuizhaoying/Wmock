import './index.less';

import * as React from 'react';

import ProjectBase from '../ProjectBase/index';
class ProjectDemo extends React.Component<ProjectPropsWithAdvance, {}> {

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
          userRole={this.props.userRole}
          type={'demo'}
          documentRefresh={this.props.documentRefresh}
          baseModelList={this.props.baseModelList}
          customModelList={this.props.customModelList}
          documentMessages={this.props.documentMessages}
          getDocumentMessages={this.props.getDocumentMessages}
        />
      </div>
    );
  }
}

export default ProjectDemo;