import { LOADING_START, LOADING_SUCCESS, LOADING_ERROR } from '../constants/loading'
const initialState = {
   loadingState: ''
}

const loading = (state = initialState, action: Action) => {
  // console.log(action)
  switch (action.type) {
    case LOADING_START:
    return {
      ...state,
      loadingState: 'start'
    }
    case LOADING_SUCCESS:
    return {
      ...state,
      loadingState: 'success'
    }
    case LOADING_ERROR:
    return {
      ...state,
      loadingState: 'error'
    }
    default:
      return state
  }
}

export default loading;