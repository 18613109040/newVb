//优惠券
import {get,post,postfrom,postjson} from "./BaseAction";
import {host} from "./hostConf";
export const GET_USER_COUPONS = "GET_USER_COUPONS";
export const SELECT_COUPONS = "SELECT_COUPONS";
export const ADD_USER_COUPONS = "ADD_USER_COUPONS";
export const ACTIVATE_COUPONS = "ACTIVATE_COUPONS";
export const CHANGE_USER_COUPONS = "CHANGE_USER_COUPONS";
export const CHANGE_COUPONS_CENTRE = "CHANGE_COUPONS_CENTRE";
export const EMPTY_COUPONS_CENTRE = "EMPTY_COUPONS_CENTRE";


//获取用户信息
export function getUserCoupons(data, callback=(json)=>{}){
  return get(`${host.test_host}coupon/userCoupons`, data,callback, (json)=>{
    return {
      type : GET_USER_COUPONS,
      json
    }
  })
}

//领券中心
export function selectCoupons(data, callback=(json)=>{}){
  return get(`${host.test_host}coupon/selectCoupons`, data,callback, (json)=>{
    return {
      type : SELECT_COUPONS,
      json
    }
  })
}
//领取优惠券
export function changeCouponsCentre(json){
        return {
            type : CHANGE_COUPONS_CENTRE,
            json
        }
}

//清空优惠券
export function emptyCouponsCentre(json){
    return {
        type : EMPTY_COUPONS_CENTRE,
        json
    }
}
//领取优惠券
export function addUserCoupon(data, callback=(json)=>{}){
  return post(`${host.test_host}coupon/addUserCoupon`, data,callback, (json)=>{
    return {
      type : ADD_USER_COUPONS,
      json
    }
  })
}

//优惠券激活
export function activateCoupon(data, callback=(json)=>{}){
  return post(`${host.test_host}coupon/activate`, data,callback, (json)=>{
    return {
      type : ACTIVATE_COUPONS,
      json
    }
  })
}

