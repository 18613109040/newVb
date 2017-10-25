import React, {Component} from "react";
import { Link } from "react-router";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {List,Cardm,Button,ListView} from 'antd-mobile';
const Item = List.Item;
import Text from "../../components/Text";
import CommodityPrice from "../../components/CommodityPrice";
class ItemEva extends Component {
	static propTypes = {
		deleteCollect:PropTypes.func,
		type:PropTypes.number
	};

	static defaultProps = {
		type:0
	};
	static contextTypes={
  	router: React.PropTypes.object.isRequired
	};
	constructor(props) {
		super(props);
		this.state = {

		}
		
	}
	clickProduct(id){
		
		if(this.props.deleteCollect  instanceof Function  ){
			this.props.deleteCollect(id)
		}
			
		
	}
	itemClick(id){
		this.context.router.push(`/product?id=${id}`)
	}
	render() {
		const {item} = this.props;
		return(
				<div className="div-item">
						<List>
							<Item 
								platform="android"
								>
								<div className="imc-one" >
									<div onClick={this.itemClick.bind(this,item.imProductId)}>
									<div className="imco-l">
										<div className="imco-l-img-box">
											<div className="imco-l-img">
												<img src={item.thumbImg}/>
											</div>
										</div>
									</div>
									<div className="imco-r-content">
										<div >
											<Text 
												text={item.name} 
												row={2}
												textType="base"
											/>
										</div>
										<div className="ping">
				        			{this.props.type==0?
												<CommodityPrice
													price={item.exchangeIntegral} 
													unit="V币"
													icon="icon-vbi"
													priceStyle="small-price"
													iconStyle="small-icon"
												/>:
												<CommodityPrice
													price={Number(item.price).toFixed(2)}
													priceStyle="small-price"
													iconStyle="small-icon"
												/>
												}
				        			</div>
										</div>
										</div>
										<div className="delete-buttom">
											<Button 
												type="ghost" 
												inline size="small"
												onClick={this.clickProduct.bind(this,item.imProductId)} >
			                 		删除收藏
			                </Button>
										</div>
									</div>
									
							</Item>
						</List>
					</div>
		)	
	}
}

export default ItemEva
