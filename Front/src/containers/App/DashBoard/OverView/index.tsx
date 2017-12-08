import * as React from 'react';
import './index.less';
import  Card  from 'antd/lib/card';
import  Col  from 'antd/lib/col';
// import  Row  from 'antd/lib/row';
import Timeline from 'antd/lib/timeline';
import Icon from 'antd/lib/icon';
import Modal from 'antd/lib/modal';
import Upload from 'antd/lib/upload';
import Message from 'antd/lib/message';
import Button from 'antd/lib/button';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const uploadProps = {
  name: 'file',
  action: '//haoqiao.me/posts/',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info: any) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      Message.success(`${info.file.name} 文件上传成功!`);
    } else if (info.file.status === 'error') {
      Message.error(`${info.file.name} 文件上传失败.`);
    }
  },
};

export class Overview extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = {
      importProject: false,
      exportProject: false
    };
  }
  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps: any) {
  }

  showimportProject = () => {
    this.setState({
      importProject: true,
    });
  }
  showexportProject = () => {
    this.setState({
      exportProject: true,
    });
  }


  importProjectOk = (e:any) => {
    console.log(e);
    this.setState({
      importProject: false,
    });
  }
  importProjectCancel = (e:any) => {
    console.log(e);
    this.setState({
      importProject: false,
    });
  }

  exportProjectOk = (e:any) => {
    console.log(e);
    this.setState({
      exportProject: false,
    });
  }
  exportProjectCancel = (e:any) => {
    console.log(e);
    this.setState({
      exportProject: false,
    });
  }

  render () {
    return(
      <div id="Overview">
        <div className="content-left">
         <div className="base">
           <h4>基础功能</h4>
           <ul>
             <Link to='/wmock/myProject' >
                <li>
                  <Col span={8}>
                    <Card hoverable>
                      <Meta title="3 个项目" avatar={<Icon type="database" />} description="项目总数"/>
                    </Card>
                  </Col>
                </li>
              </Link>

              <Link to='/wmock/myProject' >
                <li>
                  <Col span={8}>
                  <Card hoverable>
                      <Meta title="0 个接口" avatar={<Icon type="switcher" />} description="接口总数"/>
                    </Card>
                  </Col>
                </li>
              </Link>

              <Link to='/wmock/template' >
                <li>
                  <Col span={8}>
                    <Card hoverable>
                      <Meta title="3 个模板" avatar={<Icon type="file-add" />} description="模板总数"/>
                    </Card>
                  </Col>
                </li>
              </Link>

              <Link to='/wmock/teamManage' >
                <li>
                  <Col span={8}>
                    <Card hoverable>
                      <Meta title="4 个团队" avatar={<Icon type="team" />} description="加入的团队总数"/>
                    </Card>
                  </Col>
                </li>
             </Link>

             <Link to='/wmock/mockModel' >
                <li>
                  <Col span={8}>
                    <Card hoverable>
                      <Meta title="9 个模型" avatar={<Icon type="paper-clip" />} description="Mock模型总数"/>
                    </Card>
                  </Col>
                </li>
             </Link>

             <Link to='/wmock/projectSpec' >
                <li>
                  <Col span={8}>
                    <Card hoverable>
                      <Meta title="6 个文档" avatar={<Icon type="file-text" />} description="项目文档总数"/>
                    </Card>
                  </Col>
                </li>
              </Link>

              <Link to='/wmock/projectSpec' >
                <li>
                  <Col span={8}>
                    <Card hoverable>
                      <Meta title="6 个规范" avatar={<Icon type="credit-card" />} description="项目规范总数"/>
                    </Card>
                  </Col>
                </li>
              </Link>
          </ul>
         </div> 
         <div className="advance">
           <h4>特色功能</h4>
           <ul>
              <li onClick={this.showimportProject}>
                <Col span={8} >
                  <Card title="导入项目" >导入项目数据</Card>
                </Col>
              </li>
              <li onClick={this.showexportProject}>
                <Col span={8}>
                  <Card title="导出项目">导出项目数据</Card>
                </Col>
              </li>
            </ul>
         </div>
   
        </div>
        <div className="content-right"> 
         <h4>动态</h4> 
         <Timeline pending={ 
                      <Link to='/wmock/messages' >
                        查看更多
                      </Link>}>
          <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">
            <div className="timeline">
              <p className="date">2个小时前</p>
              <div>
                <div className="user">用户X</div>
                <div className="content">创建了项目X</div> 
              </div>
             
            </div>
          </Timeline.Item>
          <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">
            <div className="timeline">
              <p className="date">6小时前</p>
              <div>
                <div className="user">用户y</div>
                <div className="content">更新了 项目:企业级项目 接口:getList</div> 
              </div> 
            </div>
          </Timeline.Item>
          <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">
            <div className="timeline">
              <p className="date">10小时前</p>
              <div>
                <div className="user">用户z</div>
                <div className="content">更新了 项目:Web项目 接口:updateList</div> 
              </div> 
            </div>
          </Timeline.Item>
          <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">
            <div className="timeline">
              <p className="date">10小时前</p>
              <div>
                <div className="user">用户z</div>
                <div className="content">更新了 项目:Web项目 接口:updateList</div> 
              </div> 
            </div>
          </Timeline.Item>
          <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">
            <div className="timeline">
              <p className="date">10小时前</p>
              <div>
                <div className="user">用户z</div>
                <div className="content">更新了 项目:Web项目 接口:updateList</div> 
              </div> 
            </div>
          </Timeline.Item>
        </Timeline>
        </div>

        <div>
        <Modal
          title="导入项目"
          visible={this.state.importProject}
          onOk={this.importProjectOk}
          onCancel={this.importProjectCancel}
          okText="确认"
          cancelText="取消"
        >
          <Upload {...uploadProps}>
          <Button>
            <Icon type="upload" /> 点击上传
          </Button>
        </Upload>
        </Modal>

        <Modal
          title="导出项目"
          visible={this.state.exportProject}
          onOk={this.exportProjectOk}
          onCancel={this.exportProjectCancel}
          okText="确认"
          cancelText="取消"
          width="600px"
        >
         <div className="export">
            <h4>导出格式</h4>
            <ul>
              <li>
                <img className="json" src={require('./json.png')}/>
              </li>
              <li>
                <img className="markdown" src={require('./markdown.png')}/>
              </li>
              <li>
                <img className="word" src={require('./word.png')}/>
              </li>
            </ul>
         </div>

        </Modal>
      </div>
      </div>
    )
  }
}




export default Overview;
