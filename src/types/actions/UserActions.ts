import User from '../../types/models/User';
import Action from './Action';

export interface SetCurrentUser extends Action<'SetCurrentUser'> {
    payload: User;
}

export type UserActions = SetCurrentUser | any;
