import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Flex, WhiteSpace, WingBlank} from 'antd-mobile';
import {changeNavbarTitle} from '../../actions/home'
import './index.less'




class OnlinePayment extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);


    }

    componentWillMount() {
        const {text} = this.props.location.query;
        this.props.dispatch(changeNavbarTitle(text))
    }

    componentDidMount() {

    }

    render() {
        const {orderId,text} = this.props.location.query;
        return (
            <div className="order-details">
                <div className="list-0">
                    <p className="line">
                        <span></span><span></span><span></span>
                    </p>
                    <p className="p1"><i className="iconfont icon-ok"></i></p>
                    <p className="p2">{text}</p>
                </div>
                <div className="btn-group">
                    <WingBlank size="md">
                        <WhiteSpace size="sm"/>
                        <Flex>
                            {orderId?<Flex.Item><span className="btn btn1" onClick={()=>{this.context.router.push(`/orderdetails?id=${orderId}`)}}>查看订单</span></Flex.Item>:""}
                            <Flex.Item><span className="btn btn2" onClick={()=>{this.context.router.push('/home')}}>继续逛逛</span></Flex.Item>
                        </Flex>
                        <WhiteSpace size="sm"/>
                        <div className="tip">注意：本平台及销售商不会以订单异常、系统升级为由要求您点击任何网址链接进行退款操作。</div>
                    </WingBlank>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(OnlinePayment)
