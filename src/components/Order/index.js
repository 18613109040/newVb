/*
 * 立即购买
 */
import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {Tabs, Modal, Icon, Stepper,WhiteSpace,Toast ,Checkbox} from 'antd-mobile';
import CouponTem from "../../components/CouponTem";
import CommodityPrice from '../CommodityPrice';
import Img from '../Img'
import utils from '../../utils'

export class SelectedAddress extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

    }


    render() {
        let {datas} = this.props.listAddress.data;
        if (datas.length == 0) {
            return (
                <div className="address-item empty" onClick={() => {
                    this.context.router.push("/addresslist?select=true");
                }}>
                <span className="text">点此添加收货地址</span>
                <div className="aarrow"><Icon type={'right'} size='md'/></div>
                </div>
            )
        }
        datas = datas.filter(item => item.check == true)
        if(datas.length ==0) {
            return (
                <div className="address-item empty" onClick={() => {
                    this.context.router.push("/addresslist?select=true");
                }}><span className="text">点击选择收货地址</span>
                <div className="aarrow"><Icon type={'right'} size='md'/></div>
                </div>
            )
        }
        return (
            <div className="address-item" onClick={() => {
                this.context.router.push("/addresslist?select=true");
            }}>
                <div className="aleft"><i className="iconfont icon-address"></i></div>
                <div className="aright">
                    <div className="ap1">
                        <span><span className="as1">收货人：</span>{datas[0].contact}</span>
                        <span>{datas[0].phone}</span>
                    </div>
                    <WhiteSpace/>
                    <div className="ap2">
                        <span className="as1">收货地址：</span>
                        <span>{
                            datas[0].province +
                            datas[0].city +
                            datas[0].area +
                            datas[0].detail
                        }</span>
                    </div>
                </div>
                <div className="aarrow"><Icon type={'right'} size='md'/></div>
            </div>
        )
    }
}


export class ModalCoupons extends Component {
    static propTypes = {};
    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

    }

    render() {
        const {validList, invalidList} = this.props.memberProductCoupons.data;
        let {onClose} = this.props
        const tabs = [
            {title: `可用优惠券(${validList.length})`},
            {title: `不可用优惠券(${invalidList.length})`},
        ];
        return (
            <Modal
                popup
                visible={this.props.modal}
                maskClosable={true}
                animationType="slide-up"
            >
                <div className="vb-product-counp" >
                    <div className="title">
                        <span>优惠券</span>
                        <span className="colose" onClick={() => {
                            onClose()
                        }}><Icon type="cross"/></span>
                    </div>
                    <Tabs
                        tabs={tabs}
                    >
                        <div className="pop-hight">
                            {
                                validList.map((item, id) => (
                                    <CouponTem
                                        data={Object.assign({},
                                            item,
                                            {
                                                status: 7,
                                                useStartDate: item.useStartDt,
                                                useEndDate: item.useEndDt
                                            }
                                        )}
                                        radioCheck={(id) => {
                                            console.dir(id)
                                            this.props.radioCheck(id)
                                        }}
                                        key={id}
                                    />
                                ))
                            }
                        </div>

                        <div className="pop-hight">
                            {
                                invalidList.map((item, id) => (
                                    <CouponTem
                                        data={Object.assign({}, item, {
                                            status: 6,
                                            useStartDate: item.useStartDt,
                                            useEndDate: item.useEndDt
                                        })}
                                        key={id}
                                    />
                                ))
                            }
                        </div>
                    </Tabs>

                </div>
            </Modal>
        )
    }

}


export class OrderFooter extends Component {
    static propTypes = {};
    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

    }


    render() {
        let {money, vbmoney, goToTlement, availableVMoney} = this.props
        return (
            <div className="cart-fixed">

                <div className="left-money">
                    <span className="span-b">实付款:</span>
                    {
                        money > 0 ?
                            <span className="span-c">
                                    {/*<CommodityIcon iconType={1}/>{new Number(money).toFixed(2)}*/}
                                <div className="money-footer">
                                    <label className="iconfont icon-qian"></label>
                                    <span className="money">{new Number(money).toFixed(2)}</span>
                                </div>
                                </span> : ''
                    }
                    {
                        money > 0 & vbmoney > 0 ? <span className='line'>|</span> : null
                    }
                    {
                        vbmoney > 0 ? <span className="span-c">
                                {/*<CommodityIcon iconType={0}/>{vbmoney}*/}
                            <div className="money-footer">
                                <label className="iconfont icon-vbi"></label>
                                <span className="money">{vbmoney}</span>
                            </div>
                            </span> : ""
                    }

                </div>

                {(vbmoney <= availableVMoney) && ( money > 0 || vbmoney > 0 )?
                    <span className="btn-right-delete-block">
                        <div onClick={() => {
                            goToTlement(1)
                        }}>去结算</div>
                    </span> :
                    <span className="btn-right-no-block"><div>去结算</div></span>}


            </div>
        )
    }

}

