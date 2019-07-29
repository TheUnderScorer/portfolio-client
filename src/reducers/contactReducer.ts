import reducer from './reducer';
import ContactReducer, { ContactReducerHandler, ContactTypes } from '../types/reducers/ContactReducer';

const initialState: ContactReducer = {
    active:               false,
    type:                 ContactTypes.UserForm,
    activeConversationID: 0,
};

const handlers: ContactReducerHandler = {
    SetContactType:          ( state, type ) => ( {
        ...state,
        type
    } ),
    SetContactActive:        ( state, active ) => ( {
        ...state,
        active
    } ),
    SetActiveConversationID: ( state, activeConversationID ) => ( {
        ...state,
        activeConversationID
    } ),
};

export default reducer( handlers, initialState );
