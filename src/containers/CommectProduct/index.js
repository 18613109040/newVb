import React, {Component} from "react";
import { Link } from "react-router";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {Flex,List} from 'antd-mobile';
import Loading from '../../components/Loading'
import Rate from '../../components/Rate'
import Assess from '../../components/Assess'
import {getImpcommentDetail,emptyImpcommentDetail} from '../../actions/evaluation'
const Item = List.Item;
import NavBar from '../../components/NavBar'
class CommectProduct extends Component {
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
		const {productId,order1Id} = this.props.location.query;
		this.props.dispatch(getImpcommentDetail(productId+'/'+order1Id ))

	}
    componentWillUnmount(){
        this.props.dispatch(emptyImpcommentDetail())

    }
	render() {

		return(
			<div className="commect-product">
				<NavBar title="评价详情" {...this.props}/>
				<div className="nav-content">
				{
				this.props.impcommentdetail.code==-1?(<Loading/>):
				<Assess data={this.props.impcommentdetail.data}/>
				}
				</div>
			</div>
		)
	}
}


function mapStateToProps(state) {
	return {
		impcommentdetail:state.impcommentdetail
	}
}
export default connect(mapStateToProps)(CommectProduct)
