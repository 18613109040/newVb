//订单、
import {get,post,postfrom,postjson} from "./BaseAction";
import {host} from "./hostConf";
export const GET_ORDER_DETAILS = "GET_ORDER_DETAILS";
export const GET_TO_BE_PAID = "GET_TO_BE_PAID";
export const GET_TO_BE_DELIVERED = "GET_TO_BE_DELIVERED";
export const GET_TO_BE_RECEIVED = "GET_TO_BE_RECEIVED";
export const GET_TO_BE_EVALUATED = "GET_TO_BE_EVALUATED";
export const GET_ORDER_BY_ID = "GET_ORDER_BY_ID";
export const GET_STATISTICS = "GET_STATISTICS";
export const CANCAL_ORDER = "CANCAL_ORDER";
export const EMPTY_ORDER = "EMPTY_ORDER";
export const EMPTY_ORDER_DETAILS = "EMPTY_ORDER_DETAILS";
export const RECEIVED = "RECEIVED";
export const GET_EXCHANGESMS = "GET_EXCHANGESMS";
export const CONFIRMATION = "CONFIRMATION";
export const PAY_VBHOTEL_ORDER = "PAY_VBHOTEL_ORDER";
export const WX_PAY = "WX_PAY";
export const GET_OPEN_ID = "GET_OPEN_ID";

//获取全部订单
export function getorderDetails(data, callback=(json)=>{}){
  return get(`${host.test_host}imorder/list`, data,callback, (json)=>{
    return {
      type : GET_ORDER_DETAILS,
      json
    }
  })
}
//新增全部订单


//获取待支付
export function getToBePaid(data, callback=(json)=>{}){
  return get(`${host.test_host}imorder/list`, data,callback, (json)=>{
    return {
      type : GET_TO_BE_PAID,
      json
    }
  })
}

//获取待发货
export function getToBeDelivered(data, callback=(json)=>{}){
  return get(`${host.test_host}imorder/list`, data,callback, (json)=>{
    return {
      type : GET_TO_BE_DELIVERED,
      json
    }
  })
}

//获取待收货
export function getToBeReceived(data, callback=(json)=>{}){
  return get(`${host.test_host}imorder/list`, data,callback, (json)=>{
    return {
      type : GET_TO_BE_RECEIVED,
      json
    }
  })
}

//获取待评价
export function getToBeEvaluated(data, callback=(json)=>{}){
  return get(`${host.test_host}imorder/list`, data,callback, (json)=>{
    return {
      type : GET_TO_BE_EVALUATED,
      json
    }
  })
}

//获取订单详情
export function getOrderById(productId,data, callback=(json)=>{}){

  return get(`${host.test_host}imorder/get/${productId}`, data,callback, (json)=>{
    return {
      type : GET_ORDER_BY_ID,
      json
    }
  })
}

//清空订单详情
export function emptyOrderDetails(){
	return {
		type:EMPTY_ORDER_DETAILS
	}
}

//确认收货

export function received(id,data, callback=(json)=>{}){
  return get(`${host.test_host}imorder/received/${id}`, data,callback, (json)=>{
    return {
      type : RECEIVED,
      json
    }
  })
}
//获取用户订单数量
export function getStatistics(data, callback=(json)=>{}){
  return get(`${host.test_host}imorderstatistics/statistics`, data,callback, (json)=>{
    return {
      type : GET_STATISTICS,
      json
    }
  })
}
//取消订单
export function cancalOrder(productId,data, callback=(json)=>{}){
  return get(`${host.test_host}imorder/cancel/${productId}`,data,callback, (json)=>{
    return {
      type : CANCAL_ORDER,
      json
    }
  })
}
//清空订单所有数据
export function emptyOrder(){
	return {
		type:EMPTY_ORDER
	}
}

//获取短信验证码

export function getExchangeSms(data, callback=(json)=>{}){
  return post(`${host.test_host}user/sendExchangeSms`,data,callback, (json)=>{
    return {
      type : GET_EXCHANGESMS,
      json
    }
  })
}

//确认兑换
export function confirmation(productId,data, callback=(json)=>{}){
  return post(`${host.test_host}imorder/pay/${productId}`,data,callback, (json)=>{
    return {
      type : CONFIRMATION,
      json
    }
  })
}

//客栈Vb兑换
export function payVbHotelOrder(data, callback=(json)=>{}){
  return post(`${host.test_host}hotelOrder/payVbHotelOrder`,data,callback, (json)=>{
    return {
      type : PAY_VBHOTEL_ORDER,
      json
    }
  })
}

//微信支付
export  function  wxPay(data,callback=(json)=>{}) {
    return post(`${host.test_host}wechat/payOrder`,data,callback, (json)=>{
        return {
            type : WX_PAY,
            json
        }
    })
}

//获取openId
export  function  getOpenId(data,callback=(json)=>{}) {
    return get(`${host.test_host}getOpenId`,data,callback, (json)=>{
        return {
            type : GET_OPEN_ID,
            json
        }
    })
}
