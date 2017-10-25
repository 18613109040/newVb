import React, {Component} from "react";
import {TabBar, Icon} from 'antd-mobile';
import {Link} from "react-router";
import PropTypes from 'prop-types';
import './index.less'

class MallNavBar extends Component {
    static propTypes = {
        tabBarData: PropTypes.array,
        badge: PropTypes.any,  //徽章数
        dot: PropTypes.bool   //小红点
    };
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    static defaultProps = {
        tabBarData: [
            {
                title: "首页",
                icon: require("../../assets/images/home.png"),
                path: "/home",
                selectIcon: require("../../assets/images/home-fill.png"),
            }, {
                title: "分类",
                icon: require("../../assets/images/class.png"),
                path: "/classification",
                selectIcon: require("../../assets/images/class-fill.png"),
            }, {
                title: "购物车",
                icon: require("../../assets/images/cart.png"),
                path: "/shopcart",
                selectIcon: require("../../assets/images/cart-fill.png"),
            }, {
                title: "我的",
                icon: require("../../assets/images/my.png"),
                path: "/myinfo",
                selectIcon: require("../../assets/images/my-fill.png"),
            }
        ],
        badge: "",
        dot: false
    };

    constructor(props) {
        super(props);
        const {pathname} = this.props.location;
        this.state = {
            selectedTab: pathname == "/" ? "/home" : pathname
        }

    }
    componentWillReceiveProps(nexprops){
        const {pathname} = nexprops.location;
        this.state = {
            selectedTab: pathname == "/" ? "/home" : pathname
        }

    }
    componentDidMount() {

    }
    render() {
        return (
            <div className="sb-tab-bar">
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#FFDB53"
                    barTintColor="white"
                >
                    {
                        this.props.tabBarData.map((item, id) => (

                            <TabBar.Item
                                title={item.title}
                                key={id}
                                icon={<div className="tabbar" style={{
                                    background: `url(${item.icon}) no-repeat`
                                }}
                                />}
                                selectedIcon={<div className="tabbar" style={{

                                    background: `url(${item.selectIcon}) no-repeat`
                                }}
                                />}
                                selected={this.state.selectedTab === item.path}
                                badge={this.props.badge}
                                dot={this.props.dot}
                                onPress={() => {
                                    this.context.router.push(`${item.path}`)
                                    this.setState({
                                        selectedTab: item.path,
                                    });
                                }}
                            >

                            </TabBar.Item>

                        ))
                    }
                </TabBar>
            </div>
        )
    }
}

export default MallNavBar
