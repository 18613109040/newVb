import {get, phpPost,post,getAsyn} from "./BaseAction";
import {host} from "./hostConf";
export const GET_INFICATION_MENU = "GET_INFICATION_MENU";
export const GET_INFICATION_LIST = "GET_INFICATION_LIST";
export const ADD_INFICATION_LIST = "ADD_INFICATION_LIST";
export const CHANGE_INFICATION_MENU = "CHANGE_INFICATION_MENU";
export const GET_MENU_CHILDREN = "GET_MENU_CHILDREN";
import {storage} from '../utils/tools';
import utils from '../utils'

//获取分类列表
export function getInficationMenu(urlId,data, callback=(json)=>{}){
  var result=storage.get('classIficationData',utils.expiration)   //过期时间为2天
  if(!result){
      return get(`${host.test_host}imcategory/children/${urlId}`, data,callback, (json)=>{
      return {
        type : GET_INFICATION_MENU,
        json
      }
    })
  }else{
    return{
      type:GET_INFICATION_MENU,
      json:result
    }
  }
  
}

//获取二级分类
export function getMenuChildren(urlId,data, callback=(json)=>{}){
    return get(`${host.test_host}imcategory/children/${urlId}`, data,callback, (json)=>{
        return {
            type : GET_MENU_CHILDREN,
            imCategoryId:urlId,
            json
        }
    })
}

//修改分类列表状态
export function changeInficationMenu(json){
  return {
      type : CHANGE_INFICATION_MENU,
      json
  }
}

//获取商品
export function getInficationList(urlId,data, callback=(json)=>{}){
  return get(`${host.test_host}improduct/list/${urlId}`, data,callback, (json)=>{
    return {
      type : GET_INFICATION_LIST,
      key:urlId,
      json
    }
  })
}
//获取热销产品
export function getExchangeHost(data, callback=(json)=>{}){
  return get(`${host.test_host}improduct/listHot`, data,callback, (json)=>{
    return {
      type : GET_INFICATION_LIST,
      key : "host",
      json
    }
  })
}

export function AddInficationList(urlId,data, callback=(json)=>{}){
  return get(`${host.test_host}improduct/list/${urlId}`, data,callback, (json)=>{
    return {
      type : ADD_INFICATION_LIST,
      key:urlId,
      json
    }
  })
}


