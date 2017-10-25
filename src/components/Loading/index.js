import React, {Component} from "react";
import PropTypes from 'prop-types';
import { Icon } from 'antd-mobile';
class Loading extends Component {
	static propTypes = {
		
	};
  static contextTypes={
  	router: React.PropTypes.object.isRequired,
	};
	static defaultProps = {
		
	};
	constructor(props) {
		super(props);
		this.state = {
			
		}
		 
	}

	render() {
		return(
			<div className="loading">
      	<Icon type='loading'/>
      	<div>数据加载中....</div>
      </div>
		)	
	}
}
export default Loading