import {
    GET_NEW_SHELVES,
    GET_VB_EXCHANGE_HOST,
    GET_VB_EXCHANGE_MENU,
    GET_VB_LIST,
    GET_VB_MENU_CHILDREN,
    EMPTY_NEW_SHELVES,
    EMPTY_EXPLOSION_RECOM,
    GET_EXPLOSION_RECOM,
    CHANGE_VB_INFICATION_MENU
} from '../actions/newShelves'

const inint = {
    code: -1,
    data: {
        datas: []
    }
}

//新品上市
export function newshelves(state = inint, action) {
    let json = action.json;
    switch (action.type) {
        case GET_NEW_SHELVES:
            return Object.assign({}, {
                data: {
                    pageOffset: json.data.pageOffset,
                    pageSize: json.data.pageSize,
                    totalPage: json.data.totalPage,
                    totalRecord: json.data.totalRecord,
                    datas: [].concat(state.data.datas, json.data.datas)
                }
            }, {code: json.code});
        case EMPTY_NEW_SHELVES :
            return Object.assign({},inint)
        default:
            return state
    }
}
//爆款推荐
export function explosionRecom(state = inint, action) {
    let json = action.json;
    switch (action.type) {
        case GET_EXPLOSION_RECOM:
            return Object.assign({}, {
                data: {
                    pageOffset: json.data.pageOffset,
                    pageSize: json.data.pageSize,
                    totalPage: json.data.totalPage,
                    totalRecord: json.data.totalRecord,
                    datas: [].concat(state.data.datas, json.data.datas)
                }
            }, {code: json.code});
        case EMPTY_EXPLOSION_RECOM :
            return Object.assign({},inint)
        default:
            return state
    }
}

//热销产品
export function vbexchangehost(state = {code: -1, data: {datas: []}}, action) {
    let json = action.json;
    switch (action.type) {
        case GET_VB_EXCHANGE_HOST:
            return Object.assign({}, state, json);
        default:
            return state
    }
}

//VB兑换菜单
export function vbexchangemenu(state = {code: -1, data: []}, action) {
    let json = action.json;
    switch (action.type) {
        case GET_VB_EXCHANGE_MENU:
            json.data.map((item, index) => {
                if (index == 0) {
                    item.select = true;

                } else {
                    item.select = false;

                }
            })
            return Object.assign({}, state, json, {selectId: json.data[0].imCategoryId});
        case GET_VB_MENU_CHILDREN :
            let {imCategoryId} = action;
            state.data.map(item => {
                if (item.imCategoryId == imCategoryId) {
                    item.children = json.data
                }
            })
            return Object.assign({}, state)
        case CHANGE_VB_INFICATION_MENU :
            state.data.map(item=>{
                if(item.imCategoryId == json.imCategoryId){
                    item.select = true
                }else{
                    item.select = false
                }
            })
            return Object.assign({},state,{selectId: json.imCategoryId});
        default:
            return state
    }
}

const inintList = {
    vbhost: {
        code: -1,
        data: {
            datas: []
        }
    }

}

//本地暂存VB兑换数据
export function vblist(state = inintList, action) {
    let json = action.json;
    let key = action.key;
    switch (action.type) {
        case GET_VB_LIST:
            if (Object.keys(state).filter(item => item == key).length > 0) {
                state[key].data.datas = state[key].data.datas.concat(json.data.datas || [])
                state[key].data.pageOffset = json.data.pageOffset
                state[key].data.totalPage = json.data.totalPage
                state[key].code = json.code
            } else {
                state[key] = json
            }
            return Object.assign({}, state);
        default:
            return state
    }
}
