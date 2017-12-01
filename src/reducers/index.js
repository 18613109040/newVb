import {combineReducers} from 'redux'
import {bannerList,newList,product,areaActive,classicMenu,activeMenu,navBartitle} from './home'
import {activityProduct} from './activityProduct'
import {infiactionmenu ,infiactionlist} from './classIfication'
import * as Product from './product'
import {userInfo} from './user'
import {address,listAddress} from './address'
import * as orderDetails from './orderDetails'
import {comments,impcommentdetail,mycommentlist,mycompletedlist} from './evaluation'
import {vbCollection,caseCollection} from './collection'
import {newshelves,vbexchangemenu,vblist,explosionRecom} from './newShelves'
import {searchData} from './search'
import {userCoupon,couponCentre} from './coupon'
import {hostlist,hostData,hostdetails,hotelorder,ordercase} from './sblodge'
import {brandsale} from './brandSale'
import * as hotel from './hotel'
const rootReducer = combineReducers({
  bannerList,
  newList,
  product,
    couponCentre,
    classicMenu,
    explosionRecom,
    navBartitle,
    activeMenu,
  areaActive,
  activityProduct,
  infiactionmenu,
  infiactionlist,
  userInfo,
  address,
  listAddress,
  comments,
  impcommentdetail,
  mycommentlist,
  mycompletedlist,
  vbCollection,
  caseCollection,
  newshelves,
  vbexchangemenu,
  vblist,
  searchData,
  userCoupon,
  hostlist,
  hostData,
  hostdetails,
	hotelorder,
	ordercase,
    brandsale,
    ...hotel,
    ...orderDetails,
    ...Product
})

export default rootReducer
