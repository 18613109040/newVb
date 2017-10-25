//地址管理
import {GET_BRAND_SALE} from '../actions/brandSale'

export  function brandsale(state = {code:-1,data:[]}, action) {
    let json = action.json;
    switch (action.type) {
        case GET_BRAND_SALE:
            return Object.assign({},state,json);
        default:
            return state
    }
}

