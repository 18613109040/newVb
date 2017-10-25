import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Flex, Icon, List, Accordion, Checkbox, Tag, InputItem, Toast, Popup} from 'antd-mobile';
import {getHoteDetails, gethotelOrder, orderSubmit} from "../../actions/sblodge"

const Item = List.Item;
const Brief = Item.Brief;
const AgreeItem = Checkbox.AgreeItem;
import {storage, getdayByStartToEnd} from '../../utils/tools';
import CommodityPrice from '../../components/CommodityPrice';
import NavBar from '../../components/NavBar'
import './index.less'

class HotelOrder extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.checkInUsers = []
        this.state = {
            activeKey: [],
            selected: 1,
            phone: "",
            hasError: false,
            checked: true,
            show: false
        }

    }

    componentWillMount() {

    }

    componentDidMount() {
        const hotel = storage.get("hotel");
        const {id} = this.props.location.query;
        this.props.dispatch(gethotelOrder({
            roomId: id,
            checkInDate: hotel.checkInDate,
            checkOutDate: hotel.checkOutDate
        }))
    }

    onChange = (key) => {
        this.setState({
            activeKey: key
        })
    }

    checkRoom(index) {
        this.setState({
            activeKey: [],
            selected: index,
            name: ""
        })
        this.checkInUsers.length = index;
    }

    onNameChange(id, value) {
        this.checkInUsers[id] = value
    }

    phoneClick = (value) => {
        this.setState({
            phone: value
        })
        if (value.replace(/\s/g, '').length < 11) {
            this.setState({
                hasError: true,
            });
        } else {
            this.setState({
                hasError: false,
            });
        }
    }
    onErrorClick = () => {
        if (this.state.hasError) {
            Toast.info('请输入11位手机号码', 1);
        }
    }
    clickMingxi = (e) => {
        e.preventDefault();
        this.setState({
            show: !this.state.show
        })

    }
    checkAgree = (e) => {
        this.setState({
            checked: e.target.checked
        })
    }
    agreement = () => {
        this.context.router.push(`/agreement`)
    }
    submitdindan = () => {
        if (this.state.hasError || this.state.phone == "") {
            Toast.info('请输入11位手机号码', 1);
            return;
        }
        if (this.checkInUsers.length !== this.state.selected) {
            Toast.info('请填写入住人姓名', 1);
            return;
        }
        if (!this.state.checked) {
            Toast.info('请你同意思埠客栈服务协议', 1);
            return;
        }
        const {data} = this.props.hotelorder;
        let money = 0;
        let vb = 0;
        data.map(item => {
            money += item.price * this.state.selected;
            vb += item.integral * this.state.selected
        })
        const {id} = this.props.location.query;
        const hotel = storage.get("hotel");
        this.props.dispatch(orderSubmit({
            roomId: id,
            checkInDate: hotel.checkInDate,
            checkOutDate: hotel.checkOutDate,
            hotelId: hotel.hotelId,
            orderType: hotel.type,
            checkInUsers: this.checkInUsers.toString().replace(/,/g, "/"),
            phone: this.state.phone,
            roomNumber: this.state.selected,
            idCard: "140429199011218088"
        }, (res) => {
            if (res.code == 0 && hotel.type == 0) {
                this.context.router.push(`/sendSms?money=${vb}&id=${res.data}&type=hotel`);
            } else if (res.code == 0 && hotel.type == 1) {
                this.context.router.push(`/onlinePayment?id=${res.data}`);
            } else {
                Toast.fail(res.message, 1.5);
            }
        }))

    }

    render() {
        const {data} = this.props.hotelorder;
        let money = 0;
        let vb = 0;
        data.map(item => {
            money += item.price * this.state.selected;
            vb += item.integral * this.state.selected
        })
        const hotel = storage.get("hotel");
        let nameArray = Array(this.state.selected).fill("name");
        return (
            <div className="hotel-order">
                <NavBar title="订单填写" {...this.props}/>

                <div className="nav-content" style={{height: document.body.scrollHeight - 190}}>
                    <List>
                        <Item
                            extra={`共${data.length}晚`}
                        >
                            <div className="name">{hotel.hotelName}</div>
                            <Brief>
                                <div>入住时间:{hotel.checkInDate}-{hotel.checkOutDate}</div>
                                <div>入住房型:{hotel.bedType}</div>
                            </Brief>
                        </Item>
                    </List>
                    <Accordion activeKey={this.state.activeKey} onChange={this.onChange}>
                        <Accordion.Panel
                            header={<div>
                                <span>房间数</span>
                                <span>{this.state.selected}</span>
                            </div>}>
                            <div>
                                <List>
                                    <Item>
                                        <Tag selected={this.state.selected == 1}
                                             onChange={this.checkRoom.bind(this, 1)}>1间</Tag>
                                        <Tag selected={this.state.selected == 2}
                                             onChange={this.checkRoom.bind(this, 2)}>2间</Tag>
                                        <Tag selected={this.state.selected == 3}
                                             onChange={this.checkRoom.bind(this, 3)}>3间</Tag>
                                    </Item>
                                </List>

                            </div>
                        </Accordion.Panel>
                    </Accordion>
                    {nameArray.map((item, id) => (
                        <List key={id}>
                            <InputItem
                                clear
                                onChange={this.onNameChange.bind(this, id)}
                                placeholder="每间需要填写1人姓名">
                                入住人{nameArray.length > 1 ? id + 1 : ""}
                            </InputItem>
                        </List>
                    ))}
                    <List>
                        <InputItem
                            clear
                            value={this.state.phone}
                            type="phone"
                            error={this.state.hasError}
                            onErrorClick={this.onErrorClick}
                            onChange={this.phoneClick}
                            placeholder="用于接收通知短信">
                            联系手机
                        </InputItem>
                    </List>

                    <List>
                        <Item><span className="guizetitle">订单取消规则</span></Item>
                        <div className="guize">

                            订单支付后，根据客栈的要求，
                            在订单入住日期前3天取消订单申请退款，
                            全额退款；若在订单入住日期3天内（含入住日期当天）
                            及之后取消订单申请退款，
                            扣除相应违约金，每个客栈与房间的扣违约金可能会不同。

                        </div>
                    </List>
                    <div className="wenxi">
                        <p>温馨提示：酒店通常14点开始办理入住，早到店可能需要等待，具体以酒店安排为准备</p>
                    </div>

                    <div className="div-t">
                        <AgreeItem checked={this.state.checked} data-seed="logId" onChange={this.checkAgree}>
                            同意
                            <span className="xieyi" onClick={this.agreement}>《思埠客栈服务协议》</span>
                        </AgreeItem>
                    </div>
                </div>
                <div className="vb-tab-bar-fix">
                    <div className="end-div">
                        <Flex justify="around">
                            <Flex.Item style={{"textAlign": "right"}}>
                                {
                                    hotel.type == 0 ? (
                                        <CommodityPrice
                                            price={vb}
                                            unit=""
                                            priceStyle="lg-price"
                                            icon="icon-vbi"
                                            iconStyle="lg-icon"
                                        />
                                    ) : (
                                        <CommodityPrice
                                            price={new Number(money).toFixed(2)}
                                            unit=""
                                            priceStyle="lg-price"
                                            iconStyle="lg-icon"
                                        />
                                    )
                                }

                            </Flex.Item>
                            <Flex.Item style={{"textAlign": "right"}} onClick={this.clickMingxi}>
                                明细<i className="iconfont icon-upjiantou"></i>
                            </Flex.Item>
                            <Flex.Item>
					      	<span className="btn-right-submit-block" onClick={this.submitdindan}>
								    <div>提交订单</div>
								  </span>
                            </Flex.Item>
                        </Flex>
                    </div>
                </div>
                {
                    this.state.show ? (
                        <div>
                            <div className='am-popup-mask-1'></div>
                            <div className="sb_markDiv ">
                                <List>
                                    <Item>{hotel.roomName},{this.state.selected}间{this.props.hotelorder.data.length}晚</Item>
                                    {
                                        data.map((item, id) => (
                                            <Item
                                                extra={hotel.type == 0 ? `${item.integral} x ${this.state.selected}` : `￥${item.price} x ${this.state.selected}`}
                                                key={id}>{item.stockDate}</Item>
                                        ))
                                    }
                                    <Item extra={hotel.type == 0 ? `${vb}` : `￥${Number(money).toFixed(2)}`}>订单价格</Item>
                                </List>
                            </div>
                        </div>
                    ) : ""
                }

            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        hotelorder: state.hotelorder
    }
}

export default connect(mapStateToProps)(HotelOrder)
