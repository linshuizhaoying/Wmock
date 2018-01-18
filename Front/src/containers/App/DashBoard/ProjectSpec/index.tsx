import * as React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Card from 'antd/lib/card';
import DocumentMode from '../../../../components/DocumentMode'
import differenceWith from 'lodash/differenceWith'
import isEqual from 'lodash/isEqual'
import './index.less';
export class ProjectSpec extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = {
      documentModeVisible: false,
      allDocuments:[],
      isLoaded:false // 是否加载过
    };
  }
  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps: any) {
    // 每次只更新变动的文档
    if(nextProps.documentList.length > 0 &&  differenceWith( nextProps.documentList,this.state.allDocuments, isEqual).length !== 0){
    this.setState({
      allDocuments: nextProps.documentList,
      isLoaded: true
    },()=>{
      console.log(this.state.allDocuments)
    })
    }
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
          <Col span={16} className="textleft">文档总数为 <span className="red">{this.state.allDocuments.length}</span> 个</Col>
          <Col span={8}><Button type="primary" onClick={()=>this.showDocumentMode()}>添加文档</Button></Col>
        </Row>

         {this.state.isLoaded  &&  this.state.allDocuments.length > 0 ? 
         
          <div className="documentList">
             <Row className="documentItem" >
              {  this.state.allDocuments.map((item: any) =>{
                    return(
                    
                        <Col span={6} key={item._id}>
                          <Card
                            hoverable  actions={[<div>编辑<Icon type="edit" /></div>,<div>删除<Icon type="close" /></div> ]}
                            >
                            <ul className="documentDesc">
                              <li>名称:{item.name}</li>
                              <li>类别:{item.type}</li>
                              <li>创建者: {item.ownerName}</li>
                            </ul>
                          </Card>
                        </Col>
                
                    )
                  })
              }
            </Row>
            
      
          </div>
         :<div></div>
         
        }
  
        {
          this.state.isLoaded &&  this.state.allDocuments.length === 0?
          <div className="emptyDocument">
            <h2><Icon type="frown-o" /></h2>
            <h2>文档库还没有任何文档</h2>
            <h2>请点击右上角按钮添加文档</h2>
          </div> :
          <div></div>
        }

         <DocumentMode hideDocumentMode={this.hideDocumentMode} visible={this.state.documentModeVisible}/>
         
      </div>
    )
  }
}




export default ProjectSpec;
