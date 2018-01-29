import * as React from 'react';
import './index.less';
import Table from 'antd/lib/table'
import { ColumnProps } from "antd/lib/table/";
import Button from 'antd/lib/button';
import Popover from 'antd/lib/popover';
import Popconfirm from 'antd/lib/popconfirm';
import { MockUrl } from '../../service/api'

class MyTable extends Table<any>{}


export class InterfaceList extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = {

    };
  }
  

  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps: any) {
    console.log(nextProps)
  }

  preview  = (item:any) => {
    console.log(this.props)
    console.log(item)
    window.open(MockUrl + "/" +  this.props.projectId + item.url + '#!method=' + item.method)
  }
  
  deleteInterface = (id:string) =>{
    console.log(id)
  }
  render () {

    const columns:ColumnProps<any>[] = [
      {
      title: '接口名称',
      dataIndex: 'interfaceName',
      key: 'interfaceName',
      width: '20%',
      render : (interfaceName: any)=> (
        <div className="interfaceName">{interfaceName}</div>
      ),
      defaultSortOrder: 'descend',
      sorter: (a: any, b: any) => a.interfaceName.length - b.interfaceName.length,
      },  
      {
      title: 'Method',
      dataIndex: 'method',
      key:'method',
      width: '20%',
      render : (method: any)=> (
        <div className='interfaceMethod'>
          <span className={method}>{method.toUpperCase()}</span>
        </div>
      ),
      filters: [{
        text: 'get',
        value: 'get',
      }, {
        text: 'put',
        value: 'put',
      }, {
        text: 'patch',
        value: 'patch',
      }, {
        text: 'post',
        value: 'post',
      }, {
        text: 'delete',
        value: 'delete',
      }
      ],
      onFilter: (value: any, record: any) => record.method.indexOf(value) === 0,
      sorter: (a: any, b: any) => a.method.length - b.method.length,
    }, {
      title: '请求URL',
      dataIndex: 'url',
      key: 'url',
      width: '20%',
      defaultSortOrder: 'descend',
      sorter: (a: any, b: any) => a.url.length - b.url.length,
      render : (url: any, item: any)=> (
        <div className="interfaceUrl">
          <Popover content={<div>复制接口地址</div>}>
              <span onClick={()=>this.props.copyToClipBoard( '/' + item._id + url)}>{url}</span>
          </Popover>   
        </div>
      )
    },{
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
      width: '20%',
      render : (desc: any)=> (
        <div className="interfaceDesc">{desc}</div>
      )
    },{
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      width: '20%',
      render: (value:any, item:any) => (
        <span className="interface-operation">
          <Popover content={<div>预览接口</div>}>
              <Button shape="circle" icon="eye" onClick={()=>this.preview(item)}/>
          </Popover>   
          <Popover content={<div>编辑接口</div>}>
              <Button shape="circle" icon="edit" onClick={()=> {this.props.selectCurrentInterface(item);this.props.showInterfaceMode();}}/>
          </Popover>   
          <Popconfirm title="确定删除该接口么?" onConfirm={()=>{this.deleteInterface(item._id)}} okText="确定删除" cancelText="取消">
            <Popover content={<div>删除接口</div>}>
                <Button shape="circle" icon="close" />
            </Popover>  
          </Popconfirm>
                            
        </span>
      ),
    }
    ];

    return(
      <div id="interfaceList">
         <MyTable columns={columns} dataSource={this.props.data} rowKey={record => record._id} pagination={false} scroll={{y:300}} size='middle'
          expandedRowRender={ (record: any) => 
              <div className="descMore">
                <h4>Method</h4>
                <span>{record.method}</span>
                <h4>URL</h4>
                <span>{record.url}</span>
                <h4>描述</h4>
                <span>{record.desc}</span>
              </div>
          }
         >
         </MyTable>
      </div>


  
    
    )
  }
}




export default InterfaceList;
