import { Reducer } from 'redux';
import UserReducer, { UserReducerHandlers } from '../types/reducers/UserReducer';
import User from '../types/models/User';
import { UserActions } from '../types/actions/UserActions';

const initialState = {};

const handlers: UserReducerHandlers = {
    SetCurrentUser: ( state, currentUser: User ) => {

        return {
            ...state,
            currentUser
        }

    }
};

const userReducer: Reducer<UserReducer, UserActions> = ( state: UserReducer = initialState, action ) => {

    if ( !action ) {
        return state;
    }

    const { type } = action;

    if ( !type || !handlers[ type ] ) {
        return state;
    }

    return handlers[ type ]( state, action.payload );

};

export default userReducer;
