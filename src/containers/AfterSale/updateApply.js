/*选择退货商品*/
import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {changeNavbarTitle} from '../../actions/home'
import {Product} from '../../components/Order'
import {refundModify,getRefundDetail2 ,emptyOrder,emptyOrderDetails} from '../../actions/orderDetails'
import {uploadImg} from '../../actions/evaluation'
import {Toast,InputItem,List,WhiteSpace,WingBlank,ImagePicker,Modal,Icon,Checkbox,TextareaItem } from 'antd-mobile';
import EmptyData from '../../components/EmptyData'
import utils from '../../utils'

const Item = List.Item;
const Brief = Item.Brief;
const CheckboxItem = Checkbox.CheckboxItem;
//地址栏type  type=1：售后退款，type=2：售后退货退款，type=3：待发货退款
//refundDetail的refundType   refundType=1：售后退款，refundType=2：售后退货退款，refundType=3：待发货退款
class ChooseGoods extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state={
            files: [],
            detail:'',
            Vbmoney:0,
            money:0,
            refundReason:{
                id:-1,
                text:''
            },
            goodsStatus:{
                id:-1,
                text:''
            }
        }
        this.imgdata = [];



    }
    componentWillMount() {
        this.props.dispatch(changeNavbarTitle("申请退款"))


    }
    componentDidMount(){
        let {refundId} =this.props.location.query
        this.props.dispatch(getRefundDetail2({refundId},(res)=>{
            if(res.code==0){
                let {refundOrder}= res.data
                let files=[]
                refundOrder.voucherImages.map((item,i)=>{
                    files.push({url:item,id:i})
                    this.imgdata.push(item)
                })
                this.setState({
                    refundReason:{id:refundOrder.refundReasonId,text:refundOrder.refundReason},
                    goodsStatus:{id:refundOrder.refundGoodsStatus,text:refundOrder.refundGoodsStatusStr},
                    files:files,
                    detail:refundOrder.refundRemark,
                    money:refundOrder.refundMoney,
                    Vbmoney:refundOrder.refundIntegral
                })

            }
        }))

    }
    onImageClick = (index, fs) => {

    }
    changeInput(type,value){
        this.setState({
            [type]:value
        })
    }
    onChangeImg = (files, type, index) => {

        this.setState({
            files,
        });
        if(type === "remove"){
            this.imgdata.splice(index,1)
        }else{
            this.props.dispatch(uploadImg({
                attachs: files[files.length-1].file
            }, (res) => {
                if (res.code == 0) {
                    this.imgdata = [...this.imgdata, res.data.url]

                }else{
                    Toast.fail(res.message, 1);
                }
            }))
        }



    }
    submit(){
        let {goodsStatus,refundReason,money,detail,Vbmoney,files}=this.state
        let { refundDetail2} =this.props

        if(refundDetail2.data.refundOrder.refundType ==1 && goodsStatus.id<0){
            Toast.fail('请选择货物状态', 1);
            return
        }
        if( refundReason.id==-1){
            Toast.fail('请选择退单原因', 1);
            return
        }
        if(isNaN(parseFloat(money))){
            Toast.fail('退款金额输入有误', 1);
            return
        }
        if(isNaN(parseFloat(Vbmoney))){
            Toast.fail('退单V币个数输入有误', 1);
            return
        }
        if( money >refundDetail2.data.totalRefundMoney ){
            Toast.fail(`退款金额输入有误`, 1);
            return
        }
        if( Vbmoney >refundDetail2.data.totalRefundVCoin  ){
            Toast.fail(`退单V币个数输入有误`, 1);
            return
        }

        Toast.loading("提交中...")
        let items=[]
        refundDetail2.data.refundOrder.items.map((item,i)=>{
            items=items.concat({orderItemId:item.order1Id,refundCount:item.quantity})
        })
        let obj =Object.assign({},{
            refundId:refundDetail2.data.refundOrder.refundId,
            refundReason:parseInt(refundReason.id) ,
            goodsStatus:parseInt(goodsStatus.id),
            refundRemark:detail,
            refundMoney:parseFloat(money) ,
            refundIntegral:parseFloat(Vbmoney) ,
            uploadImages:this.imgdata,
            items:items

        })

        this.props.dispatch(refundModify(obj,(res)=>{
            Toast.hide()
            if(res.code==0)
            {
                this.props.dispatch(emptyOrder())
                this.props.dispatch(emptyOrderDetails())
                Toast.success(res.message, 1);
                this.context.router.replace('/afterSale/list')
            }
            else
                Toast.fail(res.message, 1);
        }))


    }
    onChange(item,type){
        let modal=''
        if(type=='refundReason')
            modal='modal_refundReason'
        else
            modal='modal_goodsStatus'

        this.setState({
            [type]:{
                id:item.id,
                text:item.text
            },
            [modal]:false
        })
    }

    render(){
        let {refundId} =this.props.location.query
        let { refundDetail2} =this.props
        let products=[]
        if(refundDetail2.code!=0) return <div style={{padding: '10px 0px 60px 0px', textAlign: 'center'}}>加载中...</div>
        if(refundId == refundDetail2.data.refundOrder.refundId){   //修改
            products=refundDetail2.data.refundOrder.items
        }else{
            return <EmptyData text={'小主，该退款/售后订单不存在'} />
        }


       return (
            <div className="afterSale-content"  style={{height: document.documentElement.clientHeight-45 *utils.multiple}}>
            <div  style={{"marginBottom":55*utils.multiple+'px'}}>
             <div className="step3" >
            {
                products.map((item, i) => {
                    return (
                        <div key={i} className="order-product-content">
                           <Product key={0} showStepper={0}
                           item={Object.assign(item,
                                {amount:item.quantity,exchangeIntegral:item.integral,retailPrice:item.price,productType:item.price>0}
                                )}
                         />
                        </div>
                    )

                })
            }
            </div>
            <WhiteSpace />
            {this.renderPart()}
            <WhiteSpace />
            <div className="uploadImg-content">
                <WingBlank size="md"><div className="title">上传图片凭证</div></WingBlank>
                <ImagePicker
                    files={this.state.files}
                    onChange={this.onChangeImg}
                    onImageClick={this.onImageClick}
                    selectable={this.state.files.length < 3}
                />
            </div>
            <WhiteSpace />
            <TextareaItem
                className="textarea-detail"
                value={this.state.detail}
                onChange={(v)=>{this.changeInput('detail',v)}}
                clear
                autoHeight
                placeholder="补充更多信息以便我们更快帮您解决…(选填)"
            />
            <div className="cart-fixed">
                <div className="big-btn" onClick={()=>{this.submit()}}>提交</div>
            </div>
            {this.renderModal()}
            {this.renderModal2()}
         </div>
         </div>
        )
    }
    //退货原因
    renderPart(){
        let { type,refundId } =this.props.location.query
        let {money,Vbmoney,refundReason,goodsStatus} =this.state
        let {refundDetail2} =this.props

        let editable=true,_type
        editable= refundDetail2.data.refundOrder.refundType==3 ?false:true
        _type=refundDetail2.data.refundOrder.refundType

        return(
            <section>
             <List className="apply-refund-type">
                {
                    _type==0?
                    <Item arrow="horizontal" multipleLine onClick={()=>{
                        this.setState({
                            modal_goodsStatus:true
                        })
                    }} extra={`${goodsStatus.text==''?'请选择':goodsStatus.text}`}>
                      货物状态
                    </Item>:null
                }


                <Item arrow="horizontal" multipleLine onClick={()=>{
                    this.setState({
                        modal_refundReason:true
                    })
                }} extra={`${refundReason.text==''?'请选择':refundReason.text}`}>
                  退单原因
                </Item>
                {
                    refundDetail2.data.totalRefundMoney>0 ?
                    <InputItem placeholder={'退单金额'} type="text" className="apply-input" editable={editable} value={money} onChange={(v) => { this.changeInput('money',v)}}>
                    退单金额
                    </InputItem>:null
                }

                {
                    refundDetail2.data.totalRefundVCoin>0 ?
                    <InputItem placeholder={'退单V币'} type="text" className="apply-input" editable={editable} value={Vbmoney} onChange={(v) => { this.changeInput('Vbmoney',v)}}>
                    退单V币
                    </InputItem>:null
                }



            </List>
                {/* V币商品*/}
                {
                    refundDetail2.data.refundVCoin>0 && refundDetail2.data.refundMoney<=0?
                    <div className="refund-tip">
                    V币最多退{refundDetail2.data.totalRefundVCoin}个（含邮费{refundDetail2.data.freight}个）
                    </div>:null
                }
                {/*现金商品，不抵扣V币*/}
                {
                    refundDetail2.data.totalRefundVCoin<=0 && refundDetail2.data.refundMoney>0?
                    <div className="refund-tip">
                    退款金额最多{refundDetail2.data.totalRefundMoney}元（含邮费{refundDetail2.data.freight}元）
                    </div>:null
                }
                {/*现金商品，抵扣V币*/}
                {
                    refundDetail2.data.totalRefundVCoin>0 && refundDetail2.data.refundMoney>0?
                    <div className="refund-tip">
                    退款金额最多{refundDetail2.data.totalRefundMoney}元（含邮费{refundDetail2.data.freight}元），V币抵扣最多退{refundDetail2.data.totalRefundVCoin}个
                    </div>:null
                }
            </section>
        )
    }
    //退款原因弹框
    renderModal(){
        let { type,refundId } =this.props.location.query
        let {refundDetail2} =this.props
        let {refundReason,modal_refundReason,goodsStatus} =this.state
        if(refundDetail2.code!=0)
            return null

        let reasons=[]
        if(refundDetail2.data.refundOrder.refundType==3)
            reasons=applyRefundInit.data.refundReasons
        else if(refundDetail2.data.refundOrder.refundType == 2){
            reasons=refundDetail2.data.receiveGoodsRefundReasons
        }else if(refundDetail2.data.refundOrder.refundType==1){
            if(goodsStatus.id==0){  //未发货
            reasons=refundDetail2.data.notReceiveGoodsRefundReasons
            }else if(goodsStatus.id==1){ //已发货
                reasons=refundDetail2.data.receiveGoodsRefundReasons
            }
        }

        return(
             <Modal
                popup
                visible={modal_refundReason}
                maskClosable={true}
                animationType="slide-up"
            >
                <div className="apply-refund-modal" >
                    <div className="title">
                        <span>请选择退单原因</span>
                        <span className="colose" onClick={() => {
                            this.setState({modal_refundReason:false})
                        }}><Icon type="cross"/></span>
                    </div>
                    <div className="apply-refund-details">
                    {
                        reasons.map((item,i)=>{
                            return(
                                <div className="li" key={i}>
                                    <span>{item.text}</span>
                                    <Checkbox checked={item.id == refundReason.id}  onChange={() => this.onChange(item,'refundReason')}/>

                                </div>
                            )
                        })
                    }
                    </div>

                </div>
            </Modal>
        )
    }
    //货物状态 弹框
    renderModal2(){
        let {refundDetail2} =this.props
        let {goodsStatus,modal_goodsStatus} =this.state
        if(refundDetail2.code !=0) return null

        return(
             <Modal
                popup
                visible={modal_goodsStatus}
                maskClosable={true}
                animationType="slide-up"
            >
                <div className="apply-refund-modal" >
                    <div className="title">
                        <span>请选择货物状态</span>
                        <span className="colose" onClick={() => {
                            this.setState({modal_goodsStatus:false})
                        }}><Icon type="cross"/></span>
                    </div>
                    <div className="apply-refund-details">
                    {
                        refundDetail2.data.goodsStatuses.map((item,i)=>{
                            return(
                                <div className="li" key={i}>
                                    <span>{item.text}</span>
                                    <Checkbox checked={item.id == goodsStatus.id}  onChange={() => this.onChange(item,'goodsStatus')}/>
                                </div>
                            )
                        })
                    }
                    </div>

                </div>
            </Modal>
        )
    }
}


function mapStateToProps(state) {
    return {
       refundDetail2:state.refundDetail2
    }
}

export default connect(mapStateToProps)(ChooseGoods)
