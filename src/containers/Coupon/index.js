import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Flex, Tabs, Carousel, Toast, Icon, Modal} from 'antd-mobile';
import CouponTem from "../../components/CouponTem";
import {getUserCoupons, activateCoupon} from "../../actions/coupon";
import NavBar from '../../components/NavBar'
import './index.less'
const prompt = Modal.prompt;
class PopupContent extends React.Component {
    render() {
        return (
            <div>
                <NavBar title={"优惠券"} {...this.props}  rightContent={
                    [
                       <Icon key="0" onClick={this.props.onClose} type="ellipsis" />
                    ]
                    }/>
                <div className="coupon-description nav-content">
                    <div>1.V券不可叠加使用，每张订单限用一张;</div>
                    <div>2.V券金额大于订单应付金额时，差额不予退回;</div>
                    <div>3.运费券按券面值仅可抵减订单运费，不可叠加使用，每张订单
                        限用一张，不设找零（运费券金额大于订单运费时，差额不予退
                        回）。运费券可与V券同时使用;
                    </div>
                    <div>4.V券与运费券仅可在有效期期内使用。</div>
                </div>
            </div>

        );
    }

}

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

    componentDidMount() {

        this.props.dispatch(getUserCoupons({}))
    }
    handleTabClick = () => {

    }
    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
          [key]: true,
        });
    }
    onClose = key => () => {
        this.setState({
          [key]: false,
        });
    }
    //couponRange : 0 全场  1专场  其他满减
    onClickEvent = (data) => {
        console.dir(this.context)
        if (data.couponRange == 0) {
            this.context.router.push(`/classification`);
        } else if (data.couponRange == 1) {
            this.context.router.push(`/activityProduct?id=${data.rangeId}`);
        } else {
            this.context.router.push(`/reductionArea?couponId=${data.couponId}`);

        }
    }


    render() {
        const {expiredList, hasUsedList, notUsedList} = this.props.userCoupon.data;
        const tabs = [
            { title: `未使用${notUsedList !== "" ? `(${notUsedList.length})` : ""}`},
            { title: `使用记录${hasUsedList !== "" ? `(${hasUsedList.length})` : ""}`},
            { title: `已过期${expiredList !== "" ? `(${expiredList.length})` : ""}`}
        ];
        return (
            <div className="vb-coupon" style={{height: document.documentElement.clientHeight}} >
                <NavBar title={"优惠券"} {...this.props}  rightContent={
                    [
                       <Icon key="0" onClick={this.showModal('modal')} type="ellipsis" />
                    ]
                    }/>
                <Tabs tabs={tabs}
                  initialPage={1}
                  onChange={(tab, index) => { console.log('onChange', index, tab); }}
                  onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                >
                  <div style={{height: (218*notUsedList.length+200)+'px'}}>
                     {
                        notUsedList !== "" ? notUsedList.map((item, id) => (
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
                        )) : ""
                    }
                  </div>
                  <div style={{height: (218*hasUsedList.length+200)+'px'}}>
                    {
                        hasUsedList !== "" ? hasUsedList.map((item, id) => (
                            <CouponTem
                                data={Object.assign({},
                                    item, {status: 2}, {useEndDate: item.useEndDt, useStartDate: item.useStartDt}
                                )}
                                key={id}

                            />
                        )) : ""
                    }
                  </div>
                  <div style={{height: (218*expiredList.length+200)+'px'}}>
                    {
                        expiredList !== "" ? expiredList.map((item, id) => (
                            <CouponTem
                                data={Object.assign({},
                                    item, {status: 3}, {
                                        useEndDate: item.useEndDt,
                                        useStartDate: item.useStartDt
                                    }
                                )}
                                key={id}

                            />
                        )) : ""
                    }
                  </div>
                </Tabs>
                <div className="BottomBtn-fixed">
                    <div className="footer-group">
                        <Link className="wbtn" to="/ticketCenter">去领券中心</Link>
                        <Link  className="wbtn"  to="/bindCoupon" >去绑定优惠券</Link>
                    </div>
                </div>



                <Modal
                  popup
                  visible={this.state.modal}
                  maskClosable={false}
                  onClose={this.onClose('modal')}
                  animationType="slide-down"
                  footer={[{ text: '关闭', onPress: () => {  this.onClose('modal')(); } }]}
                >
                  <PopupContent {...this.props} onClose={this.onClose('modal')}/>
                </Modal>

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
