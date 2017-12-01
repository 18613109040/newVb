/**
 * 底部购物组件
 *
 */
import React, {Component} from "react";
import {  Badge } from 'antd-mobile';
import { Link } from "react-router";
import PropTypes from 'prop-types';
import  './index.less'
class Cart extends Component {
	static propTypes = {
  	addCart:PropTypes.func,
  	buyShop:PropTypes.func,
  	onCollection:PropTypes.func,
  	text:PropTypes.number,
  	collection:PropTypes.any,
  	linkto:PropTypes.string
	};
  static contextTypes={
  	router: PropTypes.object.isRequired,
	};
	static defaultProps = {
		text:0,
  	collection:false
	};
	constructor(props) {
		super(props);
		this.state = {
			collection:this.props.collection
		}
		this.onCollection = this._onCollection.bind(this);
		this.addCart = this._addCart.bind(this);
		this.buyShop = this._buyShop.bind(this);
	}
	_onCollection(){
		this.setState({
			collection:!this.state.collection
		})

		if(this.props.onCollection instanceof Function ){
			this.props.onCollection(this.state.collection)
		}
	}
	_addCart(){
		if(this.props.addCart instanceof Function ){
			this.props.addCart()
		}

	}
	_buyShop(){

		if(this.props.buyShop instanceof Function ){
			this.props.buyShop()
		}
	}
	linkKeFu=()=>{
		location.href='https://eco-api.meiqia.com/dist/standalone.html?eid=8444&metadata={"name":"{{user.nickName}}({{user.trueName}})","tel":"{{user.phone}}","等级":"{{user.levelName}}","qq":"{{user.qq}}","weixin":"{{user.wechat}}","gender":"{{user.gender}}","comment":""}'
	}
	render() {

		return(
			<div className="vb-cart vb-tab-bar-fix">
				<div  className="cart-concern-btm-fixed">
					<div className="concern-cart">
						{/*<a className="love-heart-icn" onClick={this.linkKeFu}>
							<div><i className="icon-size iconfont icon-link-kefu"></i></div>
							<span className="focus-info"> 客服  </span>
						</a>*/}
						<Link to={this.props.linkto} className="cart-car-icn">
							<div>
								<span  className="icon-size iconfont icon-cart-1"></span>
								<Badge className="cart-number" text={this.props.text} overflowCount={99} />
							</div>
							{/*<span className="focus-info">购物车</span>*/}
						</Link>
						<a className="love-heart-icn" onClick={this.onCollection} >
							<div><i className={this.state.collection?"icon-size iconfont icon-collection-1":"icon-size iconfont icon-collection"}></i></div>
							{/*<span className="focus-info"> 收藏  </span>*/}
						</a>

					</div>
					{
						this.props.disable?(
							<div className="action-list">
							 	<a className="disable"  >加入购物车</a>
								<a className="disable" >立即购买</a>
							</div>
						):(
							<div className="action-list">
							 	<a className="yellow-color add_cart"  onClick={this.addCart}>加入购物车</a>
								<a className="red-color directorder"  onClick={this.buyShop}>立即购买</a>
							</div>
						)
					}

				</div>

			</div>
		)
	}
}

export default Cart
