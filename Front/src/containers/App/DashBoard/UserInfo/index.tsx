import * as React from 'react';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import './index.less';
import Upload from 'antd/lib/upload';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import { upload, imgBaseUrl } from '../../../../service/api/index'
import Validator from '../../../../util/validator';
import md5 from 'md5'
import Radio from 'antd/lib/radio';
import { updateUser } from '../../../../actions/index';
import { connect } from 'react-redux';
const RadioGroup = Radio.Group;

// import FileUpload from 'react-fileupload'

class EditableCell extends React.Component<any, any> {
  state = {
    value: this.props.value,
    editable: false,
  }
  componentWillReceiveProps(nextProps: any) {
    this.setState({
      value: nextProps.value
    })
  }

  handleChange = (e: any) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({ editable: true });
  }

  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}


export class UserInfo extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      loading: false,
      imgUrl: '',
      oldPass: '',
      newPass: '',
      role: ''
    };

  }
  componentDidMount() {
    this.setState({
      imgUrl: imgBaseUrl + this.props.userData.avatar,
      role: this.props.userData.role
    })
  }


  componentWillReceiveProps(nextProps: any) {
    if (imgBaseUrl + nextProps.userData.avatar !== this.state.imgUrl || this.state.role !== nextProps.userData.role) {
      this.setState({
        imgUrl: imgBaseUrl + nextProps.userData.avatar,
        role: nextProps.userData.role
      }, () => {
        console.log('get ok')
      })
    }
  }

  changeUserName = () => {
    return (value: any) => {
      const { dispatch } = this.props;
      dispatch(updateUser(
        {
          username: value
        }
      ))
    };
  }
  changeUserEmail = () => {
    return (value: any) => {
      if (!Validator.emailCheck(value)) {
        message.error('请输入符合规范的邮箱地址');
      } else {
        const { dispatch } = this.props;
        dispatch(updateUser(
          {
            email: value
          }
        ))
      }

    };
  }



  getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  beforeUpload = (file: any) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('只允许上传jpg格式头像!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图像大小不能超过2MB!');
    }
    return isJPG && isLt2M;
  }
  handleChange = (info: any) => {
    console.log(info)

    this.setState({ loading: true });

    if (info.file.status === 'done') {
      console.log('done')
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, () => this.setState({
        imgUrl: imgBaseUrl + info.file.response.image,
        loading: false,
      }));
      const { dispatch } = this.props;
      dispatch(updateUser(
        {
          avatar: info.file.response.image
        }
      ))
      // this.props.getUserInfo()
    }
  }

  changeOldPass = (e: any) => {
    console.log(e.target.value)
    this.setState({
      oldPass: e.target.value
    })
  }

  changeNewPass = (e: any) => {
    console.log(e.target.value)
    this.setState({
      newPass: e.target.value
    })
  }
  submitPass = () => {

    if (this.state.oldPass === '') {
      message.error('请填写旧密码');
    }
    if (this.state.newPass === '') {
      message.error('请填写新密码');
    }
    if (this.state.oldPass.length >=6 && this.state.newPass.length >=6) {
      console.log(this.props.userData.userid)
      console.log(md5(this.state.oldPass))
      console.log(md5(this.state.newPass))
      const { dispatch } = this.props;
      dispatch(updateUser(
        {
          oldPass: this.state.oldPass,
          newPass: this.state.newPass
        }
      ))
    }else{
      message.error('密码长度不能小于6位!');
    }

  }
  changeRole = (e: any) => {
    console.log('角色切换', e.target.value);
    this.setState({
      role: e.target.value
    })
    const { dispatch } = this.props;
    dispatch(updateUser(
      {
        role: e.target.value
      }
    ))
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div id="UserInfo">
        <ul>
          <li className="avatarUpload">
            <h3>个人头像</h3>
            <div className="clearfix">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={upload}
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
              >
                {this.state.imgUrl ? <img src={this.state.imgUrl} alt="" /> : uploadButton}
              </Upload>
            </div>
          </li>
          <li>
            <h3>用户名</h3>
            <EditableCell
              value={this.props.userData.username}
              onChange={this.changeUserName()}
            />
          </li>
          <li>
            <h3>
              邮箱
              </h3>
            <EditableCell
              value={this.props.userData.email}
              onChange={this.changeUserEmail()}
            />
          </li>
          <li>
            <h3>
              角色
              </h3>
            <RadioGroup onChange={this.changeRole} value={this.state.role}>
              <Radio value={'front'}>前端工程师</Radio>
              <Radio value={'back'}>后端工程师</Radio>
            </RadioGroup>
          </li>
          <li>
            <h3>
              修改密码
              </h3>
            <div className="editPassword">
              <div className="oldPass">
              <span>原密码:</span>
                <div>
                  <Input type="password" value={this.state.oldPass} onChange={this.changeOldPass} />
                </div>
              </div>
             <div className="newPass">
              <span>新密码:</span>
                <div>
                  <Input type="password" value={this.state.newPass} onChange={this.changeNewPass} />
                </div>
             </div>
            <div className="commitChange">
              <div>
                <Button type="primary" onClick={this.submitPass}>更改</Button>
              </div>
            </div>


            </div>

          </li>
        </ul>
      </div>
    )
  }
}



export default connect()(UserInfo);
