//待评价
import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {ListView} from 'antd-mobile';
import {getMycommentList} from '../../actions/evaluation'
import ListViewProduct from '../../components/ListViewProduct'
import ItemEva from './ItemEva'
class BeEvaluation extends Component {
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
        this.state = {
            isLoading: false,
            hasMore: false,
        }

    }

    componentDidMount() {
        if (this.props.mycommentlist.code == -1) {
            this.props.dispatch(getMycommentList({
                pageNow: 1,
                pageSize: 10,
                isEvaluate: 0
            },(res)=>{
                if (res.data.pageOffset < res.data.totalPage) {
                    this.setState({
                        isLoading: false,
                        hasMore: true
                    })
                } else {
                    this.setState({
                        isLoading: false,
                        hasMore: false
                    })
                }
            }))
        } else {
            this.setState({
                isLoading: false,
                hasMore: true
            });
        }
    }
    getData(pageNow){
            this.props.dispatch(getMycommentList({
                pageNow: pageNow,
                pageSize: 10,
                isEvaluate: 0
            }, (res) => {
                if (res.data.pageOffset < res.data.totalPage) {
                    this.setState({
                        isLoading: false,
                        hasMore: true
                    })
                } else {
                    this.setState({
                        isLoading: false,
                        hasMore: false
                    })
                }
            }));


    }
    onEndReached = () => {
        if (!this.state.hasMore) {
            return;
        }
        this.setState({isLoading: true});
        setTimeout(()=>{
            this.getData(this.props.mycommentlist.data.pageOffset + 1)
        },100)

    }
    render() {
        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID} className="item-order row">
                    <ItemEva item={rowData}/>
                </div>
            )
        };
        let dataSource = this.dataSource.cloneWithRows(this.props.mycommentlist.data.datas)
        return (
            <div className="be-evaluation">
                <ListViewProduct
                    row={row}
                    dataSource={dataSource}
                    status={this.props.mycommentlist.code}
                    data={this.props.mycommentlist.data}
                    isLoading={this.state.isLoading}
                    reflistview="listrefs"
                    onEndReached={this.onEndReached}
                    type={2}
                    height={document.documentElement.clientHeight - 100}
                    empty_type={2}
                />

            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        mycommentlist: state.mycommentlist
    }
}

export default connect(mapStateToProps)(BeEvaluation)
