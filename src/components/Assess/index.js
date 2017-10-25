/**
 * 商品评价
 *
 */
import React, {Component} from "react";
import {  Flex ,WingBlank,WhiteSpace} from 'antd-mobile';
import { Link } from "react-router";
import PropTypes from 'prop-types';
import Rate from '../Rate'
import { SingleImgView } from '../ImageView'
import './index.less'
class Assess extends Component {
	static propTypes = {
  	data:PropTypes.object
	};
  static contextTypes={
  	router: PropTypes.object.isRequired,
	};
	static defaultProps = {

		data:{
  		commentHead:"",
  		commentNickname:"",
  		createDate:"",
  		content:"",
  		commentImg:"",
  		buyDate:""
  	}
	};
	constructor(props) {
		super(props);
		this.state = {

		}
	}
	imageShwe(id){
		const {data} = this.props;
		let imagelist = [
			data.commentImg,
			data.commentImg1,
			data.commentImg2,
		]
		imagelist = imagelist.filter(x=>x!="")
	 	SingleImgView.show({
          imagelist,
          disableRotate:true,
          current:id,
          maxScale:4,
          close: ()=>{SingleImgView.hide()},
        })
	}
	render() {
		const {data} = this.props;
        let imagelist = [
            data.commentImg,
            data.commentImg1,
            data.commentImg2,
        ]
        imagelist = imagelist.filter(x=>x!=null)
		return(
			<div className="assess-flat">
				<div className="assess-wrapper">
					<div className="assess-top">
						<span className="user-portrait">
							<img src={data.commentHead}/>
						</span>
						<div className="user-info">
							<p className="user-p">
								<span className="user-name">{data.commentNickname}</span>
								<span className="assess-date">{data.createDate}</span>
							</p>
							<div className="comment-item-star">
								<Rate value={data.grade}/>
							</div>
						</div>
					</div>
					<div className="assess-bottom">
						<p className="assess-content">{data.content}</p>
                        <Flex>
                            {
                                imagelist.map((item,id)=>(
                                    <WingBlank size="sm" key={id} ><img src={item} className="image-li" onClick={this.imageShwe.bind(this,id)}/></WingBlank>
                                ))
                            }
                        </Flex>
						{/*规格*/}
						{/*<p className="assess-size">尺寸：白色  testing</p>*/}
                        {
                            data.replyRemark?(<p className="assess-seller">
                                <i className="ic-triangle-up"></i>
                                {data.replyRemark}
                            </p>):""
                        }

					</div>
				</div>
			</div>
		)
	}
}

export default Assess
