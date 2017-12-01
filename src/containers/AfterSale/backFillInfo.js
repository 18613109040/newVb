/*选择退货商品*/
import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {changeNavbarTitle} from '../../actions/home'
import {uploadImg} from '../../actions/evaluation'
import {Toast,InputItem,List,WhiteSpace,WingBlank,ImagePicker,Modal,Icon,Picker,TextareaItem } from 'antd-mobile';
import {getDeliveryInit,updateRefundDelivery} from '../../actions/orderDetails'
import utils from '../../utils'


const Item = List.Item;


class BackFillInfo extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state={
            asyncValue:{},
            deliverName:''

        }


    }
    componentWillMount() {


    }
    componentDidMount(){
        if(this.props.deliveryInit.length <=0)
        {
            this.props.dispatch(getDeliveryInit(),(res)=>{

            })
        }


    }

    changeInput(type,value){
        console.dir(type)
        console.dir(value)
        this.setState({
            [type]:value
        })
    }




    submit(){
        let {asyncValue,code,detail,deliverName}=this.state
        if(asyncValue.length<=0){
            Toast.fail('请选择货运方式',1)
            return
        }
        if(!code){
            Toast.fail('请填写货运单号',1)
            return
        }
        if(asyncValue[0] ==100 && !deliverName){
            Toast.fail('请填写货运方式',1)
            return
        }
        let json={
            deliverId:asyncValue[0],
            waybill:code,
            refundId:this.props.location.query.refundId,
            deliverName:deliverName
        }
        this.props.dispatch(updateRefundDelivery(json,(res)=>{
            if(res.code==0){
                Toast.success(res.message,1)
                this.context.router.replace('/afterSale/list')
            }else{
                Toast.fail(res.message,1)
            }
        }))
    }
     onPickerChange = (val) => {
         let deliverName =  this.props.deliveryInit.filter(item=>item.value === val[0])
        this.setState({
          asyncValue:val,
            deliverName:deliverName[0].label
        });

    }
    render(){
        let {asyncValue} =this.state

       return (
            <div className="afterSale-content" >
            <List className="apply-refund-type" style={{height: document.documentElement.clientHeight - 44*utils.multiple}}>
                <Picker
                  data={this.props.deliveryInit}
                  cols={1}
                  value={asyncValue}
                  onOk={this.onPickerChange}
                >
                  <List.Item arrow="horizontal" >货运公司</List.Item>
                </Picker>
                {
                    asyncValue[0]==100 ?
                    <InputItem placeholder="请填写货运方式" type="text" className="input-code" onChange={(v) => { this.changeInput('deliverName',v)}}>
                    货运方式
                    </InputItem>:null
                }

                <InputItem placeholder="填写您的退货物流单号" type="text" className="input-code" onChange={(v) => { this.changeInput('code',v)}}>
                货运单号
                </InputItem>
            </List>

            <div className="cart-fixed">
                <div className="big-btn" onClick={()=>{this.submit()}}>提交</div>
            </div>

         </div>
        )
    }

}


function mapStateToProps(state) {
    return {
        deliveryInit:state.deliveryInit
    }
}

export default connect(mapStateToProps)(BackFillInfo)
