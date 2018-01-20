
const User = require('../models/user.js');
interface RegUser  {
  username: string,
  password: string,
  role: string,
  email: string
}
interface LoginUser  {
  username: string,
  password: string
}

interface Result {
  status: string,
  userid: string,
  username: string,
  msg: string,
  avatar: string,
  email: string,
  regDate: Date,
  role: string
}

export const AddRegUser = async(user: RegUser) => {
  console.log(user)
  const {username, password, email, role} = user
  const newUser = new User({username, password, email, role})
  let hadUser: any = ''
  const result: Result = {
    status: '',
    userid: '',
    username: '',
    msg: '',
    avatar: '',
    email: '',
    role: '',
    regDate: undefined
  }

  // 先对用户名进行重复校验
  hadUser = await User.findOne({'username': username}, (err: any, data: any) => {
    return data
  })
  if (hadUser && hadUser.username === username) {
    result.msg = '用户名不能重复'
    result.status = 'error'
    return result
  } else {
    console.log('添加用户成功')
    await newUser.save().then( (data: any) => {
      console.log('保存后的信息为:' )
      console.log(data)
      result.msg = '用户注册成功!'
      result.status = 'success'
      result.userid = data._id
      result.username = data.username
      result.avatar = data.avatar
      result.email = data.email
      result.regDate = data.regDate
      result.role = data.role
      console.log(result)
    })
    return result
  }
}

export const LoginUser = async(user: LoginUser) => {
  const {username, password} = user
  console.log('用户正在登录:')
  console.log(user)

  return User.findOne({'username': username})
}

export const FindUserById = async(id: string) => {
  console.log('正在查找Id:')
  return User.findOne({_id: id})
}