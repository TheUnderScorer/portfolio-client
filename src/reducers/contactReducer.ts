import reducer from './reducer';
import ContactReducer, { ContactReducerHandler, ContactTypes } from '../types/reducers/ContactReducer';

const initialState: ContactReducer = {
    active:                   false,
    type:                     ContactTypes.UserForm,
    fullyLoadedConversations: [],
};

const handlers: ContactReducerHandler = {
    SetContactType:        ( state, type ) => ( {
        ...state,
        type
    } ),
    SetContactActive:      ( state, active ) => ( {
        ...state,
        active
    } ),
    AddLoadedConversation: ( state, conversationID ) =>
                           {
                               if ( state.fullyLoadedConversations.includes( conversationID ) ) {
                                   return state;
                               }

                               const fullyLoadedConversations = [ ...state.fullyLoadedConversations ];
                               fullyLoadedConversations.push( conversationID );

                               return {
                                   ...state,
                                   fullyLoadedConversations
                               }
                           }
};

export default reducer( handlers, initialState );
