import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { ListView} from 'antd-mobile';
import {getActiveList,emptyActiveList} from '../../actions/activityProduct'
import {getAreaActivity} from '../../actions/home'
import FilterBar from '../../components/FilterBar'
import ListViewProduct from '../../components/ListViewProduct'
import ProductItem from '../../components/ProductItem'
import './index.less'
import {changeNavbarTitle} from '../../actions/home'
import utils from '../../utils'
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
            showImg:true,
            sortType: "ascPrice",
            isLoading: false,
            hasMore: true,
            dataSource: this.dataSource.cloneWithRows([])

        }
    }

    componentWillMount() {
        const {id,name} = this.props.location.query;
        const {areaActive} = this.props;
        const nav_name = areaActive.data.filter(item => item.imCampaignCategoryId == id).length > 0 ? areaActive.data.filter(item => item.imCampaignCategoryId == id)[0].name : "活动专场"
        this.props.dispatch(changeNavbarTitle(name||nav_name))
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
            if (res.data.pageOffset < res.data.totalPage) {
                this.setState({
                    isLoading: false,
                    hasMore: true,
                    pageNum:res.data.pageOffset
                })
            } else {
                this.setState({
                    isLoading: false,
                    hasMore: false,
                    pageNum:res.data.pageOffset
                })
            }
        }))
    }
    onClickBar = (data) => {
        this.setState({
            pageNum: 1,
            hasMore:true,
            isLoading:false
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
        if (!this.state.hasMore || this.state.isLoading) {
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
    onScroll=(e)=>{
        if(e.target.scrollTop > (document.documentElement.clientHeight-430)/2 ){
            this.setState({
                showImg:false
            })
        }
        if(e.target.scrollTop < 20){
            this.setState({
                showImg:true
            })
        }
    }
    render() {
        const {id} = this.props.location.query;
        const {areaActive} = this.props;
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
                {
                    nav_img&&this.state.showImg ? <div className="banner">
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
                        data={this.props.activityProduct.data}
                        isLoading={this.state.isLoading}
                        onEndReached={this.onEndReached}
                        type={1}
                        onScroll={this.onScroll}
                        height={document.documentElement.clientHeight -60*utils.multiple}
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
