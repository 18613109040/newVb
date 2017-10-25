import {get,post,postjson,postfrom} from "./BaseAction";
import {host} from "./hostConf";
export const GET_PRODUCT = "GET_PRODUCT";
export const ADD_TEMP_PRODUCT = "ADD_TEMP_PRODUCT";
export const UPDATE_TEMP_PRODUCT = "UPDATE_TEMP_PRODUCT";
export const GET_EVALUATION = "GET_EVALUATION";
export const GET_PRODUCT_COUPONS = "GET_PRODUCT_COUPONS";
export const GET_PRODUCT_SPEC = "GET_PRODUCT_SPEC";
export const DELETE_TEMPPRODUCT_BY_ID = "DELETE_TEMPPRODUCT_BY_ID";
export const CHECK_ALL_SHOP = "CHECK_ALL_SHOP";
export const REPLACE_TEMP_PRODUCT = "REPLACE_TEMP_PRODUCT";
export const GET_MEMBERPRODUCT_COUPON = "GET_MEMBERPRODUCT_COUPON";
export const RADIO_CHECK_STATUS = "RADIO_CHECK_STATUS";
export const SET_TLEMENT = "SET_TLEMENT";
export const EMPTY_PRODUCT = "EMPTY_PRODUCT";
export const EMPTY_PRODUCT_SPEC = "EMPTY_PRODUCT_SPEC";
export const EMPTY_EVALUATION = "EMPTY_EVALUATION";
export const CHANGE_PRODUCT_COUPONS = "CHANGE_PRODUCT_COUPONS";

//结算
export function settlement(data, callback=(json)=>{}){
  return postjson(`${host.test_host}imorder/add?platform=1`, data,callback, (json)=>{
    return {
      type : SET_TLEMENT,
      json
    }
  })
}
//清空商品详情

export function emptyProduct(json){
   return {
      type : EMPTY_PRODUCT,
      json
   }
}

//清空商品评价
export function emptyEvaluation(json){
    return{
        type:EMPTY_EVALUATION,
        json
    }
}

//获取商品详情信息
export function getProduct(productId,data, callback=(json)=>{}){
  return get(`${host.test_host}improduct/get/${productId}`, data,callback, (json)=>{
    return {
      type : GET_PRODUCT,
      json
    }
  })
}

//商品评价
export function getEvaluation(productId,data, callback=(json)=>{}){
  return get(`${host.test_host}impcomment/list/${productId}`, data,callback, (json)=>{
    return {
      type : GET_EVALUATION,
      json
    }
  })
}

//获取优惠券
export function getProductCoupons(productId,data, callback=(json)=>{}){
  return get(`${host.test_host}coupon/selectProductCoupons/${productId}`, data,callback, (json)=>{
    return {
      type : GET_PRODUCT_COUPONS,
      json
    }
  })
}

//更改优惠券状态

export function changeProductCoupon(data){
    return {
        type : CHANGE_PRODUCT_COUPONS,
        json : data
    }
}

//获取商品属性
export function getProductSpec(productId,data, callback=(json)=>{}){
  return get(`${host.test_host}improduct/getProductSpec/${productId}`, data,callback, (json)=>{
    return {
      type : GET_PRODUCT_SPEC,
      json
    }
  })
}
//清空商品属性
export function emptyProductSpec(json){
	 return {
      type : EMPTY_PRODUCT_SPEC,
      json
   }
}




//获取可使用优惠券
export function getMemberProductCoupons(data, callback=(json)=>{}){
  return postjson(`${host.test_host}coupon/selectMemberProductCoupons`, data,callback, (json)=>{
    return {
      type : GET_MEMBERPRODUCT_COUPON,
      json
    }
  })
}

//更改优惠券选中状态
export function radioCheckStatus(json){
	 return {
      type : RADIO_CHECK_STATUS,
      json
   }
}


//获取 localStorage 数据覆盖 stroe tempProduct
export function repalceTempProduct(json){
	 return {
      type : REPLACE_TEMP_PRODUCT,
      json
   }
}


//保存购物车数据
export function addTempProduct(json){
   return {
      type : ADD_TEMP_PRODUCT,
      json
   }
}
//更新购物车
export function updateTempProduct(json){
	return {
		type:UPDATE_TEMP_PRODUCT,
		json
	}
}
//删除购物车商品
export function deleteTempProductById(json){
	return {
		type:DELETE_TEMPPRODUCT_BY_ID,
		json
	}
}
//全选或取消选中
export function checkAllShop(json){
	return {
		type:CHECK_ALL_SHOP,
		json
	}
}

