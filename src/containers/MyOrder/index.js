//我的订单
import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Flex, WhiteSpace, Tabs} from 'antd-mobile';
import Paid from './Paid'
import Delivered from './Delivered'
import Details from './Details'
import Received from './Received'
import Evaluated from './Evaluated'
import './index.less'
import NavBar from '../../components/NavBar'
import Text from '../../components/Text'
import {getToBeDelivered,getorderDetails, getToBePaid,getToBeReceived,getToBeEvaluated} from '../../actions/orderDetails'
class MyOrder extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }

    }

    componentDidMount() {

    }
    getData(){

    }
    visibleShow = () => {
        this.setState({
            visible: !this.state.visible
        })
    }
    onSelect = (node, index) => {
        this.setState({
            visible: false
        })
        this.context.router.push(node.key)

    }
    handleVisibleChange = (visible) => {
        this.setState({
            visible
        })
    }
    tabsChange = (key) => {
        console.dir(key.sub)
        if(key.sub=='0'){
            if (this.props.orderDetails.all.code == -1) {
                this.props.dispatch(getorderDetails({
                    pageNow: 1,
                    pageSize: 10,
                    status: -1
                }));
            }
        }else if(key.sub=='1'){
            if (this.props.orderDetails.paid.code == -1) {
                this.props.dispatch(getToBePaid({
                    pageNow: 1,
                    pageSize: 10,
                    status: 1
                }));
            }
        }else if(key.sub=='2'){
            if (this.props.orderDetails.delivered.code == -1) {
                this.props.dispatch(getToBeDelivered({
                    pageNow: 1,
                    pageSize: 10,
                    status: 3
                }));
            }
        }else if(key.sub=='3'){
            if (this.props.orderDetails.received.code == -1) {
                this.props.dispatch(getToBeReceived({
                    pageNow: 1,
                    pageSize: 10,
                    status: 4
                }));
            }
        }else if(key.sub=='4'){
            if (this.props.orderDetails.evaluated.code == -1) {
                this.props.dispatch(getToBeEvaluated({
                    pageNow: 1,
                    pageSize: 10,
                    status: 5
                }));
            }
        }
    }
    render() {
        const {key} = this.props.location.query;
        const tabs = [
            {title: <Text text={"全部"} size="md" row={1}/>, sub: '0'},
            {title: <Text text={"待支付/兑换"} size="md" row={1}/>, sub: '1'},
            {title:<Text text={"待发货"} size="md" row={1}/>, sub: '2'},
            {title:<Text text={"待收货"} size="md" row={1}/>, sub: '3'},
            {title: <Text text={"待评价"} size="md" row={1}/>, sub: '4'},
        ];
        return (
            <div className="my-order">
                <NavBar title="我的订单" {...this.props}/>
                <div className="nav-content">
                    <Tabs
                        tabs={tabs}
                        initialPage={ parseInt(key) }
                        swipeable={false}
                        onChange={this.tabsChange}
                    >
                        <div>
                            <Details/>
                        </div>
                        <div>
                            <Paid/>
                        </div>
                        <div>
                            <Delivered/>
                        </div>
                        <div>
                            <Received/>
                        </div>
                        <div>
                            <Evaluated/>
                        </div>
                    </Tabs>

                </div>

            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        orderDetails: state.orderDetails
    }
}

export default connect(mapStateToProps)(MyOrder)
