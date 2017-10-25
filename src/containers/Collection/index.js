import React, {Component} from "react";
import { Link } from "react-router";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {List,Tabs} from 'antd-mobile';
import VbCollection from './VbCollection'
import CaseCollection from './CaseCollection'
import './index.less'
import NavBar from '../../components/NavBar'
const tabs = [
  { title: '现金类' },
  { title: 'V币类' }
];
class MyCollection extends Component {
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
	render() {

		return(
			<div className="my-collectionn">
                <NavBar title="我的收藏" {...this.props}/>
				<div className="nav-content">
				<Tabs tabs={tabs}
		      initialPage={0}
		    >
				    <div style={{ display: 'flex' }}>
		          <CaseCollection/>
		        </div>
				     <div style={{ display: 'flex' }}>
		          <VbCollection/>
		        </div>
    		</Tabs>

		    </div>
			</div>
		)
	}
}


function mapStateToProps(state) {
	return {

	}
}
export default connect(mapStateToProps)(MyCollection)
