import {
  ERROR_TEAM,
  RECEIVE_TEAM,
  RECEIVEMESSAGES_TEAM,
  REMOVE_USER
  } from '../constants/team';

const initialState = {
  data: [],
  messages: [],
}
const removeUser = (list: Array<Team>, projectId: string, userId: string) => {
  // 浅拷贝改变state引用
  const newList:Array<Team> = Object.assign([], list)
  newList.map((item: Team) => {
    if (item.projectId === projectId) {
      const temp: Array<TeamMember> = []
      item.member.map((user: TeamMember) => {
        if (user.userId !== userId) {
          temp.push(user)
        }
      })
      item.member = temp
    }
    return item
  })
  return newList
}
const team = (state = initialState, action: Action) => {
  // console.log(action)
  switch (action.type) {
    case RECEIVE_TEAM:
      return {
        ...state,
        data: action.data.data,
      }
    case ERROR_TEAM:
      return {
        ...state,
        data: []
      }
    case RECEIVEMESSAGES_TEAM:
      return {
        ...state,
        messages: action.data,
      }
    case REMOVE_USER:
      return {
        ...state,
        data: removeUser(state.data, action.data.projectId, action.data.userId)
      }
    default:
      return state
  }
}

export default team;