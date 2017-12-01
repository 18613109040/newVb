//全部
import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Modal, ListView, Toast} from 'antd-mobile';
import {cancalOrder, emptyOrder, received, getorderDetails} from '../../actions/orderDetails'
import OrderItem from './OrderItem'
import ListViewProduct from '../../components/ListViewProduct'
import utils from '../../utils'

const alert = Modal.alert;
class Details extends Component {
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
            hasMore: false
        }

    }

    componentDidMount() {
        if (this.props.orderDetails.all.code == -1) {
            this.props.dispatch(getorderDetails({
                pageNow: 1,
                pageSize: 10,
                status: -1
            }, (res) => {
                if (res.data.pageOffset < res.data.totalPage) {
                    this.setState({
                        isLoading: false,
                        hasMore: true,

                    })
                } else {
                    this.setState({
                        isLoading: false,
                        hasMore: false,

                    })
                }
            }));
        } else {
            let {data} = this.props.orderDetails.all
            this.setState({
                isLoading: false,
                hasMore: data.pageOffset< data.totalPage
            })
        }
    }
    componentWillUnmount(){
        
    }
    getData(pageNow) {
        this.props.dispatch(getorderDetails({
            pageNow: pageNow,
            pageSize: 10,
            status: -1
        }, (res) => {
            if (res.data.pageOffset < res.data.totalPage) {
                this.setState({
                    isLoading: false,
                    hasMore: true,

                })
            } else {
                this.setState({
                    isLoading: false,
                    hasMore: false,

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
            this.getData(this.props.orderDetails.all.data.pageOffset + 1)
        },100)

    }
    onRefresh=()=>{
        this.props.dispatch(emptyOrder())
        setTimeout(()=>{
            this.getData(1)
        },50)

    }
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
                        }, 500)
                    } else {
                        Toast.fail(res.message, 1);
                    }
                }))
            },
                style: {fontWeight: 'bold'}
            },
        ])
    }
    payNow = (rowData) => {
        this.context.router.push(`/choosePayType?id=${rowData.orderId}`)
    }

    //去评价
    appraise = (data) => {
        this.props.dispatch(emptyOrder())
        this.context.router.push(`/evaluation?id=${data.orderId}`)
    }
    //兑换
    gotoExchange = (rowData) => {
        this.props.dispatch(emptyOrder())
        this.context.router.push(`/sendSms?id=${rowData.orderId}&money=${rowData.totalIntegral}`)

    }
    lookLogistics = (data) => {

    }
    deliveryGoods = (data) => {
        alert('确认收货', '是否确认收货?', [
            {text: '取消'},
            {
                text: '确定', onPress: () => {
                this.props.dispatch(received(data.orderId, {}, (res) => {
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

    render() {
        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID} className="item-order row">
                    <OrderItem
                        data={rowData}
                        cancelOrder={this.cancelOrder}
                        payNow={this.payNow}
                        appraise={this.appraise}
                        gotoRefunds={this.gotoRefunds}
                        gotoExchange={this.gotoExchange}
                        lookLogistics={this.lookLogistics}
                        deliveryGoods={this.deliveryGoods}
                    />
                </div>
            )
        };

        let dataSource = this.dataSource.cloneWithRows(this.props.orderDetails.all.data.datas)
        return (
            <div style={{width: "100%"}}>
                <ListViewProduct
                    row={row}
                    dataSource={dataSource}
                    status={this.props.orderDetails.all.code}
                    data={this.props.orderDetails.all.data}
                    isLoading={this.state.isLoading}
                    reflistview="listrefs"
                    onEndReached={this.onEndReached}
                    type={2}
                    onRefresh={this.onRefresh}
                    height={document.documentElement.clientHeight - 60*utils.multiple}
                    empty_type={3}
                    empty_text={'小主，你还没有订单'}
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

export default connect(mapStateToProps)(Details)
