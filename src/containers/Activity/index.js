import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Toast,Pagination,Modal } from 'antd-mobile';
import {changeNavbarTitle} from '../../actions/home'
import utils from '../../utils'
import {storage} from "../../utils/tools"
import { openLost,getListPrizeForPage,getCoinSum} from '../../actions/activity'
import './index.less'
const alert = Modal.alert;
// 奖品列表

class Activity extends Component {

    isClick = false // 是否正在抽奖中
    windowWidth = 320 //window.screen.availWidth || window.innerWidth // 获取屏幕宽度
    contrPadding = 10
     _width = ((this.windowWidth - this.contrPadding) / 7) // 每个奖品的占位宽度
     widthSub2 = (this._width - 2)
    contrImageSize = this.widthSub2 * 5 // 我要抽图片的尺寸，数字是5个空占位图片有数据
    index = 0     //当前转动到哪个位置，起点位置
    count = 0     //总共有多少个位置
    timer = 0     //setTimeout的ID，用clearTimeout清除
    speed = 20    //初始转动速度
    times = 0     //转动次数
    cycle = 100   //转动基本次数：即至少需要转动多少次再进入抽奖环节
    prize = 0     //中奖位置
    data = {}    //抽奖结果
    // 创建新的音频上下文接口
    audioCtx = null//new AudioContext()
    // 发出的声音频率数据，表现为音调的高低
    arrFrequency = [196.00, 220.00, 246.94, 261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50]
    // 音调依次递增或者递减处理需要的参数
    start = 0
    direction = 1
     awardList = [
        {
            id: 1,
            index: 1,
            img: require('../../assets/images/activity/award06.png')
        }, {
            id: 2,
            index: 2,
            img: require('../../assets/images/activity/award01.png')
        }, {
            id: 3,
            index: 3,
            img: require('../../assets/images/activity/award02.png')
        }, {
            id: 4,
            index: 4,
            img: require('../../assets/images/activity/award07.png')
        }, {
            id: 5,
            index: 5,
            img: require('../../assets/images/activity/award04.png')
        }, {
            id: 6,
            index: 6,
            img: require('../../assets/images/activity/award03.png')
        }, {
            id: 7,
            index: 7,
            img: require('../../assets/images/activity/award05.png')
        }, {
            id: 8,
            index: 24,
            img: require('../../assets/images/activity/award02.png')
        }, {}, {}, {}, {}, {}, {
            id: 9,
            index: 8,
            img: require('../../assets/images/activity/award08.png')
        }, {
            id: 10,
            index: 23,
            img: require('../../assets/images/activity/award04.png')
        }, {}, {}, {}, {}, {}, {
            id: 11,
            index: 9,
            img: require('../../assets/images/activity/award06.png')
        }, {
            id: 12,
            index: 22,
            img: require('../../assets/images/activity/award05.png')
        }, {}, {}, {}, {}, {}, {
            id: 13,
            index: 10,
            img: require('../../assets/images/activity/award04.png')
        }, {
            id: 14,
            index: 21,
            img: require('../../assets/images/activity/award08.png')
        }, {}, {}, {}, {}, {}, {
            id: 15,
            index: 11,
            img: require('../../assets/images/activity/award07.png')
        }, {
            id: 16,
            index: 20,
            img: require('../../assets/images/activity/award06.png')
        }, {}, {}, {}, {}, {}, {
            id: 17,
            index: 12,
            img: require('../../assets/images/activity/award01.png')
        }, {
            id: 18,
            index: 19,
            img: require('../../assets/images/activity/award08.png')
        }, {
            id: 19,
            index: 18,
            img: require('../../assets/images/activity/award01.png')
        }, {
            id: 20,
            index: 17,
            img: require('../../assets/images/activity/award02.png')
        }, {
            id: 21,
            index: 16,
            img: require('../../assets/images/activity/award07.png')
        }, {
            id: 22,
            index: 15,
            img: require('../../assets/images/activity/award03.png')
        }, {
            id: 23,
            index: 14,
            img: require('../../assets/images/activity/award03.png')
        }, {
            id: 24,
            index: 13,
            img: require('../../assets/images/activity/award05.png')
        }
    ]
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            integral: 0,
            show: false,
            total: 0,
            num: 0,
            showPrize:false,
            listPrize:[],
            current:1,
            awardCoin:0,
            totalCoin:0,
            availableVMoney:storage.get("userInfo")?storage.get("userInfo").availableVMoney:0
        }
        this.draw = {}

    }

    componentWillMount() {


    }

    componentDidMount() {

        this.props.dispatch(changeNavbarTitle("V币抽奖"))
        this.init()
    }
    showSpriceList=()=>{
        this.setState({
            showPrize:true
        })
        this.props.dispatch(getListPrizeForPage({
            token:storage.get("token"),
            "page.pageSize":5,
            "page.currentPage":1
        },(res)=>{
            if(res.errorCode === 0){
                this.setState({
                    listPrize:res.result.datas,
                    total:res.result.totalPage
                })
            }
        }))
        this.props.dispatch(getCoinSum({
            token:storage.get("token")
        },(res)=>{

            this.setState({
                awardCoin:res.result.awardCoin,
                totalCoin:res.result.totalCoin
            })
        }))

    }

    onChangePage=(val)=>{
        this.props.dispatch(getListPrizeForPage({
            token:storage.get("token"),
            "page.pageSize":5,
            "page.currentPage":val
        },(res)=>{
            if(res.errorCode === 0){
                this.setState({
                    current:val,
                    listPrize:res.result.datas
                })
            }
        }))
    }
    // 抽奖初始化，奖品个数 ，索引从1开始
    init() {
        this.count = this.awardList.reduce((index, item) => {
            if (item.id) {
                ++index
            }
            return index
        }, 1)
    }

    // 开始抽奖
    startRoll() {
        if(storage.get("userInfo")&&storage.get("userInfo").id){
            if(this.state.availableVMoney<10){
                Toast.info("V币不足", 2);
                return;
            }
            if (this.isClick) {
                return false;
            } else {
                this.reset()
                this.setState({
                    availableVMoney:this.state.availableVMoney-10
                })

                let userInfo =  storage.get("userInfo");
                storage.set("userInfo", Object.assign({},userInfo,{availableVMoney:this.state.availableVMoney-10}))

                this.speed = 100;
                this.Rolling();
                this.isClick = true;
                this.props.dispatch(openLost({token: storage.get("token")}, (res) => {
                    this.data = res
                    if (!res.errorCode) {
                        this.prize = res.result.sortIndex
                    } else {
                        this.stop()
                    }
                }))
                return false;
            }
        }else{
            alert('请登录', '您还没有登录', [
                { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
                { text: '登录', onPress: () => this.context.router.push(`/login`)},
            ]);
        }

    }

    stop() {
        clearTimeout(this.timer);
        this.prize = -1;
        this.times = 0;
        this.index = 0
        this.isClick = false;
        setTimeout(() => {
            if (!this.data.err) {
                this.draw = this.data.result
                this.setState({
                    show: true
                })
                if(this.data.result.id === 7){
                    this.setState({
                        availableVMoney:this.state.availableVMoney+10
                    })
                    let userInfo =  storage.get("userInfo");
                    storage.set("userInfo", Object.assign({},userInfo,{availableVMoney:userInfo.availableVMoney+10}))
                }else if(this.data.result.id === 6){
                    this.setState({
                        availableVMoney:this.state.availableVMoney+20
                    })
                    let userInfo =  storage.get("userInfo");
                    storage.set("userInfo", Object.assign({},userInfo,{availableVMoney:userInfo.availableVMoney+20}))
                }else if(this.data.result.id === 5){
                    this.setState({
                        availableVMoney:this.state.availableVMoney+100
                    })
                    let userInfo =  storage.get("userInfo");
                    storage.set("userInfo", Object.assign({},userInfo,{availableVMoney:userInfo.availableVMoney+100}))
                }
                Toast.info(this.data.result.name, 2);
               // this.props.onEnd(this.data)
            } else {
                Utils.alert(this.data.errorMsg)
            }
            //
        }, 500)
    }

    //抽奖的过程
    Rolling() {
        this.times += 1;
        this.roll();
        if (this.times > this.cycle + 10 && this.prize == this.index) {
            this.stop()
        } else {
            if (this.times < this.cycle) {
                this.speed -= 10;
            } else if (this.times == this.cycle) {
                // var index = Math.random()*(this.count)|1;
                // this.prize = 20//index;
            } else {
                if (this.times > this.cycle + 1) {
                    if (this.prize > 0 && this.prize <= 7) {
                        this.speed += 15
                    } else if (this.prize >= 8 && this.prize <= 15) {
                        this.speed += 12
                    } else if (this.prize >= 16 && this.prize <= 24) {
                        this.speed += 20;
                    }
                } else {
                    this.speed += 10;
                }
            }
            if (this.speed < 40) {
                this.speed = 40;
            }

            //console.log(this.times+'^^^^^^'+this.speed+'^^^^^^^'+this.prize);
            this.timer = setTimeout(() => {
                this.Rolling()
            }, this.speed);
        }
        return false;
    }

    // 抽奖过程中 ，奖品的变化
    roll() {
        var index = this.index;
        var count = this.count;

        let prevIndex = this.index
        let nextIndex = index += 1
        nextIndex = (nextIndex > count - 1) ? 1 : nextIndex
        this.index = nextIndex;

        this.awardList = this.awardList.map(item => {
            if (item.index == prevIndex) {
                item.active = false
            }
            if (item.index == nextIndex) {
                item.active = true
            }
            return item
        })
        //this.onVoice()
        this.setState({})
        return false;
    }

    reset() {
        this.awardList = this.awardList.map(item => {
            item.active = false
            return item
        })
        this.setState({})
    }
    // 抽奖时声音的变化
    onVoice() {
        // 当前频率
        var frequency = this.arrFrequency[this.start];
        // 如果到头，改变音调的变化规则（增减切换）
        if (!frequency) {
            this.direction = -1 * this.direction;
            this.start = this.start + 2 * this.direction;
            frequency = this.arrFrequency[this.start];
        }
        // 改变索引，下一次hover时候使用
        this.start = this.start + this.direction;

        // 创建一个OscillatorNode, 它表示一个周期性波形（振荡），基本上来说创造了一个音调
        var oscillator = this.audioCtx.createOscillator();
        // 创建一个GainNode,它可以控制音频的总音量
        var gainNode = this.audioCtx.createGain();
        // 把音量，音调和终节点进行关联
        oscillator.connect(gainNode);
        // this.audioCtx.destination返回AudioDestinationNode对象，表示当前audio context中所有节点的最终节点，一般表示音频渲染设备
        gainNode.connect(this.audioCtx.destination);
        // 指定音调的类型，其他还有square|triangle|sawtooth
        oscillator.type = 'sine';
        // 设置当前播放声音的频率，也就是最终播放声音的调调
        oscillator.frequency.value = frequency;
        // 当前时间设置音量为0
        gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
        // 0.01秒后音量为1
        gainNode.gain.linearRampToValueAtTime(1, this.audioCtx.currentTime + 0.01);
        // 音调从当前时间开始播放
        oscillator.start(this.audioCtx.currentTime);
        // 1秒内声音慢慢降低，是个不错的停止声音的方法
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 1);
        // 1秒后完全停止声音
        oscillator.stop(this.audioCtx.currentTime + 1);
    }

    coloeBtn=()=>{
        this.setState({
            showPrize:false
        })
    }
    render() {
        return (
            <div className="activity-container"
                 style={{height: document.documentElement.clientHeight - 45 * utils.multiple}}>
                <div className="top-img">
                    <img src={require(`../../assets/images/activity/top.png`)} alt=""/>
                </div>
                <div className="available-vb">
                    <div className="vb">V币余额:{this.state.availableVMoney}</div>
                    <div className="jilu" onClick={this.showSpriceList}>抽奖记录</div>
                </div>
                <div className="award">
                    <div className="award-contr" id="award-contr" style={{
                        padding: '0 0px',
                        backgroundImage: this.isClick ? `url(${require(`../../assets/images/activity/ch04.png`)})` : `url(${require(`../..//assets/images/activity/go.png`)})`,
                        backgroundSize: (this.contrImageSize + 7) * utils.multiple + "px " + this.contrImageSize * utils.multiple + 'px'
                    }}>
                        {
                            this.awardList.map((item, i) => {
                                let id = item.id
                                let styles = {
                                    'backgroundImage': 'url(' + item.img + ')'
                                }
                                let widthStyle = {
                                    width: `13%`,
                                    margin: '0 2px 2px'
                                }

                                if (id) {
                                    return (
                                        <div key={i}
                                             className={`award-item lottery-unit lottery-unit-${item.index} ${item.active ? 'active' : ''}`}
                                             style={widthStyle}>
                                            <figure style={styles}></figure>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={i} onClick={this.startRoll.bind(this)} className='award-item click-award'
                                             style={widthStyle}>
                                            <figure></figure>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
                {/*<AwardList {...this.props} onEnd={(data) => {*/}
                    {/*this.draw = data.result*/}
                    {/*this.setState({*/}
                        {/*show: true*/}
                    {/*})*/}
                    {/*Toast.info(data.result.name, 2);*/}

                {/*}}/>*/}
                {
                    this.state.showPrize?(
                        <div className="zhong-jian">
                            <div className="drawer_screen"></div>
                            <div className="drawer_box">
                                <div className="dra-img"></div>
                                <div className="body-c">
                                    <div className="div-1">
                                        <div className="bg">
                                            <span className="vb-1">总下注V币</span>
                                            <span className="vb-3">{this.state.totalCoin}</span>
                                            <span className="vb-4">{this.state.awardCoin}</span>
                                            <span className="vb-2">总中奖V币</span>
                                        </div>
                                    </div>
                                    <div className="content-2">
                                        <div className="c-flex">
                                            <span className="c-flex-1">投注</span>
                                            <span className="c-flex-1">中奖</span>
                                            <span className="c-flex-1">记录</span>
                                        </div>

                                        {
                                            this.state.listPrize.map((item,id)=>(
                                                <div className="c-flex" key={id}>
                                                    <span className="c-flex-2">10</span>
                                                    <span className="c-flex-2">{item.productName}</span>
                                                    <span className="c-flex-2">{item.createDt}</span>
                                                </div>
                                            ))
                                        }
                                        <div className="content-font">可查询一个月的抽奖记录</div>
                                    </div>
                                    <div className="btn-page">
                                        <Pagination total={this.state.total}
                                                    className="custom-pagination-with-icon"
                                                    current={this.state.current}
                                                    onChange={this.onChangePage}
                                                    locale={{
                                                        prevText: (<span className="arrow-align" >上一页</span>),
                                                        nextText: (<span className="arrow-align">下一页</span>),
                                                    }}
                                        />
                                    </div>
                                    <div className="colose-btn">
                                        <img src={require("../../assets/images/activity/colose.png")} className="image" onClick={this.coloeBtn}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ):""
                }

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(Activity)
