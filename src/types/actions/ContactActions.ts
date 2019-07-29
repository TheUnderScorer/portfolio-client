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

export interface SetActiveConversationID extends Action<'SetActiveConversationID'>
{
    payload: number;
}

export type ContactActions = SetContactType | SetContactActive | SetActiveConversationID;
