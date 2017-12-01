import {GET_BANNER_LIST, GET_NEW_LIST, GET_PRODUCT_LIST, GET_AREAACTIVITY,CHNEGE_NAVBAR_TITLE} from '../actions/home'
import {storage} from "../utils/tools"
const initialState = {
    code: -1,
    data: [
        {
            imAdvertId: "b7fd6a96-b9ba-4602-84c0-166cc044a714",
            imProductId: "5",
            imageUrl: "",
            isShow: "",
            linkUrl: "",
            name: "喜迎国庆  洪荒巨惠",
            sortIndex: "",
            ypeId: 3
        }
    ],
    message: "初始数据"
};

export function bannerList(state = initialState, action) {
    let json = action.json;
    switch (action.type) {
        case GET_BANNER_LIST:
            return Object.assign({}, state, json);
        default:
            return state
    }
}


const inintnewListState = {
    code: -1,
    data: [
        {
            title: 'V币商城全新改版,更多惊喜停不下来!!'
        },
        {
            title: '为全中国思埠经销商提供全球最低价产品'
        },
        {
            title: '最低价的产品统统在这里,欢迎去淘宝比价'
        }
    ]

}

export function newList(state = inintnewListState, action) {
    let json = action.json;
    switch (action.type) {
        case GET_NEW_LIST:
            return Object.assign({}, state, json);
        default:
            return state
    }
}

const inintproduct = {
    code: -1,
    data: [
        {
            categoryType: 0,
            childCategoryId: "",
            childs: "",
            imageUrl: "",
            name: "V币热兑",
            products: [],
            sortIndex: 1
        }, {
            categoryType: 1,
            childCategoryId: "",
            childs: "",
            imageUrl: "",
            name: "商品热卖",
            products: [],
            sortIndex: 2
        }
    ]
}

export function product(state = inintproduct, action) {
    let json = action.json;
    switch (action.type) {
        case GET_PRODUCT_LIST:
            return Object.assign({}, state, json);
        default:
            return state
    }
}

const inintareractive = {
    code: -1,
    data: [

    ]
}

export function areaActive(state = inintareractive, action) {
    let json = action.json;
    switch (action.type) {
        case GET_AREAACTIVITY:
            return Object.assign({}, state, json);
        default:
            return state
    }
}

const inintclassicmenu = {
    code: -1,
    data: [
        {
            icon: require('../assets/images/yugou.png'),
            text: "云购",
            href: `http://kuaigou.sibu.cn/`,
            id: 1
        },
        {
            icon: require('../assets/images/xinping.png'),
            text: "新品",
            href: "/newshelves",
            id: 1
        }, {
            icon: require('../assets/images/baokuan.png'),
            text: "爆款",
            href: "/explosionRecom",
            id: 2
        }, {
            icon: require('../assets/images/rendui.png'),
            text: "热兑",
            href: "/vbexchange?id=ad32d726-8544-45ee-a53b-0d67351752a4",
            id: 3
        },
        // {
        //     icon: require('../assets/images/kezhang.png'),
        //     text: "客栈",
        //     href: "/sblodge",
        //     id: 4
        // }
    ]
}

export function classicMenu(state = inintclassicmenu) {
    return state
}

const inintactive = {
    code: -1,
    data: [{
        title: "优惠券",
        description: "狂撒一亿现金券还在等什么",
        image: require("../assets/images/coupon.png"),
        path:"/couponCentre"
    }, {
        title: "全球购",
        description: "全球商品任您挑",
        image: require("../assets/images/quanqiugou.png"),
        path:`http://kuaigou.sibu.cn/activity/happy-list`
    }, {
        title: "特价专区",
        description: "价格低至你无法想象",
        image: require("../assets/images/dejia.png"),
        path:"/activityProduct?id=73"
    }, {
        title: "品牌特卖",
        description: "超值优惠精选好货",
        image: require("../assets/images/pingpai.png"),
        path:"/brandsale"
    }]
}

export function activeMenu(state = inintactive) {
    return state
}

export  function  navBartitle(state={title:""},action) {
    let title = action.title;
    switch (action.type) {
        case CHNEGE_NAVBAR_TITLE:
            return Object.assign({},{title:title});
        default:
            return state;
    }
}
