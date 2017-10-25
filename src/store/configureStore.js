
import { 
  createStore, 
  applyMiddleware ,
  compose,  
} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'




export default function configureStore(initialState){
  // const store = createStore(rootReducer,initialState);
  // return store;
  // actions 内异步返回
  return compose(applyMiddleware(thunk))(createStore)(rootReducer,initialState);
}
// export default compose(applyMiddleware(thunk))(createStore)(rootReducer);