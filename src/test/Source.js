/**
 * Created by peach on 16-3-14.
 */
import React, { PropTypes, Component } from 'react';
import { DragSource } from 'react-dnd';

const style = {
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    float: 'left'
};

const boxSpec = {
	//第二步
    beginDrag(props) {

        return {
            protype: props.protype,
            type: 'box'
        };
    },
    //第四步
    endDrag(props,monitor) {
    	console.dir("endDrag")
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();
        return {
        	props,monitor
        }
    },
    //第一步
    canDrag(props, monitor){
      console.dir("canDrag")
    	return {
    		props:props,
    		monitor:monitor
    	}

    },
    //第三步
    isDragging(props, monitor){
    	console.dir("isDragging")
    	return {
    		props:props,
    		monitor:monitor
    	}
    }
};

function boxCollect(connect,monitor) {

    return {
        isDragging: monitor.isDragging(),
        connectDragSource: connect.dragSource()
    }
}

class Source extends Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        protype: PropTypes.string.isRequired
    };
    renderCompent(item){
    	switch (item.name){
    		case "input": return <input type="text"/>
    			break;
    		case "select": return <select><option>name</option></select>
    			break;
    		default:
    			break;
    	}
    }
    render() {

        const { isDragging, connectDragSource } = this.props;
        const { protype } = this.props;
        return connectDragSource (
            <div style={{ ...style}}>
              {
              	protype?this.renderCompent(protype):""
              }
            </div>
        );
    }
}
export default DragSource('box',boxSpec,boxCollect)(Source);
