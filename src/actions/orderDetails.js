//订单、
import {get,post,postfrom,postjson} from "./BaseAction";
import {host} from "./hostConf";
export const GET_ORDER_DETAILS = "GET_ORDER_DETAILS";
export const GET_TO_BE_PAID = "GET_TO_BE_PAID";
export const GET_TO_BE_DELIVERED = "GET_TO_BE_DELIVERED";
export const GET_TO_BE_RECEIVED = "GET_TO_BE_RECEIVED";
export const GET_TO_BE_EVALUATED = "GET_TO_BE_EVALUATED";
export const GET_ORDER_BY_ID = "GET_ORDER_BY_ID";
export const GET_STATISTICS = "GET_STATISTICS";
export const CANCAL_ORDER = "CANCAL_ORDER";
export const EMPTY_ORDER = "EMPTY_ORDER";
export const EMPTY_ORDER_DETAILS = "EMPTY_ORDER_DETAILS";
export const RECEIVED = "RECEIVED";
export const GET_EXCHANGESMS = "GET_EXCHANGESMS";
export const CONFIRMATION = "CONFIRMATION";
export const PAY_VBHOTEL_ORDER = "PAY_VBHOTEL_ORDER";
export const WX_PAY = "WX_PAY";
export const GET_OPEN_ID = "GET_OPEN_ID";
export const WECHAT_JSSDK = "WECHAT_JSSDK";
export const ADD_AFTERSALE_PRODCUTS ='ADD_AFTERSALE_PRODCUTS'
export const UPDATE_AFTERSALE_PRODCUTS ='UPDATE_AFTERSALE_PRODCUTS'
export const CHECK_ALL_AFTERSALE_PRODCUTS='CHECK_ALL_AFTERSALE_PRODCUTS'
export const APPLY_REFUND_INIT="APPLY_REFUND_INIT"
export const APPLY_REFUND="APPLY_REFUND"
export const APPLY_REFUND_DELIVERY_INIT='APPLY_REFUND_DELIVERY_INIT'
export const GET_REFUND_LIST='GET_REFUND_LIST'
export const GET_REFUND_DETAIL='GET_REFUND_DETAIL'
export const GET_REFUND_HISTORY='GET_REFUND_HISTORY'
export const UPDATE_REFUND_DELIVERY='UPDATE_REFUND_DELIVERY'
export const GET_REFUND_DETAIL2='GET_REFUND_DETAIL2'
//获取全部订单
export function getorderDetails(data, callback=(json)=>{}){
  return get(`${host.test_host}imorder/list`, data,callback, (json)=>{
    return {
      type : GET_ORDER_DETAILS,
      json
    }
  })
}
//新增全部订单


//获取待支付
export function getToBePaid(data, callback=(json)=>{}){
  return get(`${host.test_host}imorder/list`, data,callback, (json)=>{
    return {
      type : GET_TO_BE_PAID,
      json
    }
  })
}

//获取待发货
export function getToBeDelivered(data, callback=(json)=>{}){
  return get(`${host.test_host}imorder/list`, data,callback, (json)=>{
    return {
      type : GET_TO_BE_DELIVERED,
      json
    }
  })
}

//获取待收货
export function getToBeReceived(data, callback=(json)=>{}){
  return get(`${host.test_host}imorder/list`, data,callback, (json)=>{
    return {
      type : GET_TO_BE_RECEIVED,
      json
    }
  })
}

//获取待评价
export function getToBeEvaluated(data, callback=(json)=>{}){
  return get(`${host.test_host}imorder/list`, data,callback, (json)=>{
    return {
      type : GET_TO_BE_EVALUATED,
      json
    }
  })
}

//获取订单详情
export function getOrderById(productId,data, callback=(json)=>{}){

  return get(`${host.test_host}imorder/get/${productId}`, data,callback, (json)=>{
    return {
      type : GET_ORDER_BY_ID,
      json
    }
  })
}

//清空订单详情
export function emptyOrderDetails(){
	return {
		type:EMPTY_ORDER_DETAILS
	}
}

//确认收货

export function received(id,data, callback=(json)=>{}){
  return get(`${host.test_host}imorder/received/${id}`, data,callback, (json)=>{
    return {
      type : RECEIVED,
      json
    }
  })
}
//获取用户订单数量
export function getStatistics(data, callback=(json)=>{}){
  return get(`${host.test_host}imorderstatistics/statistics`, data,callback, (json)=>{
    return {
      type : GET_STATISTICS,
      json
    }
  })
}
//取消订单
export function cancalOrder(productId,data, callback=(json)=>{}){
  return get(`${host.test_host}imorder/cancel/${productId}`,data,callback, (json)=>{
    return {
      type : CANCAL_ORDER,
      json
    }
  })
}
//清空订单所有数据
export function emptyOrder(){
	return {
		type:EMPTY_ORDER
	}
}

