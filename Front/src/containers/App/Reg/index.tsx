import * as React from 'react';
import md5 from 'md5';
import notification from 'antd/lib/notification';
import Validator from '../../../util/validator';
import { connect } from 'react-redux';
import { Form, Input, Radio } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Link } from 'react-router-dom';
import { userReg } from '../../../actions';
import './index.less';
import { ChangeEvent } from 'react';

const FormItem = Form.Item
const RadioGroup = Radio.Group;

interface RegProps extends FormComponentProps {
  dispatch: Function
}
class Reg extends React.Component<RegProps, RegState> {

    state = {
      userName: '',
      passWord: '',
      currentForm: 'login',
      currentRole: '',
      value: ''
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
  checkEmail = (rule: Array<string>, value: string, callback: Function) => {
    if (!Validator.emailCheck(value)) {
      callback('请输入符合规范的邮箱地址');
    } else {
      callback();
    }
  }

  handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFields((err: Error, values: RegFormValue) => {
      let { userName, passWord, email } = values;
      if (!err && userName.length > 0 && passWord.length > 0) {
        if (this.state.currentRole) {
          const user = {
            userName: userName.toLowerCase(),
            passWord: md5(passWord),
            role: this.state.currentRole,
            email: email
          }
          dispatch(userReg(user))
        } else {
          notification.error({
            message: '请选择角色!',
            description: '请选择角色',
            duration: 3
          })
        }
      }

    });
  }
  selectRole = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: e.target.value,
      currentRole: e.target.value
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
              <FormItem>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: '请输入邮箱!' }, {
                    validator: this.checkEmail,
                  }],
                })(
                  <Input type="email" id="email" className="fadeIn third" name="email" placeholder="邮箱" />
                  )}
              </FormItem>
              <RadioGroup onChange={this.selectRole} value={this.state.value}>
                <Radio value={'front'}>前端开发</Radio>
                <Radio value={'back'}>后台开发</Radio>
              </RadioGroup>
              <input type="submit" className="fadeIn fourth" value="注册" />
            </Form>
            <div id="formFooter">
              <Link to="/login">
                <div className="underlineHover">已有账号,去登录?</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state: RegState) => ({
  isLogin: state.user.isLogin,
  userName: state.user.userName
})

const NormalReg = Form.create()(Reg)
export default connect(mapStateToProps)(NormalReg)