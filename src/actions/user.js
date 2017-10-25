
import {get,post,postfrom,postjson} from "./BaseAction";
import {host} from "./hostConf";
export const GET_USER_INFO = "GET_USER_INFO";
export const USER_REGISTER_SMS ="USER_REGISTER_SMS";
export const USER_REGISTER='USER_REGISTER';
export const UPDATA_USER_INFO='UPDATA_USER_INFO';
export const USER_LOGIN='USER_LOGIN';

//获取用户信息
export function getUserInfo(data, callback=(json)=>{}){
  return get(`${host.test_host}user/refresh`, data,callback, (json)=>{
    return {
      type : GET_USER_INFO,
      json
    }
  })
}



//更新用户信息
export function updataUserInfo(json){
        return {
            type : UPDATA_USER_INFO,
            json
        }

}



//登录
export function userLogin(data, callback=(json)=>{}){
  return post(`${host.test_host}login/userLogin`, data,callback, (json)=>{
    return {
      type : USER_LOGIN,
      json
    }
  })
}

//注册获取验证码
export function getRegisterSms(data, callback=(json)=>{}){
  return post(`${host.test_host}login/registerSms`, data,callback, (json)=>{
    return {
      type : USER_REGISTER_SMS,
      json
    }
  })
}
//发送忘记密码验证码
export function resetPasswordSms(data, callback=(json)=>{}){
  return post(`${host.test_host}login/resetPasswordSms`, data,callback, (json)=>{
    return {
      type : USER_REGISTER_SMS,
      json
    }
  })
}

//注册
export function userResister(data, callback=(json)=>{}){
  return post(`${host.test_host}login/userRegister`, data,callback, (json)=>{
    return {
      type : USER_REGISTER,
      json
    }
  })
}

//忘记密码
export function resetPassword(data, callback=(json)=>{}){
  return post(`${host.test_host}login/resetPassword`, data,callback, (json)=>{
    return {
      type : USER_REGISTER,
      json
    }
  })
}

