/*
 * 立即购买
 */
import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { List, Switch, TextareaItem, Toast, Modal, WhiteSpace, WingBlank} from 'antd-mobile';
import CommodityPrice from '../../components/CommodityPrice';
import {CommodityIcon} from '../../components/Commodity';
import {
    getMemberProductCoupons,
    updateBuyProduct,
    radioCheckStatus,
    settlement,
    deleteBuyProduct
} from "../../actions/product";
import {getListAddress,clearAddressCheck} from '../../actions/address'
import {emptyOrder} from '../../actions/orderDetails'
import {ModalCoupons, SelectedAddress, OrderFooter, OrderPriceInfo, Product,ModalRule,ModalTip} from '../../components/Order'
import './index.less'
import {storage} from "../../utils/tools"
import {changeNavbarTitle} from '../../actions/home'
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
            checked: true,  //是否选中优惠券
            express: "",
            remark: "",
            val: 0,
            modal: false,
            clientHeight:document.documentElement.clientHeight,
            modal_rule_visible:false, //规则弹框
            modal_tip_visible:true

        }
        this.goToTlement = this._goToTlement.bind(this)

    }

    componentWillMount() {
        this.props.dispatch(changeNavbarTitle("确认订单"))
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
        let {buyProduct} = this.props

        let obj=[]
        obj.push({
            amount: buyProduct[0].amount,
            productId: buyProduct[0].imProductId,
            productType: buyProduct[0].productType,
            skuId: buyProduct[0].skuId || "",
            specDetail: buyProduct[0].specDetail || ""
        })

        //获取优惠券
        this.props.dispatch(getMemberProductCoupons(obj));

    }

    componentWillUnmount(){
        this.props.dispatch(clearAddressCheck())
    }
    radioCheck = (id) => {
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

    //提交
    _goToTlement(isSubmit) {
        if(this.props.listAddress.data.datas.filter(item => item.check == true).length==0){
            Toast.info("请添加收货地址",1)
            return;
        }
        Toast.loading('请稍后...', 1, () => {
        });
        const {id, skuId} = this.props.location.query;
        let {buyProduct} =this.props
        let obj=[]
        obj.push({
            amount: this.state.val || buyProduct[0].amount,
            productId: buyProduct[0].imProductId,
            productType: buyProduct[0].productType,
            skuId: buyProduct[0].skuId || "",
            specDetail: buyProduct[0].specDetail || ""
        })
        const {validList} = this.props.memberProductCoupons.data;
        let postData = {
            addressId: this.props.listAddress.data.datas.filter(item => item.check == true)[0].addressId,
            express: this.state.express,
            isSubmit: isSubmit,
            orderFrom: 1,
            products: obj,
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
                Toast.hide();
                if (res.code == 0) {
                    Toast.info(res.message, 1);
                    this.props.dispatch(emptyOrder());
                    this.context.router.replace(`/orderdetails?id=${res.data[0].orderId}`)
                    this.props.dispatch(deleteBuyProduct())  //清空立即购买数据
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
    //商品数量加减
    onChangeStep(proid,skuId, val){
        this.setState({
            val
        })
        let {buyProduct} =this.props
        if (buyProduct.length > 0) {
            this.props.dispatch(updateBuyProduct({
                id: proid,
                check: true,
                amount: val,
                skuId: skuId,
                specDetail: buyProduct[0].specDetail
            }));

        }
    }
    clickTipModal = (boolen,type) =>{
        this.setState({
            [type]:boolen
        })
    }


    render() {

        let allMoney = 0;
        let vbmoney = 0;
        let vbdiscount = 0; //可抵扣
        let vbavailable = 0; //可用
        const {id, skuId} = this.props.location.query;
        let {buyProduct} = this.props
        const {validList} = this.props.memberProductCoupons.data;
        let {availableVMoney} =this.props.userInfo
        buyProduct.map(item => {
            //productType 0 标识V币 1人民币
            if (item.productType == 0) {
                vbmoney += item.exchangeIntegral * item.amount
            } else {

                allMoney += item.retailPrice * item.amount
            }
        })

        if (availableVMoney / 650 >= allMoney * 0.1) {
            vbdiscount = parseInt(allMoney * 0.1);
            vbavailable = parseInt(allMoney * 0.1) * 650
        } else {
            vbdiscount = parseInt(availableVMoney / 650);
            vbavailable = parseInt(availableVMoney / 650) * 650;
        }
        let money = allMoney;
        if (this.state.checked) {
            money = money - vbdiscount
        }
        if (validList.filter(item => item.check == true).length > 0) {
            money = money - validList.filter(item => item.check == true)[0].cutMoney
        }
        this.checkmoney = vbavailable;
        if(buyProduct.length==0)  return null
        return (
            <div className="set-tlement">
                <div className="cart-group nav-content"
                     style={{height:this.state.clientHeight - 88}}>
                    <SelectedAddress {...this.props}/>
                    <div className="middle-box">
                        <div className="product-title">
                            <CommodityIcon iconType={buyProduct[0].productType}/>
                            {
                                buyProduct[0].productType == 0 ?
                                    <div className="type"><span>兑换产品</span>{/*<span className="tip">免邮费，查看邮费规则></span>*/}
                                    </div>
                                    :
                                    <div className="type"><span>支付产品</span><span className="tip">订单满¥99免邮费</span></div>
                            }
                        </div>
                        {
                            buyProduct[0].productType == 0 && availableVMoney < vbmoney ?
                                <div className="product-type-show">
                                    <span
                                        className="aleft">您的V币只有{availableVMoney}不够兑换此商品</span>
                                    <span className="aright" onClick={() => {
                                        this.context.router.push('/shopcart')
                                    }}>去修改></span>
                                </div> : null
                        }

                        <div className="step3">
                            <Product key={0} showStepper={1}  item={buyProduct[0]}
                                     onChangeStep={(productId,skuId, val) => {
                                         this.onChangeStep(productId,skuId, val)
                                     }}/>
                        </div>
                        {/*<div className="order-footer">*/}
                        {/*<span className="span">邮费：</span>*/}
                        {/*{*/}
                        {/*buyProduct[0].data.freight > 0 ?*/}
                        {/*<span><CommodityIcon*/}
                        {/*iconType={buyProduct[0].data.productType}/>{buyProduct[0].data.freight}</span>*/}
                        {/*: "包邮"*/}
                        {/*}*/}
                        {/*</div>*/}

                        <div className="order-footer">
                            <span className="span">共{this.state.val || buyProduct[0].amount}件商品，</span>
                            <span className="span">合计:</span>
                            {
                                buyProduct[0].productType == 1 ? (
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
                            buyProduct[0].productType == 1 ? (
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
                                                    className="size">共{availableVMoney}币,可用{vbavailable}V币,抵￥{new Number(vbdiscount).toFixed(2)}</span>
                                                <i className="iconfont icon-question" onClick={this.clickTipModal.bind(this,true,'modal_rule_visible')}></i>
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
                        <OrderPriceInfo
                                        money={allMoney}
                                        vbmoney={vbmoney}
                                        vbdiscount={vbdiscount}
                                        buyProduct={buyProduct}
                                        checked={this.state.checked}
                                        validList={validList}
                        />

                    </div>
                </div>

                <OrderFooter money={money}
                             vbmoney={vbmoney}
                             availableVMoney={availableVMoney}
                             goToTlement={(type) => {
                                 this.goToTlement(type)
                             }}/>

                {/*优惠券弹框*/}
                <ModalCoupons {...this.props} modal={this.state.modal} onClose={() => {
                    this.setState({modal: false})
                }} radioCheck={(id, e) => {
                    this.radioCheck(id, e)
                }}/>

               {/* V币使用规则弹框*/}
                <ModalRule modal={this.state.modal_rule_visible} onClose={(boolen)=>{this.clickTipModal(boolen,'modal_rule_visible')}} />

               {/* 商品金额小于优惠券面额时，增加提示用户：商品金额小于优惠券面额，再去逛逛哦！*/}
              {/*  {
                    this.state.modal_tip_visible?<ModalTip modal={ money <0}  onClose={(boolen)=>{this.clickTipModal(boolen,'modal_tip_visible')}}/>:null
                }*/}

            </div>
        )

    }


}


function mapStateToProps(state) {
    return {
        buyProduct: state.buyProduct,
        userInfo: state.userInfo,
        listAddress: state.listAddress,
        memberProductCoupons: state.memberProductCoupons
    }
}

export default connect(mapStateToProps)(BuyNow)
