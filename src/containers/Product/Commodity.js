import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Carousel, Icon, List, Toast, Modal, Flex, WhiteSpace} from 'antd-mobile';
import {
    getProduct,
    addTempProduct,
    updateTempProduct,
    getProductCoupons,
    getProductSpec,
    emptyProduct,
    emptyProductSpec,
    getEvaluation,
    emptyEvaluation,
    changeProductCoupon
} from "../../actions/product";
import {immemberCollect, deleteCollection} from '../../actions/collection'
import {storage} from "../../utils/tools";
import CouponTem from "../../components/CouponTem";
import ProductProperties from '../../components/ProductProperties';
import {addUserCoupon} from "../../actions/coupon"
import Assess from "../../components/Assess"
import Text from '../../components/Text'
import Cart from '../../components/Cart';
import Img from '../../components/Img';

const Item = List.Item;
const Brief = Item.Brief;

class Commodity extends Component {
    static propTypes = {
        id: PropTypes.string
    };

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            chengeName: "",
            initialHeight: 375,
            changeSkuData: {
                skuId: ""
            },
            modal: false,  //优惠券弹框
            modal_productProperties: false //商品规格弹框
        }
        this.receiveCounp = this._receiveCounp.bind(this);
        this.showModal = this._showModal.bind(this);
        this.onClose = this._onClose.bind(this);
    }

    componentDidMount() {
        const params = {
            platform: 1,
            openId: storage.get("openId")
        }
        this.props.dispatch(getProduct(this.props.id, params))
        this.props.dispatch(getProductCoupons(this.props.id));
        this.props.dispatch(getProductSpec(this.props.id));
        const params2 = {
            pageSize: 1,
            pageNow: 1
        }
        this.props.dispatch(getEvaluation(this.props.id, params2))

    }

    //领取优惠券
    onClickEvent = (data) => {
        this.props.dispatch(addUserCoupon({couponId: data.id, couponType: data.couponType}, (res) => {
            if (res.code == 0) {
                this.props.dispatch(changeProductCoupon(data))
                Toast.success(res.message, 1);

            } else {
                Toast.fail(res.message, 1);
            }
        }))

    }

    //组件销毁时清空商品信息
    componentWillUnmount() {
        this.props.dispatch(emptyProduct())
        this.props.dispatch(emptyProductSpec())
        this.props.dispatch(emptyEvaluation())
    }

    //领取优惠券
    _receiveCounp(e) {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            modal: true,
        });

    }

    //商品收藏
    onCollection = (collection) => {
        console.dir(collection);
        if (collection) {
            this.props.dispatch(deleteCollection({
                openId: storage.get("openId"),
                productId: this.props.productDetails.data.imProductId
            }, (res) => {
                Toast.success(res.message, 1);
            }))
        } else {
            this.props.dispatch(immemberCollect({
                openId: storage.get("openId"),
                productId: this.props.productDetails.data.imProductId
            }, (res) => {
                Toast.success(res.message, 1);
            }))
        }

    }
    addToCart = (data) => {

        Toast.success("添加购物车成功", 1);
        this.setState({
            modal_productProperties: false,
            chengeName: data.specDetail,
            changeSkuData: data
        })
        if (this.props.tempProduct.filter(item => item.data.imProductId == this.props.productDetails.data.imProductId && item.skuId == data.skuId).length > 0) {
            this.props.dispatch(updateTempProduct(
                {
                    id: this.props.productDetails.data.imProductId,
                    check: true,
                    skuId: data.skuId,
                    specDetail: data.specDetail,
                    amount: data.amount //this.props.tempProduct.filter(item => item.data.imProductId == this.props.productDetails.data.imProductId)[0].amount + 1
                }));
        } else {
            if (this.props.productDetails.code != -1)
                this.props.dispatch(addTempProduct(Object.assign({}, this.props.productDetails, {
                    skuId: data.skuId,
                    specDetail: data.specDetail,
                    amount: data.amount
                })));
        }
    }

    buyNow = (data) => {

        this.addToCart(data);
        this.context.router.push(`/buyNow?id=${this.props.productDetails.data.imProductId}&skuId=${data.skuId}`)
    }

    addCartBar = () => {
        let spec = this.props.productspec.data || [];
        let {tempProduct} = this.props
        //有sku
        if (spec.length > 0) {
            this.setState({
                modal_productProperties: true
            })
        } else {
            tempProduct = tempProduct.filter(item => item.data.imProductId == this.props.productDetails.data.imProductId)
            if (tempProduct.length > 0) {
                if (tempProduct[0].amount > tempProduct[0].data.stockNum) {
                    Toast.fail("库存不足", 1);
                    return
                }
                Toast.success("添加购物车成功", 1);
                this.props.dispatch(updateTempProduct(
                    {
                        id: this.props.productDetails.data.imProductId,
                        check: true,
                        skuId: "",
                        amount: tempProduct[0].amount + 1
                    }));
            } else {
                if (this.props.productDetails.data.stockNum == 0) {
                    Toast.fail("库存不足", 1);
                    return
                }
                Toast.success("添加购物车成功", 1);
                this.props.dispatch(addTempProduct(Object.assign({}, this.props.productDetails, {
                    amount: 1,
                    skuId: "",
                    check: true
                })));
            }
        }

    }
    buyShopBar = () => {
        let spec = this.props.productspec.data || [];
        //有sku
        if (spec.length > 0) {
            if (this.state.changeSkuData.skuId) {
                this.context.router.push(`/buyNow?id=${this.props.productDetails.data.imProductId}&skuId=${this.state.changeSkuData.skuId}`)
            } else {
                this.setState({
                    modal_productProperties: true
                })
            }
        } else {
            if (this.props.tempProduct.filter(item => item.data.imProductId == this.props.productDetails.data.imProductId).length > 0) {
                this.context.router.push(`/buyNow?id=${this.props.productDetails.data.imProductId}`)
            } else {
                this.addCartBar();
                this.context.router.push(`/buyNow?id=${this.props.productDetails.data.imProductId}`)
            }

        }

    }
    _showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    _onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

    createMarkup() {
        const {productDetails} = this.props;
        return {__html: productDetails.data.details};
    }

    render() {
        const {data} = this.props.productDetails;
        const hProp = this.state.initialHeight ? {height: this.state.initialHeight} : {};
        let imgArray = [].concat(data.bannelImg1, data.bannelImg2, data.bannelImg3, data.bannelImg4, data.bannelImg5);
        for (let i = 0; i < imgArray.length; i++) {
            if (imgArray[i] == "" || typeof(imgArray[i]) == "undefined") {
                imgArray.splice(i, 1);
                i = i - 1;
            }
        }
        let spec = this.props.productspec.data || [];
        let tempProduct = this.props.tempProduct.data || [];
        let number = 0;
        console.dir(this.props.tempProduct)
        this.props.tempProduct.map((item) => {
            number += item.amount;
        })
        return (
            <div className="vb-commodity" style={{height: document.documentElement.clientHeight}}>
                <Carousel
                    className="my-carousel-sild"
                    autoplay={true}
                    infinite={true}
                    selectedIndex={1}
                    swipeable={false}
                    animated={false}
                >
                    {imgArray.map((item, id) => (

                        <a href={item} key={id} style={hProp}>
                            <Img
                                src={item}
                                style={{width: "100%", height: "750px"}}
                                alt="icon"
                                onLoad={() => {
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({
                                        initialHeight: null,
                                    });
                                }}
                            />
                        </a>
                    ))
                    }
                </Carousel>
                <div className='price-floor'>
                    <div className="prod-title">
                        <span className="title-text-wrap">
                            <Text text={data.name} size="lg" row={2}/>
                        </span>
                    </div>

                    <WhiteSpace size="sm"/>
                    {
                        data.productType == 0 ? (
                            <div className="money-footer">
                                <label className="iconfont icon-vbi"></label>
                                <span className="money">{data.exchangeIntegral}</span>
                            </div>
                        ) : (
                            <div className="money-footer">
                                <label className="iconfont icon-qian"></label>
                                <span className="money">{new Number(data.retailPrice).toFixed(2)}</span>
                            </div>
                        )
                    }


                    <div className="prod-act">
                        <Flex>
                            <span className="inline_1">·30天无忧退款</span>
                            {/*<span className="inline">·48小时快速退款</span>*/}
                            <span className="inline_2">·满99元免邮费</span>
                        </Flex>
                    </div>
                    {
                        this.props.productCoupons.data.length > 0 ?
                            <List className="my-list">
                                <Item arrow="down" onClick={this.receiveCounp}>优惠券</Item>
                            </List> : ''
                    }

                    {
                        spec.length > 0 ? (
                            <List className="my-list">
                                {
                                    this.state.chengeName == '' ?
                                        <Item arrow="down"
                                              onClick={this.showModal('modal_productProperties')}>选择产品规格</Item>
                                        :
                                        <Item arrow="down" onClick={this.showModal('modal_productProperties')}>
                                            <div className="selected-colortype">
                                                <div className="fourth-cells">
                                                    <span className="cell-tag-hd">已  选  </span>
                                                    <span className="cell-primary">{this.state.chengeName}</span>
                                                </div>
                                            </div>
                                        </Item>

                                }

                            </List>
                        ) : ''
                    }

                </div>
                <WhiteSpace size="md"/>
                {
                    this.props.evaluation.data.datas.length > 0 ? (
                        <div className="goods-part">
                            <Flex justify="between" className="comment-title" onClick={() => {
                                this.context.router.push(`product/evaluation?id=${this.props.id}`)
                            }}>
                                <span>评价({this.props.evaluation.data.totalRecord})</span>
                                <span>查看全部</span>
                            </Flex>

                            <Assess data={this.props.evaluation.data.datas[0]}/>

                        </div>
                    ) : <div className="goods-part">
                        <Flex justify="between" className="comment-title" onClick={() => {
                            this.context.router.push(`product/evaluation?id=${this.props.id}`)
                        }}>
                            <span>评价(0)</span>
                        </Flex>

                        <div className="empty-data">暂无评价</div>

                    </div>
                }


                <WhiteSpace size="md"/>
                <div>
                    <List>
                        <Item>产品详情</Item>
                    </List>
                    <div className="details-style" dangerouslySetInnerHTML={this.createMarkup()}></div>
                </div>
                <Cart
                    text={number}
                    collection={false}
                    onCollection={this.onCollection}
                    addCart={this.addCartBar}  //加入购物车
                    buyShop={this.buyShopBar}   //立即购买
                    linkto="/shopcart"
                />
                {/*选择规格弹框*/}
                {this.renderModal_properties()}

                {/*优惠券弹框*/}
                {this.renderModal_coupon()}

            </div>
        )
    }

    renderModal_properties() {
        return (
            <Modal
                popup
                visible={this.state.modal_productProperties}
                maskClosable={true}
                animationType="slide-up"
            >
                <div>
                    <ProductProperties
                        addToCart={this.addToCart}
                        clickColose={this.onClose('modal_productProperties')}
                        buyNow={this.buyNow}
                        inintdata={this.state.changeSkuData}
                        data={Object.assign({}, this.props.productDetails.data, {shopAttr: this.props.productspec.data})}
                    />
                </div>
            </Modal>
        )
    }

    renderModal_coupon() {
        let {productCoupons} = this.props
        let userCoupon = productCoupons.data.filter(item => item.hasGet == 0);
        let hasCoupon = productCoupons.data.filter(item => item.hasGet == 1);
        return (
            <Modal
                popup
                visible={this.state.modal}
                maskClosable={true}
                animationType="slide-up"

            >
                <div className="vb-product-counp">
                    <div className="title">
                        <span>领优惠券</span>
                        <span className="colose" onClick={() => {
                            this.setState({modal: false})
                        }}><Icon type="cross"/></span>
                    </div>
                    <div className="pop-hight">
                        {
                            userCoupon.length > 0 ?
                                <div>
                                    <div className="linder-quan">可领优惠券</div>
                                    <div>
                                        {
                                            userCoupon.map((item, id) => (
                                                <CouponTem
                                                    key={id}
                                                    data={Object.assign({}, item, {status: 5})}
                                                    onClickEvent={this.onClickEvent}
                                                />
                                            ))
                                        }
                                    </div>
                                </div> : ""
                        }
                        {
                            hasCoupon.length > 0 ?
                                <div>
                                    <div className="linder-quan">可使用优惠券</div>
                                    <div>
                                        {
                                            hasCoupon.map((item, id) => (
                                                <CouponTem
                                                    key={id}
                                                    data={Object.assign({}, item, {status: 4})}

                                                />
                                            ))
                                        }
                                    </div>
                                </div> : ""
                        }
                    </div>
                </div>
            </Modal>
        )
    }
}


function mapStateToProps(state) {
    return {
        productDetails: state.productDetails,
        productCoupons: state.productCoupons,
        productspec: state.productspec,
        tempProduct: state.tempProduct,
        evaluation: state.evaluation
    }
}

export default connect(mapStateToProps)(Commodity)
