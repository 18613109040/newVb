import React, {Component,PropTypes} from "react";
import { Link } from "react-router";
class ProductList extends Component {
	static propTypes = {
		categoryType:PropTypes.number,
		product:PropTypes.array
	};
  static contextTypes={
  	router: React.PropTypes.object.isRequired,
	};
	static defaultProps = {
		categoryType:1,
		product:[]
	};
	constructor(props) {
		super(props);
		this.state = {

		}

	}

	render() {
		return(
			<div className="slide-box-product">
        {
        		this.props.product.map((item,id)=>(
        			<div className="per-pro" key={id}>
								<a href="#/detail/09a91c18-ae44-4ae1-bb54-145d3511ab14/oN6QWt5_V8lVVMoctoLafdGSBCdM">
									<div className="img">
										<img src={item.thumbImg}/>
									</div>
									<div className="text">
										<span className="name" >{item.name}</span>
										{
											this.props.categoryType==1?(
											<span className="price">
												<i className="_i"/>
												<span className="current-price _rmb">{item.retailPrice}</span>
											</span>):(
											<span className="v-price">
												<i className="_i"/>
												<span className="current-price _rmb">{item.exchangeIntegral}</span>
												<span className="v-gray">V币</span>
											</span>
											)
										}

									</div>
								</a>
							</div>
        		))
        	}
      </div>
		)
	}
}
export default ProductList


//币值符号
export class CommodityIcon extends Component{
	static propTypes = {
		iconType:PropTypes.number.isRequired,
	};
	render(){
		let {iconType} =this.props;
		return(
				iconType==1 ?
	    	<i className="iconfont icon-qian"></i>:<i className="iconfont icon-vbi"></i>
		)

	}
}
