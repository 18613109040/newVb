//评价接口
//订单、
import {get,post,postfrom,postjson} from "./BaseAction";
import {host} from "./hostConf";
export const GET_VB_COLLECTION = "GET_VB_COLLECTION";
export const DELETE_COLLECTION = "DELETE_COLLECTION";
export const EMPOTY_COLLECATION = "EMPOTY_COLLECATION";
export const GET_CASE_COLLECTION = "GET_CASE_COLLECTION";
export const EMPOTY_CASE_COLLECATION = "EMPOTY_CASE_COLLECATION";
export const IMMEMBER_COLLECTION = "IMMEMBER_COLLECTION";

//收藏商品
export function immemberCollect(data, callback=(json)=>{}){
  return post(`${host.test_host}immembercollect/add`, data,callback, (json)=>{
    return {
      type : IMMEMBER_COLLECTION,
      json
    }
  })
}
//获取Vb商品
export function getVbcollection(data, callback=(json)=>{}){
  return get(`${host.test_host}immembercollect/list`, data,callback, (json)=>{
    return {
      type : GET_VB_COLLECTION,
      json
    }
  })
}
//获取现金收藏商品
export function getCasecollection(data, callback=(json)=>{}){
  return get(`${host.test_host}immembercollect/list`, data,callback, (json)=>{
    return {
      type : GET_CASE_COLLECTION,
      json
    }
  })
}
//删除收藏
export function deleteCollection(data, callback=(json)=>{}){
  return post(`${host.test_host}immembercollect/delete`, data,callback, (json)=>{
    return {
      type : DELETE_COLLECTION,
      json
    }
  })
}

//清空数据
export function empotyCollection(){
	return {
		type:EMPOTY_COLLECATION
	}
}
export function empotyCaseCollection(){
	return {
		type:EMPOTY_CASE_COLLECATION
	}
}
