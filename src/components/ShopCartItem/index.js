import React, {Component} from "react";
import {Checkbox,Stepper } from 'antd-mobile';
import { Link } from "react-router";
import PropTypes from 'prop-types';
import CommodityPrice from '../CommodityPrice';
import Text from "../Text";
class ShopCartItem extends Component {
	static propTypes = {
		checkChange:PropTypes.func,
		deleteShop:PropTypes.func,
		collection:PropTypes.func,
		shopNumberClick:PropTypes.func,
		eidt:PropTypes.bool,
		data:PropTypes.object,


	};
	static defaultProps = {
		eidt:false
	};
	constructor(props) {
		super(props);
		this.state = {
			val:this.props.data.amount
		}

	}
	deleteShop = (id,skuId)=>{
		if(this.props.deleteShop instanceof Function ){
			this.props.deleteShop(id,skuId)
		}
	}
	collection(){

	}
	checkChange=(id,skuId)=>{
		if(this.props.checkChange instanceof Function ){
			this.props.checkChange(id,skuId)
		}
	}
  onChange = (id,skuId,val) => {
    this.setState({ val });
    if(this.props.shopNumberClick instanceof Function ){
			this.props.shopNumberClick(id,skuId,val)
		}
  }
	render() {

		return(
			<div className="shop-cart-item">
				<div className="check-wrapper">
					<Checkbox
						checked={this.props.data.check}
						onChange={this.checkChange.bind(this,this.props.data.data.imProductId,this.props.data.skuId)}
					/>
				</div>
				<div className="shp-cart-item-core">
					<Link to={`/product?id=${this.props.data.data.imProductId}`} className="cart-product-cell-1">
						<img src={this.props.data.data.bannelImg1}/>
					</Link>
					<div className="cart-product-cell-2">
						<div className="cart-product-name">
							<Link to={`/product?id=${this.props.data.data.imProductId}`}>
								<span >
									<Text
										text={this.props.data.data.name}
										row={2}
										textType="base"
									/>
								</span>
							</Link>
						</div>
						<div className="cart-product-prop">
							{this.props.data.specDetail}
						</div>
						<div className="cart-product-cell-3">
							<span className="shp-cart-item-price ">
								{
									this.props.eidt?(
										<div className="eidt-options">
											<i className="icon-size iconfont icon-collection"onClick={this.collection} ></i>
											<i className="icon-size iconfont icon-delete" onClick={this.deleteShop.bind(this,this.props.data.data.imProductId,this.props.data.skuId)} ></i>
										</div>):(

						        		this.props.data.data.productType==1?(
						        			<div className="prod-price">
						        				<CommodityPrice
															price={new Number(this.props.data.data.retailPrice).toFixed(2)}
															unit=""
															iconStyle="base-icon"
															priceStyle="base-price"/>
						        			</div>):(
						        			<div className="prod-price">
						        				<CommodityPrice
							        				price={this.props.data.data.exchangeIntegral}
							        				unit="V币"
															icon="icon-vbi"
															iconStyle="base-icon"
															priceStyle="base-price"
						        				/>
						        			</div>)

										)
								}

							</span>

							<div className="quantity-wrapper">
								<Stepper
			            style={{ width: '100%', minWidth: '2rem' }}
			            showNumber
			            max={this.props.data.data.stockNum}
			            min={1}
			            value={this.state.val}
			            onChange={this.onChange.bind(this,this.props.data.data.imProductId,this.props.data.skuId)}
			          />
							</div>

						</div>
					</div>
				</div>
			</div>
		)
	}
}
export default ShopCartItem
