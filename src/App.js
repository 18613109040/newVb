import React, {Component} from "react";
import { Link } from "react-router";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import TabBar from './components/TabBar'
import {Tabs, Icon, Modal} from 'antd-mobile';
import {storage} from "./utils/tools"
import {updataUserInfo} from './actions/user'
import {repalceTempProduct} from "./actions/product";
import NavBar from './components/NavBar'
class PopupContent extends React.Component {
    render() {
        return (
            <div>
                <NavBar title={"优惠券使用说明"} {...this.props}  rightContent={
                    [
                        <Icon key="0" onClick={this.props.onClose} type="ellipsis" />
                    ]
                }/>
                <div className="coupon-description nav-content">
                    <div>1.V券不可叠加使用，每张订单限用一张;</div>
                    <div>2.V券金额大于订单应付金额时，差额不予退回;</div>
                    <div>3.运费券按券面值仅可抵减订单运费，不可叠加使用，每张订单
                        限用一张，不设找零（运费券金额大于订单运费时，差额不予退
                        回）。运费券可与V券同时使用;
                    </div>
                    <div>4.V券与运费券仅可在有效期期内使用。</div>
                </div>
            </div>

        );
    }

}
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

	}
	componentDidMount (){

	}
    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

	render() {
		const {pathname} = this.props.location;
		if(pathname == "/" || pathname == "/home" ||  pathname == "/myinfo" || pathname=="/classification"  || pathname=="/shopcart"){
			return(
				<div className="app-root">
                    <div className="vb-content">{this.props.children}</div>
					<TabBar {...this.props}/>
				</div>
			)
		}else{
			return(

				<div className="app-root"  style={{height: document.documentElement.clientHeight}}>
                    <NavBar title={this.props.navBartitle.title} {...this.props}  rightContent={pathname=="/coupon"?
                        [
                            <Icon key="0" onClick={this.showModal('modal')} type="ellipsis" />
                        ]:[]
                    }/>
                    <div className="vb-content" >{this.props.children}</div>
                    {
                        pathname=="/coupon"? <Modal
                            popup
                            visible={this.state.modal}
                            maskClosable={false}
                            onClose={this.onClose('modal')}
                            animationType="slide-down"
                            footer={[{ text: '关闭', onPress: () => {  this.onClose('modal')(); } }]}
                        >
                            <PopupContent {...this.props} onClose={this.onClose('modal')}/>
                        </Modal>:""
                    }

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
