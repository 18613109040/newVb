/*选择退货商品*/
import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {changeNavbarTitle} from '../../actions/home'
import {Product} from '../../components/Order'
import {updateAfterSaleProducts,checkAllAfterSaleProducts} from '../../actions/orderDetails'
import {Checkbox,Toast} from 'antd-mobile';
import utils from '../../utils'
const CheckboxItem = Checkbox.CheckboxItem;

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
        this.props.dispatch(changeNavbarTitle("选择退单商品"))
    }
    //商品数量加减
    onChangeStep(item, val){
        let {afterSaleProducts} =this.props
        if (afterSaleProducts.order1s.length > 0) {
            this.props.dispatch(updateAfterSaleProducts({
                order1Id: item.order1Id,
                amount:val,
                checked:item.checked

            }));

        }
    }
    onChangeBox(item){
        let {afterSaleProducts} =this.props
        if (afterSaleProducts.order1s.length > 0) {
            this.props.dispatch(updateAfterSaleProducts({
                order1Id: item.order1Id,
                amount:item.amount,
                checked:!item.checked
            }));

        }
    }

    //全选或取消
    checkAll() {
        this.props.dispatch(checkAllAfterSaleProducts());
    }
    applyRefund(){
        let {order1s} =this.props.afterSaleProducts
        order1s=order1s.filter(item => item.checked)
        if(order1s.length<=0){
            Toast.fail('请选择需要退单的商品', 1);
            return
        }

        this.context.router.push('/afterSale/type')
    }

    render(){
        let { afterSaleProducts} =this.props
        if(!afterSaleProducts.orderId) return null
       return (
            <div className="afterSale-content" style={{height: document.documentElement.clientHeight - 45*utils.multiple}}>
             <div className="step3" style={{"marginBottom": 44*utils.multiple+'px'}}>
            {
                afterSaleProducts.order1s.map((item, i) => {
                    return (
                        <div key={i} className="order-product-content">
                           <Product key={0} showStepper={2}
                            item={Object.assign(item,
                                {amount:item.amount,exchangeIntegral:item.integral,retailPrice:item.price,productType:item.price>0,imProductId:item.productId}
                                )}
                             onChangeStep={(item, val) => {
                                 this.onChangeStep(item, val)
                            }}
                            onChangeBox ={(item)=>{ this.onChangeBox(item)}}
                         />
                        </div>
                    )

                })
            }
            </div>
            <div className="cart-fixed">
                <div className="text-left">
                    <CheckboxItem checked={afterSaleProducts.allChecked} onChange={() => this.checkAll()}>全选</CheckboxItem>
                </div>
                <div className="btn-right-delete-block" onClick={()=> this.applyRefund()}>申请退单</div>
            </div>
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
