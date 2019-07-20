import Action from './Action';
import { ContactTypes } from '../reducers/ContactReducer';

export interface SetContactType extends Action<'SetContactType'>
{
    payload: ContactTypes;
}

export interface SetContactActive extends Action<'SetContactActive'>
{
    payload: boolean;
}

export type ContactActions = SetContactType | SetContactActive;
