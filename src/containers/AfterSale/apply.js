/*选择退货商品*/
import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {changeNavbarTitle} from '../../actions/home'
import {Product} from '../../components/Order'
import {getApplyRefundInit, refundMoney, emptyOrder, emptyOrderDetails} from '../../actions/orderDetails'
import {uploadImg} from '../../actions/evaluation'
import {
    Toast,
    InputItem,
    List,
    WhiteSpace,
    WingBlank,
    ImagePicker,
    Modal,
    Icon,
    Checkbox,
    TextareaItem
} from 'antd-mobile';
import EmptyData from '../../components/EmptyData'
import utils from '../../utils'

const Item = List.Item;
const Brief = Item.Brief;
const CheckboxItem = Checkbox.CheckboxItem;
//地址栏type  type=1：售后退款，type=2：售后退货退款，type=3：待发货退款
//refundDetail的refundType   refundType=1：售后退款，refundType=2：售后退货退款，refundType=3：待发货退款
class ChooseGoods extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            detail: '',
            Vbmoney: 0,
            refundVCoin: 0,
            money: 0,
            refundReason: {
                id: -1,
                text: ''
            },
            goodsStatus: {
                id: -1,
                text: ''
            }
        }
        this.imgdata = [];

    }

    componentWillMount() {
        this.props.dispatch(changeNavbarTitle("申请退款"))


    }

    componentDidMount() {
        let {refundId} = this.props.location.query
        let {afterSaleProducts} = this.props
        let items = [], products = []
        products = afterSaleProducts.order1s.filter(item => item.checked == true)

        products.map((item, i) => {
            items = items.concat({orderItemId: item.order1Id, refundCount: item.amount})

        })
        let obj = Object.assign({}, {orderId: afterSaleProducts.orderId, items: items})
        this.props.dispatch(getApplyRefundInit(obj, (res) => {
            this.setState({
                money: res.data.totalRefundMoney,
                Vbmoney: res.data.totalRefundVCoin,
                refundVCoin: res.data.refundVCoin
            })
        }))

    }

    onImageClick = (index, fs) => {
    }

    changeInput(type, value) {
        this.setState({
            [type]: value
        })
    }

    onChangeImg = (files, type, index) => {
        this.setState({
            files,
        });

        if (index >= 0) {
            this.imgdata.splice(index, 1)
            return;
        }
        this.props.dispatch(uploadImg({
            attachs: files[files.length - 1].file
        }, (res) => {
            if (res.code == 0) {
                this.imgdata = [...this.imgdata, res.data.url]
            } else {
                Toast.fail(res.message, 1);
            }
        }))


    }

    submit() {
        let {type} = this.props.location.query
        let {goodsStatus, refundReason, money, detail, Vbmoney} = this.state
        let {applyRefundInit, afterSaleProducts} = this.props
        if (type == 1 && goodsStatus.id == -1) {
            Toast.fail('请选择货物状态', 1);
            return
        }
        if (refundReason.id == -1) {
            Toast.fail('请选择退单原因', 1);
            return
        }
        if (isNaN(parseFloat(money))) {
            Toast.fail('退款金额输入有误', 1);
            return
        }
        if (isNaN(parseFloat(Vbmoney))) {
            Toast.fail('退单V币个数输入有误', 1);
            return
        }
        if (money > applyRefundInit.data.totalRefundMoney) {
            Toast.fail(`退款金额输入有误`, 1);
            return
        }
        if (Vbmoney > applyRefundInit.data.totalRefundVCoin) {
            Toast.fail(`退单V币个数输入有误`, 1);
            return
        }
        Toast.loading("提交中...")
        let items = []
        afterSaleProducts.order1s.filter(item => item.checked == true).map((item, i) => {
            items = items.concat({orderItemId: item.order1Id, refundCount: item.amount})
        })
        let obj = Object.assign({}, {
            orderId: afterSaleProducts.orderId,
            items: items,
            refundReason: parseInt(refundReason.id),
            goodsStatus: parseInt(goodsStatus.id),
            refundRemark: detail,
            refundMoney: parseFloat(money),
            refundIntegral: parseFloat(Vbmoney),
            uploadImages: this.imgdata

        })
        let url = ''
        if (type == 1)
            url = 'imorder/refund/apply/money'
        else if (type == 2)
            url = 'imorder/refund/apply/money/goods'
        else if (type == 3)
            url = 'imorder/refund/apply/money/all'
        this.props.dispatch(refundMoney(obj, url, (res) => {
            Toast.hide()
            if (res.code == 0) {
                this.props.dispatch(emptyOrder())
                this.props.dispatch(emptyOrderDetails())
                Toast.success(res.message, 1);
                this.context.router.replace('/afterSale/list')
            }
            else
                Toast.fail(res.message, 1);
        }))


    }

    onChange(item, type) {
        let modal = ''
        if (type == 'refundReason')
            modal = 'modal_refundReason'
        else
            modal = 'modal_goodsStatus'

        this.setState({
            [type]: {
                id: item.id,
                text: item.text
            },
            [modal]: false
        })
    }

    render() {
        let {refundId, type} = this.props.location.query
        let {afterSaleProducts} = this.props
        let products = []
        if (!afterSaleProducts.orderId) return null
        if (type == 3) {
            products = afterSaleProducts.order1s

        } else {
            products = afterSaleProducts.order1s.filter(item => item.checked)
        }


        return (
            <div className="afterSale-content"
                 style={{height: document.documentElement.clientHeight - 45 * utils.multiple}}>
                <div style={{"marginBottom": 55 * utils.multiple + 'px'}}>
                    <div className="step3">
                        {
                            products.map((item, i) => {
                                return (
                                    <div key={i} className="order-product-content">
                                        <Product key={0} showStepper={0}
                                                 item={Object.assign(item,
                                                     {
                                                         amount: item.amount || item.purchaseQuantity,
                                                         exchangeIntegral: item.integral,
                                                         retailPrice: item.price,
                                                         productType: item.price > 0
                                                     }
                                                 )}
                                        />
                                    </div>
                                )

                            })
                        }
                    </div>
                    <WhiteSpace/>
                    {this.renderPart()}
                    <WhiteSpace/>
                    <div className="uploadImg-content">
                        <WingBlank size="md">
                            <div className="title">上传图片凭证</div>
                        </WingBlank>
                        <ImagePicker
                            files={this.state.files}
                            onChange={this.onChangeImg}
                            onImageClick={this.onImageClick}
                            selectable={this.state.files.length < 3}
                        />
                    </div>
                    <WhiteSpace/>
                    <TextareaItem

                        className="textarea-detail"
                        value={this.state.detail}
                        onChange={(v) => {
                            this.changeInput('detail', v)
                        }}
                        clear
                        autoHeight
                        placeholder="补充更多信息以便我们更快帮您解决…(选填)"
                    />
                    <div className="cart-fixed">
                        <div className="big-btn" onClick={() => {
                            this.submit()
                        }}>提交
                        </div>
                    </div>
                    {this.renderModal()}
                    {this.renderModal2()}
                </div>
            </div>
        )
    }

    //退货原因
    renderPart() {
        let {type, refundId} = this.props.location.query
        let {money, Vbmoney, refundReason, goodsStatus} = this.state
        let {applyRefundInit, afterSaleProducts} = this.props

        let editable = true, _type
       // editable = type == 3 ? false : true
        _type = type

        return (
            <section>
                <List className="apply-refund-type">
                    {
                        _type == 1 ?
                            <Item arrow="horizontal" multipleLine onClick={() => {
                                this.setState({
                                    modal_goodsStatus: true
                                })
                            }} extra={`${goodsStatus.text == '' ? '请选择' : goodsStatus.text}`}>
                                货物状态
                            </Item> : null
                    }


                    <Item arrow="horizontal" multipleLine onClick={() => {
                        if (_type == 1 && goodsStatus.id < 0) {
                            Toast.fail('请选选择货物状态', 1);
                            return
                        }
                        this.setState({
                            modal_refundReason: true
                        })
                    }} extra={`${refundReason.text == '' ? '请选择' : refundReason.text}`}>
                        退单原因
                    </Item>
                    {
                        applyRefundInit.data.totalRefundMoney > 0 ?
                            <InputItem placeholder={'退单金额'} type="text" className="apply-input" editable={editable}
                                       value={money} onChange={(v) => {
                                this.changeInput('money', v)
                            }}>
                                退单金额
                            </InputItem> : null
                    }

                    {
                        applyRefundInit.data.totalRefundVCoin > 0 ?
                            <InputItem placeholder={'退单V币'} type="text" className="apply-input" editable={editable}
                                       value={this.state.refundVCoin} onChange={(v) => {
                                this.changeInput('refundVCoin', v)
                            }}>
                                退单V币
                            </InputItem> : null
                    }


                </List>

                {/* V币商品*/}

                {
                    applyRefundInit.data.refundVCoin > 0 && applyRefundInit.data.refundMoney <= 0 ?
                        <div className="refund-tip">
                            V币最多退{applyRefundInit.data.totalRefundVCoin}个
                        </div> : null
                }

                {/*现金商品，不抵扣V币*/}

                {
                    applyRefundInit.data.totalRefundVCoin <= 0 && applyRefundInit.data.refundMoney > 0 ?
                        <div className="refund-tip">
                            退款金额最多{ parseFloat(applyRefundInit.data.totalRefundMoney ).toFixed(2)   }元
                        </div> : null
                }

                {/*现金商品，抵扣V币*/}

                {
                    applyRefundInit.data.totalRefundVCoin > 0 && applyRefundInit.data.refundMoney > 0 ?
                        <div className="refund-tip">
                            退款金额最多{parseFloat(applyRefundInit.data.totalRefundMoney ).toFixed(2)  }元，V币抵扣最多退{applyRefundInit.data.totalRefundVCoin}个
                        </div> : null
                }
            </section>
        )
    }

    //退款原因弹框
    renderModal() {
        let {type, refundId} = this.props.location.query
        let {applyRefundInit} = this.props
        let {refundReason, modal_refundReason, goodsStatus} = this.state
        if (applyRefundInit.code != 0) return null

        let reasons = []
        if (type == 3)
            reasons = applyRefundInit.data.refundReasons
        else if (type == 2) {
            reasons = applyRefundInit.data.receiveGoodsRefundReasons
        } else if (type == 1) {
            if (goodsStatus.id == 0) {  //未发货
                reasons = applyRefundInit.data.notReceiveGoodsRefundReasons
            } else if (goodsStatus.id == 1) { //已发货
                reasons = applyRefundInit.data.receiveGoodsRefundReasons
            }
        }

        return (
            <Modal
                popup
                visible={modal_refundReason}
                maskClosable={true}
                animationType="slide-up"
            >
                <div className="apply-refund-modal">
                    <div className="title">
                        <span>请选择退单原因</span>
                        <span className="colose" onClick={() => {
                            this.setState({modal_refundReason: false})
                        }}><Icon type="cross"/></span>
                    </div>
                    <div className="apply-refund-details">
                        {
                            reasons.map((item, i) => {
                                return (
                                    <div className="li" key={i}>
                                        <span>{item.text}</span>
                                        <Checkbox checked={item.id == refundReason.id}
                                                  onChange={() => this.onChange(item, 'refundReason')}/>

                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </Modal>
        )
    }

    //货物状态 弹框
    renderModal2() {
        let {applyRefundInit} = this.props
        let {goodsStatus, modal_goodsStatus} = this.state
        if (applyRefundInit.code != 0) return null

        return (
            <Modal
                popup
                visible={modal_goodsStatus}
                maskClosable={true}
                animationType="slide-up"
            >
                <div className="apply-refund-modal">
                    <div className="title">
                        <span>请选择货物状态</span>
                        <span className="colose" onClick={() => {
                            this.setState({modal_goodsStatus: false})
                        }}><Icon type="cross"/></span>
                    </div>
                    <div className="apply-refund-details">
                        {
                            applyRefundInit.data.goodsStatuses.map((item, i) => {
                                return (
                                    <div className="li" key={i}>
                                        <span>{item.text}</span>
                                        <Checkbox checked={item.id == goodsStatus.id}
                                                  onChange={() => this.onChange(item, 'goodsStatus')}/>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </Modal>
        )
    }
}


function mapStateToProps(state) {
    return {
        afterSaleProducts: state.afterSaleProducts,
        applyRefundInit: state.applyRefundInit,
    }
}

export default connect(mapStateToProps)(ChooseGoods)
