//兑换成功
import React, {Component} from "react";
import { Link } from "react-router";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {Flex,NavBar,Button} from 'antd-mobile';
import './index.less'
class SucessExchange extends Component {
	static propTypes = {

	};

	static defaultProps = {
		timemer:null
	};
	static contextTypes={
  	router: React.PropTypes.object.isRequired
	};


	constructor(props) {
		super(props);
		this.state={

		}

	}
	backHome=()=>{
		this.context.router.push(`/home`);
	}
	backList =()=>{
		this.context.router.push(`/myorder?key=1`);
	}
	componentDidMount (){

	}
	render() {
		const {totalIntegral,ex} = this.props.location.query;
		return(
			<div className="send-sms">
				<NavBar
		      mode="light"
		    >兑换成功</NavBar>
				<div className="sucess-exchange nav-content">

					<div className="sucess-bg"></div>
					<div className="sucess-text">兑换成功</div>
					<div className="sucess-msg">
						<span>消费V币:</span>
						<span className='number'>{totalIntegral}</span>
						<span>还剩V币:</span>
						<span className="ex">{ex}</span>
					</div>
					<div className="sucess-btn">
						<div className="back-home">
							<Button
								type="primary"
								onClick={this.backHome}
							>
								返回首页
							</Button>
						</div>
						<div className="back-list">
							<Button
								type="primary"
								onClick={this.backList}
							>
								返回订单列表
							</Button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}


function mapStateToProps(state) {
	return {

	}
}
export default connect(mapStateToProps)(SucessExchange)
