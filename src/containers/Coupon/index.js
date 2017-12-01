import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Tabs, Icon, Modal} from 'antd-mobile';
import CouponTem from "../../components/CouponTem";
import {getUserCoupons} from "../../actions/coupon";
import {changeNavbarTitle} from '../../actions/home'
import utils from '../../utils'
import './index.less'


class Coupon extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }

    }
    componentWillMount() {
        this.props.dispatch(changeNavbarTitle("优惠券"))
    }
    componentDidMount() {

        this.props.dispatch(getUserCoupons({}))
    }
    handleTabClick = () => {

    }

    //couponRange : 0 全场  1专场  其他满减
    onClickEvent = (data) => {

        if (data.couponRange == 0) {
            this.context.router.push(`/classification`);
        } else if (data.couponRange == 1) {
            this.context.router.push(`/activityProduct?id=${data.rangeId}`);
        } else {
            this.context.router.push(`/reductionArea?couponId=${data.couponId}`);

        }
    }


    render() {
        let  {expiredList, hasUsedList, notUsedList} = this.props.userCoupon.data;
        expiredList = expiredList || [];
        hasUsedList = hasUsedList || [];
        notUsedList = notUsedList || [];
        const tabs = [
            { title: `未使用(${notUsedList.length})`},
            { title: `使用记录(${hasUsedList.length})`},
            { title: `已过期(${expiredList.length})`}
        ];
        return (
            <div className="vb-coupon"  >
                <Tabs tabs={tabs}
                  initialPage={0}
                  onChange={(tab, index) => { console.log('onChange', index, tab); }}
                  onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                >
                  <div style={{height: document.documentElement.clientHeight - 140*utils.multiple}}>
                     {
                        notUsedList.map((item, id) => (
                            <CouponTem
                                data={Object.assign({},
                                    item, {status: 1}, {
                                        useEndDate: item.useEndDt,
                                        useStartDate: item.useStartDt
                                    }
                                )}
                                key={id}
                                onClickEvent={this.onClickEvent}
                            />
                        ))
                    }
                  </div>
                  <div style={{height: document.documentElement.clientHeight - 140*utils.multiple}}>
                    {
                         hasUsedList.map((item, id) => (
                            <CouponTem
                                data={Object.assign({},
                                    item, {status: 2}, {useEndDate: item.useEndDt, useStartDate: item.useStartDt}
                                )}
                                key={id}

                            />
                        ))
                    }
                  </div>
                  <div style={{height: document.documentElement.clientHeight - 140*utils.multiple}}>
                    {
                         expiredList.map((item, id) => (
                            <CouponTem
                                data={Object.assign({},
                                    item, {status: 3}, {
                                        useEndDate: item.useEndDt,
                                        useStartDate: item.useStartDt
                                    }
                                )}
                                key={id}

                            />
                        ))
                    }
                  </div>
                </Tabs>
                <div className="BottomBtn-fixed">
                    <div className="footer-group">
                        <Link className="wbtn" to="/ticketCenter">去领券中心</Link>
                        <Link  className="wbtn"  to="/bindCoupon" >去绑定优惠券</Link>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        userCoupon: state.userCoupon
    }
}

export default connect(mapStateToProps)(Coupon)
