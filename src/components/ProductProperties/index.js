/**
 * 底部购物组件
 *
 */
import React, {Component} from "react";
import {Flex, Toast, List, Stepper, Icon} from 'antd-mobile';
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Img from '../Img'
import utils from '../../utils'

import './index.less'

class ProductProperties extends Component {
    static propTypes = {};
    static contextTypes = {
        router: PropTypes.object.isRequired,
    };
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            val: 1,
            cartName: "加入购物车",
            checklable: [],
            stockNum: 0,
            selectA: [],
            temAray: [],
            changeData: {
                retailPrice: this.props.data.retailPrice,
                stockNum: this.props.data.stockNum || 10,
                exchangeIntegral: this.props.data.exchangeIntegral
            },
            changStock: {
                specDetail: '',
                skuId: ''
            }
        }
        this.temAray = [];
        this.temskuid = ""
        this.onClickColose = this._onClickColose.bind(this);
        this.addToCart = this._addToCart.bind(this);
        this.buy = this._buy.bind(this);
    }

    componentDidMount() {

        if (this.props.inintdata.skuId) {
            Object.keys(this.mapData).map((item, index) => {
               setTimeout(()=>{
                   this.lableClick(this.props.inintdata.specDetail.split(',')[index], index, item)
               },100)
            })
        }
    }

    _onClickColose() {
        if (this.props.clickColose instanceof Function) {
            this.props.clickColose()
        }
    }
    onChange = (val) => {
        this.setState({
            val:val||1
        })
    }
    //立即购买
    _buy() {

        if (this.state.checklable.filter(item=>item!="").length != Object.keys(this.mapData).length) {
            Toast.info('请选择规格', 2);
            return;
        } else {
            if (this.state.changeData.stockNum == 0) {
                Toast.info('库存不足', 2);
                return;
            }
            if (this.props.buyNow instanceof Function) {
                this.props.buyNow(Object.assign({}, {amount: this.state.val}, this.state.changeData, {specDetail: this.state.checklable.toString()}))
            }
        }
    }

    //加入购物车
    _addToCart() {
        if (this.state.checklable.filter(item=>item!="").length != Object.keys(this.mapData).length) {
            Toast.info('请选择规格', 2);
            return;
        } else {
            if (this.state.changeData.stockNum == 0 || this.state.changeData.stockNum < this.state.val) {
                Toast.info('库存不足', 2);
                return;
            }
            if (this.props.addToCart instanceof Function) {
                this.props.addToCart(Object.assign({}, {amount: this.state.val}, this.state.changeData, {specDetail: this.state.checklable.toString()}))
            }
        }

    }

    lableClick(value, id, key) {
        let temDa = {}
        if (id == 0) {
            if (Object.keys(this.mapData).length > 1) {
                let ten = this.mapData[key].filter(item => item.name == value);
                Object.keys(this.mapData).map(item => {
                    temDa[item] = []
                    if (item !== key) {
                        ten.map(d => {
                            this.mapData[item].map(ix => {
                                if (d.skuId == ix.skuId) {
                                    temDa[item].push(ix.name)
                                    this.temAray.push({
                                        name: ix.name,
                                        retailPrice: ix.retailPrice,
                                        exchangeIntegral: ix.exchangeIntegral,
                                        stockNum: ix.stockNum,
                                        skuId: ix.skuId
                                    })
                                }
                            })

                        })
                    }
                })
                this.state.checklable = []
                this.setState({
                    selectA: temDa,
                })
            } else {
                this.temAray = this.mapData[key]

            }
        } else if (id != 0 && id < Object.keys(this.mapData).length - 1) {
            let fristtem = this.mapData[Object.keys(this.mapData)[0]].filter(item => item.name == this.state.checklable[0]);
            let tem = this.mapData[key].filter(item => item.name == value);
            let da = []
            let res = []
            fristtem.map(item => {
                tem.map(ix => {
                    if (item.skuId == ix.skuId) {
                        da.push(ix)
                    }
                })
            })
            let keys = Object.keys(this.mapData)[id + 1]
            da.map(item => {
                this.mapData[keys].map(ix => {
                    if (item.skuId == ix.skuId) {
                        res.push(ix.name)
                    }
                })
            })
            this.state.selectA[keys] = res;
            this.setState({
                selectA: this.state.selectA
            })
        }
        this.state.checklable[id] = value;
        this.setState({
            checklable: this.state.checklable.slice(0, id + 1)
        })

        if (this.state.checklable.length == Object.keys(this.mapData).length) {
            let kk = this.temAray.filter(item => item.name == value)
            if (kk.length > 0) {
                /*let number = 1
                if (this.props.tempProduct.filter(item => item.skuId == kk[0].skuId && item.data.imProductId == this.props.data.imProductId).length > 0) {
                    number = this.props.tempProduct.filter(item => item.skuId == kk[0].skuId && item.data.imProductId == this.props.data.imProductId)[0].amount
                }*/
                this.setState({
                    changeData: kk[0],
                    //val: number
                })
            }
        }
    }

    render() {
        //获取sku 属性
        let attrNameArray = [] //保存sku 属性名
        this.props.data.shopAttr[0].values.map(item => {
            attrNameArray.push(item.attrName)
        })
        let specArray = {}
        attrNameArray.map(i => {
            specArray[i] = [];
            this.props.data.shopAttr.map((item) => {
                item.values.map(d => {
                    if (d.attrName == i) {
                        specArray[i].push({
                            name: d.valueName,
                            exchangeIntegral: item.exchangeIntegral,
                            marketPrice: item.marketPrice,
                            retailPrice: item.retailPrice,
                            skuId: item.skuId,
                            skucheck: true,
                            stockNum: item.stockNum
                        })
                    }
                })
            })
        })
        let temKey = {}
        this.mapData = specArray;
        Object.keys(specArray).map(item => {
            temKey[item] = []
            specArray[item].map(t => temKey[item].push(t.name))
            temKey[item] = Array.from(new Set(temKey[item]))
        })
        return (
            <div className="vb-product-properties">
                <span className="colose" onClick={this.onClickColose}><Icon type="cross"/></span>

                <header className="cover-head">
                    <div className="img-box">
                        <img src={this.props.data.thumbImg}/>
                    </div>
                    <div className="product">
                        <div className="price">
                            <div>

                                {
                                    this.props.data.productType == 0 ? (
                                        <div className="money-footer">
                                            <label className="iconfont icon-vbi"></label>
                                            <span className="money">{this.state.changeData.exchangeIntegral}</span>
                                        </div>
                                    ) : (
                                        <div className="money-footer">
                                            <label className="iconfont icon-qian"></label>
                                            <span
                                                className="money">{new Number(this.state.changeData.retailPrice).toFixed(2)}</span>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="kun-cun">库存:{this.state.changeData.stockNum}</div>
                            {this.state.checklable.length > 0 ? <div>已选择({this.state.checklable.toString()})</div> :
                                <div>请选择规格</div>}
                        </div>
                    </div>

                </header>
                <div className="cover-body">
                    <List>
                        {
                            Object.keys(temKey).map((item, id) => (
                                <List.Item key={id}>
                                    <div className="slider">
                                        <h2>{item}</h2>
                                        <div className="items">
                                            {
                                                temKey[item].map((da, index) => {
                                                    if (this.state.selectA[item] && this.state.selectA[item].length == 0) {
                                                        return (
                                                            this.state.checklable.includes(da) ? (
                                                                    <label
                                                                        className="checked"
                                                                        key={index}
                                                                        onClick={this.lableClick.bind(this, da, id, item)}>
                                                                        {da}
                                                                    </label>) :
                                                                (<label
                                                                    className="goods"
                                                                    key={index}
                                                                    onClick={this.lableClick.bind(this, da, id, item)}>
                                                                    {da}
                                                                </label>))
                                                    } else if (this.state.selectA[item] && this.state.selectA[item].length > 0) {
                                                        return (
                                                            this.state.checklable.includes(da) ? (
                                                                <label
                                                                    className="checked"
                                                                    key={index}
                                                                    onClick={this.lableClick.bind(this, da, id, item)}>
                                                                    {da}
                                                                </label>) : this.state.selectA[item].includes(da) ? (
                                                                    <label
                                                                        className="goods"
                                                                        key={index}
                                                                        onClick={this.lableClick.bind(this, da, id, item)}>
                                                                        {da}
                                                                    </label>) :
                                                                (<label
                                                                    className="no-goods"
                                                                    key={index}
                                                                >
                                                                    {da}
                                                                </label>))

                                                    } else {
                                                        return (
                                                            this.state.checklable.includes(da) ? (
                                                                    <label
                                                                        className="checked"
                                                                        key={index}
                                                                        onClick={this.lableClick.bind(this, da, id, item)}>
                                                                        {da}
                                                                    </label>) :
                                                                (<label
                                                                    className="goods"
                                                                    key={index}
                                                                    onClick={this.lableClick.bind(this, da, id, item)}>
                                                                    {da}
                                                                </label>))
                                                    }

                                                })
                                            }
                                        </div>
                                    </div>
                                </List.Item>
                            ))
                        }
                        <List.Item extra={
                            <Stepper
                                style={{width: '100%', minWidth: '2rem'}}
                                showNumber
                                max={9999}
                                min={1}
                                value={this.state.val}
                                useTouch={true}
                                defaultValue={1}
                                onChange={this.onChange}
                            />}
                                   wrap>
                            <div className="number">数量</div>
                        </List.Item>
                    </List>
                    <Flex className="cover-action">
                        <Flex.Item className="buy" onClick={this.addToCart}>{this.state.cartName}</Flex.Item>
                        <Flex.Item className="addtocart" onClick={this.buy}>立即购买</Flex.Item>
                    </Flex>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        tempProduct: state.tempProduct
    }
}

export default connect(mapStateToProps)(ProductProperties)


