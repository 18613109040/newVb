
import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import './index.less'
export default class BottomBtn extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

    }
    onClick=()=>{
        this.props.onClick()
    }
    render(){
        let {text,disabled} =this.props
        return(
        <div className="BottomBtn-fixed">
            {
                disabled?<div className="btn disabled">{text}</div>:<div className="btn" onClick={this.onClick}>{text}</div>
            }

         </div>
        )
    }




}







