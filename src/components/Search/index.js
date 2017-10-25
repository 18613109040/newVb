/**
 *查询
 */
import React, {Component} from "react";
import {Link} from "react-router";
import {Flex} from 'antd-mobile';
import PropTypes from 'prop-types';
import './index.less'

class Search extends Component {
    static propTypes = {};
    static contextTypes = {
        router: PropTypes.object.isRequired,
    };
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        const {type}=this.props;
        return (
            <div className="search-compents">
                <Link to={`/search?type=${type}`}>
                    <Flex justify="center" align="center">
                        <div className="iconfont icon-search"></div>
                        <div className="serch-placehoder">韩国优美眼罩</div>
                    </Flex>
                </Link>
            </div>
        )
    }
}

export default Search
