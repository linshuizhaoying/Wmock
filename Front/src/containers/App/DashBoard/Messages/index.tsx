import { setTimeout } from 'timers';
import * as React from 'react';
import Table from 'antd/lib/table';
import './index.less';
const columns = [{
  title: '操作者',
  key:'operator_name',
  dataIndex: 'operator_name',
}, {
  title: '动作',
  key:'action',
  dataIndex: 'action',
}, {
  title: '操作对象',
  dataIndex: 'object_name',
  key:'object_name',
}, {
  title: '描述',
  dataIndex: 'desc',
  key:'desc',
},{
  title: '发布时间',
  dataIndex: 'time',
  key:'time',
  render: (time: any) => `${time}`,
}];

export class Message extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = {
      oldData:[],
      data: [],
      loading: false,
    };
  }
  componentDidMount() {

  }

  componentWillReceiveProps(nextProps: any) {
    if(nextProps.data.length > 0 && nextProps.data != this.state.oldData){
      let arr: any[] = []
      nextProps.data.map((item: any, index: any) =>{
          item.key = index
          arr.push(item)
     })
      this.setState({
        data:arr,
        oldData:nextProps.data
      },()=>{
       // console.log(this.state.data)
      })
    }
  }

  handleTableChange = () => {
    this.fetch();
  }

  fetch = () => {
    this.setState({ loading: !this.state.loading });
    setTimeout(()=>{
      this.setState({ loading: !this.state.loading });
    },250)
  }

  render () {
    return(
      <div id="Message">
      <Table columns={columns}
              dataSource={this.state.data}
              loading={this.state.loading}
              onChange={this.handleTableChange}
            />
      </div>
    )
  }
}



export default Message;
