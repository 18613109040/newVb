import React, {Component} from "react";
import { Link } from "react-router";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {Flex ,Icon,WingBlank, WhiteSpace,List} from 'antd-mobile';
import {getHoteList} from "../../actions/sblodge"
import Text from "../../components/Text";
const Item = List.Item;
const Brief = Item.Brief;
import NavBar from '../../components/NavBar'
import './index.less'
class SbLodge extends Component {
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
		if(this.props.hostlist.code !== 0){
			this.props.dispatch(getHoteList())
		}

	}

	render() {

		const {data} = this.props.hostlist;
		return(
			<div className="sb-lodge">
                <NavBar title="思埠客栈" {...this.props}/>
		    <div className="lodge-content" style={{
                height: document.documentElement.clientHeight - 100,
                overflow: 'auto',
            }}>
		    	{
		    		data.map((item,id)=>(
		    			<div className="lodge-item" key={id}>
		    				<WingBlank >
					    		<Link to={`/lodgedetails?id=${item.hotelId}`}>
						    		<div>
						    			<div>
						    				<img src={item.thumbUrl}/>
						    			</div>
						    			<List>
								        <Item
								         	arrow="horizontal"
								          multipleLine
								          extra="预定"
								        	>
								        	{item.hotelName}
								        	<Brief>{item.shortName}</Brief>
								        </Item>
								      </List>
						    		</div>
					    		</Link>
				    		</WingBlank>
		    				<WhiteSpace size="lg" />
		    			</div>
		    		))
		    	}

		    </div>
			</div>
		)
	}
}


function mapStateToProps(state) {
	return {
		hostlist:state.hostlist
	}
}
export default connect(mapStateToProps)(SbLodge)
