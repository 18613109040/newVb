import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Flex, List, Grid, Badge, WingBlank, WhiteSpace,Modal} from 'antd-mobile';
import {getStatistics} from '../../actions/orderDetails'
import {getUserInfo} from '../../actions/user'
import Text from '../../components/Text'
import {emptyOrder} from '../../actions/orderDetails'
import {emptyMycommentList} from '../../actions/evaluation'
import {emptyListAddress} from '../../actions/address'
import {storage} from "../../utils/tools"
import './index.less'
const Item = List.Item;
const alert = Modal.alert;
class MyInfo extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {

        }
        this.clickAll = this._clickAll.bind(this);
    }
    componentWillMount() {

    }
    componentDidMount() {
        this.props.dispatch(getUserInfo({}))
        this.props.dispatch(getStatistics({}))


    }
    _clickAll() {
        this.context.router.push("/myorder/details")
    }
    gridItemClick = (obj, index) => {
        if (obj.text == '我的小二') {
            location.href = obj.href
        } else {
            this.context.router.push(obj.href);
        }
    }

    exitSys=()=>{
        alert('退出登录', '是否退出该账号', [
            { text: '取消', onPress: () => console.log('cancel') },
            {
                text: '确定',
                onPress: () => {
                    storage.remove("token");
                    storage.remove("userInfo");
                    this.props.dispatch(emptyOrder());
                    this.props.dispatch(emptyMycommentList());
                    this.props.dispatch(emptyListAddress());
                    this.context.router.push(`/login`);
                }
            },
        ])

    }
    render() {

        const {userInfo} = this.props;
        const {statisicsNumber} = this.props;
        const menu = [
            {
                icon: require("../../assets/images/myorder-icon1-03.png"),
                text: "我的评价",
                href: "/myEvaluation"
            }, {
                icon: require("../../assets/images/myorder-icon1-05.png"),
                text: "我的小二",
                href: 'https://eco-api.meiqia.com/dist/standalone.html?eid=8444&metadata={"name":"{{user.nickName}}({{user.trueName}})","tel":"{{user.phone}}","等级":"{{user.levelName}}","qq":"{{user.qq}}","weixin":"{{user.wechat}}","gender":"{{user.gender}}","comment":""}'
            }, {
                icon: require("../../assets/images/myorder-icon1-02.png"),
                text: "收货地址",
                href: "/addresslist"
            },
            // {
            //     icon: require("../../assets/images/myorder-icon1-06.png"),
            //     text: "思埠之家",
            //     href: "/hotelList?key=0"
            // },
            {
                icon: require("../../assets/images/youhuiquan.png"),
                text: "优惠券",
                href: "/coupon"
            }, {
                icon: require("../../assets/images/pro-collect-icon2.png"),
                text: "我的收藏",
                href: "/collection"
            }, {
                icon: require("../../assets/images/myorder-icon1-04.png"),
                text: "关于V商城",
                href: "/about"
            }
        ]
        return (
            <div className="my-info" style={{height:document.documentElement.clientHeight-100}}>
                <div className="info-1">
                    <Flex className="div-step-1">
						<span className="img-user">
							<img src={userInfo.head || require('../../assets/images/header.jpg')}/>
						</span>

                        <WingBlank style={{flex:1}}>
                            <span className="user-info">
                                <Text row={1} text={userInfo.nickName||userInfo.phone} size="lg"/>
                                 <WhiteSpace  size="lg"/>
                                <div className="phone">{userInfo.phone}</div>
                            </span>
                        </WingBlank>
                        <span className="sys">
                           <label className="exit" onClick={this.exitSys}>退出</label>
                            {/*<label className="iconfont  icon-sys"></label>*/}
                        </span>
                    </Flex>
                </div>
                <div className='info-2'>
                    <Flex>
                        <Flex.Item>
                            <div className="grid-item">
                                <div className="grid-number">{userInfo.totalVMoney}</div>
                                <WhiteSpace  size="md"/>
                                <div className="grid-vb">总V币</div>
                            </div>
                        </Flex.Item>
                        <Flex.Item>
                            <div className="grid-item">
                                <div className="grid-number">{userInfo.availableVMoney}</div>
                                <WhiteSpace  size="md"/>
                                <div className="grid-vb">可用V币</div>
                            </div>
                        </Flex.Item>
                        <Flex.Item>
                            <div className="grid-item">
                                <div className="grid-number">{userInfo.freezeVMoney}</div>
                                <WhiteSpace  size="md"/>
                                <div className="grid-vb">冻结V币</div>
                            </div>
                        </Flex.Item>
                    </Flex>
                </div>
                <WhiteSpace  size="md"/>
                <div className="info-3">
                    <List>
                        <Item
                            extra={'查看全部订单'}
                            arrow="horizontal"
                            onClick={this.clickAll}
                            platform="android"
                        >我的订单</Item>
                    </List>
                    <div className="menu-nav">
                        <Flex>
                            <Flex.Item>
                                <Link className="grid-item" to="/myorder/details">
                                    <div className="top">
                                        <i className="iconfont icon-dzf"></i>
                                        <Badge text={statisicsNumber.data.waitPayNum}  className="item-bage"/>
                                    </div>
                                    <div className="grid-name">待支付/兑换</div>
                                </Link>
                            </Flex.Item>
                            <Flex.Item>
                                <Link className="grid-item" to="/myorder/delivered">
                                    <div className="top">
                                        <i className="iconfont icon-dfh"></i>
                                        <Badge text={statisicsNumber.data.waitShipNum}  className="item-bage"/>
                                    </div>
                                    <div className="grid-name">待发货</div>
                                </Link>
                            </Flex.Item>
                            <Flex.Item>
                                <Link className="grid-item" to="/myorder/received">
                                    <div className="top">
                                        <i className="iconfont icon-dsh"></i>
                                        <Badge text={statisicsNumber.data.hasReceivedNum}  className="item-bage"/>
                                    </div>
                                    <div className="grid-name">待收货</div>
                                </Link>
                            </Flex.Item>
                            <Flex.Item>
                                <Link className="grid-item" to="/myorder/evaluated">
                                    <div className="top">
                                        <i className="iconfont icon-dpj"></i>
                                        <Badge text={statisicsNumber.data.waitEvaluateNum}  className="item-bage"/>
                                    </div>
                                    <div className="grid-name">待评价</div>
                                </Link>
                            </Flex.Item>
                            <Flex.Item>
                                <Link className="grid-item" to="/afterSale/list">
                                    <div className="top">
                                        <i className="iconfont icon-drf"></i>
                                        <Badge text={statisicsNumber.data.refundingNum}  className="item-bage"/>
                                    </div>
                                    <div className="grid-name">退款/售后</div>
                                </Link>
                            </Flex.Item>
                        </Flex>
                    </div>
                </div>
                <WhiteSpace  size="md"/>
                <div className="info-4">
                    <List>
                        <Item

                            platform="android"
                        >我的服务</Item>
                    </List>
                    <div >
                        <Grid
                            data={menu}
                            columnNum={4}
                            onClick={this.gridItemClick}
                        />
                    </div>
                </div>

            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        userInfo: state.userInfo,
        statisicsNumber:state.statisicsNumber
    }
}

export default connect(mapStateToProps)(MyInfo)
