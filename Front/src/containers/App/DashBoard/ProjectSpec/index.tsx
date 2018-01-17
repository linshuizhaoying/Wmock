import * as React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Card from 'antd/lib/card';
import DocumentMode from '../../../../components/DocumentMode'
import './index.less';
export class ProjectSpec extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = {
      documentModeVisible: false
    };
  }
  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps: any) {
  }

  showDocumentMode = () =>{
    this.setState({
      documentModeVisible:true
    })
  }
  hideDocumentMode = () =>{
    this.setState({
      documentModeVisible:false
    })
  }

  render () {
    return(
      <div id="ProjectSpec">
        <Row className="documentHeader">
          <Col span={16} className="textleft">文档总数为 <span className="red">12</span> 个</Col>
          <Col span={8}><Button type="primary" onClick={()=>this.showDocumentMode()}>添加文档</Button></Col>
        </Row>

         <div className="emptyDocument">
            <h2><Icon type="frown-o" /></h2>
            <h2>文档库还没有任何文档</h2>
            <h2>请点击右上角按钮添加文档</h2>
         </div>

         <div className="documentList">
          <Row className="documentItem">
            <Col span={6}>
              <Card
                hoverable  actions={[<div>编辑<Icon type="edit" /></div>,<div>删除<Icon type="close" /></div> ]}
                >
                <ul className="documentDesc">
                  <li>名称:前端编码规范</li>
                  <li>类别:规范</li>
                  <li>创建者: xxx</li>
                </ul>
              </Card>
            </Col>

            <Col span={6}></Col>
            <Col span={6}></Col>
            <Col span={6}></Col>
          </Row>
         </div>
         <DocumentMode hideDocumentMode={this.hideDocumentMode} visible={this.state.documentModeVisible}/>
         
      </div>
    )
  }
}




export default ProjectSpec;
