import * as React from 'react';
import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import Col from 'antd/lib/col';
import Divider from 'antd/lib/divider';
import Icon from 'antd/lib/icon';
import Modal from 'antd/lib/modal';
import ModelMode from './components/ModelMode';
import Popconfirm from 'antd/lib/popconfirm';
import Row from 'antd/lib/row';
import { addModel, removeModel, updateModel } from '../../../../actions';
import { connect } from 'react-redux';
import { isEqual } from '../../../../util/helper';
import './index.less';

export class MockModel extends React.Component<AppProps, MockModelState> {
  constructor(props: AppProps) {
    super(props)
    this.state = {
      modelModeVisible: false,
      currentModelData: undefined,
      baseModelList: [],
      customModelList: [],
      modelDocumentVisble: false,
      isLoaded: false // 是否加载过
    };
  }

  componentWillReceiveProps(nextProps: AppProps) {
    // 每次只更新变动的模型
    if (nextProps.baseModelList.length >= 0 && !isEqual(nextProps.baseModelList, this.state.baseModelList)) {
      this.setState({
        baseModelList: nextProps.baseModelList,
        isLoaded: true
      })
    }

    // 每次只更新变动的模型
    if (nextProps.customModelList.length >= 0 && !isEqual(nextProps.customModelList, this.state.customModelList)) {
      this.setState({
        customModelList: nextProps.customModelList,
        isLoaded: true
      })
    }

  }

  addModel = () => {
    this.setState({
      currentModelData: undefined
    }, () => {
      this.setState({
        modelModeVisible: true
      })
    })
  }

  add = (data: Model) => {
    const { dispatch } = this.props;
    dispatch(addModel(data))
    setTimeout(() => {
      this.props.refresh()
    }, 500)
  }

  update = (data: Model) => {
    const { dispatch } = this.props;
    dispatch(updateModel(data))
    setTimeout(() => {
      this.props.refresh()
    }, 500)
  }
  showModelMode = () => {
    this.setState({
      modelModeVisible: true
    })
  }
  hideModelMode = () => {
    this.setState({
      modelModeVisible: false
    })
  }

  selectCurrentModel = (data: Model) => {
    this.setState({
      currentModelData: data
    })
  }

  remove = (id: string) => {
    const { dispatch } = this.props;
    dispatch(removeModel({ id }))
    setTimeout(() => {
      this.props.refresh()
    }, 500)
  }

  showModelDocument = () => {
    this.setState({
      modelDocumentVisble: true,
    });
  }

  hideModelDocument = () => {
    this.setState({
      modelDocumentVisble: false,
    });
  }
  renderModelTitle = (item: Model) => {
    return (
      <div key={1} onClick={() => { this.selectCurrentModel(item); this.showModelMode(); }}>
        编辑<Icon type="edit" />
      </div>
    )
  }
  render() {
    return (
      <div id="MockModel">
        <Row className="modelHeader">
          <Col span={16} className="textleft">
            Mock自定义模型总数为
          <span className="red">{this.state.customModelList.length}</span>
            个
           </Col>
          <Col span={8}>
            <Button type="primary" onClick={() => this.addModel()}>添加模型</Button>
            <Button onClick={() => this.showModelDocument()}>
              Mock模型说明<Icon type="question-circle" />
            </Button>
          </Col>
        </Row>

        <Divider />
        <Row>
          {this.state.customModelList.map((item: ModelWithFull) => {
            return (
              <Col span={6} key={item._id}>
                <Card
                  hoverable={true}
                  actions={[this.renderModelTitle(item),
                  <div key={2}>
                    <Popconfirm
                      title="确定删除该文档么?"
                      onConfirm={() => { this.remove(item._id) }}
                      okText="确定删除"
                      cancelText="取消"
                    >
                      删除<Icon type="close" />
                    </Popconfirm>
                  </div>]}
                >
                  <ul className="modelContent">
                    <li> <div className="pre">名称:</div><div className="modelDataName">{item.modelDataName}</div></li>
                    <li> <div className="pre">描述:</div><div className="modelDesc">{item.modelDesc}</div></li>
                  </ul>
                </Card>
              </Col>

            )
          })
          }
        </Row>
        <ModelMode
          update={this.update}
          add={this.add}
          customModelList={this.state.customModelList}
          baseModelList={this.state.baseModelList}
          refresh={this.props.refresh}
          hideModelMode={this.hideModelMode}
          visible={this.state.modelModeVisible}
          data={this.state.currentModelData}
          userId={this.props.userId}
          userName={this.props.userName}
        />
        <Modal
          visible={this.state.modelDocumentVisble}
          title="Mock模型说明"
          onOk={this.showModelDocument}
          onCancel={this.hideModelDocument}
          footer={null}
        >
          <Divider>具体说明</Divider>
          <h3>
            常见的Mock都提供基本数据类型,而项目中想要更快速的开发需要更复杂的高级类型组合。Mock模型功能让用户自由组合配置数据，将其封装成一个模块在项目接口构建时快速调用。
          </h3>
          <Divider><a target="_blank" href="http://mockjs.com/examples.html">示例语法</a></Divider>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Type</th>
                <th>Syntax</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>String</td>
                <td>
                  <p><code>'name|min-max': 'value'</code></p>
                  <p><code>'name|count': 'value'</code></p>
                </td>
              </tr>
              <tr>
                <td>Number</td>
                <td>
                  <p><code>'name|+1': 100</code></p>
                  <p><code>'name|1-100': 100</code></p>
                  <p><code>'name|1-100.1-10</code></p>
                </td>
              </tr>
              <tr>
                <td>Boolean</td>
                <td>
                  <p><code>'name|1': value</code></p>
                  <p><code>'name|min-max': value</code></p>
                </td>
              </tr>
              <tr>
                <td>Object</td>
                <td>
                  <p><code>'name|min-max': {}</code></p>
                  <p><code>'name|count': {}</code></p>
                </td>
              </tr>
              <tr>
                <td>Array</td>
                <td>
                  <p><code>'name|1': [{}, {} ...]</code></p>
                  <p><code>'name|min-max': [{}, {} ...]</code></p>
                  <p><code>'name|count': [{}, {} ...]</code></p>
                </td>
              </tr>
              <tr>
                <td>Function</td>
                <td>
                  <p><code>'name': function(){}</code></p>
                </td>
              </tr>
            </tbody>
          </table>
        </Modal>
      </div>
    )
  }
}

export default connect()(MockModel);
