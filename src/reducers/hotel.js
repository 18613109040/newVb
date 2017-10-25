import {GET_HOTEL_ORDER_LIST} from '../actions/hotel'

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
    }
}
export  function hotelList(state = inint, action) {
    let json = action.json;
    switch (action.type) {
        case GET_HOTEL_ORDER_LIST:
        		if(json.status==0){
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
        		}else if(json.status==1){
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
        		}
        		else if(json.status==3){
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
        		}
        		else if(json.status==4){
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
        		}
        		else 
        			return state
            break;
        default:
            return state
    }
}