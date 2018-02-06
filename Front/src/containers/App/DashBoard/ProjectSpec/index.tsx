import * as React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Card from 'antd/lib/card';
import DocumentMode from './components/DocumentMode'
import { isEqual } from '../../../../util/helper'
// import differenceWith from 'lodash/differenceWith'
// import isEqual from 'lodash/isEqual'
import Popconfirm from 'antd/lib/popconfirm';
import { removeDocument, updateDocument, addDocument } from '../../../../actions/document'
// import Message from 'antd/lib/message';
import { connect } from 'react-redux';
import './index.less';
export class ProjectSpec extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      documentModeVisible: false,
      allDocuments: [],
      currentInterfaceData: '',
      isLoaded: false // 是否加载过
    };
  }
  componentDidMount() {

  }

  componentWillReceiveProps(nextProps: any) {
    // 每次只更新变动的文档 
    console.log(nextProps)
    console.log('项目文档')
    // console.log(nextProps.documentList.length)
    // console.log(nextProps.documentList)
    // console.log(this.state.allDocuments)
    // console.log(isEqual(nextProps.documentList,this.state.allDocuments))
    if (nextProps.documentList.length >= 0 && !isEqual(nextProps.documentList, this.state.allDocuments)) {
      this.setState({
        allDocuments: nextProps.documentList,
        isLoaded: true
      }, () => {
        console.log('update ok')
      })
    }
  }

  addDocumentMode = () => {
    this.setState({
      currentInterfaceData: ''
    }, () => {
      this.setState({
        documentModeVisible: true
      })
    })


  }
  showDocumentMode = () => {
    this.setState({
      documentModeVisible: true
    })
  }
  hideDocumentMode = () => {
    this.setState({
      documentModeVisible: false
    })
  }

  selectCurrentDocument = (data: any) => {
    console.log(data)
    this.setState({
      currentInterfaceData: data
    })
  }

  removeDocument = (id: string) => {
    const { dispatch } = this.props;
    dispatch(removeDocument({ id }))
  }

  updateDocument = (data: any) => {
    console.log(data)
    const { dispatch } = this.props;
    dispatch(updateDocument(data))
  }

  addDocument = (data: any) => {
    console.log(data)
    const { dispatch } = this.props;
    dispatch(addDocument(data))
  }

  render() {
    return (
      <div id="ProjectSpec">
        <Row className="documentHeader">
          <Col span={16} className="textleft">文档总数为 <span className="red">{this.state.allDocuments.length}</span> 个</Col>
          <Col span={8}><Button type="primary" onClick={() => this.addDocumentMode()}>添加文档</Button>
            {/* <Button>回收站</Button> */}
          </Col>
        </Row>

        {this.state.isLoaded && this.state.allDocuments.length >= 0 ?

          <div className="documentList">
            <Row className="documentItem" >
              {this.state.allDocuments.map((item: any) => {
                return (

                  <Col span={6} key={item._id}>
                    {
                      item._id !== this.props.userid ?
                        <Card
                          hoverable actions={[<div onClick={() => { this.selectCurrentDocument(item); this.showDocumentMode(); }}>编辑<Icon type="edit" /></div>]}
                        >
                          <ul className="documentDesc">
                            <li>名称:{item.name}</li>
                            <li>类别:{item.type === 'spec' ? '规范' : ''} {item.type === 'project' ? '项目文档' : ''} {item.type === 'other' ? '其它' : ''}</li>
                            <li>创建者: {item.ownerName}</li>
                          </ul>
                        </Card>
                        :

                        <Card
                          hoverable actions={[<div onClick={() => { this.selectCurrentDocument(item); this.showDocumentMode(); }}>编辑<Icon type="edit" /></div>,
                          <div>
                            <Popconfirm title="确定删除该文档么?" onConfirm={() => { this.removeDocument(item._id) }} okText="确定删除" cancelText="取消">
                              删除<Icon type="close" />
                            </Popconfirm>
                          </div>]}
                        >
                          <ul className="documentDesc">
                            <li>名称:{item.name}</li>
                            <li>类别:{item.type}</li>
                            <li>创建者: {item.ownerName}</li>
                          </ul>
                        </Card>
                    }

                  </Col>

                )
              })
              }
            </Row>


          </div>
          : <div></div>

        }

        {
          this.state.isLoaded && this.state.allDocuments.length === 0 ?
            <div className="emptyDocument">
              <h2><Icon type="frown-o" /></h2>
              <h2>文档库还没有任何文档</h2>
              <h2>请点击右上角按钮添加文档</h2>
            </div> :
            <div></div>
        }

        <DocumentMode refresh={this.props.refresh} addDocument={this.addDocument} updateDocument={this.updateDocument} projectList={this.props.projectList} hideDocumentMode={this.hideDocumentMode} visible={this.state.documentModeVisible} data={this.state.currentInterfaceData} />

      </div>
    )
  }
}




export default connect()(ProjectSpec);