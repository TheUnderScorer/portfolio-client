import reducer from './reducer';
import ContactReducer, { ContactReducerHandler, ContactTypes } from '../types/reducers/ContactReducer';

const initialState: ContactReducer = {
    active: false,
    type:   ContactTypes.UserForm,
};

const handlers: ContactReducerHandler = {
    SetContactType:   ( state, type ) => ( {
        ...state,
        type
    } ),
    SetContactActive: ( state, active ) => ( {
        ...state,
        active
    } )
};

export default reducer( handlers, initialState );
