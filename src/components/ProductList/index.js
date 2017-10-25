import React, {Component} from "react";
import PropTypes from 'prop-types';
import {TabBar, Icon} from 'antd-mobile';
import {Link} from "react-router";
import Text from "../Text";
import './index.scss'

class ProductList extends Component {
    static propTypes = {
        categoryType: PropTypes.number,
        product: PropTypes.array
    };
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };
    static defaultProps = {
        categoryType: 1,
        product: []
    };

    constructor(props) {
        super(props);
        this.state = {}

    }

    render() {
        return (
            <div className="slide-box-product">
                {
                    this.props.product.map((item, id) => (
                        <div className="per-pro" key={id}>
                            <Link to={`/product?id=${item.imProductId}`}>
                                <div className="img">
                                    <img src={item.thumbImg}/ >
                                </div>
                                <div className="text">
                                    <div className="name">
                                        <Text
                                            text={item.name}
                                            row={1}
                                            textType="base"
                                        />
                                    </div>
                                    {
                                        item.productType == 1 ? (
                                            <span className="price">
												<i className="_i"/>
												<span className="current-price _rmb">{item.retailPrice}</span>
											</span>) : (
                                            <span className="v-price">
												<i className="_i"/>
												<span className="current-price _rmb">{item.exchangeIntegral}</span>
												<span className="v-gray">V币</span>
											</span>
                                        )
                                    }

                                </div>
                            </Link>
                        </div>
                    ))
                    }
            </div>
        )
    }
}

export default ProductList