//获取短信验证码

export function getExchangeSms(data, callback=(json)=>{}){
  return post(`${host.test_host}user/sendExchangeSms`,data,callback, (json)=>{
    return {
      type : GET_EXCHANGESMS,
      json
    }
  })
}

//确认兑换
export function confirmation(productId,data, callback=(json)=>{}){
  return post(`${host.test_host}imorder/pay/${productId}`,data,callback, (json)=>{
    return {
      type : CONFIRMATION,
      json
    }
  })
}

//客栈Vb兑换
export function payVbHotelOrder(data, callback=(json)=>{}){
  return post(`${host.test_host}hotelOrder/payVbHotelOrder`,data,callback, (json)=>{
    return {
      type : PAY_VBHOTEL_ORDER,
      json
    }
  })
}

//微信支付
export  function  wxPay(data,callback=(json)=>{}) {
    return post(`${host.test_host}wechat/payOrder`,data,callback, (json)=>{
        return {
            type : WX_PAY,
            json
        }
    })
}

//获取openId
export  function  getOpenId(data,callback=(json)=>{}) {
    return get(`${host.test_host}getOpenId`,data,callback, (json)=>{
        return {
            type : GET_OPEN_ID,
            json
        }
    })
}

//微信js-sdk 签名

export  function  wechatJssdk(data,callback=(json)=>{}) {
    return post(`${host.test_host}wechat/jssdk`,data,callback, (json)=>{
        return {
            type : WECHAT_JSSDK,
            json
        }
    })
}



//申请售后的商品 begin
export function setAfterSaleProducts(data){
   return {
        type : ADD_AFTERSALE_PRODCUTS,
        json:data
    }
}

export function updateAfterSaleProducts(data){
  return {
        type : UPDATE_AFTERSALE_PRODCUTS,
        json:data
    }
}
export function checkAllAfterSaleProducts(){
  return {
    type:CHECK_ALL_AFTERSALE_PRODCUTS
  }
}
//申请售后的商品 end 


//获取申请退款退货初始化信息
export function getApplyRefundInit(data,callback=(json)=>{}){
   return postjson(`${host.test_host}imorder/refund/apply/init`,data,callback, (json)=>{
        return {
            type : APPLY_REFUND_INIT,
            json
        }
    })
}

//订单申请退款,退款退货
export function refundMoney(data,url,callback=(json)=>{}){
   return postjson(`${host.test_host}${url}`,data,callback, (json)=>{
        return {
            type : APPLY_REFUND,
            json
        }
    })
}

//订单申请退款,退款退货
export function refundModify(data,callback=(json)=>{}){
   return postjson(`${host.test_host}imorder/refund/apply/modify`,data,callback, (json)=>{
        return {
            type : APPLY_REFUND,
            json
        }
    })
}

//0210.撤消售后单
export function refundCancel(data,callback=(json)=>{}){
   return postjson(`${host.test_host}imorder/refund/apply/cancel`,data,callback, (json)=>{
        return {
            type : APPLY_REFUND,
            json
        }
    })
}

//获取提交货运信息界面初始化信息
export function getDeliveryInit(data,callback=(json)=>{}){
   return get(`${host.test_host}imorder/refund/update/delivery/init`,data,callback, (json)=>{
        return {
            type : APPLY_REFUND_DELIVERY_INIT,
            json
        }
    })
}

//0205.退款/售后列表接口
export function getRefundList(data,callback=(json)=>{}){
   return get(`${host.test_host}imorder/refund/list`,data,callback, (json)=>{
        return {
            type : GET_REFUND_LIST,
            json
        }
    })
}

//0206.获取退款退货单接口
export function getRefundDetail(data,callback=(json)=>{}){
   return get(`${host.test_host}imorder/refund/get`,data,callback, (json)=>{
        return {
            type : GET_REFUND_DETAIL,
            json
        }
    })
}

//0206.获取退款退货单操作记录接口
export function getRefundHistory(data,callback=(json)=>{}){
   return get(`${host.test_host}imorder/refund/history`,data,callback, (json)=>{
        return {
            type : GET_REFUND_HISTORY,
            json
        }
    })
}

//0204.提交货运信息
export function updateRefundDelivery(data,callback=(json)=>{}){
   return postjson(`${host.test_host}imorder/refund/update/delivery`,data,callback, (json)=>{
        return {
            type : UPDATE_REFUND_DELIVERY,
            json
        }
    })
}

//0206.获取退款退货单接口
export function getRefundDetail2(data,callback=(json)=>{}){
   return get(`${host.test_host}imorder/refund/apply/modify/init`,data,callback, (json)=>{
        return {
            type : GET_REFUND_DETAIL2,
            json
        }
    })
}
