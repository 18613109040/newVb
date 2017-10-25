import React, {Component} from "react";
import { Link } from "react-router";
import PropTypes from 'prop-types';
import Text from '../Text'
import './index.less'
class ClassIficationItem extends Component {
    static propTypes = {
        silderData:PropTypes.object,
        clickMenu:PropTypes.func
    };
    static contextTypes={
        router: PropTypes.object.isRequired
    };
    static defaultProps = {
        silderData:{

        }
    };
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    clickMenu(){
        const {silderData} = this.props;
        if(this.props.clickMenu instanceof Function ){
            this.props.clickMenu(silderData)
        }
    }
    render() {
        const {silderData} = this.props;
        return(
            <div className={silderData.select?"classIfication-item-active":"classIfication-item"} onClick={this.clickMenu.bind(this)}>
                <Text row={1} size={silderData.select?"md":"sm"} text={silderData.name}/>
            </div>
        )
    }
}
export default ClassIficationItem
