//待收货
import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Flex, List, ListView, Icon,Toast,Modal} from 'antd-mobile';
import {getToBeReceived,received,emptyOrder} from '../../actions/orderDetails'
import OrderItem from './OrderItem'
import ListViewProduct from '../../components/ListViewProduct'
import utils from '../../utils'
const alert = Modal.alert;
const Item = List.Item;

class Received extends Component {
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
        if (this.props.orderDetails.received.code == -1) {
            this.props.dispatch(getToBeReceived({
                pageNow: 1,
                pageSize: 10,
                status: 4
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
            let {data} = this.props.orderDetails.received
            this.setState({
                isLoading: false,
                hasMore: data.pageOffset< data.totalPage
            })
        }
    }
    componentWillUnmount(){
        
    }
    getData(pageNow) {
            this.props.dispatch(getToBeReceived({
                pageNow:pageNow,
                pageSize: 10,
                status: 4
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
        setTimeout(() => {
            this.getData(this.props.orderDetails.received.data.pageOffset + 1)
        },100)

    }
    onRefresh=()=>{
        this.props.dispatch(emptyOrder())
        setTimeout(()=>{
            this.getData(1)
        },50)

    }
    gotoRefunds=(data)=>{

    }
    lookLogistics=(data)=>{

    }
    deliveryGoods=(data)=>{
        alert('确认收货', '是否确认收货?', [
            {text: '取消'},
            {
                text: '确定', onPress: () => {
                this.props.dispatch(received(data.orderId, {}, (res) => {
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
    render() {

        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID} className="item-order row">
                    <OrderItem
                        data={rowData}
                        gotoRefunds={this.gotoRefunds}
                        lookLogistics={this.lookLogistics}
                        deliveryGoods={this.deliveryGoods}
                    />
                </div>
            )
        };
        let dataSource = this.dataSource.cloneWithRows(this.props.orderDetails.received.data.datas)
        return (
            <div style={{width: "100%",}}>
                <ListViewProduct
                    row={row}
                    dataSource={dataSource}
                    status={this.props.orderDetails.received.code}
                    data={this.props.orderDetails.received.data}
                    isLoading={this.state.isLoading}
                    reflistview="listrefs"
                    onEndReached={this.onEndReached}
                    onRefresh={this.onRefresh}
                    type={2}
                    height={document.documentElement.clientHeight - 60*utils.multiple}
                    empty_type={3}
                    empty_text={'小主，你还没有待收货的订单'}
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

export default connect(mapStateToProps)(Received)
