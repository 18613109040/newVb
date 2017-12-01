import React, {Component} from "react";
import { Link } from "react-router";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {Flex ,List,Radio,WhiteSpace} from 'antd-mobile';
import {orderCashSubmit} from "../../actions/sblodge"
import Text from "../../components/Text";
import CommodityPrice from '../../components/CommodityPrice';
import './index.less'
const Item = List.Item;
const RadioItem = Radio.RadioItem;
import {changeNavbarTitle} from '../../actions/home'
class OnlinePayment extends Component {
	static propTypes = {

	};

	static defaultProps = {

	};
	static contextTypes={
  	router: React.PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);
		this.checkInUsers=[]
		this.state = {
			value:0
		}

	}
    componentWillMount() {
        this.props.dispatch(changeNavbarTitle("在线支付"))
    }
	componentDidMount (){
		const {id} = this.props.location.query;
		this.props.dispatch(orderCashSubmit(id))
	}

	submitdindan=()=>{


	}
	onChange = (value) => {
    this.setState({
      value,
    });
  }
	render() {
		const {data} = this.props.ordercase
		const checkData = [
      { value: 0, label: '微信支付' },
      { value: 1, label: '支付宝支付' },
    ];
		return(
			<div className="online-payment">

		    <div className="nav-content" style={{height:document.documentElement.clientHeight-190}}>
		    	<List>
		    		<Item
		    			extra={`共${data.checkinDays}晚`}
		    		>
		    			<div className="name">{data.hotelName}</div>
		    			<div className="div-1">入住时间:{data.checkInDate}至{data.checkOutDate}</div>
		    			<div className="div-2">
			    			<Text
									text={`入住房型:${data.roomName}`}
									row={2}
									textType="base"
								/>
							</div>
		    		</Item>
		    	</List>
		    	<WhiteSpace size="lg" />
		    	<List>
		    	 	<Item>选择支付方式</Item>
		    		{checkData.map(i => (
		          <RadioItem key={i.value} checked={this.state.value === i.value} onChange={() => this.onChange(i.value)}>
		            <i className={i.value==0?"iconfont icon-weixin i-sty":"iconfont  icon-zhifubao i-sty"}></i>
		            <span className="lable">{i.label}</span>
		          </RadioItem>
		        ))}
		    	</List>
		    </div>
		     <div className="vb-tab-bar-fix">
			    	<div className="end-div">
							<Flex justify="around" >
					      <Flex.Item style={{"textAlign": "center"}}>
					      			<CommodityPrice
								        price={new Number(data.orderMoney).toFixed(2)}
								        unit=""
												priceStyle="lg-price"
												iconStyle="lg-icon"
							        />
					      </Flex.Item>

					      <Flex.Item>
					      	<span className="btn-right-submit-block" onClick={this.submitdindan} >
								    <div>去支付</div>
								  </span>
					      </Flex.Item>
					    </Flex>
					  </div>
					</div>


			</div>
		)
	}
}


function mapStateToProps(state) {
	return {
		ordercase:state.ordercase
	}
}
export default connect(mapStateToProps)(OnlinePayment)
