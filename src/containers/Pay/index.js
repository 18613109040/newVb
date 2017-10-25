import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Flex, Icon, List, Checkbox, Toast, Radio, WhiteSpace} from 'antd-mobile';
import {getOrderById, wxPay, getOpenId} from '../../actions/orderDetails'
import {storage} from "../../utils/tools"
import Cookie from "js-cookie";
import './index.less'
import NavBar from '../../components/NavBar'

const Item = List.Item;
const Brief = Item.Brief;
const RadioItem = Radio.RadioItem;

class OnlinePayment extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.checkInUsers = []
        this.state = {
            value: 0
        }

    }

    componentWillMount() {

    }

    onBridgeReady(data) {
        console.dir(data)
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                "appId": '"'+data.appId.toString()+'"',     //公众号名称，由商户传入
                "timeStamp": '"'+data.timeStamp.toString()+'"',         //时间戳，自1970年以来的秒数
                "nonceStr": '"'+data.nonceStr.toString()+'"', //随机串
                "package": '"'+data.prepayId.toString()+'"',
                "signType": '"'+data.signType.toString()+'"',         //微信签名方式：
                "paySign": '"'+data.paySign.toString()+'"' //微信签名
            },
            function (res) {
                alert(res.err_msg)
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    console.dir(res)
                }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            }
        );
    }

    componentDidMount() {
        const {id, openId} = this.props.location.query;
        if (openId) {
            this.props.dispatch(wxPay({
                orderId: id,
                openId: openId
            }, (res) => {
                if (res.code == 0) {

                    if (typeof WeixinJSBridge == "undefined") {
                        if (document.addEventListener) {
                            document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(res.data), false);
                        } else if (document.attachEvent) {
                            document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady(res.data));
                            document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady(res.data));
                        }
                    } else {
                        this.onBridgeReady(res.data);
                    }
                }

            }))
        } else {
            this.props.dispatch(getOrderById(id))
        }

    }

    pay = () => {
        if (this.state.value == 0)
            this.weixing()
        else
            this.zhifubao()
    }
    zhifubao = () => {
        const {data} = this.props.orderlist;
        let token = storage.get('token');
        let cookie = Cookie.get("__SibuxwsJavaCookie");
        let openId = storage.get('openId');
        window.location.href = "/alipay/pay/?orderId=" + data.orderId + "&openId=" + openId + "&token=" + token + "&cookie=" + cookie;

    }

    weixing = () => {
        const {data} = this.props.orderlist;
        console.dir(data)
        location.href = `http://testxws.sibumbg.com/api/wechat/getOpenId?orderId=${data.orderId}`
    }

    onChange = (value) => {
        this.setState({
            value,
        });
    }

    render() {
        const {data} = this.props.orderlist
        const checkData = [
            {value: 0, label: '微信支付'},
            {value: 1, label: '支付宝支付'},
        ];
        return (

            <div className="online-payment">
                <NavBar title="支付方式" {...this.props}/>
                <div className="nav-content" style={{height: document.documentElement.clientHeight - 190}}>

                    <List renderHeader={() => '选择支付方式'}>
                        {checkData.map(i => (
                            <RadioItem key={i.value} checked={this.state.value === i.value}
                                       onChange={() => this.onChange(i.value)}>
                                <i className={i.value == 0 ? "iconfont icon-weixin i-sty" : "iconfont  icon-zhifubao i-sty"}></i>
                                <span className="lable">{i.label}</span>
                            </RadioItem>
                        ))}
                    </List>
                </div>
                {

                }
                <div className="vb-tab-bar-fix">
                    <a className="btn" onClick={this.pay.bind(this)}>确认支付：￥{data.totalMoney}</a>
                </div>


            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        orderlist: state.orderlist
    }
}

export default connect(mapStateToProps)(OnlinePayment)
