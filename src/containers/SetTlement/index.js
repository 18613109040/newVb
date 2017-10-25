/*
 * 结算界面
 */
import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { List, Switch, TextareaItem, Toast, Modal, WhiteSpace, WingBlank} from 'antd-mobile';
import CommodityPrice from '../../components/CommodityPrice';
import {CommodityIcon} from '../../components/Commodity';
import {getMemberProductCoupons, radioCheckStatus, settlement, deleteTempProductById} from "../../actions/product";
import {getListAddress} from '../../actions/address'
import CouponTem from "../../components/CouponTem";
import NavBar from "../../components/NavBar";
import {emptyOrder} from '../../actions/orderDetails'
import {ModalCoupons, SelectedAddress, OrderFooter, OrderPriceInfo, Product} from '../../components/Order'
import './index.less'

const Item = List.Item;
const alert = Modal.alert;

class SetTlement extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.couponId = "";
        this.checkmoney = 0;
        this.isFirst = true
        this.state = {
            checked: false,
            express: "",
            remark: "",
            modal: false,
            products: {
                vb_products: [],
                money_products: []
            },
            clientHeight:document.documentElement.clientHeight

        }
        this.goToTlement = this._goToTlement.bind(this)

    }

    componentWillMount() {
        if(this.props.userInfo.id !== undefined){

        }else{
            this.context.router.push(`/login`)
        }
    }
    componentDidMount() {
        if (this.props.listAddress.code == -1) {
            this.props.dispatch(getListAddress({
                pageNow: 1,
                pageSize: 100
            }))
        }
        let obj = [];
        this.props.tempProduct.filter(item => item.check == true).map((item) => {
            obj.push({
                amount: item.amount,
                productId: item.data.imProductId,
                productType: item.data.productType,
                skuId: item.skuId,
                specDetail: item.specDetail
            })
        })
        this.props.dispatch(getMemberProductCoupons(obj));

    }

    componentDidUpdate(prevProps, prevState) {


    }
    radioCheck = (id) => {
        this.props.dispatch(radioCheckStatus({
            id: id
        }));
        this.couponId = id;
        this.setState({modal: false})

    }

    switchClick = (value) => {
        this.setState({
            checked: value
        })
    }

    createMarkup(message) {
        return {__html: message};
    }

    submitEnter = () => {
        this.goToTlement(0)
    }

    _goToTlement(isSubmit) {
        if(this.props.listAddress.data.datas.filter(item => item.check == true).length==0){
            Toast.info("请添加收货地址",1)
            return;
        }
        let products = []
        let temId = []
        const {validList} = this.props.memberProductCoupons.data;
        let {tempProduct} =this.props
        tempProduct=tempProduct.filter(item => item.check == true && item.code==0)
        tempProduct.map(item => {
            products.push({
                amount: item.amount,
                productId: item.data.imProductId,
                productType: item.data.productType,
                skuId: item.skuId,
                specDetail: item.specDetail
            })
            temId.push(item.data.imProductId)
        })
        let postData = {
            addressId: this.props.listAddress.data.datas.filter(item => item.check == true)[0].addressId,
            express: this.state.express,
            isSubmit: isSubmit,
            orderFrom: 1,
            products: products,
            remark: this.state.remark
        }
        if (this.state.checked) {
            Object.assign(postData, {
                vbMoney: this.checkmoney
            })
        }

        if (validList.filter(item => item.check == true).length>0) {
            Object.assign(postData, {
                couponId: validList.filter(item => item.check == true)[0].id
            })
        }
        this.props.dispatch(settlement(postData
            , (res) => {
                if (res.code == 0) {
                    Toast.info(res.message, 1);
                    this.props.dispatch(emptyOrder());
                    this.context.router.replace(`/orderdetails?id=${res.data[0].orderId}`)
                    this.props.dispatch(deleteTempProductById({
                        id: temId.toString()
                    }))
                } else if (res.code == 9) {
                    alert('温馨提示', <div dangerouslySetInnerHTML={this.createMarkup(res.message)}></div>, [
                        {text: '取消', onPress: () => console.log('cancel')},
                        {text: '确定', onPress: this.submitEnter, style: {fontWeight: 'bold'}}
                    ])
                } else {
                    Toast.info(res.message, 2, null, false);
                }
            }))
    }

    expressClick = (value) => {
        this.setState({
            express: value
        })
    }
    remarkClick = (value) => {
        this.setState({
            remark: value
        })
    }

    renderProducts(vbmoney,exchangeShop,moneyShop) {
        return (
            <div>
                {
                    exchangeShop.length > 0 ?
                        <div className="products-content">
                            <div className="product-title">
                                <CommodityIcon iconType={0}/>
                                <div className="type"><span>兑换产品</span><span className="tip">免邮费，查看邮费规则></span></div>
                            </div>
                            {
                                this.props.userInfo.availableVMoney<vbmoney?(
                                    <div className="product-type-show">
                                        <span className="aleft">您的V币只有{this.props.userInfo.availableVMoney}不够兑换此商品</span>
                                        <span className="aright" onClick={() => {
                                            this.context.router.push('/shopcart')
                                        }}>去修改></span>
                                    </div>
                                ):""
                            }


                            <div className="step3">
                                {
                                    exchangeShop.map((item, i) => {
                                        return (
                                            <div key={i} className="order-product-content">
                                                <Product showStepper={false} item={item} onChange={(id, val) => {
                                                    this.onChange(id, val)
                                                }}/>
                                            </div>
                                        )

                                    })
                                }

                            </div>
                        </div>
                        : null
                }
                {
                    moneyShop.length > 0 ?
                        <div className="products-content">
                            <div className="product-title">
                                <CommodityIcon iconType={1}/>
                                <div className="type"><span>支付产品</span><span className="tip">订单满¥99免邮费</span></div>
                            </div>
                            <div className="step3">
                                {
                                    moneyShop.map((item, i) => {
                                        return (
                                            <div key={i} className="order-product-content">
                                                <Product showStepper={false} item={item} onChange={(id, val) => {
                                                    this.onChange(id, val)
                                                }}/>
                                            </div>
                                        )

                                    })
                                }

                            </div>
                        </div>
                        : null
                }
            </div>
        )
    }

    render() {
        let allMoney = 0;
        let vbmoney = 0;
        let vbdiscount = 0; //可抵扣
        let vbavailable = 0; //可用
        const tempProduct = this.props.tempProduct.filter(item => item.check == true && item.code==0);
        const {validList} = this.props.memberProductCoupons.data;
        tempProduct.map(item => {
            //productType 0 标识V币 1人民币
            if (item.data.productType == 0) {
                if (item.check)
                    vbmoney += item.data.exchangeIntegral * item.amount
            } else {
                if (item.check)
                    allMoney += item.data.retailPrice * item.amount
            }
        })

        if (this.props.userInfo.availableVMoney / 650 >= allMoney * 0.1) {
            vbdiscount = parseInt(allMoney * 0.1);
            vbavailable = parseInt(allMoney * 0.1) * 650
        } else {
            vbdiscount = parseInt(this.props.userInfo.availableVMoney / 650);
            vbavailable = parseInt(this.props.userInfo.availableVMoney / 650) * 650;
        }
        let money = allMoney;
        if (this.state.checked) {
            money = money - vbdiscount
        }
        if (validList.filter(item => item.check == true).length > 0) {
            money = money - validList.filter(item => item.check == true)[0].cutMoney
        }
        let exchangeShop = tempProduct.filter(item => item.data.productType == 0);
        let moneyShop = tempProduct.filter(item => item.data.productType == 1);
        this.checkmoney = vbavailable;
        return (
            <div className="set-tlement">
                <NavBar title="确认订单" {...this.props}></NavBar>
                <div className="cart-group nav-content" style={{height: this.state.clientHeight - 88}}>
                    <SelectedAddress {...this.props}/>
                    <div className="middle-box">
                        {this.renderProducts(vbmoney,exchangeShop,moneyShop)}
                        <WhiteSpace/>
                        <div className="step4">
                            <List>
                                <Item
                                    arrow="horizontal"
                                    onClick={() => {
                                        this.setState({modal: true})
                                    }}
                                    extra={
                                        validList.filter(item => item.check == true).length > 0 ?
                                            (<div className="f14">
                                                <span>-￥</span>
                                                <span>{validList.filter(item => item.check == true)[0].cutMoney}</span>
                                            </div>) : ""
                                    }
                                >
                                    <div className="f14">优惠券<i className="sitem-tip">{validList.length}张可用</i></div>
                                </Item>
                                <Item
                                    extra={
                                        <Switch
                                            checked={this.state.checked}
                                            onClick={this.switchClick}
                                            color={'#FFDB53'}
                                        />}
                                    wrap
                                    onClick={() => {
                                    }}>
                                    <div className="f12">
                                        <span>V币:</span>
                                        <span
                                            className="size">共{this.props.userInfo.availableVMoney}币,可用{vbavailable}V币,抵{vbdiscount}</span>
                                    </div>
                                </Item>
                            </List>
                        </div>


                        <WhiteSpace/>
                        <div className="step5">
                            <List>
                                <TextareaItem
                                    title="买家备注:"
                                    clear
                                    autoHeight
                                    value={this.state.remark}
                                    onChange={this.remarkClick}
                                    placeholder="收货备注"
                                    onBlur={(v) => { this.setState({
                                        clientHeight:document.documentElement.clientHeight
                                    }) }}
                                    maxLength={100}
                                />
                            </List>
                        </div>
                        <WhiteSpace/>
                        <OrderPriceInfo type={1} money={allMoney} vbmoney={vbmoney} vbdiscount={vbdiscount}
                                        tempProduct={tempProduct} checked={this.state.checked} validList={validList}
                        />

                    </div>
                </div>
                <OrderFooter money={money} vbmoney={vbmoney} availableVMoney={this.props.userInfo.availableVMoney}  goToTlement={(type) => {
                    this.goToTlement(type)
                }}/>
                <ModalCoupons {...this.props} modal={this.state.modal} onClose={() => {
                    this.setState({modal: false})
                }} radioCheck={(id, e) => {
                    this.radioCheck(id, e)
                }}/>

            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        tempProduct: state.tempProduct,
        userInfo: state.userInfo,
        listAddress: state.listAddress,
        memberProductCoupons: state.memberProductCoupons
    }
}

export default connect(mapStateToProps)(SetTlement)
