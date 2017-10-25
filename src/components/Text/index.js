import React, {Component} from "react";
import { Link } from "react-router";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.less'
class Text extends Component {
	static propTypes = {
		text:PropTypes.any, //文字内容
        row:PropTypes.number, //显示行数
        size:PropTypes.string  //文字类型 (large,pro,base,auxiliary)
	};
  static contextTypes={
  	router: PropTypes.object.isRequired
	};
	static defaultProps = {
		row:1,
        size:"md"
	};
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render() {
		const {text} =  this.props;
		var textClass = classNames({
      'text-line-clamp-1': this.props.row==1,
      'text-line-clamp-2': this.props.row==2,
      'text-type-xs': this.props.size == "xs",
      'text-type-sm': this.props.size == "sm",
      'text-type-md': this.props.size == "md",
      'text-type-lg': this.props.size == "lg"
    });
		return(
			<div className="components-text">
				<div className={textClass}>{text}</div>
			</div>
		)
	}
}
export default Text
