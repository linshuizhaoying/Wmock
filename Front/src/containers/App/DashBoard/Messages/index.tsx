import { setTimeout } from 'timers';
import * as React from 'react';
import Table from 'antd/lib/table';
import './index.less';
const columns = [{
  title: '操作者',
  key: 'operatorName',
  dataIndex: 'operatorName',
}, {
  title: '动作',
  key: 'action',
  dataIndex: 'action',
  render: (action: string) => (
    <div>
      {action === 'add' ? '增加' : ''}
      {action === 'remove' ? '删除' : ''}
      {action === 'update' ? '更新' : ''}
      {action === 'reject' ? '拒绝' : ''}
      {action === 'accept' ? '允许' : ''}
    </div>
  ),
},
// }, {
//   title: '操作对象',
//   dataIndex: 'objectName',
//   key: 'objectName',
// }, 
{
  title: '描述',
  dataIndex: 'desc',
  key: 'desc',
}, {
  title: '发布时间',
  dataIndex: 'time',
  key: 'time',
  render: (time: Date) => `${time}`,
}];

export class Messages extends React.Component<AdvanceAny, MessageState> {
  constructor(props: AdvanceAny) {
    super(props)
    this.state = {
      oldData: [],
      data: [],
      loading: false,
    };
  }
  componentWillReceiveProps(nextProps: AdvanceAny) {
    if (nextProps.data.length > 0 && nextProps.data !== this.state.oldData) {
      let arr: Array<Message> = []
      nextProps.data.map((item: Message, index: number) => {
        item.key = index
        arr.push(item)
      })
      this.setState({
        data: arr,
        oldData: nextProps.data
      })
    }
  }

  handleTableChange = () => {
    this.fetch();
  }

  fetch = () => {
    this.setState({ loading: !this.state.loading });
    setTimeout(() => {
      this.setState({ loading: !this.state.loading });
    }, 250)
  }

  render() {
    return (
      <div id="Message">
        <Table
          columns={columns}
          dataSource={this.state.data}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
      </div>
    )
  }
}

export default Messages;
