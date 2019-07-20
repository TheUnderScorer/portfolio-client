import { UserReducerHandlers } from '../types/reducers/UserReducer';
import User from '../types/graphql/User';
import reducer from './reducer';

const initialState = {};

const handlers: UserReducerHandlers = {
    SetCurrentUser: ( state, currentUser: User ) => {

        return {
            ...state,
            currentUser
        }

    }
};

export default reducer( handlers, initialState );
