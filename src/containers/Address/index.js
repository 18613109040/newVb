import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {List, InputItem, TextareaItem,Switch, Button, Toast, Picker} from 'antd-mobile';
import {addAddress, editAddress, getListAddress,getAddressDetail} from '../../actions/address'
import AddrData from './address'
import {changeNavbarTitle} from '../../actions/home'
const Item = List.Item;
class EditAddress extends Component {
    static propTypes = {};
    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            contact: "",
            phone: "",
            detail: "",
            address: [],
            isDefault: 0,
            errorName: false,
            errorPhone: false,
            errorDetail: false,
            visible:false
        }
    }
    componentWillMount() {
        const {id} = this.props.location.query;
        let title= id ? "编辑收货地址" : "新建收货地址"
        this.props.dispatch(changeNavbarTitle(title))
    }
    componentDidMount() {
        const {id} = this.props.location.query;
        if (id) {
            this.props.dispatch(getAddressDetail(id,{},(res)=>{
                if(res.code == 0){
                    let address = [].concat(res.data.province, res.data.city, res.data.area)
                    this.setState({
                        contact: res.data.contact,
                        isDefault: res.data.isDefault,
                        phone: res.data.phone,
                        detail: res.data.detail,
                        address: address,
                    })
                }
            }))
        }

    }

    //保存 修改
    saveAddress=() =>{

        const {id} = this.props.location.query;
        if (id) {
            this.props.dispatch(editAddress({
                addressId:id,
                isDefault: this.state.isDefault,
                contact: this.state.contact,
                phone: this.state.phone.replace(/\s/g, ''),
                province: this.state.address[0],
                city: this.state.address[1],
                area: this.state.address[2],
                zipCode: "111122",
                detail: this.state.detail,
            }, (res) => {
                Toast.info(res.message, 1)
                if(res.code == 0){
                    this.props.router.goBack();
                    this.props.dispatch(getListAddress({
                        pageNow: 1,
                        pageSize: 100
                    }))
                }
            }))

        } else {
            this.props.dispatch(addAddress({
                isDefault: this.state.isDefault,
                contact: this.state.contact,
                phone: this.state.phone.replace(/\s/g, ''),
                province: this.state.address[0],
                city: this.state.address[1],
                area: this.state.address[2],
                zipCode: "111122",
                detail: this.state.detail,
            }, (res) => {
                Toast.info(res.message, 1)
                if(res.code==0){
                    this.props.router.goBack();
                    this.props.dispatch(getListAddress({
                        pageNow: 1,
                        pageSize: 100
                    }))
                }
            }))
        }

    }

    onNameChange = (value) => {
        if (value && value.replace(/\s/g, '').length < 2) {
            this.setState({
                errorName: true,
                contact: value
            })
        } else {
            this.setState({
                errorName: false,
                contact: value
            })
        }
    }
    onPhoneChange = (value) => {

        if (value.replace(/\s/g, '').length < 11)  {
            this.setState({
                errorPhone: true,
                phone: value
            })
        } else {
            this.setState({
                errorPhone: false,
                phone: value
            })
        }
    }
    onDetailChange = (value) => {
        if (value.trim() == "") {
            this.setState({
                errorDetail: true,
                detail: value
            })
        } else {
            this.setState({
                errorDetail: false,
                detail: value
            })

        }
    }
    onSwitchChange = (check) => {
        this.setState({
            isDefault: check==true?1:0
        })
    }
    hasChildren(data){
        if(data.children){
            return true;
        }else{
            return  false;
        }
    }
    getChildren(data){
        data.map(item=>{
            item.label = item.value;
            if(this.hasChildren(item)){
                this.getChildren(item.children)
            }else{
                return false
            }
        })
        return data
    }
    render() {


        const disable_save = this.state.errorName || this.state.errorPhone || this.state.errorDetail || this.state.address == ""
        this.getChildren(AddrData)
        const district = AddrData
        return (
            <div className="eidt-address nav-content">
                <div style={{height: document.documentElement.clientHeight - 100}}>
                    <List>
                        <InputItem
                            value={this.state.contact}
                            onChange={this.onNameChange}
                            clear
                            error={this.state.errorName}
                            placeholder="请输入收货人姓名"
                        >收货人:</InputItem>

                        <InputItem
                            value={this.state.phone}
                            onChange={this.onPhoneChange}
                            clear
                            error={this.state.errorPhone}
                            type="phone"
                            placeholder="请输入手机号码"
                        >联系电话:</InputItem>

                        <Picker extra="请选择"
                                data={district}
                                title="地区"
                                value={this.state.address}
                                onChange={v => this.setState({ address: v })}
                                onOk={(v) => this.setState({address: v})}
                        >
                            <Item arrow="horizontal">所在地区:</Item>
                        </Picker>

                        <TextareaItem
                            value={this.state.detail}
                            onChange={this.onDetailChange}
                            clear
                            autoHeight
                            title="详细地址:"
                            error={this.state.errorDetail}
                            placeholder="请输入街道、楼牌号等"
                        />
                        <Item
                            extra={<Switch
                                name="isDefault"
                                checked={this.state.isDefault==0?false:true}
                                onChange={this.onSwitchChange}
                            />}
                        >
                            <div className="sitem-m">
                                <div className="div-1">设为默认地址</div>
                                <div className="div-2">注：每次下单时会使用该地址</div>
                            </div>

                        </Item>
                    </List>
                    <div style={{marginBottom:'100px'}}></div>
                </div>
                <div className="save-btn">
                    <Button className="btn" disabled={disable_save}
                            onClick={this.saveAddress}>保存并使用</Button>
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

export default connect(mapStateToProps)(EditAddress)
