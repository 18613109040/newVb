import React, {Component} from "react";
import { Link } from "react-router";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {List,Cardm,Button,ListView} from 'antd-mobile';
const Item = List.Item;
import Text from "../../components/Text";
import CommodityPrice from "../../components/CommodityPrice";
class ItemEva extends Component {
    static propTypes = {

    };

    static defaultProps = {

    };
    static contextTypes={
    router: React.PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {

        }
        
    }
    clickOrder(order1Id){
        this.context.router.push(`/evaluation?id=${order1Id}`);
    }
    itemClick(id){
        this.context.router.push(`/orderdetails?id=${id}`)
    }
    render() {
        const {item} = this.props;
        return(
                <div className="div-item">
                        <List>
                            <Item 
                                arrow="horizontal"
                                platform="android"
                                onClick={this.itemClick.bind(this,item.orderId)}
                                >
                                <div className="imc-one">
                                    <div className="imco-l">
                                        <div className="imco-l-img-box">
                                            <div className="imco-l-img">
                                                <img src={item.thumbImg}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="imco-r-content">
                                        <div >
                                            <Text 
                                                text={item.name} 
                                                row={2}
                                                textType="base"
                                            />
                                        </div>
                                        <div className="ping">
                                    {item.price==0&&item.integral!=0?
                                                <CommodityPrice
                                                    price={item.integral} 
                                                    unit="V币"
                                                    icon="icon-vbi"
                                                    priceStyle="small-price"
                                                        iconStyle="small-icon"
                                                />:item.integral==0&&item.price!=0?
                                                <CommodityPrice
                                                    price={Number(item.price).toFixed(2)}
                                                    priceStyle="small-price"
                                                        iconStyle="small-icon"
                                                />:<span>
                                                <span>
                                                    <CommodityPrice
                                                        price={Number(item.price).toFixed(2)}
                                                        priceStyle="small-price"
                                                        iconStyle="small-icon"
                                                    />
                                                </span>
                                                <span>+</span>
                                                <span>
                                                    <CommodityPrice
                                                        price={item.integral} 
                                                        unit="V币"
                                                        icon="icon-vbi"
                                                        priceStyle="small-price"
                                                        iconStyle="small-icon"
                                                    />
                                                </span>
                                                </span>
                                            }
                                </div>
                                    </div>
                                </div>
                                
                            </Item>
                        </List>
                        <List>
                            <Item extra={
                                    <Button
                                        type="ghost" 
                                        inline 
                                        size="small" 
                                        onClick={this.clickOrder.bind(this,item.orderId)}>
                                        {item.isEvaluate==0?"评价晒单":"查看评价"}
                                    </Button>
                                
                            }>
                             <div></div> 
                  </Item>
                        </List>
                    </div>
        )   
    }
}

export default ItemEva
