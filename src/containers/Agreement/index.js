import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Flex, Checkbox} from 'antd-mobile';

const AgreeItem = Checkbox.AgreeItem;
import NavBar from '../../components/NavBar'
import './index.less'

class Agreement extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.checkInUsers = []
        this.state = {}

    }

    componentWillMount() {

    }

    componentDidMount() {

    }
    render() {
        return (
            <div className="vb-agreement">
                <NavBar title="思埠客栈服务协议" rightContent={[<div key="1" className='back-size' onClick={() => {
                    this.props.router.goBack()
                }}>已阅读</div>]} {...this.props}/>
                <div className="nav-content" style={{height: document.body.scrollHeight - 100}}>
                    <p>感谢您选择思埠客栈，为使您体验到更优质的服务，请在下单前仔细阅读本服务协议。</p>
                    <p>1.入住客栈需提前7天预订，单个订单最多入住15晚。</p>
                    <p>2.订单提交后，如订单状态发生变更，该订单填写的联系手机号码将会收到短信提醒。</p>
                    <p>3.退款申请提交成功后，不可取消。</p>
                    <p>4.违约天数：入住订单支付成功后，客户发起申请退款(非预订失败退款)，违约天数为判断是否需要扣除违约金的标准。 </p>
                    <div>附目前思埠客栈违约天数：</div>
                    {
                        this.props.hostlist.data.map((item, id) => (
                            <div key={id}>{item.hotelName} 违约天数：订单入住日期前3天</div>
                        ))
                    }
                    <p>
                        5.取消订单：订单支付后，您若需要取消订单申请退款，根据客栈的要求，在订单入住日期前3天取消订单申请退款，全额退款；若在订单入住日期3天内（含入住日期当天）及之后取消订单申请退款，扣除相应违约金，每个客栈与房间的扣违约金可能会不同。</p>
                    <p>6.预订失败退款：全额退款。如入住订单预定失败，请您在收到短信提示后，尽快发起线上申请退款。</p>
                    <p>7.违约天数前退款：全额退款。以订单入住日期、违约天数为准，在客栈要求的违约天数时间之前申请退款，不做扣款处理。</p>
                    <p>8.违约退款：部分退款/全额扣款。以订单入住日期、违约天数为准，在客栈要求的违约天数时间之内申请退款，根据支付方式扣除相应V币或金额。</p>
                    <p>9.逾期退款：部分退款/全额扣款。在订单日期当天未入住，从订单日期第二天起始，客户提交申请退款为逾期退款，根据支付方式扣除相应V币或金额。逾期退款金额有可能与违约退款不同。</p>
                    <p>10.退款提交成功后，不可取消。</p>
                    <p>11.客户提交退款申请后，退款申请将于2个工作日内完成受理，节假日顺延。</p>
                    <p>12.退款申请受理成功后，退款处理将于7个工作日内完成，节假日顺延。</p>
                    <p>13.提交思埠客栈入住订单，表示您已知晓本协议内容并同意遵守此协议。</p>
                    <p>14.如有任何疑问，请联系客服人员，我们将竭诚为您提供更优质的服务。</p>
                    <div>
                        <AgreeItem data-seed="logId" onChange={() => {
                            this.props.router.goBack()
                        }}>
                            已阅读并同意协议
                        </AgreeItem>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        hostlist: state.hostlist
    }
}

export default connect(mapStateToProps)(Agreement)
