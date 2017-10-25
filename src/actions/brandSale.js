import {get} from "./BaseAction";
import {host} from "./hostConf";

export const GET_BRAND_SALE = "GET_BRAND_SALE";


//获取品牌
export function getbrandSale(data, callback = (json) => {
}) {
    return get(`${host.test_host}imcampagin/listByBrand`, data, callback, (json) => {
        return {
            type: GET_BRAND_SALE,
            json
        }
    })
}
