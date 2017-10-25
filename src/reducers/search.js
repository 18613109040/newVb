import {IMPRODUCT_SEARCH,EMPTY_SEARCH} from '../actions/search'

const initialState ={
  code: -1,
  data:{
  	datas:[]
  } ,
  message:"初始数据"
};
export  function searchData(state = initialState, action) {
    let json = action.json;
    switch (action.type) {
        case IMPRODUCT_SEARCH:
            return Object.assign({},state,json);
        case EMPTY_SEARCH:
         return Object.assign(
         				{ code: -1,
								  data:{
								  	datas:[]
								  } ,
								message:"初始数据"});
        default:
            return state
    }
}


