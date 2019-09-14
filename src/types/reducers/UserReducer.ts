import { ReducerHandler } from './ReducerHandler';
import { UserActions } from '../actions/UserActions';

export default interface UserReducer
{
    readonly token: string;
}

export type UserReducerHandlers = Record<UserActions['type'], ReducerHandler<UserReducer>>
