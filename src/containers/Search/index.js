/*
 * 模块：VB兑换
 *
 */
import {ListView, List, SearchBar, Flex, Icon, Tag, Modal, WingBlank, WhiteSpace} from 'antd-mobile';
import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {storage} from "../../utils/tools"
import {improductSearch, emptySearch} from '../../actions/search'
import CommodityPrice from "../../components/CommodityPrice";
import FilterBar from '../../components/FilterBar'
import Text from "../../components/Text";
import NavBar from '../../components/NavBar'
import EmptyData from '../../components/EmptyData'

const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;
import './index.less'

class Search extends React.Component {
    static propTypes = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1.orderId !== row2.orderId
        })
        this.searchData = []
        this.state = {
            keyword: '',
            tagdata: storage.get("searchhistroy"),
            pageNum: 1,
            sortType: "",
            totalPage: 3,
            isLoading: 2, //1加载中 2隐藏 3 没有数据
            dataSource: this.dataSource.cloneWithRows([])
        }

    }

    SearchChange = (value) => {
        this.setState({
            keyword: value
        })
        if (value == "") {
            this.dataSource.cloneWithRows([])
            this.setState({
                dataSource: this.dataSource.cloneWithRows([]),
                tagdata: storage.get("searchhistroy")
            })
        }
        console.dir(value)
    }
    SearchData = () => {
        if (this.state.keyword != "") {
            let temp = [];
            if (storage.get("searchhistroy")) {
                temp = [].concat(storage.get("searchhistroy"), this.state.keyword)
            } else {
                temp = [].concat(this.state.keyword)
            }
            storage.setObj({
                searchhistroy: Array.from(new Set(temp))
            })
            this.setState({
                pageNum: 1,
                dataSource: this.dataSource.cloneWithRows([])
            })
            setTimeout(() => {
                this.searchData = [];
                this.getData();
            }, 50)
        }


    }
    removeHistroy = () => {
        alert('警告', '确定清空最近搜索数据？', [
            {text: '取消'},
            {
                text: '确定', onPress: () => {
                storage.remove("searchhistroy");
                this.setState({
                    tagdata: []
                })
            }, style: {fontWeight: 'bold'}
            },
        ]);

    }
    getData = () => {
        if (this.state.pageNum > this.state.totalPage) {
            return;
        }
        this.setState({isLoading: 1})
        const {type} = this.props.location.query;
        this.props.dispatch(improductSearch({
            pageNow: this.state.pageNum,
            pageSize: 15,
            platform: 1,
            keyword: this.state.keyword,
            type: type,
            sortType: this.state.sortType
        }, (res) => {
            this.setState({
                isLoading: 2
            })
            if (res.code == 0 && res.data.totalPage > 0) {
                this.searchData = this.searchData.concat(res.data.datas)
                this.setState({
                    dataSource: this.dataSource.cloneWithRows(this.searchData),
                    pageNum: ++this.state.pageNum,
                    totalPage: res.data.totalPage,
                    tagdata: null
                })
            } else if (res.code == 0 && res.data.datas.length == 0) {
                this.setState({
                    isLoading: 4,
                    tagdata: null
                })
            } else {
                this.setState({
                    isLoading: 2,
                    tagdata: null
                })
            }

        }))
    }

    productClick(id) {
        this.context.router.push(`/product?id=${id}`)
    }

    tagClick(name) {
        console.dir(name);
        this.setState({
            keyword: name
        })
        setTimeout(() => {
            this.searchData = [];
            this.getData();
        }, 50)

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
        const {type} = this.props.location.query;
        const row = (data, sectionID, rowID) => {
            return (
                <Item
                    thumb={data.thumbImg}
                    onClick={this.productClick.bind(this, data.imProductId)}
                >
                    <Text
                        text={data.name}
                        row={2}
                        textType="base"
                    />
                    <Brief>
                        {
                            type == 0 ? (
                                <CommodityPrice
                                    price={data.exchangeIntegral}
                                    unit="V币"
                                    icon="icon-vbi"
                                    priceStyle="lg-price"
                                    unitStyle="lg-unit"
                                    iconStyle="lg-icon"
                                />
                            ) : (
                                <div>
                                    <CommodityPrice
                                        price={Number(data.retailPrice).toFixed(2)}
                                        priceStyle="lg-price"
                                        unitStyle="lg-unit"
                                        iconStyle="lg-icon"
                                    />
                                    <div className="vb-y">市场参考价:{data.marketPrice}元</div>
                                </div>
                            )
                        }

                    </Brief>
                </Item>

            )
        };

        return (
            <div className="vb-search">
                <NavBar title="搜索" {...this.props}/>
                <SearchBar
                    placeholder="输入商品名称搜索"
                    cancelText="搜索"
                    value={this.state.keyword}
                    onChange={this.SearchChange}
                    onCancel={this.SearchData}
                />
                <WhiteSpace/>
                <WingBlank>
                    {
                        this.state.tagdata ? (

                            <div className="recent-search">
                                <div className="recent-search-head">
                                    <p>最近搜索</p>
                                    <i className="iconfont icon-delete-1  delete" onClick={this.removeHistroy}></i>
                                </div>
                                <div className='searchland'>
                                    <WhiteSpace/>
                                    {
                                        this.state.tagdata.map((item, index) => (
                                            <span className="tag-1" key={index}><Tag
                                                onChange={this.tagClick.bind(this, item)}>{item}</Tag></span>
                                        ))
                                    }
                                </div>
                            </div>

                        ) : ""
                    }
                </WingBlank>

                <div className="nav-content">
                    {
                        !this.state.tagdata ? (
                            <div>
                                <FilterBar
                                    data={[
                                        {
                                            name: "综合",
                                            selected: true,
                                            downname: "",
                                            upname: "",
                                            change: false,
                                            down: false
                                        }, {
                                            name: "销量优先",
                                            selected: false,
                                            downname: "cost",
                                            upname: "cost",
                                            change: false,
                                            down: false
                                        }, {
                                            name: "价格",
                                            selected: false,
                                            downname: "descPrice",
                                            upname: "ascPrice",
                                            change: true,
                                            down: false
                                        }
                                    ]}
                                    onClickBar={this.onClickBar}
                                />
                                <div className="nav-content">
                                    <ListView
                                        dataSource={this.state.dataSource}

                                        renderFooter={() => (<div style={{marginBottom: 50, textAlign: 'center'}}>
                                            {this.state.isLoading == 1 ? <span>
					   	<Icon type="loading"/>加载中...</span> :
                                                this.state.isLoading == 2 ? "" : this.state.isLoading == 4 ? <EmptyData text={"小主，没有搜索到对应的商品"}/> : '没有数据了。。。。'}
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
                        ) : ""
                    }

                </div>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(Search)
