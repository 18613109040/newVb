import React, {Component} from "react";
import { Link } from "react-router";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {ListView} from 'antd-mobile';
import {selectCoupons} from '../../actions/coupon'
import {changeNavbarTitle} from '../../actions/home'
import ListViewProduct from '../../components/ListViewProduct'
class CouponCentre extends Component {
    static propTypes = {

    };

    static defaultProps = {

    };
    constructor(props) {
        super(props);
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1.orderId !== row2.orderId
        })
        this.searchData = []
        this.state={
            isLoading:false,
            hasMore: false,
        }

    }
    componentWillMount() {
        this.props.dispatch(changeNavbarTitle("领券中心"))
    }
    componentDidMount (){
        this.getData();
    }
    getData(pageNow){
        this.props.dispatch(selectCoupons({
            pageNow: pageNow,
            pageSize: 10
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
    onEndReached = () => {
        if (!this.state.hasMore ) {
            return;
        }
        this.setState({isLoading: true});
        setTimeout(()=>{
            this.getData(this.props.orderDetails.all.data.pageOffset + 1)
        },100)

    }

    render() {
        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID} className="item-order row">

                </div>
            )
        };

        let dataSource = this.dataSource.cloneWithRows(this.props.orderDetails.all.data.datas)
        return(
            <div className="ticket-center">
                <div className='nav-content'>
                    <ListViewProduct
                        row={row}
                        dataSource={dataSource}
                        status={this.props.orderDetails.evaluated.code}
                        data={this.props.orderDetails.evaluated.data}
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

    }
}
export default connect(mapStateToProps)(CouponCentre)
