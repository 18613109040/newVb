import {GET_USER_COUPONS,SELECT_COUPONS,CHANGE_COUPONS_CENTRE,EMPTY_COUPONS_CENTRE} from '../actions/coupon'
const initialState ={
  code: -1,
  data:{
  	expiredList:[],
  	hasUsedList:[],
  	notUsedList:[]
  } ,
  message:"初始数据"
};
export  function userCoupon(state = initialState, action) {
    let json = action.json;
    switch (action.type) {
        case GET_USER_COUPONS:
            return Object.assign({},state,json);
        default:
            return state
    }
}

export  function couponCentre(state = {code:-1,data:{datas:[]}}, action) {
    let json = action.json;
    switch (action.type) {
        case SELECT_COUPONS:
            return Object.assign({},{
                code:json.code,
                data:{
                    datas: [].concat(state.data.datas, json.data.datas || []),
                    pageOffset:json.data.pageOffset,
                    pageSize:json.data.pageSize,
                    totalPage:json.data.totalPage,
                    totalRecord:json.data.totalRecord
                },

            });
        case CHANGE_COUPONS_CENTRE:
            state.data.datas.map(item=>{
                if(item.id == json.id){
                    item.hasGet = 1
                }
            })
            return Object.assign({},state)
        case EMPTY_COUPONS_CENTRE :
            return Object.assign({},{code:-1,data:{datas:[]}})
        default:
            return state
    }
}
