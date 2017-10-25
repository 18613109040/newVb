
import {get,post,postfrom,postjson} from "./BaseAction";
import {host} from "./hostConf";
export const GET_HOTE_LIST = "GET_HOTE_LIST";
export const GET_HOTE_SELECT_DATA = "GET_HOTE_SELECT_DATA";
export const GET_HOTE_DETAILS = "GET_HOTE_DETAILS";
export const GET_HOTEL_ORDER = "GET_HOTEL_ORDER";
export const ORDER_SUBMIT = "ORDER_SUBMIT";
export const ORDER_CASH_SUBMIT = "ORDER_CASH_SUBMIT";
export const EMPTY_HOTE_DETAILS = "EMPTY_HOTE_DETAILS";
export const UODATA_HOTE_DETAILS = "UODATA_HOTE_DETAILS";
export const GET_ROOM_DETAILS = "GET_ROOM_DETAILS";

export function getHoteList(data, callback=(json)=>{}){
  return get(`${host.test_host}hotel/list`, data,callback, (json)=>{
    return {
      type : GET_HOTE_LIST,
      json
    }
  })
}
export function getHoteSelectDate(data, callback=(json)=>{}){
  return post(`${host.test_host}hotel/selectDate`, data,callback, (json)=>{
    return {
      type : GET_HOTE_SELECT_DATA,
      json
    }
  })
}
//获取房间说明
export function getRoomDetail(id,data, callback=(json)=>{}){
  return get(`${host.test_host}hotel/roomDetail/${id}`,data,callback, (json)=>{
    return {
      type : GET_ROOM_DETAILS,
      json
    }
  })
}
export function getHoteDetails(id,data, callback=(json)=>{}){
  return get(`${host.test_host}hotel/get/${id}`,data,callback, (json)=>{
    return {
      type : GET_HOTE_DETAILS,
      json
    }
  })
}

export function updataHoteDetails(json){
  return {
  	type:UODATA_HOTE_DETAILS,
  	json
  }
}

export function emptyhostDetails(){
	return {
    type : EMPTY_HOTE_DETAILS
  }
}
//酒店预定
export function gethotelOrder(data, callback=(json)=>{}){
  return get(`${host.test_host}hotelOrder/datePriceDetails`,data,callback, (json)=>{
    return {
      type : GET_HOTEL_ORDER,
      json
    }
  })
}

//提交订单
export function orderSubmit(data, callback=(json)=>{}){
  return post(`${host.test_host}hotelOrder/submit`,data,callback, (json)=>{
    return {
      type : ORDER_SUBMIT,
      json
    }
  })
}

//现金提交
export function orderCashSubmit(id,data, callback=(json)=>{}){
  return get(`${host.test_host}hotelOrder/get/${id}`,data,callback, (json)=>{
    return {
      type : ORDER_CASH_SUBMIT,
      json
    }
  })
}

//现金提交





