import React, {Component} from "react";
import { Link } from "react-router";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {Tabs} from 'antd-mobile';
import BeEvaluation from './BeEvaluation'
import Completed from './Completed'
import {changeNavbarTitle} from '../../actions/home'
import './index.less'
const tabs = [
  { title: '待评价' },
  { title: '已完成' },
];
class MyEvaluation extends Component {
    static propTypes = {

    };

    static defaultProps = {

    };
    static contextTypes={
    router: React.PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    componentWillMount() {
        this.props.dispatch(changeNavbarTitle("我的评价"))
    }
    render() {

        return(
            <div className="my-evaluation">
                <div className="nav-content"  style={{height:document.documentElement.clientHeight - 50}}>
                    <Tabs tabs={tabs}
                      initialPage={0}
                      swipeable={false}
                    >
                        <div>
                            <BeEvaluation/>
                        </div>
                        <div>

                         <Completed/>
                        </div>
                    </Tabs>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {

    }
}
export default connect(mapStateToProps)(MyEvaluation)
