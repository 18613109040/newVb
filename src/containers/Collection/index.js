import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Tabs} from 'antd-mobile';
import VbCollection from './VbCollection'
import CaseCollection from './CaseCollection'
import './index.less'
import {changeNavbarTitle} from '../../actions/home'

const tabs = [
    {title: '现金类'},
    {title: 'V币类'}
];

class MyCollection extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {}

    }

    componentWillMount() {
        this.props.dispatch(changeNavbarTitle("我的收藏"))
    }

    render() {

        return (
            <div className="my-collectionn">
                <div className="nav-content"  style={{height:document.documentElement.clientHeight - 50}}>
                    <Tabs tabs={tabs}
                          initialPage={0}
                    >
                        <div style={{display: 'flex'}}>
                            <CaseCollection/>
                        </div>
                        <div style={{display: 'flex'}}>
                            <VbCollection/>
                        </div>
                    </Tabs>

                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(MyCollection)
