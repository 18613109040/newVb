import React, {Component} from "react";
import { Link } from "react-router";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Loading from '../../components/Loading'
import Assess from '../../components/Assess'
import {getImpcommentDetail,emptyImpcommentDetail} from '../../actions/evaluation'
import {changeNavbarTitle} from '../../actions/home'
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

        this.props.dispatch(changeNavbarTitle("评价详情"))

    }
	render() {

		return(
			<div className="commect-product">
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
