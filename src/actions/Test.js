
import {get, phpPost,post,getAsyn} from "./BaseAction";
import {host} from "./hostConf";
export const GET_VERIFICATION_CODE = "GET_VERIFICATION_CODE";
export const LOGIN = "LOGIN";

//获取验证码
export function getVerificationCode(data, callback=(json)=>{}){

  return getAsyn(`${host.rap_host}getcode`, data,callback, (json)=>{
    return {
      type : GET_VERIFICATION_CODE,
      json
    }
  })
}


//登陆
export function login(data, callback=(json)=>{}){
  return post(`${host.dev_host}login`, data,callback, (json)=>{
    return {
      type : LOGIN,
      json
    }
  })
}
