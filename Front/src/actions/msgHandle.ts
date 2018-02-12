import notification from 'antd/lib/notification';

// 简单的成功和错误处理
export function successMsg(msg: string) {
  notification.success({
    message: msg,
    description: msg,
    duration: 1
  })
  return
}

export function errorMsg(msg: string) {
  notification.error({
    message: msg,
    description: msg,
    duration: 1
  })
  return
}