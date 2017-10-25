import {GET_HOTE_LIST,GET_HOTE_SELECT_DATA,
	GET_HOTE_DETAILS,GET_HOTEL_ORDER,ORDER_CASH_SUBMIT,
	EMPTY_HOTE_DETAILS,UODATA_HOTE_DETAILS} from '../actions/sblodge'

const initialState ={
  code: -1,
  data:[],
  message:"初始数据"
};
export  function hostlist(state = initialState, action) {
    let json = action.json;
    switch (action.type) {
        case GET_HOTE_LIST:
            return Object.assign({},state,json);
        default:
            return state
    }
}

export function hostData(state = initialState, action){
	let json = action.json;
  switch (action.type) {
    case GET_HOTE_SELECT_DATA:
      return Object.assign({},state,json);
    default:
      return state
  }
}
export function hostdetails(state = {code: -1,data:{hotelImgs:[],rooms:[]}}, action){
	let json = action.json;
  switch (action.type) {
    case GET_HOTE_DETAILS:
      return Object.assign({},state,json);
    case UODATA_HOTE_DETAILS:
    	const {checkInDate,checkOutDate,rooms} = json;
    	state.data.checkInDate = checkInDate;
    	state.data.checkOutDate = checkOutDate;
    	state.data.rooms = rooms;
    	return Object.assign({},state);
    case EMPTY_HOTE_DETAILS:
    	return Object.assign({code:-1,data:{hotelImgs:[],rooms:[]}});
    default:
      return state
  }
}

export function hotelorder(state = {code: -1,data:[]}, action){
	let json = action.json;
  switch (action.type) {
    case GET_HOTEL_ORDER:
      return Object.assign({},state,json);
    default:
      return state
  }
}
export function ordercase(state = {code: -1,data:{}}, action){
	let json = action.json;
  switch (action.type) {
    case ORDER_CASH_SUBMIT:
      return Object.assign({},state,json);
    default:
      return state
  }
}


