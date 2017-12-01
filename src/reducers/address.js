//地址管理
import {GET_ADDRESS,GET_LIST_ADDRESS,CHECK_ADDRESS,EMPTY_LIST_ADDRESS,CLEAR_ADDRESS_CHECK} from '../actions/address'

export  function address(state = "", action) {
    let json = action.json;
    switch (action.type) {
        case GET_ADDRESS:

            return state = json;
        default:
            return state
    }
}
const inint={
	code:-1,
	data:{
		datas:[]
	}
}
export  function listAddress(state = inint, action) {
    let json = action.json;
    switch (action.type) {
        case GET_LIST_ADDRESS:
        	json.data.datas.map((item)=>{
        		if(item.isDefault == 1){
        			Object.assign(item,{check:true})
        		}else{
        			Object.assign(item,{check:false})
        		}
        	})
          return Object.assign({},state,json);
        case CHECK_ADDRESS:
        	state.data.datas.map(item=>{
        		if(item.addressId == json.id){
        			Object.assign(item,{check:true})
        		}else{
        			Object.assign(item,{check:false})
        		}
        	})
        	return Object.assign({},state);
        case CLEAR_ADDRESS_CHECK:
            state.data.datas.map(item=>{
               if(item.isDefault == 1){
                    Object.assign(item,{check:true})
                }else{
                    Object.assign(item,{check:false})
                }
            })
            return Object.assign({},state);
        case EMPTY_LIST_ADDRESS:
            return Object.assign({},inint)
        default:
            return state
    }
}

