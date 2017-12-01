import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Flex, List,Icon} from 'antd-mobile';
import Text from '../../components/Text'
import {AllProducts} from '../../components/AllProducts'
const Item = List.Item;
class OrderItem extends Component {
    static propTypes = {
        data: PropTypes.object,
        buttomName: PropTypes.string,

    };

    static defaultProps = {
        buttomName: "再次购买",
        signet: false
    };
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            one: false
        }

    }

    componentDidMount() {

    }

    evaluation(id) {
        if (this.props.evaluation instanceof Function) {
            this.props.evaluation(id)
        }
    }

    itemClick(id) {
        this.context.router.push(`/orderdetails?id=${id}`)
    }
    //取消订单
    cancelOrder=()=>{

        if (this.props.cancelOrder instanceof Function) {
            this.props.cancelOrder(this.props.data)
        }
    }
    payNow=()=>{
        if (this.props.payNow instanceof Function) {
            this.props.payNow(this.props.data)
        }
    }
    gotoExchange=()=>{
        if (this.props.gotoExchange instanceof Function) {
            this.props.gotoExchange(this.props.data)
        }
    }
    gotoRefunds=()=>{
        if (this.props.gotoRefunds instanceof Function) {
            this.props.gotoRefunds(this.props.data)
        }
    }
    lookLogistics=()=>{
        if (this.props.lookLogistics instanceof Function) {
            this.props.lookLogistics(this.props.data)
        }
    }
    deliveryGoods=()=>{
        if (this.props.deliveryGoods instanceof Function) {
            this.props.deliveryGoods(this.props.data)
        }
    }
    appraise=()=>{
        if (this.props.appraise instanceof Function) {
            this.props.appraise(this.props.data)
        }
    }

    renderStatus(status) {
        //1 待支付
        let {data} =this.props
        switch (status) {
            case '待支付':
                return (
                    <div className="footer-btn"><span className="btn"  onClick={this.cancelOrder}>取消订单</span><span className="btn ghost" onClick={this.payNow}>去支付</span></div>
                )
            case '待兑换':
                return (
                    <div className="footer-btn"><span className="btn" onClick={this.cancelOrder}>取消订单</span><span className="btn ghost" onClick={this.gotoExchange}>去兑换</span></div>)

            case '待发货':
                /*return(
                    <div className="footer-btn">
                        <span className="btn" onClick={this.gotoRefunds}>申请退款</span></div>)*/
                    return null
            case '待收货':
                return(
                    <div className="footer-btn">
                        {/*<span className="btn" onClick={this.gotoRefunds}>申请退款</span>*/}{/*<span className="btn" onClick={this.lookLogistics}>查看物流</span>*/}<span className="btn" onClick={this.deliveryGoods}>确认收货</span></div>)
            case "已发货":
                return(
                    <div className="footer-btn">
                        {/*<span className="btn" onClick={this.lookLogistics}>查看物流</span>*/}
                        <span className="btn ghost" onClick={this.deliveryGoods}>确认收货</span>
                    </div>)
            case "待评价":
                return(
                    <div className="footer-btn">
                        <span className="btn" onClick={this.appraise}>去评价</span>
                    </div>)

            case "已收货":
              if(data.ifEvaluate==0){
                  return(
                      <div className="footer-btn">
                          <span className="btn" onClick={this.appraise}>去评价</span>
                      </div>)
              }else {
                  return(
                      <div className="footer-btn">
                          <span className="btn" onClick={this.appraise}>查看评价</span>
                      </div>)
              }


        }

    }

    render() {
        let {data} =this.props
        return (
            <div className="order-details-item">

                <List>
                    <Item extra={data.status}>
                        <div className="title">{data.status}产品</div>
                        {/*{*/}
                           {/*data.status == "已收货"&&data.ifEvaluate==0? <div className="signet icon-sign iconfont"></div> : ""*/}
                        {/*}*/}
                    </Item>
                    <AllProducts data={data} itemClick={(id)=>{this.itemClick(id)}}/>
                    <Item className="item-left-extra content-shop total-content">
                        <span className="all-title">共{this.props.data.order1s.length}件商品，合计:</span>
                        <span className="all-mo">
                            {this.props.data.totalMoney == 0 && this.props.data.totalIntegral != 0 ? `V币 ${this.props.data.totalIntegral}` : `¥ ${this.props.data.totalMoney}`}
                        </span>
                    </Item>

                    <Item className="item-left-extra content-shop">
                        {
                            this.renderStatus(this.props.data.status)
                        }
                    </Item>

                </List>
            </div>
        )
    }
}


export default OrderItem
