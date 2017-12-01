import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { Tabs} from 'antd-mobile';
import Commodity from "./Commodity";
import {changeNavbarTitle} from '../../actions/home'
import './index.less'
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
    componentWillMount() {
        this.props.dispatch(changeNavbarTitle("商品详情"))

    }
    render() {
        const {id} = this.props.location.query;
        return (
            <div className="vb-product">
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
