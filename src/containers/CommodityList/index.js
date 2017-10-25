/*
 * 商品清单
 */
import React, {Component} from "react";
import { Link } from "react-router";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {NavBar,Icon,List,Card} from 'antd-mobile';
import CommodityPrice from "../../components/CommodityPrice";
import Text from "../../components/Text";
const Item = List.Item;
const Brief = Item.Brief;
class CommodityList extends Component {
	static propTypes = {

	};

	static defaultProps = {

	};
	static contextTypes={
  	router: React.PropTypes.object.isRequired
	};
	constructor(props) {
		super(props);
		this.state = {
		

		}
		
	}
	componentDidMount (){

	}

	render() {
		const tempProduct = this.props.tempProduct.filter(item=>item.check == true);
		console.dir(tempProduct)
		return(
			<div className="commodity-list">
				<NavBar
					leftContent={<div className='iconfont icon-back back-size' onClick={()=>{this.props.router.goBack()}}></div>}
		      mode="light"
		    >商品清单</NavBar>
		    <div className="nav-content">
		    	<List>
		    	  {
		    	  	tempProduct.map((item,index)=>(
		    	  	<Item
		    	  		key={index}
		    	  		extra={<div>x{item.amount}</div>}
				    	>
		    	  		<div className="banner-img">
		    	  			<img src={item.data.bannelImg1}/>
		    	  		</div>
				    		<div className="name">
					    		<div className="title">
						    		<Text 
											text={item.data.name} 
											row={2}
											 textType="base"
										/>
									</div>
					    		<Brief>
					    			{
					        		item.data.productType==1?(
													<CommodityPrice
														price={item.data.retailPrice.toFixed(2)} 
														priceStyle="lg-price"
														iconStyle="lg-icon"
													/>
					        			):(
					        				<CommodityPrice 
						        				price={item.data.exchangeIntegral}
						        				unit="V币"
														icon="icon-vbi"
					        				/>
					        			)
					        	}
					    			
					    		</Brief>
					    	</div>
				    	</Item>
		    	  	))
		    		}
		    	  
		        
		    	</List>
		    </div>
			</div>
		)	
	}
}


function mapStateToProps(state) {
	return {
		tempProduct:state.tempProduct
	}
}
export default connect(mapStateToProps)(CommodityList)
