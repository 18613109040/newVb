/*
 * 立即购买
 */
import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { List, Switch, InputItem, TextareaItem, Toast, Modal, WhiteSpace, WingBlank} from 'antd-mobile';
import CommodityPrice from '../../components/CommodityPrice';
import {CommodityIcon} from '../../components/Commodity';
import {
    getMemberProductCoupons,
    updateTempProduct,
    radioCheckStatus,
    settlement,
    deleteTempProductById
} from "../../actions/product";
import {getListAddress} from '../../actions/address'
import {emptyOrder} from '../../actions/orderDetails'
import NavBar from '../../components/NavBar'
import {ModalCoupons, SelectedAddress, OrderFooter, OrderPriceInfo, Product} from '../../components/Order'
import './index.less'
import {storage} from "../../utils/tools"
const Item = List.Item;
const alert = Modal.alert;

class BuyNow extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            express: "",
            remark: "",
            val: 0,
            modal: false,
            clientHeight:document.documentElement.clientHeight

        }
        this.goToTlement = this._goToTlement.bind(this)
        this.onChange = this._onChange.bind(this)

    }

    componentWillMount() {
        if (storage.get("userInfo")&&storage.get("userInfo").id !== undefined) {

        } else {
            this.context.router.push(`/login`)
        }
    }

    componentDidMount() {
        window.dispatchEvent(new Event('resize'));
        if (this.props.listAddress.code == -1) {
            this.props.dispatch(getListAddress({
                pageNow: 1,
                pageSize: 100
            }))
        }
        const {id, skuId} = this.props.location.query;
        let tempProduct = []
        if (skuId) {
            tempProduct = this.props.tempProduct.filter(item => item.data.imProductId == id && item.skuId == skuId)
        } else {
            tempProduct = this.props.tempProduct.filter(item => item.data.imProductId == id)
        }
        let obj = [];
        tempProduct.map((item) => {
            obj.push({
                amount: item.amount,
                productId: item.data.imProductId,
                productType: item.data.productType,
                skuId: item.skuId || "",
                specDetail: item.specDetail || ""
            })
        })
        //获取优惠券
        this.props.dispatch(getMemberProductCoupons(obj));

    }

    radioCheck = (id) => {
        console.dir(id)
        this.props.dispatch(radioCheckStatus({
            id: id
        }));
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
        const {id, skuId} = this.props.location.query;
        let tempProduct = []
        let products = []
        if (skuId) {
            tempProduct = this.props.tempProduct.filter(item => item.data.imProductId == id && item.skuId == skuId)
        } else {
            tempProduct = this.props.tempProduct.filter(item => item.data.imProductId == id)
        }
        tempProduct.map(item => {
            products.push({
                amount: item.amount,
                productId: item.data.imProductId,
                productType: item.data.productType,
                skuId: item.skuId,
                specDetail: item.specDetail
            })
        })
        const {validList} = this.props.memberProductCoupons.data;
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
                        id: id
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

    remarkClick = (value) => {
        this.setState({
            remark: value
        })
    }
    _onChange = (proid, val) => {
        this.setState({val});
        const {id, skuId} = this.props.location.query;
        let tempProduct = []
        if (skuId) {
            tempProduct = this.props.tempProduct.filter(item => item.data.imProductId == proid && item.skuId == skuId)
        } else {
            tempProduct = this.props.tempProduct.filter(item => item.data.imProductId == proid)
        }
        if (tempProduct.length > 0) {
            this.props.dispatch(updateTempProduct({
                id: proid,
                check: tempProduct[0].check,
                amount: val,
                skuId: tempProduct[0].skuId,
                specDetail: tempProduct[0].specDetail
            }));

        }
    }


    render() {

        let allMoney = 0;
        let vbmoney = 0;
        let vbdiscount = 0; //可抵扣
        let vbavailable = 0; //可用
        const {id, skuId} = this.props.location.query;
        let tempProduct = []
        if (skuId) {
            tempProduct = this.props.tempProduct.filter(item => item.data.imProductId == id && item.skuId == skuId)
        } else {
            tempProduct = this.props.tempProduct.filter(item => item.data.imProductId == id)
        }
        const {validList} = this.props.memberProductCoupons.data;
        tempProduct.map(item => {
            //productType 0 标识V币 1人民币
            if (item.data.productType == 0) {
                vbmoney += item.data.exchangeIntegral * item.amount
            } else {

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
        if (tempProduct.length == 0) {
            return (
                <div>
                    <div>改订单不存在</div>
                    <Link to="/home">返回首页</Link>
                </div>
            )
        }

        return (
            <div className="set-tlement">
                <NavBar title="确认订单" {...this.props}/>
                <div className="cart-group nav-content"
                     style={{height:this.state.clientHeight - 88}}>
                    <SelectedAddress {...this.props}/>
                    <div className="middle-box">
                        <div className="product-title">
                            <CommodityIcon iconType={tempProduct[0].data.productType}/>
                            {
                                tempProduct[0].data.productType == 0 ?
                                    <div className="type"><span>兑换产品</span>{/*<span className="tip">免邮费，查看邮费规则></span>*/}
                                    </div>
                                    :
                                    <div className="type"><span>支付产品</span><span className="tip">订单满¥99免邮费</span></div>
                            }
                        </div>
                        {
                            tempProduct[0].data.productType == 0 && this.props.userInfo.availableVMoney < vbmoney ?
                                <div className="product-type-show">
                                    <span
                                        className="aleft">您的V币只有{this.props.userInfo.availableVMoney}不够兑换此商品</span>
                                    <span className="aright" onClick={() => {
                                        this.context.router.push('/shopcart')
                                    }}>去修改></span>
                                </div> : null
                        }

                        <div className="step3">
                            <Product key={0} showStepper={true} val={this.state.val || tempProduct[0].amount} item={tempProduct[0]}
                                     onChange={(id, val) => {
                                         this.onChange(id, val)
                                     }}/>
                        </div>
                        {/*<div className="order-footer">*/}
                        {/*<span className="span">邮费：</span>*/}
                        {/*{*/}
                        {/*tempProduct[0].data.freight > 0 ?*/}
                        {/*<span><CommodityIcon*/}
                        {/*iconType={tempProduct[0].data.productType}/>{tempProduct[0].data.freight}</span>*/}
                        {/*: "包邮"*/}
                        {/*}*/}
                        {/*</div>*/}

                        <div className="order-footer">
                            <span className="span">共{this.state.val || tempProduct[0].amount}件商品，</span>
                            <span className="span">合计:</span>
                            {
                                tempProduct[0].data.productType == 1 ? (
                                    <div className="prod-price">
                                        <CommodityPrice
                                            price={new Number(allMoney).toFixed(2)}
                                            unit=""
                                            iconStyle="base-icon"
                                            priceStyle="base-price"/>
                                    </div>) : (
                                    <div className="prod-price">
                                        <CommodityPrice
                                            price={vbmoney}
                                            unit="V币"
                                            icon="icon-vbi"
                                            iconStyle="base-icon"
                                            priceStyle="base-price"
                                        />
                                    </div>)
                            }

                        </div>
                        <WhiteSpace/>
                        {/*使用优惠券 begin*/}
                        {
                            tempProduct[0].data.productType == 1 ? (
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
                                            <div className="f14">优惠券<i className="sitem-tip">{validList.length}张可用</i>
                                            </div>
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
                            ) : ""
                        }
                        {/*使用优惠券 end*/}

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
                        <OrderPriceInfo type={tempProduct[0].data.productType}
                                        money={allMoney}
                                        vbmoney={vbmoney}
                                        vbdiscount={vbdiscount}
                                        tempProduct={tempProduct}
                                        checked={this.state.checked}
                                        validList={validList}
                        />

                    </div>
                </div>

                <OrderFooter money={money}
                             vbmoney={vbmoney}
                             availableVMoney={this.props.userInfo.availableVMoney}
                             goToTlement={(type) => {
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

export default connect(mapStateToProps)(BuyNow)
