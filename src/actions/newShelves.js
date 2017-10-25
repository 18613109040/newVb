//
import {get, phpPost,post,getAsyn} from "./BaseAction";
import {host} from "./hostConf";
export const GET_NEW_SHELVES = "GET_NEW_SHELVES";
export const GET_EXPLOSION_RECOM = "GET_EXPLOSION_RECOM";
export const GET_VB_EXCHANGE_MENU = "GET_VB_EXCHANGE_MENU";
export const GET_VB_LIST = "GET_VB_LIST";
export const SELECT_COUPON_PRODUCTS = "SELECT_COUPON_PRODUCTS";
export const GET_VB_MENU_CHILDREN = "GET_VB_MENU_CHILDREN";
export const CHANGE_VB_INFICATION_MENU = "CHANGE_VB_INFICATION_MENU";
export const EMPTY_NEW_SHELVES = "EMPTY_NEW_SHELVES";
export const EMPTY_EXPLOSION_RECOM = "EMPTY_EXPLOSION_RECOM";

//满减区限定商品
export function selectCouponProducts(data, callback=(json)=>{}){
  return post(`${host.test_host}coupon/selectCouponProducts`, data,callback, (json)=>{
    return {
      type : SELECT_COUPON_PRODUCTS,
      json
    }
  })
}
//新品上架
export function getNewShelves(data, callback=(json)=>{}){
  return get(`${host.test_host}improduct/listNew`, data,callback, (json)=>{
    return {
      type : GET_NEW_SHELVES,
      json
    }
  })
}
//清空新品数据
export function emptyNewShelves(){
        return {
            type : EMPTY_NEW_SHELVES
        }
}

//爆款推荐
export function getExplosionRecom(data, callback=(json)=>{}){
  return get(`${host.test_host}improduct/listHot`, data,callback, (json)=>{
    return {
      type : GET_EXPLOSION_RECOM,
      json
    }
  })
}
//清空爆款数据
export function emptyExplosionRecom(){
    return {
        type : EMPTY_EXPLOSION_RECOM
    }
}
//VB兑换
export function getVbExchangeMenu(id,data, callback=(json)=>{}){
  return get(`${host.test_host}imcategory/children/${id}`, data,callback, (json)=>{
    return {
      type : GET_VB_EXCHANGE_MENU,
      json
    }
  })
}

//获取VB二级分类
export function getVbMenuChildren(urlId,data, callback=(json)=>{}){
    return get(`${host.test_host}imcategory/children/${urlId}`, data,callback, (json)=>{
        return {
            type : GET_VB_MENU_CHILDREN,
            imCategoryId:urlId,
            json
        }
    })
}

export function changeVbInficationMenu(json){
    return {
        type : CHANGE_VB_INFICATION_MENU,
        json
    }
}
//获取VB热销产品
export function getVbExchangeHost(data, callback=(json)=>{}){
  return get(`${host.test_host}improduct/listHot`, data,callback, (json)=>{
    return {
      type : GET_VB_LIST,
      key : "vbhost",
      json
    }
  })
}

//
export function getVbList(urlId,data, callback=(json)=>{}){
  return get(`${host.test_host}improduct/list/${urlId}`, data,callback, (json)=>{
    return {
      type : GET_VB_LIST,
      key:urlId,
      json
    }
  })
}

