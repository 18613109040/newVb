import {GET_ACTIVE_LIST,ADD_ACTIVE_LIST,EMPTY_ACTIVE_LIST} from '../actions/activityProduct.js'

const inintareractive={
	code:-1,
	data:{
		datas:[]

	}


}
export  function activityProduct(state = inintareractive, action) {
    let json = action.json;
    switch (action.type) {
        case GET_ACTIVE_LIST:
            return Object.assign({}, {
                data: {
                    pageOffset: json.data.pageOffset,
                    pageSize: json.data.pageSize,
                    totalPage: json.data.totalPage,
                    totalRecord: json.data.totalRecord,
                    datas: [].concat(state.data.datas, json.data.datas)
                }
            }, {code: json.code});
        case EMPTY_ACTIVE_LIST :
            return Object.assign({}, inintareractive)
        case ADD_ACTIVE_LIST:
        return Object.assign({}, state, {data:{datas:state.data.datas.concat( json.data.datas||[])}});

        default:
            return state
    }
}
