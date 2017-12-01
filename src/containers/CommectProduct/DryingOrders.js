import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { List, TextareaItem, WingBlank, ImagePicker, Toast, WhiteSpace} from 'antd-mobile';
import Loading from '../../components/Loading'
import {getOrderDetail, uploadImg, submitGoodEval} from '../../actions/evaluation'
import Rate from '../../components/Rate'
import {Product} from '../../components/ProductItem'
import BottomBtn from '../../components/BottomBtn'
import {changeNavbarTitle} from '../../actions/home'
import './index.less'

class DryingOrders extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.imgdata = [];
        this.state = {
            img: "",
            grade: 0,
            content: "",
            code: -1,
            files: [],
            data: {}
        }

    }
    componentWillMount() {
        this.props.dispatch(changeNavbarTitle("评价晒单"))
    }
    componentDidMount() {
        const {order1Id} = this.props.location.query;
        this.props.dispatch(getOrderDetail(order1Id, {}, (res) => {
            if(res.code ==0){
                this.setState({
                    code: 0,
                    img: res.data.thumbImg,
                    data: res.data
                })
            }
        }))
    }

    distributionGrade = (value) => {
        this.setState({
            grade: value
        })
    }
    onChange = (value) => {
        this.setState({
            content: value
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
    onImageClick = (index, fs) => {
    }
    //提交评价
    submitClick = () => {
        let {grade,content}=this.state
        if(grade<1){
            Toast.fail("请给商品评分", 2);
            return
        }
        if(content==''){
            Toast.fail("评论的内容不能为空", 2);
            return
        }
        let tem = {}
        this.imgdata.map((item, id) => {
            if (id == 0) {
                tem['commentImg'] = item
            } else {
                tem['commentImg' + id] = item
            }
        })
        this.props.dispatch(submitGoodEval(
            Object.assign({}, tem, {
                imProductId: this.state.data.productId,
                orderId: this.state.data.orderId,
                order1Id: this.state.data.order1Id,
                grade: grade,
                content: content,
            }), (res) => {
                if (res.code == 0) {
                    Toast.success(res.message, 2);
                    this.props.router.goBack();
                } else {
                    Toast.fail(res.message, 2);
                }
            }))
    }

    renderProducts() {
        const {data} = this.state;
        return (
            <div className="step3">
                <div className="order-product-content">
                    <Product showType={1} item={data}/>
                </div>
            </div>
        )
    }

    render() {
        const {data} = this.state;
        return (
            <div className="drying-orders">
                <div className="nav-content">
                    {
                        this.state.code == -1 ? (<Loading/>) :
                            <div style={{height: document.documentElement.clientHeight - 88}}>
                                <div className="bg">{this.renderProducts()}</div>
                                <div className="div-2">
                                    <span className="title">商品评分</span>

                                    <Rate
                                        value={this.state.grade}
                                        onChange={this.distributionGrade}/>
                                </div>
                                <WhiteSpace/>
                                <div className="div-3">
                                    <WingBlank size="md"><p className="tip">上传图片</p></WingBlank>

                                    <ImagePicker
                                        files={this.state.files}
                                        onChange={this.onChangeImg}
                                        onImageClick={this.onImageClick}
                                        selectable={this.state.files.length < 3}
                                    />
                                </div>
                                <WhiteSpace/>
                                <List>
                                    <TextareaItem
                                        clear
                                        placeholder="写下购买体会或使用过程中带来的帮助等，可以为其他小伙伴提供参考~"
                                        count={256}
                                        labelNumber={256}
                                        rows={5}
                                        onChange={this.onChange}
                                        value={this.state.content}
                                    />
                                </List>
                            </div>
                    }
                </div>
                <BottomBtn text={'提交评价'} onClick={this.submitClick}/>

            </div>
        )
    }
}


function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(DryingOrders)
