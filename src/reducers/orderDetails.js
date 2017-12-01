//地址管理
import {
    GET_ORDER_DETAILS, GET_TO_BE_PAID, GET_TO_BE_DELIVERED,
    GET_TO_BE_RECEIVED, GET_TO_BE_EVALUATED, GET_ORDER_BY_ID,
    EMPTY_ORDER, EMPTY_ORDER_DETAILS, GET_STATISTICS,
    ADD_AFTERSALE_PRODCUTS,UPDATE_AFTERSALE_PRODCUTS,CHECK_ALL_AFTERSALE_PRODCUTS, APPLY_REFUND_INIT,
    APPLY_REFUND_DELIVERY_INIT,GET_REFUND_LIST,GET_REFUND_DETAIL,GET_REFUND_HISTORY,GET_REFUND_DETAIL2
} from '../actions/orderDetails'
import {storage} from '../utils/tools';
const inint = {
    code: -1,
    all: {
        code: -1,
        data: {
            datas: [],
            pageOffset:0
        }
    },
    paid: {
        code: -1,
        data: {
            datas: [],
            pageOffset:0
        }
    },
    delivered: {
        code: -1,
        data: {
            datas: [],
            pageOffset:0
        }
    },
    received: {
        code: -1,
        data: {
            datas: [],
            pageOffset:0
        }
    },
    evaluated: {
        code: -1,
        data: {
            datas: [],
            pageOffset:0
        }
    },refunded:{
        code: -1,
        data: {
            datas: [],
            pageOffset:0
        }
    }
}

export function orderDetails(state = inint, action) {
    let json = action.json;
    switch (action.type) {
        case GET_ORDER_DETAILS:
            if(json.data.pageOffset == state.all.data.pageOffset){
                return Object.assign({},state)
            }
            return Object.assign({}, state, {
                all: {
                    code: json.code,
                    data: {
                        datas: [].concat(state.all.data.datas, json.data.datas || []),
                        pageOffset: json.data.pageOffset,
                        pageSize: json.data.pageSize,
                        totalPage: json.data.totalPage,
                        totalRecord: json.data.totalRecord
                    }

                }, code: 0
            });

        case GET_TO_BE_PAID:
            if(json.data.pageOffset == state.paid.data.pageOffset){
                return Object.assign({},state)
            }
            return Object.assign({}, state, {
                paid: {
                    code: json.code,
                    data: {
                        datas: [].concat(state.paid.data.datas, json.data.datas || []),
                        pageOffset: json.data.pageOffset,
                        pageSize: json.data.pageSize,
                        totalPage: json.data.totalPage,
                        totalRecord: json.data.totalRecord
                    }

                }, code: 0
            });

        case GET_TO_BE_DELIVERED:
            if(json.data.pageOffset == state.delivered.data.pageOffset){
                return Object.assign({},state)
            }
            return Object.assign({}, state, {
                delivered: {
                    code: json.code,
                    data: {
                        datas: [].concat(state.delivered.data.datas, json.data.datas || []),
                        pageOffset: json.data.pageOffset,
                        pageSize: json.data.pageSize,
                        totalPage: json.data.totalPage,
                        totalRecord: json.data.totalRecord
                    }

                }, code: 0
            });

        case GET_TO_BE_RECEIVED:
            if(json.data.pageOffset == state.received.data.pageOffset){
                return Object.assign({},state)
            }
            return Object.assign({}, state, {
                received: {
                    code: json.code,
                    data: {
                        datas: [].concat(state.received.data.datas, json.data.datas || []),
                        pageOffset: json.data.pageOffset,
                        pageSize: json.data.pageSize,
                        totalPage: json.data.totalPage,
                        totalRecord: json.data.totalRecord
                    }

                }, code: 0
            });

        case GET_TO_BE_EVALUATED:

            if(json.data.pageOffset == state.evaluated.data.pageOffset){

                return Object.assign({},state)
            }
            return Object.assign({}, state, {
                evaluated: {
                    code: json.code,
                    data: {
                        datas: [].concat(state.evaluated.data.datas, json.data.datas || []),
                        pageOffset: json.data.pageOffset,
                        pageSize: json.data.pageSize,
                        totalPage: json.data.totalPage,
                        totalRecord: json.data.totalRecord
                    }

                }, code: 0
            });
        case GET_REFUND_LIST:
            if(json.data.pageOffset == state.refunded.data.pageOffset){
                return Object.assign({},state)
            }
            return Object.assign({}, state, {
                refunded: {
                    code: json.code,
                    data: {
                        datas: [].concat(state.refunded.data.datas, json.data.datas || []),
                        pageOffset: json.data.pageOffset,
                        pageSize: json.data.pageSize,
                        totalPage: json.data.totalPage,
                        totalRecord: json.data.totalRecord
                    }

                }, code: 0
            });

        case EMPTY_ORDER :
            return Object.assign({
                code: -1,
                all: {
                    code: -1,
                    data: {
                        datas: []
                    }
                },
                paid: {
                    code: -1,
                    data: {
                        datas: []
                    }
                },
                delivered: {
                    code: -1,
                    data: {
                        datas: []
                    }
                },
                received: {
                    code: -1,
                    data: {
                        datas: []
                    }
                },
                evaluated: {
                    code: -1,
                    data: {
                        datas: []
                    }
                },
                refunded:{
                    code: -1,
                    data: {
                        datas: []
                    }
                }

            })
        default:
            return state
    }
}

