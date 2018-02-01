import * as React from 'react';
import './index.less';
import  Card  from 'antd/lib/card';
import  Col  from 'antd/lib/col';
// import  Row  from 'antd/lib/row';
import Timeline from 'antd/lib/timeline';
import Icon from 'antd/lib/icon';
import TimeAgo from 'timeago-react'
import Avatar from 'antd/lib/avatar';
import { Link } from 'react-router-dom';
import { isEqual } from '../../../../util/helper'
// import timeago from '../../../../util/timeago'
const { Meta } = Card;


export class Overview extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = {
      importProject: false,
      exportProject: false,
      messagesListData: []
    };
  }
  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps: any) {
    if(nextProps.messagesList.length >= 0 && !isEqual(nextProps.messagesList,this.state.messagesListData)){
      // let temp = [];
      // const len = nextProps.messagesList.length > 6 ? 6 :nextProps.messagesList.length
      // for(let i = 0; i < len; i++){
      //   temp.push(nextProps.messagesList[i]);
      // }
      // console.log(temp)
      this.setState({
        messagesListData: nextProps.messagesList,
      },()=>{
        console.log(this.state.messagesListData)
      })
    }
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

              {/* <Link to='/wmock/template' >
                <li>
                  <Col span={8}>
                    <Card hoverable>
                      <Meta title="3 个模板" avatar={<Icon type="file-add" />} description="模板总数"/>
                    </Card>
                  </Col>
                </li>
              </Link> */}

              <Link to='/wmock/teamManage' >
                <li>
                  <Col span={8}>
                    <Card hoverable>
                      <Meta title="4 个团队" avatar={<Icon type="team" />} description="加入的团队总数"/>
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

             <Link to='/wmock/mockModel' >
                <li>
                  <Col span={8}>
                    <Card hoverable>
                      <Meta title="9 个模型" avatar={<Icon type="paper-clip" />} description="Mock模型总数"/>
                    </Card>
                  </Col>
                </li>
             </Link>


              {/* <Link to='/wmock/projectSpec' >
                <li>
                  <Col span={8}>
                    <Card hoverable>
                      <Meta title="6 个规范" avatar={<Icon type="credit-card" />} description="项目规范总数"/>
                    </Card>
                  </Col>
                </li>
              </Link> */}
          </ul>
         </div> 
         {/* <div className="advance">
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
         </div> */}
   
        </div>
        <div className="content-right"> 
         <h4>动态</h4> 
         

 

         
         <Timeline pending={ 
                      <Link to='/wmock/messages' >
                        查看更多
                      </Link>}>
            {
             this.state.messagesListData.length > 0 ? this.state.messagesListData.map((item: any, index: any) =>{
               if(index < 6){
                return <Timeline.Item dot={<Avatar src={item.avatar} />} color="red" key={index} >
                  <div className="timeline">
                    <p className="date"><TimeAgo
                            datetime={item.time} 
                            locale='zh_CN' /></p>
              
                    <div>
                      <div className="user">用户: {item.operator}</div>
                      <div className="content">{item.desc}</div> 
                    </div>
                  
                  </div>
                </Timeline.Item>
               }else{
                 return 
               }
              })
            :null
          }
       
        </Timeline>
        </div>

      
      </div>
    )
  }
}




export default Overview;
