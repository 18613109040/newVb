import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { Accordion} from 'antd-mobile';
import {getHoteDetails} from "../../actions/sblodge"
import {changeNavbarTitle} from '../../actions/home'
import './index.less'

class HotelIntroduce extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {}

    }
    componentWillMount() {
        this.props.dispatch(changeNavbarTitle("酒店介绍"))
    }
    componentDidMount() {
        const {id} = this.props.location.query;
        if (this.props.hostdetails.code !== 0) {
            this.props.dispatch(getHoteDetails(id))
        }
    }

    render() {
        const {data} = this.props.hostdetails
        return (
            <div className="hotel-introduce">
                <div className="lodge-content nav-content">
                    <Accordion defaultActiveKey="0">
                        <Accordion.Panel header="酒店信息">
                            <div className="title">
                                <p>酒店名称: {data.hotelName}</p>
                                <p>开业日期: {data.openTime}</p>
                                <p>酒店星级: {data.hotelStar}</p>
                                <p>酒店地址: {data.hotelAddress}</p>
                                <p>联系电话: {data.hotelTelphone}</p>
                                <p>办理时间: {data.checkInTime}</p>
                            </div>
                        </Accordion.Panel>
                        <Accordion.Panel header="特色服务">
                            <div className="title">
                                <p>{data.hotelService}</p>
                            </div>
                        </Accordion.Panel>
                        <Accordion.Panel header="酒店设备">
                            <div className="title">
                                <p>{data.roomEquipment}</p>
                            </div>
                        </Accordion.Panel>
                        <Accordion.Panel header="酒店介绍">
                            <div className="title">
                                <p>{data.intro}</p>
                            </div>
                        </Accordion.Panel>
                        <Accordion.Panel header="酒店政策">
                            <div className="title">
                                <p>所有入住宾客均需携带相关有效证件办理入住</p>
                            </div>
                        </Accordion.Panel>
                    </Accordion>

                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        hostdetails: state.hostdetails
    }
}

export default connect(mapStateToProps)(HotelIntroduce)
