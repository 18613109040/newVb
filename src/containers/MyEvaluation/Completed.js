//待评价
import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {ListView} from 'antd-mobile';
import {getCompleted} from '../../actions/evaluation'
import ListViewProduct from '../../components/ListViewProduct'
import ItemEva from './ItemEva'

class Completed extends Component {
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
        if (this.props.mycompletedlist.code == -1) {
            this.props.dispatch(getCompleted({
                pageNow: 1,
                pageSize: 10,
                isEvaluate: 1
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
            this.props.dispatch(getCompleted({
                pageNow:pageNow,
                pageSize: 10,
                isEvaluate: 1
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
        if (!this.state.hasMore ) {
            return;
        }
        this.setState({isLoading: true});
        setTimeout(()=>{
            this.getData(this.props.mycompletedlist.data.pageOffset + 1)
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
        let dataSource = this.dataSource.cloneWithRows(this.props.mycompletedlist.data.datas)
        return (
            <div className="be-evaluation">
                <ListViewProduct
                    row={row}
                    dataSource={dataSource}
                    status={this.props.mycompletedlist.code}
                    data={this.props.mycompletedlist.data}
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
        mycompletedlist: state.mycompletedlist
    }
}

export default connect(mapStateToProps)(Completed)
