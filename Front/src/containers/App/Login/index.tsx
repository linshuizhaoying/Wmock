import * as React from 'react';
import md5 from 'md5';
import Validator from '../../../util/validator';
import { connect } from 'react-redux';
import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Link } from 'react-router-dom';
import { userLogin } from '../../../actions';
import './index.less';
import { ChangeEvent } from 'react';
const FormItem = Form.Item
interface LoginProps extends FormComponentProps {
  dispatch: Function
}
class Login extends React.Component<LoginProps, LoginState> {

  constructor(props: LoginProps) {
    super(props)
    this.state = {
      userName: '',
      passWord: '',
      currentForm: 'login',
    }
  }

  checkUserName = (rule: Array<string>, value: string, callback: Function) => {
    if (!Validator.userCheck(value)) {
      callback('用户名长度为4-12位,只允许字母数字组合');
    } else {
      callback();
    }
  }

  checkPassWord = (rule: Array<string>, value: string, callback: Function) => {
    if (!Validator.passCheck(value)) {
      callback('密码必须6位或以上,必须有字母和数字混合');
    } else {
      callback();
    }
  }

  handleChange(e: ChangeEvent<HTMLInputElement>, value: string) {
    this.setState({
      [value]: e.target.value
    })
  }

  handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFields((err: Error, values: LoginFormValue) => {
      let { userName, passWord } = values;
      if (!err && userName.length > 0 && passWord.length > 0) {

        const user = {
          userName: userName,
          passWord: md5(passWord)
        }
        dispatch(userLogin(user))
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
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: '请输入你的账户' }, {
                    validator: this.checkUserName,
                  }],
                })(
                  <Input type="text" id="userName" className="fadeIn second" name="userName" placeholder="用户" />
                  )}
              </FormItem>

              <FormItem>
                {getFieldDecorator('passWord', {
                  rules: [{ required: true, message: '请输入密码!' }, {
                    validator: this.checkPassWord,
                  }],
                })(
                  <Input type="password" id="passWord" className="fadeIn third" name="passWord" placeholder="密码" />
                  )}
              </FormItem>
              <input type="submit" className="fadeIn fourth" value="登录" />
            </Form>
            <div id="formFooter">
              <Link to="/reg" >
                <div className="underlineHover">还未注册?</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state: LoginState) => ({
  isLogin: state.user.isLogin,
  userName: state.user.userName
})

const NormalLogin = Form.create()(Login)
export default connect(mapStateToProps)(NormalLogin)