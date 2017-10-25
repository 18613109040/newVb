
import {get, phpPost,post,getAsyn} from "./BaseAction";
import {host} from "./hostConf";
export const GET_HOTEL_ORDER_LIST = "GET_HOTEL_ORDER_LIST";



//获取订单列表
export function getHotelList(data, callback=(json)=>{}){
  return get(`${host.test_host}hotelOrder/list`, data,callback, (json)=>{
    return {
      type : GET_HOTEL_ORDER_LIST,
      json:Object.assign({},json,{status:data.status})
    }
  })
}
