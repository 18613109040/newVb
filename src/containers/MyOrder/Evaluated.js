//待评价
import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Flex, List, ListView, Icon,Toast,Modal} from 'antd-mobile';
import {getToBeEvaluated} from '../../actions/orderDetails'
import OrderItem from './OrderItem'
import ListViewProduct from '../../components/ListViewProduct'
const alert = Modal.alert;
const Item = List.Item;

class Evaluated extends Component {
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
        if (this.props.orderDetails.evaluated.code == -1) {
            this.props.dispatch(getToBeEvaluated({
                pageNow: 1,
                pageSize: 10,
                status: 5
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
            this.setState({
                isLoading: false,
                hasMore: true
            });
        }
    }
    //去评价
    appraise=(data)=>{
        this.context.router.push(`/evaluation?id=${data.orderId}`)
    }
    getData(pageNow){

            this.props.dispatch(getToBeEvaluated({
                pageNow: pageNow,
                pageSize: 10,
                status: 5
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
            this.getData(this.props.orderDetails.evaluated.data.pageOffset + 1)
        },100)

    }
    //点击评价
    evaluation = (data) => {
        this.context.router.push(`/evaluation?id=${data.orderId}`)
    }
    //退款
    gotoRefunds=(rowData)=>{

    }
    render() {
        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID} className="item-order row">
                    <OrderItem
                        data={rowData}
                        appraise={this.appraise}
                    />
                </div>
            )
        };
        let dataSource = this.dataSource.cloneWithRows(this.props.orderDetails.evaluated.data.datas)
        return (
            <div style={{width: "100%",}}>
                <ListViewProduct
                    row={row}
                    dataSource={dataSource}
                    status={this.props.orderDetails.evaluated.code}
                    isLoading={this.state.isLoading}
                    reflistview="listrefs"
                    onEndReached={this.onEndReached}
                    type={2}
                    height={document.documentElement.clientHeight - 100}
                    empty_type={3}
                    empty_text={'小主，你还没有待评价的订单'}
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

export default connect(mapStateToProps)(Evaluated)
