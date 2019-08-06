import { ReducerHandler } from './ReducerHandler';
import { UserActions } from '../actions/UserActions';

export default interface UserReducer
{
    readonly token: string;
}

export type UserReducerHandlers = {
    [key in UserActions['type']]: ReducerHandler<UserReducer>;
}