export class OrderPriceInfo extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let {money, vbmoney, validList, checked, tempProduct, vbdiscount} = this.props
        return (
            <div className="step6">
            {
                money>0?
                <div className="item">
                    <span className="s1">商品总额:</span>
                    <span className="s2">
                        <span className="i_t"> {
                            <div className="f14">
                                <span>￥</span>
                                <span>{new Number(money).toFixed(2)}</span>
                            </div>
                    }</span>
                        </span>
                </div>:null
            }
           {/* {
                vbmoney>0?
                <div className="item">
                    <span className="s1">所需V币:</span>
                    <span className="s2">
                        <span className="i_t"> {
                            <div className="f14">
                                <span>{vbmoney} V币</span>
                            </div>
                    }</span>
                        </span>
                </div>:null
            }*/}

                {
                    money>0 && this.props.validList.filter(item => item.check == true).length > 0 ?
                        <div className="item">
                            <span className="s1">优惠券抵扣:</span>
                            <span className="s2">
                                {
                                    validList.filter(item => item.check == true).length > 0 ?
                                        (<div className="f14">
                                            <span>-￥</span>
                                            <span>{validList.filter(item => item.check == true)[0].cutMoney || 0}</span>
                                        </div>) : ""
                                }
                        </span>
                        </div> : ""
                }
               {/* 有现金商品时才显示*/}
                {
                    checked && money>0 ?
                        <div className="item">
                            <span className="s1">V币抵扣</span>
                            <span className="s2">
                               <div className="f14">
                                   <span>-￥</span>
                                   <span>{new Number(vbdiscount).toFixed(2)}</span>
                               </div>
                            </span>
                        </div> : ""
                }
                {/*<div className="item">*/}
                {/*<span className="s1">邮费:</span>*/}
                {/*{*/}
                {/*tempProduct[0].data.freight == 0?<span className="s2">包邮</span>:*/}
                {/*<span className="s2"><CommodityIcon iconType={tempProduct[0].data.productType} /><span className="i_t">{tempProduct[0].data.freight}</span></span>*/}
                {/*}*/}

                {/*</div>*/}

            </div>
        )
    }
}

export class Product extends Component {
    constructor(props) {
        super(props);
    }

 
    componentDidMount() {
     
    }
    onChangeStep =(imProductId, skuId,val) =>{
        this.props.onChangeStep(imProductId,skuId, val)
    }

    onChangeStep2 =(item,val) =>{
        let max=item.purchaseQuantity-item.refundedQuantity||0
        if(val>max)
        {
            Toast.fail('最大退单数为'+max, 1);
            return;
        }
        this.props.onChangeStep(item, val)
    }

    onChangeBox(item) {
        this.props.onChangeBox(item)
    }


    render() {
        let {item,  showStepper} = this.props //showStepper=1:立即购买时显示stepper，0:不显示stepper，2：退货退款时显示stepper
        return (
            <div className="shop-cart-item">
                {
                    showStepper==2?
                     <div className="checkbox-item-core">
                        <Checkbox checked={item.checked} onChange={this.onChangeBox.bind(this, item)}/>
                    </div>:null
                }
                <div className="shp-cart-item-core no-check">
                    <Link to={`/product?id=${item.imProductId}`}
                          className="cart-product-cell-1">
                        <Img src={item.thumbImg}/>
                    </Link>
                    <div className="cart-product-cell-2">
                        <div className="cart-product-name">
                            <Link to={`/product?id=${item.imProductId}`}>
                                <span
                                    className="non-fresh-txt">{item.name}</span>
                            </Link>
                        </div>
                        <div className="cart-product-prop">
                            {item.specDetail || ''}
                        </div>
                        <div className="cart-product-cell-3">
                            <span className="shp-cart-item-price ">
                                {
                                    item.productType == 1 ? (
                                        <div className="prod-price">
                                            <CommodityPrice
                                                price={new Number(item.retailPrice).toFixed(2)}
                                                unit=""
                                                iconStyle="base-icon"
                                                priceStyle="base-price"/>
                                        </div>) : (
                                        <div className="prod-price">
                                            <CommodityPrice
                                                price={item.exchangeIntegral}
                                                unit="V币"
                                                icon="icon-vbi"
                                                iconStyle="base-icon"
                                                priceStyle="base-price"
                                            />
                                        </div>)
                                }
                            </span>

                            <div className="quantity-wrapper">
                                {
                                    showStepper==1 ?
                                        <Stepper
                                            style={{width: '100%', minWidth: '2rem'}}
                                            showNumber
                                            max={9999}
                                            min={1}
                                            value={item.amount||1}
                                            defaultValue={1}
                                            onChange={this.onChangeStep.bind(this,item.imProductId,item.skuId)}


                                        /> : 
                                        showStepper==0 ?<span>x {item.amount}</span>
                                        :
                                        <Stepper
                                            style={{width: '100%', minWidth: '2rem'}}
                                            showNumber
                                            max={9999}
                                            min={1}
                                            value={item.amount||1}
                                            defaultValue={1}
                                            onChange={this.onChangeStep2.bind(this,item)}

                                        />
                                }

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export class ModalRule extends Component{
    constructor(props) {
        super(props);

    }
    render(){
        let {modal,onClose} =this.props
        return(
            <Modal
              visible={modal}
              transparent
              maskClosable={false}
              title="V币使用规则"
               footer={[{ text: '我知道了', onPress: () => { onClose(false) } }]}
                className={'rule-mask'}
            >
              <div className="modal-rule">
                <div className="rule">
                    <div className="title">使用条件</div>
                    <div className="ul">
                        <div className="li">1.订单金额大于10元(含)；</div>
                        <div className="li">2.V币数量大于650(含)；</div>
                        <div className="li">3.V币支付不得超过每笔订单金额的10%；</div>
                    </div>
                </div>
                <div className="rule">
                    <div className="title">使用数量</div>
                    <div className="ul">
                        <div className="li">1.使用V币数量为650V币的整数倍；</div>
                        <div className="li">2.650V币抵1元；</div>
                    </div>
                </div>
              </div>
            </Modal>
        )
    }
}


export class ModalTip extends Component{
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);

    }
    render(){
        let {modal,onClose} =this.props
        return(
            <Modal
              visible={modal}
              transparent
              maskClosable={false}
              title="提示"
              footer={[{ text: '再去逛逛', onPress: () => {onClose(false); this.context.router.push('/classification') } }]}
            >
              <div >
                商品金额小于优惠券面额，再去逛逛哦！
              </div>
            </Modal>
           
        )
    }
}

