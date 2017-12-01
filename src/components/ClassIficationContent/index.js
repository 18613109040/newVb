/**
 *分类右侧内容
 */
import React, {Component} from "react";
import { Link } from "react-router";
import { WingBlank, WhiteSpace,Grid } from 'antd-mobile';
import PropTypes from 'prop-types';
import Img from '../Img'
import './index.less'
import Text from '../Text'
class ClassIficationContent extends Component {
    static propTypes = {
        data:PropTypes.object
    };
    static contextTypes={
        router: PropTypes.object.isRequired,
    };
    static defaultProps = {
        data:{

        }
    };
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    //
    clickGird=(data,index)=>{
        if(this.props.clickGird instanceof Function ){
            this.props.clickGird(Object.assign({},data,{parentId:this.props.data.imCategoryId}))
        }
    }
    render() {
        const {data} = this.props;
        data.children = data.children || [];
        data.children.map(item=>{
            item.text = item.name;
            item.icon = item.imageUrl;
        })
        console.dir(data)
        return(
            <div className="class-ification-content">
               <WingBlank>
                    <WhiteSpace/>
                    <div>
                        <img  src={data.imageUrl} className="banner-image"/>
                    </div>
                   <WhiteSpace/>
                   <div className="title">
                       {data.name}
                   </div>

                   <div>
                       <Grid data={data.children}
                             columnNum={3}
                             hasLine={false}
                             renderItem={dataItem => (
                                 <div className="am-grid-item-inner-content" >
                                     <div className="imag-div">
                                         <img src={dataItem.icon} className="grid-icon" alt="icon" />
                                     </div>
                                     <div><WhiteSpace size="sm"/></div>
                                     <div className="text-name">
                                         <Text row={1} size="sm" text={dataItem.text}/>
                                     </div>
                                 </div>
                             )}
                             onClick={this.clickGird}/>
                   </div>
               </WingBlank>
            </div>
        )
    }
}

export default ClassIficationContent
