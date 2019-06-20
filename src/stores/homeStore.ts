import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import userReducer from '../reducers/userReducer';
import themeReducer from '../reducers/themeReducer';

const middleware = [ thunk ];

const homeStore = createStore(
    combineReducers( {
        user:  userReducer,
        theme: themeReducer
    } ),
    {},
    applyMiddleware( ...middleware ),
);

export default homeStore;
