import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Flex, Toast, Icon, ListView} from 'antd-mobile';
import {selectCoupons, addUserCoupon,changeCouponsCentre,emptyCouponsCentre} from '../../actions/coupon'
import NavBar from '../../components/NavBar'
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
            console.dir(this.props.couponCentre)
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
                <NavBar title={'领券中心'} {...this.props}></NavBar>

                <div className='nav-content'>
                    {/*<ListView*/}
                        {/*dataSource={this.state.dataSource}*/}
                        {/*renderFooter={() => (<div style={{marginBottom: 50, textAlign: 'center'}}>*/}
                            {/*{this.state.isLoading == 1 ? <span><Icon*/}
                                {/*type="loading"/>加载中...</span> : this.state.isLoading == 2 ? "" : '没有数据了。。。。'}*/}
                        {/*</div>)}*/}
                        {/*renderRow={row}*/}
                        {/*className="fortest"*/}
                        {/*style={{*/}
                            {/*height: document.documentElement.clientHeight - 90,*/}
                            {/*overflow: 'auto',*/}
                        {/*}}*/}
                        {/*pageSize={15}*/}
                        {/*initialListSize={0}*/}
                        {/*onEndReached={this.getData}*/}

                    {/*/>*/}
                    <ListViewProduct
                        row={row}
                        dataSource={dataSource}
                        status={this.props.couponCentre.code}
                        isLoading={this.state.isLoading}
                        reflistview="listrefs"
                        onEndReached={this.onEndReached}
                        type={2}
                        height={document.documentElement.clientHeight - 100}
                        empty_type={3}
                        empty_text={'你还没订单哟'}
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
