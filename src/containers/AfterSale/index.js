

//退货、退款列表
import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { ListView,Toast,Modal,List} from 'antd-mobile';
import {getRefundList, emptyOrder} from '../../actions/orderDetails'
import ListViewProduct from '../../components/ListViewProduct'
import {AllProducts } from '../../components/AllProducts'
import utils from '../../utils'
import {changeNavbarTitle} from '../../actions/home'
import {CommodityIcon} from '../../components/Commodity';
const alert = Modal.alert;
const Item = List.Item;
class AfterSaleList extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1.orderId !== row2.orderId
        })
        this.state = {
            isLoading: false,
            hasMore: false,
            dataSource: this.dataSource.cloneWithRows([])
        }

    }
    shouldComponentUpdate(nextProps,nextState){
        if(this.props.orderDetails.refunded ==nextProps.orderDetails.refunded)
            return false
        else
            return true
    }
    componentWillMount() {
        this.props.dispatch(changeNavbarTitle("退款/售后"))
    }
    componentDidMount() {
        this.props.dispatch(getRefundList({
            pageNow: 1,
            pageSize: 20,
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
    componentWillUnmount(){
        this.props.dispatch(emptyOrder())
    }
    getData(pageNow){
        this.props.dispatch(getRefundList({
            pageNow: pageNow,
            pageSize: 20,
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
        if (!this.state.hasMore || this.state.isLoading) {
            return;
        }
        this.setState({isLoading: true});
        setTimeout(()=>{
            this.getData(this.props.orderDetails.refunded.data.pageOffset + 1)
        },100)

    }
    onRefresh=()=>{
        this.props.dispatch(emptyOrder())
        setTimeout(()=>{
            this.getData(1)
        },50)

    }
    itemClick(id) {
        this.context.router.push(`/orderdetails?id=${id}`)
    }

    render() {
        let {refunded} =this.props.orderDetails
        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID} className="item-order row">
                    <div className="product-title">
                        <CommodityIcon iconType={rowData.orderFrom||1}/>
                        <div className="type"><span>{rowData.orderFromText}</span></div>
                    </div>
                    <AllProducts
                        data={rowData}
                        itemClick={(id)=>{this.itemClick(id)}}
                    />
                    <List className="refund-list">
                        <Item className="red-color" extra={rowData.refundStatusText}>{rowData.refundTypeText}</Item>
                    </List>
                    <Item className="item-left-extra content-shop">
                        <div className="footer-btn">
                            <span className="btn"
                            onClick={()=>{this.context.router.push(`/afterSale/details?id=${rowData.refundId}`)}}
                            >查看详情</span>
                        </div>
                    </Item>

                </div>
            )
        };
        let dataSource = this.dataSource.cloneWithRows(refunded.data.datas)
        return (
            <div style={{width: "100%"}} className="my-order">
                <ListViewProduct
                    row={row}
                    dataSource={dataSource}
                    status={refunded.code}
                    data={refunded.data}
                    isLoading={this.state.isLoading}
                    reflistview="listrefs"
                    onEndReached={this.onEndReached}
                    onRefresh={this.onRefresh}
                    type={2}
                    height={document.documentElement.clientHeight }
                    empty_type={3}
                    empty_text={'小主，你还没有退款/售后的订单'}
                />

            </div>

        )
    }
}


function mapStateToProps(state) {
    return {
        orderDetails: state.orderDetails
    }
}

export default connect(mapStateToProps)(AfterSaleList)
