import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Steps, WhiteSpace} from 'antd-mobile';
import './index.less'
import {changeNavbarTitle} from '../../actions/home'
import {getRefundHistory} from '../../actions/orderDetails'
import utils from '../../utils'
const Step = Steps.Step;
const customIcon = () => (
    <i className="iconfont icon-yuan"></i>
);

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
        this.props.dispatch(changeNavbarTitle("协商历史"))

    }
    componentDidMount() {
        let {refundId}=this.props.location.query
        this.props.dispatch(getRefundHistory({refundId:refundId}))
    }
    

    render() {
        let {refundHistory}=this.props
        if(refundHistory.code !=0) return null
        return (
            <div className="order-details" style={{height: document.documentElement.clientHeight -45*utils.multiple}}>
                <div className="logistics-center">
                    <Steps size="small">
                    {
                        refundHistory.data.map((item,i)=>{
                            return(
                                <Step key={i} title={item.operatorRemark} icon={customIcon()}
                                  description={(
                                    <div>{item.operatorDate}<br/>经办人：{item.operatorName}</div>
                                )}/>
                            )
                            
                        })
                    }
                      
                    </Steps>
                </div>
            </div>
        )
    }

}


function mapStateToProps(state) {
    return {
        refundHistory:state.refundHistory
    }
}

export default connect(mapStateToProps)(OnlinePayment)
