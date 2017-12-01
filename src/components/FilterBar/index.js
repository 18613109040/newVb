/**
 * name:bar显示名称
 * selected:是否选中
 *
 */
import React, {Component} from "react";
import PropTypes from 'prop-types';
import './index.less'

class FilterBar extends Component {
    static propTypes = {
        data: PropTypes.array,
        onClickBar: PropTypes.func
    };
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };
    static defaultProps = {
        data: [
            {
                name: "综合",
                selected: true,
                downname: "",
                upname: "",
                change: true,
                down: false
            }, {
                name: "销量优先",
                selected: false,
                downname: "",
                upname: "",
                change: false,
                down: false
            }, {
                name: "价格",
                selected: false,
                downname: "",
                upname: "",
                change: true,
                down: false
            }
        ]
    };

    constructor(props) {
        super(props);
        this.state = {
            barData: this.props.data
        }

    }

    clickItem(data) {
        let temp = this.state.barData;
        temp.map(item => {
            if (item.name == data.name) {
                item.down = !item.down;
                item.selected = true;
            } else {
                item.selected = false;
            }
        })
        this.setState({
            barData: temp
        })
        if (this.props.onClickBar instanceof Function) {
            this.props.onClickBar(data)
        }

    }
    render() {
        return (
            <div className="filter-bar">
                <div className="menu">
                    {
                        this.state.barData.map((item, index) => (
                            <div key={index} onClick={this.clickItem.bind(this, item)}
                                 className={item.selected ? "select-menu " : "base-menu "}>
                                <span>{item.name}</span>
                                {
                                    item.change ? (
                                        <span className="text">
											{
                                                item.down ? (<i className="iconfont icon-top"></i>) :
                                                    (<i className="iconfont icon-down"></i>)
                                            }
										</span>) : ""
                                }

                            </div>
                        ))
                    }

                </div>
            </div>
        )
    }
}

export default FilterBar
