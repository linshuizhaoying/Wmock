// 默认规则
const RULES = {
  numeric: /^[0-9]*$/,
  letters: /^[a-z]+$/i,
  date: /^\d{4}-\d{2}-\d{2}$/,
  email: /^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$/i,
  url: /^(https?|s?ftp):\/\/\S+$/i,
  qq: /^[1-9]\d{4,}$/,
  IDcard: /^\d{6}(19|2\d)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)?$/,
  phone: /^(1[0-9]{2})[0-9]{8}$/,
  zipcode: /^\d{6}$/,
  username: /^\w{4,12}$/,
  password: /^\w{6,32}$/,
  required: function(value: string) { return value !== undefined && value.length !== 0 }
}
export class Validator {
  userCheck = (value: string) => {
    if (!RULES.required(value)) {
      return false
    }else {
      console.log('userCheck:' + new RegExp(RULES.username).test(value))
      return  new RegExp(RULES.username).test(value)
    }
  }

  passCheck = (value: string) => {
    console.log('passCheck:' + new RegExp(RULES.password).test(value))
    return new RegExp(RULES.password).test(value)
  }

  emailCheck = (value: string) => {
    console.log('emailCheck:' + new RegExp(RULES.email).test(value))
    return new RegExp(RULES.email).test(value)
  }
}

const instance = new Validator()
export default instance