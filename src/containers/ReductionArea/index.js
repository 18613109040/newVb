import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Button, Flex, WingBlank, Icon, ListView, NavBar} from 'antd-mobile';
import {selectCouponProducts} from '../../actions/newShelves'
import FilterBar from '../../components/FilterBar'

class ReductionArea extends Component {
    static propTypes = {};
    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1.orderId !== row2.orderId
        })
        this.searchData = [];
        this.state = {
            isScrolling: false,
            pageNum: 1,
            sortType: "priceAsc",
            totalPage: 3,
            isLoading: 2,
            dataSource: this.dataSource.cloneWithRows([])

        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.getData();

    }

    getData = () => {
        const {couponId} = this.props.location.query;
        if (this.state.pageNum > this.state.totalPage) {
            return;
        }
        this.setState({isLoading: 1})
        const {id} = this.props.location.query
        this.props.dispatch(selectCouponProducts({
            pageNow: this.state.pageNum,
            pageSize: 15,
            couponId: couponId,
            couponType: 0,
            sortType: this.state.sortType
        }, (res) => {
            this.setState({
                isLoading: 2
            })
            if (res.code == 0) {
                this.searchData = this.searchData.concat(res.data.datas)
                this.setState({
                    dataSource: this.dataSource.cloneWithRows(this.searchData),
                    pageNum: ++this.state.pageNum,
                    totalPage: res.data.totalPage,
                    tagdata: null
                })
            }

        }))
    }
    onClickBar = (data) => {
        if (data.change) {
            if (data.down) {
                this.setState({
                    pageNum: 1,
                    sortType: data.upname
                })
                setTimeout(() => {
                    this.searchData = [];
                    this.getData();
                }, 50)
            } else {
                this.setState({
                    pageNum: 1,
                    sortType: data.downname
                })
                setTimeout(() => {
                    this.searchData = [];
                    this.getData();
                }, 50)
            }

        } else {
            this.setState({
                pageNum: 1,
                sortType: data.downname
            })
            setTimeout(() => {
                this.searchData = [];
                this.getData();
            }, 50)
        }

    }

    render() {
        const {id} = this.props.location.query;
        const {areaActive, activityProduct} = this.props;
        const row = (item, sectionID, rowID) => {
            return (
                <Link className="active-link" key={rowID} to={`/product?id=${item.imProductId}`}>
                    <div className="active-product-list">
                        <div className="img">
                            {
                                item.isNew ? <span className="strong"></span> : ""
                            }
                            <img src={item.thumbImg}/>
                        </div>
                        <div className="name">{item.name}</div>
                        <div className="buttom-d">
										<span className="price">
											<i className="_i"/>
											<span className="current-price _rmb">{item.retailPrice}</span>
											<span className="marke-price">￥{item.marketPrice}</span>
                                            {
                                                (item.discount == 10 || item.discount == 0) ? "" :
                                                    <span className="discount">{item.discount}折</span>
                                            }

										</span>
                        </div>
                    </div>
                </Link>
            )
        }
        return (
            <div className="activity-product">
                <NavBar
                    leftContent={<div className='iconfont icon-back back-size' onClick={() => {
                        this.props.router.goBack()
                    }}></div>}
                    mode="light"
                >活动商品</NavBar>
                <div className='nav-content'>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderHeader={() =>
                            <FilterBar
                                data={[
                                    {
                                        name: "价格",
                                        selected: true,
                                        downname: "priceDesc",
                                        upname: "priceAsc",
                                        change: true,
                                        down: false
                                    }, {
                                        name: "折扣",
                                        selected: false,
                                        downname: "discountDesc",
                                        upname: "discountAsc",
                                        change: true,
                                        down: false
                                    }, {
                                        name: "销量优先",
                                        selected: false,
                                        downname: "saleDesc",
                                        upname: "saleAsc",
                                        change: false,
                                        down: false
                                    }
                                ]}
                                onClickBar={this.onClickBar}
                            />}
                        renderFooter={() => (<div style={{marginBottom: 50, textAlign: 'center'}}>
                            {this.state.isLoading == 1 ? <span><Icon
                                type="loading"/>加载中...</span> : this.state.isLoading == 2 ? "" : '没有数据了。。。。'}
                        </div>)}
                        renderRow={row}
                        className="fortest"
                        style={{
                            height: document.documentElement.clientHeight - 200,
                            overflow: 'auto',
                        }}
                        pageSize={15}
                        initialListSize={0}
                        onEndReached={this.getData}
                    />
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(ReductionArea)