export function orderlist(state = {code: -1, data: {order1s: []}}, action) {
    let json = action.json;
    switch (action.type) {
        case GET_ORDER_BY_ID:
            return Object.assign({}, state, json);
        case EMPTY_ORDER_DETAILS:
            return Object.assign({code: -1, data: {order1s: []}});
        default:
            return state
    }
}

const inintstaticsnumber = {
    code: -1,
    data: {
        hasDeliveNum: 0,
        hasReceivedNum: 0,
        refundDoingNum: 0,
        refundFailNum: 0,
        refundSuccessNum: 0,
        waitEvaluateNum: 0,
        waitExamineNum: 0,
        waitPayNum: 0,
        waitShipNum: 0,
    }
}

export function statisicsNumber(state = inintstaticsnumber, action) {
    let json = action.json;
    switch (action.type) {
        case GET_STATISTICS:
            return Object.assign({}, state, json);
        default:
            return state
    }
}



export function afterSaleProducts(state = {}, action) {
    let json = action.json;
    switch (action.type) {
        case ADD_AFTERSALE_PRODCUTS:
            storage.setObj({
                 afterSaleProducts: json
            })
            return json;
        case UPDATE_AFTERSALE_PRODCUTS:
            let {order1Id,amount,checked} = json;
            console.dir(state)
            let tem = state.order1s.filter(item => item.order1Id == order1Id )
            tem[0].amount = amount;
            tem[0].checked = checked;

            let checkedPro=state.order1s.filter(item => item.checked)
            if(checkedPro.length == state.order1s.length){
                state.allChecked=true
            }else
              state.allChecked=false
            storage.setObj({
                afterSaleProducts: state
            })
            return Object.assign({}, state);
        case CHECK_ALL_AFTERSALE_PRODCUTS:
            state.allChecked=!state.allChecked
            state.order1s.map(item => {
                item.checked=state.allChecked
            })
            storage.setObj({
                afterSaleProducts: state
            })
            return Object.assign({}, state);

        default:
            let products=storage.get('afterSaleProducts')||{}
            state = !products.orderId ? state:products
            return state
    }
}

const refundInit={
    code:-1,
    data:{}
}
//获取申请退款退货初始化信息
export function applyRefundInit(state =refundInit, action) {
    let json = action.json;
    switch (action.type) {
        case APPLY_REFUND_INIT:
            return Object.assign({}, state, json);

        default:
            return state
    }
}

//获取提交货运信息界面初始化信息
export function deliveryInit(state =[], action) {
    let json = action.json;
    switch (action.type) {
        case APPLY_REFUND_DELIVERY_INIT:
            if(json.code==0){
                let obj=[]
                json.data.map((item,i)=>{
                    let o={value:item.id,label:item.text}
                    obj.push(o)
                })
            return obj
            }else
            return state
        default:
            return state
    }
}


export function refundDetail(state ={}, action) {
    let json = action.json;
    switch (action.type) {
        case GET_REFUND_DETAIL:
            return json
        default:
            return state
    }
}
export function refundDetail2(state ={}, action) {
    let json = action.json;
    switch (action.type) {
        case GET_REFUND_DETAIL2:
            return json
        default:
            return state
    }
}


export function refundHistory(state = refundInit,action){
    let json = action.json;
    switch (action.type) {
        case GET_REFUND_HISTORY:
            return json
        default:
            return state
    }
}
