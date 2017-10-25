
import {get,post,postfrom,postjson} from "./BaseAction";
import {host} from "./hostConf";
export const IMPRODUCT_SEARCH = "IMPRODUCT_SEARCH";
export const EMPTY_SEARCH = "EMPTY_SEARCH";

//获取用户信息
export function improductSearch(data, callback=(json)=>{}){
  return post(`${host.test_host}improduct/search`, data,callback, (json)=>{
    return {
      type : IMPRODUCT_SEARCH,
      json
    }
  })
}


export function emptySearch(json){
  return {
      type : EMPTY_SEARCH,
      json
  }
  
}

