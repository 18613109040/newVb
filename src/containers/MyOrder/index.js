//我的订单
import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import './index.less'
import {Flex} from 'antd-mobile';
import Text from '../../components/Text'
import {changeNavbarTitle} from '../../actions/home'
const Item = Flex.Item
class MyOrder extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }

    }

    componentWillMount() {
        this.props.dispatch(changeNavbarTitle("我的订单"))
    }

    componentDidMount() {

    }

    render() {
        const tabs = [
            {
                name: "全部",
                path: "/myorder/details"
            }, {
                name: "待支付/兑换",
                path: "/myorder/paid"
            }, {
                name: "待发货",
                path: "/myorder/delivered"
            }, {
                name: "待收货",
                path: "/myorder/received"
            }, {
                name: "待评价",
                path: "/myorder/evaluated"
            }
        ]
        const {pathname} = this.props.location;
        return (
            <div className="my-order">
                <div className="nav-content">
                    <Flex>
                        {
                            tabs.map((item, id) => (
                                <Item
                                    key={id} onClick={()=>{this.context.router.replace(item.path)}}
                                    className={item.path == pathname ? "swiper-slide active" : "swiper-slide"}>
                                    <Text text={item.name} row={1} size="md"/>
                                </Item>
                            ))
                        }
                    </Flex>
                    {
                        this.props.children
                    }
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
