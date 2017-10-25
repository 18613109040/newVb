import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Flex, Tabs, Carousel, Toast} from 'antd-mobile';
import Commodity from "./Commodity";
import NavBar from '../../components/NavBar'
import './index.less'

const TabPane = Tabs.TabPane;

class Product extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {}

    }

    render() {
        const {id} = this.props.location.query;
        return (
            <div className="vb-product">
                <NavBar title="商品详情" {...this.props}/>
                <Commodity id={id}/>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        tempProduct: state.tempProduct,
        productDetails: state.productDetails,
        productspec: state.productspec
    }
}

export default connect(mapStateToProps)(Product)
