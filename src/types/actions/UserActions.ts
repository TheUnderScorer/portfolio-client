import { Action } from 'redux';
import User from '../../types/models/User';

export interface SetCurrentUser extends Action<'SetCurrentUser'> {
    payload: User;
}

export type UserActions = SetCurrentUser | null;
