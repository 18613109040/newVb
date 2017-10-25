import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { List, Button, InputItem,WingBlank,Toast,WhiteSpace } from 'antd-mobile';
import NavBar from '../../components/NavBar'
import {getRegisterSms,userResister,resetPassword,resetPasswordSms} from '../../actions/user'
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
        this.state={
            phone:'',
            password:''
        }
        
       
    }

    componentWillMount() {
        let {pathname}=this.context.router.location
        this.pathname=pathname


        console.log(this.context.router.location.pathname)
    }

    componentDidMount() {
       
    }
    componentWillUnmount(){
        clearInterval(this.codeInterval)
        this.codeInterval = null
    }
    onChange =(type,value) => {
        if(type=='phone'){
            if (value.replace(/\s/g, '').length < 11) {
              this.setState({
                hasError: true,
                [type]:value,
              });
            } else {
              this.setState({
                hasError: false,
                [type]:value,
              });
            }
        }
        else if(type=='password'){
            let re=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{6,}$/
            if(!re.test(value))
            {
                this.setState({
                  hasError_password:true,
                  [type]:value,
                });


            }else{
                 this.setState({
                  hasError_password:false,
                  [type]:value,
                });
            }
        }
        else if(type=="password2"){
            if(value != this.state.password){
                this.setState({
                  hasError_password2:true,
                  [type]:value,
                });
            }else{
                this.setState({
                  hasError_password2:false,
                  [type]:value,
                });
            }
        }
        else{
            this.setState({
                [type]:value,
            });
        }
        
       
    }
    //获取验证码
    codeInterval
    getSms=()=>{
        let {phone,hasError}=this.state
        if(hasError){
            Toast.info('请输入正确的手机号码', 1);
            return
        }
        let timer = 60
        if(this.codeInterval) return
        let input = this.refs.codeBtn
        input.innerText = timer+"s后重新获取"
        this.codeInterval = setInterval(()=>{
          timer--
          if(!timer){
            clearInterval(this.codeInterval)
            this.codeInterval = null
            input.innerText = '重新获取'
            return
          }
          input.innerText = timer+"s后重新获取"
        },1000)
        if(this.pathname=='/forgetPassword'){
            this.props.dispatch(resetPasswordSms({phone},(res)=>{
                Toast.info(res.message, 1);
            }))
        }else{
            this.props.dispatch(getRegisterSms({phone},(res)=>{
                Toast.info(res.message, 1);
            }))
        }
        
    }
    login =() =>{
        let {phone,password,code,hasError,hasError_password,hasError_password2}=this.state
        if(hasError){
            Toast.info('请输入正确的手机号码', 1);
            return
        }else if(hasError_password){
            Toast.info('请输入6位以上数字和字母组合的密码', 1);
            return
        }else if(hasError_password2){
            Toast.info('两次输入密码不一致', 1);
            return
        }else if(code==''){
            Toast.info('请输入手机验证码',1)
            return
        }
        
        let action_url
        if(this.state.pathname=='/forgetPassword'){
           this.props.dispatch(resetPassword({phone,password:utils.md5(password),smsVerify:code},(res) => {
            if(res.code==0)
            {
                this.context.router.push('/login')
            }
            Toast.info(res.message, 1);
            }))
        }else{
            this.props.dispatch(userResister({phone,password:utils.md5(password),smsVerify:code},(res) => {
            if(res.code==0)
            {
                this.props.dispatch(userLogin({phone,password:utils.md5(password)},(res) => {
                if(res.code==0)
                    this.context.router.push('/home')
                }))
            }
            Toast.info(res.message, 1);
            }))
        }
        


    }
   
    render(){
        let {pathname} =this.state
        return (
            <div className="login-content">
                <NavBar  {...this.props} title={this.pathname=='/forgetPassword'?'忘记密码':'注册'}/>
                <div className="center">
                    <WhiteSpace  size='lg' />
                    <WingBlank size='md'>
                    <List >
                       <InputItem 
                        prefixListCls="login"
                        type="text"
                        placeholder="输入手机号"
                        error={this.state.hasError}
                        onErrorClick={this.onErrorClick}
                        onChange={this.onChange.bind(this,'phone')}
                        value={this.state.phone}
                      ><i className="iconfont icon-phone"></i></InputItem>
                        <InputItem 
                        prefixListCls="login"
                        type="text"
                        placeholder="请输入验证码"
                        onChange={this.onChange.bind(this,'code')}
                        value={this.state.code}
                      ><i className="iconfont icon-code"></i>
                       <span className="code-btn"  ref="codeBtn" onClick={this.getSms}>获取验证码</span>
                      </InputItem>
                        <InputItem 
                        prefixListCls="login"
                        type="password"
                        placeholder={this.pathname=='/forgetPassword'?`请输入新密码`:'6位以上数字和字母组合'}
                        onChange={this.onChange.bind(this,'password')}
                        value={this.state.password}
                      ><i className="iconfont icon-password"></i></InputItem>
                      <InputItem
                        prefixListCls="login"
                        type="password"
                        placeholder={this.pathname=='forgetPassword'?`请确认新密码`:'再次确认密码'}
                        onChange={this.onChange.bind(this,'password2')}
                        value={this.state.password2}
                      ><i className="iconfont icon-password"></i></InputItem>
                    </List>
                    <Button className="btn" onClick={this.login}>{this.pathname=='/forgetPassword'?'确定':'注册'}</Button>
                    </WingBlank>


                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
       
    }
}

export default connect(mapStateToProps)(Login)
