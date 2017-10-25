/**
 * Created by peach on 16-3-14.
 */
import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';
const style = {
    height: '60px',
    width: '500px',
    float: 'left',
    border:"1px solid"
};

const tustbinSpec = {
	 //第三步
    drop(props, monitor, component) {
    	console.dir("drop")
      const item = monitor.getItem();
      return { item: item };
    },
    //第二步
    hover(props, monitor, component){
    	console.dir("hover")
    	return {
    		props, 
    		monitor, 
    		component
    	}
    },
    //第一步
    canDrop(props, monitor){
    	console.dir("candrop")
    	return {
    		props,
    		monitor
    	}
    }
};

function dustbinCollect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        monitor:monitor
    };
}


class Target extends Component {

    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
        isOver: PropTypes.bool.isRequired,
        canDrop: PropTypes.bool.isRequired
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
       const { canDrop, isOver, connectDropTarget,monitor } = this.props;
        console.dir(monitor.getItem())
        const item  =  monitor.getItem();
       
        return connectDropTarget(
            <div　style={{ ...style}}>
              {
              	item?this.renderCompent(item.protype):""
              }
            </div>
        );
    }
}
export default DropTarget('box',tustbinSpec,dustbinCollect)(Target);
