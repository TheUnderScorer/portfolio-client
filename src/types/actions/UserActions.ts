import Action from './Action';

export interface SetToken extends Action<'SetToken'>
{
    payload: string;
}

export type UserActions = SetToken;
