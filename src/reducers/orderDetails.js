//地址管理
import {
    GET_ORDER_DETAILS, GET_TO_BE_PAID, GET_TO_BE_DELIVERED,
    GET_TO_BE_RECEIVED, GET_TO_BE_EVALUATED, GET_ORDER_BY_ID,
    EMPTY_ORDER, EMPTY_ORDER_DETAILS, GET_STATISTICS
} from '../actions/orderDetails'

const inint = {
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
    }
}

export function orderDetails(state = inint, action) {
    let json = action.json;
    switch (action.type) {
        case GET_ORDER_DETAILS:

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
