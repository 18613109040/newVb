import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Toast, ListView} from 'antd-mobile';
import {selectCoupons, addUserCoupon,changeCouponsCentre,emptyCouponsCentre} from '../../actions/coupon'
import {changeNavbarTitle} from '../../actions/home'
import CouponTem from "../../components/CouponTem";
import ListViewProduct from '../../components/ListViewProduct'
class TicketCenter extends Component {
    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1.orderId !== row2.orderId
        })
        this.searchData = []
        this.state = {
            isLoading: false,
            hasMore: false,
        }

    }
    componentWillMount() {
        this.props.dispatch(changeNavbarTitle("领券中心"))
    }

    componentDidMount() {
        this.getData(1);
    }
    componentWillUnmount(){

        this.props.dispatch(emptyCouponsCentre())
    }

    getData(pageNow){
        this.props.dispatch(selectCoupons({
            pageNow: pageNow,
            pageSize: 10,
            isGet:0
        }, (res) => {
            if (res.data.pageOffset < res.data.totalPage) {
                this.setState({
                    isLoading: false,
                    hasMore: true
                })
            } else {
                this.setState({
                    isLoading: false,
                    hasMore: false
                })
            }
        }));
    }
    onClickEvent = (data) => {
        this.props.dispatch(addUserCoupon({
            couponId: data.id,
            couponType: data.couponType
        }, (res) => {
            this.props.dispatch(changeCouponsCentre(data))
            Toast.info(res.message, 0.5, null, false);
        }))
    }
    onEndReached = () => {
        if (!this.state.hasMore ) {
            return;
        }
        this.setState({isLoading: true});
        setTimeout(()=>{

            this.getData(this.props.couponCentre.data.pageOffset + 1)
        },100)

    }
    render() {
        const row = (data, sectionID, rowID) => {
            if (data.hasGet == 0) {
                return (
                    <CouponTem
                        data={Object.assign({}, data, {status: 5})}
                        onClickEvent={this.onClickEvent}
                    />
                )
            } else {
                return (
                    <CouponTem
                        data={Object.assign({}, data, {status: 4})}

                    />
                )
            }

        }
        let dataSource = this.dataSource.cloneWithRows(this.props.couponCentre.data.datas)
        return (
            <div className="ticket-center">
                <div className='nav-content'>
                    <ListViewProduct
                        row={row}
                        dataSource={dataSource}
                        status={this.props.couponCentre.code}
                        data={this.props.couponCentre.data}
                        isLoading={this.state.isLoading}
                        reflistview="listrefs"
                        onEndReached={this.onEndReached}
                        type={2}
                        height={document.documentElement.clientHeight - 100}
                        empty_type={3}
                        empty_text={'小主，敬请关注优惠券发放哦！'}
                    />

                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        couponCentre:state.couponCentre
    }
}

export default connect(mapStateToProps)(TicketCenter)
