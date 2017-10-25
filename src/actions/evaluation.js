//评价接口
//订单、
import {get,post,postfrom,postjson} from "./BaseAction";
import {host} from "./hostConf";
export const GET_COMMENTS = "GET_COMMENTS";
export const GET_RATE = "GET_RATE";
export const GET_IMPCOMMENT_DETAIL = "GET_IMPCOMMENT_DETAIL";
export const GET_ORDER_DETAIL = "GET_ORDER_DETAIL";
export const GET_MY_COMMENT_LIST = "GET_MY_COMMENT_LIST";
export const GET_COMPLETED = "GET_COMPLETED";
export const EMPORTY = "EMPORTY";
export const EALUATION_ADD = "EALUATION_ADD";
export const UPLOAD_IMG = "UPLOAD_IMG";
export const SUBMIT_GOOD_EVAL = "SUBMIT_GOOD_EVAL";
export const EMPTY_IMPCOMMENT_DETAIL = "EMPTY_IMPCOMMENT_DETAIL";

//获取待评价商品
export function getComments(urlId,data, callback=(json)=>{}){
  return get(`${host.test_host}impcomment/comments/${urlId}`, data,callback, (json)=>{
    return {
      type : GET_COMMENTS,
      json
    }
  })
}

//清空待评价商品
export function emporty(){
	return {
		type:EMPORTY
	}
}

//获取流服务评价
export function getRate(urlId,data, callback=(json)=>{}){
  return get(`${host.test_host}imordercomment/get/${urlId}`, data,callback, (json)=>{
    return {
      type : GET_RATE,
      json
    }
  })
}

//流服务评价
export function ealuationAdd(data, callback=(json)=>{}){
  return post(`${host.test_host}imordercomment/add`, data,callback, (json)=>{
    return {
      type : EALUATION_ADD,
      json
    }
  })
}

//获取单个商品评价
export function getImpcommentDetail(urlId,data, callback=(json)=>{}){
  return get(`${host.test_host}impcomment/detail/${urlId}`, data,callback, (json)=>{
    return {
      type : GET_IMPCOMMENT_DETAIL,
      json
    }
  })
}
//清空商品评价详情

export function emptyImpcommentDetail(json){
        return {
            type : EMPTY_IMPCOMMENT_DETAIL,
            json
        }

}
//获取单个商品信息
export function getOrderDetail(urlId,data, callback=(json)=>{}){
  return get(`${host.test_host}impcomment/order1sDetail/${urlId}`, data,callback, (json)=>{
    return {
      type : GET_ORDER_DETAIL,
      json
    }
  })
}

//我的评价列表(待评价)
export function getMycommentList(data, callback=(json)=>{}){
  return get(`${host.test_host}mycomment/list`, data,callback, (json)=>{
    return {
      type : GET_MY_COMMENT_LIST,
      json
    }
  })
}
//我的评价(完成)
export function getCompleted(data, callback=(json)=>{}){
  return get(`${host.test_host}mycomment/list`, data,callback, (json)=>{
    return {
      type : GET_COMPLETED,
      json
    }
  })
}

//上传图片
export function uploadImg(data, callback=(json)=>{}){
  return postfrom(`${host.test_host}file/fdfsUpload`, data,callback, (json)=>{
    return {
      type : UPLOAD_IMG,
      json
    }
  })
}
//提交商品评价
export function submitGoodEval(data, callback=(json)=>{}){
  return post(`${host.test_host}impcomment/add`, data,callback, (json)=>{
    return {
      type : SUBMIT_GOOD_EVAL,
      json
    }
  })
}
