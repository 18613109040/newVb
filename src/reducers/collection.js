//地址管理
import {GET_VB_COLLECTION,EMPOTY_COLLECATION,GET_CASE_COLLECTION,EMPOTY_CASE_COLLECATION} from '../actions/collection'
export function vbCollection(state = {code:-1,data:{datas:[]}}, action) {
    let json = action.json;
    switch (action.type) {
        case GET_VB_COLLECTION:
        	console.dir(json.data.datas)
        	return Object.assign({},{
	        		code:json.code,
	        		data:{
	        			datas:[].concat(state.data.datas,json.data.datas||[]),
	        			pageOffset:json.data.pageOffset,
	        			pageSize:json.data.pageSize,
	        			totalPage:json.data.totalPage,
	        			totalRecord:json.data.totalRecord
	        		}
        		}
        	)
        case EMPOTY_COLLECATION:
	        return Object.assign({
	        	code:-1,
	        	data:{datas:[]}
	        })
        default:
          return state
    }
}

export function caseCollection(state = {code:-1,data:{datas:[]}}, action) {
    let json = action.json;
    switch (action.type) {
        case GET_CASE_COLLECTION:
        	return Object.assign({},{
	        		code:json.code,
	        		data:{
	        			datas:[].concat(state.data.datas,json.data.datas||[]),
	        			pageOffset:json.data.pageOffset,
	        			pageSize:json.data.pageSize,
	        			totalPage:json.data.totalPage,
	        			totalRecord:json.data.totalRecord
	        		}
        		}
        	)
     		case EMPOTY_CASE_COLLECATION :
     			return Object.assign({
	        	code:-1,
	        	data:{datas:[]}
	        })
        default:
          return state
    }
}


