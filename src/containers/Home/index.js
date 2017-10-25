import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Carousel, Grid, WingBlank, WhiteSpace, List, Flex} from 'antd-mobile';
import {getBannerList, getProduct, getAreaActivity} from '../../actions/home'
import ProductList from '../../components/ProductList'
import Swipers from '../../components/Swipers'
import ActivityItem from '../../components/ActivityItem'
import ProductItem from '../../components/ProductItem'
import Text from "../../components/Text";
import Img from '../../components/Img'
import './index.less'
const Item = List.Item;
class Home extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            initialHeight: 180,
        }
    }

    componentWillMount() {

        this.props.dispatch(getBannerList({}))
        this.props.dispatch(getProduct({}))
        this.props.dispatch(getAreaActivity({}))
    }

    componentDidMount() {

       // storageTime.setItem("test",'hello').exports(30)

    }

    clickGird = (obj) => {
        MtaH5.clickStat(obj.id)
        console.dir(obj)
        if(obj.text=="云购"){
            location.href=obj.href
        }else{
            this.context.router.push(obj.href)
        }

    }
    homeSearch = () => {
        this.context.router.push(`/search?type=1`)
    }
    clickFenLei = () => {
        this.context.router.push(`/classification`)
    }
    clickTab = (id) => {
        this.context.router.push(`/product?id=${id}`)
    }
    clickProduct =(id)=>{
        this.context.router.push(`/product?id=${id}`)
    }
    cliclkMore(data){
        this.context.router.push(`/activityProduct?id=${data.imCampaignCategoryId}`)
    }
    linktoPath(item){
        console.dir(item);
        if(item.title == "全球购"){
            location.href=item.path
        }else{
            this.context.router.push(item.path)
        }

    }
    render() {

        const {bannerList, newList, product, areaActive, classicMenu, activeMenu} = this.props;
        let opt = {
            distance: 200, // 每次移动的距离，卡片的真实宽度
            currentPoint: 1,// 初始位置，默认从0即第一个元素开始
            swTouchend: (ev) => {
                let data = {
                    moved: ev.moved,
                    originalPoint: ev.originalPoint,
                    newPoint: ev.newPoint,
                    cancelled: ev.cancelled
                }
                console.log(data);
                this.setState({
                    curCard: ev.newPoint
                })
            }
        }
        return (
            <div className="vb-home" style={{height: document.documentElement.clientHeight - 100}}>
                <Carousel
                    className="my-carousel-sild"
                    autoplay={true}
                    infinite={true}
                    selectedIndex={1}
                    swipeSpeed={35}

                >
                    {bannerList.data.map((item, id) => (
                        <Link onClick={() => {
                            MtaH5.clickStat(`baner${id}`)
                        }} to={item.typeId == 1 ? `/product?id=${item.imProductId}` : item.typeId == 2 ? item.linkUrl :
                            item.typeId == 3 ? `/activityProduct?id=${item.imProductId}` : ""} key={id} >
                            <Img
                                base64={2}
                                src={item.imageUrl}
                                style={{width: "100%"}}
                                alt="icon"
                                onLoad={() => {

                                }}
                            />
                        </Link>
                    ))}
                </Carousel>

                <div className="menu-nav">
                    <Grid data={classicMenu.data}
                          columnNum={classicMenu.data.length}
                          hasLine={false}
                          className="home-square-grid"
                          renderItem={dataItem => (
                              <div className="am-grid-item-inner-content ">
                                  <img src={dataItem.icon} className="home-grid-icon" alt="icon"/>
                                  <WhiteSpace/>
                                  <div>
                                      <span className="am-grid-text">{dataItem.text}</span>
                                  </div>
                              </div>
                          )}
                          onClick={this.clickGird}/>
                </div>
                <WhiteSpace/>
                <div className="background-base">
                    <WingBlank size="sm">
                        <WhiteSpace/>
                        {
                            activeMenu.data.map((item, index) => (
                                <div style={{width: '50%', display: 'inline-block'}} key={index} onClick={this.linktoPath.bind(this,item)}>
                                    <WingBlank size="sm">
                                        <ActivityItem {...item}/>
                                    </WingBlank>
                                    <WhiteSpace/>
                                </div>
                            ))
                        }
                    </WingBlank>
                </div>
                <WhiteSpace/>
                {
                    product.data.map((item, index) => (
                        <div key={index}>
                            <div className="banner-img">
                                <Link to={item.categoryType==0?`/vbexchange?id=${item.imCategoryId}`:`/classification`}>
                                    <img src={item.imageUrl}/>
                                </Link>
                            </div>
                            <div className="swiper-div">
                                <Swipers>
                                    {
                                        item.products.map((item, ind) => (
                                            <div className="swiper-slide" key={ind}>
                                                <ProductItem {...item} clickTab={this.clickTab}/>
                                            </div>
                                        ))
                                    }
                                </Swipers>
                            </div>
                            <WhiteSpace/>
                        </div>
                    ))
                }
                <div>
                    {areaActive.data.map((item, id) => (
                        <div key={id}>
                            <List>
                                <Item
                                    extra={'查看更多'}
                                    arrow="horizontal"
                                    onClick={this.cliclkMore.bind(this,item)}
                                >{item.name}</Item>
                            </List>
                            <Flex className="active">
                                {
                                    item.products&&item.products.map((ix, index) => (
                                        <Flex.Item key={index} onClick={this.clickProduct.bind(this,ix.imProductId)}>
                                            <WingBlank>
                                                <div className="image">
                                                    <img src={ix.thumbImg}/>
                                                </div>
                                                <div>
                                                    <Text text={ix.name} row={1} size="md"/>
                                                </div>
                                                <WhiteSpace size="xs"/>
                                                {
                                                    ix.productType == 0 ? (
                                                        <div className="money-footer">
                                                            <label className="iconfont icon-vbi"></label>
                                                            <span className="money">{ix.exchangeIntegral}</span>
                                                        </div>
                                                    ) : (
                                                        <div className="money-footer">
                                                            <label className="iconfont icon-qian"></label>
                                                            <span className="money">{ix.retailPrice}</span>
                                                        </div>
                                                    )

                                                }
                                                <WhiteSpace />
                                            </WingBlank>
                                        </Flex.Item>
                                    ))
                                }
                            </Flex>
                            <WhiteSpace />
                        </div>
                    ))}

                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        bannerList: state.bannerList,
        newList: state.newList,
        product: state.product,
        areaActive: state.areaActive,
        classicMenu: state.classicMenu,
        activeMenu: state.activeMenu
    }
}

export default connect(mapStateToProps)(Home)
