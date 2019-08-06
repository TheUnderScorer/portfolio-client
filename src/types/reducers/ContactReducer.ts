import { ReducerHandler } from './ReducerHandler';
import { ContactActions } from '../actions/ContactActions';

export default interface ContactReducer
{
    type: ContactTypes;
    active?: boolean;
    fullyLoadedConversations: number[];
}

export enum ContactTypes
{
    Conversation = 'Conversation',
    ContactForm  = 'ContactForm',
    UserForm     = 'UserForm',
    Selection    = 'Selection',
    EditProfile  = 'EditProfile',
}

export type ContactReducerHandler = {
    [key in ContactActions['type']]: ReducerHandler<ContactReducer>;
}
