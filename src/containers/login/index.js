import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {List, Button, InputItem, WingBlank, Toast} from 'antd-mobile';
import {changeNavbarTitle} from '../../actions/home'
import {userLogin} from '../../actions/user'
import './index.less'
import utils from '../../utils'
import {storage} from "../../utils/tools"

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
        this.props.dispatch(changeNavbarTitle("用户登录"))
    }
    componentDidMount() {

    }
    onChange = (type, value) => {
        this.setState({
            [type]: value,
        });
    }
    login = () => {
        const {redirectUrl} = this.props.location.query;

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
            if (res.code == 0) {

                //第三方登录
                if (redirectUrl) {
                    //encodeURI(redirectUrl)
                    if (encodeURI(redirectUrl).includes("?")) {
                        location.href = encodeURI(redirectUrl) + "&loginMbgRedirectToken=" + storage.get("token")
                    } else {
                        location.href = encodeURI(redirectUrl) + "?loginMbgRedirectToken=" + storage.get("token")
                    }

                } else {

                    this.props.router.goBack()
                }

            }
            Toast.info(res.message, 1);
        }))
    }

    render() {
        return (
            <div className="login-content"  >
                <div className="center">
                    <div className="header"><img src={require("../../assets/images/header.jpg")}/></div>
                    <WingBlank size='md'>
                        <List>
                            <InputItem

                                type={"text"}
                                placeholder="手机号"
                                onChange={this.onChange.bind(this, 'phone')}
                                value={this.state.phone}
                                clear
                            ><i className="iconfont icon-phone"></i></InputItem>
                            <InputItem
                                type="password"
                                placeholder="登录密码"
                                onChange={this.onChange.bind(this, 'password')}
                                value={this.state.password}
                            ><i className="iconfont icon-password"></i></InputItem>
                        </List>
                        {/*<List>
                              <InputItem
                                prefixListCls="login"
                                type="password"
                                placeholder="登录密码"
                                onChange={this.onChange.bind(this, 'password')}
                                value={this.state.password}
                            ><i className="iconfont icon-password"></i></InputItem>
                        </List> */}

                        <div className="bottom">
                            <span className="span" onClick={() => {
                                this.context.router.push('/forgetPassword')
                            }}>忘记密码</span>
                            {/*|*/}
                            {/*<span className="span" onClick={() => {*/}
                            {/*this.context.router.push('/register')*/}
                            {/*}}>快速注册</span>*/}
                        </div>
                        <Button className="btn" onClick={this.login}>登录</Button>
                        <div className="login-express">
                            <div >登录说明：</div>
                            <div>1、新微商账号，请用新微商账号密码登录。</div>
                            <div>2、云购账号，请重置密码再登录。</div>
                            <div>注：若新微商账号与云购账号相同，请用新微商账号密码登录。</div>
                        </div>

                    </WingBlank>
                </div>

            </div>
        )
    }
}


function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(Login)
