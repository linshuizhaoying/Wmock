import * as React from 'react';
import {
  Form,
  Input
  } from 'antd';
import './index.less';
import  Validator  from '../../../util/validator';
import { connect } from 'react-redux';
import { userLogin } from '../../../actions';
import { Link } from 'react-router-dom';
const FormItem = Form.Item
class Login extends React.Component<any, any> {

  constructor (props: any) {
    super(props)
    this.state = {
      username: '',
      password: '',
      currentForm: 'login',
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
      let {username, password} = values;
      if (!err && username.length > 0 && password.length > 0) {
       
          const user = {
            username: username,
            password: password
          }
          dispatch(userLogin(user))
          console.log(user)
        
      }
      
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div id="NormalLogin" >
         <div className="wrapper fadeInDown">
          <div id="formContent">
            <h2 className="active"> 登录 </h2>
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
                <input type="submit" className="fadeIn fourth" value="登录"/>
            </Form>
            <div id="formFooter">
              <Link to='/reg' >
                <div className="underlineHover">还未注册?</div>
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

const NormalLogin = Form.create()(Login)
export default connect(mapStateToProps)(NormalLogin)