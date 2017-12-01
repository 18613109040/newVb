import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {List, Radio,Toast} from 'antd-mobile';
import {getOrderById, wxPay,wechatJssdk,emptyOrder} from '../../actions/orderDetails'
import './index.less'
import {changeNavbarTitle} from '../../actions/home'
import {storage} from "../../utils/tools"

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
            value: 0,
            clickPay:false
        }

    }

    componentWillMount() {
        this.props.dispatch(changeNavbarTitle("支付方式"))

    }
    componentDidMount() {
        const {id, openId} = this.props.location.query;
        this.props.dispatch(getOrderById(id))
        if (openId) {
            this.wxpay();
        }

    }
    wxpay=()=>{
        const {id, openId} = this.props.location.query;
            this.props.dispatch(wechatJssdk({
                signUrl:window.location.href
            },(res)=>{
                if(res.code == 0){
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: res.data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
                        timestamp:res.data.timestamp , // 必填，生成签名的时间戳
                        nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                        signature: res.data.signature,// 必填，签名，见附录1
                        jsApiList: [
                            'chooseWXPay'
                        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });

                    this.props.dispatch(wxPay({
                        orderId: id,
                        openId: openId
                    }, (res) => {
                        if (res.code == 0) {
                            wx.ready(()=>{
                                wx.chooseWXPay({
                                    timestamp: parseInt(res.data.timeStamp) , // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                                    nonceStr: res.data.nonceStr, // 支付签名随机串，不长于 32 位
                                    package: res.data.prepayId, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                                    signType: res.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                                    paySign: res.data.paySign, // 支付签名
                                    success: (res)=> {
                                        this.props.dispatch(emptyOrder())
                                        this.context.router.replace(`/paySuccess?text=支付成功&orderId=${id}`)
                                    },
                                    fail:(res)=>{

                                    }
                                });
                            })
                        }else{
                            Toast.info(res.message, 2);
                            this.setState({
                                clickPay:false
                            })
                        }

                    }))
                }else{
                    Toast.info(res.message, 2);
                    this.setState({
                        clickPay:false
                    })
                }
            }))

    }
    pay = () => {
        this.setState({
            clickPay:true
        })
        if (this.state.value == 0)
            this.weixing()
        else
            this.zhifubao()
    }
    zhifubao = () => {
        const {id} = this.props.location.query;
        const token = storage.get("token")
        this.props.dispatch(emptyOrder())
        location.href=`/alipay/pay?orderId=${id}&token=${token}`;
    }

    weixing = () => {
        const {data} = this.props.orderlist;
        const { openId} = this.props.location.query;
        if(openId){
            this.wxpay();
        }else{
            location.href = `/wechat/getOpenId?orderId=${data.orderId}`
        }

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
        const { openId} = this.props.location.query;
        return (

            <div className="online-payment">
                <div className="nav-content" style={{height: document.documentElement.clientHeight - 100}}>

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

                <div className="vb-tab-bar-fix">
                    {
                       this.state.clickPay?<a className="btn">支付中....</a>:<a className="btn" onClick={this.pay.bind(this)}>确认支付：￥{data.totalMoney}</a>
                    }
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
