import React, { Component, PropTypes } from 'react'
import './index.less'
export default class EmptyData extends Component{

  static defaultProps = {
    className:'',
    style:0
  }
  static propTypes = {
    style:PropTypes.number,
  }
  constructor(props) {
    super(props);
  }

  componentDidMount(){
   
  }
  render(){
   let {type,text,components} =this.props
    return(
      <div className="empty-content" style={{height: document.documentElement.clientHeight - 100}}>
        <img  className="img" src={require(`../../assets/images/empty_${type||2}.jpg`)}/>
        <p className="tip">{text}</p>
        { components ? components:null }
        
      </div>
    )
  }
}