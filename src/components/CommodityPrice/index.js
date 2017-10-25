/**
 * 商品价格
 */
import React, {Component} from "react";
import {  TabBar, Icon } from 'antd-mobile';
import { Link } from "react-router";
import PropTypes from 'prop-types';
import './index.less'
class CommodityPrice extends Component {
	static propTypes = {
		icon:PropTypes.string,
		unit:PropTypes.string,
		price:PropTypes.any,
		iconStyle:PropTypes.string, //base-icon lg-icon small-icon
		priceStyle:PropTypes.string,
		unitStyle:PropTypes.string
	};
  static contextTypes={
  	router: PropTypes.object.isRequired,
	};
	static defaultProps = {
		price:1259,
		unit:"元",
		icon:"icon-qian1",
		iconStyle:"small-icon",
		priceStyle:"lg-price",
		unitStyle:"base-unit"
	};
	constructor(props) {
		super(props);
		this.state = {
			
		}
		
	}
	render() {
	
		return(
			<div className="commodity-price">
       	<i className={`iconfont  ${this.props.icon} ${this.props.iconStyle}` }></i>
       	<span className={`${this.props.priceStyle}`}>{this.props.price}</span>
       	<span className={`${this.props.unitStyle}`}>{this.props.unit}</span>
      </div>
		)	
	}
}
export default CommodityPrice