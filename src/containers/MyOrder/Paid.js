//待支付
import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { ListView,Toast,Modal} from 'antd-mobile';
import {getToBePaid, cancalOrder, emptyOrder} from '../../actions/orderDetails'
import ListViewProduct from '../../components/ListViewProduct'
import OrderItem from './OrderItem'
import utils from '../../utils'
const alert = Modal.alert;
class Paid extends Component {
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
    componentDidMount() {
        if (this.props.orderDetails.paid.code == -1) {
            this.props.dispatch(getToBePaid({
                pageNow: 1,
                pageSize: 10,
                status: 1
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

        } else {
           let {data} = this.props.orderDetails.paid
            this.setState({
                isLoading: false,
                hasMore: data.pageOffset< data.totalPage
            })
        }
    }
    componentWillUnmount(){
         
    }
    getData(pageNow){
            this.props.dispatch(getToBePaid({
                pageNow: pageNow,
                pageSize: 10,
                status: 1
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
    cancelOrder=(rowData)=>{
        alert('取消订单', '确定要取消该订单吗?', [
            {text: '取消'},
            {
                text: '确定', onPress: () => {
                this.props.dispatch(cancalOrder(rowData.orderId, {}, (res) => {
                    if (res.code == 0) {
                        Toast.success(res.message, 1);
                        this.props.dispatch(emptyOrder())
                        setTimeout(()=>{
                            this.getData(1);
                        },100)
                    } else {
                        Toast.fail(res.message, 1);
                    }
                }))
            },
                style: {fontWeight: 'bold'}
            },
        ])
    }
    onEndReached = () => {
        if (!this.state.hasMore || this.state.isLoading) {
            return;
        }
        this.setState({isLoading: true});
        setTimeout(()=>{
            this.getData(this.props.orderDetails.paid.data.pageOffset + 1)
        },100)

    }
    onRefresh=()=>{
        this.props.dispatch(emptyOrder())
        setTimeout(()=>{
            this.getData(1)
        },50)

    }
    payNow=(rowData)=>{
        this.props.dispatch(emptyOrder())
        this.context.router.push(`/choosePayType?id=${rowData.orderId}`)
    }
    //兑换
    gotoExchange=(rowData)=>{
        this.props.dispatch(emptyOrder())
        this.context.router.push(`/sendSms?id=${rowData.orderId}&money=${rowData.totalIntegral}`)

    }
    render() {

        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID} className="item-order row">
                    <OrderItem
                        data={rowData}
                        cancelOrder={this.cancelOrder}
                        payNow={this.payNow}
                        gotoExchange={this.gotoExchange}
                    />
                </div>
            )
        };
        let dataSource = this.dataSource.cloneWithRows(this.props.orderDetails.paid.data.datas)
        return (
            <div style={{width: "100%",}}>
                <ListViewProduct
                    row={row}
                    dataSource={dataSource}
                    status={this.props.orderDetails.paid.code}
                    data={this.props.orderDetails.paid.data}
                    isLoading={this.state.isLoading}
                    reflistview="listrefs"
                    onEndReached={this.onEndReached}
                    onRefresh={this.onRefresh}
                    type={2}
                    height={document.documentElement.clientHeight - 100*utils.multiple}
                    empty_type={3}
                    empty_text={'小主，你还没有待支付/兑换的订单'}
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

export default connect(mapStateToProps)(Paid)
