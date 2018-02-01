import { RECEIVE_DOCUMENT, 
  ERROR_DOCUMENT,
  REMOVE_LOCALDOCUMENT,
  UPDATE_LOCALDOCUMENT
   // ADD_MESSAGE
 } from '../constants/document';
const initialState = {
  data:[]
}
const removeDocument = ( list:any, id:any ) =>{
  console.log(list,id)
  let temp:any[] = []
  list.map((item:any,key:any)=>{
    if(item._id !== id.id){
      temp.push(item)
    }
    return item
  }) 
  return temp
}

const updateDocument = ( list:any, data:any ) =>{
  console.log(list)
  console.log(data)
  let temp:any[] = []
  list.map((item:any,key:any)=>{
    if(item._id === data._id){
      temp.push(data)
    }else{
      temp.push(item)
    }
    
    return item
  }) 
  return temp
}

const document = (state = initialState, action: any) => {
// console.log(action)
  switch (action.type) {
  case RECEIVE_DOCUMENT:
    return{
    ...state,
    data: action.data.data,
    }
  case ERROR_DOCUMENT:
    return{
    ...state,
    data: []
    }
  case REMOVE_LOCALDOCUMENT:
  return{
    ...state,
    data: removeDocument(state.data,action.data),
    }
  case UPDATE_LOCALDOCUMENT:
  return{
    ...state,
    data: updateDocument(state.data,action.data),
    }
  // case ADD_PROJECT:
  //   return{
  //     ...state,
  //     data: [...state.data, action.data]
  //   }
  default:
  return state
  }
}

export default document;