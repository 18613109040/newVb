import {
    GET_PRODUCT,
    ADD_TEMP_PRODUCT,
    UPDATE_TEMP_PRODUCT,
    GET_EVALUATION,
    GET_PRODUCT_COUPONS,
    GET_PRODUCT_SPEC,
    DELETE_TEMPPRODUCT_BY_ID,
    DELETE_TEMPPRODUCT,
    CHECK_ALL_SHOP,
    REPLACE_TEMP_PRODUCT,
    GET_MEMBERPRODUCT_COUPON,
    RADIO_CHECK_STATUS,
    EMPTY_PRODUCT,
    EMPTY_PRODUCT_SPEC,
    EMPTY_EVALUATION,
    CHANGE_PRODUCT_COUPONS,
    ADD_BUY_PRODUCT,
    UPDATE_BUY_PRODUCT,
    DELETE_BUY_PRODUCT
   

} from '../actions/product'

import {storage} from '../utils/tools';

const initialState = {
    code: -1,
    data:{
        comments:[],
        productBean: {
            bannelImg1: "http://120.25.75.47:8090/group1/M00/00/07/eBlLL1gcIwSAdLoiAAH1jllDjtg195.jpg",
            bannelImg2: "",
            bannelImg3: "",
            bannelImg4: "",
            bannelImg5: "",
            name: "",
            details: ""
        },
        skus:[]
    },
    message: "初始数据"
};

export function productDetails(state = initialState, action) {
    let json = action.json;
    switch (action.type) {
        case GET_PRODUCT:
            return Object.assign({}, state, json);
        case EMPTY_PRODUCT:
            return initialState
        default:
            return state
    }
}

/*
 *
 */
export function tempProduct(state = [], action) {
    let json = action.json;
    switch (action.type) {
        case REPLACE_TEMP_PRODUCT:
            state = json;
            return [].concat(state);
        case ADD_TEMP_PRODUCT:
            Object.assign(json, {check: true})
            storage.setObj({
                cart: [].concat(state, json)
            })
            return [].concat(state, json);

        case UPDATE_TEMP_PRODUCT:
            let {id, check, amount, skuId, specDetail} = json;
            let tem = state.filter(item => item.imProductId == id && item.skuId == skuId)
            tem[0].amount = amount;
            tem[0].check = check;
            tem[0].skuId = skuId || '';
            tem[0].specDetail = specDetail || '';
            storage.setObj({
                cart: [].concat(state)
            })
            return [].concat(state);

        case DELETE_TEMPPRODUCT_BY_ID:
            let temData;
            if (json.skuId == '' || !json.skuId) {
                temData = state.filter(item => item.imProductId != json.id)
                
            } else {
               temData = state.filter(item => (item.imProductId == json.id  && item.skuId !=json.skuId) || item.imProductId != json.id) 
            }
            storage.setObj({
                cart: [].concat(temData)
            })
            return [].concat(temData);
        case DELETE_TEMPPRODUCT:
            state=state.filter(item => !item.check)
            storage.setObj({
                cart: state
            })
            return state;

        case CHECK_ALL_SHOP:
            state.map(item => {
                if (json.type === item.productType) {
                    Object.assign(item, {check: json.check})
                }
            })
            storage.setObj({
                cart: [].concat(state)
            })
            return [].concat(state);

        default:
            return state
    }
}

const evaluationinint = {
    code: -1,
    data: {
        datas: [],
        totalPage: 0,
        totalRecord: 0

    },
    message: "初始数据"
}

export function evaluation(state = evaluationinint, action) {
    let json = action.json;
    switch (action.type) {
        case GET_EVALUATION:
            return Object.assign({}, {
                data: {
                    pageOffset: json.data.pageOffset,
                    pageSize: json.data.pageSize,
                    totalPage: json.data.totalPage,
                    totalRecord: json.data.totalRecord,
                    datas: [].concat(state.data.datas, json.data.datas)
                }
            }, {code: json.code});
        case EMPTY_EVALUATION:
            return evaluationinint
        default:
            return state
    }
}

const inintProductCoupons = {
    code: -1,
    data: []
}
export function productCoupons(state = inintProductCoupons, action) {
    let json = action.json;
    switch (action.type) {
        case GET_PRODUCT_COUPONS:
            return Object.assign({}, state, json);
        case CHANGE_PRODUCT_COUPONS:
            state.data.map(item => {
                if (item.id == json.id) {
                    item.hasGet = 1
                }
            })
            return Object.assign({}, state);
        default:
            return state
    }
}

export function productspec(state = {code: -1, data: []}, action) {
    let json = action.json;
    switch (action.type) {
        case GET_PRODUCT_SPEC:
            return Object.assign({}, state, json);
        case EMPTY_PRODUCT_SPEC:
            return {code: -1, data: []}
        default:
            return state
    }
}

export function memberProductCoupons(state = {code: -1, data: {invalidList: [], validList: []}}, action) {
    let json = action.json;
    switch (action.type) {
        case GET_MEMBERPRODUCT_COUPON:
            json.data.validList = json.data.validList || [];
            json.data.invalidList = json.data.invalidList || [];
            json.data.validList.map((item, id) => {
                if (id == 0) {
                    item.check = true
                } else {
                    item.check = false
                }

            })
            return Object.assign({}, state,
                Object.assign({
                    data: {
                        invalidList: json.data.invalidList,
                        validList: json.data.validList
                    },
                    code: json.code
                })
            );

        case RADIO_CHECK_STATUS:
            state.data.validList.map(item => {
                if (item.id === json.id) {
                    item.check = !item.check
                } else {
                    item.check = false
                }
            })

            return Object.assign({}, state)
        default:
            return state
    }
}

//立即购买商品
export function buyProduct(state = [], action) {
    let json = action.json;
    switch (action.type) {
        case ADD_BUY_PRODUCT:
            storage.setObj({
                buyCart: [].concat(json)
            })
            return [].concat(json);
            break;
        case UPDATE_BUY_PRODUCT:
            let {id, check, amount, skuId, specDetail} = json;
            let tem = state.filter(item => item.imProductId == id && item.skuId == skuId)
            tem[0].amount = amount;
            tem[0].check = check;
            tem[0].skuId = skuId || '';
            tem[0].specDetail = specDetail || '';
            storage.setObj({
                buyCart: [].concat(state)
            })
            return [].concat(state);
            break;
        case DELETE_BUY_PRODUCT:
            storage.setObj({
                buyCart: []
            })
            return []
            break;
        default:
            let buyCart=storage.get('buyCart')||[]
            state = state.length==0? buyCart:state
            return state
    }
}

