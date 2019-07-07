import User from '../models/User';
import { ReducerHandler } from './ReducerHandler';
import { UserActions } from '../actions/UserActions';

export default interface UserReducer {
    currentUser?: User;
}

export type UserReducerHandlers = {
    [key in UserActions['type']]: ReducerHandler<UserReducer>;
}
