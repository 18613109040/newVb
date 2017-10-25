import {
    GET_PRODUCT,
    ADD_TEMP_PRODUCT,
    UPDATE_TEMP_PRODUCT,
    GET_EVALUATION,
    GET_PRODUCT_COUPONS,
    GET_PRODUCT_SPEC,
    DELETE_TEMPPRODUCT_BY_ID,
    CHECK_ALL_SHOP,
    REPLACE_TEMP_PRODUCT,
    GET_MEMBERPRODUCT_COUPON,
    RADIO_CHECK_STATUS,
    EMPTY_PRODUCT,
    EMPTY_PRODUCT_SPEC,
    EMPTY_EVALUATION,
    CHANGE_PRODUCT_COUPONS
} from '../actions/product'

import {storage} from '../utils/tools';

const initialState = {
    code: -1,
    data: {
        bannelImg1: "http://120.25.75.47:8090/group1/M00/00/07/eBlLL1gcIwSAdLoiAAH1jllDjtg195.jpg",
        bannelImg2: "",
        bannelImg3: "",
        bannelImg4: "",
        bannelImg5: "",
        name: "",
        details: ""
    },
    message: "初始数据"
};

export function productDetails(state = initialState, action) {
    let json = action.json;
    switch (action.type) {
        case GET_PRODUCT:
            return Object.assign({}, state, json);
        case EMPTY_PRODUCT:
            return Object.assign({
                    code: -1,
                    data: {
                        bannelImg1: "http://120.25.75.47:8090/group1/M00/00/07/eBlLL1gcIwSAdLoiAAH1jllDjtg195.jpg",
                        bannelImg2: "",
                        bannelImg3: "",
                        bannelImg4: "",
                        bannelImg5: "",
                        name: "",
                        details: ""
                    },
                    message: "初始数据"
                }
            );
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
            let tem = state.filter(item => item.data.imProductId == id && item.skuId == skuId)
            tem[0].amount = amount;
            tem[0].check = check;
            tem[0].skuId = skuId || '';
            tem[0].specDetail = specDetail || '';
            storage.setObj({
                cart: [].concat(state)
            })
            return [].concat(state);

        case DELETE_TEMPPRODUCT_BY_ID:
            let ids = json.id;
            let temData = state;
            ids.split(',').map((proid) => {
                if (json.skuId == "" || !json.skuId) {
                    temData = temData.filter(item => item.data.imProductId != proid)
                } else {
                    temData = temData.filter(item => item.data.imProductId != proid && item.skuId !== json.skuId)
                }

            })
            storage.setObj({
                cart: [].concat(temData)
            })
            return [].concat(temData);

        case CHECK_ALL_SHOP:
            console.dir(json)
            state.map(item => {
                if (json.type === item.data.productType) {
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
            console.dir(json);
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
    if(!json) return state
    if(!json.data) return state
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
            console.dir(json)
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
