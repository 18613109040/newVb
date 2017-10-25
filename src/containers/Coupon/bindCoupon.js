import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { Toast,WhiteSpace,WingBlank } from 'antd-mobile';
import { activateCoupon} from "../../actions/coupon";
import NavBar from '../../components/NavBar'
import BottomBtn from '../../components/BottomBtn'




class Coupon extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            value:''
        }

    }

    activation = () => {
        let {value} =this.state
        if(value=='')
        {
            Toast.info('请输入优惠券码', 1, null, false);
            return
        }
        this.props.dispatch(activateCoupon({
            couponCode: value
        }, (res) => {
            if (res.code == 0) {
               this.context.router.goBack()
            }
            Toast.info(res.message, 1, null, false);
        }))
    }
    onChange =(e) =>{
        let value=e.target.value;
        this.setState({
            value
        })

    }
    render(){
        return(
            <div className="bindCoupon-content">
                <NavBar title={"绑定优惠券"} {...this.props} />
                <WingBlank>
                    <div>
                        <WhiteSpace />
                        <p className="tip">为了确保您的优惠券码能得到正常的使用，请您先绑定优惠券再进行使用</p>
                        <WhiteSpace />
                        <input type="text" placeholder='请输入优惠券码' className="input-coupon" value={this.state.value} onChange={this.onChange}/>
                        
                    </div>
                </WingBlank>
                
                
                <BottomBtn text="确认绑定" onClick={this.activation} />
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
       
    }
}

export default connect(mapStateToProps)(Coupon)
