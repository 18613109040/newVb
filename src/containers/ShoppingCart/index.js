/*
 * 模块：购物车
 *
 */
import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {Modal, Flex, List, Checkbox, WhiteSpace, WingBlank, SwipeAction, Stepper} from 'antd-mobile';
import {connect} from "react-redux";
import {updateTempProduct, deleteTempProductById, checkAllShop} from "../../actions/product";
import Text from '../../components/Text'
import {OrderFooter} from '../../components/Order'
import EmptyData from '../../components/EmptyData'
import NavBar from "../../components/NavBar";
import utils from '../../utils'

const alert = Modal.alert;
const Item = List.Item;
const CheckboxItem = Checkbox.CheckboxItem;
import {storage} from "../../utils/tools"
import './index.less'

class ShoppingCart extends React.Component {
    static propTypes = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            eidt: false,
            exchange: false
        }

    }

    componentWillMount() {


        if (storage.get("userInfo") && storage.get("userInfo").id !== undefined) {

        } else {
            this.context.router.push(`/login`)
        }
    }

    componentDidMount() {


    }

    //全选或取消
    checkAll(type, check) {
        this.props.dispatch(checkAllShop({
            check: check,
            type: type
        }));
    }

    //
    _deleteSelectAll() {
        alert('删除', '确定删除选中商品吗？', [
            {text: '取消'},
            {
                text: '确定',
                onPress: () => {
                    let temId = []
                    this.props.tempProduct.filter(item => item.check == true).map(item => {
                        temId.push(item.imProductId)
                    })
                    if (temId.length > 0) {
                        this.props.dispatch(deleteTempProductById({
                            id: temId.toString()
                        }))
                    }

                },
                style: {fontWeight: 'bold'},
            },
        ])
    }

    checkChange = (id, skuId) => {

        let tempProduct = this.props.tempProduct.filter(item => item.imProductId == id && item.skuId == skuId);

        if (tempProduct.length > 0) {
            this.props.dispatch(updateTempProduct({
                id: id,
                skuId: tempProduct[0].skuId,
                specDetail: tempProduct[0].specDetail,
                check: !tempProduct[0].check,
                amount: tempProduct[0].amount
            }));

        }

    }
    //删除产品
    deleteShop = (id, skuId) => {
        alert('删除', '确定删除此商品吗？', [
            {text: '取消'},
            {
                text: '确定',
                onPress: () => {
                    this.props.dispatch(deleteTempProductById({
                        id: id,
                        skuId: skuId
                    }))
                },
                style: {fontWeight: 'bold'},
            },
        ])
    }
    //购物车商品数量变化
    shopNumberClick = (id, skuId, value) => {
        let tempProduct = this.props.tempProduct.filter(item => item.imProductId == id && item.skuId == skuId);
        if (tempProduct.length > 0) {
            this.props.dispatch(updateTempProduct({
                id: id,
                skuId: tempProduct[0].skuId,
                specDetail: tempProduct[0].specDetail,
                check: tempProduct[0].check,
                amount: value
            }));

        }
    }

    onChange(e) {
        this.setState({
            exchange: e.target.checked
        })
    }

    onChangeBox(id, skuId) {
        let tempProduct = this.props.tempProduct.filter(item => item.imProductId == id && item.skuId == skuId);
        if (tempProduct.length > 0) {
            this.props.dispatch(updateTempProduct({
                id: id,
                skuId: tempProduct[0].skuId,
                specDetail: tempProduct[0].specDetail,
                check: !tempProduct[0].check,
                amount: tempProduct[0].amount
            }));

        }
    }

    onChangeStep(id, skuId, value) {
        if (value == 0) {
            alert('删除', '是否删除该商品?', [
                {text: '取消'},
                {
                    text: '确定',
                    onPress: () => {
                        this.props.dispatch(deleteTempProductById({
                            id: id,
                            skuId: skuId
                        }))
                    },
                },
            ])
        } else {
            let tempProduct = this.props.tempProduct.filter(item => item.imProductId == id && item.skuId == skuId);
            if (tempProduct.length > 0) {
                this.props.dispatch(updateTempProduct({
                    id: id,
                    skuId: tempProduct[0].skuId,
                    specDetail: tempProduct[0].specDetail,
                    check: tempProduct[0].check,
                    amount: value||1
                }));

            }
        }
    }

    //兑换全选
    changeExchangeAll = (e) => {
        this.checkAll(0, e.target.checked)
    }
    payChangeAll = (e) => {
        this.checkAll(1, e.target.checked)
    }

    render() {
        let allMoney = 0;
        let vbmoney = 0;
        let {tempProduct} = this.props
        let _tempProduct = this.props.tempProduct.filter(item => item.check == true);
        _tempProduct.map(item => {
            //productType 0 标识V币 1人民币
            if (item.productType == 0) {
                vbmoney += new Number(item.exchangeIntegral ||0) * item.amount
            } else {
                allMoney += new Number(item.retailPrice||0)  * item.amount
            }
        })


        let exchangeShop = tempProduct.filter(item => item.productType == 0);
        let moneyShop = tempProduct.filter(item => item.productType == 1);
        return (
            <div className="shopping-cart" >
                <NavBar title="购物车" {...this.props}/>
                {
                    tempProduct.length == 0 ? <EmptyData type={4} text={"小主购物车空空入也哦！"}
                                                         components={<div className="btngroups"><span onClick={() => {
                                                             this.context.router.push('/home')
                                                         }} className="empty_btn">去逛逛</span></div>}/> :
                        <div >
                            <div style={{height: document.documentElement.clientHeight -140*utils.multiple}} className="content">
                                {
                                    exchangeShop.length > 0 ? <div>
                                        <WhiteSpace/>
                                        <List>
                                            <CheckboxItem
                                                checked={exchangeShop.filter(item => item.check == false).length == 0}
                                                onChange={this.changeExchangeAll}>
                                                待兑换产品
                                            </CheckboxItem>
                                        </List>
                                        {
                                            this.props.userInfo.availableVMoney < vbmoney ? (
                                                <div className="product-type-show">
                                                    <span className="aleft">您的V币只有{this.props.userInfo.availableVMoney}不够兑换此商品</span>
                                                </div>
                                            ) : ""
                                        }
                                        <List>
                                            {
                                                exchangeShop.map((item, id) => (
                                                    <SwipeAction
                                                        key={id}
                                                        style={{backgroundColor: 'gray'}}

                                                        right={[
                                                            {
                                                                text: '删除',
                                                                onPress: () => this.deleteShop(item.imProductId, item.skuId),
                                                                style: {backgroundColor: '#F4333C', color: 'white'},
                                                            }
                                                        ]}

                                                        onOpen={() => console.log('global open')}
                                                        onClose={() => console.log('global close')}
                                                    >

                                                        <List.Item

                                                            onClick={e => console.log(e)}
                                                        >
                                                            <Flex>
                                                                <div><Checkbox checked={item.check}
                                                                               onChange={this.onChangeBox.bind(this, item.imProductId, item.skuId)}/>
                                                                </div>
                                                                <div><WingBlank size="md"><img src={item.thumbImg}
                                                                                               onClick={() => {
                                                                                                   this.context.router.push(`/product?id=${item.imProductId}`)
                                                                                               }}/></WingBlank></div>
                                                                <Flex.Item>
                                                                    <div>
                                                                        <Text row={2} size="md" text={item.name}/>
                                                                    </div>
                                                                    <WhiteSpace size="sm"/>
                                                                    {
                                                                        item.specDetail ? <div className="spec">
                                                                            商品规格:{item.specDetail}</div> : ""
                                                                    }
                                                                    <WhiteSpace size="sm"/>
                                                                    <WhiteSpace/>
                                                                    <div>{
                                                                        item.productType == 0 ? (
                                                                            <div className="money-footer">
                                                                                <label
                                                                                    className="iconfont icon-vbi"></label>
                                                                                <span
                                                                                    className="money">{item.exchangeIntegral}</span>
                                                                            </div>
                                                                        ) : (
                                                                            <div className="money-footer">
                                                                                <label
                                                                                    className="iconfont icon-qian"></label>
                                                                                <span
                                                                                    className="money">{item.retailPrice}</span>
                                                                            </div>
                                                                        )

                                                                    }
                                                                        <div className="step-right">
                                                                            <Stepper
                                                                                showNumber
                                                                                max={9999}
                                                                                min={1}
                                                                                value={item.amount}
                                                                                defaultValue={1}
                                                                                onChange={this.onChangeStep.bind(this, item.imProductId, item.skuId)}
                                                                            />
                                                                        </div>

                                                                    </div>
                                                                </Flex.Item>
                                                            </Flex>
                                                        </List.Item>
                                                    </SwipeAction>
                                                ))
                                            }

                                        </List>
                                    </div> : ""
                                }
                                {
                                    moneyShop.length > 0 ? <div >
                                        <WhiteSpace/>
                                        <List>
                                            <CheckboxItem
                                                checked={moneyShop.filter(item => item.check == false).length == 0}
                                                onChange={this.payChangeAll}>
                                                待支付产品
                                            </CheckboxItem>
                                        </List>
                                        <List style={{'marginBottom':'100px'}}>
                                            {
                                                moneyShop.map((item, id) => (
                                                    <SwipeAction
                                                        key={id}
                                                        style={{backgroundColor: 'gray'}}
                                                        right={[
                                                            {
                                                                text: '删除',
                                                                onPress: () => this.deleteShop(item.imProductId, item.skuId),
                                                                style: {backgroundColor: '#F4333C', color: 'white'},
                                                            }
                                                        ]}

                                                        onOpen={() => console.log('global open')}
                                                        onClose={() => console.log('global close')}
                                                    >

                                                        <List.Item
                                                        >
                                                            <Flex>
                                                                <div><Checkbox checked={item.check}
                                                                               onChange={this.onChangeBox.bind(this, item.imProductId, item.skuId)}/>
                                                                </div>
                                                                <div><WingBlank size="md"><img src={item.thumbImg}
                                                                                               onClick={() => {
                                                                                                   this.context.router.push(`/product?id=${item.imProductId}`)
                                                                                               }}/></WingBlank></div>
                                                                <Flex.Item>
                                                                    <div>
                                                                        <Text row={2} size="md" text={item.name}/>
                                                                    </div>
                                                                    <WhiteSpace size="sm"/>
                                                                    {
                                                                        item.specDetail ? <div className="spec">
                                                                            商品规格:{item.specDetail}</div> : ""
                                                                    }
                                                                    <WhiteSpace size="sm"/>
                                                                    <div>{
                                                                        item.productType == 0 ? (
                                                                            <div className="money-footer">
                                                                                <label
                                                                                    className="iconfont icon-vbi"></label>
                                                                                <span
                                                                                    className="money">{item.exchangeIntegral}</span>
                                                                            </div>
                                                                        ) : (
                                                                            <div className="money-footer">
                                                                                <label
                                                                                    className="iconfont icon-qian"></label>
                                                                                <span
                                                                                    className="money">{item.retailPrice}</span>
                                                                            </div>
                                                                        )

                                                                    }
                                                                        <div className="step-right">
                                                                            <Stepper
                                                                                showNumber
                                                                                max={9999}
                                                                                min={0}
                                                                                value={item.amount}
                                                                                onChange={this.onChangeStep.bind(this, item.imProductId, item.skuId)}
                                                                            />
                                                                        </div>

                                                                    </div>
                                                                </Flex.Item>
                                                            </Flex>
                                                        </List.Item>
                                                    </SwipeAction>
                                                ))
                                            }
                                        </List>
                                    </div> : ""
                                }


                            </div>
                            <OrderFooter money={allMoney} vbmoney={vbmoney}
                                         availableVMoney={this.props.userInfo.availableVMoney} goToTlement={() => {

                                this.context.router.push('/settlement')
                            }}/>
                        </div>}
            </div>
        )

    }
}

function mapStateToProps(state) {
    return {
        tempProduct: state.tempProduct,
        userInfo: state.userInfo
    }
}

export default connect(mapStateToProps)(ShoppingCart)
