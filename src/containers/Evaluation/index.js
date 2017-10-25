import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Flex, List, WingBlank, Button, Toast,WhiteSpace} from 'antd-mobile';
import {getComments, getRate, emporty, ealuationAdd} from '../../actions/evaluation'
import {Product} from '../../components/ProductItem'
import Rate from '../../components/Rate'
import './index.less'
import NavBar from '../../components/NavBar'
import BottomBtn from '../../components/BottomBtn'
import { emptyOrder} from '../../actions/orderDetails'
const Item = List.Item;
class Evaluation extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            distributionGrade: 0,
            speedGrade: 0,
            wuliuGrade: 0,
            code: -1,
            disabled: true
        }

    }

    componentDidMount() {
        const {id} = this.props.location.query;
        this.props.dispatch(getComments(id))
        this.props.dispatch(getRate(id, {}, (res) => {
            if (res.code == 0 && res.data) {
                this.setState({
                    distributionGrade: res.data.distributionGrade,
                    speedGrade: res.data.speedGrade,
                    wuliuGrade: res.data.wuliuGrade,
                    disabled: false,
                    code: 0
                })
            } else {
                this.setState({
                    disabled: true
                })
            }
        }))
    }



    distributionGrade = (value) => {
        if (this.state.disabled) {
            this.setState({
                distributionGrade: value
            })
        }
    }
    speedGrade = (value) => {
        if (this.state.disabled) {
            this.setState({
                speedGrade: value
            })
        }
    }
    wuliuGrade = (value) => {
        if (this.state.disabled) {
            this.setState({
                wuliuGrade: value
            })
        }
    }
    makeEaluation = () => {
        const {id} = this.props.location.query;
        if (this.state.distributionGrade == 0) {
            Toast.info('商品包装未评价', 1, null, false);
            return;
        } else if (this.state.speedGrade == 0) {
            Toast.info('送货速度', 1, null, false);
            return;
        } else if (this.state.wuliuGrade == 0) {
            Toast.info('配送员服务态度', 1, null, false);
            return;
        } else {
            this.props.dispatch(ealuationAdd({
                orderId: id,
                wuliuGrade: this.state.wuliuGrade,
                speedGrade: this.state.speedGrade,
                distributionGrade: this.state.distributionGrade,
            }, (res) => {
                if (res.code == 0) {

                    Toast.info(res.message, 2, null, false);
                    //清空订单本地数据
                    this.props.dispatch(emptyOrder());
                    this.context.router.replace(`/paySuccess?orderId=${id}&text=评论发布成功`)
                } else {
                    Toast.info(res.message, 2, null, false);
                }
            }))
        }

    }

    //组件销毁删除redux 数据
    componentWillUnmount() {
        this.props.dispatch(emporty())
    }
    renderProducts(){
        const {data} = this.props.comments;
        return(
            <div className="step3">
            {
                 data.map((item,i)=>{
                    return(
                        <div key={i} className="order-product-content">
                            <Product  showType={2} item={item}
                            clickProduct={()=>{ this.context.router.push(`/commectProduct?productId=${item.productId}&order1Id=${item.order1Id}`); } }
                            clickOrder={()=>{ this.context.router.push(`/dryingOrders?order1Id=${item.order1Id}`) }}
                            />
                        </div>
                    )

                 })
            }

            </div>
        )
    }

    render() {
        const {data} = this.props.comments;
        console.log(data)
        return (
            <div className="evaluation" style={{height: document.documentElement.clientHeight - 88}}>
                <NavBar title="评价晒单" {...this.props}/>

                <div className="nav-content" >
                    {this.renderProducts()}
                    <div className="tip">订单评分</div>
                    <div className="list">
                        <div className="item">
                            <span>商品包装</span>
                            <span className="rate-left">
                                <Rate
                                    count={5}
                                    value={this.state.distributionGrade}
                                    onChange={this.distributionGrade}

                                />
                            </span>
                        </div>
                        <div className="item">
                            <span>送货速度</span>
                            <span className="rate-left">
                                <Rate
                                    count={5}
                                    value={this.state.speedGrade}
                                    onChange={this.speedGrade}

                                />
                            </span>
                        </div>
                        <div className="item">
                            <span>服务态度</span>
                            <span className="rate-left">
                                <Rate
                                    count={5}
                                    value={this.state.wuliuGrade}
                                    onChange={this.wuliuGrade}

                                />
                            </span>
                        </div>
                    </div>
                    
                    <BottomBtn text={'发布'} onClick={this.makeEaluation} disabled={this.state.distributionGrade>0?true:false} />
                    
                  
                    
                </div>

            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        comments: state.comments
    }
}

export default connect(mapStateToProps)(Evaluation)
