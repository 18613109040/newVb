import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Carousel, Grid, WingBlank, WhiteSpace, List, ListView} from 'antd-mobile';
import {getBannerList, getProduct, getAreaActivity} from '../../actions/home'
import Swipers from '../../components/Swipers'
import ActivityItem from '../../components/ActivityItem'
import ProductItem from '../../components/ProductItem'
import Text from "../../components/Text";
import {storage} from '../../utils/tools'
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
            initialHeight: 180
        }
        this.lodding = false;
    }

    onScrollHandle(event) {
        const clientHeight = event.target.clientHeight
        const scrollHeight = event.target.scrollHeight
        const scrollTop = event.target.scrollTop
        const isBottom = (clientHeight + scrollTop + 100 >= scrollHeight)
        if (isBottom && !this.lodding) {
            this.lodding = true;
            if (this.props.areaActive.code == 0) {
                return
            } else {
                this.props.dispatch(getAreaActivity({}, (res) => {
                    this.lodding = false;
                }))
            }

        }
    }

    componentWillMount() {
        this.props.dispatch(getBannerList({}))
        this.props.dispatch(getProduct({}))
        if (this.contentNode) {
            this.contentNode.removeEventListener('scroll', this.onScrollHandle.bind(this));
        }
    }

    componentDidMount() {
        if (this.contentNode) {
            this.contentNode.addEventListener('scroll', this.onScrollHandle.bind(this));
        }

    }


    clickGird = (obj) => {
        MtaH5.clickStat(obj.id)
        if (obj.text == "云购") {
            if(storage.get("userInfo")&&storage.get("userInfo").id){
                location.href = obj.href+`1?loginMbgRedirectToken=${storage.get("token")}`
            }else{
                this.context.router.push(`/login`)
            }
        } else {
            this.context.router.push(obj.href)
        }

    }
    clickTab = (id) => {
        this.context.router.push(`/product?id=${id}`)
    }
    clickProduct = (id) => {
        this.context.router.push(`/product?id=${id}`)
    }

    cliclkMore(data) {
        this.context.router.push(`/activityProduct?id=${data.imCampaignCategoryId}`)
    }

    linktoPath(item) {

        if (item.title == "全球购") {
            if(storage.get("userInfo")&&storage.get("userInfo").id){
                location.href = item.path+`?uid=1&loginMbgRedirectToken=${storage.get("token")}`
            }else{
                this.context.router.push(`/login`)
            }


        } else {
            this.context.router.push(item.path)
        }

    }
    toActive=()=>{
        this.context.router.push(`/activity`)
    }
    render() {

        const {bannerList, newList, product, areaActive, classicMenu, activeMenu} = this.props;
        return (

            <div className="vb-home" style={{height:document.documentElement.clientHeight-100}}
                 ref={node => this.contentNode = node}>
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
                            item.typeId == 3 ? `/activityProduct?id=${item.imProductId}` : ""} key={id}>
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
                                <div style={{width: '50%', display: 'inline-block'}} key={index}
                                     onClick={this.linktoPath.bind(this, item)}>
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
                                <Link
                                    to={item.categoryType == 0 ? `/vbexchange?id=${item.imCategoryId}` : `/classification`}>
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
                    <img src={require("../../assets/images/10.png")} style={{width:"100%"}} onClick={this.toActive}/>
                </div>
                <WhiteSpace/>
                <div>
                    {areaActive.data&& areaActive.data.length>0?areaActive.data.map((item, id) => (
                        <div key={id}>
                            <List className="list-title">
                                <Item
                                    extra={'查看更多'}
                                    arrow="horizontal"
                                    onClick={this.cliclkMore.bind(this, item)}
                                >{item.name}</Item>
                            </List>
                            <div className="list-ul">
                                {
                                    item.products && item.products.map((item, index) => (
                                            <div key={index} className="goods-item">
                                                <ProductItem {...item} clickTab={this.clickTab}/>
                                            </div>

                                        )
                                    )

                                }
                            </div>

                            <WhiteSpace/>
                        </div>
                    )):""}

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
