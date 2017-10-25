//地址管理
import {GET_COMMENTS,
	GET_IMPCOMMENT_DETAIL,
	GET_MY_COMMENT_LIST,GET_COMPLETED,EMPORTY,EMPTY_IMPCOMMENT_DETAIL} from '../actions/evaluation'

const inint={
	code:-1,
	data:[]
}
export  function comments(state = inint, action) {
    let json = action.json;
    switch (action.type) {
        case GET_COMMENTS:
          return Object.assign({},state,json);
        case EMPORTY :
        	return Object.assign({code:-1,data:[]})
        default:
            return state
    }
}

export  function impcommentdetail(state = {code:-1,data:{}}, action) {
    let json = action.json;
    switch (action.type) {
        case GET_IMPCOMMENT_DETAIL:
          return Object.assign({},state,json);
        case EMPTY_IMPCOMMENT_DETAIL:
            return Object.assign({code:-1,data:{}});
        default:
            return state
    }
}

export  function mycommentlist(state = {code:-1,data:{datas:[]}}, action) {
    let json = action.json;
    switch (action.type) {
        case GET_MY_COMMENT_LIST:
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
        default:
          return state
    }
}

export function mycompletedlist(state = {code:-1,data:{datas:[]}}, action) {
    let json = action.json;
    switch (action.type) {
        case GET_COMPLETED:
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
        default:
          return state
    }
}

