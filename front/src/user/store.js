import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import AppReducer from '../common/reducers';
import RegisterReducers from './modules/register/reducers';
import ProductReducers from './modules/product/reducers';

let reducers = combineReducers({
    app: AppReducer,
    register: RegisterReducers,
    product: ProductReducers
});
let store = createStore(reducers, applyMiddleware(thunk))
export default store