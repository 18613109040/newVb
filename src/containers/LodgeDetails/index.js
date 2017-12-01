import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {render} from 'react-dom';
import { Carousel, List, Accordion, Toast,Calendar } from 'antd-mobile';
import {
    getHoteSelectDate,
    getRoomDetail,
    getHoteDetails,
    emptyhostDetails,
    updataHoteDetails
} from "../../actions/sblodge"
import Text from "../../components/Text";
import Rate from '../../components/Rate'
import CommodityPrice from '../../components/CommodityPrice';
import {SingleImgView} from '../../components/ImageView'
import {storage, convertTimeToStr, getdayByStartToEnd} from '../../utils/tools';
import {changeNavbarTitle} from '../../actions/home'
import './index.less'
const Item = List.Item;
const Brief = Item.Brief;
class LodgeDetails extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            roomshow: false,
            roomData: {},
            roomImage: [],
            config: {},
        }

    }

    componentDidMount() {
        this.props.dispatch(changeNavbarTitle("酒店详情"))
        if (this.props.hostdetails.code !== 0) {
            const {id} = this.props.location.query;
            this.props.dispatch(getHoteDetails(id))
        }

        /*this.props.dispatch(getHoteSelectDate({
            checkInDate:"",
            checkOutDate:"",
            hotelId:id
        }))*/
    }

    componentWillUnmount() {
        this.props.dispatch(emptyhostDetails())
    }

    onChange = (key) => {
     
    }
    /*酒店介绍*/
    introduce = () => {
        const {id} = this.props.location.query;
        this.context.router.push(`/hotelintroduce?id=${id}`);
    }

    /**酒店预定**/
    reservation(item, type) {
        storage.setObj({
            hotel: Object.assign({}, item,
                {type: type},
                {
                    checkInDate: this.props.hostdetails.data.checkInDate,
                    checkOutDate: this.props.hostdetails.data.checkOutDate,
                    hotelName: this.props.hostdetails.data.hotelName,
                    hotelId: this.props.hostdetails.data.hotelId
                })
        })


        this.context.router.push(`/hotelorder?id=${item.roomId}&type=${type}`);
    }

    checkCalender = () => {
        this.setState({
            show: true
        })
    }
    clickCalenderBack = () => {
        this.setState({
            calenderShow: false
        })
    }
    calenderSelect = (date) => {
        if (date.eventType == 3) {
            const {id} = this.props.location.query;
            this.props.dispatch(getHoteSelectDate({
                checkInDate: convertTimeToStr(date.start, "yyyy-MM-dd"),
                checkOutDate: convertTimeToStr(date.end, "yyyy-MM-dd"),
                hotelId: id
            }, (res) => {
                if (res.code == 0) {
                    this.props.dispatch(updataHoteDetails({
                        checkInDate: convertTimeToStr(date.start, "yyyy-MM-dd"),
                        checkOutDate: convertTimeToStr(date.end, "yyyy-MM-dd"),
                        rooms: res.data
                    }))
                } else {
                    Toast.info(res.message, 1);
                }
            }))

        }

    }

    showRoomDatial(roomId) {

        this.props.dispatch(getRoomDetail(roomId, {}, (res) => {
            if (res.code == 0) {
                this.setState({
                    //roomshow:true,
                    roomData: res.data,
                    roomImage: Array.of(res.data.imageUrl1, res.data.imageUrl2, res.data.imageUrl3)
                })
                let imagelist = Array.of(res.data.imageUrl1, res.data.imageUrl2, res.data.imageUrl3).filter(item => item != "")
                SingleImgView.show({
                    imagelist,
                    footer: () => {
                        return (<div className="footer-desc-vb">
                            <div>{res.data.roomName}</div>
                            <div>
                                <div>
                                    <div className="div-3">楼层:{res.data.roomFloor}</div>
                                    <div className="div-4">床形:{res.data.bedType}</div>
                                    <div>楼面积:{res.data.roomArea}</div>
                                </div>
                            </div>
                            <div>
                                描述:{res.data.roomIntro}
                            </div>
                        </div>)
                    },
                    close: () => {
                        SingleImgView.hide()
                    }
                });
            }
        }))
    }
    onCancel=()=>{
        this.setState({
            show: false
        });
    }
    onConfirm=(startTime,endTime)=>{

        if(startTime.toString()===endTime.toString()){

            endTime = new Date(endTime).getTime()+86400000
        }
        this.setState({
            show: false,
        });
        const {id} = this.props.location.query;
        this.props.dispatch(getHoteSelectDate({
            checkInDate: convertTimeToStr(startTime, "yyyy-MM-dd"),
            checkOutDate: convertTimeToStr(endTime, "yyyy-MM-dd"),
            hotelId: id
        }, (res) => {
            if (res.code == 0) {
                this.props.dispatch(updataHoteDetails({
                    checkInDate: convertTimeToStr(startTime, "yyyy-MM-dd"),
                    checkOutDate: convertTimeToStr(endTime, "yyyy-MM-dd"),
                    rooms: res.data
                }))
            } else {
                Toast.info(res.message, 1);
            }
        }))
    }
    onSelectHasDisableDate=()=>{

    }
    getDateExtra=()=>{

    }
    render() {
        const now = new Date();
        const {data} = this.props.hostdetails
        const hProp = this.state.initialHeight ? {height: this.state.initialHeight} : {};
        return (
            <div className="Lodge-details">

                <div className="lodge-content nav-content" style={{
                    height: document.documentElement.clientHeight - 100,
                    overflow: 'auto',
                }}>
                    <List>
                        <Item
                            arrow="horizontal"
                            multipleLine
                            extra="酒店介绍"
                            onClick={this.introduce}
                        >
                            {data.hotelName}
                            <Brief>
                                <Rate value={parseInt(data.hotelStar)}/>
                            </Brief>
                        </Item>
                    </List>
                    <List>
                        <Carousel
                            className="my-carousel-sild"
                            autoplay={true}
                            infinite={true}
                            selectedIndex={1}
                            swipeSpeed={35}
                        >
                            {data.hotelImgs.filter(item => item != "").map((item, id) => (
                                <div style={hProp} key={id}>
                                    <img
                                        src={item}
                                        style={{width: "100%"}}
                                        alt="icon"
                                        onLoad={() => {
                                            window.dispatchEvent(new Event('resize'));
                                            this.setState({
                                                initialHeight: null,
                                            });
                                        }}
                                    />
                                </div>
                            ))}
                        </Carousel>
                    </List>
                    <List>
                        <Item
                            arrow="horizontal"
                            extra=""
                        >
                            <div className="item-1">
                                <span className="span-1">特色服务</span>
                                <span className="span-2">{data.hotelService}</span>
                            </div>
                        </Item>
                    </List>
                    <List className="my-list-canner">
                        <Item
                            arrow="horizontal"
                            extra={`住${getdayByStartToEnd(data.checkInDate, data.checkOutDate).length}晚`}
                            onClick={this.checkCalender}
                        >
                            <div className="item-1">
								<span className="span-1">
									<i className="icon-date iconfont"></i>
								</span>
                                <span className="span-2">
									{data.checkInDate}-{data.checkOutDate}
								</span>
                            </div>
                        </Item>
                    </List>
                    <Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChange}>
                        {
                            data.rooms.map((item, id) => (
                                <Accordion.Panel key={id} header={
                                    <List>
                                        <Item
                                            thumb={<img onClick={this.showRoomDatial.bind(this, item.roomId)}
                                                        src={item.thumbUrl}/>}
                                            extra={
                                                <div>
                                                    <div className="right-ic">
                                                        <CommodityPrice
                                                            price={item.retailPrice}
                                                            unit=""
                                                            priceStyle="lg-price"
                                                            iconStyle="lg-icon"
                                                        />
                                                    </div>

                                                </div>
                                            }
                                        >
							    	<span>
							    		<Text
                                            text={item.roomName}
                                            row={2}
                                            textType="base"
                                        />
							    	</span>
                                            <Brief>
                                                {item.bedType}
                                            </Brief>
                                        </Item>
                                    </List>
                                }>
                                    <List className="my-list">
                                        <Item
                                            multipleLine
                                            extra={
                                                <div className="fix-right-box">
                                                    <div className="box-1">
                                                        <CommodityPrice
                                                            price={item.retailPrice}
                                                            unit=""
                                                            priceStyle="lg-price"
                                                            iconStyle="lg-icon"
                                                        />
                                                    </div>
                                                    <div className="box-2">
                                                        <div className="yuding"
                                                             onClick={this.reservation.bind(this, item, 1)}>

                                                        </div>
                                                    </div>
                                                </div>
                                            }>
                                            在线预定
                                        </Item>
                                        {
                                            this.props.userInfo.availableVMoney >= item.integral ? (
                                                <Item
                                                    multipleLine
                                                    extra={
                                                        <div className="fix-right-box">
                                                            <div className="box-1">
                                                                <CommodityPrice
                                                                    price={item.integral}
                                                                    unit=""
                                                                    icon="icon-vbi"
                                                                    priceStyle="lg-price"
                                                                    iconStyle="lg-icon"
                                                                />
                                                            </div>
                                                            <div className="box-2">
                                                                <div className="yuding"
                                                                     onClick={this.reservation.bind(this, item, 0)}>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                >
                                                    V币兑换
                                                </Item>
                                            ) : ""
                                        }
                                    </List>
                                </Accordion.Panel>
                            ))
                        }
                    </Accordion>

                    <Calendar
                        {...this.state.config}
                        visible={this.state.show}
                        onCancel={this.onCancel}
                        onConfirm={this.onConfirm}
                        onSelectHasDisableDate={this.onSelectHasDisableDate}
                        getDateExtra={this.getDateExtra}
                        defaultDate={now}
                        minDate={new Date(+now - 5184000000)}
                        maxDate={new Date(+now + 31536000000)}
                    />
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        hostData: state.hostData,
        hostdetails: state.hostdetails,
        userInfo: state.userInfo
    }
}

export default connect(mapStateToProps)(LodgeDetails)
