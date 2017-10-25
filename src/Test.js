import React, {
	Component
} from "react";
import Tabs from './components/Tabs'
class Test extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}
	componentDidMount() {}
	render() {
		return(
			<Tabs defaultActiveKey={1}  >
			  <div title={<div>
			    <img src="http://image.mall.doubozhibo.com/3ea133c572c943e1942cae3a17aa89a9.png "/>
			    首页
			  </div>} 
			  key={0}>
			    Page 1
			  </div>
			  <div title="tab2" key={1}>
			    Page 2
			  </div>
			  <div title="tab3" key={2}>
			    Page 3
			  </div>
			  <div title="tab3" key={3}>
			     Page 3
			  </div>
			  <div title="tab4" key={4}>
			    Page 3
			  </div>
			  <div title="tab5" key={5}>
			    Page 3
			  </div>
			</Tabs>

		)
	}
}
export default Test