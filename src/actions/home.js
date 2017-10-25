
import {get, phpPost,post,getAsyn} from "./BaseAction";
import {host} from "./hostConf";
export const GET_BANNER_LIST = "GET_BANNER_LIST";
export const GET_NEW_LIST = "GET_NEW_LIST";
export const GET_PRODUCT_LIST = "GET_PRODUCT_LIST";
export const GET_AREAACTIVITY = "GET_AREAACTIVITY";
export const CHNEGE_NAVBAR_TITLE = "CHNEGE_NAVBAR_TITLE";


//获取轮播图片
export function getBannerList(url,data, callback=(json)=>{}){
  return get(`${host.test_host}imadvert/list`, data,callback, (json)=>{
    return {
      type : GET_BANNER_LIST,
      json
    }
  })
}

//获取产品
export function getProduct(data, callback=(json)=>{}){
  return get(`${host.test_host}imcategory/list`, data,callback, (json)=>{
    return {
      type : GET_PRODUCT_LIST,
      json
    }
  })
}

//获取活动区
export function getAreaActivity(data, callback=(json)=>{}){
  return get(`${host.test_host}imcampagin/list`, data,callback, (json)=>{
    return {
      type : GET_AREAACTIVITY,
      json
    }
  })
}

//改变navbar title值
export function changeNavbarTitle(title){
    return {
        type:CHNEGE_NAVBAR_TITLE,
        title:title
    }
}
