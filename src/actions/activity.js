import {get, phpPost, post, getAsyn} from "./BaseAction";
import {host} from "./hostConf";

export const GET_AWARDLIST_LIST = "GET_AWARDLIST_LIST";
export const OPEN_LOST="OPEN_LOST"
export const GET_LIST_PRISE_FOR_PAGE="GET_LIST_PRISE_FOR_PAGE"

//获取活动产品
export function getActiveList( data, callback = (json) => {
}) {
    return get(`${host.activity_host}prize/getAwardList`, data, callback, (json) => {
        return {
            type: GET_AWARDLIST_LIST,
            json
        }
    })
}

//获取中奖记录
export function getListPrizeForPage( data, callback = (json) => {
}) {

    return get(`${host.activity_host}my/listPrizeForPage`, data, callback, (json) => {
        return {
            type: GET_LIST_PRISE_FOR_PAGE,
            json
        }
    })
}
//抽奖
export function openLost( data, callback = (json) => {
}) {
    return post(`${host.activity_host}prize/openLost`, data, callback, (json) => {
        return {
            type: OPEN_LOST,
            json
        }
    })
}
//获取下注V币信息
export function getCoinSum(data,callback = (json) => {
}) {
    return get(`${host.activity_host}my/getCoinSum`, data, callback, (json) => {
        return {
            type: "GET_COINSUM",
            json
        }
    })
}
