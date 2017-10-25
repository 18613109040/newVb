import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Steps, WhiteSpace, WingBlank} from 'antd-mobile';
import './index.less'
import NavBar from '../../components/NavBar'
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

    }

    componentDidMount() {

    }


    render() {
        return (
            <div className="order-details">
                <NavBar title="物流信息" {...this.props}/>
                <div className="logistics-top">
                    <span className="top-left"><img
                        src="http://img.sibumbg.com/G1/M00/00/7B/CixGgVdrVreAVEx2AADzxb95y9A167.jpg"/></span>
                    <div className="top-right">
                        <p className='p1'><span className="span1">物流状态</span><span className="status">已签收</span></p>
                        <p className="p2"><span className="span1">承运来源:</span>中通快递</p>
                        <p className="p3"><span className="span1">运单单号：</span>999999</p>
                    </div>
                </div>
                <WhiteSpace size='md'/>
                <div className="logistics-center">
                    <Steps size="small">
                        <Step title="[广州市]快件已签收,感谢您使用中通快递!感谢使用中通快递,期待再次为您服务" icon={customIcon()}
                              description="2010-9-9 10:00"/>
                        <Step title="[广州市]快件已到达 广州花都[广州市]快件已到达 广州花都" icon={customIcon()} description="2010-9-9 10:00"/>
                        <Step title="[广州市]快件已到达 广州花都" icon={customIcon()} description="2010-9-9 10:00"/>
                    </Steps>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(OnlinePayment)
