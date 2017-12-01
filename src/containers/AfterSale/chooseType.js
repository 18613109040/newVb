/*选择退单方式*/
import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {changeNavbarTitle} from '../../actions/home'
import {Product} from '../../components/Order'
import {List,WhiteSpace} from 'antd-mobile';
import './index.less'
import utils  from '../../utils'
const Item = List.Item;
const Brief = Item.Brief;


class ChooseGoods extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state={

        }

    }
    componentWillMount() {
        this.props.dispatch(changeNavbarTitle("选择退单类型"))
    }
    
    render(){
        let { order1s} =this.props.afterSaleProducts
        order1s = order1s.filter(item => item.checked)
       return (
            <div className="afterSale-content" style={{height: document.documentElement.clientHeight - 45*utils.multiple}}>
             <div className="step3" >
            {
                order1s.map((item, i) => {
                    return (
                        <div key={i} className="order-product-content">
                           <Product key={0} showStepper={0}  item={Object.assign(item,
                                {amount:item.amount||item.purchaseQuantity,exchangeIntegral:item.integral,retailPrice:item.price,productType:item.price>0,imProductId:item.productId}
                                )}
                         />
                        </div>
                    )

                })
            }
            </div> 
             <WhiteSpace />
            <List className="apply-refund-type">
                <Item arrow="horizontal" multipleLine onClick={() => {this.context.router.push('/afterSale/apply?type=1')}}>
                  仅退款 <Brief>未收到货（包含未签收），或商城协商同意前提下</Brief>
                </Item>
                <Item
                  arrow="horizontal"
                  multipleLine
                  onClick={() => {this.context.router.push('/afterSale/apply?type=2')}}
                >
                 退货退款<Brief>已收到货，需要退掉已收到的货物</Brief>
                </Item>
               
            </List>
         </div>
        )
    }

}


function mapStateToProps(state) {
    return {
       afterSaleProducts:state.afterSaleProducts
    }
}

export default connect(mapStateToProps)(ChooseGoods)
