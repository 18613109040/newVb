import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {ListView } from 'antd-mobile';
import {getEvaluation,emptyEvaluation} from "../../actions/product";
import NavBar from '../../components/NavBar'
import Assess from "../../components/Assess"
import ListViewProduct from '../../components/ListViewProduct'
import './index.less'

class Evaluation extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1.imCommentId !== row2.imCommentId
        })
        this.state = {
            dataSource:this.dataSource.cloneWithRows([]),
            isLoading:false,
            hasMore:true
        }

    }

    componentDidMount() {
        if (this.props.evaluation.data.datas.length > 0) {
            return
        } else {
            this.getData(1)
        }
    }
    getData(pageNow){
        const params = {
            pageSize: 10,
            pageNow: pageNow
        }
        this.props.dispatch(getEvaluation(this.props.location.query.id, params,(res)=>{
            if(res.data.pageOffset<=res.data.totalPage){
                this.setState({
                    isLoading:false,
                    hasMore:true
                })
            }else{
                this.setState({
                    isLoading:false,
                    hasMore:false
                })
            }
        }))
    }
    onEndReached=()=>{
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        this.setState({ isLoading: true });
        this.getData(this.props.evaluation.data.pageOffset+1)


    }
    componentWillUnmount() {
        this.props.dispatch(emptyEvaluation())
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.evaluation.data.datas !== this.props.evaluation.data.datas) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.evaluation.data.datas),
            });
        }
    }
    render() {
        const {evaluation} = this.props;
        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID}>
                    <Assess
                        data={rowData}
                    />
                </div>
            )
        };
        return (
            <div>
                <NavBar title="评论" {...this.props}/>
                <ListViewProduct
                    row={row}
                    dataSource={this.state.dataSource}
                    status={evaluation.code}
                    isLoading={this.state.isLoading}
                    reflistview="listrefs"
                    onEndReached={this.onEndReached}
                    height={document.documentElement.clientHeight - 100}
                    empty_text={'小主，该商品还没有评价'}
                />

            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        evaluation: state.evaluation
    }
}

export default connect(mapStateToProps)(Evaluation)
