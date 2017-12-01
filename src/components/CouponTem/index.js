/**
 * 商品评价
 *
 */
import React, {Component} from "react";
import {Flex, Radio} from 'antd-mobile';
import {Link} from "react-router";
import PropTypes from 'prop-types';
import Text from "../Text";
import './index.less'
class CouponTem extends Component {
    static propTypes = {
        radioCheck: PropTypes.func
    };
    static contextTypes = {
        router: PropTypes.object.isRequired,
    };
    static defaultProps = {
        data: {
            cutMoney: 3,
            couponType: 1,
            fullMoney: 6,
            couponName: "",
            useStartDate: "",
            useEndDate: "",
            status: 0  //1 未使用 2 已使用 3 已过期 4已领取  5 立即领取 6不可使用 7可用优惠券
        }
    };

    constructor(props) {
        super(props);
        this.state = {}
        this.receive = this._receive.bind(this);
    }

    //点击领取
    _receive() {
        if (this.props.onClickEvent instanceof Function) {
            this.props.onClickEvent(this.props.data)
        }

    }

    radioCheck=(id)=> {
        if (this.props.radioCheck instanceof Function) {
            this.props.radioCheck(id)
        }

    }

    onClickEvent = (data) => {
        if (this.props.onClickEvent instanceof Function) {
            this.props.onClickEvent(data)
        }
    }

