//我的订单
import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Tabs} from 'antd-mobile';
import {getHotelList} from '../../actions/hotel'
import {changeNavbarTitle} from '../../actions/home'
import './index.less'
const tabs = [
  { title: '全部', sub: '1' },
  { title: '待付款', sub: '2' },
  { title: '待入住', sub: '3' },
   { title: '已入住', sub: '4' },
];



class HotelList extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentWillMount() {
        this.props.dispatch(changeNavbarTitle("思埠之家"))
    }
    componentDidMount() {
        if (this.props.hotelList.code == -1) {
            this.props.dispatch(getHotelList({
                pageNow: 1,
                pageSize: 10,
                orderStatus:0
            }))
        }

    }
    TabClick =(tab, index)=>{


    }


    renderItem(){
        return(
            <section className="item-order">
                <section className="o-title" >
                    <div className="tt">
                        <div className="h-name text-ellipsis " >云南丽江最相思假日别院</div><strong className="h-status ">已失效</strong>
                    </div>
                    <div className="ti text-ellipsis"><span>入住：<i  className="">2017-07-19</i></span><span className="la-ti">退房：<i className="">2017-07-20</i></span>
                    </div>
                </section>
                <div>
                    <section className="o-day-loop ">
                        <div className="d-wrap">
                            <div className="o-fx">
                                <div className="fx-name text-ellipsis ">榻榻米双人房(1楼/双人床1.2m，2张)</div><span className="fx-time text-ellipsis">入住时间：<span className="">2017-07-19</span></span>
                            </div>
                            <div className="text-ellipsis order-code">订单号：<span className="">H0491500661855827000</span>
                            </div>
                            <div className="o-fx order-process-look">
                                <span className="fx-name text-ellipsis " >未支付</span>
                                <div className="fx-time"><a  className="cancel-order proc ">查看进度</a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <section className=" o-bottom">
                    <div className="tt">
                        <div className="h-name text-ellipsis ">订单价格：￥<span >150.00</span></div>
                    </div>
                </section>
            </section>
        )
    }
    render() {

        const {key} = this.props.location.query;
        let offsetX = -10; // just for pc demo
        if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
            offsetX = -26;
        }
        return (
            <div className="my-order ">
                <div className="nav-content">
                <Tabs tabs={tabs}
                  initialPage={1}
                  onChange={(tab, index) => { console.log('onChange', index, tab); }}
                  onTabClick={this.TabClick}
                >
                 <div className="hotel-list">
                     {this.renderItem()}
                 </div>
                 <div className="hotel-list">
                     {this.renderItem()}
                 </div>
                 <div className="hotel-list">
                     {this.renderItem()}
                 </div>
                 <div className="hotel-list">
                     {this.renderItem()}
                 </div>

                </Tabs>

                </div>

            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        hotelList: state.hotelList
    }
}

export default connect(mapStateToProps)(HotelList)
