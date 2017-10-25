/*
 * 模块：分类商品
 *
 */
import {Flex} from 'antd-mobile';
import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import ClassIficationItem from '../../components/ClassIficationItem'
import {getInficationMenu,changeInficationMenu,getMenuChildren} from '../../actions/classIfication'
import Search from '../../components/Search'
import { WingBlank, WhiteSpace } from 'antd-mobile';
import ClassIficationContent from '../../components/ClassIficationContent'
import {storage} from '../../utils/tools';
import './index.less'
class ClassIfication extends React.Component {
    static propTypes = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state={
            imCategoryId:"" //保存一级分类id
        }

    }

    componentWillMount() {
        const {infiactionmenu} = this.props;
        if(infiactionmenu.code == -1){
            this.props.dispatch(getInficationMenu("1b6b78ea-9644-47c6-9f0e-d94b3c8ccebe",{},(res)=>{
                if(res.code == 0 && res.data.length>0){
                    this.props.dispatch(getMenuChildren(res.data[0].imCategoryId))
                }
            }))
        }else{
            return ;
        }

    }
    componentDidMount() {


    }
    //点击左侧分类列表
    clickMenu=(data)=>{
        this.props.dispatch(changeInficationMenu(data))
        this.setState({
            imCategoryId:data.imCategoryId
        })
        const {infiactionmenu} = this.props;
        if(infiactionmenu.data.filter(item=>item.imCategoryId == data.imCategoryId)[0].children&&infiactionmenu.data.filter(item=>item.imCategoryId == data.imCategoryId)[0].children.length>0){
            return ;
        }else{
            this.props.dispatch(getMenuChildren(data.imCategoryId))
        }
    }
    //点击二级分类
    clickGird=(data)=>{
        this.context.router.push(`/classshop/${data.imCategoryId}?name=${data.name}&parentId=${data.parentId}&type=1`)
    }
    render() {
        const {infiactionmenu} = this.props;
        console.dir(infiactionmenu)
        return (
            <div className="class-infication" >
                <WhiteSpace />
                <WingBlank>
                    <Search type="1"/>
                </WingBlank>
                <WhiteSpace />
                <Flex className="content">
                    <div className="left-sider" style={{height: document.documentElement.clientHeight - 200}}>
                        {
                            infiactionmenu.data.map((item,index)=>(
                                <ClassIficationItem  key={index} silderData={item} clickMenu={this.clickMenu} />
                            ))
                        }
                    </div>
                    <div className="right-content" style={{height: document.documentElement.clientHeight - 200}}>
                        {infiactionmenu.data.length>0?<ClassIficationContent clickGird={this.clickGird}  data={infiactionmenu.data.filter(item=>item.imCategoryId == infiactionmenu.selectId)[0]}/>:""}
                    </div>
                </Flex>
            </div>

        )
    }

}

function mapStateToProps(state) {
    return {
        infiactionmenu: state.infiactionmenu
    }
}

export default connect(mapStateToProps)(ClassIfication)
