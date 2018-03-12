import {
  RECEIVE_DOCUMENT,
  RECEIVE_DOCUMENTMESSAGES,
  ERROR_DOCUMENT,
  REMOVE_LOCALDOCUMENT,
  UPDATE_LOCALDOCUMENT
  // ADD_MESSAGE
} from '../constants/document';
const initialState = {
  data: [],
  documentMessages: []
}
const removeDocument = (list: Array<Document>, id: Id) => {
  let temp: Array<Document> = []
  list.map((item: Document) => {
    if (item._id !== id.id) {
      temp.push(item)
    }
    return item
  })
  return temp
}

const updateDocument = (list: Array<Document>, data: Document) => {
  let temp: Array<Document> = []
  list.map((item: Document) => {
    if (item._id === data._id) {
      temp.push(data)
    } else {
      temp.push(item)
    }
    return item
  })
  return temp
}

const document = (state = initialState, action: Action) => {
  switch (action.type) {
    case RECEIVE_DOCUMENT:
      return {
        ...state,
        data: action.data.data,
      }
    case RECEIVE_DOCUMENTMESSAGES:
      return {
        ...state,
        documentMessages: action.data.data,
      }
    case ERROR_DOCUMENT:
      return {
        ...state,
        data: [],
        documentMessages: []
      }
    case REMOVE_LOCALDOCUMENT:
      return {
        ...state,
        data: removeDocument(state.data, action.data),
      }
    case UPDATE_LOCALDOCUMENT:
      return {
        ...state,
        data: updateDocument(state.data, action.data),
      }
    default:
      return state
  }
}

export default document;