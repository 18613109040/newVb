import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import './index.less'
import {NavBar} from 'antd-mobile';

class VbNavBar extends Component {
    static propTypes = {
        title: PropTypes.string,
        rightContent: PropTypes.array,
    };
    static contextTypes = {
        router: PropTypes.object.isRequired
    };
    static defaultProps = {
        title: "",
        rightContent: []
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {title} = this.props;
        return (
            <div className="vb-nav-bar">
                <NavBar
                    leftContent="返回"
                    mode="light"
                    onLeftClick={() => {this.props.router.goBack()}}
                    rightContent={this.props.rightContent}
                >{title}</NavBar>
            </div>
        )
    }
}

export default VbNavBar
