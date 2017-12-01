/*
 * 模块：分类商品右侧商品
 *
 */
import React, {Component} from "react";
import { Link } from "react-router";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import ReactPull from '../../components/Scroller/ReactPull';
import {getInficationList} from '../../actions/classIfication'

// 初始化 tapEvent 事件, 移动端
//injectTapEventPlugin();

class Item extends Component{

	render(){
		const {data} = this.props;
		return(
			<div className="shop-item">
				<div className="image">
					<img src={data.thumbImg}/>
				</div>
				<div className="detail-titles">
					<div className="name">{data.name}</div>
					<div className="price">
						<i className="_i"/>
						<span className="current-price">{data.retailPrice}</span>
						<span className="vertical-end">元</span>
					</div>
					<div className="vb-y">市场参考价{data.marketPrice}</div>
				</div>
			</div>
		)
	}

}
class IficationList extends Component {
 	static propTypes = {

	};
  static contextTypes={
  	router: React.PropTypes.object.isRequired
	};
	static defaultProps = {

	};
 	constructor(props) {
		super(props);
		this.state={
      disablePullUp: this.props.disablePullUp
		}

	}
 	componentWillMount(){


 	}
 	componentDidMount (){

 	}
	componentWillReceiveProps(nextProps){
		if(nextProps.disablePullUp!=this.props.disablePullUp){
			this.setState({
				disablePullUp:nextProps.disablePullUp
			})
		}
	}
	loadMoreCallback = () => {
		return new Promise((resolve, reject) => {
        const {id} = this.props;
        let key = id || this.props.infiactionmenu.data[0].imCategoryId

		    if(this.props.infiactionlist[key].data.pageOffset < this.props.infiactionlist[key].data.totalPage){
		      	this.props.dispatch(getInficationList(id,{
				 			pageNow:this.props.infiactionlist[key].data.pageOffset+1,
				 			pageSize:10,
				 			platform:1,
				 			type:1
			 		  }))
		      	this.setState({
			    		disablePullUp: false
			  		})
		       resolve();
		    }else{
		    	this.setState({
			    	disablePullUp: true
			  	})
		      reject(new Error('错误'));
		    }

    })
  }

  render() {
	  const {infiactionlist,infiactionmenu,id} = this.props;
	  const props = {
      loadMoreCallback: this.loadMoreCallback,
      loadMore: true,
      disablePullUp:this.state.disablePullUp,
      loadMoreThrottle:50
   };
    let key = id;
    return (
			<div className="ification-list" >
			{infiactionlist[key]&&infiactionlist[key].data.datas.length>0?(
				<ReactPull  {...props}>
        {
					infiactionlist[key].data.datas.map((item,index)=>(
						<Link to={`/product?id=${item.imProductId}`} key={index}><Item data={item} key={index}/></Link>
					))
				}
        </ReactPull>
			):""
			}
			</div>
    )
  }
}

function mapStateToProps(state) {
	return {
		infiactionlist:state.infiactionlist,
		infiactionmenu:state.infiactionmenu
	}
}
export default connect(mapStateToProps)(IficationList)
