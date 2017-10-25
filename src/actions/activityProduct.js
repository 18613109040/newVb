import {get, phpPost, post, getAsyn} from "./BaseAction";
import {host} from "./hostConf";

export const GET_ACTIVE_LIST = "GET_ACTIVE_LIST";
export const ADD_ACTIVE_LIST = "ADD_ACTIVE_LIST";
export const EMPTY_ACTIVE_LIST = "EMPTY_ACTIVE_LIST";

//获取活动产品
export function getActiveList(urlId, data, callback = (json) => {
}) {
    return get(`${host.test_host}imcampagin/listProduct/${urlId}`, data, callback, (json) => {
        return {
            type: GET_ACTIVE_LIST,
            json
        }
    })
}

//清空活动产品数据
export function emptyActiveList() {
    return {
        type: EMPTY_ACTIVE_LIST
    }

}

export function addActiveList(urlId, data, callback = (json) => {
}) {
    return get(`${host.test_host}imcampagin/listProduct/${urlId}`, data, callback, (json) => {
        return {
            type: ADD_ACTIVE_LIST,
            json
        }
    })
}
