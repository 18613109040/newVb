import {get,post,postfrom,postjson} from "./BaseAction";
import {host} from "./hostConf";
export const GET_ADDRESS = "GET_ADDRESS";
export const ADD_ADDRESS = "ADD_ADDRESS";
export const GET_LIST_ADDRESS = "GET_LIST_ADDRESS";
export const CHECK_ADDRESS = "CHECK_ADDRESS";
export const EIDT_ADDRESS = "EIDT_ADDRESS";
export const GET_ADDRESS_DETAIL = "GET_ADDRESS_DETAIL";
export const DETELETE_ADDRESS_DETAIL = "DETELETE_ADDRESS_DETAIL";

//获取地址
export function getAddress(json){
	return {
		type:GET_ADDRESS,
		json
	}
}

//新增地址
export function addAddress(data, callback=(json)=>{}){
  return post(`${host.test_host}address/add`, data,callback, (json)=>{
    return {
      type : ADD_ADDRESS,
      json
    }
  })
}

//编辑收货地址
export function editAddress(data, callback=(json)=>{}){
  return post(`${host.test_host}address/edit`, data,callback, (json)=>{
    return {
      type : EIDT_ADDRESS,
      json
    }
  })
}

//获取地址
export function getListAddress(data, callback=(json)=>{}){
  return get(`${host.test_host}address/list`, data,callback, (json)=>{
    return {
      type : GET_LIST_ADDRESS,
      json
    }
  })
}

//获取地址详情
export function getAddressDetail(id,data, callback=(json)=>{}){
    return get(`${host.test_host}address/detail/${id}`, data,callback, (json)=>{
        return {
            type : GET_ADDRESS_DETAIL,
            json
        }
    })
}

//删除收货地址
export function deleteAddressDetail(id,data, callback=(json)=>{}){
    return get(`${host.test_host}address/delete/${id}`, data,callback, (json)=>{
        return {
            type : DETELETE_ADDRESS_DETAIL,
            json
        }
    })
}

//选中地址
export function checkAddress(json){
   return {
      type : CHECK_ADDRESS,
      json
   }
}



