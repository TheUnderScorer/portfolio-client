import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import userReducer from '../reducers/userReducer';
import themeReducer from '../reducers/themeReducer';
import homeReducer from '../reducers/homeReducer';
import contactReducer from '../reducers/contactReducer';

const middleware = [ thunk ];

const homeStore = createStore(
    combineReducers( {
        user:    userReducer,
        theme:   themeReducer,
        home:    homeReducer,
        contact: contactReducer,
    } ),
    {},
    applyMiddleware( ...middleware ),
);

export default homeStore;
