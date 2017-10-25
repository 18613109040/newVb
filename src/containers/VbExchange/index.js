/*
 * 模块：VB兑换
 *
 */
import {ListView,WhiteSpace,WingBlank, Flex} from 'antd-mobile';
import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {
    getVbExchangeMenu,
    getVbExchangeHost,
    getVbList,
    getVbMenuChildren,
    changeVbInficationMenu
} from '../../actions/newShelves'
import Search from '../../components/Search'
import NavBar from '../../components/NavBar'
import ClassIficationItem from '../../components/ClassIficationItem'
import ClassIficationContent from '../../components/ClassIficationContent'
import './index.less'

class VbExchange extends React.Component {
    static propTypes = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.type = "vbhost";
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1.orderId !== row2.orderId
        })
        this.dataSource = this.dataSource.cloneWithRows([])
        this.state = {
            menuactive: 0,
            id: "vbhost",
            dataSource: this.dataSource.cloneWithRows([]),
            isLoading: 2
        }

    }

    componentWillMount() {
        const {id} = this.props.location.query;
        const {vbexchangemenu} = this.props;
        if (vbexchangemenu.code == -1) {
            this.props.dispatch(getVbExchangeMenu(id, {}, (res) => {
                if (res.code == 0 && res.data.length > 0) {
                    this.props.dispatch(getVbMenuChildren(res.data[0].imCategoryId))
                }
            }))
        } else {
            return;
        }

    }

    componentDidMount() {


    }
    //点击左侧分类列表
    clickMenu=(data)=>{
        console.dir(data)
        this.props.dispatch(changeVbInficationMenu(data))
        this.setState({
            imCategoryId:data.imCategoryId
        })
        const {vbexchangemenu} = this.props;
        if(vbexchangemenu.data.filter(item=>item.imCategoryId == data.imCategoryId)[0].children&&vbexchangemenu.data.filter(item=>item.imCategoryId == data.imCategoryId)[0].children.length>0){
            console.dir("++++++++++")
            return ;
        }else{
            this.props.dispatch(getVbMenuChildren(data.imCategoryId))
        }
    }
    //点击二级分类
    clickGird=(data)=>{
        this.context.router.push(`/classshop/${data.imCategoryId}?name=${data.name}&parentId=${data.parentId}&type=0`)
    }
    render() {
        const {vbexchangemenu} = this.props;
        return (
            <div className="class-infication">
                <NavBar title="V币热兑" {...this.props}/>
                <WhiteSpace/>
                <WingBlank>
                    <Search type="0"/>
                </WingBlank>
                <WhiteSpace/>
                <Flex className="content">
                    <div className="left-sider" style={{height: document.documentElement.clientHeight - 200}}>
                        {
                            vbexchangemenu.data.map((item, index) => (
                                <ClassIficationItem key={index} silderData={item} clickMenu={this.clickMenu}/>
                            ))
                        }
                    </div>
                    <div className="right-content" style={{height: document.documentElement.clientHeight - 200}}>
                        {vbexchangemenu.data.length > 0 ? <ClassIficationContent clickGird={this.clickGird}
                                                                                 data={vbexchangemenu.data.filter(item => item.imCategoryId == vbexchangemenu.selectId)[0]}/> : ""}
                    </div>
                </Flex>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        vblist: state.vblist,
        vbexchangemenu: state.vbexchangemenu
    }
}

export default connect(mapStateToProps)(VbExchange)
