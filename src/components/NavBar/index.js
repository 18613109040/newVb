import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import './index.less'
import {NavBar,Icon} from 'antd-mobile';

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
        const {pathname} = this.props.location;
        return (
            <div className="vb-nav-bar">
                <NavBar
                    icon={<Icon type="left" />}
                    leftContent="返回"
                    mode="light"
                    onLeftClick={() => {
                        if(pathname === "newshelves" || pathname ===  "explosionRecom" || pathname ===  "brandsale" || pathname === "activityProduct"){
                            this.props.router.push("/home")
                        }else {
                            this.props.router.goBack()
                        }
                        }
                    }
                    rightContent={this.props.rightContent}
                >{title}</NavBar>
            </div>
        )
    }
}

export default VbNavBar
