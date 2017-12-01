//待发货
import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Modal, ListView, Toast} from 'antd-mobile';
import {getToBeDelivered, cancalOrder, emptyOrder} from '../../actions/orderDetails'
import OrderItem from './OrderItem'
import ListViewProduct from '../../components/ListViewProduct'
import utils from '../../utils'


const alert = Modal.alert;

class Delivered extends Component {
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
        }

    }

    componentDidMount() {
            if(this.props.orderDetails.delivered.code == -1) {
                this.props.dispatch(getToBeDelivered({
                    pageNow: 1,
                    pageSize: 10,
                    status: 3
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
                let {data} = this.props.orderDetails.delivered
                this.setState({
                    isLoading: false,
                    hasMore: data.pageOffset< data.totalPage
                })
            }

    }
    componentWillUnmount(){
       
    }

    getData(pageNow) {
        this.props.dispatch(getToBeDelivered({
            pageNow: pageNow,
            pageSize: 10,
            status: 3
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
    onRefresh=()=>{
        this.props.dispatch(emptyOrder())
        setTimeout(()=>{
            this.getData(1)
        },50)

    }
    onEndReached = () => {
        if (!this.state.hasMore || this.state.isLoading) {
            return;
        }
        this.setState({isLoading: true});
        let {data} = this.props.orderDetails.delivered
        setTimeout(()=>{
            this.getData(data.pageOffset + 1)
        },100)
    }
//取消订单
    cancelOrder = (rowData) => {

        alert('取消订单', '确定要取消该订单吗?', [
            {text: '取消'},
            {
                text: '确定', onPress: () => {
                this.props.dispatch(cancalOrder(rowData.orderId, {}, (res) => {
                    if (res.code == 0) {
                        Toast.success(res.message, 1);
                        this.props.dispatch(emptyOrder())
                        setTimeout(() => {
                            this.getData(1);
                        }, 100)
                    } else {
                        Toast.fail(res.message, 1);
                    }
                }))
            },
                style: {fontWeight: 'bold'}
            },
        ])
    }
    //退款
    gotoRefunds = (rowData) => {

    }

    render() {
        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID} className="item-order row">
                    <OrderItem
                        data={rowData}
                        cancelOrder={this.cancelOrder}
                        gotoRefunds={this.gotoRefunds}
                    />
                </div>
            )
        };
        let dataSource = this.dataSource.cloneWithRows(this.props.orderDetails.delivered.data.datas)
        return (
            <div style={{width: "100%"}}>
                <ListViewProduct
                    row={row}
                    dataSource={dataSource}
                    data={this.props.orderDetails.delivered.data}
                    status={this.props.orderDetails.delivered.code}
                    isLoading={this.state.isLoading}
                    reflistview="listrefs"
                    onEndReached={this.onEndReached}
                    onRefresh={this.onRefresh}
                    type={2}
                    height={document.documentElement.clientHeight - 60*utils.multiple}
                    empty_type={3}
                    empty_text={'小主，你还没有待发货的订单'}
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

export default connect(mapStateToProps)(Delivered)
