import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {ListView,PullToRefresh} from 'antd-mobile';
import './index.less'
import EmptyData from  '../EmptyData'
class ListViewProduct extends Component {
    static propTypes = {
        dataSource: PropTypes.any,
        status: PropTypes.number,
        row: PropTypes.any,
        onEndReached: PropTypes.func,
        isLoading: PropTypes.bool,
        type: PropTypes.number, //类型

    };
    static defaultProps = {
        dataSource: {}, //数据源 ListViewDataSource 格式
        status: 0, //状态 -1 数据加载  0 数据请求成功  0&&dataSource.length=0 数据为空
        row: (rowData, sectionID, rowID) => {
        },
        isLoading: false,
        type:1,
        height:document.documentElement.clientHeight-90
    };
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentWillMount() {


    }

    componentDidMount() {

    }
    

    onEndReached = () => {
        if (this.props.onEndReached instanceof Function) {
            this.props.onEndReached()
        }
    }
    onRefresh = ()=>{
        if (this.props.onRefresh instanceof Function) {
            this.props.onRefresh()
        }
    }
    onScroll=(e)=>{
        if (this.props.onScroll instanceof Function) {
            this.props.onScroll(e)
        }
    }
    render() {
        let {empty_type,empty_text} =this.props;
        return (
            <div className="list-view-product">
                {
                    this.props.status == -1 ? <div style={{"textAlign":"center","padding":"20px 0"}}>
                        数据加载中....</div> : this.props.status == 0 && this.props.dataSource._cachedRowCount > 0 ?
                            <ListView
                                ref='listview'
                                dataSource={this.props.dataSource}
                                renderFooter={() => (<div style={{padding: '10px 0px 60px 0px', textAlign: 'center'}}>
                                    {this.props.isLoading ? '加载中...' :  this.props.data.totalRecord === this.props.data.datas.length?"小主，到底了噢~":"" }
                                </div>)}
                                renderRow={this.props.row}
                                style={{
                                    height: this.props.height
                                }}
                                pullToRefresh={this.props.onRefresh?<PullToRefresh
                                    onRefresh={this.onRefresh}
                                    distanceToRefresh={80}
                                    direction="down"
                                />:null}
                                onScroll={this.onScroll}
                                pageSize={10}
                                onEndReached={this.onEndReached}

                            />
                            : this.props.status == 0 && this.props.dataSource._cachedRowCount == 0 ?
                             <EmptyData type={empty_type} text={empty_text}/>: <div>数据有问题</div>
                }
            </div>
        )
    }
}


export default ListViewProduct
