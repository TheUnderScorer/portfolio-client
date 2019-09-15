import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import userReducer from '../reducers/userReducer';
import themeReducer from '../reducers/themeReducer';
import homeReducer from '../reducers/homeReducer';
import contactReducer from '../reducers/contactReducer';

const middleware = [ thunk ];

export const createHomeStore = () => createStore(
    combineReducers( {
        user:    userReducer,
        theme:   themeReducer,
        home:    homeReducer,
        contact: contactReducer,
    } ),
    {},
    applyMiddleware( ...middleware ),
);

const homeStore = createHomeStore();

export default homeStore;
