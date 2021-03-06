import { ReducerHandler } from './ReducerHandler';
import { ContactActions } from '../actions/ContactActions';

export default interface ContactReducer
{
    type: ContactTypes;
    active?: boolean;
    /**
     * Stores conversations that were fully loaded (users have scrolled to top), so that pagination will be disabled for them.
     * */
    fullyLoadedConversations: number[];
    isClosing?: boolean;
}

export enum ContactTypes
{
    Conversation = 'Conversation',
    ContactForm  = 'ContactForm',
    UserForm     = 'UserForm',
    Selection    = 'Selection',
    EditProfile  = 'EditProfile',
}

export type ContactReducerHandler = Record<ContactActions['type'], ReducerHandler<ContactReducer>>
