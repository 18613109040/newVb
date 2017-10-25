import React, {Component} from "react";
import { Link } from "react-router";
import PropTypes from 'prop-types';
import NavBar from '../../components/NavBar'
import './index.less'
class AboutVb extends Component {
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
	 	
		return(
			<div className="about-vb">
				<NavBar title={'关于思埠V商城'} {...this.props}></NavBar>
		    <div className="nav-content">
		    	<img className='logo'  src={require("../../assets/images/logo.png")}/>
		    	<p className="title">你想要的我们都有!</p>
		    	<p className='version'>当前版本：V1.0</p>
		    </div>
		    <div className="bottom">广州思埠网络开发有限公司</div>
			</div>
		)	
	}
}

export default AboutVb
