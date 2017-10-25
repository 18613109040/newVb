import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {List, Button, InputItem, WingBlank, Toast} from 'antd-mobile';
import NavBar from '../../components/NavBar'
import {userLogin} from '../../actions/user'
import './index.less'
import utils from '../../utils'

class Login extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: ''
        }

    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    onChange = (type, value) => {
        this.setState({
            [type]: value,
        });
    }
    login = () => {
        let {phone, password} = this.state
        if (phone.replace(/\s/g, '').length < 11) {
            Toast.info('请输入手机号', 1);
            return
        }
        if (password == '') {
            Toast.info('请输入登录密码', 1);
            return
        }
        this.props.dispatch(userLogin({phone, password: utils.md5(password)}, (res) => {
            if (res.code == 0)
                this.props.router.goBack()
            Toast.info(res.message, 1);
        }))
    }

    render() {
        return (
            <div className="login-content">
                <NavBar  {...this.props}/>
                <div className="center">
                    <div className="header"><img src={require("../../assets/images/header.jpg")}/></div>
                    <WingBlank size='md'>
                        <List>
                            <InputItem
                                prefixListCls="login"
                                type="text"
                                placeholder="手机号"
                                onChange={this.onChange.bind(this, 'phone')}
                                value={this.state.phone}
                            ><i className="iconfont icon-phone"></i></InputItem>
                            <InputItem
                                prefixListCls="login"
                                type="password"
                                placeholder="登录密码"
                                onChange={this.onChange.bind(this, 'password')}
                                value={this.state.password}
                            ><i className="iconfont icon-password"></i></InputItem>
                        </List>
                        <Button className="btn" onClick={this.login}>登录</Button>
                    </WingBlank>


                </div>
                <div className="bottom">
                    <span className="span" onClick={() => {
                        this.context.router.push('/forgetPassword')
                    }}>忘记密码</span>
                    |
                    <span className="span" onClick={() => {
                        this.context.router.push('/register')
                    }}>快速注册</span>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(Login)
