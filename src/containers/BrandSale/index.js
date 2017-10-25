import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {WingBlank, WhiteSpace} from 'antd-mobile';
import NavBar from '../../components/NavBar'
import {getbrandSale} from '../../actions/brandSale'
import './index.less'

class BrandSale extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: ''
        }

    }

    componentWillMount() {

    }

    componentDidMount() {
        this.props.dispatch(getbrandSale())
    }


    render() {
        console.dir(this.props.brandsale)
        return (
            <div className="brand-sale">
                <NavBar title="品牌特卖" {...this.props}/>
                <div style={{height: document.documentElement.clientHeight - 100, overflow: 'auto'}}>
                    {
                        this.props.brandsale.data.map((item, id) => (
                            <Link to={`/activityProduct?id=${item.imCampaignCategoryId}`} key={id}>
                                <WingBlank>
                                    <WhiteSpace/>
                                    <img src={item.imageUrl}/>
                                </WingBlank>
                            </Link>
                        ))
                    }
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        brandsale: state.brandsale
    }
}

export default connect(mapStateToProps)(BrandSale)
