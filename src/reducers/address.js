//地址管理
import {GET_ADDRESS,GET_LIST_ADDRESS,CHECK_ADDRESS} from '../actions/address'

export  function address(state = "", action) {
    let json = action.json;
    switch (action.type) {
        case GET_ADDRESS:
        		console.dir(json)
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
            console.dir(json)
        	state.data.datas.map(item=>{
        		if(item.addressId == json.id){
        			Object.assign(item,{check:true})
        		}else{
        			Object.assign(item,{check:false})
        		}
        	})
        	return Object.assign({},state);
        default:
            return state
    }
}

