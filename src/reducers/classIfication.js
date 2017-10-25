import {GET_INFICATION_MENU,GET_INFICATION_LIST,ADD_INFICATION_LIST,CHANGE_INFICATION_MENU,GET_MENU_CHILDREN} from '../actions/classIfication'
import {storage} from '../utils/tools';
const inintinfiactionmenu={
	code:-1,
	data:[

	]
}
export  function infiactionmenu(state = inintinfiactionmenu, action) {
    let json = action.json;
    let data;
    switch (action.type) {
        case GET_INFICATION_MENU:
            json.data.map((item,index)=>{
                if(index ==0 ){
                    item.select=true;

                }else{
                    item.select=false;

                }
            })
            data=Object.assign({},state,json,{selectId: json.data[0].imCategoryId})
            storage.setObj({
                classIficationData: data
            })
            return data

        case CHANGE_INFICATION_MENU:
            state.data.map(item=>{
                if(item.imCategoryId == json.imCategoryId){
                    item.select = true
                }else{
                    item.select = false
                }
            })
            data=Object.assign({},state,{selectId: json.imCategoryId})
            storage.setObj({
                classIficationData: data
            })
            return data
        case GET_MENU_CHILDREN:
            let { imCategoryId } = action;
            state.data.map(item=>{
                if(item.imCategoryId == imCategoryId){
                    item.children=json.data
                }
            })
            data=Object.assign({},state)
            storage.setObj({
                classIficationData: data
            })
            return data
        default:
            return state
    }
}
const inintinfiactionlist={
	host:{
		code:-1,
		data:{
			datas:[]
		}
	}

}
export  function infiactionlist(state = inintinfiactionlist, action) {
    let json = action.json;
    let key = action.key;
    switch (action.type) {
        case GET_INFICATION_LIST:
        if(Object.keys(state).filter(item=>item==key).length>0){
        	state[key].data.datas = state[key].data.datas.concat(json.data.datas||[])
        	state[key].data.pageOffset=json.data.pageOffset
        	state[key].data.totalPage = json.data.totalPage
        	state[key].code = json.code
        }else{
        	state[key]=json
        }
        return Object.assign({},state);
        default:
            return state
    }
}

