import React, {Component} from "react";
import { Link } from "react-router";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import TabBar from './components/TabBar'
import {storage} from "./utils/tools"
import {updataUserInfo} from './actions/user'
import {repalceTempProduct} from "./actions/product";
import NavBar from './components/NavBar'
class App extends Component {
	static propTypes = {

	};
	static defaultProps = {

	};
	constructor(props) {
		super(props);
		this.state = {

		}
	}
	componentWillMount(){
		//将Localstroe 数据写入redux store
		if(storage.get("cart")){
			this.props.dispatch(repalceTempProduct(storage.get("cart")))
		}
        if(storage.get("userInfo")){
            this.props.dispatch(updataUserInfo(storage.get("userInfo")))
        }
		//let {openid,wxtoken} = this.props.location.query;
		//获取用户信息 写入token
		/*this.props.dispatch(getUserInfo({
			openId:"oT70Ks3YOC61FPkcFeqzzNgL_lN8",//openid
			platform:'1',
			xwsToken: "DgMKVux3pgci:JZbrR7y1FBX2PVF07PC5Wut1ND::Q2TAuHfa3UCsE4IRL9OCs8K7zk6QX4igJw9FTf3E*r69jwNuOwLNWKY" //wxtoken
		}))*/


	}
	componentDidMount (){


	}
	render() {
		const {pathname} = this.props.location;
		if(pathname == "/"   || pathname == "/home" ||  pathname == "/myinfo" || pathname=="/classification"  || pathname=="/shopcart"){
			return(
				<div className="app-root">
                    <div >{this.props.children}</div>
					<TabBar {...this.props}/>
				</div>
			)
		}else{
			return(
				<div>
                   {this.props.children}
				</div>
			)
		}

	}
}
function mapStateToProps(state) {
	return {
        navBartitle:state.navBartitle
	}
}
export default connect(mapStateToProps)(App)
