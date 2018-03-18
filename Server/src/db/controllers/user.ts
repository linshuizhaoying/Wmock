const User = require("../models/user");

export const FindUserById = async (id: string) => {
  console.log("正在查找Id:");
  return await User.findOne({ _id: id });
};
export const FindUserByName = async (userName: string) => {
  return await User.findOne({ userName: userName });
};

export const FindUserByEmail = async (email: string) => {
  return await User.findOne({ email: email });
};

export const AddRegUser = async (user: RegUser) => {
  console.log(user);
  const { userName, passWord, email, role } = user;
  const newUser = new User({ userName, passWord, email, role });
  // let hadUser: any = ''
  const result: Result = {
    status: "",
    userId: "",
    userName: "",
    msg: "",
    avatar: "",
    email: "",
    role: "",
    regDate: undefined
  };
  await newUser.save().then((data: any) => {
    console.log("保存后的信息为:");
    console.log(data);
    result.msg = "用户注册成功!";
    result.status = "success";
    result.userId = data._id;
    result.userName = data.userName;
    result.avatar = data.avatar;
    result.email = data.email;
    result.regDate = data.regDate;
    result.role = data.role;
    console.log(result);
  });
  return result;
};

export const LoginUser = async (user: LoginUser) => {
  const { userName, passWord } = user;
  console.log("用户正在登录:");
  console.log(user);

  return User.findOne({ userName: userName });
};

export const UpdateUser = async (user: UpdateUserData) => {
  return User.update(
    {
      _id: user._id
    },
    {
      $set: {
        userName: user.userName,
        passWord: user.passWord,
        avatar: user.avatar,
        role: user.role,
        email: user.email
      }
    }
  );
};
