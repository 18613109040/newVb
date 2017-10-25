/*@TODO
 * 爆款推荐
 * 接口暂时每提供排序
 */
import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Flex, ListView, WingBlank, WhiteSpace} from 'antd-mobile';
import {getExplosionRecom, emptyExplosionRecom} from '../../actions/newShelves'
import ListViewProduct from '../../components/ListViewProduct'
import FilterBar from '../../components/FilterBar'
import NavBar from "../../components/NavBar";
import ProductItem from '../../components/ProductItem'
const ImgHight = document.documentElement.clientWidth * 0.46 - 32
class ExplosionRecom extends Component {
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
        this.type = "ascPrice";
        this.state = {
            isLoading: false,
            hasMore: false,
            sortType: "ascPrice",
            pageNum: 1
        }
    }

    componentDidMount() {
        this.getData(1, "ascPrice")
    }

    getData(pageNow, type) {
        this.props.dispatch(getExplosionRecom({
            pageNow: pageNow,
            pageSize: 10,
            platform: 0,
            type: 1,
            // sortType: type
        }, (res) => {
            if (res.code == 0) {
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

                this.setState({
                    pageNum: res.data.pageOffset
                })
            }

        }));
    }
    componentWillUnmount(){
        this.props.dispatch(emptyExplosionRecom());
    }
    onClickBar = (data) => {
        this.setState({
            pageNum: 1
        })
        this.props.dispatch(emptyExplosionRecom());
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
        if (!this.state.hasMore ) {
            return;
        }
        this.setState({isLoading: true});
        setTimeout(() => {
            this.getData(this.state.pageNum + 1, this.type)
        }, 100)
    }
    gotoShop = (data) => {
        console.dir(data)
        this.context.router.push(`/product?id=${data.imProductId}`)
    }

    render() {
        let dataSource = this.dataSource.cloneWithRows(this.props.explosionRecom.data.datas)
        const row = (rowData, sectionID, rowID) => {
            return (
                <ProductItem  {...rowData} clickTab={this.gotoShop.bind(this, rowData)} height={ImgHight}/>
            )
        }
        return (
            <div className="new-shelves class-shop">
                <NavBar title="爆款推荐" {...this.props}/>
                {/*<FilterBar*/}
                {/*data={[*/}
                {/*{*/}
                {/*name: "价格",*/}
                {/*selected: true,*/}
                {/*downname: "descPrice",*/}
                {/*upname: "ascPrice",*/}
                {/*change: true,*/}
                {/*down: false*/}
                {/*}, {*/}
                {/*name: "折扣",*/}
                {/*selected: false,*/}
                {/*downname: "descDiscount",*/}
                {/*upname: "ascDiscount",*/}
                {/*change: true,*/}
                {/*down: false*/}
                {/*}, {*/}
                {/*name: "销量优先",*/}
                {/*selected: false,*/}
                {/*downname: "cost",*/}
                {/*upname: "cost",*/}
                {/*change: false,*/}
                {/*down: false*/}
                {/*}*/}
                {/*]}*/}
                {/*onClickBar={this.onClickBar}*/}
                {/*/>*/}
                <ListViewProduct
                    row={row}
                    dataSource={dataSource}
                    status={this.props.explosionRecom.code}
                    isLoading={this.state.isLoading}
                    reflistview="listrefs"
                    onEndReached={this.onEndReached}
                    type={1}
                    height={document.documentElement.clientHeight - 100}
                />

            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        explosionRecom: state.explosionRecom
    }
}

export default connect(mapStateToProps)(ExplosionRecom)
