import React from 'react'
import {render} from 'react-dom'
import {Router, match, browserHistory,hashHistory } from 'react-router'
import {Provider} from 'react-redux'
import routes from './routes'
import configureStore from './store/configureStore'
import './assets/style/theme.less'
import './assets/style/common.less'
import './assets/style/icons.less'
const store = configureStore(window.REDUX_STATE)

if(typeof document !== 'undefined' && window) {

	match({history: hashHistory, routes}, (error, redirectLocation, renderProps) => {
		    render(
		        <Provider store={store}>
		            <Router {...renderProps}/>
		        </Provider>,
		        document.getElementById('root')
		    )
	})
}
