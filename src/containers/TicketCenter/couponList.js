import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Toast, ListView,Button } from 'antd-mobile';
import {selectCoupons, addUserCoupon,changeCouponsCentre,emptyCouponsCentre} from '../../actions/coupon'
import {changeProductCoupon} from "../../actions/product";
import {changeNavbarTitle} from '../../actions/home'
import ListViewProduct from '../../components/ListViewProduct'
import Text from "../../components/Text";
import './index.less'

class CouponTem extends Component{
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
    }

      render(){
        let {data} =this.props
        return (
            <div className="coupon-item">
                <div className="c-left"><img src={require(`../../assets/images/coup${data.productRange}.png`)} /></div>
                <div className="c-center">
                    <div className="name">{data.instruction}</div>
                    <div className="money">
                        <span className="cutMoney">￥{data.cutMoney}</span>
                        <div className="text">{data.couponType == 1 ? `满${data.fullMoney}元使用` : "直减券"}</div>
                    </div>
                </div>
                
                <div className="c-right">
                {
                    data.hasGet==1?
                    <img className="hasGet-img" src={require(`../../assets/images/yilingqu-icon.png`)}/>
                    :(
                    data.couponNum != data.receiveNum ?
                    this.renderCircle((data.couponNum-data.receiveNum)/data.couponNum)
                    :
                    <img className="over-img" src={require(`../../assets/images/coup3.png`)}/>
                    )

                }
                {
                    data.hasGet==1?
                    <span className="btn over" onClick={()=>{
                        if(data.productRange==1)
                            this.context.router.push(`/activityProduct?id=${data.rangeId}`)
                        else
                            this.context.router.push('/classification')
                    }}>去使用</span>
                    :
                     <span className="btn" onClick={this.props.onClickEvent.bind(this,data)}>立即领取</span>
                }
                   
                </div>
                    
                
                
            </div>
        )

    }
    renderCircle(percent){
        let l_rotate=0,r_rotate=0
        if(percent<0.5){
            l_rotate= 360*percent +45
            r_rotate=45
           
        }else{
            let rotate= (percent-0.5)*360
            if(rotate>45){
                r_rotate= -(rotate-45)
            }else{
                r_rotate= 45-rotate
            }
          
            l_rotate =-135

        }
   
        return(
            <div className="circleProgress_wrapper">
                <span className="circleProgress-text">{(percent*100).toFixed()+"%"}<br/>剩余</span>
                <div className="wrapper right">
                    <div className="circleProgress rightcircle"  style={{transform:`rotate(${r_rotate}deg)`}}></div>
                </div>
                <div className="wrapper left">
                    <div className="circleProgress leftcircle" style={{transform:`rotate(${l_rotate}deg)`}}></div>
                </div>
            </div>
        )
    }
}

class TicketCenter extends Component {
    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1.orderId !== row2.orderId
        })
        this.searchData = []
        this.state = {
            isLoading: false,
            hasMore: false,
        }

    }
    componentWillMount() {
        this.props.dispatch(changeNavbarTitle("领券中心"))
    }

    componentDidMount() {
        this.getData(1);
    }
    componentWillUnmount(){

        this.props.dispatch(emptyCouponsCentre())
    }

    getData(pageNow){
        this.props.dispatch(selectCoupons({
            pageNow: pageNow,
            pageSize: 10
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
    onClickEvent = (data) => {
        this.props.dispatch(addUserCoupon({
            couponId: data.id,
            couponType: data.couponType
        }, (res) => {
            this.props.dispatch(changeCouponsCentre(data))
            Toast.info(res.message, 0.5, null, false);
        }))
    }

    onEndReached = () => {
        if (!this.state.hasMore ) {
            return;
        }
        this.setState({isLoading: true});
        setTimeout(()=>{

            this.getData(this.props.couponCentre.data.pageOffset + 1)
        },100)

    }
    
    render() {
        const row = (data, sectionID, rowID) => {
            return (
                    <CouponTem
                        data={Object.assign({}, data, {status: 5})}
                        onClickEvent={this.onClickEvent}
                    />
                )

        }
        let dataSource = this.dataSource.cloneWithRows(this.props.couponCentre.data.datas)
        return (
            <div className="coupon-center">
              
                <div className='nav-content'>
                    <ListViewProduct
                        row={row}
                        dataSource={dataSource}
                        status={this.props.couponCentre.code}
                        data={this.props.couponCentre.data}
                        isLoading={this.state.isLoading}
                        reflistview="listrefs"
                        onEndReached={this.onEndReached}
                        type={2}
                        height={document.documentElement.clientHeight - 100}
                        empty_type={3}
                        empty_text={'小主，敬请关注优惠券发放哦！'}
                    />

                </div>

            </div>
        )
    }
    
}


function mapStateToProps(state) {
    return {
        couponCentre:state.couponCentre
    }
}

export default connect(mapStateToProps)(TicketCenter)
