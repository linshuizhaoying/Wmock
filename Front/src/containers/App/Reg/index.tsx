import * as React from 'react';
import {
  Form,
  Input,
  Radio
  } from 'antd';
import './index.less';
import  Validator  from '../../../util/validator';
import { connect } from 'react-redux';
import  notification  from 'antd/lib/notification';
import { Link } from 'react-router-dom';
import { userReg } from '../../../actions';
const FormItem = Form.Item
const RadioGroup = Radio.Group;
class Reg extends React.Component<any, any> {

  constructor (props: any) {
    super(props)
    this.state = {
      username: '',
      password: '',
      currentForm: 'login',
      currentRole:''
    }
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps: any) {
  }

  checkUsername = (rule: any, value: any, callback: any) =>{
    if(!Validator.userCheck(value)){
      callback('用户名长度为4-12位,只允许字母数字组合');
    }else{
      callback();
    }
  }

  checkPassword = (rule: any, value: any, callback: any) =>{
    if(!Validator.passCheck(value)){
      callback('密码必须6位或以上,必须有字母和数字混合');
    }else{
      callback();
    }
  }
  checkEmail = (rule: any, value: any, callback: any) =>{
    if(!Validator.emailCheck(value)){
      callback('请输入符合规范的邮箱地址');
    }else{
      callback();
    }
  }
  

  handleChange(e: any, value: any) {
    this.setState({
      [value]: e.target.value
    }, () => {
      // console.log(this.state)
    })
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFields((err: any, values: any) => {
      let {username, password, email} = values;
      if (!err && username.length > 0 && password.length > 0) {
        if(this.state.currentRole){
          const user = {
            username: username,
            password: password,
            role: this.state.currentRole,
            email: email
          }
          dispatch(userReg(user))
          console.log(user)
        }else{
          // notification.notificationError('请选择角色', '请选择角色' , 2)
          notification.error({
            message:'请选择角色!',
            description:'请选择角色',
            duration: 3
          })
        }
      }
      
    });
  }
  selectRole = (e: any) =>{
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
      currentRole:e.target.value
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div id="NormalReg" >
         <div className="wrapper fadeInDown">
          <div id="formContent">
            <h2 className="active"> 注册 </h2>
            <div className="fadeIn first">
              <img src={require('./icon.svg')} id="icon" alt="User Icon" />
            </div>
            <Form onSubmit={this.handleSubmit} className="signup">
                <FormItem>
                  {getFieldDecorator('username', {
                    rules: [{ required: true, message: '请输入你的账户' }, {
                      validator: this.checkUsername,
                    }],
                  })(
                    <Input type="text" id="username" className="fadeIn second" name="username" placeholder="用户"/>
                  )}
                </FormItem>

                 <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码!' }, {
                      validator: this.checkPassword,
                    }],
                  })(
                   <Input type="password" id="password" className="fadeIn third" name="password" placeholder="密码"/>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('email', {
                    rules: [{ required: true, message: '请输入邮箱!' }, {
                      validator: this.checkEmail,
                    }],
                  })(
                   <Input type="email" id="email" className="fadeIn third" name="email" placeholder="邮箱"/>
                  )}
                </FormItem>
                <RadioGroup onChange={this.selectRole} value={this.state.value}>
                  <Radio value={'front'}>前端开发</Radio>
                  <Radio value={'back'}>后台开发</Radio>
                </RadioGroup>
                <input type="submit" className="fadeIn fourth" value="注册"/>
            </Form>
            <div id="formFooter">
              <Link to='/login' >
                <div className="underlineHover">已有账号,去登录?</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ) 
  }
}
const mapStateToProps = (state: any) => ({
  isLogin: state.user.isLogin,
  username : state.user.username
})

const NormalReg = Form.create()(Reg)
export default connect(mapStateToProps)(NormalReg)