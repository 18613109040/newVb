import React, {Component} from "react";
import { Link } from "react-router";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {List,Tabs} from 'antd-mobile';
import NavBar from '../../components/NavBar'
import BeEvaluation from './BeEvaluation'
import Completed from './Completed'
import './index.less'
const TabPane = Tabs.TabPane;

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
    render() {
        
        return(
            <div className="my-evaluation">
                <NavBar title={'我的评价'} {...this.props}></NavBar>
                <div className="nav-content">
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
