import * as React from 'react';
import './index.less';
import ProjectBase from '../ProjectBase/index'
export class MyProject extends React.Component<ProjectPropsWithAdvance, {}> {

  render() {
    return (
      <div id="MyProject">
        <ProjectBase
          getProjectDemo={this.props.getProjectDemo}
          getMyProject={this.props.getMyProject}
          otherList={this.props.otherList}
          documentList={this.props.documentList}
          projectVerify={this.props.projectVerify}
          projectList={this.props.projectList}
          messagesList={this.props.messagesList}
          userId={this.props.userId}
          type={'user'}
          documentRefresh={this.props.documentRefresh}
          baseModelList={this.props.baseModelList}
          customModelList={this.props.customModelList}
        />
      </div>
    )
  }
}
export default MyProject;
