//短信验证
import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { Modal, Toast, InputItem, Button} from 'antd-mobile';
import {getExchangeSms, confirmation, payVbHotelOrder,emptyOrderDetails} from '../../actions/orderDetails'
import {storage} from "../../utils/tools"
import {changeNavbarTitle} from '../../actions/home'
const alert = Modal.alert;
import './index.less'
class SendSms extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };


    constructor(props) {
        super(props);
        this.timemer = null;
        this.state = {
            exchangeSms: "",
            start: false,
            time: 60
        }
        this.back = this._back.bind(this)
    }
    componentWillMount() {
        this.props.dispatch(changeNavbarTitle("短信验证"))

    }
    componentDidMount() {
        this.sendMsm();
    }

    newlySent = () => {
        this.sendMsm()
    }

    sendMsm() {
        const {money} = this.props.location.query;
        this.props.dispatch(getExchangeSms({money: money}, (res) => {
            if (res.code == 0) {
                this.setState({
                    start: true
                })

                this.timemer = setInterval(() => {
                    if (this.state.time > 0) {
                        this.setState({
                            time: --this.state.time
                        })
                    } else {
                        this.setState({
                            start: false
                        })
                    }
                }, 1000)
            } else {
                Toast.info(res.message, 1);
            }
        }))
    }

    _back() {
        this.props.router.goBack();
    }

    confirmationExchange = () => {
        if (this.state.exchangeSms != "") {
            alert('兑换', '是否确认兑换商品', [
                {text: '取消'},
                {
                    text: '确定',
                    onPress: () => {
                        const {id, type} = this.props.location.query;
                        if (type == "hotel") {
                            this.props.dispatch(payVbHotelOrder({
                                smsCode: this.state.exchangeSms,
                                openId: storage.get("openId"),
                                orderId: id
                            }, (res) => {
                                if (res.code == 0) {
                                    this.context.router.push(`/sucessexchange?totalIntegral=${res.data.payIntegral}&ex=${res.ex}`)
                                } else {
                                    Toast.info(res.message, 2, null, false);
                                }
                            }))
                        } else {
                            this.props.dispatch(confirmation(id, {
                                smsCode: this.state.exchangeSms,
                                openId: storage.get("openId")
                            }, (res) => {
                                if (res.code == 0) {
                                    this.props.dispatch(emptyOrderDetails())
                                    this.context.router.replace(`/paySuccess?text=支付成功&orderId=${res.data.orderId}`)
                                } else {
                                    Toast.info(res.message, 2, null, false);
                                }
                            }))
                        }
                    },
                    style: {fontWeight: 'bold'}
                },
            ])
        }

    }

    componentWillUnmount() {
        if (this.timemer != null) {
            clearInterval(this.timemer)
        }

    }

    exchangeSmsChange = (value) => {
        this.setState({
            exchangeSms: value
        })
    }

    render() {
        const {userInfo} = this.props;
        let myphone = userInfo.phone.substr(3, 4);
        let lphone = userInfo.phone.replace(myphone, "****");
        return (
            <div className="send-sms">

                <div>
                    <div className="content-tip">
                        为了保障您的资金安全，该笔交易需要短信确认，验证码已发送至手机：{lphone}
                    </div>
                    <div className="enter-sms">
                        <InputItem
                            type="number"
                            placeholder="请输入短信验证码"
                            onChange={this.exchangeSmsChange}
                            value={this.state.exchangeSms}
                        />
                        <Button
                            type="primary"
                            inline
                            disabled={this.state.start}
                            onClick={this.newlySent}
                        >
                            {this.state.start ? `${this.state.time}后重新发送` : "重新发送"}</Button>
                    </div>
                </div>
                <div className="btn-confir">
                    <Button
                        type="primary"
                        inline
                        disabled={this.state.exchangeSms.trim() == ""}
                        onClick={this.confirmationExchange}
                        activeStyle={false}
                    >
                        确认兑换</Button>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        userInfo: state.userInfo
    }
}

export default connect(mapStateToProps)(SendSms)