    renderCoupon(data) {
        let couponRange=data.couponRange==0?'全品类':data.couponRange==1?'专场券':'商品券'
        switch (data.status) {
            case 1:
                return (
                    <Flex >
                        <div className="left">
                            <div className="item"></div>
                            <div className="item"></div>
                            <div className="item"></div>
                            <div className="item"></div>
                            <div className="item"></div>
                            <div className="item"></div>
                            <div className="item"></div>
                            <div className="item"></div>
                            <div className="item"></div>
                        </div>
                    <div className="left-bg">
                        <div className="content">
                            <span className="iconfont icon-renmingbi money"></span>
                            <span className="number">{data.cutMoney}</span>
                        </div>
                        <div className="text">{data.couponType == 1 ? `满${data.fullMoney}元使用` : "直减券"}</div>
                    </div>
                    <div className="right-bg">
                        <div className="top">
                            <span className="tip-tag">V券</span>
                            <span className="name">
			  			<Text
                            text={data.instruction}
                            row={2}
                            size="md"
                        />
						</span>
                        </div>
                        <div className="center">
                            <span className="dianji" onClick={this.onClickEvent.bind(this, data)}>立即使用</span>
                        </div>
                        <div className="dashed"></div>
                        <div className="time">
                            有效期:{`${data.useStartDate.split(" ")[0]} - ${data.useEndDate.split(" ")[0]}`}</div>
                    </div>
                    <div className="right">
                        <div className="item"></div>
                        <div className="item"></div>
                        <div className="item"></div>
                        <div className="item"></div>
                        <div className="item"></div>
                        <div className="item"></div>
                        <div className="item"></div>
                        <div className="item"></div>
                        <div className="item"></div>
                    </div>
                    </Flex>
                )
                break;
            case 2 :
                return (
                    <Flex>
                        <div className="left">
                            <div className="item"></div>
                            <div className="item"></div>
                            <div className="item"></div>
                            <div className="item"></div>
                            <div className="item"></div>
                            <div className="item"></div>
                            <div className="item"></div>
                            <div className="item"></div>
                            <div className="item"></div>
                        </div>
                        <div className="left-bg">
                            <div className="content">
                                <span className="iconfont icon-renmingbi money"></span>
                                <span className="number">{data.cutMoney}</span>
                            </div>
                            <div className="text">{data.couponType == 1 ? `满${data.fullMoney}元使用` : "直减券"}</div>
                        </div>
                        <div className="right-bg">
                            <div className="top">
                                <span className="tip-tag">V券</span>
                                <span className="name">
			  			<Text
                            text={data.instruction}
                            row={2}
                            size="md"
                        />
						</span>
                            </div>
                            <div className="center">

                                <span className="status02"></span>
                            </div>
                            <div className="dashed"></div>
                            <div className="time">
                                有效期:{`${data.useStartDate.split(" ")[0]} - ${data.useEndDate.split(" ")[0]}`}</div>
                        </div>
                        <div className="right">
                            <div className="item"></div>
                            <div className="item"></div>
                            <div className="item"></div>
                            <div className="item"></div>
                            <div className="item"></div>
                            <div className="item"></div>
                            <div className="item"></div>
                            <div className="item"></div>
                            <div className="item"></div>
                        </div>
                    </Flex>)

            case 3 :
                return (
                    <Flex>
                        <div className="left">
                            <div className="item hui"></div>
                            <div className="item hui"></div>
                            <div className="item hui"></div>
                            <div className="item hui"></div>
                            <div className="item hui"></div>
                            <div className="item hui"></div>
                            <div className="item hui"></div>
                            <div className="item hui"></div>
                            <div className="item hui"></div>
                        </div>
                        <div className="left-bg hui">
                            <div className="content">
                                <span className="iconfont icon-renmingbi money"></span>
                                <span className="number">{data.cutMoney}</span>
                            </div>
                            <div className="text">{data.couponType == 1 ? `满${data.fullMoney}元使用` : "直减券"}</div>
                        </div>
                        <div className="right-bg hui1">
                            <div className="top">
                                <span className="tip-tag hui">V券</span>
                                <span className="name">
			  			<Text
                            text={data.instruction}
                            row={2}
                            size="md"
                        />
							</span>
                            </div>
                            <div className="center">

                                <span className="status03"></span>
                            </div>
                            <div className="dashed"></div>
                            <div className="time">
                                有效期:{`${data.useStartDate.split(" ")[0]} - ${data.useEndDate.split(" ")[0]}`}</div>
                        </div>
                        <div className="right">
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                        </div>
                    </Flex>)
            case 4 :
                return (
                    <Flex>
                        <div className="left">
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                        </div>
                        <div className="left-bg ">
                            <div className="content">
                                <span className="iconfont icon-renmingbi money"></span>
                                <span className="number">{data.cutMoney}</span>
                            </div>
                            <div className="text">{data.couponType == 1 ? `满${data.fullMoney}元使用` : "直减券"}</div>
                        </div>
                        <div className="right-bg ">
                            <div className="top">
                                <span className="tip-tag ">V券</span>
                                <span className="name">
			  			<Text
                            text={data.instruction}
                            row={2}
                            size="md"
                        />
			  		</span>
                            </div>
                            <div className="center">

                                <span className="status01"></span>
                            </div>
                            <div className="dashed"></div>
                            <div className="time">
                                有效期:{`${data.useStartDate.split(" ")[0]} - ${data.useEndDate.split(" ")[0]}`}</div>
                        </div>
                        <div className="right">
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                        </div>
                    </Flex>)
            case 5 :
                return (
                    <Flex>
                        <div className="left">
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                        </div>
                        <div className="left-bg ">
                            <div className="content">
                                <span className="iconfont icon-renmingbi money"></span>
                                <span className="number">{data.cutMoney}</span>
                            </div>
                            <div className="text">{data.couponType == 1 ? `满${data.fullMoney}元使用` : "直减券"}</div>
                        </div>
                        <div className="right-bg ">
                            <div className="top">
                                <span className="tip-tag ">V券</span>
                                <span className="name">
			  			<Text
                            text={data.instruction}
                            row={2}
                            size="md"
                        />
			  		</span>
                            </div>
                            <div className="center">

                                <span className="dianji" onClick={this.onClickEvent.bind(this, data)}>立即领取</span>
                            </div>
                            <div className="dashed"></div>
                            <div className="time">
                                有效期:{`${data.useStartDate.split(" ")[0]} - ${data.useEndDate.split(" ")[0]}`}</div>
                        </div>
                        <div className="right">
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                        </div>
                    </Flex>)
            case 6 :
                return (
                    <Flex>
                        <div className="left">
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                        </div>
                        <div className="left-bg ">
                            <div className="content">
                                <span className="iconfont icon-renmingbi money"></span>
                                <span className="number">{data.cutMoney}</span>
                            </div>
                            <div className="text">{data.couponType == 1 ? `满${data.fullMoney}元使用` : "直减券"}</div>
                        </div>
                        <div className="right-bg ">
                            <div className="top">
                                <span className="tip-tag ">V券</span>
                                <span className="name">
			  			<Text
                            text={data.instruction}
                            row={2}
                            size="md"
                        />
			  		</span>
                            </div>
                            <div className="center">

                            </div>
                            <div className="dashed"></div>
                            <div className="time">
                                有效期:{`${data.useStartDate.split(" ")[0]} - ${data.useEndDate.split(" ")[0]}`}</div>
                        </div>
                        <div className="right">
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                        </div>
                    </Flex>)
            case 7 :
                return (
                    <Flex  onClick={this.radioCheck.bind(this,data.id)}>
                        <div className="left">
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                        </div>
                        <div className="left-bg ">
                            <div className="content">
                                <span className="iconfont icon-renmingbi money"></span>
                                <span className="number">{data.cutMoney}</span>
                            </div>
                            <div className="text">{data.couponType == 1 ? `满${data.fullMoney}元使用` : "直减券"}</div>
                        </div>
                        <div className="right-bg ">
                                <div className="top">
                                    <span className="tip-tag">V券</span>
                                    <span className="name">
                                        <Text
                                            text={data.instruction}
                                            row={2}
                                            size="sm"
                                        />
                                    </span>
                                </div>
                                <div className="center">
                                    <Radio
                                        checked={data.check}
                                        className="my-radio"/>
                                </div>
                                <div className="dashed"></div>
                                <div className="time">
                                    有效期:{`${data.useStartDate.split(" ")[0]} - ${data.useEndDate.split(" ")[0]}`}</div>
                        </div>

                        <div className="right">
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                            <div className="item "></div>
                        </div>
                    </Flex>)
            default:
                break;
        }
    }

    render() {
        const {data} = this.props;
        console.dir(data)
        return (
            <div className="stamp">
                {this.renderCoupon(data)}
            </div>
        )
    }
}

export default CouponTem
