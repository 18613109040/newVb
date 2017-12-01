//我的订单
import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { List, Modal, Toast, WhiteSpace} from 'antd-mobile';
import {getOrderById, cancalOrder, emptyOrder, emptyOrderDetails, received,setAfterSaleProducts} from '../../actions/orderDetails'
import './index.less'
import {changeNavbarTitle} from '../../actions/home'
import utils from '../../utils'
const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;

class OrderDetails extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            modal: false,

        }
        this.back = this._back.bind(this)
    }
    componentWillMount() {
        this.props.dispatch(changeNavbarTitle("订单详情"))
    }
    componentDidMount() {
        const {id} = this.props.location.query;
        this.props.dispatch(getOrderById(id))
    }


    componentDidUpdate(prevProps, prevState) {

    }

    _back() {
        this.props.router.goBack();
    }

    componentWillUnmount() {
        this.props.dispatch(emptyOrderDetails())
    }

    linkProduct(productId) {
        this.context.router.push(`/product?id=${productId}`)
    }

    cancelOrder = () => {
        const {id} = this.props.location.query;
        alert('取消订单', '确定要取消该订单吗?', [
            {text: '取消'},
            {
                text: '确定', onPress: () => {
                this.props.dispatch(cancalOrder(id, {}, (res) => {
                    if (res.code == 0) {
                        Toast.success(res.message, 1);
                        this.props.dispatch(emptyOrder())
                        this.props.router.goBack();

                    } else {
                        Toast.fail(res.message, 1);
                    }
                }))
            },
                style: {fontWeight: 'bold'}
            },
        ])

    }

    payNow = () => {
        const {id} = this.props.location.query;
        this.context.router.push(`/choosePayType?id=${id}`)
        /*this.setState({
            modal: true
        })*/
    }

    deliveryGoods = () => {
        const {id} = this.props.location.query;
        alert('确认收货', '是否确认收货?', [
            {text: '取消'},
            {
                text: '确定', onPress: () => {
                this.props.dispatch(received(id, {}, (res) => {
                    if (res.code == 0) {
                        Toast.success(res.message, 1);
                        this.props.dispatch(emptyOrder())
                        this.props.router.goBack();

                    } else {
                        Toast.fail(res.message, 1);
                    }
                }))
            },
                style: {fontWeight: 'bold'}
            },
        ])
    }

    gotoRefunds = () => {

    }
    gotoExchange = () => {
        const {id} = this.props.location.query;
        let totalIntegral = this.props.orderlist.data.totalIntegral;
        this.context.router.push(`/sendSms?money=${totalIntegral}&id=${id}`)
    }
    appraise = () =>{
        const {id} = this.props.location.query;
        this.context.router.push(`evaluation?id=${id}`)
    }
    //单个商品申请退单
    applyRefund =(item,orderId,e) =>{
        e.stopPropagation()
        let order1s=[]
        order1s.push(Object.assign(item,{checked:true,amount:item.purchaseQuantity-item.refundedQuantity||0}))
        let obj=Object.assign({orderId,allChecked:true,orderStatus:item.orderStatus,erpImport:item.erpImport,order1s:order1s})
        this.props.dispatch(setAfterSaleProducts(obj))
        this.context.router.push('/afterSale/products')
    }
    //批量退单
    applyRefundAll=(type) =>{
        const {data} = this.props.orderlist;
        let refundProducts=[],allChecked
        if(type==3){
            refundProducts=data.order1s
            refundProducts.map((item,i) =>{
                item.checked=true
                item.amount=item.purchaseQuantity-item.refundedQuantity||0
            })
            allChecked=true
        }else{
            refundProducts=data.order1s.filter(item => item.refundOperateTypeCode ==1 || item.refundOperateTypeCode==2)
            refundProducts.map((item,i) =>{
                item.checked=false
                item.amount=item.purchaseQuantity-item.refundedQuantity||0
            })
            allChecked=false
        }

        let obj =Object.assign({},{orderId:data.orderId,orderStatus:data.orderStatus,erpImport:data.erpImport,order1s:refundProducts,allChecked:allChecked})
        this.props.dispatch(setAfterSaleProducts(obj))
        if(type==3){
            this.context.router.push('/afterSale/apply?type=3')
        }else{
            this.context.router.push('/afterSale/products')
        }

    }
    renderStatus() {
        const {data} = this.props.orderlist;
        //能申请退单的商品
        let refundProducts=data.order1s.filter(item => item.refundOperateTypeCode ==1 || item.refundOperateTypeCode==2)

        switch (data.orderStatus) {
            case 1:
                if(data.totalMoney>0){
                    return (
                    <div className="div-11">
                        <span className="cal-btn" onClick={this.cancelOrder}>取消订单</span>
                        <span className="pay-btn" onClick={this.payNow}>去支付</span>
                    </div>
                    )
                }
                else{
                    return (
                    <div className="div-11">
                        <span className="cal-btn" onClick={this.cancelOrder}>取消订单</span>
                        <span className="pay-btn" onClick={this.gotoExchange}>去兑换</span>
                    </div>)
                }
            case 2: //V币订单待审核
                return (
                    <div className="div-11">
                        <span className="cal-btn" onClick={this.applyRefundAll.bind(this,3)}>申请退款</span>
                    </div>
                    )
            case 3: //待发货
                return (
                    data.erpImport==0?
                    <div className="div-11">
                        <span className="cal-btn" onClick={this.applyRefundAll.bind(this,3)}>申请退款</span>
                    </div>:
                    refundProducts.length>0?
                    <div className="div-11">
                        <span className="cal-btn" onClick={this.applyRefundAll.bind(this)}>批量退单</span>
                    </div>:null
                    )
            case 4:   //待收货
                return (
                    <div className="div-11">
                        {
                            refundProducts.length>0?<span className="cal-btn" onClick={this.applyRefundAll.bind(this)}>批量退单</span>:null
                        }
                        <span className="pay-btn" onClick={this.deliveryGoods}>确认收货</span>
                    </div>)
            case 5:   //已收货
                return (
                    <div className="div-11">
                        {
                            refundProducts.length>0?<span className="cal-btn" onClick={this.applyRefundAll.bind(this)}>批量退单</span>:null
                        }
                        <span className="pay-btn" onClick={this.appraise}>{data.ifEvaluate==1?'查看评价':'去评价'}</span>
                    </div>)
            default :
                return(
                    refundProducts.length>0?
                    <div className="div-11">
                        <span className="cal-btn" onClick={this.applyRefundAll.bind(this)}>批量退单</span>
                    </div>:null
                )

        }

    }

    render() {
        let {data} = this.props.orderlist
        let jsonMoney ={totalMoney: 0, totalIntegral: 0, num: 0}
        let init = {totalMoney: 0, totalIntegral: 0, num: 0}
        jsonMoney = data.order1s.reduce((initJson = {totalMoney: 0, totalIntegral: 0, num: 0}, next) => {
            initJson.num = initJson.num+next.purchaseQuantity
            if (next.price > 0) {
                let totalMoney = +(next.purchaseQuantity * next.price)
                initJson.totalMoney = +(initJson.totalMoney + totalMoney)
            }
            else {
                let totalIntegral = +(next.purchaseQuantity * (next.integral || 0))
                initJson.totalIntegral = +(initJson.totalIntegral + totalIntegral)
            }

            return initJson
        }, init)

        return (
            <div className="order-details">
                <div className="nav-content" style={{height: document.documentElement.clientHeight - 44*utils.multiple}}>
                    {
                        this.props.orderlist.code == -1 ? <div style={{padding: '10px 0px 60px 0px', textAlign: 'center'}}>加载中...</div> :
                            <div>
                                {/*<div className="list-0">
                                    <p className="line">
                                        <span></span><span></span><span></span>
                                    </p>
                                    <p className="p1">{data.status}</p>
                                    <p className="p2">剩2天23小时自动关闭</p>
                                </div>
                                <WhiteSpace size="sm"/>
                                <List className="list-wuliu">
                                    <Item extra={'查看您的商品物流信息'} arrow="horizontal" onClick={() => {
                                        this.context.router.push('/logistics')
                                    }}>物流信息：</Item>
                                </List>*/}
                                <List className="list-1">
                                    <Item>
                                        <div className="item-1">
                                            <span><span className="s1">收货人：</span>{data.contact}</span>
                                            <span className="phone">{data.phone}</span>
                                        </div>
                                        <Brief><span className="s1">收货地址：</span>{data.address}</Brief>
                                    </Item>

                                </List>
                                <WhiteSpace size="sm"/>
                                <List className="list-2">
                                    <Item className="item-order-status"
                                    extra={data.erpImport==1 && data.orderStatus==3 ?'备货中': (data.orderStatus==2 && data.totalMoney<=0 ?'审核中':'')}
                                    >
                                        <div className="icon-title">
                                            {data.orderFrom == 1 ?
                                                <i className="iconfont icon-qian"></i> :
                                                <i className="iconfont icon-vbi"></i>}
                                            {data.status}产品
                                        </div>
                                    </Item>
                                </List>
                                <List className="list-3">
                                    {this.renderProducts()}
                                </List>
                                <List className="list-4">
                                    <Item
                                        extra={
                                            <div className="div-4">
                                                <span>共{jsonMoney.num}件商品，</span>
                                                <span>合计:</span>
                                                <span className="s2"> {data.orderFrom == 0 ? <span><label
                                                        className="iconfont icon-vbi"></label>{data.totalIntegral}</span> :
                                                    <label>¥{data.totalMoney}</label>}</span>

                                            </div>
                                        }
                                    >

                                    </Item>
                                </List>
                                <WhiteSpace size="sm"/>
                                {this.renderPart1(data)}
                                <WhiteSpace size="sm"/>
                                <div className="list-6">
                                    <div className="item">
                                        <span className="s1">商品的金额</span>
                                        <span className="s2"> {data.orderFrom == 0 ? <span><label
                                                className="iconfont icon-vbi"></label>{jsonMoney.totalIntegral}</span> :
                                            <label>¥{ jsonMoney.totalMoney.toFixed(2)}</label>}</span>
                                    </div>
                                    {
                                        data.deductionMoney > 0 ?
                                            data.orderFrom == 0 ?
                                                <div className="item">
                                                    <span className="s1">V币抵扣</span>
                                                    <span className="s2"><label
                                                        className="iconfont icon-vbi"></label>{data.deductionVb}</span>
                                                </div> : <div className="item">
                                                    <span className="s1">V币抵扣</span>
                                                    <span className="s2"><label>-¥</label>{data.deductionMoney}</span>
                                                </div> : null
                                    }
                                    {
                                        data.userCouponMoney > 0 ?
                                            <div className="item">
                                                <span className="s1">立减</span>
                                                <span className="s2">-¥{data.userCouponMoney}</span>
                                            </div> : null
                                    }

                                    <div className="item">
                                        <span className="s1">邮费</span>
                                        {
                                            data.freight == 0 ? <span className="s2">包邮</span> :
                                                data.orderFrom == 0 ? (
                                                    <div className="money-footer">
                                                        <label
                                                            className="iconfont icon-vbi"></label>
                                                        <span
                                                            className="money">{data.freight}</span>
                                                    </div>
                                                ) : (
                                                    <div className="money-footer">
                                                        <label>+¥</label>
                                                        <span
                                                            className="money">{data.freight}</span>
                                                    </div>
                                                )

                                        }

                                    </div>

                                    <div className="item">
                                        <span className="s1">实付金额</span>
                                        {
                                            data.orderFrom == 0 ? <span
                                                    className="s2"> <label className="iconfont icon-vbi"></label>
                                                    {data.totalIntegral}</span>
                                                : <span
                                                    className="s2"><label>¥</label> {data.totalMoney.toFixed(2)}</span>
                                        }

                                    </div>
                                </div>

                            </div>
                    }

                    <div className="bottom-btn">
                        {this.renderStatus()}
                    </div>
                </div>

            </div>
        )
    }

    renderProducts(){
        const {data} = this.props.orderlist;
        return(
            data.order1s.map((item, id) => (
                <Item
                    key={id}
                    onClick={this.linkProduct.bind(this, item.productId)}
                >
                    <Link className="a-link">
                        <div className="s-item">
                            <div className="pdiv">
                                <div className="sitem-l">
                                    <div className="sl-img-box">
                                        <img src={item.thumbImg}/>
                                    </div>
                                </div>
                                <div className="sitem-m">
                                    <div className="sitem-m-txt">
                                        {item.name}
                                    </div>
                                    <div className="sitem-m-txt2">
                                        <span>{item.specDetail || ''}</span></div>
                                    <div className="s3-num">
                                        <div className="sitem-r">
                                            {
                                                item.price == 0 && item.integral != 0 ?
                                                    (
                                                        <div className="money-footer">
                                                            <label
                                                                className="iconfont icon-vbi"></label>
                                                            <span
                                                                className="money">{item.integral}</span>
                                                        </div>
                                                    ) : (
                                                        <div className="money-footer">
                                                            <label
                                                                className="iconfont icon-qian"></label>
                                                            <span
                                                                className="money">{item.price}</span>
                                                        </div>
                                                    )
                                            }
                                        </div>
                                        <span>x{item.purchaseQuantity}</span>
                                    </div>

                                    {
                                        data.orderStatus>3 && item.refundOperateTypeCode==1||item.refundOperateTypeCode==2 ?
                                        <div className="s3-btn">
                                            <span className="btn" onClick={this.applyRefund.bind(this,item,data.orderId)}>{item.refundOperateTypeText}</span>
                                        </div>:null
                                    }

                                    {
                                        item.refundOperateTypeCode ==3 ?
                                        <div className="s3-btn">
                                            <span className="btn" onClick={(e)=>{this.context.router.push(`/afterSale/details?id=${item.refundId}`);e.stopPropagation()}}>{item.refundOperateTypeText}</span>
                                        </div>:null
                                    }
                                    {
                                        item.refundOperateTypeCode==100?
                                        <div className="s3-btn">
                                            <span className="">{item.refundOperateTypeText}</span>
                                        </div>:null
                                    }
                                </div>
                            </div>
                        </div>
                    </Link>
                </Item>
            ))

        )
    }
    renderPart1(data) {
        return (
            <List className="list-5">
                <Item>
                    <div>订单单号:<span className="i_t">{data.orderCode}</span></div>
                </Item>
                <Item>
                    <div>下单时间:<span className="i_t">{data.createDt}</span></div>
                </Item>
                {
                    data.orderStatus>=4 && data.expressName!='' && data.expressName!=null?
                    <Item>
                        <div>货运方式:<span className="i_t">{data.expressName}</span></div>
                    </Item>:null
                }
                {
                    data.orderStatus>=4 && data.expressName!='' && data.expressName!=null?
                    <Item>
                            <div>起始货运单号:<span className="i_t">{data.expressCode}</span></div>
                    </Item>:null
                }
                {
                    data.orderStatus>=4 && data.expressName!='' && data.expressName!=null?
                    <Item>
                        <div>结束货运单号:<span className="i_t">{data.expressCode2}</span></div>
                    </Item>:null
                }

                <Item>
                    <div>运 费:
                        {
                            data.freight == 0 ? <span className="s2">包邮</span> :
                                data.orderFrom == 0 ? (
                                    <span className="money-footer">
                                        <label
                                            className="iconfont icon-vbi"></label>
                                        <span
                                            className="money">{data.freight}</span>
                                    </span>
                                ) : (
                                    <span className="money-footer">
                                        <label
                                            className="iconfont icon-qian"></label>
                                        <span
                                            className="money">{data.freight}</span>
                                    </span>
                                )

                        }
                    </div>
                </Item>
                <Item className="remark">
                    <div>买家备注:<span className="i_t">{data.buyerRemark}</span></div>
                </Item>
            </List>
        )
    }


}


function mapStateToProps(state) {
    return {
        orderlist: state.orderlist
    }
}

export default connect(mapStateToProps)(OrderDetails)
