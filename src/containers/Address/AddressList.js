//收货地址列表
import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {List, Button, Toast,Modal,Checkbox, WhiteSpace, Flex} from 'antd-mobile';
import { getListAddress, checkAddress,deleteAddressDetail} from '../../actions/address'
import NavBar from '../../components/NavBar'
import EmptyData from '../../components/EmptyData'
import './index.less'

const Item = List.Item;
const AgreeItem = Checkbox.AgreeItem;
const alert = Modal.alert;
class AddressList extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            disablePullUp: false
        }
        this.saveAddress = this._saveAddress.bind(this);
    }

    componentDidMount() {
        if (this.props.listAddress.code == -1) {
            this.props.dispatch(getListAddress({
                pageNow: 1,
                pageSize: 100
            }))
        }
    }


    _saveAddress() {
        this.context.router.push("/eidtaddress");
    }

    clickItem(id) {
        const {select} = this.props.location.query;
        if (select) {
            this.props.dispatch(checkAddress({id: id}))
            this.props.router.goBack();

        }
    }

    gotoEidt = (id) => {
        console.dir(id)
        this.context.router.push(`/eidtaddress?id=${id}`);
    }
    //
    gotoDelete = (id) => {
        alert('删除', '确定删除选该地址', [
            {text: '取消'},
            {
                text: '确定',
                onPress: () => {
                    this.props.dispatch(deleteAddressDetail(id,{},(res)=>{
                        if(res.code == 0){
                            Toast.info(res.message, 1)
                            this.props.dispatch(getListAddress({
                                pageNow: 1,
                                pageSize: 100
                            }))
                        }
                    }))

                },
                style: {fontWeight: 'bold'},
            },
        ])

    }
    render() {
        const {data} = this.props.listAddress;
        return (
            <div className="address-list">
                <NavBar title={"我的地址"} {...this.props}/>
                <div className="list-content" style={{height: document.documentElement.clientHeight - 170}}>
                    {
                        data.datas.length==0?<EmptyData type={1} text={'你还没有收货地址'} />
                        :
                         data.datas.map((item, id) => (
                            <div key={id}>
                                <WhiteSpace/>
                                <List onClick={this.clickItem.bind(this, item.addressId)}>
                                    <Item>
                                        <div>
                                            <span className="name">{item.contact}</span>
                                            <span className="phone">{item.phone}</span>
                                        </div>
                                        <WhiteSpace/>
                                        <div
                                            className="address">{item.province + item.city + item.area + item.detail}</div>
                                        <WhiteSpace/>
                                    </Item>
                                    <Item extra={<Flex align="end" justify="center">
                                        <Flex.Item onClick={this.gotoEidt.bind(this, item.addressId)}>
                                            <i className="iconfont icon-eidt icon-size"></i><span
                                            className="address">编辑</span></Flex.Item>
                                        <Flex.Item onClick={this.gotoDelete.bind(this, item.addressId)}>
                                            <i className="iconfont icon-delete icon-size"></i><span
                                            className="address">删除</span></Flex.Item>
                                    </Flex>}
                                          className="adress-eidt">
                                        {
                                            item.isDefault == 1?(<div>
                                                <AgreeItem data-seed="logId"
                                                           checked={true}
                                                           onChange={e => console.log('checkbox', e)}>
                                                    默认地址
                                                </AgreeItem>
                                            </div>):""
                                        }


                                    </Item>
                                </List>
                            </div>
                        ))
                    }
                </div>
                <div className="save-btn">
                    <Button className="btn" onClick={this.saveAddress}>
                        <span className="iconfont icon-add icon-add-new"></span>新建地址
                    </Button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        listAddress: state.listAddress
    }
}

export default connect(mapStateToProps)(AddressList)
