import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import userReducer from '../reducers/userReducer';
import themeReducer from '../reducers/themeReducer';
import homeReducer from '../reducers/homeReducer';

const middleware = [ thunk ];

const homeStore = createStore(
    combineReducers( {
        user:  userReducer,
        theme: themeReducer,
        home:  homeReducer
    } ),
    {},
    applyMiddleware( ...middleware ),
);

export default homeStore;
