import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import AppReducer from '../common/reducers';

let reducers = combineReducers({
    app: AppReducer,
});
let store = createStore(reducers, applyMiddleware(thunk))
export default store