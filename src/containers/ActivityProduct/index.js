import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Button, Flex, WingBlank,WhiteSpace, Icon, ListView} from 'antd-mobile';
import {getActiveList, addActiveList,emptyActiveList} from '../../actions/activityProduct'
import {getAreaActivity} from '../../actions/home'
import FilterBar from '../../components/FilterBar'
import NavBar from "../../components/NavBar";
import Text from "../../components/Text";
import ListViewProduct from '../../components/ListViewProduct'
import ProductItem from '../../components/ProductItem'
import './index.less'
const ImgHight = document.documentElement.clientWidth * 0.46 - 32
class ActivityProduct extends Component {
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
        this.type = "ascPrice";
        this.state = {
            isScrolling: false,
            pageNum: 1,
            sortType: "ascPrice",
            isLoading: false,
            hasMore: true,
            dataSource: this.dataSource.cloneWithRows([])

        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        if(this.props.areaActive.code ==0){

        }else{
            this.props.dispatch(getAreaActivity({}))
        }

        this.getData(1,"ascPrice");
    }
    componentWillUnmount(){
        this.props.dispatch(emptyActiveList());
    }
    getData(pageNow,type) {
        const {id} = this.props.location.query
        this.props.dispatch(getActiveList(id, {
            pageNow: pageNow,
            pageSize: 10,
            sortType: type
        }, (res) => {
            this.setState({
                pageNum:res.data.pageOffset
            })
            if (res.data.pageOffset < res.data.totalPage) {
                this.setState({
                    isLoading: false,
                    hasMore: true,
                })
            } else {
                this.setState({
                    isLoading: false,
                    hasMore: false
                })
            }
        }))
    }
    onClickBar = (data) => {
        this.setState({
            pageNum: 1
        })
        this.props.dispatch(emptyActiveList());
        if (data.change) {
            if (data.down) {
                this.type = data.downname;
                this.getData(1, data.downname);
            } else {
                this.type = data.upname;
                this.getData(1, data.upname);
            }

        } else {
            this.type = data.upname;
            this.getData(1, data.upname);
        }

    }
    onEndReached = () => {
        if (!this.state.hasMore) {
            return;
        }
        this.setState({isLoading: true});
        setTimeout(() => {
            this.getData(this.state.pageNum + 1, this.type)
        }, 100)
    }
    gotoShop(data){
        this.context.router.push(`/product?id=${data.imProductId}`)
    }
    render() {
        const {id} = this.props.location.query;
        const {areaActive, activityProduct} = this.props;
        const row = (rowData, sectionID, rowID) => {
            return (
                <ProductItem  {...rowData} clickTab={this.gotoShop.bind(this, rowData)} height={ImgHight}/>
            )
        }
        const nav_img = areaActive.data.filter(item => item.imCampaignCategoryId == id).length > 0 ? areaActive.data.filter(item => item.imCampaignCategoryId == id)[0].imageUrl : ""
        const nav_name = areaActive.data.filter(item => item.imCampaignCategoryId == id).length > 0 ? areaActive.data.filter(item => item.imCampaignCategoryId == id)[0].name : "活动专场"
        let dataSource = this.dataSource.cloneWithRows(this.props.activityProduct.data.datas)
        return (
            <div className="activity-product class-shop">
                <NavBar title={nav_name} {...this.props}/>
                {
                    nav_img ? <div className="banner">
                        <img src={nav_img}/>
                    </div> : ""
                }
                <FilterBar
                    data={[
                        {
                            name: "价格",
                            selected: true,
                            downname: "descPrice",
                            upname: "ascPrice",
                            change: true,
                            down: false
                        }, {
                            name: "折扣",
                            selected: false,
                            downname: "descDiscount",
                            upname: "ascDiscount",
                            change: true,
                            down: false
                        }, {
                            name: "销量优先",
                            selected: false,
                            downname: "cost",
                            upname: "cost",
                            change: false,
                            down: false
                        }
                    ]}
                    onClickBar={this.onClickBar}
                />
                <ListViewProduct
                    row={row}
                    dataSource={dataSource}
                    status={this.props.activityProduct.code}
                    isLoading={this.state.isLoading}
                    onEndReached={this.onEndReached}
                    type={1}
                    height={nav_img?document.documentElement.clientHeight -430:document.documentElement.clientHeight -100}
                    empty_text={'小主，敬请期待活动商品上架哦！'}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        areaActive: state.areaActive,
        activityProduct: state.activityProduct
    }
}

export default connect(mapStateToProps)(ActivityProduct)
